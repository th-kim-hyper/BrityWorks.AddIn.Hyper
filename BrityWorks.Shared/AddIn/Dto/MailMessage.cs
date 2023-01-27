using System;
using System.Collections.Generic;
using System.Text;

namespace BrityWorks.Shared.AddIn.Dto
{
    public class MailMessage
    {
        public uint UinqueId { get; set; }
        public DateTime ReceiveDate { get; set; }
        public string Sender { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public bool IsHtml { get; set; } = false;
    }
}
