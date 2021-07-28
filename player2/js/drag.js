(function (w) {
    w.$ = {};
    w.$.drag = function (testNode, callBack) {
        var startPoint = { x: 0, y: 0 };
        var elementPoint = { x: 0, y: 0 };
        testNode.onmousedown = function (ev) {
            ev = ev || window.ev;
            if (testNode.setCapture) {
                testNode.setCapture();
            }
            startPoint.x = testNode.offsetLeft;
            startPoint.y = testNode.offsetTop;

            elementPoint.x = ev.clientX;
            elementPoint.y = ev.clientY;

            document.onmousemove = function (ev) {
                ev = ev || window.event;

                var nowPoint = { x: 0, y: 0 };

                nowPoint.x = ev.clientX;
                nowPoint.y = ev.clientY;

                /*
                    要在inner上面拖动
                        廖家嘉闭着眼睛安静动脑思考一下就明白了
                 */
                var L = startPoint.x + (nowPoint.x - elementPoint.x);

                if (L < 0) {
                    L = 0;
                } else if (L > (testNode.parentNode.clientWidth - testNode.offsetWidth)) {
                    L = testNode.parentNode.clientWidth - testNode.offsetWidth;
                }
                testNode.style.left = L + 'px';

                if (callBack && callBack["move"] && typeof callBack["move"] === "function") {
                    callBack["move"].call(testNode);
                }
            }
            document.onmouseup = function () {
                document.onmousemove = document.onmouseup = null;
                if (document.releaseCapture) {
                    document.releaseCapture();
                }
            }
        }
    }
})(window)