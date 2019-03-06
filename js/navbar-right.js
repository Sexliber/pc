$(function () {
    //按钮换屏动画
    var screenNums = 5  //屏幕版数
    var screenId = 1;    //当前屏幕ID
    var screenId_next = 1;  //下个屏幕ID
    var screen = $('#homeContainer #home');   //当前屏幕对象
    var screen_next = $('#homeContainer #home'); //下个屏幕对象
    var fullscreen_animate_flag = ["", true, true, true, true, true];   //每一页的动画开关,""为占位

    //翻页方法
    function pageTurn() {
        if (screenId != screenId_next) {
            //结束未执行完成的动画
            screen_next.stop();
            //如果为最后一页则显示返回顶部按钮,隐藏下拉按钮
            if (screenId_next == screenNums) {
                $('#pageTurn_down').hide();
                $('#pageTurn_up').show();
            } else {
                $('#pageTurn_up').hide();
                $('#pageTurn_down').show();
            }
            //隐藏页面动画元素
            if (fullscreen_animate_flag[screenId_next]) {
                switch (screenId_next) {
                    case 1:

                        break;
                    case 2:
                        edu_clear();
                        break;
                    case 3:
                        game_clear();
                        break;
                    case 4:
                        device_clear();
                        break;
                    case 5:
                        aboutUs_clear();
                        break;
                }
            }
            //切换右导航栏按钮样式
            $('#navigationBar-right li .fa-circle-o').removeClass('fa-dot-circle-o').css({ color: 'rgba(255,255,255,.3)' });
            $('#navigationBar-right ul li:nth-child(' + screenId_next + ') i').addClass('fa-dot-circle-o').css({ color: '#fff' });
            screen = $('#homeContainer>div:nth-child(' + screenId + ')');   //当前屏幕对象赋值
            screen_next = $('#homeContainer>div:nth-child(' + screenId_next + ')'); //跳转屏幕对象赋值
            $('#homeContainer>.fullscreen').css({ 'z-index': -1, 'top': 0 });
            screen.css({ 'z-index': 0 });
            screen_next.css({ 'z-index': 1 });
            //判断位移动画方向
            if (screenId_next > screenId) {
                screen_next.css({ top: '100vh' });
            } else {
                screen_next.css({ top: '-100vh' });
            }
            //执行翻页动画
            screen_next.animate({
                top: 0
            }, {
                    duration: 800,
                    easing: 'easeInOutQuart',
                    complete: function () { //翻页动画完成后执行本方法
                        //判断是否为首次跳转到此页面,若是则加载页面动画,若不是则直接打开翻页开关
                        if (fullscreen_animate_flag[screenId_next]) {
                            switch (screenId_next) {
                                case 1:
                                    pageTurn_flag = true;
                                    break;
                                case 2:
                                    edu_animate();     //教育页面动画
                                    break;
                                case 3:
                                    game_animate();    //游戏页面动画
                                    break;
                                case 4:
                                    device_animate();  //教育页面动画
                                    break;
                                case 5:
                                    aboutUs_animate();
                                    break;
                            }
                            fullscreen_animate_flag[screenId_next] = false;
                        } else {
                            pageTurn_flag = true;  //打开翻页开关
                        }
                    }
                });
            screenId = screenId_next;   //将跳转屏幕ID的值传给当前屏幕ID
        }
    }

    //点击右导航翻页
    $('#navigationBar-right li .fa-circle-o').click(function () {
        if (pageTurn_flag) {
            pageTurn_flag = false;
            screenId_next = parseInt($(this).attr('tp'));
            pageTurn();
        }
    });

    //鼠标滚动翻页
    $('#homeContainer').mousewheel(function (event, delta, deltaX, deltaY) {
        if (pageTurn_flag) {    //是否允许滚轮翻页
            if (deltaY > 0) {
                if (screenId > 1) {
                    pageTurn_flag = false;  //未完成翻页动画时关闭翻页开关
                    screenId_next = screenId - 1;
                    pageTurn();
                }
            } else {
                if (screenId < screenNums) {
                    pageTurn_flag = false;  //未完成翻页动画时关闭翻页开关
                    screenId_next = screenId + 1;
                    pageTurn();
                }
            }
        }
    });
    //下拉箭头
    var pageTurn_down_timer = window.setInterval(function () {
        $('.pageTurn_bt .fa').toggleClass('add_transform');
    }, 800);
    $('#pageTurn_down').click(function () {
        if (pageTurn_flag) {
            if (screenId < screenNums) {
                pageTurn_flag = false;  //未完成翻页动画时关闭翻页开关
                screenId_next = screenId + 1;
                pageTurn();
            }
        }
    });
    $('#pageTurn_up').click(function () {
        if (pageTurn_flag) {
            pageTurn_flag = false;
            screenId_next = 1;
            pageTurn();
        }
    });
    
});