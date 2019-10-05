jQuery( function ( $ ) {

    (function () {
        var $this;

        var obj = {
            'btnAuth': '.js-auth',
            'btnDelete': '#ali-extension-auth-token .js-delete',
            'btnAuthLogin': '.js-ads-auth-login'
        };

        return {
            init: function () {
                var $this = this;

                $('body').on('click', obj.btnAuth ,function () {
                    window.ADS.aliExtension.auth();
                    window.ADS.mainRequest($('#ali-extension-auth-token'));
                });

                $('body').on('click', obj.btnAuthLogin ,function (e) {
                    e.preventDefault();
                    window.ADS.aliExtension.auth();
                    setTimeout(function () {
                        $('#nav').hide();
                        $('#oauth1_authorize_form').hide();
                        $('#info-auth').show();
                    }, 300);
                });

                $('body').on('click', obj.btnDelete ,function () {

                    var key = $(this).data('key');

                    if(!key){
                        return;
                    }

                    $.ajaxQueue({
                        url: ajaxurl,
                        data: {action: 'ads_oauth1', ads_action: 'delete', args: {key : key}},
                        type: 'POST',
                        dataType: 'json',
                        success: function (params) {
                            window.ADS.mainRequest($('#ali-extension-auth-token'));
                        }
                    });
                });
            }
        }
    })().init();

});