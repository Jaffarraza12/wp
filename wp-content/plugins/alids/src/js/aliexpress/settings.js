/**
 * Created by Vitaly Kukin on 03.08.2017.
 */
jQuery(function($) {
    var $this;

    var $obj = {
        stop : false,
        imagesForm : $('#setting_images-form'),
        uploadImages : '#js-apply_upload_images',
        progressMain : '#main-progress',

    };

    var Settings = {

        request: function (action, args, callback) {

            args = args !== '' && args instanceof jQuery ? window.ADS.serialize(args) : args;

            $.ajaxQueue({
                url: ajaxurl,
                data: { action: 'ads_uploadExternalImages', ads_actions: action, args: args },
                type: 'POST',
                dataType: 'json',
                success: callback
            });
        },
        getTotal : function(){
            $this.request('info', [], $this.setNext);
        },
        setNext : function( response ) {

            if (response) {

                if ( response.hasOwnProperty( 'error' ) ) {

                    window.ADS.notify(response.error, 'danger');

                    window.ADS.btnUnLock( $obj.imagesForm.find( $obj.uploadImages ) );
                    window.ADS.btnUnLock( $('#setting_images-form [name="save"]')  );

                    window.ADS.progress( $($obj.progressMain), 0, 0 );

                } else if( $obj.stop ) {

                    window.ADS.notify(response.message, 'success');

                    window.ADS.btnUnLock( $obj.imagesForm.find( $obj.uploadImages ) );
                    window.ADS.btnUnLock( $('#setting_images-form [name="save"]')  );

                    window.ADS.progress( $($obj.progressMain), 1, 1 );

                } else {
                    window.ADS.progress( $($obj.progressMain), response.count, response.current );

                    $this.loadItem(response);
                }
            }
        },
        loadItem : function( response ) {

            if(response.current == response.count){
                $obj.stop = true;
            }

            $this.request(
                'list_images',
                '',
                $this.uploadImages
            );
        },
        uploadImages: function( response ) {

            if ( response ) {

                if ( response.hasOwnProperty( 'error' ) ) {

                    window.ADS.notify(response.error, 'danger');

                    window.ADS.btnUnLock( $obj.imagesForm.find( $obj.uploadImages ) );
                } else if( !response.links.length ) {
                    $this.getTotal();
                } else if( typeof response.links[response.current_link]  == 'undefined' ) {
                    $this.request('apply', [], $this.getTotal);

                } else {

                    $this.request(
                        'load_image',
                        {links:response.links, current_link:response.current_link},
                        $this.uploadImages
                    );
                }
            }
        },

        init: function() {
            $this = this;

            $(document).on('request:button', function(e) {

                if('save_page_setting_images' == e.action){
                    $this.request(
                        'reset',
                        '',
                        function () {
                            window.ADS.progress( $($obj.progressMain), 0, 0 );

                        }
                    );
                }

            });

            $this.request('info', [], function (response) {
                window.ADS.progress( $($obj.progressMain), response.count, response.current );

            });

            $obj.imagesForm.on('click', $obj.uploadImages, function(e){
                e.preventDefault();
                $obj.stop = false;
                window.ADS.btnLock( $(this) );
                window.ADS.btnLock( $('#setting_images-form [name="save"]') );

                $this.getTotal();
            });
        }
    };

    Settings.init();
});