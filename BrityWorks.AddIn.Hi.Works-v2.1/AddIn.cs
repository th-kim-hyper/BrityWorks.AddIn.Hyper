using BrityWorks.AddIn.Hi.Works.Activities;
using BrityWorks.AddIn.Hi.Works.Properties;
using RPAGO.AddIn;
using System.Collections.Generic;
using System.Drawing;

namespace BrityWorks.AddIn.Hi.Works
{
    public class AddIn : ActivityAddInBase
    {
        protected override string AddInDisplayName => "Hi. Works v2.1";

        protected override Bitmap AddInIcon => Resources.Hyper;

        protected override Bitmap AddInOverIcon => Resources.Hyper_Over;

        protected override List<IActivity> CreateActivites()
        {
            List<IActivity> activities = new List<IActivity>
            {
                new CloseWindowHwnd_v21(),
                new CaptureChrome_v21(),
                new SendMail_v21(),
                new ReceiveMail_v21(),
            };

            return activities;
        }
    }
}
