
Script.HotKey = new function () {
    
    this.OpenExecutionWindow = function() {
        Keyboard.SendKeys('LWin,R,,-LWin');
    }

    this.MaximizeWindow = function() {
        Keyboard.SendKeys('LMenu,Space,,X,,-LMenu');
    }

    this.CloseWindow = function() {
        Keyboard.SendKeys('LMenu,F4,,-LMenu');
    }
}