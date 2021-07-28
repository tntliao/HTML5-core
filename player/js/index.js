window.onload = function () {
    var video = document.querySelector('video');
    var control_bar = document.querySelector('.control_bar');
    var control_left = document.querySelector('.control_left');
    var control_right = document.querySelector('.control_right');
    var progress_bar = document.querySelector('.progress_bar');
    var progress_line = document.querySelector('.progress_line');
    var progress_block = document.querySelector('.progress_block');
    var played = document.querySelector('.played');
    var start = document.querySelector('#start');
    var pause = document.querySelector('#pause');

    video.width = document.documentElement.clientWidth;
    video.height = document.documentElement.clientHeight - control_bar.offsetHeight;
    progress_bar.style.width = document.documentElement.clientWidth - (control_left.offsetWidth + control_right.offsetWidth) + 'px';
    progress_line.style.marginTop = (progress_bar.offsetHeight / 2) - 3 + 'px';
    /*
        https://www.w3school.com.cn/jsref/dom_obj_event.asp

            Third from the bottom 
            倒数第三个
     */
    window.onresize = function () {
        video.width = document.documentElement.clientWidth;
        video.height = document.documentElement.clientHeight - control_bar.offsetHeight;
        progress_bar.style.width = document.documentElement.clientWidth - (control_left.offsetWidth + control_right.offsetWidth) + 'px';
    }

    start.addEventListener('click', function () {
        video.play();
    })
    pause.addEventListener('click', function () {
        video.pause();
    })

    $.drag(progress_block, played);

    progress_line.onmousedown = function (ev) {
        ev = ev || window.event;
        var L = ev.clientX;
        progress_block.style.left = L + 'px';
    }
}

