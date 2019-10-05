/**
 * Created by pavel on 17.05.2016.
 */
(function ($) {
    'use strict';
    $.fn.validateForm = function (options) {
        options = $.extend({
            classValid: 'js-valid',
            classInvalid: 'js-invalid',
            classInvalidEmpty: 'js-invalid_empty',
            classNotifiInvalid: 'js-notifi_invalid',
            item: '[required="required"]:visible',
            icon: '<i class="ico-valid"></i>',
            fieldsValid: {
                full_name: {
                    minLen: 2
                },
                phone_number: {
                    minLen: 6,
                    number: 'd'
                },
                exp_year: {
                    minLen: 2,
                    maxLen: 2,
                    year: 2
                },
                exp_month: {
                    minLen: 2,
                    maxLen: 2,
                    month: 2
                },
                cvv: {
                    maxLen: 4,
                    minLen: 2,
                    number: 'd'
                },
                number: {
                    card: 'card'
                },
                password: {
                    minLen: 4,
                    maxLen: 50,
                    password: 'repeatPassword'
                },
                repeatPassword: {
                    password: 'password',
                    minLen: 4,
                    maxLen: 50
                },
                address: {
                    minLen : 2
                }
            },
            validAll: {
                minLen: 2,
                maxLen: 60
            },
            msg: {
                emptyField: validateForm.emptyField,
                formatField: validateForm.formatField + ':{{1}}'
            }
        }, options);

        var validate = {
            email: function (obj) {
                var email = $(obj).val();
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            minLen: function (obj, len) {
                return $(obj).val().length >= len;
            },
            maxLen: function (obj, len) {
                return $(obj).val().length <= len;
            },
            empty: function (obj) {
                return $(obj).val().length != '';
            },
            number: function (obj, type) {
                var val = $(obj).val();
                var val1 = val.replace(/\D+/g, "");
                $(obj).val(val1);

                return val == val1;
                return false;
            },
            month: function (obj, type) {
                var value = $(obj).val();
                var re = /^(0[1-9]|1[0-2])$/;
                $(obj).val(value.replace(/\D+/g, ""));
                return re.test(value);
            },
            year: function (obj, type) {
                var value = $(obj).val();
                $(obj).val(value.replace(/\D+/g, ""));
                var re = /^([1-9][0-9])$/;
                return re.test(value);
            },
            card: function (obj,value,  type) {

                var start =  obj.selectionStart,
                    end = obj.selectionEnd,
                    arr = [],
                    val = obj.value.toString();


                var mask =  val.replace(/\D+/g, "");

                var at = val.substr(0, start);
                var IsEmpty = val.substr(start-1,1) == ' ' ? 1: 0 ;
                var a = at.replace(/\D+/g, "");
                a = a.replace(/(\d{4})/g, "$& ");
                var diffEmpty = a.length - at.length - IsEmpty;

                mask = mask.replace(/(\d{4})/g, "$& ");
                mask = mask.trim();

                obj.value = mask;

                if(typeof type == 'undefined' || type == 'input'){
                    obj.setSelectionRange(start+diffEmpty, end+diffEmpty);
                }

                var len = [13, 14, 15, 16, 17, 18, 19, 20];

                return len.indexOf(mask.length) != -1;
            },
            password: function (obj, name) {
                var field = $('input[name=' + name + ']');
                var value = $(obj).val();

                if (typeof name == 'undefined') {
                    return true;
                }

                if (name == 'repeatPassword' && field.val().length == 0) {
                    return true;
                }

                return value == field.val();
            }
        };

        var th = $(this);

        var keyCodeKeypress = null;

        var setValidate = function () {

            $(options.item).parent().append(options.icon);

            th.on('keypress', options.item, function (e) {
                var ignore = [37, 39, 8, 46, 32];

                keyCodeKeypress = e.keyCode;

                if (ignore.indexOf(e.keyCode) !== -1)
                    return;
                var obj = this;

                var err = checkField(obj);

                if (err == 0) {
                    renderValid(obj);
                } else {
                    renderClear(obj);
                }

                if (err == 0) {
                    return true;
                }
            });

            th.on('blur', options.item, function (e) {

                var obj = this;
                var err = checkField(obj, e.type);

                if (err == 0) {
                    renderValid(obj);
                } else if (err == 'empty') {
                    renderInvalidEmpty(obj);
                } else {
                    renderInValid(obj);
                }

                if ($(obj).attr('name') == 'password'
                    || $(obj).attr('name') == 'repeatPassword'
                ) {
                    $.each($('.password_fields'),
                        function(index, value) {
                            $(value).trigger('keypress');
                        }
                    );
                }

                if (err == 0) {
                    return true;
                }
            });

            th.attr('novalidate', 'novalidate').on('submit, cart:check', function(e) {

                var errAll = 0;
                var errFirst = false;
                var checkoutButton = $('button[name="ads_checkout"]');
                var c = $('.js-invalid_empty').length;

                if( c === 0 ) {
                    checkoutButton.removeClass('btn-clicked');
                }

                if( checkoutButton.hasClass('btn-clicked') ){
                    return false;
                }

                checkoutButton.addClass('btn-clicked');

                $(th).find(options.item).each(function (i, obj) {
                    var err = checkField(obj);

                    if (err == 0) {
                        renderValid(obj);
                    } else if (err == 'empty') {
                        errAll++;
                        renderInvalidEmpty(obj);
                    } else {
                        errAll++;
                        renderInValid(obj);
                    }

                    if (errAll === 1 && !errFirst) {
                        errFirst = obj;
                        scrollToFinds(obj);
                    }
                });

                if (errAll === 0) {
                    $(document).trigger({
                        type  : 'form:validated',
                        error : false,
                        step  : typeof e.step !== 'undefined' ? e.step : false,
                        params: e
                    });

                    return false;
                }

                checkoutButton.removeClass('btn-clicked');
                $('[name="ads_checkout"]').removeClass('btn-processed');
                $(document).trigger({
                    type  : 'form:validated',
                    error : true,
                    step  : typeof e.step !== 'undefined' ? e.step : false,
                    params: e
                });
                return false;
            });
        };

        function checkField(obj, type) {
            var err = 0;
            var nameField = $(obj).attr('name');
            var typeField = $(obj).attr('type');

            var validateEmpty = validate[ 'empty' ](obj);
            if (!validateEmpty) {
                return 'empty';
            }

            if (options.fieldsValid[ nameField ] !== undefined) {
                $.each(options.fieldsValid[ nameField ], function (name, value) {
                    err += !validate[ name ](obj, value, type);
                });
            } else {
                $.each(options.validAll, function (i, e) {
                    err += !validate[ i ](obj, e);
                });
            }

            if (validate[ typeField ] !== undefined) {
                err += !validate[ typeField ](obj);
            }

            return err;
        }

        function renderInvalidEmpty(obj) {
            renderClear(obj);
            renderInvalidNotifi(obj, options.msg.emptyField)
            $(obj).parent().addClass(options.classInvalidEmpty);
        }

        function renderInvalidNotifi(obj, str) {
            $(obj).parent().children('.' + options.classNotifiInvalid).text(str).show();
        }

        function renderClear(obj) {
            $(obj).parent()
                .removeClass(options.classInvalidEmpty + ' ' + options.classInvalid)
                .removeClass(options.classValid).children('.' + options.classNotifiInvalid).hide();
        }

        function renderValid(obj) {
            renderClear(obj);
            $(obj).parent().addClass(options.classValid);
        }

        function renderInValid(obj) {
            renderClear(obj);
            var str = options.msg.formatField;
            var label = $(obj).parent().parent().children('label').text();
            str = str.replace('{{1}}', label);
            str = clearStr(str);

            renderInvalidNotifi(obj, str);
            $(obj).parent().addClass(options.classInvalid);
            $(obj).parent().children('.' + options.classNotifiInvalid).show();
        }

        function clearStr(str) {
            str = str.replace('*', '');
            str = str.replace(/\s{2,}/mig, ' ');
            str = str.trim();
            str = str.replace(/(:)$/mig, '');
            return str;
        }

        function scrollToFinds(obj) {
            //$(obj).focus();
            var top = $(obj).offset().top - 100;
            $('body,html').stop().animate({
                scrollTop: top
            }, 1000);
        }

        return this.each(setValidate);
    };

    $('#form_delivery').validateForm();
})(jQuery);