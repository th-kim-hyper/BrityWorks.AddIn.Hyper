
Script.String = new function () {

    /************************************************************************/
    /* http://www.webtoolkit.info/                                          */
    /************************************************************************/

    this.ReplaceAll = function (str, from, to) {
        var result = '';
        var prev = 0;
        var index = str.indexOf(from);
        while (index >= 0) {
            if (prev < index) {
                result += str.substring(prev, index);
            }
            result += to;
            prev = index + from.length;
            index = str.indexOf(from, prev);
        }

        if (prev < str.length) {
            result += str.substring(prev);
        }

        return result;
    }

    this.Trim = function (str, chars) {
        return this.LTrim(this.RTrim(str, chars), chars);
    }
    
    this.LTrim = function (str, chars) {
        chars = chars || "\\s";
        return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
    }
    
    this.RTrim = function (str, chars) {
        chars = chars || "\\s";
        return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
    }
    
    this.IsValid = function (parm, val) {
        if (parm == "") return true;
        for (var i = 0; i < parm.length; i++) {
            if (val.indexOf(parm.charAt(i), 0) == -1)
                return false;
        }
        return true;
    }

    this.IsNumber = function (parm) {
        var numb = '0123456789';
        return this.IsValid(parm, numb);
    }

    this.IsLower = function (parm) {
        var lwr = 'abcdefghijklmnopqrstuvwxyz';
        return this.IsValid(parm, lwr);
    }

    this.IsUpper = function (parm) {
        var upr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return this.IsValid(parm, upr);
    }

    this.IsAlpha = function (parm) {
        var lwr = 'abcdefghijklmnopqrstuvwxyz';
        var upr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return this.IsValid(parm, lwr + upr);
    }

    this.IsAlphanum = function (parm) {
        var numb = '0123456789';
        var lwr = 'abcdefghijklmnopqrstuvwxyz';
        var upr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        return this.IsValid(parm, lwr + upr + numb);
    }

    this.IsSpaceChar = function (ch) {
        if (ch == " " || ch == "\t") {
            return true;
        }
        return false;
    }

    this.IsValidFileName = function (name) {
        // 첫번째와 마지막이 공백인지 체크
        var chStart = name.substr(0, 1);
        var chEnd = name.substr(name.length - 1, 1);

        if (this.IsSpaceChar(chStart) == true) {
            return false;
        }

        if (this.IsSpaceChar(chEnd) == true) {
            return false;
        }

        try {
            var invalidchars = /[<>:\"/\\|?*]/;
            if (invalidchars.test(name) == true) {
                return false;
            }
        } catch (e) {
            Bot.Warn(e.description);
        }

        return true;
    }

    this.IsValidFunctionName = function (name) {
        if (name == "") {
            return false;
        }
        var i;
        var ch;
        for (var i = 0; i < name.length; i++) {
            ch = name.substr(i, 1);
            if (i == 0) {
                if (ch != "_" && this.IsAlpha(ch) == false) {
                    return false;
                }
            }
            else {
                if (ch != "_" && this.IsAlphanum(ch) == false) {
                    return false;
                }
            }
        }
        return true;
    }

    this.GetLineCount = function (str) {
        var lists = str.split("\n");
        return lists.length;
    }
}
