(function (w) {
    w.$ = {};
    /*
        相当于
        w.$ = {
            drag :  funcition(){

            }
        } 
     */
    w.$.drag = function (testNode, progress, callBack) {
        var startPoint = {
            x: 0,
            y: 0
        }
        var elementPoint = {
            x: 0,
            y: 0
        }

        testNode.onmousedown = function (ev) {
            ev = ev || window.event;

            /* 设置捕获 */
            if (testNode.setCapture) {
                testNode.setCapture();
            }

            /* 
                元素一开始的位置 
             */
            startPoint.x = testNode.offsetLeft;
            startPoint.y = testNode.offsetTop;

            /*
                鼠标点击的位置 
             */
            elementPoint.x = ev.clientX;
            elementPoint.y = ev.clientY;

            document.onmousemove = function (ev) {
                ev = ev || window.event;
                var nowPoint = {
                    x: 0,
                    y: 0
                }

                nowPoint.x = ev.clientX;
                nowPoint.y = ev.clientY;
                /*
                    元素一开始位置 + 鼠标点击的位置 -  鼠标触摸的位置
                 */
                var L = startPoint.x + (nowPoint.x - elementPoint.x);

                if (L <= 55) {
                    L = 55;
                } else if (L >= (testNode.parentNode.clientWidth - testNode.offsetWidth) + 55) {
                    L = testNode.parentNode.clientWidth - testNode.offsetWidth + 55;
                }

                testNode.style.left = L + 'px';
                
                if (callBack && typeof callBack === 'function') {
                    callBack()
                }
            }

            document.onmouseup = function () {
                document.onmousemove = document.onmouseup = null;
                if (testNode.releaseEvents) {
                    testNode.releaseEvents();
                }
            }

            return false;
        }
    }
})(window)