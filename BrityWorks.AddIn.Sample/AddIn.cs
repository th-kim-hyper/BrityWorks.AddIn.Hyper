using BrityWorks.AddIn.Sample.Activities;
using BrityWorks.AddIn.Sample.Properties;
using RPAGO.AddIn;
using System.Collections.Generic;
using System.Drawing;

namespace BrityWorks.AddIn.Sample
{
    public class AddIn : ActivityAddInBase
    {
        protected override string AddInDisplayName => "Sample";

        protected override Bitmap AddInIcon => Resources.Custom;

        protected override Bitmap AddInOverIcon => Resources.Custom_Over;

        protected override List<IActivity> CreateActivites()
        {
            List<IActivity> activities = new List<IActivity>
            {
                new NormalActivitySample(),
                new TargetActivitySample(),
                new WWFActivitySample(),
            };

            return activities;
        }
    }
}
