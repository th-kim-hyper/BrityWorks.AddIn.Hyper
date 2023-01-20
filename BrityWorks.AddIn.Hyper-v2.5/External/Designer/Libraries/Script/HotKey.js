
Script.HotKey = new function () {
    
    this.OpenExecutionWindow = function() {
        Win.SendKeys('LWin,R,,-LWin');
    }

    this.MaximizeWindow = function() {
        Win.SendKeys('LMenu,Space,,X,,-LMenu');
    }

    this.CloseWindow = function() {
        Win.SendKeys('LMenu,F4,,-LMenu');
    }
}