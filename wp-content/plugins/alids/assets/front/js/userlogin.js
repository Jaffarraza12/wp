jQuery(function($) {
    if ($('#login-form').length > 0) {
        $('#forgot-password').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $('#login-form').slideUp('fast');
            $('#recover-password').slideDown('fast');
        });

        $('#cancel-recover-password').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $('#recover-password').slideUp('fast');
            $('#login-form').slideDown('fast');
        });

        $('#recover-password-button').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            var user_login = $('input[name=user_login]').val();
            $.ajax({
                url: alidAjax.ajaxurl,
                type: "POST",
                data: {
                    action: "ads_recover_password_action",
                    user_login: user_login 
                },
                dataType: "json",
                success: function(xhr) {
                    var errorBlock = $('.error-message-block p');
                    errorBlock.html('');
                    if (xhr.result == true) {
                        $('#recover-password').slideUp('fast');
                        $('#recover-password-message').slideDown('fast');
                        $('#recover-password-message').html('<p>' + xhr.message + '</p>');
                    } else {
                        $.each(xhr.errors, function(index, value) {
                           errorBlock.append(value + '<br/>'); 
                        });
                    }
                },
                error: function(xhr) {
                }
            });
        });

        $('#reset-password-button').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $.ajax({
                url: alidAjax.ajaxurl,
                type: "POST",
                data: $('#reset-password-form').serialize(),
                dataType: "json",
                success: function(xhr) {
                    $.each(
                        $('.has-error'),
                        function(index, value) {
                            $(value).removeClass('has-error');
                            $(value).find('.help-block').remove();
                        }
                    );

                    if (xhr.result == true) {
                        $('#reset-password').slideUp('fast');
                        $('#recover-password-message').slideDown('fast');
                        $('#recover-password-message').html('<p>' + xhr.message + '</p>');
                    } else {
                        $.each(xhr.errors, function(index, value) {
                            var formField = $('input[name='+value.field+']');
                            if (formField.length > 0) {
                                var wrapper = formField.parents('.form-group');
                                wrapper.addClass('has-error');
                                wrapper.append('<span class="help-block">' + value.message + '</span>');

                                var wrapper2 = formField.parents('.inputcont');
                                wrapper2.addClass('has-error');
                                wrapper2.append('<span class="help-block">' + value.message + '</span>');
                            }
                        });
                    }
                },
                error: function(xhr) {
                }
            });
        });
    }
});