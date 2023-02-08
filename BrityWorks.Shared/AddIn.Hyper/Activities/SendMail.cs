using BrityWorks.AddIn.Hyper.Properties;
using HyperInfo.Lib.Net461.Mail;
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
    public class SendMail : IActivityItem
    {
        public static readonly PropKey OutputPropKey = new PropKey("Output", "Result");

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

        public Bitmap Icon { get; set; } = Resources.hi_works_excute;

        public LibraryHeadlessType Mode => LibraryHeadlessType.Both;

        public PropKey DisplayTextProperty => OutputPropKey;

        public PropKey OutputProperty => OutputPropKey;

        protected PropertySet PropertyList;

        public virtual List<Property> OnCreateProperties()
        {
            var properties = new List<Property>()
            {
                new Property(this, OutputPropKey, null).SetVisible(false),
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

        public virtual void OnLoad(PropertySet properties)
        {
            PropertyList = properties;
        }

        private IList<FileInfo> GetFiles(string files)
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

        public virtual object OnRun(IDictionary<string, object> properties)
        {
            string result = "";
            IList<FileInfo> files = null;
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

            result = HyperMail.SendMailWithFiles(attachments, host, port, useSsl, id, password, sender, receivers, subject, body, isHTML, ccs, bccs);

            return result;
        }
    }
}
