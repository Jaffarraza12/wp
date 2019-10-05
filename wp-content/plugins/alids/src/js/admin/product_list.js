
(function ($) {

    (function () {
        var $this;

        sendOptionsProduct = function (action, args, cb) {
            $.ajaxQueue( {
                url      : ajaxurl,
                dataType : 'json',
                data     : {
                    action      : 'ads_action_request_post',
                    ads_action  : action,
                    args 		: args
                },
                type     : "POST",
                success  : cb

            } );
        };

        function sendResetProduct(e, post_id, product_id) {

            return new Promise(function (resolve) {
                if(e.code === false){
                    ADS.notify( 'Unknown error.' );
                    return resolve();
                }

                var product = e.product;

                if( e.code && e.code === 404){
                    product = {
                        id : product_id,
                    };
                    product.available_product = false;
                } else {
                    product.description = '';
                    product.available_product = true;
                }

                sendOptionsProduct('reset_product',
                    {
                        post_id : post_id ,
                        product     : ADS.b64EncodeUnicode(JSON.stringify(product))
                    },
                    function (response) {
                        ADS.notify( product.title + ' ' + response.text, 'success' );
                        return  resolve();
                    });
            })


        }

        function resetProduct(post_id) {

            return window.ADS.product(post_id , ['productUrl', 'product_id'])
                .then(function(product){
                    var productUrl = product.productUrl;
                    var product_id = product.product_id;
                    return window.ADS.aliExtension.productAli( productUrl ).then(function (params) {
                        return sendResetProduct(params, post_id, product_id)
                    });

                });
        }

        function reset(post_ids) {
            post_ids.reduce(function (accumulatorPromise, nextID) {
                return accumulatorPromise.then(function () {
                    return resetProduct(nextID).then(function () {
                        $('#cb-select-'+nextID).prop('checked', false);
                    });
                });
            }, Promise.resolve());
        }

        return {
            init: function () {
                console.log(window.ADS);

                if($this){
                    return this;
                }

                $this = this;

                $('body').on('click', '#doaction', function (e) {


                    var val = $('#bulk-action-selector-top').val();
                    console.log(val);
                    if(val !== 'reset_product'){
                        return true;
                    }

                    e.preventDefault();

                    var post_id = [];

                    $('[name="post[]"]:checked').each(function () {
                        post_id.push($(this).val());
                    });

                    reset(post_id);
                    console.log(post_id);
                });

                $('body').on('click', '#doaction2', function (e) {
                    e.preventDefault();
                    var val = $('#bulk-action-selector-bottom').val();
                    if(val !== 'reset_product'){
                        return true;
                    }

                    e.preventDefault();

                    var post_id = [];

                    $('[name="post[]"]:checked').each(function () {
                        post_id.push($(this).val());
                    });

                    reset(post_id);

                });

             //   this.request = window.ADS.request('adsReview');

            }
        }
    })().init()

})(jQuery);