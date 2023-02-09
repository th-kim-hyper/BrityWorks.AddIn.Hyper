using BrityWorks.AddIn.Hi.Works.Activities;
using BrityWorks.AddIn.Hi.Works.Properties;
using RPAGO.AddIn;
using System.Collections.Generic;
using System.Drawing;

namespace BrityWorks.AddIn.Hi.Works
{
    public class AddIn : ActivityAddInBase
    {
        protected override string AddInDisplayName => "Hi. Works v2.5";

        protected override Bitmap AddInIcon => Resources.hi_works;

        protected override Bitmap AddInOverIcon => Resources.hi_works_over;

        protected override List<IActivity> CreateActivites()
        {
            List<IActivity> activities = new List<IActivity>
            {
                new CloseWindowHwnd_v25(),
                new CaptureChrome_v25(),
                //new SendMail(),
                //new ReceiveMail(),
            };

            return activities;
        }
    }
}
