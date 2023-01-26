using BrityWorks.AddIn.Hyper.Properties;
using MailKit.Net.Smtp;
using MimeKit;
using MimeKit.Text;
using RPAGO.AddIn;
using RPAGO.Common.Data;
using RPAGO.Common.Library;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Bitmap = System.Drawing.Bitmap;

namespace BrityWorks.AddIn.Hyper.Activities
{
    public class SendMailEx : IActivityItem
    {
        public static readonly PropKey OutputPropKey = new PropKey("OUTPUT", "Output");

        public static readonly PropKey HostNamePropKey = new PropKey("CONNECTION", "HostName");
        public static readonly PropKey PortPropKey = new PropKey("CONNECTION", "Port");
        public static readonly PropKey IdPorpKey = new PropKey("CONNECTION", "ID");
        public static readonly PropKey PwdPropKey = new PropKey("CONNECTION", "Password");
        public static readonly PropKey UseSSLPropKey = new PropKey("CONNECTION", "UseSSL");

        public static readonly PropKey SenderPropKey = new PropKey("MAIL", "Sender");
        public static readonly PropKey ReceiversPropKey = new PropKey("MAIL", "Receivers");
        public static readonly PropKey CcsPropKey = new PropKey("MAIL", "Ccs");
        public static readonly PropKey BccsPropKey = new PropKey("MAIL", "Bccs");
        public static readonly PropKey SubjectPropKey = new PropKey("MAIL", "Subject");
        public static readonly PropKey AttachmentsPropKey = new PropKey("MAIL", "Attachments");
        public static readonly PropKey FileSizePropKey = new PropKey("MAIL", "FileSize");
        public static readonly PropKey BodyPropKey = new PropKey("MAIL", "Body");
        public static readonly PropKey IsHTMLPropKey = new PropKey("MAIL", "IsHTML");

        public string DisplayName => "Hyper Send Mail";

        public Bitmap Icon => Resources.mail;

        public LibraryHeadlessType Mode => LibraryHeadlessType.Both;

        public PropKey DisplayTextProperty => new PropKey("", "HyperInfo Send Mail");

        public PropKey OutputProperty => OutputPropKey;

        private PropertySet PropertyList;

        public List<Property> OnCreateProperties()
        {
            var properties = new List<Property>()
            {
                new Property(this, OutputPropKey, "RESULT"){ IsVisible = false },
                new Property(this, HostNamePropKey, "'smtp.mail.com'").SetRequired(),
                new Property(this, PortPropKey, 465).SetRequired(),
                new Property(this, IdPorpKey, "'from@mail.com'").SetRequired(),
                new Property(this, PwdPropKey, "", true).SetControlType(PropertyControls.PropertyItemPasswordView).SetRequired(),
                new Property(this, UseSSLPropKey, true),
                new Property(this, SenderPropKey, "'from@mail.com'").SetRequired(),
                new Property(this, ReceiversPropKey, "'to@mail.com'").SetRequired(),
                new Property(this, CcsPropKey, ""),
                new Property(this, BccsPropKey, ""),
                new Property(this, SubjectPropKey, ""),
                new Property(this, AttachmentsPropKey, ""),
                new Property(this, FileSizePropKey, 0),
                new Property(this, BodyPropKey, ""),
                new Property(this, IsHTMLPropKey, false),
            };

            return properties;
        }

        public void OnLoad(PropertySet properties)
        {
            PropertyList = properties;
        }

        private List<FileInfo> GetFiles(string files)
        {
            List<FileInfo> result = null;

            if(files?.Length > 0)
            {
                var fileArray = files.Split(';');

                if (fileArray?.Length > 0)
                {
                    result = fileArray.Select(file => new FileInfo(file)).ToList();
                }
            }

            return result;
        }

        private MimeMessage CreateMessage(string sender, string receivers, string subject, string body
            , bool isHTML = false, string ccs = null, string bccs = null, List<FileInfo> attachments = null)
        {
            var receiverArray = receivers?.Split(';');
            var ccArray = ccs?.Split(';');
            var bccArray = bccs?.Split(';');
            var entities = new List<MimeEntity>();
            var textFormat = (isHTML) ? TextFormat.Html : TextFormat.Plain;
            var textPart = new TextPart(textFormat) { Text = body };
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(null, sender));
            message.Subject = subject;
            message.To.AddRange(receiverArray.Select(receiver => new MailboxAddress(null, receiver)));
            
            if (ccArray?.Length > 0)
            {
                message.Cc.AddRange(ccArray.Select(cc => new MailboxAddress(null, cc)));
            }

            if (bccArray?.Length > 0)
            {
                message.Bcc.AddRange(bccArray.Select(bcc => new MailboxAddress(null, bcc)));
            }

            if (attachments?.Count > 0)
            {
                var multipart = new Multipart("mixed")
                {
                    textPart
                };

                foreach ( var fileInfo in attachments)
                {
                    var filePath = fileInfo.FullName;
                    var attachment = new MimePart()
                    {
                        Content = new MimeContent(File.OpenRead(filePath)),
                        ContentDisposition = new ContentDisposition(ContentDisposition.Attachment),
                        ContentTransferEncoding = ContentEncoding.Base64,
                        FileName = Path.GetFileName(filePath)
                    };

                    multipart.Add(attachment);
                    message.Body = multipart;
                }
            }
            else
            {
                message.Body = textPart;
            }

            return message;
        }

        private string SendMail(string host, int port, bool useSsl, string id, string password, MimeMessage message)
        {
            string result = null;

            using (var client = new SmtpClient())
            {
                client.Connect(host, port, useSsl);
                client.Authenticate(id, password);
                result = client.Send(message);
                client.Disconnect(true);
            }

            return result;
        }


        public object OnRun(IDictionary<string, object> properties)
        {
            string result = "";
            List<FileInfo> files = null;
            var host = properties[HostNamePropKey]?.ToStr();
            var port = (int)properties[PortPropKey]?.ToIntValue();
            var id = properties[IdPorpKey]?.ToStr();
            var password = properties[PwdPropKey]?.ToStr();
            var useSsl = (bool)properties[UseSSLPropKey]?.ToBoolValue();
            var sender = properties[SenderPropKey]?.ToStr();
            var receivers = properties[ReceiversPropKey]?.ToStr();
            var ccs = properties[CcsPropKey]?.ToStr();
            var bccs = properties[BccsPropKey]?.ToStr();
            var subject = properties[SubjectPropKey]?.ToStr();
            var attachments = properties[AttachmentsPropKey]?.ToStr();
            var maxFileSize = (int)properties[FileSizePropKey]?.ToIntValue();
            var body = properties[BodyPropKey]?.ToStr();
            var isHTML = (bool)properties[IsHTMLPropKey]?.ToBoolValue();

            if (attachments?.Length > 0)
            {
                files = GetFiles(attachments);

                if (files?.Count > 0 && maxFileSize > 0)
                {
                    var size = (int)(files.Sum(f => f.Length));
                    var megaByte = 1024 * 1024;

                    if (size > maxFileSize * megaByte)
                    {
                        throw new Exception("첨부파일 크기가 최대값을 초과 하였습니다.");
                    }
                }
            }

            using(var message = CreateMessage(sender, receivers, subject, body, isHTML, ccs, bccs, files))
            {
                result = SendMail(host, port, useSsl, id, password, message);
            }

            return result;
        }
    }
}
