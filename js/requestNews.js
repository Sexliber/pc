//滚动到页面底部请求新闻数据
var getArr = [];    //存放请求数据的getArr数组
//传递两个参数send_class为请求的新闻类别,send_nums为请求页数
function requestNews(send_class, send_nums) {
    send_nums = send_nums * 20;
    $.ajax({
        url: "https://cloud.bmob.cn/33b7787a4ac41908/getNewsFull",
        dataType: 'jsonp',
        data: {
            "send_nums": send_nums,       //请求数据长度
            "send_class": send_class      //请求类别(如新闻资讯)
        },
        jsonp: 'callback',
        success: function (result) {
            //请求成功

        },
        complete: function () {     //请求结束

            //将请求到的数据写入getArr数组
            for (i = 0; i < news_arr.results.length; i++) {
                getArr[i] = news_arr.results[i];
            }
            // 调用写入数据方法
            addNews(send_class, getArr);
            requestNums++;  //已请求次数加1
        }
    });
}


//添加内容,传入新闻模块的ID(如video)
function addNews(boxId, arr) {

    //移除刷新块
    $('#flush').remove();

    var newsContainer = $('#' + boxId);    //获取对应的新闻盒子
    //循环添加属性
    for (i = 0; i < arr.length; i++) {
        //添加模型
        if (boxId == 'game' || boxId == 'video') {
            newsContainer.append('<div class="news-pc col-lg-3 col-md-4 col-sm-6 col-xs-12"><div><div class="pic col-sm-12 col-xs-12"><a><img/></a></div><div class="content col-sm-12 col-xs-12"><div class="title col-sm-12 col-xs-12"><span></span></div><div class="text col-sm-12 col-xs-12"><span></span></div></div></div></div>');
        } else {
            newsContainer.append('<div class="news-pc col-md-12 col-sm-6 col-xs-12"><div><div class="pic col-md-3 col-sm-12 col-xs-12"><a><img/></a></div><div class="content col-md-9 col-sm-12 col-xs-12"><div class="title col-md-12 col-sm-12 col-xs-12"><span></span></div><div class="text col-md-12 col-sm-12 col-xs-12"><span></span></div></div></div></div>');
        }
        //添加相关属性和内容
        newsContainer.find('.news-pc:last-child img').attr('src', arr[i].news_imgSrc);
        newsContainer.find('.news-pc:last-child a').attr('href', arr[i].news_href);
        newsContainer.find('.news-pc:last-child .title>span').append(arr[i].news_title);
        newsContainer.find('.news-pc:last-child .text>span').append(arr[i].news_text);
    }

    requestNewsFlag = true; //打开请求开关
}


//页面dom加载完成后开始添加新闻资讯
var requestNums = 0;    //初始化已请求次数为0
var requestNewsFlag = false;    //请求开关
var requestNewsDelayFlag = true;   //请求延时开关
$(function () {
    //添加评测资讯
    var newsClassName = $('.contact-area>.container>.row>.col-md-12').attr('id');

    requestNews(newsClassName, requestNums);   //请求数据

    // 滚动到底部继续请求新内容
    $(window).scroll(function () {

        //滚动条位置距页面顶部的距离 = 文档的总高度 - 当前窗口的高度时，就意味着已经滚动了一个窗口的高度，及已经到当前窗口的底部
        if ($(document).scrollTop() >= $(document).height() - $(window).height()) { //判断是否已经滚动到页面底部
            //已滚动到底部
            if (requestNewsFlag && requestNewsDelayFlag) {  //判断请求开关和最低延时开关是否都已经打开

                //关闭请求开关防止滚轮滚动再次触发请求方法
                requestNewsFlag = false;

                //关闭请求延时开关
                requestNewsDelayFlag = false;

                //延时计时,一秒后打开延时开关
                var delay = window.setTimeout(function () {
                    requestNewsDelayFlag = true;
                    clearTimeout(delay);
                }, 1000);

                //开始ajax请求
                requestNews(newsClassName, requestNums);

                //内容刷新提示模块dom模型
                var dom = '<div id="flush" class="news-pc col-sm-12 col-xs-12" style="padding: 10px 0;text-align:center;font-size: 10px;"><i class="fa fa-refresh fa-spin fa-3x fa-fw" aria-hidden="true"></i></div>';

                //添加dom
                var newsContainer = $('#' + newsClassName);
                newsContainer.append(dom);
            }
        }

    });
});