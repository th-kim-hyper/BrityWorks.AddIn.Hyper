using Org.BouncyCastle.Tls;
using System;
using System.Diagnostics;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Runtime.Remoting.Messaging;
using System.Threading.Tasks;
using System.Windows;
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
            return CloseWindowByHwnd(new IntPtr(hwnd), force);
        }

        public static object GetInstanceField(Type type, object instance, string fieldName)
        {
            BindingFlags bindFlags = BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Static;
            FieldInfo field = type.GetField(fieldName, bindFlags);
            return field.GetValue(instance);
        }
    }
}
