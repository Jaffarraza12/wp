jQuery(function($) {
    var fileList = new Array();
    
    function isValid($form) {
        var $root = $('.conditions-review', $form);
        if(!$root.length){
            return true;
        }

        if(!$('.in-conditions-review', $form).is(':checked')){
            $('.conditions-help', $form).show();
            return false;
        }

        return true;

    }

    $('.in-conditions-review').on('change', function (e) {
        var check = $(this).is(':checked');
        $(this).closest('form').find('.conditions-help').toggle(!check);
    });

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

    $('.stars-container').rating();

    $('#review-file-upload').fileupload({
        url        : alidAjax.ajaxurl,
        dataType   : 'json',
        autoUpload : false
    }).on('fileuploadadd', function(e, data) {
        var typeFile = data.files[0].type.split('/');
        if (typeFile[0] != 'undefined' && typeFile[0] != 'image') {
            return false;
        }
        var params = data.files[0].name.split('.');
        params[0] = $.trim(params[0]).substring(0, 17) + "...";
        $('<p class="review_filenames" style="padding:10px 0px 0px 0px;">' + params.join("") + ' <i style="cursor:pointer;"class="glyphicon glyphicon-remove-circle remove-review-image" data-imagename="' + data.files[0].name + '"></i>;</p>').appendTo('.list-file');
        $.each(data.files, function(index, file) {
            fileList.push(data.files[index]);
        });

        $('.remove-review-image').on('click', function() {
            var imageName = $(this).data('imagename');
            $(this).parent('p').remove();
            $.each(fileList, function(index, value) {
                if (typeof value != 'undefined') {
                    if (imageName == value.name) {
                        fileList.splice(index, 1);
                    }
                }
            });
        });
    });

    $('form.addReviewForm').submit( function(event) {
        event.preventDefault();
        event.stopPropagation();

        var $form = $(this);

        if(!isValid($form)){
            return false;
        }

        if (fileList.length > 0) {
            $('#review-file-upload').fileupload(
                'send',
                {files: fileList}
            )
            .success(function(result, textStatus, jqXHR) {
                if (result.result == true) {
                    $form.trigger( 'reset' );
                    $('.stars .star').removeClass('fullStar');
                }
                showNotify(result.message, result.result);

            })
            .error(function(jqXHR, textStatus, errorThrow) {
                showNotify(jqXHR.responseText, false);
            })
            .complete(function(result, textStatus, jqXHR) {
                fileList = new Array();
                $('.review_filenames').remove();
            });
        } else {
            $.ajax({
                url: alidAjax.ajaxurl,
                type: "POST",
                data: $form.serialize(),
                dataType: 'json',
                success: function(xhr) {
                    showNotify(xhr.message, xhr.result);
                    if (xhr.result == true) {
                        fileList = new Array();
                        $form.trigger( 'reset' );
                        $('.review_filenames').remove();
                        $('.stars .star').removeClass('fullStar');
                    }
                },
                error: function(xhr) {
                    showNotify(xhr.responseText, false);
                 }
            });
        }
    });
});