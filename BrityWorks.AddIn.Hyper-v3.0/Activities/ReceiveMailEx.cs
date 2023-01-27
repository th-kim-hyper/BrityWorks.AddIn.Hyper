using BrityWorks.AddIn.Hyper.Properties;
using MailKit.Net.Smtp;
using Microsoft.ClearScript.V8;
using Microsoft.ClearScript;
using MimeKit;
using MimeKit.Text;
using RPAGO.AddIn;
using RPAGO.Common.Data;
using RPAGO.Common.Event;
using RPAGO.Common.Library;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Bitmap = System.Drawing.Bitmap;
using MailKit.Net.Imap;
using MailKit.Search;
using MailKit.Security;
using MailKit;
using System.Diagnostics;
using MimeKit.Utils;
using BrityWorks.Shared.AddIn.Dto;
using System.Windows;
using HtmlAgilityPack;
using System.Text;

namespace BrityWorks.AddIn.Hyper.Activities
{
    public class ReceiveMailEx : IActivityItem
    {
        public static readonly PropKey OutputPropKey = new PropKey("OUTPUT", "Mails");

        public static readonly PropKey ProtocolPropKey = new PropKey("CONNECTION", "Protocol");
        public static readonly PropKey HostNamePropKey = new PropKey("CONNECTION", "HostName");
        public static readonly PropKey PortPropKey = new PropKey("CONNECTION", "Port");
        public static readonly PropKey IdPorpKey = new PropKey("CONNECTION", "ID");
        public static readonly PropKey PwdPropKey = new PropKey("CONNECTION", "Password");
        public static readonly PropKey UseSSLPropKey = new PropKey("CONNECTION", "UseSSL");

        public static readonly PropKey BeginTimePropKey = new PropKey("MAIL", "BeginTime");
        public static readonly PropKey EndTimePropKey = new PropKey("MAIL", "EndTime");
        public static readonly PropKey SenderPropKey = new PropKey("MAIL", "Sender");
        public static readonly PropKey SubjectPropKey = new PropKey("MAIL", "Subject");
        public static readonly PropKey MaxCountPropKey = new PropKey("MAIL", "MaxCount");
        public static readonly PropKey StartNoPropKey = new PropKey("MAIL", "StartNo");
        public static readonly PropKey WithContentsPropKey = new PropKey("MAIL", "WithContents");
        public static readonly PropKey IgnoreHTMLTagPropKey = new PropKey("MAIL", "IgnoreHTMLTag");
        public static readonly PropKey IgnoreBodyAttachmentsPropKey = new PropKey("MAIL", "IgnoreBodyAttachments");
        public static readonly PropKey RecentFirstPropKey = new PropKey("MAIL", "RecentFirst");
        public static readonly PropKey CheckUnorderedListPropKey = new PropKey("MAIL", "CheckUnorderedList");

        public string DisplayName => "Hyper Receive Mail";

        public Bitmap Icon => Resources.mail;

        public LibraryHeadlessType Mode => LibraryHeadlessType.Both;

        public PropKey DisplayTextProperty => new PropKey("", "HyperInfo Receive dMail");

        public PropKey OutputProperty => OutputPropKey;

        private PropertySet PropertyList;

        private void OnSelectChanged(object oldValue, object newValue)
        {
            var protocol = newValue.ToStr();
            var portPropItem = PropertyList[PortPropKey];
            portPropItem.Value = (protocol == "IMAP") ? 993 : 995;
            ReloadPropertyEvent.Publish();
        }

        public List<Property> OnCreateProperties()
        {
            var properties = new List<Property>()
            {
                new Property(this, OutputPropKey, "RESULT"),

                new Property(this, ProtocolPropKey, "'POP3'").SetDropDownList("POP3;IMAP"),
                new Property(this, HostNamePropKey, "'smtp.mail.com'").SetRequired(),
                new Property(this, PortPropKey, 995).SetRequired(),
                new Property(this, IdPorpKey, "'from@mail.com'").SetRequired(),
                new Property(this, PwdPropKey, "", true).SetControlType(PropertyControls.PropertyItemPasswordView).SetRequired(),
                new Property(this, UseSSLPropKey, true),

                new Property(this, BeginTimePropKey, "'" + DateTime.Now.ToString("yyyy-MM-dd 00:00:00") + "'"),
                new Property(this, EndTimePropKey, ""),
                new Property(this, SenderPropKey, ""),
                new Property(this, SubjectPropKey, ""),
                new Property(this, MaxCountPropKey, 1),
                new Property(this, StartNoPropKey, "", DataTypes.Integer, DataFormatTypes.Integer),
                new Property(this, WithContentsPropKey, false),
                new Property(this, IgnoreHTMLTagPropKey, true).SetInternal(true),
                new Property(this, IgnoreBodyAttachmentsPropKey, true).SetInternal(true),
                new Property(this, RecentFirstPropKey, true).SetInternal(true),
                new Property(this, CheckUnorderedListPropKey, false).SetInternal(true),
            };

            ReloadPropertyEvent.Publish();
            return properties;
        }

