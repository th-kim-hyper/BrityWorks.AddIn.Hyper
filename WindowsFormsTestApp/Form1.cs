using Hi.Works.Lib.Net461;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Automation;
using System.Windows.Forms;
using System.Windows.Interop;
using System.Windows.Media.Media3D;
using static System.Windows.Forms.VisualStyles.VisualStyleElement;

namespace WindowsFormsTestApp
{
    public partial class Form1 : Form
    {


        [DllImport("user32.dll")]
        static extern bool CloseWindow(IntPtr hWnd);

        [DllImport("user32.dll")]
        static extern bool DestroyWindow(IntPtr hWnd);

        [DllImport("user32.dll", CharSet = CharSet.Auto)]
        public static extern int SendMessage(IntPtr hWnd, UInt32 Msg, IntPtr wParam, IntPtr lParam);

        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            var i = Convert.ToInt32(textBox1.Text, 16);
            //var hwnd = new IntPtr(i);
            BrityRPA.CloseWindowByHwnd(i);
        }

        private void button2_Click(object sender, EventArgs e)
        {
            var i = Convert.ToInt32(textBox1.Text, 16);
            var hwnd = new IntPtr(i);
            var targetControl = AutomationElement.FromHandle(hwnd);
            var windowPattern = targetControl.GetCurrentPattern(WindowPattern.Pattern) as WindowPattern;

            //DestroyWindow(hwnd);
            //SendMessage(hwnd, 0x0010, IntPtr.Zero, IntPtr.Zero);
            //SendMessage(hwnd, 0x0012, IntPtr.Zero, IntPtr.Zero);
        }
    }
}
