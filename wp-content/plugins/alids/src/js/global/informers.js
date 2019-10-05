/**
 * Created by Denis Zharov on 10.04.2018.
 */
jQuery(function($){

    if(typeof alidAjax !== 'undefined'){
        ajaxurl = alidAjax.ajaxurl;
    }

    var $this;
    var $interval = 15000;

    var $obj = {
        counter : $('#wp-admin-bar-upluad-image-informer .counter')
    };

    var ImportReviews = {

        request: function (callback) {
            $.ajax({
                url: ajaxurl,
                data: { action: 'ads_get_image_upload_residue'},
                type: 'POST',
                dataType: 'json',
                success: callback
            });
        },

        set_result: function( response ){
            $obj.counter.text( response.count_images );

            if( parseFloat(response.count_images) > 0 ){
                setTimeout( $this.get_count_image,  5000);
            }

        },

        get_count_image: function(){
            $this.request($this.set_result)
        },

        init: function() {
            $this = this;
            setTimeout( $this.get_count_image, 15000);
        },

    };
    ImportReviews.init();

});