        public void OnLoad(PropertySet properties)
        {
            properties[ProtocolPropKey].ResetValueChangedHandler().SetValueChangedHandler(OnSelectChanged);
            PropertyList = properties;
        }

        public object OnRun(IDictionary<string, object> properties)
        {
            var result = null as List<MailMessage>;

            var protocol = properties[ProtocolPropKey].ToStr();
            var host = properties[HostNamePropKey].ToStr();
            var port = properties[PortPropKey].ToIntValue();
            var id = properties[IdPorpKey].ToStr();
            var password = properties[PwdPropKey].ToStr();
            var useSsl = properties[UseSSLPropKey].ToBoolValue();

            var beginTime = properties[BeginTimePropKey].ToStr();
            var endTime = properties[EndTimePropKey].ToStr();
            var sender = properties[SenderPropKey].ToStr();
            var subject = properties[SubjectPropKey].ToStr();
            var maxCount = (properties[MaxCountPropKey].ToStr() == "[undefined]") ? 100 : properties[MaxCountPropKey].ToIntValue();
            var startNo = (properties[StartNoPropKey].ToStr() == "[undefined]") ? 0 : properties[StartNoPropKey].ToIntValue();
            var withContents = properties[WithContentsPropKey].ToBoolValue();
            var ignoreHTMLTag = properties[IgnoreHTMLTagPropKey].ToBoolValue();
            var ignoreBodyAttachments = properties[IgnoreBodyAttachmentsPropKey].ToBoolValue();
            var recentFirst = properties[RecentFirstPropKey].ToBoolValue();
            var checkUnorderedList = properties[CheckUnorderedListPropKey].ToBoolValue();

            using (var client = new ImapClient())
            {
                client.Connect(host, port, useSsl ? SecureSocketOptions.SslOnConnect : SecureSocketOptions.None);
                client.Authenticate(id, password);
                var inbox = client.Inbox;
                inbox.Open(FolderAccess.ReadOnly);
                var inboxCount = inbox.Count;
                var query = SearchQuery.All;

                if (subject?.Length > 0)
                {
                    query = query.And(SearchQuery.SubjectContains(subject));
                }

                if (sender?.Length > 0)
                {
                    query = query.And(SearchQuery.FromContains(sender));
                }

                if (beginTime?.Length > 0 && DateUtils.TryParse(beginTime, out DateTimeOffset beginDateTimeOffset))
                {
                    query = query.And(SearchQuery.DeliveredAfter(beginDateTimeOffset.DateTime));
                }

                if (endTime?.Length > 0 && DateUtils.TryParse(endTime, out DateTimeOffset endDateTimeOffset))
                {
                    query = query.And(SearchQuery.DeliveredBefore(endDateTimeOffset.DateTime));
                }

                if (startNo < 0)
                {
                    startNo = 0;
                }

                query = query.And(SearchQuery.DeliveredAfter(DateTime.Now.AddDays(-3)));

                var uids = inbox.Search(query);
                var uidCount = uids.Count;

                Debug.WriteLine($"inbox search {uidCount}/{inboxCount}");

                if(uidCount > 0)
                {
                    var messages = new List<MimeMessage>();
                    var minCount = Math.Min(uidCount, maxCount);
                    result = new List<MailMessage>();

                    if (recentFirst)
                    {
                        uids = uids.Reverse().ToList();
                    }

                    for (int i = startNo; i < minCount; i++)
                    {
                        var mailMessage = new MailMessage();
                        var uid = uids[i];
                        var headers = inbox.GetHeaders(uid);
                        var message = inbox.GetMessage(uid);
                        var receivedDate = headers[HeaderId.Received];

                        DateUtils.TryParse(receivedDate, out DateTimeOffset receivedDateOffset);

                        if (withContents)
                        {
                            var messageSubject = headers[HeaderId.Subject];
                            var isHtml = (message.HtmlBody?.Length > 0);
                            var messageBody = message.TextBody;

                            if(isHtml)
                            {
                                messageBody = message.HtmlBody;

                                if(ignoreHTMLTag)
                                {
                                    HtmlDocument htmlDoc = new HtmlDocument();
                                    htmlDoc.LoadHtml(messageBody);

                                    if(htmlDoc != null)
                                    {
                                        messageBody = htmlDoc.DocumentNode.InnerText;
                                    }                                    
                                }
                            }

                            // ignoreBodyAttachments
                            // recentFirst
                            // checkUnorderedList

                            mailMessage = new MailMessage()
                            {
                                UinqueId = uid.Id,
                                ReceiveDate = receivedDateOffset.DateTime,
                                Sender = sender,
                                Subject = messageSubject,
                                Body = messageBody,
                                IsHtml = isHtml,
                            };
                        }

                        result.Add(mailMessage);
                    }
                }
               
                inbox.Close();
                client.Disconnect(true);
            }

            return result?.ToArray();
        }
    }
}
