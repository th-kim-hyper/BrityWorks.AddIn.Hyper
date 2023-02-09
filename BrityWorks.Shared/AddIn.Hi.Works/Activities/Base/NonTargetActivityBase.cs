using RPAGO.AddIn;
using RPAGO.Common.Data;
using RPAGO.Common.Library;
using System.Collections.Generic;
using System.Drawing;

namespace BrityWorks.AddIn.Hyper.Activities.Base
{
    public abstract class NonTargetActivityBase : IActivityItem
    {
        public static readonly PropKey OutputPropKey = new PropKey("Output", "Result");
        public virtual string DisplayName { get; }
        public abstract Bitmap Icon { get; }
        public virtual LibraryHeadlessType Mode { get; } = LibraryHeadlessType.Both;
        public virtual PropKey DisplayTextProperty { get; } = OutputPropKey;
        public virtual PropKey OutputProperty => OutputPropKey;
        protected PropertySet PropertyList { get; set; }

        public abstract void OnLoad(PropertySet properties);

        public abstract List<Property> OnCreateProperties();

        public abstract object OnRun(IDictionary<string, object> properties);
    }
}
