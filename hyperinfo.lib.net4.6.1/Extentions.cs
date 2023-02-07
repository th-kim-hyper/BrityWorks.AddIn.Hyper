using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hyperinfo.lib.net461
{
    public static class Extentions
    {
        public static DateTime Date(this DateTime dt)
        {
            var date = new DateTime(dt.Year, dt.Month, dt.Day);
            return date;
        }
    }
}
