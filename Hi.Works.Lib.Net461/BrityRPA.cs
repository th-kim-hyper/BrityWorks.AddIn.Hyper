using Org.BouncyCastle.Tls;
using System;
using System.Diagnostics;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Runtime.Remoting.Messaging;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Automation;
using System.Windows.Controls;
using System.Windows.Interop;

namespace Hi.Works.Lib.Net461
{
    public static class BrityRPA
    {
        public static string Version()
        {
            return "1.0.0";
        }

        [DllImport("user32.dll", CharSet = CharSet.Auto)]
        public static extern int DestroyWindow(IntPtr hwnd);

        [DllImport("user32.dll", CharSet = CharSet.Auto)]
        public static extern int CloseWindow(IntPtr hwnd);

        public static int CloseWindowByHwnd(IntPtr hwnd, bool force)
        {
            var result = (force) ? DestroyWindow(hwnd) : CloseWindow(hwnd);
            return result;
        }

        public static int CloseWindowByHwnd(int hwnd, bool force = true)
        {
            var result = 0;
            var handle = new IntPtr(hwnd);
            var targeWindow = AutomationElement.FromHandle(handle);
            var windowPattern = targeWindow.GetCurrentPattern(WindowPattern.Pattern) as WindowPattern;

            windowPattern.Close();
            targeWindow = AutomationElement.FromHandle(handle);

            if (force && targeWindow != null && windowPattern.Current.WindowInteractionState == WindowInteractionState.BlockedByModalWindow)
            {
                var modalCondition = new PropertyCondition(WindowPattern.IsModalProperty, true);
                var modal = targeWindow.FindFirst(TreeScope.Descendants, modalCondition);
                var btnCondition = new PropertyCondition(AutomationElement.ControlTypeProperty, ControlType.Button);
                var keyCondition = new PropertyCondition(AutomationElement.AccessKeyProperty, "ALT+N", PropertyConditionFlags.IgnoreCase);
                var condition = new AndCondition(btnCondition, keyCondition);
                var noSaveBtn = modal.FindFirst(TreeScope.Descendants, condition);

                if(noSaveBtn == null)
                {
                    var nameCondition = new OrCondition(
                        new PropertyCondition(AutomationElement.NameProperty, "저장 안 함"),
                        new PropertyCondition(AutomationElement.NameProperty, "아니요(N)", PropertyConditionFlags.IgnoreCase)
                        );
                    condition = new AndCondition(btnCondition, nameCondition);
                    noSaveBtn = modal.FindFirst(TreeScope.Descendants, condition);
                }

                if(noSaveBtn != null)
                {
                    var invokePattern = noSaveBtn.GetCurrentPattern(InvokePattern.Pattern) as InvokePattern;
                    invokePattern.Invoke();
                    result = 1;
                }
            }

            return result;
        }

        public static object GetInstanceField(Type type, object instance, string fieldName)
        {
            BindingFlags bindFlags = BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Static;
            FieldInfo field = type.GetField(fieldName, bindFlags);
            return field.GetValue(instance);
        }
    }
}
