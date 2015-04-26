var $ = require('jquery'),
    $body = $('body'),
    $window = $(window);
var tip = {
    init: function () {
        var self = this;
        this.initMain('.hasTooltip', false, 'bottom center', 'top center');
        this.initMain('.hasTooltip_custom', true, 'bottom left', 'top left');
    },
    initMain: function (item, adjustY, positionAt, positionMy) {
            $(item).each(function () {
                adjustY = ((adjustY === true) ? -6 : 0);
                $(this).qtip({
                    overwrite: false,
                    content: {
                        text: $(this).next('div') // Use the "div" element next to this for the content
                    },
                    position: {
                        adjust: {
                            y: adjustY
                        },
                        at: positionAt,
                        my: positionMy,
                        target: $(this) // my target
                    },
                    show: {
                        solo: true,
                        event: 'click',
                        effect: function(offset) {
                            $(this).fadeIn(300); // "this" refers to the tooltip
                        }
                    },
                    hide: {
                        target: $(this).next('div').find('.tooltip__close'),
                        event: 'click unfocus',
                        effect: function(offset) {
                            $(this).fadeOut(300); // "this" refers to the tooltip
                        }
                    },
                    style: {
                        def: false
                    },
                    events: {
                        show: function(event, api) {
                            api.elements.target.addClass('_open');
                        },
                        hide: function(event, api) {
                            api.elements.target.removeClass('_open');
                        }
                    }
                });
            });
    }
};
$(function () {
    tip.init();
});