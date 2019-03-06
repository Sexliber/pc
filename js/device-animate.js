// 清除所有元素
function device_clear() {
    $('.device-container>.navbar-container').hide();
    $('.device-container>.show-container').hide();
}
// 启用元素动画
function device_animate() {
    $('.device-container>.navbar-container').show();
    translateAnima('.device-container>.navbar-container', 'bottom', 1000, 600);
    window.setTimeout(function () {
        $('.device-container>.show-container').show();
        translateAnima('.device-container>.show-container', 'left', 1000, 600);
        setTimeout(function () {
            pageTurn_flag = true;
        }, 600);
    }, 600);
}
$(function () {
    // 点击切换展示产品动画
    var showId = 1;         //当前按钮ID
    var showId_next = 1;    //下一个按钮ID
    var deg = 0;            //当前3D控件旋转角度
    var deg_next = 0;       //3D控件下一个旋转角度
    var clearTimer = null;  //timeOut返回值
    $('.device-container .navbar').click(function () {
        $('.device-container>.navbar-container>.navbar').removeClass('button-tiny').addClass('button-inverse');
        $(this).addClass('button-tiny').removeClass('button-inverse');
        showId_next = $('.device-container .navbar').index(this) + 1;

        if (!!window.ActiveXObject || "ActiveXObject" in window) {  // 如果为IE浏览器触发的点击事件
            switch (showId_next) {
                case 1:
                    $('.pic_3d>div:nth-child(3)').removeClass('show-top show-bottom').addClass('show-center');
                    $('.pic_3d>div:nth-child(2)').removeClass('show-center show-bottom').addClass('show-top');
                    $('.pic_3d>div:nth-child(1)').removeClass('show-center show-top').addClass('show-bottom');
                    break;
                case 2:
                    $('.pic_3d>div:nth-child(3)').removeClass('show-top show-center').addClass('show-bottom');
                    $('.pic_3d>div:nth-child(2)').removeClass('show-top show-bottom').addClass('show-center');
                    $('.pic_3d>div:nth-child(1)').removeClass('show-center show-bottom').addClass('show-top');
                    break;
                case 3:
                    $('.pic_3d>div:nth-child(3)').removeClass('show-bottom show-center').addClass('show-top');
                    $('.pic_3d>div:nth-child(2)').removeClass('show-top show-center').addClass('show-bottom');
                    $('.pic_3d>div:nth-child(1)').removeClass('show-top show-bottom').addClass('show-center');
                    break;
            }
        } else {
            if (showId != showId_next) {                            //非IE浏览器触发的点击事件
                if (clearTimer != null) {
                    clearTimeout(clearTimer);
                }
                $('.pic_3d>.show').show();
                if (showId_next != showId) {
                    if ((showId_next - showId) == 2 || (showId_next - showId) == -1) {
                        deg_next = deg + 120;
                    } else if ((showId_next - showId) == -2 || (showId_next - showId) == 1) {
                        deg_next = deg - 120;
                    }
                }
                $('.pic_3d').css({ '-webkit-transform': 'rotateX(' + deg_next + 'deg)', 'transform': 'rotateX(' + deg_next + 'deg)' });
                clearTimer = window.setTimeout(function () {
                    $('.pic_3d>.show').hide();
                    var id = 3;
                    switch (showId_next) {
                        case 1:
                            id = 3;
                            break;
                        case 2:
                            id = 2;
                            break;
                        case 3:
                            id = 1;
                    }
                    $('.pic_3d>div:nth-child(' + id + ')').show();
                }, 600);
                showId = showId_next;
                deg = deg_next;
            }
        }

    });
    // HTC vive鼠标移入切换产品图片
    $('.htc-content').mouseenter(function () {
        $('.htc-content').css({ 'background': 'rgba(0,0,0,0)', 'color': '#000' });
        $(this).css({ 'background': 'rgba(0,0,0,0.6)', 'color': '#fff' });
        $('.htc-content .pic-default').css({ 'margin-top': '0' });
        $(this).find('.pic-default').css({ 'margin-top': '-2.8rem' });
    });
    $('.htc').mouseleave(function () {
        $('.htc-content .pic-default').css({ 'margin-top': '0' });
    });
    // 小鸟看看图片轮播
    var banner_id = 1;                                              //当前banner页ID
    var banner_id_next = 1;                                         //下个banner页ID
    var banner_container = $('#banner-player>.banner-container');   //获取banner容器
    var banner_length = banner_container.children('.banner').length;//获取banner数量
    var banner_width = 14.98;                                       //banner页宽度(单位rem)
    var banner_animate_time = 400;                                  //banner翻页时间
    var banner_player_time = 5000;                                  //轮播间隔时间
    var move_banner_flag = true;                                    //动画开关(开始执行动画时关闭,动画完成后开启)
    function move_banner() {
        if (banner_id_next > banner_length) {
            banner_id_next = 1;
        } else if (banner_id_next < 1) {
            banner_id_next = banner_length;
        }
        //判断平移距离
        if (banner_id != banner_id_next) {
            banner_container.stop();                            //停止当前对象正在进行的动画
            $('#banner-player>.banner-button-circle>.fa-circle').removeClass('check');
            $('#banner-player>.banner-button-circle>i:nth-child(' + banner_id_next + ')').addClass('check');
            $('#banner-player>.banner-container>.banner').hide();
            $('#banner-player>.banner-container>div:nth-child(' + banner_id + ')').show();
            $('#banner-player>.banner-container>div:nth-child(' + banner_id_next + ')').show();
            if (banner_id_next > banner_id) {
                animate('left', -1 * banner_width);
            } else {
                banner_container.css({ marginLeft: -1 * banner_width + 'rem' });
                animate('right', 0);
            }
            //平移动画
            function animate(direction, distance) {
                banner_container.animate({
                    marginLeft: distance + 'rem'
                }, {
                        duration: banner_animate_time,
                        complete: function () {
                            if (direction == 'left') {
                                banner_container.css({ marginLeft: 0 });
                                $('#banner-player>.banner-container>div:nth-child(' + banner_id + ')').hide();
                            } else if (direction == 'right') {
                            }
                            banner_id = banner_id_next;
                            move_banner_flag = true;   //开启动画开关
                        }
                    });
            }
        }
    }
    // 轮播动画
    function banner_player() {
        if (move_banner_flag) {
            banner_id_next = banner_id + 1;
            move_banner();
        }
    }
    var banner_container_interval = window.setInterval(banner_player, banner_player_time);
    // 圆点轮播按钮点击事件
    $('#banner-player>.banner-button-circle>.fa-circle').click(function () {
        if (move_banner_flag) {
            move_banner_flag = false;   //关闭动画开关
            clearInterval(banner_container_interval);       //关闭轮播
            setTimeout(function () {
                move_banner_flag = true;    //400毫秒后打开动画开关
                banner_container_interval = window.setInterval(banner_player, banner_player_time);    //开启轮播
            }, banner_animate_time);
            banner_id_next = $('#banner-player>.banner-button-circle>.fa-circle').index(this) + 1;
            move_banner();
        }
    });
    // 左右箭头按钮点击事件
    $('.banner-button-left,.banner-button-right').click(function () {
        if (move_banner_flag) {
            move_banner_flag = false;   //关闭动画开关
            clearInterval(banner_container_interval);   //关闭轮播
            setTimeout(function () {
                move_banner_flag = true;    //400毫秒后打开动画开关
                banner_container_interval = window.setInterval(banner_player, banner_player_time);    //开启轮播
            }, banner_animate_time);
            //判断左右方向按钮
            if ($(this).attr('name') == 'left') {
                banner_id_next = banner_id - 1;
            } else {
                banner_id_next = banner_id + 1;
            }
            move_banner();
        }
    });
});