jQuery(function($) {
    var selectRegion = (function () {
        var state = {
            country    : '',
            regionList : false
        };
        var href = window.location.href;
        var dataUrl = href.split('#');
        var panelContainer = {
            email : '',
            password : ''
        };

        function setRegion() {
            state.regionList = false;
            $.ajax({
                url      : alidAjax.ajaxurl,
                type     : "POST",
                dataType : "json",
                async    : true,
                data     : {
                    action  : "ads_rg_list",
                    country : state.country
                },
                success  : function (data) {
                    state.regionList = !$.isArray(data) ? data : false;
                    render();
                }
            });
        }

        function renderInputRegion() {
            if ($('#js-account-stateSelect').length == 1) {
                var select = $('#js-account-stateSelect');
                select.attr('disabled', 'disabled').parents('.bootstrap-select').hide();
                if (select.parents('.bootstrap-select').length == 0) {
                    select.hide();
                }
            } else {
                var select = $('#js-account-dav-stateSelect');
                select.attr('disabled', 'disabled').hide();
            }

            select.html('');
            if (!state.regionList) {
                var selectId = select.prop('id') + '-text';
                var selectValue = select.data('state-value');
                $('#' + selectId).removeAttr('disabled').val(selectValue).show();
            }
        }

        function renderSelectRegion() {
            if ($('#js-account-stateSelect').length == 1) {
                var select = $('#js-account-stateSelect');
                var option = '';
                var textId = select.prop('id') + '-text';
                $('#' + textId).attr('disabled', 'disabled').hide();
                select.removeAttr('disabled');
                select.show();
                if (select.parents('.bootstrap-select').length == 1) {
                    select.parents('.bootstrap-select').show();
                }
                for (var key in state.regionList) {
                    option += '<option value="' + key + '">' + state.regionList[key] + '</option>';
                }

                select.html(option);
                $('#js-account-stateSelect option[value="' + select.data('state-value') + '"]').attr('selected', 'selected');
                if (select.parent().hasClass('bootstrap-select')) {
                    select.selectpicker('refresh');
                }
            } else {
                var select = $('#js-account-dav-stateSelect');
                var option = '';
                var textId = select.prop('id') + '-text';
                $('#' + textId).attr('disabeld', 'disabled').hide();
                select.removeAttr('disabled');
                select.show();
                for (var key in state.regionList) {
                    option += '<option value="' + key + '">' + state.regionList[key] + '</option>';
                }

                select.html(option);
                $('#js-account-dav-stateSelect option[value="' + select.data('state-value') + '"]').attr('selected', 'selected');
            }
        }

        function render() {
            if (state.regionList) {
                renderSelectRegion();
            } else {
                renderInputRegion();
            }
        }

        function setData() {
            state.country = $('[name="account-country"] option:selected').val();
            setRegion();
        }

        function showDialog(id) {
            var panel = $('.modal-container-' + id);
            if (panelContainer[id] == '') {
                panelContainer[id] = panel.html();
            }

            $('.modal-container-' + id).remove();
            $('<div class="modal-backdrop fade in"></div>').appendTo('body');
            $(panelContainer[id]).appendTo('body');
            $('body').find('.modal-backdrop').hide().fadeIn('fast');
            $('body').find('.panel-modal').hide().fadeIn('fast');
        }

        function showDialogMobile(id) {
            $('.panel').hide();
            $('#saveAccountForm').parents('.form-group').hide();
            var panel = $('.modal-container-' + id).find('.panel');
            if (panelContainer[id] == '') {
                panelContainer[id] = panel.html();
            }

            $('.modal-container-' + id).remove();
            $('<div class="panel panel-default no-border-radius">' + panelContainer[id] + '</div>').appendTo('#account-details-form');
        }

        function initCloseBtn() {
            $('.close-btn-modal-panel').live('click', function() {
                $(this).parents('.panel-modal-container').fadeOut(
                    'fast', function() {
                        $(this).remove();
                    }
                );

                $('.modal-backdrop').fadeOut('fast', function() {
                    $(this).remove();
                });
            });
        }

        function initPhoneField() {
            var phoneField = $('#shippingAddress').find('[name="phone-number"]');
            phoneField.on('input', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var regexp = /^\d+$/;
                var phoneVal = phoneField.val();

                if (!regexp.test(phoneVal)) {
                    this.value = this.value.replace(/[^0-9]/g, '');
                }
            });
        }

        function initCancelBtn() {
            $('.cancel-btn-modal-panel').live('click', function() {
                $(this).parents('.panel-modal-container').fadeOut(
                    'fast', function() {
                        $(this).remove();
                    }
                );

                $('.modal-backdrop').fadeOut('fast', function() {
                    $(this).remove();
                });

                $(this).parents('.panel').remove();
                showMobileForm();
            });
        }

        function showMobileForm() {
            $('.panel').show();
            $('#saveAccountForm').parents('.form-group').show();
        }

        function initDialog() {
            $('#chageEmail').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showDialog('email');
            });

            $('.mobile-change-email').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showDialogMobile('email');
            });

            $('.mobile-change-password').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showDialogMobile('password');
            });

            $('#changePassword').on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showDialog('password');
            });
        }

        function saveForm(nameForm) {
            var accountForm = $('#' + nameForm).serializeArray();

            if (nameForm == 'accountForm') {
                $.each(
                    $('#shippingAddress').serializeArray(),
                    function(index, value) {
                        accountForm.push(value);
                    }
                );

                accountForm.push({
                    name: 'email',
                    value: $('#current-email').html().trim()
                });

                accountForm.push({
                    name: 'action',
                    value: 'ads_account_save'
                });
            }

            if (nameForm == 'passwordForm') {
                accountForm.push({
                    name: 'action',
                    value: 'ads_password_save'
                });

                accountForm.push({
                    name: 'email',
                    value: $('#current-email').html().trim()
                });
            }

            if (nameForm == 'chageEmailForm') {
                accountForm.push({
                    name: 'action',
                    value: 'ads_email_save'
                });
            }

            $.ajax({
                url      : alidAjax.ajaxurl,
                type     : "POST",
                dataType : "json",
                async    : true,
                data     : accountForm,
                success  : function (data) {
                    showNotify(data.message, data.result);
                    $.each(
                        $('.has-error'),
                        function(index, value) {
                            $(value).removeClass('has-error');
                            $(value).find('.help-block').remove();
                        }
                    );

                    if (data.result == false) {
                        $.each(
                            data.errors,
                            function(index, value) {
                                if (value.field == 'state') {
                                    var containerDiv = $('#shippingAddress').find('[name="state"]').parents('.form-group');
                                } else {
                                    var containerDiv = $('#' + value.field).parents('.form-group');
                                }
                                containerDiv.addClass('has-error');
                                containerDiv.append('<span class="help-block">' + value.message + '</span>');
                            }
                        );
                    } else {
                        $('#' + nameForm).parents('.panel-modal-container').fadeOut('fast', function() {
                            $(this).remove();
                        });

                        $('.modal-backdrop').fadeOut('fast', function() {
                            $(this).remove();
                        });
                        showMobileForm();
                    }

                    if (typeof data.username !== 'undefined') {
                        $('.account-details-content').find('.user-email').html(data.username);
                    }
                }
            });
        }

        function showNotify(message, success) {
            window.toastr.options = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-top-full-width",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            };

            if (success) {
                window.toastr.success(message);
            } else {
                window.toastr.error(message);
            }
        }

        return {
            init : function () {
                setData();
                initDialog();
                initCancelBtn();
                initCloseBtn();
                initPhoneField();
                $('[name="account-country"]').on('change', function () {
                    $('[name="state"]').val('').data('state-value', '');
                    setData();
                });

                $('#saveAccountForm').on('click', function() {
                    saveForm('accountForm');
                });

                $('#savePasswordForm').live('click', function() {
                    saveForm('passwordForm');
                });

                $('#changeEmailForm').live('click', function() {
                    saveForm('chageEmailForm')
                });

                //$('.content').not(".active").hide();
                $(".navbar-nav a").on('click', function(e) {
                    /*var link = $(this).attr('href').split('#');
                    var linkId = '#' + link[1];
                    var redirect = $(this).data('redirect');
                    if (redirect == true) {
                        return ;
                    }
                    e.preventDefault();
                    $('.content').hide();
                    $('.navbar-nav li').removeClass('active');
                    $(this).parent().addClass('active');
                    if (linkId == '#address-details') {
                        $('#password').val('');
                        $('#newPassword').val('');
                        $('#repeatPassword').val('');
                    }

                    $(linkId).show();*/
                });
            }
        }
    })();

    selectRegion.init();
});