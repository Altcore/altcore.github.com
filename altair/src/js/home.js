var $ = require('jquery'),
    $body = $('body'),
    $window = $(window),
    resizeTime;
var home = {
    init: function () {
        var self = this;
        this.initMain();
    },

    /* ----- main block  ----- */
    initMain: function () {
        $('.js-header-link').on('click', function (ev) {
            ev.preventDefault();
            var number = $(this).index() + 1;
            $('html, body').animate({
                scrollTop: $(".js-block-" + number).offset().top - 200
            }, 450);
        });
    }
};

$(function () {
//    if ($('.cms-home').length) {
    home.init();
//    }
});
//$(window).resize(function () {
//    clearTimeout(resizeTime);
//    resizeTime = setTimeout(function () {
//        $('.js-home-reviews').slick('unslick');
//        home.initReviewCarousel();
//    }, 500);
//});