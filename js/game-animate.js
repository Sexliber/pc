function game_clear() {
    $('#game-left').hide();
    $('#game-right').hide();
    $('#game-center').hide();
}
function game_animate() {
    $('.game>.title').css({ display: 'none' });
    $('#game-center>.title').css({ display: 'block' });
    $('#game-center').show();
    translateAnima('#game-center', 'bottom', 600, 800);
    window.setTimeout(function () {
        $('#game-left').show();
        $('#game-right').show();
        translateAnima('#game-left', 'right', 600, 800);
        translateAnima('#game-right', 'left', 600, 800);
        window.setTimeout(function () {
            pageTurn_flag = true;   //打开翻页开关
        }, 1000);
    }, 800);
}
//鼠标移入显示标题动画
$(function () {
    $('#game>.game').mouseenter(function () {
        var eleClass = $('#game>.game').index(this) + 1;
        $('#game>.game>.title').hide();
        $(this).find('.title').show().css({ 'z-index': 1 });
        scaleAnimate('#game>.game:nth-child(' + eleClass + ') .title', 4, 800);
    })
});