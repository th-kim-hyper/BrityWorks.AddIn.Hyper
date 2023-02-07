using BrityWorks.AddIn.Sample.Properties;
using RPAGO.AddIn;
using RPAGO.Common.Control;
using RPAGO.Common.Data;
using RPAGO.Common.Library;
using RPAGO.Common.Util;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Windows;
using Win32;
using Bitmap = System.Drawing.Bitmap;

namespace BrityWorks.AddIn.Sample.Activities
{
    public class TargetActivitySample : IActivityItem, ITargetActivity
    {
        private static readonly Logger Log = Logger.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        public static readonly PropKey OutputPropKey = new PropKey("Output", "Result");
        public static readonly PropKey LocationPropKey = new PropKey("Target", "Location");
        public static readonly PropKey BoundsPropKey = new PropKey("Target", "Bounds");
        public static readonly PropKey TargetImagePropKey = new PropKey("Target", "Image");
        public static readonly PropKey TextPropKey = new PropKey("Target", "Text");
        public static readonly PropKey HwndPropKey = new PropKey("Target", "HWND");
        public static readonly PropKey FilePathPropKey = new PropKey("File", "Path");

        public string DisplayName => "Read Target";

        public Bitmap Icon => Resources.Get;

        public LibraryHeadlessType Mode => LibraryHeadlessType.Both;

        public PropKey DisplayTextProperty => TextPropKey;

        public PropKey OutputProperty => OutputPropKey;

        PropertySet PropertyList;

        public List<Property> OnCreateProperties()
        {
            var properties = new List<Property>()
            {
                new Property(this, OutputPropKey, "RESULT").SetRequired(),
                new Property(this, TextPropKey, ""),
                new Property(this, HwndPropKey, 1),
                new Property(this, LocationPropKey, new Point(0, 0)),
                new Property(this, BoundsPropKey, new Rect(0, 0, 0, 0)),
                new Property(this, FilePathPropKey, "''").SetControlType(PathControlType.Text),
            };

            return properties;
        }

        public void OnLoad(PropertySet properties)
        {
            PropertyList = properties;
        }

        public object OnRun(IDictionary<string, object> properties)
        {
            return "[" + properties[HwndPropKey] + "] " + properties[TextPropKey] + " - " + properties[BoundsPropKey]
                + "\n" + File.ReadAllText((string)properties[FilePathPropKey]);
        }


        #region ITargetActivity


        public PropKey TargetImageProperty => TargetImagePropKey;


        // 대상 지정을 시작한 후 마우스가 움지일 때마다 호출된다.
        // 마우스 이동시 반복 호출되므로 성능에 유의한다.
        // 여기서는 최소한의 정보만 획득하고 최종 선택시 추가 정보를 획득하는 것이 좋다.
        // 마우스가 위치한 곳의 대상 정보(rect, text)를 설정하면 대상객체를 표시하는 박스가 그려진다.
        public TrackingInfo OnTracking(Point pt)
        {
            try
            {
                Debug.Print("OnTracking: " + pt);

                // pt: 현재 마우스 위치
                // 대상 개체 종류에 따라 pt 위치의 객체정보를 얻는 방식이 다르다.
                // 아래 예시는 Win32 API 를 이용하여 Windows 정보를 얻는 예제이다.
                IntPtr hwnd = WinApi.GetWindowFromPoint(pt);
                var rect = WinApi.GetWindowRect(hwnd);
                var text = WinApi.GetWindowName(hwnd); // 실제 구현시에는 대부분 text없이 rect 만 표시하지만, 예제에는 함께 표시한다.

                var trackingInfo = new TrackingInfo(
                    new SampleObjectInfo(hwnd, rect, text),
                    new DrawBoundaryInfo(rect, text),
                    null);

                return trackingInfo;
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }
            return null;
        }

        // 마우스 클릭하여 대상을 최종 선택하면 호출된다.
        // 선택된 대상의 정보를 가공하여 미리 선언한 Property 의 Value에 기록한다.
        // 주의) Value 입력시 선언한 Property의 타입이 일치하도록 한다.
        public Bitmap OnTrackingCompleted(TrackingInfo trackingInfo, Point downPoint, Point upPoint)
        {
            try
            {
                Debug.Print("OnTrackingCompleted: " + downPoint + ", " + upPoint);

                if (trackingInfo == null)
                    return null;

                PropertyList[LocationPropKey].Value = upPoint;

                SampleObjectInfo sampleObjInfo = trackingInfo.ObjectInfo as SampleObjectInfo;
                PropertyList[BoundsPropKey].Value = sampleObjInfo.Bounds;
                PropertyList[TextPropKey].Value = "'" + sampleObjInfo.Text + "'";

                // downPoint, upPoint, LastFound 등을 이용해 더 자세한 정보를 다시 추출하여 Property를 설정할 수 있다.
                PropertyList[FilePathPropKey].Value = "'" + CheckTextFilePath(sampleObjInfo.Text) + "'";
                PropertyList[HwndPropKey].Value = WinApi.GetProcessFromWindow(sampleObjInfo.Hwnd);

                return CaptureUtil.CaptureImage(new Rect(upPoint.X - 100, upPoint.Y - 100, 200, 200));
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }
            return null;
        }

        private class SampleObjectInfo
        {
            public IntPtr Hwnd { get; set; }
            public Rect Bounds { get; set; }
            public string Text { get; set; }

            public SampleObjectInfo(IntPtr hwnd, Rect bounds, string text)
            {
                Hwnd = hwnd;
                Bounds = bounds;
                Text = text;
            }
        }

        private string CheckTextFilePath(string text)
        {
            if (File.Exists(text))
                return text;
            return "not exist file: " + text;
        }

        #endregion ITargetActivity
    }
}
