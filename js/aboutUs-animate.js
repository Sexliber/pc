function aboutUs_clear(){
    $('#footer').hide();
    $('#aboutUs>.text-container>.text').hide();
}
function aboutUs_animate(){
    $('#footer').show();
    translateAnima('#footer','top',600,600);
    setTimeout(function(){
        $('#aboutUs>.text-container>.text').show();
        translateAnima('#aboutUs>.text-container>.text','left',600,600);
    }, 600);
    pageTurn_flag = true;
}