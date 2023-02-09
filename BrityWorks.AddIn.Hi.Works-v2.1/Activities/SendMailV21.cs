using BrityWorks.AddIn.Hi.Works.Properties;
using RPAGO.AddIn;

namespace BrityWorks.AddIn.Hi.Works.Activities
{
    public class SendMailV21 : SendMail, IActivityItem
    {
        public new string DisplayName => "DisplayName_SendMailV21".GetResource("Hi. Send Mail v2.1");
        public new System.Drawing.Bitmap Icon => Resources.send_mail;
    }
}
