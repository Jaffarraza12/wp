/**
 * Created by Vitaly Kukin on 29.03.2016.
 */
jQuery(function($) {

    $(document).on( 'change keyup', 'input', function () {

        var type = [ 'submit', 'radio', 'checkbox' ];

        if ( $( this ).val() != '' ) $( document ).find( 'input' ).each( function () {
            if ( $.inArray( $( this ).attr( 'type' ), type ) == -1 &&
                $( this ).val() != '' &&
                $( this ).next().length > 0 &&
                $( this ).next().prop( 'tagName' ) == 'LABEL' )
                $( this ).addClass( 'valid' );
            } );
	});


    var callGallery = (function () {
        var $this;

        var obj = {
            row: '#tmpl-row-edit',
            img: '#tmpl-item-media',
            gallery: '#ads-gallery',
            sku: '#ads-sku'
        };

        function manageGallery() {

            var el = obj.gallery;
            var item = ".image-item:not(#ads-upload-image)";

            $(el).sortable({
                items: ".image-item:not(#ads-upload-image)"
            });

            $(el).on('click', '[data-toggle="remove"]', function () {
                $(this).parents(item).remove();
                return false;
            });

            $(el).on('click', '[data-toggle="move-left"]', function () {
                var $th = $(this).parents(item);
                if ($th.prev().length) {
                    $th.prev().before($th);
                }
                return false;
            });

            $(el).on('click', '[data-toggle="move-right"]', function () {
                var $th = $(this).parents(item);
                if ($th.next(item).length ) {
                    $th.next().after($th);
                }
                return false;
            });
        };

        function checkExistingId(id) {

            var el = $(obj.gallery).find('.image-item');

            if (!el.length) return false;

            id = id.toString();

            var res = false;
            el.each(function () {

                var value = $(this).find('[name="gallery[]"]').val();

                if (value === id)
                    res = true;
            });

            return res;
        }

        function renderMediaUploader() {

            var file_frame;

            if (undefined !== file_frame) {
                file_frame.open();
                return;
            }

            file_frame = wp.media.frames.file_frame = wp.media({
                frame: 'post',
                state: 'insert',
                multiple: true
            });

            file_frame.on('insert', function () {

                file_frame.state().get('selection').each(function (image) {
                    var id = image.id;
                    if (!checkExistingId(image.id)) {
                        $.ajax({
                            url: ajaxurl,
                            data: {
                                action: 'ads_get_image',
                                id: id,
                                size: 'ads-medium'
                            },
                            type: "POST",
                            success: function (response) {

                                response = {value: id, url: response};
                                $(obj.gallery).find('#ads-upload-image').before(window.ADS.objTotmpl($(obj.img).html(), response))
                            }
                        });
                    }
                });

            });

            file_frame.open();
        }

        return {
            init: function () {
                if ($this) return;
                $this = this;

                $('body').on('click', '#ads-upload-image', function (e) {
                    e.preventDefault();
                    renderMediaUploader();

                });

                $(document).on('request:done', function (e) {
                    if ('#ads-form-box-callGallery' == e.obj) {
                        manageGallery();
                    }
                });

            }
        }
    })().init();

});