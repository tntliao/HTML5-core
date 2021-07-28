(function (w) {
    w.$ = {};
    $.drag = function (node1, node2, flag, value) {
        var node_value = 0;
        node1.onmousedown = function (ev) {
            if (node1.setCapture) {
                node1.setCapture();
            }
            ev = ev || window.event;

            var a = node1.offsetLeft;
            var b = node1.offsetTop;

            var c = ev.clientX;
            var d = ev.clientY;

            document.onmousemove = function (ev) {
                ev = ev || window.event;

                var e = ev.clientX;
                var f = ev.clientY;

                var l = a + (e - c);
                var t = b + (f - d);

                //磁性吸附 + 范围控制
                if (flag) {
                    if (value) {
                        node_value = value;
                    }
                    if (l <= node_value) {
                        l = 0;
                    } else if (l >= document.documentElement.clientWidth - node1.offsetWidth - node_value) {
                        l = document.documentElement.clientWidth - node1.offsetWidth;
                    }
                    if (t <= node_value) {
                        t = 0;
                    } else if (t >= document.documentElement.clientHeight - node1.offsetHeight - node_value) {
                        t = document.documentElement.clientHeight - node1.offsetHeight;
                    }
                }

                node1.style.left = l + 'px';
                node1.style.top = t + 'px';

                if (node2) {
                    //碰撞
                    var T1 = node1.offsetTop;
                    var R1 = node1.offsetLeft + node1.offsetWidth;
                    var B1 = node1.offsetTop + node1.offsetHeight;
                    var L1 = node1.offsetLeft;

                    var T2 = node2.offsetTop;
                    var R2 = node2.offsetLeft + node2.offsetWidth;
                    var B2 = node2.offsetTop + node2.offsetHeight;
                    var L2 = node2.offsetLeft;

                    if (R1 < L2 || B1 < T2 || L1 > R2 || T1 > B2) {
                        node2.style.background = 'greenyellow';
                    } else {
                        node2.style.background = 'black';
                    }
                }

            }
            document.onmouseup = function () {
                document.onmousemove = document.onmouseup = null;
                if (node1.releaseCapture) {
                    node1.releaseCapture();
                }
            }

            /* 禁止不了ie8以下浏览器事件的默认行为 */
            return false;
        }
    }
})(window);