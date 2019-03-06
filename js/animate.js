// 动画效果
// 平移动画,第一参数为动画对象,第二参数为方向,第三参数为距离,第四参数为时间
function translateAnima(element, direction, distance, time) {
    var _distance = { 'left': distance, 'right': -1 * distance, 'top': distance, 'bottom': -1 * distance };    //距离
    var _transCss = {   //动画样式
        targets: element,
        translateX: 0,
        translateY: 0,
        duration: 0
    };
    if (direction == 'left' || direction == 'right') {
        _transCss['translateX'] = _distance[direction];
    } else if (direction == 'top' || direction == 'bottom') {
        _transCss['translateY'] = _distance[direction];
    }
    anime(_transCss);
    _transCss['translateX'] = 0;
    _transCss['translateY'] = 0;
    _transCss['duration'] = function (el, i, l) {
        return time + (i * 200);
    };
    anime(_transCss);
}
// 放大缩小动画,第一参数为动画对象,第二参数为缩放尺寸,第四参数为时间
function scaleAnimate(element, isScale, time) {
    isScale = 1 / isScale;
    anime({
        targets: element,
        scale: isScale,
        duration: 0
    });
    anime({
        targets: element,
        scale: 1,
        duration: time
    });
}