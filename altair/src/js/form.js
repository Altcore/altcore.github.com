/*global $:false, jQuery:false */
jQuery(function ($) {
    "use strict";

    var forms = [
        'accountForgotPasswordForm',
        'loginForm',
        'signinForm',
        'formSignup',
        'addReviewForm',
        'socialLoginEmail',
        'socialLoginCode',
        'couponForm',
        'accountEditInfoForm',
        'certificateForm',
        'myAccountNewAddressForm',
        'oar_widget_orders_and_returns_form',
        'contactForm',
        'forgotPasswordPageForm',
        'resetPasswordPageForm'
    ];

    forms.forEach(function(elem){
        window.initializeFormValidation(elem, function ($form) {
            $('#formLoading').css('display','block');
            $form[0].submit();
        });
    });

});