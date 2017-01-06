/**
 * Created by Administrator on 2017/1/5.
 */

//自适应换算
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if(!clientWidth) return;
            if(clientWidth >= 640){
                docEl.style.fontSize = '100px';
            }
            else{
                docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
            }
        };
    if(!doc.addEventListener) return;
    win.addEventListener(resizeEvt,recalc,false);
    doc.addEventListener('DOMContentLoaded',recalc,false);
}(document, window));


$(function () {
    //限制字数为140
    $('#exchanging').on('input',function () {
        var maxLen = 140;
        if($(this).val().length > maxLen){
            $(this).val = $(this).val().substring(0, maxLen);
        }
    });

    //上传图片
    $(document).on('change','.input_file',function (e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        var t = $(this);
        reader.onloadend = function (e) {
            $('.uploaded').before('<div class="uploadImg"><img src="' + e.target.result +'"/><p class="close">×</p></div>');
            t.removeClass('target').css('display', 'none');
            $('.uploaded').append('<input type="file" accept="image/*" name="pic[]" class="input_file target"/>');
            if($('.uploadImg').size() > 8) $('.uploaded').hide();
        };
        reader.readAsDataURL(file);
    }).on('click','.close',function () {
       var index = $(this).parent().index();
       $(this).parent().remove();
       $('input[type=file]:eq('+ index +')').remove();
       if($('.uploadImg').size() < 9) $('.uploaded').show();
    });
});
