//执行首屏导航栏动画
function home_initAnimate() {
    $('#center-content .p1').hide();
    $('#navigationBar .navbar li').hide();
    $('#navigationBar-right li').hide();
    $('.navbar-underline').hide();
    $('#center-content .p2 a').hide();
    $('#pageTurn_down').hide();
    $('#center-content .p2 a').css({ width: '1.31rem' });
    translateAnima('#center-content .title span', 'top', 100, 200);
    window.setTimeout(function () {
        $('#center-content .p1').show();
        translateAnima('#center-content .p1', 'top', 200, 400);
        window.setTimeout(function () {
            $('#navigationBar .navbar li').show();
            $('.navbar-underline').show();
            $('#center-content .p2 a').show();
            $('#navigationBar-right li').show();
            $('#pageTurn_down').show();
            translateAnima('#navigationBar .navbar li', 'left', 500, 1000);
            translateAnima('.navbar-underline', 'left', 500, 1000);
            translateAnima('#navigationBar-right li', 'top', 500, 1000);
            $('#center-content .p2 a').animate({
                width: '2.62rem',
            }, {
                    duration: 400
                });
            //打开鼠标滚轮翻页开关
            window.setTimeout(function () {
                pageTurn_flag = true;
            }, 1000);
        }, 400);
    }, 400);
}
//清除内容
function home_clear() {
    $('#center-content .title').hide();
    $('#center-content .p1').hide();
    $('#center-content .p2 a').hide();
    $('#center-content .p2 a').css({ width: '1.31rem' });
}
//首屏动画方法
function home_animate() {
    $('#center-content .title').show();
    translateAnima('#center-content .title span', 'top', 100, 200);
    window.setTimeout(function () {
        $('#center-content .p1').show();
        translateAnima('#center-content .p1', 'top', 200, 400);
        window.setTimeout(function () {
            $('#center-content .p2 a').show();
            $('#center-content .p2 a').animate({
                width: '2.62rem',
            }, {
                    duration: 400,
                    complete: function () {
                        //动画完成后打开翻页开关
                        pageTurn_flag = true;
                    }
                });
        }, 400);
    }, 400);
}