jQuery( function ( $ ) {

    var Seo = (function () {

        var $obj = {
            currencyForm: $('#p-seo-options')
        };

        function checkSitemap_status() {
               $('.js-sitemaplinks').toggle($obj.currencyForm.find('#sitemap_status').is(':checked'));

        }

        return {
            init: function () {

                $(document).on('request:done', function (e) {
                    if (e.obj === '#p-seo-options') {
                        checkSitemap_status();
                    }
                });

                $obj.currencyForm.on('click', '#sitemap_status', function () {

                    checkSitemap_status();
                });
            }
        };
    })();
    Seo.init();

});