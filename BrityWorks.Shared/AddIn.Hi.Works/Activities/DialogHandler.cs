using RPAGO.Common.Data;
using System;
using System.Collections.Generic;
using PuppeteerSharp;
using BrityWorks.AddIn.Hi.Works.Properties;
using RPAGO.AddIn;
using RPAGO.Common.Library;
using RPAGO.Lib.Chrome;
using System.Linq;
using RPAGO.Common.Event;

namespace BrityWorks.AddIn.Hi.Works.Activities
{
    public class DialogHandler : IActivityItem
    {
        public static readonly PropKey OutputPropKey = new PropKey("OUTPUT", "Result");
        public static readonly PropKey BrowserPropKey = new PropKey("Dialog", "Browser");
        public static readonly PropKey DialogTypePropKey = new PropKey("Dialog", "DialogType");
        public static readonly PropKey DialogTextPropKey = new PropKey("Dialog", "DialogText");
        public static readonly PropKey PromptTextPropKey = new PropKey("Dialog", "PromptText");

        public string DisplayName => "Chrome Dialog Handler";
        public System.Drawing.Bitmap Icon => Resources.excute;
        public LibraryHeadlessType Mode => LibraryHeadlessType.Both;
        public PropKey DisplayTextProperty => OutputPropKey;
        public PropKey OutputProperty => OutputPropKey;

        protected PropertySet PropertyList;

        protected virtual string DialogTypes => $"{DialogType.Alert};{DialogType.Confirm};{DialogType.Prompt}";

        protected virtual void OnDialogTypeChanged(object oldValue, object newValue)
        {
            var value = newValue?.ToStr();
            var dialogTextProp = PropertyList[DialogTextPropKey];
            var promptTextProp = PropertyList[PromptTextPropKey];
            var textPropVisible = (value != DialogType.Alert.ToString());

            if(value == DialogType.Alert.ToString())
            {
                dialogTextProp.SetVisible(false);
                promptTextProp.SetVisible(false);
            }
            else if (value == DialogType.Confirm.ToString())
            {
                dialogTextProp.SetVisible(true);
                promptTextProp.SetVisible(false);
            }
            else if (value == DialogType.Prompt.ToString())
            {
                dialogTextProp.SetVisible(true);
                promptTextProp.SetVisible(true);
            }

            ReloadPropertyEvent.Publish();
        }

        public virtual List<Property> OnCreateProperties()
        {
            var properties = new List<Property>()
            {
                new Property(this, OutputPropKey, "RESULT").SetInternal(),
                new Property(this, BrowserPropKey, "", DataTypes.Any, DataFormatTypes.Any).SetRequired(),
                new Property(this, DialogTypePropKey, DialogTypes.Split(';')[0]).SetDropDownList(DialogTypes),
                new Property(this, DialogTextPropKey, ""),
                new Property(this, PromptTextPropKey, ""),
            };

            return properties;
        }

        public virtual void OnLoad(PropertySet properties)
        {
            properties[DialogTypePropKey].ResetValueChangedHandler().SetValueChangedHandler(OnDialogTypeChanged);
            //properties[DialogTextPropKey].ResetValueChangedHandler().SetValueChangedHandler(OnDateTimeChanged);
            //properties[PromptTextPropKey].ResetValueChangedHandler().SetValueChangedHandler(OnProtocolChanged);
            properties.Values.ToList().ForEach((item) => item.SetOrder(properties.Values.ToList().IndexOf(item)));

            PropertyList = properties;
        }

        public virtual object OnRun(IDictionary<string, object> properties)
        {
            var result = false;

            try
            {
                var browser = properties[BrowserPropKey] as ChromeBrowserObject;
                var page = browser.Page as Page;
                page.Dialog += Page_Dialog;
                //var dir = properties[DialogTypePropKey].ToStr();
                //var fileName = properties[DialogTextPropKey].ToStr();
                //var extension = properties[PromptTextPropKey].ToStr();
                //var option = new ScreenshotOptions() { Type = ScreenshotType.Png };
                //var savePath = System.IO.Path.Combine(dir, $"{fileName}.{extension}");

                //if (!extension.EqualsEx("png", true))
                //{
                //    option.Type = ScreenshotType.Jpeg;
                //}
                
                //if (browser is ElementHandle)
                //{
                //    var ctx = browser.ExecutionContext;
                //    var frame = ctx.Frame;
                    
                //    frame.WaitForTimeoutAsync(2000).Wait();
                //    result = browser.ScreenshotAsync(savePath, option).Wait(3000);
                //}
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

        private async void Page_Dialog(object sender, DialogEventArgs e)
        {
            var dialogType = PropertyList[DialogTypePropKey].ToStr();
            var dialogText = PropertyList[DialogTextPropKey].ToStr();
            var promptText = PropertyList[PromptTextPropKey].ToStr();
            var page = sender as Page;
            var message = e.Dialog.Message;

            if (e.Dialog.DialogType.ToString() == dialogType)
            {
                if (dialogType == DialogType.Alert.ToString())
                {
                    await e.Dialog.Accept();
                }
                else if (dialogType == DialogType.Confirm.ToString())
                {
                    if (dialogText == null || message.IndexOf(dialogType, StringComparison.CurrentCultureIgnoreCase) >= 0)
                    {
                        await e.Dialog.Accept();
                    }
                    else
                    {
                        await e.Dialog.Dismiss();
                    }
                }
                else if (dialogType == DialogType.Prompt.ToString())
                {
                    if (message.IndexOf(dialogType, StringComparison.CurrentCultureIgnoreCase) >= 0)
                    {
                        await e.Dialog.Accept(message);
                    }
                    else
                    {
                        await e.Dialog.Dismiss();
                    }
                }

                await e.Dialog.Accept();
                page.Dialog -= Page_Dialog;
                page.EvaluateExpressionAsync($"window.sessionStorage.setItem('__last_dialog_data__', {message})").Wait(1000);
            }
        }
    }
}
