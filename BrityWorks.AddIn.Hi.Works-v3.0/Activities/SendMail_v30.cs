using BrityWorks.AddIn.Hi.Works.Properties;
using RPAGO.AddIn;
using System.Drawing;

namespace BrityWorks.AddIn.Hi.Works.Activities
{
    public class SendMail_v30 : SendMail, IActivityItem
    {
        public new string DisplayName => "Hyper Send Mail v3.0";
        public new Bitmap Icon => Resources.send_mail;
    }
}
