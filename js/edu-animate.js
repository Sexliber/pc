//教育页面动画
function edu_clear() {
    $('#edu-content>.edu').hide();
    $('#edu-content>.edu>.alt').removeClass('show');
    $('#edu-content>div:first-child .alt').addClass('show');
}
function edu_animate() {
    $('#edu-content>.edu').show();
    translateAnima('#edu-content>.edu', 'left', 1000, 400);
    window.setTimeout(function () {
        //动画完成后打开翻页开关
        pageTurn_flag = true;
    }, 1000);
}
//鼠标移入显示标题动画
$(function () {
    $('#edu-content>a').mouseenter(function () {
        var eleClass = $('#edu-content>a').index(this) + 1;
        console.log(eleClass)
        $('#edu-content>a .alt').removeClass('show');
        $(this).find('.alt').addClass('show');
        scaleAnimate('#edu-content>a:nth-child(' + eleClass + ') .alt', 4, 800);
    })
});