using System;
using System.Collections.Generic;

namespace Hi.Works.Lib.Net461.Dto
{
    public class MailMessageDTO
    {
        public uint UinqueId { get; set; }
        public string MessageId { get; set; }
        public DateTime ReceiveDate { get; set; }
        public string Sender { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public bool IsHtml { get; set; } = false;
        public IList<string> Attachments { get; set; }
    }
}
