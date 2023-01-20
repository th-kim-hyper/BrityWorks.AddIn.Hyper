
//////////////////////////////////////////////////////////////////////////
//  ���� ���� ���̺귯��
//////////////////////////////////////////////////////////////////////////

Script.Math = new function () {
    /*
        Function: Round
    
        ������ �ڸ����� �ݿø��� ���� ��ȯ��.
    
        Parameters:
            orgNum - �ݿø��� ����
            pos - �ݿø��� �ڸ���. �������� �Ҽ��� ����
        
        Returns:
            �ݿø��� ���� ��ȯ��.
        
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