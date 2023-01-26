using BrityWorks.AddIn.Sample.Properties;
using RPAGO.AddIn;
using RPAGO.Common.Data;
using RPAGO.Common.Library;
using System.Activities;
using System.Collections.Generic;
using System.Windows;
using Bitmap = System.Drawing.Bitmap;

namespace BrityWorks.AddIn.Sample.Activities
{
    public class WWFActivitySample : IWWFActivityItem
    {
        public static readonly PropKey OutputPropKey = new PropKey("Group1", "Prop1");
        public static readonly PropKey Num1PropKey = new PropKey("Group1", "Prop2");
        public static readonly PropKey Num2PropKey = new PropKey("Group2", "Prop3");
        public static readonly PropKey LocationPropKey = new PropKey("Group2", "Prop4");

        public string DisplayName => "Do Something(WWF)";

        public Bitmap Icon => Resources.Set;

        public LibraryHeadlessType Mode => LibraryHeadlessType.Both;

        public PropKey DisplayTextProperty => OutputPropKey;

        public PropKey OutputProperty => OutputPropKey;

        public List<Property> OnCreateProperties()
        {
            var properties = new List<Property>()
            {
                new Property(this, OutputPropKey, "RESULT").SetRequired(),
                new Property(this, Num1PropKey, 1),
                new Property(this, Num2PropKey, 1.0),
                new Property(this, LocationPropKey, new Point(0, 0))
            };
            return properties;
        }

        public void OnLoad(PropertySet properties)
        {

        }

        public Activity OnCreateActivity(IDictionary<string, object> properties)
        {
            return new DoSomethingActivity()
            {
                Num1 = (int)properties[Num1PropKey],
                Num2 = (double)properties[Num2PropKey],
                Location = (Point)properties[LocationPropKey],
            };
        }

        public class DoSomethingActivity : CodeActivity
        {
            public InArgument<int> Num1 { get; set; }
            public InArgument<double> Num2 { get; set; }
            public InArgument<Point> Location { get; set; }

            public OutArgument<string> Result { get; set; }

            protected override void Execute(CodeActivityContext context)
            {
                Result.Set(context, Location.Get(context) + " : " + (Num1.Get(context) + Num2.Get(context)));
            }
        }

        public object OnActivityCompleted(IDictionary<string, object> result) // result에는 OutArgument 타입으로 지정된 값이 들어온다.
        {
            var activityResult = result["Result"] as string; // OutArgument<string> Result
            return activityResult;
        }
    }
}
