var $ = require('jquery'),
    $body = $('body'),
    $window = $(window),
    ios7platform = navigator.userAgent.match(/(iPad|iPhone|iPod touch);.*CPU.*OS 7_\d/i),
    resizeTime;
var mobile = {
    init: function () {
        var self = this;
        this.updateMobileClass();
        this.checkPlatform();
    },
    updateMobileClass: function() {
        window.isPhone  = ($('#phoneDeviceContainer').css('display') == 'none');
        window.isTablet  = ($('#tabletDeviceContainer').css('display') == 'none');
        $body.toggleClass('mobile', window.isPhone);
        $body.toggleClass('tablet', window.isTablet);

    },
    checkPlatform: function() {
        if (ios7platform != null) {
            $(document)
                .on('focus', 'input, textarea', function (e) {
                    $body.addClass('fixfixed');
                })
                .on('blur', 'input, textarea', function (e) {
                    $body.removeClass('fixfixed');
                });
        }
    }
};
$(function () {
        mobile.init();
});
$(window).resize(function () {
    clearTimeout(resizeTime);
    resizeTime = setTimeout(function () {
        mobile.updateMobileClass();
    }, 500);
});