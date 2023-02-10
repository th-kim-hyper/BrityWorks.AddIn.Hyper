using RPAGO.Common.Data;
using System;
using System.Collections.Generic;
using PuppeteerSharp;
using BrityWorks.AddIn.Hi.Works.Properties;
using RPAGO.AddIn;
using RPAGO.Common.Library;
using System.Threading.Tasks;
using Microsoft.ClearScript;
using System.Windows;
using System.Xml.Linq;

namespace BrityWorks.AddIn.Hi.Works.Activities
{
    public class CaptureChrome : IActivityItem
    {
        // 디자이너 옵션들 (Resources/String/ xaml 파일들에서 세부내용 수정)
        public static readonly PropKey OutputPropKey = new PropKey("OUTPUT", "Result");
        public static readonly PropKey ChromeElementPropKey = new PropKey("Capture", "Prop2");
        public static readonly PropKey SaveDirPropKey = new PropKey("Capture", "Prop3");
        public static readonly PropKey FileNamePropKey = new PropKey("Capture", "Prop4");
        public static readonly PropKey FileExtensionPropKey = new PropKey("Capture", "Prop5");

        // 카드 이름
        public string DisplayName => "Chrome Find Capture";

        // 아이콘 설정
        public System.Drawing.Bitmap Icon => Resources.excute;

        public LibraryHeadlessType Mode => LibraryHeadlessType.Both;

        // 아웃풋 설정
        public PropKey DisplayTextProperty => OutputPropKey;
        public PropKey OutputProperty => OutputPropKey;

        // 아래에서 사용될 propertylist 선언
        protected PropertySet PropertyList;

        public virtual List<Property> OnCreateProperties()
        {
            var properties = new List<Property>()
            {
                // 카드의 옵션들에 대한 세부적인 설정 (내용, 들어가는 값 등)
                new Property(this, OutputPropKey, "RESULT").SetRequired(),
                new Property(this, ChromeElementPropKey, "").SetOrder(1).SetRequired(),
                new Property(this, SaveDirPropKey, "''").SetOrder(2).SetRequired(),
                new Property(this, FileNamePropKey, "''").SetOrder(3).SetRequired(),
                new Property(this, FileExtensionPropKey, "png").SetOrder(4).SetDropDownList("png;jpeg;"),
            };

            return properties;
        }

        public virtual void OnLoad(PropertySet properties)
        {
            PropertyList = properties;
        }

        // 실행 시 (카드 run)
        public virtual object OnRun(IDictionary<string, object> properties)
        {
            var result = false;

            try
            {
                var element = properties[ChromeElementPropKey] as ElementHandle;
                var dir = properties[SaveDirPropKey].ToStr();
                var fileName = properties[FileNamePropKey].ToStr();
                var extension = properties[FileExtensionPropKey].ToStr();
                var option = new ScreenshotOptions() { Type = ScreenshotType.Png };
                var savePath = System.IO.Path.Combine(dir, $"{fileName}.{extension}");

                if (!extension.EqualsEx("png", true))
                {
                    option.Type = ScreenshotType.Jpeg;
                }
                
                if (element is ElementHandle)
                {
                    var ctx = element.ExecutionContext;
                    var frame = ctx.Frame;
                    //var isReady = element.IsIntersectingViewportAsync().Result;
                    
                    //frame.WaitForTimeoutAsync(2000).Wait();
                    //var jtoken = ctx.EvaluateExpressionAsync("window.innerHeight + window.pageYOffset").Result;
                    //ctx.EvaluateExpressionAsync("window.scrollTo(0, " + jtoken.ToIntValue() + ")").Wait(2000);

                    //if (!isReady)
                    //{
                    //    //while(!isReady)
                    //    //{
                    //    //    ctx.EvaluateExpressionAsync("window.scrollBy(0, window.innerHeight)").Wait(2000);
                    //    //    isReady = element.IsIntersectingViewportAsync().Result;
                    //    //}

                    //    var jtoken = ctx.EvaluateExpressionAsync("window.scrollTo(0, document.body.scrollHeight)").Wait(2000);
                    //    //jtoken = ctx.EvaluateExpressionAsync("window.scrollTo(0, 0)").Wait(2000);
                    //    //var props = element.GetPropertiesAsync().Result;
                    //}
                    frame.WaitForTimeoutAsync(2000).Wait();
                    result = element.ScreenshotAsync(savePath, option).Wait(3000);
                }
            }
            // 오류 발생시 success 를 false로 설정하고, throw로 exception을 던짐.
            catch (Exception e)
            {
                result = false;
                throw e.InnerException;
            }

            // 결과값 리턴
            return result;
        }
    }
}
