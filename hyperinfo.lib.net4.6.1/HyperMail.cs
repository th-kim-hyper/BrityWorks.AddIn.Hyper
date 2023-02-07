using MailKit.Net.Imap;
using MailKit;
using MailKit.Search;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using MimeKit.Utils;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using MailKit.Net.Pop3;
using System.Globalization;
using MailKit.Net.Smtp;
using BrityWorks.AddIn.Hyper.Dto;

namespace hyperinfo.lib.net461
{
    public static class HyperMail
    {
        public static string Version()
        {
            return ".net4.6.1";
        }

        #region sendmail

        private static string SMTPSend(string host, int port, bool useSsl, string id, string password, MimeMessage message)
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

        private static MimeMessage CreateMessage(string sender, string receivers, string subject, string body
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

                foreach (var fileInfo in attachments)
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

        public static string SendMail(string host, int port, bool useSsl, string id, string password
            , string sender, string receivers, string subject, string body, bool isHTML = false
            , string ccs = null, string bccs = null)
        {
            var message = CreateMessage(sender, receivers, subject, body, isHTML, ccs, bccs);
            return SMTPSend(host, port, useSsl, id, password, message);
        }

        public static string SendMailWithFiles(List<FileInfo> attachments
            , string host, int port, bool useSsl, string id, string password
            , string sender, string receivers, string subject, string body, bool isHTML = false
            , string ccs = null, string bccs = null)
        {
            var message = CreateMessage(sender, receivers, subject, body, isHTML, ccs, bccs, attachments);
            return SMTPSend(host, port, useSsl, id, password, message);
        }

        #endregion sendmail

        #region receivemail

        private static IList<UniqueId> SearchInbox(IMailFolder inbox, string beginTime, string endTime, string sender, string subject)
        {
            var query = SearchQuery.All;
            var uids = null as IList<UniqueId>;

            if (beginTime?.Trim().Length > 0)
            {
                var bdt = DateTime.ParseExact(beginTime, "yyyy-MM-dd HH:mm:ss", null);
                query = query.And(SearchQuery.DeliveredAfter(bdt));
            }

            if (endTime?.Trim().Length > 0)
            {
                var edt = DateTime.ParseExact(endTime, "yyyy-MM-dd HH:mm:ss", null);
                query = query.And(SearchQuery.DeliveredBefore(edt));
            }

            if (sender?.Trim().Length > 0)
            {
                query = query.And(SearchQuery.FromContains(sender));
            }

            if (subject?.Trim().Length > 0)
            {
                query = query.And(SearchQuery.SubjectContains(subject));
            }

            uids = inbox.Search(query);
            return uids;
        }

        private static IList<MailMessageDTO> GetMessageByUidList(IMailFolder inbox, IList<UniqueId> uids, bool withAttachments, string saveDir)
        {
            IList<MailMessageDTO> result = null;

            if (uids?.Count > 0)
            {
                result = new List<MailMessageDTO>();

                foreach (var uid in uids)
                {
                    var headers = inbox.GetHeaders(uid);
                    var message = inbox.GetMessage(uid);
                    var receivedDate = headers[HeaderId.Received];
                    DateUtils.TryParse(receivedDate, out DateTimeOffset receivedDateOffset);
                    var messageSubject = headers[HeaderId.Subject];
                    var sender = headers[HeaderId.Sender];
                    var isHtml = (message.HtmlBody?.Length > 0);
                    var messageBody = message.TextBody;
                    var messageId = message.MessageId;
                    var attachments = null as List<string>;

                    if (isHtml)
                    {
                        messageBody = message.HtmlBody;
                    }

                    if (withAttachments == true && message?.Attachments?.Count() > 0)
                    {
                        attachments = new List<string>();

                        foreach (var attachment in message.Attachments)
                        {
                            var fileName = attachment.ContentDisposition?.FileName ?? attachment.ContentType.Name;

                            if (!Directory.Exists(saveDir))
                            {
                                Directory.CreateDirectory(saveDir);
                            }

                            var subDir = Path.Combine(saveDir, uid.Id.ToString());

                            if (!Directory.Exists(subDir))
                            {
                                Directory.CreateDirectory(subDir);
                            }

                            var savePath = Path.Combine(subDir, fileName);

                            using (var stream = File.Create(savePath))
                            {
                                if (attachment is MessagePart)
                                {
                                    var rfc822 = (MessagePart)attachment;
                                    rfc822.Message.WriteTo(stream);
                                }
                                else
                                {
                                    var part = (MimePart)attachment;
                                    part.Content.DecodeTo(stream);
                                }

                                attachments.Add(savePath);
                            }
                        }
                    }

                    var MailMessageDTO = new MailMessageDTO()
                    {
                        UinqueId = uid.Id,
                        ReceiveDate = receivedDateOffset.DateTime,
                        Sender = sender,
                        Subject = messageSubject,
                        Body = messageBody,
                        IsHtml = isHtml,
                        Attachments = attachments,
                    };

                    result.Add(MailMessageDTO);
                }
            }

            return result;
        }

        public static IList<MailMessageDTO> ReceiveIMAP(string host, int port, string id, string password, bool useSsl
            , string beginTime = null, string endTime = null, string sender = null
            , string subject = null, bool withAttachments = false, string saveDir = null)
        {
            IList<MailMessageDTO> messages = null;

            using (var client = new ImapClient())
            {
                var query = SearchQuery.All;
                var now = DateTime.Now;
                var uids = null as IList<UniqueId>;
                var attachments = null as List<string>;

                client.AuthenticationMechanisms.Remove("XOAUTH2");
                client.Connect(host, port, useSsl ? SecureSocketOptions.SslOnConnect : SecureSocketOptions.None);
                client.Authenticate(id, password);
                client.Inbox.Open(FolderAccess.ReadOnly);

                uids = SearchInbox(client.Inbox, beginTime, endTime, sender, subject);
                messages = GetMessageByUidList(client.Inbox, uids, withAttachments, saveDir);

                client.Inbox.Close();
                client.Disconnect(true);
            }

            return messages;
        }

        public static IList<String> ReceiveIMAPSubjects(string host, int port, string id, string password, bool useSsl
            , string beginTime = null, string endTime = null, string sender = null
            , string subject = null)
        {
            IList<String> subjects = null;

            using (var client = new ImapClient())
            {
                var query = SearchQuery.All;
                var now = DateTime.Now;
                var uids = null as IList<UniqueId>;
                var attachments = null as List<string>;

                client.AuthenticationMechanisms.Remove("XOAUTH2");
                client.Connect(host, port, useSsl ? SecureSocketOptions.SslOnConnect : SecureSocketOptions.None);
                client.Authenticate(id, password);
                client.Inbox.Open(FolderAccess.ReadOnly);

                uids = SearchInbox(client.Inbox, beginTime, endTime, sender, subject);
                subjects = uids.Select(uid => client.Inbox.GetHeaders(uid)[HeaderId.Subject]).ToList();

                client.Inbox.Close();
                client.Disconnect(true);
            }

            return subjects;
        }

        private static MailMessageDTO SearchPOP3Messages(HeaderList headers, MimeMessage message, uint uid, string beginTime, string endTime, string sender, string subject)
        {
            var MailMessageDTO = new MailMessageDTO();
            var format = "yyyy-MM-dd HH:mm:ss";
            var culture = CultureInfo.CurrentUICulture;
            var style = DateTimeStyles.None;

            var receivedDate = headers[HeaderId.Received];
            var isDateOffset = DateUtils.TryParse(receivedDate, out DateTimeOffset receivedDateOffset);

            var messageSubject = headers[HeaderId.Subject];
            var pop3sender = headers[HeaderId.Sender];

            if (beginTime?.Length > 0 && DateTime.TryParseExact(beginTime, format, culture, style, out DateTime beginDt))
            {
                if((receivedDateOffset.DateTime - beginDt).Ticks < 0)
                {
                    return null;
                }
            }

            if (endTime?.Length > 0 && DateTime.TryParseExact(beginTime, format, culture, style, out DateTime endDt))
            {
                if ((endDt - receivedDateOffset.DateTime).Ticks < 0)
                {
                    return null;
                }
            }

            if(sender?.Length > 0 && pop3sender?.Length > 0)
            {
                if (!pop3sender.ToLower().Contains(sender.ToLower()))
                {
                    return null;
                }
            }

            if (subject?.Length > 0 && messageSubject?.Length > 0)
            {
                if (!messageSubject.ToLower().Contains(subject.ToLower()))
                {
                    return null;
                }
            }

            var isHtml = (message.HtmlBody?.Length > 0);
            var messageBody = (isHtml) ? message.HtmlBody : message.TextBody;
            var messageId = message.MessageId;

            MailMessageDTO.UinqueId = uid;
            MailMessageDTO.MessageId = messageId;
            MailMessageDTO.ReceiveDate = receivedDateOffset.DateTime;
            MailMessageDTO.Sender = pop3sender;
            MailMessageDTO.Subject = messageSubject;
            MailMessageDTO.Body = messageBody;
            MailMessageDTO.IsHtml = isHtml;

            return MailMessageDTO;
        }

        private static IList<MailMessageDTO> GetPOP3Message(Pop3Client client
            , string beginTime = null, string endTime = null, string sender = null
            , string subject = null, bool withAttachments = false, string saveDir = null)
        {
            IList<MailMessageDTO> messages = null;

            if (client?.Count > 0)
            {
                messages = new List<MailMessageDTO>();

                for (int i = 0; i < client.Count; i++)
                {
                    var uid = (uint)i;
                    var headers = client.GetMessageHeaders(i);
                    var message = client.GetMessage(i);
                    var MailMessageDTO = SearchPOP3Messages(headers, message, uid, beginTime, endTime, sender, subject);

                    if (MailMessageDTO != null && withAttachments == true)
                    {
                        var subDir = Path.Combine(saveDir, uid.ToString()) ?? Path.Combine(".");
                        MailMessageDTO.Attachments = SaveAttachments(message, subDir);
                    }

                    messages.Add(MailMessageDTO);
                }
            }

            return messages;
        }

        private static IList<string> SaveAttachments(MimeMessage message, string saveDir)
        {
            var attachments = null as List<string>;

            if (message?.Attachments?.Count() > 0)
            {
                attachments = new List<string>();

                foreach (var attachment in message.Attachments)
                {
                    var fileName = attachment.ContentDisposition?.FileName ?? attachment.ContentType.Name;

                    if (!Directory.Exists(saveDir))
                    {
                        Directory.CreateDirectory(saveDir);
                    }

                    var savePath = Path.Combine(saveDir, fileName);

                    using (var stream = File.Create(savePath))
                    {
                        if (attachment is MessagePart)
                        {
                            var rfc822 = (MessagePart)attachment;
                            rfc822.Message.WriteTo(stream);
                        }
                        else
                        {
                            var part = (MimePart)attachment;
                            part.Content.DecodeTo(stream);
                        }

                        attachments.Add(savePath);
                    }
                }
            }

            return attachments;
        }

        public static IList<MailMessageDTO> ReceivePOP3(string host, int port, string id, string password, bool useSsl
            , string beginTime = null, string endTime = null, string sender = null
            , string subject = null, bool withAttachments = false, string saveDir = null)
        {
            IList<MailMessageDTO> messages = null;

            using (var client = new Pop3Client())
            {
                var query = SearchQuery.All;
                var now = DateTime.Now;
                var attachments = null as List<string>;

                client.AuthenticationMechanisms.Remove("XOAUTH2");
                client.Connect(host, port, useSsl ? SecureSocketOptions.SslOnConnect : SecureSocketOptions.None);
                client.Authenticate(id, password);

                messages = GetPOP3Message(client, beginTime, endTime, sender, subject, withAttachments, saveDir);

                client.Disconnect(true);
            }

            return messages;
        }

        public static IList<String> ReceivePOP3Subjects(string host, int port, string id, string password, bool useSsl
            , string beginTime = null, string endTime = null, string sender = null
            , string subject = null)
        {
            IList<String> result = null;

            using (var client = new ImapClient())
            {
                var query = SearchQuery.All;
                var now = DateTime.Now;
                var uids = null as IList<UniqueId>;
                var attachments = null as List<string>;

                client.AuthenticationMechanisms.Remove("XOAUTH2");
                client.Connect(host, port, useSsl ? SecureSocketOptions.SslOnConnect : SecureSocketOptions.None);
                client.Authenticate(id, password);
                client.Inbox.Open(FolderAccess.ReadOnly);

                uids = SearchInbox(client.Inbox, beginTime, endTime, sender, subject);
                result = uids.Select(uid => client.Inbox.GetHeaders(uid)[HeaderId.Subject]).ToList();

                client.Inbox.Close();
                client.Disconnect(true);
            }

            return result;
        }

        #endregion receivemail

    }
}
