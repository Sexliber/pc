$(function () {
    //导航栏下划线动画
    //获取下划线
    var nav_underline = $('.navbar-underline');
    //初始化下划线目标左间距及宽度
    var nav_underline_left = $('#navigationBar .navbar li .first').position().left;
    var nav_underline_width = $('#navigationBar .navbar li .first').width();
    $('#navigationBar .navbar li a').mouseenter(function () {
        //清除未完全执行的下划线动画
        nav_underline.stop();
        // 给被光标选中a标签添加focus类
        $('#navigationBar .navbar li a').removeClass('focus');
        $(this).addClass('focus');
        //获取被光标选中a标签的宽度和距离父元素的左间距
        nav_underline_width = $(this).width();
        nav_underline_left = $(this).position().left;
        //使下划线的宽度和距离父元素的左间距过渡到指定值
        nav_underline.animate({
            width: nav_underline_width,
            left: nav_underline_left
        }, {
                duration: 400
            });
    })
    $('#navigationBar .navbar').mouseleave(function () {
        //清除未完全执行的下划线动画
        nav_underline.stop();
        nav_underline.animate({
            width: $('#navigationBar .navbar li .first').width(),
            left: $('#navigationBar .navbar li .first').position().left
        }, {
                duration: 400
            });
        $('#navigationBar .navbar li a').removeClass('focus');
        $('#navigationBar .navbar li .first').addClass('focus');
    });;
});