var $ = require('jquery'),
    $body = $('body'),
    $window = $(window),
    resizeTime;
var main = {
    init: function () {
        var self = this;
        this.initMain();
    },
    initMain: function () {
        var self = this;
        $body.on('click', '.js-close-fancybox', function (ev) {
            ev.preventDefault();
            $.fancybox.close();
        });
        // prevent fancybox loading container closing when clicking on it
        $($.fancybox).on('onLoading', function () {
            $('#fancybox-loading').unbind();
        });
        $('.js-social-for-register').on('click', function (ev) {
            ev.preventDefault();
            var url = $(this).attr('href');
            window.open(url, '', "height=500,width=500");
        });
        $('.js-fancybox-popup').fancybox({
            width: 'auto',
            height: 'auto',
            padding: 0,
            autoSize: true,
            autoResize: true,
            scrolling: 'no',
            helpers: {
                overlay: {
                    locked: true
                }
            },
            afterShow: function () {
                $('.fancybox-wrap').addClass('fancybox-wrap_smooth');
                $('.fancybox-inner').css('overflow', 'auto');
            },
            close  : [27]
        });
    }
};
$(function () {
    main.init();
});
