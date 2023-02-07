using BrityWorks.AddIn.Hyper.Activities;
using BrityWorks.AddIn.Hyper.Properties;
using RPAGO.AddIn;
using System.Collections.Generic;
using System.Drawing;

namespace BrityWorks.AddIn.Hyper
{
    public class AddIn : ActivityAddInBase
    {
        protected override string AddInDisplayName => "Hyperinformation";

        protected override Bitmap AddInIcon => Resources.hi_works;

        protected override Bitmap AddInOverIcon => Resources.hi_works_over;

        protected override List<IActivity> CreateActivites()
        {
            List<IActivity> activities = new List<IActivity>
            {
                new CloseWindowHwnd(),
                new CaptureChrome(),
                new SendMail(),
                new ReceiveMail(),
            };

            return activities;
        }
    }
}
