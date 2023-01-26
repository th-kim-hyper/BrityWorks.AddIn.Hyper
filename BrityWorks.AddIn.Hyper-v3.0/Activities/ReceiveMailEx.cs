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

        public PropKey DisplayTextProperty => new PropKey("", "HyperInfo Recevie dMail");

        public PropKey OutputProperty => OutputPropKey;

        private PropertySet PropertyList;

        public List<Property> OnCreateProperties()
        {
            var properties = new List<Property>()
            {
                new Property(this, OutputPropKey, "RESULT"),

                new Property(this, ProtocolPropKey, "'POP3'").SetDropDownList("POP3;IMAP").SetValueChangedHandler(OnSelectChanged),
                new Property(this, HostNamePropKey, "'smtp.mail.com'").SetRequired(),
                new Property(this, PortPropKey, 995).SetRequired(),
                //new Property(this, IdPorpKey, "'from@mail.com'").SetRequired(),
                //new Property(this, PwdPropKey, "", true).SetControlType(PropertyControls.PropertyItemPasswordView).SetRequired(),
                //new Property(this, UseSSLPropKey, true),

                //new Property(this, BeginTimePropKey, "'" + DateTime.Now.ToString("yyyy-MM-dd 00:00:00") + "'"),
                //new Property(this, EndTimePropKey, ""),
                //new Property(this, SenderPropKey, ""),
                //new Property(this, SubjectPropKey, ""),
                //new Property(this, MaxCountPropKey, 1),
                //new Property(this, StartNoPropKey, "", DataTypes.Integer, DataFormatTypes.Integer),
                //new Property(this, WithContentsPropKey, false),
                //new Property(this, IgnoreHTMLTagPropKey, true),
                //new Property(this, IgnoreBodyAttachmentsPropKey, true),
                //new Property(this, RecentFirstPropKey, true),
                //new Property(this, CheckUnorderedListPropKey, false),
            };

            return properties;
        }

        void OnSelectChanged(object oldValue, object newValue)
        {
            var protocol = newValue.ToStr();
            var portPropItem = PropertyList[PortPropKey];
            portPropItem.Value = (protocol == "IMAP") ? 993 : 995;
            ReloadPropertyEvent.Publish();
        }


        public void OnLoad(PropertySet properties)
        {
            PropertyList = properties;
        }

        //private List<FileInfo> GetFiles(string files)
        //{
        //    List<FileInfo> result = null;

        //    if(files?.Length > 0)
        //    {
        //        var fileArray = files.Split(';');

        //        if (fileArray?.Length > 0)
        //        {
        //            result = fileArray.Select(file => new FileInfo(file)).ToList();
        //        }
        //    }

        //    return result;
        //}

        //private MimeMessage CreateMessage(string sender, string receivers, string subject, string body
        //    , bool isHTML = false, string ccs = null, string bccs = null, List<FileInfo> attachments = null)
        //{
        //    var receiverArray = receivers?.Split(';');
        //    var ccArray = ccs?.Split(';');
        //    var bccArray = bccs?.Split(';');
        //    var entities = new List<MimeEntity>();
        //    var textFormat = (isHTML) ? TextFormat.Html : TextFormat.Plain;
        //    var textPart = new TextPart(textFormat) { Text = body };
        //    var message = new MimeMessage();
        //    message.From.Add(new MailboxAddress(null, sender));
        //    message.Subject = subject;
        //    message.To.AddRange(receiverArray.Select(receiver => new MailboxAddress(null, receiver)));
            
        //    if (ccArray?.Length > 0)
        //    {
        //        message.Cc.AddRange(ccArray.Select(cc => new MailboxAddress(null, cc)));
        //    }

        //    if (bccArray?.Length > 0)
        //    {
        //        message.Bcc.AddRange(bccArray.Select(bcc => new MailboxAddress(null, bcc)));
        //    }

        //    if (attachments?.Count > 0)
        //    {
        //        var multipart = new Multipart("mixed")
        //        {
        //            textPart
        //        };

        //        foreach ( var fileInfo in attachments)
        //        {
        //            var filePath = fileInfo.FullName;
        //            var attachment = new MimePart()
        //            {
        //                Content = new MimeContent(File.OpenRead(filePath)),
        //                ContentDisposition = new ContentDisposition(ContentDisposition.Attachment),
        //                ContentTransferEncoding = ContentEncoding.Base64,
        //                FileName = Path.GetFileName(filePath)
        //            };

        //            multipart.Add(attachment);
        //            message.Body = multipart;
        //        }
        //    }
        //    else
        //    {
        //        message.Body = textPart;
        //    }

        //    return message;
        //}

        //private string SendMail(string host, int port, bool useSsl, string id, string password, MimeMessage message)
        //{
        //    string result = null;

        //    using (var client = new SmtpClient())
        //    {
        //        client.Connect(host, port, useSsl);
        //        client.Authenticate(id, password);
        //        result = client.Send(message);
        //        client.Disconnect(true);
        //    }

        //    return result;
        //}

        public object OnRun(IDictionary<string, object> properties)
        {
            string[] result = null;
            
            var protocol = properties[ProtocolPropKey]?.ToStr();
            var host = properties[HostNamePropKey]?.ToStr();
            var port = (int)properties[PortPropKey]?.ToIntValue();
            var id = properties[IdPorpKey]?.ToStr();
            var password = properties[PwdPropKey]?.ToStr();
            var useSsl = (bool)properties[UseSSLPropKey]?.ToBoolValue();

            var beginTime = properties[BeginTimePropKey]?.ToStr();
            var endTime = properties[EndTimePropKey]?.ToStr();
            var sender = properties[SenderPropKey]?.ToStr();
            var subject = properties[SubjectPropKey]?.ToStr();
            var maxCount = properties[MaxCountPropKey]?.ToIntValue() ?? 0;
            var startNo = properties[StartNoPropKey]?.ToIntValue() ?? 0;
            var withContents = properties[WithContentsPropKey].ToBoolValue();
            var ignoreHTMLTag = properties[IgnoreHTMLTagPropKey].ToBoolValue();
            var ignoreBodyAttachments = properties[IgnoreBodyAttachmentsPropKey].ToBoolValue();
            var recentFirst = properties[RecentFirstPropKey].ToBoolValue();
            var checkUnorderedList = properties[CheckUnorderedListPropKey].ToBoolValue();

            using (var client = new ImapClient())
            {
                client.Connect(host, port, useSsl ? SecureSocketOptions.SslOnConnect : SecureSocketOptions.None);
                client.Authenticate(id, password);
                client.Inbox.Open(FolderAccess.ReadOnly);

                var uids = client.Inbox.Search(SearchQuery.All);
                result = uids.Select(u => client.Inbox.GetMessage(u).Subject).ToArray();
                client.Disconnect(true);
            }

            return result;
        }
    }
}
