using BrityWorks.AddIn.Hyper.Properties;
using MailKit.Net.Smtp;
using MimeKit;
using RPAGO.AddIn;
using RPAGO.Common.Data;
using RPAGO.Common.Event;
using RPAGO.Common.Library;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Security.Cryptography;
using System.Windows;
using Bitmap = System.Drawing.Bitmap;

namespace BrityWorks.AddIn.Hyper.Activities
{
    public class SendMailEx : IActivityItem
    {
        public static readonly PropKey OutputPropKey = new PropKey("Group1", "Prop1");
        public static readonly PropKey Num1PropKey = new PropKey("Group1", "Prop2");
        public static readonly PropKey Num2PropKey = new PropKey("Group2", "Prop3");
        public static readonly PropKey LocationPropKey = new PropKey("Group2", "Prop4");
        public static readonly PropKey TogglePropKey = new PropKey("Group2", "Prop5");
        public static readonly PropKey SelectPropKey = new PropKey("Group2", "Prop6");
        public static readonly PropKey FilePropKey = new PropKey("Files", "File");
        public static readonly PropKey TextFilePropKey = new PropKey("Files", "TextFile");

        public string DisplayName => "Hyper Send Mail";

        public Bitmap Icon => Resources.excute;

        public LibraryHeadlessType Mode => LibraryHeadlessType.Both;

        public PropKey DisplayTextProperty => OutputPropKey;

        public PropKey OutputProperty => OutputPropKey;

        private PropertySet PropertyList;

        public List<Property> OnCreateProperties()
        {
            var properties = new List<Property>()
            {
                new Property(this, OutputPropKey, "RESULT").SetRequired(),
                new Property(this, Num1PropKey, 1),
                new Property(this, Num2PropKey, 1.0),
                new Property(this, LocationPropKey, new Point(0, 0)),
                new Property(this, TogglePropKey, true),
                new Property(this, SelectPropKey, "item1").SetDropDownList("item1;item2;item3;item4").SetValueChangedHandler(OnTogglePropValueChanged),
                new Property(this, FilePropKey, "''").SetControlType(PropertyControls.PropertyItemPathView),
                new Property(this, TextFilePropKey, "''").SetControlType(PathControlType.Text),
            };

            return properties;
        }

        public void OnLoad(PropertySet properties)
        {
            PropertyList = properties;
        }

        void OnTogglePropValueChanged(object oldValue, object newValue)
        {
            var togglePropItem = PropertyList[TogglePropKey];
            if ((string)newValue == "item1")
            {
                togglePropItem.SetVisible(true);
            }
            else if ((string)newValue == "item2")
            {
                togglePropItem.SetVisible(false);
            }
            else if ((string)newValue == "item3")
            {
                togglePropItem.Value = true;
            }
            else
            {
                togglePropItem.Value = false;
            }
            ReloadPropertyEvent.Publish();
        }

        private string SendMail(string host, int port, bool useSsl, string email, string password, MimeMessage message)
        {
            string result = null;

            using (var client = new SmtpClient())
            {
                client.Connect(host, port, useSsl);
                client.Authenticate(email, password);

                result = client.Send(message);
                client.Disconnect(true);
            }

            return result;
        }


        public object OnRun(IDictionary<string, object> properties)
        {
            var result = "";
            var host = "smtp.mailplug.co.kr";
            var port = 465;
            var useSsl = true;
            var email = "chatbot@hyperinfo.co.kr";
            var toMail = "deukhoon.lee@hyperinfo.co.kr";
            var password = "superadmin!23";


            using (var message = new MimeMessage())
            {
                message.From.Add(new MailboxAddress(null, email));
                message.To.Add(new MailboxAddress(null, toMail));
                message.Subject = "하이퍼 Send mail 테스트2";
                message.Body = new TextPart("plain")
                {
                    Text = @"안녕하세요,
 
Brity Automation 기본개발자과정(1/17-19) 중 
3일차(1/19,목) Brity Chat 실습 관련하여 안내 드립니다.
 
1,2일차 강의시 사전 안내해 드린바와 같이
교육계정 갯수가 제한되어 아래와 같이 각 사별로 사용할 수 있는 계정ID를 기재하였으니 참고하시고
사별 입과자들께서는 각 사에 분배된 계정ID 범위내에서만 꼭 사용해주시길 당부 드립니다.
"
                };

                result = SendMail(host, port, useSsl, email, password, message);
            }

            return result;

            //return properties[LocationPropKey] + " : "
            //    + ((int)properties[Num1PropKey] + (double)properties[Num2PropKey])
            //    + "\n" + properties[FilePropKey]
            //    + "\n" + File.ReadAllText((string)properties[TextFilePropKey]);
        }
    }
}
