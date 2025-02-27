﻿using BrityWorks.AddIn.Hi.Works.Properties;
using RPAGO.AddIn;

namespace BrityWorks.AddIn.Hi.Works.Activities
{
    public class SendMail_v25 : SendMail, IActivityItem
    {
        public new string DisplayName => "DisplayName_SendMailV25".GetResource("Hi. Send Mail v2.5");
        public new System.Drawing.Bitmap Icon => Resources.send_mail;
    }
}
