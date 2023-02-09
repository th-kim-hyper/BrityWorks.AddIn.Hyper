using Microsoft.ClearScript.V8;
using Microsoft.ClearScript;
using RPAGO.AddIn;
using System.Collections.Generic;
using System;
using Hi.Works.Lib.Net461;
using RPAGO.Common.Data;
using RPAGO.Core.WinDriver;
using System.Runtime.InteropServices;

namespace BrityWorks.AddIn.Hi.Works.Activities
{
    public class CloseWindowHwndV30 : CloseWindowHwnd, IActivityItem
    {
        public new string DisplayName => "DisplayName_CloseWindowHwndV30".GetResource("Close Window Hwnd v3.0");

        public override object OnRun(IDictionary<string, object> properties)
        {
            // 클리어 스크립트 선언 ( 형변환 전용 )
            //V8ScriptEngine v8 = new V8ScriptEngine();

            //bool success = true;

            //try
            //{
            //    // properties[InputPorpKey] 자체가 object 형태이기 때문에, 전체가 아닌 해당 대상만 가져옴, hwnd 입력상태라면 hwnd을 가져옴
            //    var obj = properties[InputPropKey];

            //    // Hwmd 추출
            //    v8.AddHostObject("obj", HostItemFlags.GlobalMembers, obj);

            //    // hwnd 입력상태가 아니라면
            //    if ((bool)properties[OnOffPropKey] == false)
            //    {
            //        // Hwmd 추출
            //        v8.Execute("var hwnd = obj.AppHwnd");
            //    }
            //    else
            //    {
            //        // Hwmd 추출
            //        v8.Execute("var hwnd = obj");
            //    }

            //    // 형변환 int
            //    var str = Convert.ToInt32(v8.Evaluate("hwnd"));

            //    // str 체크 ( 잘못된 대상이면 0 )
            //    if (str != 0)
            //    {
            //        // 형변환 intptr
            //        IntPtr cast_str = new IntPtr(str);

            //        // 강제종료 여부
            //        bool force_chk = (bool)properties[ForcePropKey];

            //        // 창닫기 요청
            //        close_window(cast_str, force_chk, 0);
            //    }
            //    // 뭐 이상한거 있었으면 오류 발생
            //    else
            //    {
            //        success = false;
            //    }

            //}
            //// 오류 발생시 success = false, throw 발생
            //catch (Exception e)
            //{
            //    success = false;
            //    throw e.InnerException;
            //}

            //var obj = properties[InputPropKey];
            var isHwnd = properties[OnOffPropKey].ToBoolValue();
            var force = properties[ForcePropKey].ToBoolValue();

            int hwnd;

            if (isHwnd)
            {
                hwnd = properties[InputPropKey].ToIntValue();
            }
            else
            {
                var element = properties[InputPropKey] as UIAElement;
                hwnd = element.Hwnd;
            }

            var wm = (force) ? WM_DISTROY : WM_CLOSE;

            return Convert.ToBoolean(CloseWindow(new IntPtr(hwnd), wm));
        }

        [DllImport("user32.dll", CharSet = CharSet.Auto)]
        private static extern IntPtr SendMessage(IntPtr hWnd, UInt32 Msg, IntPtr wParam, IntPtr lParam);

        private const UInt32 WM_CLOSE = 0x0010;
        private const UInt32 WM_DISTROY = 0x0002;

        int CloseWindow(IntPtr hwnd, UInt32 wm)
        {
            return SendMessage(hwnd, wm, IntPtr.Zero, IntPtr.Zero).ToInt32();
        }

    }
}
