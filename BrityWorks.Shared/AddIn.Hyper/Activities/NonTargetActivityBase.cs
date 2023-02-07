using RPAGO.AddIn;
using RPAGO.Common.Data;
using RPAGO.Common.Library;
using System.Collections.Generic;
using System.Drawing;

namespace BrityWorks.AddIn.Hyper.Activities
{
    public abstract class NonTargetActivityBase : IActivityItem
    {
        public static readonly PropKey OutputPropKey = new PropKey("Output", "Result");
        public abstract string DisplayName { get; }
        public abstract Bitmap Icon { get; }
        public virtual LibraryHeadlessType Mode => LibraryHeadlessType.Both;
        public virtual PropKey DisplayTextProperty => null;
        public virtual PropKey OutputProperty => OutputPropKey;
        public virtual PropertySet PropertyList { get; set; }

        public virtual void OnLoad(PropertySet properties)
        {
            PropertyList = properties;
        }

        public abstract List<Property> OnCreateProperties();

        public abstract object OnRun(IDictionary<string, object> properties);
    }
}
