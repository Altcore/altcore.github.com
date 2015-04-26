jQuery(document).ready(function ($) {
    "use strict";

    var ie = (function () {
        var undef,
            v = 3,
            div = document.createElement('div'),
            all = div.getElementsByTagName('i');

        while (
            div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
                all[0]
            );

        return v > 4 ? v : undef;
    }());

    var emailRegExp = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;

    $.extend($.validator.methods, {
        notequalplaceholder: function (value, element) {
            value = value || '';
            var placeholder = $(element).attr('placeholder') || '';
            return !(value.toLowerCase() == placeholder.toLowerCase());
        },

        separateemails: function (value) {
            var isOk = true;
            var emails = value.split(',');
            if (emails.length) {
                for (var i = 0; i < emails.length; i++) {
                    if (!emailRegExp.test($.trim(emails[i]))) {
                        isOk = false;
                    }
                }
            }
            return isOk && emails.length <= 5;
        }

    });

    window.manageSubmitButton = function (ev) {
        var $form = ev.data? ev.data.$form : $(ev);
        var $submitBtn = $form.find('input[type="submit"], button[type="submit"]');
        if($form.validate().checkForm()) {

            $submitBtn.removeClass('disabled');
        } else {
            $submitBtn.addClass('disabled');
        }
        if (!$form.hasClass('novalidation')) {
            manageErrorLabels($form);
        }
    };

    function manageErrorLabels($form) {
        return
        var errorLabels = $form.find('div.error');
        errorLabels = errorLabels.filter(function () {
            return $(this).css('display') !== 'none'
        });
        errorLabels.css('visibility', 'hidden');
        $(errorLabels[0]).css('visibility', 'visible');
    }

    window.initializeFormValidation = function (formId, cb) {
        var $form = $('#' + formId);

        if (!$form.length) {
            return;
        }

        //var $submitBtn = $form.find('.input_submit, .form__submit');
        var $submitBtn = $form.find('input[type="submit"], button[type="submit"]');

        // add specific class to form to prevent error labels of showing while user is typing
        // show labels only after user presses submit button (see next...)
        $form.addClass('form_validation-process');
        //$form.addClass('form_validation-splash');

        // remove.form_validation-process class when user presses submit button to show error labels if exist
        $submitBtn.off('click', removeRedundantClass);
        $submitBtn.on('click', removeRedundantClass);

        // check form validity while user is typing to unlock submit button when everything is ok
        $form.off('change, input, keyup', ':input, textarea', manageSubmitButton);
        $form.on('change, input, keyup', ':input, textarea', {$form: $form}, manageSubmitButton);

        function removeRedundantClass() {
            $form.removeClass('form_validation-process');//.addClass('form_validation-process_invalid');
            //$form.addClass('form_validation-splash');
            //$form.removeClass('novalidation');
            //setTimeout(function () {
            //    $form.removeClass('form_validation-splash');
            //}, 1000)
        }

        if (ie == 9) {
            var $inputs = $form.find('input');
            // so when user clicks on input we remove value == placeholder
            var bindInputClick = function () {
                var $this = $(this);
                var val = $this.val() || '';
                var placeholder = $(this).attr('placeholder') || '';
                if (val.toLowerCase() == placeholder.toLowerCase()) {
                    $(this).val('');
                }
            };

            $inputs.off('click', bindInputClick);
            $inputs.on('click', bindInputClick);

            // we extended jquery.validation plugin with notequalplaceholder rule
            // so plugin checks when input value == placeholder and ignores it
            $inputs.each(function () {
                var $this = $(this);
                if ($this.hasClass('form__input') && !$this.hasClass('hidden') && ['text', 'email', 'password'].indexOf($this.attr('type')) !== -1) {
                    $this.attr('notequalplaceholder', 'notequalplaceholder');
                    $this.on('focusout', function () {
                        var _$this = $(this);
                        setTimeout(function () {
                            if(_$this.val().toLowerCase() !== _$this.attr('placeholder').toLowerCase()){
                                _$this.attr('value-full','value-full')
                            }
                            else{
                                _$this.removeAttr('value-full')
                            }
                        }, 1)

                    });
                    if ($this.placeholder) {
                        $this.placeholder();
                    }
                }
            });

            var onFocusPhone = function () {
                $(this).trigger('keyup');
            };
            var $phone = $form.find('input[data-type="telephone"]');
            $phone.off('focusin', onFocusPhone);
            $phone.on('focusin', onFocusPhone);
        }

        var requiredFieldStr = "Обязательное поле",
            emailStr = "Неправильный адрес почты",
            moreCharStr = "Введите 6 или более символов",
            moreCharStr50 = "Введите 50 или более символов",
            equalTo = "Пароль и подтверждение не совпадают",
            messageStr = "Пожалуйста, введите Ваш комментарий";

        $form.validate({
            errorElement: 'div',
            messages: {
                nickname: {
                    required: requiredFieldStr
                },
                firstname: {
                    required: requiredFieldStr
                },
                detail: {
                    required: requiredFieldStr,
                    minlength: moreCharStr50
                },
                lastname   : {
                    required: requiredFieldStr
                },
                name: {
                    required: requiredFieldStr
                },
                email: {
                    required: requiredFieldStr,
                    email: emailStr
                },
                emails: {
                    required: requiredFieldStr
                },
                'login[username]': {
                    required: requiredFieldStr,
                    email: emailStr
                },
                company: {
                    required: requiredFieldStr
                },
                phone: {
                    required: requiredFieldStr
                },
                message: {
                    required: requiredFieldStr
                },
                password: {
                    required: requiredFieldStr,
                    minlength: moreCharStr
                },
                current_password: {
                    required: requiredFieldStr
                },
                'login[password]': {
                    required: requiredFieldStr,
                    minlength: moreCharStr
                },
                confirmation: {
                    minlength: moreCharStr,
                    required: requiredFieldStr,
                    equalTo: equalTo
                },
                validate_rating_secondary: {
                    required: requiredFieldStr
                },
                code: {
                    required: requiredFieldStr
                },
                title: {
                    required: requiredFieldStr
                },
                age: {
                    required: requiredFieldStr
                },
                skin_tone: {
                    required: requiredFieldStr
                },
                eye_color: {
                    required: requiredFieldStr
                },
                receive_sample: {
                    required: requiredFieldStr
                },
                'signup[firstname]':{
                    required: requiredFieldStr,
                    notequalplaceholder: requiredFieldStr
                },
                'signup[lastname]':{
                    required: requiredFieldStr,
                    notequalplaceholder: requiredFieldStr
                },
                'signup[email]':{
                    required: requiredFieldStr,
                    email: emailStr,
                    notequalplaceholder: requiredFieldStr
                },
                'signup[password]':{
                    required: requiredFieldStr,
                    minlength: moreCharStr,
                    notequalplaceholder: requiredFieldStr
                },
                'signup[confirmation]':{
                    minlength: moreCharStr,
                    required: requiredFieldStr,
                    equalTo: equalTo,
                    notequalplaceholder: requiredFieldStr
                },
                q:{
                    required: requiredFieldStr
                },
                certificate_code:{
                    required: requiredFieldStr
                },
                'certificate[message]': {
                    required: requiredFieldStr
                },
                'certificate[sender_email]': {
                    required: requiredFieldStr,
                    email: emailStr
                },
                'certificate[sender_name]': {
                    required: requiredFieldStr
                },
                'certificate[recipient_email]': {
                    required: requiredFieldStr,
                    email: emailStr
                },
                'certificate[recipient_name]': {
                    required: requiredFieldStr
                },
                'certificate[recipient_telephone]': {
                    required: requiredFieldStr
                },
                'is_accept': {
                    required: requiredFieldStr
                },
                'street[]': {
                    required: requiredFieldStr
                },
                region: {
                    required: requiredFieldStr
                },
                region_id: {
                    required: requiredFieldStr
                },
                city: {
                    required: requiredFieldStr
                },
                oar_email:{
                    required: requiredFieldStr,
                    email: emailStr
                },
                oar_order_id:{
                    required: requiredFieldStr
                },
                order_id:{
                    required: requiredFieldStr
                },
                comment:{
                    required: messageStr
                }
            },
            rules: {
                nickname: {
                    required: true
                },
                firstname: {
                    required: true
                },
                lastname: {
                    required: true
                },
                detail: {
                    required: true,
                    minlength: "50"
                },
                name: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                emails: {
                    required: true
                },
                'login[username]': {
                    required: true,
                    email: true
                },
                company: {
                    required: true
                },
                phone: {
                    required: true
                },
                message: {
                    required: true
                },
                password: {
                    required: true,
                    minlength: "6"
                },
                current_password: {
                    required: true
                },
                'login[password]': {
                    required: true,
                    minlength: "6"
                },
                confirmation: {
                    required: true,
                    minlength: "6",
                    equalTo: "#password"
                },
                title: {
                    required: true
                },
                validate_rating_secondary: {
                    required: true
                },
                code: {
                    required: true
                },
                age: {
                    required: true
                },
                skin_tone: {
                    required: true
                },
                eye_color: {
                    required: true
                },
                receive_sample: {
                    required: true
                },
                'signup[firstname]':{
                    required: true
                },
                'signup[lastname]':{
                    required: true
                },
                'signup[email]':{
                    required: true,
                    email: true
                },
                'signup[password]':{
                    required: true,
                    minlength: "6"
                },
                'signup[confirmation]':{
                    required: true,
                    minlength: "6",
                    equalTo: "#password"
                },
                q:{
                    required: true
                },
                certificate_code:{
                    required: true
                },
                'street[]': {
                    required: true
                },
                region: {
                    required: true
                },
                region_id: {
                    required: true
                },
                city: {
                    required: true
                },
                oar_email:{
                    required: true,
                    email: true
                },
                oar_order_id:{
                    required: true
                },
                comment:{
                    required: true
                },
                'certificate[message]': {
                    required: true
                },
                'certificate[sender_email]': {
                    required: true,
                    email: true
                },
                'certificate[sender_name]': {
                    required: true
                },
                'certificate[recipient_email]': {
                    required: true,
                    email: true
                },
                'certificate[recipient_name]': {
                    required: true
                },
                'certificate[recipient_telephone]': {
                    required: true
                },
                is_accept: {
                    required: true
                }
            },
            invalidHandler: function (ev, validator) {
                var errors = validator.numberOfInvalids();
                if (errors) {
                    var docTop = $(validator.errorList[0].element).offset().top - 100;
                    validator.errorList[0].element.focus(); //Set Focus
                    $(document).scrollTop(docTop); // Scroll to first error
                }
                setTimeout(function () {
                    manageErrorLabels($form);
                }, 100);
                $form.addClass('_form-invalid');
            },
            errorPlacement: function (error, element) {
                var $elemTo = element.parent();
                //error.css('visibility', 'hidden').appendTo($elemTo);
                error.appendTo($elemTo);
            },
            submitHandler: function () {
                if ($submitBtn.attr('clicked') !== 'clicked') {
                    $submitBtn.attr('disabled', 'disabled')
                        .attr('clicked', 'clicked');
                    cb($form);
                }
            }

        });


        manageSubmitButton({data: {$form: $form}});

    }
});