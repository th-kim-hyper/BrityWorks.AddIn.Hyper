
Script.DateTime = new function () {

    this.Now = function () {
        return new Date();
    }

    this.GetWeek = function (date) {
        return new Date(date).getWeek();
    }

    this.AddYear = function (date, yearValue) {
        var result = new Date(date);
        result.setFullYear(result.getFullYear() + yearValue);
        return result;
    }

    this.AddMonth = function (date, monthValue) {
        var result = new Date(date);
        result.setMonth(result.getMonth() + monthValue);
        return result;
    }

    this.AddDay = function (date, dayValue) {
        var result = new Date(date);
        result.setDate(result.getDate() + dayValue);
        return result;
    }

    this.AddHours = function (date, hoursValue) {
        var result = new Date(date);
        result.setHours(result.getHours() + hoursValue);
        return result;
    }

    this.AddMinutes = function (date, minutesValue) {
        var result = new Date(date);
        result.setMinutes(result.getMinutes() + minutesValue);
        return result;
    }

    this.AddSeconds = function (date, secondsValue) {
        var result = new Date(date);
        result.setSeconds(result.getSeconds() + secondsValue);
        return result;
    }
}


Date.prototype.getWeek = function (dowOffset) {
    /*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */

    dowOffset = typeof (dowOffset) == 'number' ? dowOffset : 0; //default dowOffset to zero
    var newYear = new Date(this.getFullYear(), 0, 1);
    var day = newYear.getDay() - dowOffset; //the day of week the year begins on
    day = (day >= 0 ? day : day + 7);
    var daynum = Math.floor((this.getTime() - newYear.getTime() -
        (this.getTimezoneOffset() - newYear.getTimezoneOffset()) * 60000) / 86400000) + 1;
    var weeknum;
    //if the year starts before the middle of a week
    if (day < 4) {
        weeknum = Math.floor((daynum + day - 1) / 7) + 1;
        if (weeknum > 52) {
            nYear = new Date(this.getFullYear() + 1, 0, 1);
            nday = nYear.getDay() - dowOffset;
            nday = nday >= 0 ? nday : nday + 7;
            /*if the next year starts before the middle of
              the week, it is week #1 of that year*/
            weeknum = nday < 4 ? 1 : 53;
        }
    }
    else {
        weeknum = Math.floor((daynum + day - 1) / 7);
    }
    return weeknum;
};

Date.prototype.addHours = function (hoursValue) {
	this.setHours(this.getHours() + hoursValue);
    return this;
};

Date.prototype.addMinutes = function (minutesValue) {
	this.setMinutes(this.getMinutes() + minutesValue);
    return this;
};

Date.prototype.addSeconds = function (secondsValue) {
	this.setSeconds(this.getSeconds() + secondsValue);
    return this;
};

Date.prototype.addYears = function (yearValue) {
	this.setFullYear(this.getFullYear() + yearValue);
    return this;
};

Date.prototype.addMonths = function (monthValue) {
	this.setMonth(this.getMonth() + monthValue);
    return this;
};

Date.prototype.addDays = function (dayValue) {
	this.setDate(this.getDate() + dayValue);
    return this;
};

Date.prototype.toOADate = function() {
    var oaDate = new Date(1899, 11, 30);
    var millisecondsOfaDay = 24 * 60 * 60 * 1000;
    var result = (Date.parse(this) - Date.parse(oaDate)) / millisecondsOfaDay;
    return result;
};

Date.prototype.fromOADate = function(value) {
    var oaDate = new Date(1899, 11, 30);
    var millisecondsOfaDay = 24 * 60 * 60 * 1000;
    this.setTime((value * millisecondsOfaDay) + Date.parse(oaDate));
    return this;
};

 Date.prototype.toString = function(format){
	if(format == null)
		return this.toFormatString('yyyy-MM-dd HH:mm:ss');
	return this.toFormatString(format);
};

Date.prototype.toFormatString = function(format){
	return StringUtil.ToDateTimeFormatString(DateTime.Parse(this.toISOString()), format);
};