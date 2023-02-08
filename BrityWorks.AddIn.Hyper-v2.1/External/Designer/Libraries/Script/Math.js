
//////////////////////////////////////////////////////////////////////////
//  수학 관련 라이브러리
//////////////////////////////////////////////////////////////////////////

Script.Math = new function () {
    /*
        Function: Round
    
        지정한 자리수의 반올림한 값을 반환함.
    
        Parameters:
            orgNum - 반올림할 숫자
            pos - 반올림할 자리수. 음수값은 소수점 단위
        
        Returns:
            반올림된 값을 반환함.
        
        (start code)
    
        var testNum = 233.583;
        var resNum;
        
        resNum = RoundNumber(testNum, -2);		// 233.58
        resNum = RoundNumber(testNum, -1);		// 233.6
        resNum = RoundNumber(testNum, 0);		// 233
        resNum = RoundNumber(testNum, 1);		// 230
        resNum = RoundNumber(testNum, 2);		// 200
    
        (end)
    */
    this.Round = function (orgNum, pos) {
        var num = orgNum;

        if (pos < 0) {
            var move = 1;
            for (var i = 0; i > pos; i--)
                move *= 10;

            num = Math.round(orgNum * move) / move;
        }
        else if (pos > 0) {
            var move = 1;
            for (var i = 0; i < pos; i++)
                move *= 10;

            num = Math.round(orgNum / move) * move;
        }
        else {
            num = parseInt(orgNum);
        }

        return num;
    }

    //https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math
    this.Max = function (value1, value2) {
        return Math.max(value1, value2);
    }

    this.Abs = function (value) {
        return Math.abs(value);
    }
}