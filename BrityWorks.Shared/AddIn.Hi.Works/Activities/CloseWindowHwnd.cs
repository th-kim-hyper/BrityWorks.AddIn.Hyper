using BrityWorks.AddIn.Hi.Works.Properties;
using Hi.Works.Lib.Net461;
using RPAGO.AddIn;
using RPAGO.Common.Data;
using RPAGO.Common.Library;
using RPAGO.Core.WinDriver;
using System;
using System.Collections.Generic;

namespace BrityWorks.AddIn.Hi.Works.Activities
{
    public class CloseWindowHwnd : IActivityItem
    {
        public static readonly PropKey OutputPropKey = new PropKey("OUTPUT", "Result");

        public static readonly PropKey TargetPropKey = new PropKey("Close", "Target");

        public static readonly PropKey ForcePropKey = new PropKey("Close", "Force");

        public static readonly PropKey IsHwndPropKey = new PropKey("Close", "IsHwnd");

        public string DisplayName => "Close Window Hwnd";

        public System.Drawing.Bitmap Icon => Resources.excute;

        public LibraryHeadlessType Mode => LibraryHeadlessType.Both;

        public PropKey DisplayTextProperty => OutputPropKey;

        public PropKey OutputProperty => OutputPropKey;

        protected PropertySet PropertyList;

        public virtual List<Property> OnCreateProperties()
        {
            var properties = new List<Property>()
            {
                new Property(this, OutputPropKey, "RESULT").SetRequired(),
                new Property(this, TargetPropKey, "").SetRequired(),

                new Property(this, ForcePropKey, false).SetControlType(PropertyControls.PropertyItemToggleView),
                new Property(this, IsHwndPropKey, false).SetControlType(PropertyControls.PropertyItemToggleView)
            };

            return properties;
        }

        public virtual void OnLoad(PropertySet properties)
        {
            PropertyList = properties;
        }

        public virtual object OnRun(IDictionary<string, object> properties)
        {
            var result = true;

            try
            {
                var isHwnd = properties[IsHwndPropKey].ToBoolValue();
                var force = properties[ForcePropKey].ToBoolValue();

                int hwnd;

                if (isHwnd)
                {
                    hwnd = properties[TargetPropKey].ToIntValue();
                }
                else
                {
                    var element = properties[TargetPropKey] as UIAElement;
                    hwnd = element.Hwnd;
                }

                BrityRPA.ActivateWindowByHwnd(hwnd);

                result = Convert.ToBoolean(BrityRPA.CloseWindowByHwnd(hwnd, force));
            }
            // 오류 발생시 success = false, throw 발생
            catch(Exception e)
            {
                result = false;
                throw e.InnerException;
            }

            return result;
        }
    }
}
