
Script.Bot = new function () {

    /////////////////////////////////////////////////////////////
    this.ToString = function (obj) {
        return Bot.ToString(obj);
    }
    this.ToArray = function (obj) {
        return Bot.ToArray(obj);
    }
    this.ToJson = function (obj, withoutArr) {
        return Bot.ToJson(obj, withoutArr);
    }
    this.ToXml = function (xmlText) {
        return Bot.ToXml(xmlText);
    }    

    this.GetCount = function (obj) {
        return Bot.GetCount(obj);
    }
    this.GetObjectInfo = function (obj) {
        return Bot.GetObjectInfo(obj);
    }
    this.GetProperties = function (obj) {
        var privateStr = '';
        var normalStr = '';
        var errorStr = '';

        try {
            for (var key in obj) {
                try {
                    if (key[0] == '_') {
                        if (typeof (obj[key]) == 'function') {
                            if (Bot.IsNull(obj[key].name))
                                privateStr += key + ' = ()\n';
                            else
                                privateStr += key + ' = ' + obj[key].name + '()\n';
                        } else {
                            privateStr += key + ' = ' + obj[key] + '\n';
                        }
                    } else {
                        if (typeof (obj[key]) == 'function') {
                            if (Bot.IsNull(obj[key].name))
                                normalStr += key + ' = ()\n';
                            else
                                normalStr += key + ' = ' + obj[key].name + '()\n';
                        } else {
                            normalStr += key + ' = ' + obj[key] + '\n';
                        }
                    }
                } catch (e) {
                    errorStr += key + ' = [ERROR] ' + e.message + '\n';
                }
            }
        } catch (e) {
            errorStr += '[ERROR] ' + e.message;
        }

        try {
            var str = normalStr;
            if (privateStr.length > 0) str += '\n----------------------------\n' + privateStr;
            if (errorStr.length > 0) str += '\n----------------------------\n' + errorStr;
            return str;
        } catch (e) {
            return e.message;
        }
    }


    /////////////////////////////////////////////////////////////
    this.AddHostType = function (name, typeName, assemblyName) {
        if (assemblyName == undefined)
            assemblyName = null;
        Bot.AddHostType(name, typeName, assemblyName);
    }
    this.CreateObject = function (typeName, assemblyName) {
        if (assemblyName == undefined)
            assemblyName = null;
        return Bot.CreateObject(typeName, assemblyName);
    }

    /////////////////////////////////////////////////////////////
    this.GetProgressInfo = function (taskName) {
        return Bot.GetProgressInfo(taskName);
    }
    this.GetLastRunStepID = function (taskName) {
        return Bot.GetLastRunStepID(taskName);
    }
    this.GetLastRunStepNo = function (taskName) {
        return Bot.GetLastRunStepNo(taskName);
    }
    this.GetStepIDFromNo = function (taskName) {
        return Bot.GetStepIDFromNo(taskName);
    }

    /////////////////////////////////////////////////////////////
    this.IsUndefined = function (obj) {
        return Bot.IsUndefined(obj);
    }
    this.IsNull = function (obj) {
        return Bot.IsNull(obj);
    }
    this.IsEmpty = function (obj) {
        return Bot.IsEmpty(obj);
    }
    this.IsArray = function (obj) {
        return Bot.IsArray(obj);
    }
    this.CharToInt = function (ch) {
        return Bot.CharToInt(ch);
    }
    this.IntToChar = function (num) {
        return Bot.IntToChar(num);
    }


    /////////////////////////////////////////////////////////////
    this.RunScript = function (script) {
        return Bot.RunScript(script);
    }
    this.RunScriptFile = function (path) {
        return Bot.RunScriptFile(path);
    }
} // Script.Bot


Script.Testing = new function () {
    /////////////////////////////////////////////////////////////
    this.Assert = function (result, msg) {
        Bot.Testing.Assert(result, msg != null ? msg : null);
    }
}