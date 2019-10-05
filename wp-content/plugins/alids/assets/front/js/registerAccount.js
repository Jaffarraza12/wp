jQuery(function($) {
    if ($('#register-account-form').length > 0) {
        $('#register-account-button').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            var submitButton = $(this);
            submitButton.attr('disabled', true);
            var registerForm = $('#register-account-form');
            $.ajax({
                url: alidAjax.ajaxurl,
                type: "POST",
                data: registerForm.serialize(),
                dataType: "json",
                success: function(xhr) {
                    $.each(
                        $('.has-error'),
                        function(index, value) {
                            $(value).removeClass('has-error');
                            $(value).find('.help-block').remove();
                        }
                    );
                    var errorBlock = $('.error-message-register p');
                    errorBlock.html('');
                    if (xhr.result == true) {
                        submitButton.removeAttr('disabled');
                        $('#register-account').slideUp('fast');
                        if( $('#message-send-mail').length){
                            $('#message-send-mail').slideDown('fast');
                            $('#message-send-mail .text').html('<p>' + xhr.message + '</p>');
                        }else{
                            $('#recover-password-message').slideDown('fast');
                            $('#recover-password-message').html('<p>' + xhr.message + '</p>');
                        }

                        //console.log(xhr.result);
                        //window.location.href = document.location.origin + '/account';
                        //location.redirect();
                        /*$('#register-account').slideUp('fast');
                        $('#recover-password-message').slideDown('fast');
                        $('#recover-password-message').html('<p>' + xhr.message + '</p>');*/
                    } else {
                        if (typeof xhr.redirect == 'boolean' && xhr.redirect == true) {
                            location.reload();
                        }
                        submitButton.removeAttr('disabled');
                        $.each(xhr.errors, function(index, value) {
                            var formField = $('#register-account-form').find('input[name='+value.field+']');
                            if (formField.length > 0) {
                                var wrapper = formField.parents('.form-group');
                                wrapper.addClass('has-error');
                                wrapper.append('<span class="help-block">'+ value.message + '</span>');

                                var wrapper2 = formField.parents('.inputcont');
                                wrapper2.addClass('has-error');
                                wrapper2.append('<span class="help-block">'+ value.message + '</span>');
                            }
                        });
                    }
                },
                error: function(xhr) {
                    if (xhr.status == 200) {
                    }
                }
            });
        });
    }
});