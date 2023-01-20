using MailKit.Net.Smtp;
using MimeKit;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace TestApp
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("김태현", "th.kim@hyperinfo.co.kr"));
            message.To.Add(new MailboxAddress("이득훈", "deukhoon.lee@hyperinfo.co.kr"));
            message.Subject = "하이퍼 Send mail 테스트";
            message.Body = new TextPart("plain")
            {
                Text = @"안녕하세요~
test mail
테스트 메일

thanks."
            };

            using (var client = new SmtpClient())
            {
                client.Connect("smtp.mailplug.co.kr", 465, true);

                // Note: only needed if the SMTP server requires authentication
                client.Authenticate("th.kim@hyperinfo.co.kr", "G!493o18");

                client.Send(message);
                client.Disconnect(true);
            }
        }
    }
}
