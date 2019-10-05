var setting_product_j = (function ($) {

    function request(ads_action, args) {

        return new Promise(function (resolve, reject) {
            args.post_id = parseInt($('#setting-product-sidebar').data('post-id'));

            $.ajax({
                url: alidAjax.ajaxurl,
                type: 'POST',
                dataType: 'json',
                data: {
                    action: 'ads_product_setting',
                    ads_action: ads_action,
                    args : args
                },
                success: function (data) {

                    if (data.hasOwnProperty('error')) {
                        //todo чтото вывести
                       return reject(data);
                    } else {
                       return resolve(data);
                    }

                }
            });
        })
    }

    return {
        init: function () {
           // $('body').toggleClass('setting-product--open');
            $('body').on('click', '.setting-product-active, #setting-product-overlay, .setting-product-sidebar .close-setting', function () {
                $('body').toggleClass('setting-product--open');
            });

            $('body').on('click', '.js-product-trash', function (e) {
                e.preventDefault();

                request('product_trash', {

                }).then(function (value) {
                    location.href = value.category_link;
                })
            });

        }
    }
})(jQuery);

var i = setInterval(function () {
    if(jQuery('#setting-product-sidebar').length){
        clearInterval(i);
        setting_product_j.init();
    }
}, 100);