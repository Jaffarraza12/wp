/**
 * Created by Vitaly Kukin on 03.08.2017.
 */
jQuery(function($) {

    var $obj = {
        currencyForm : $('#setting_currency-form'),
        currencyList : $('#exchange_table')
    };

    var Settings = {

        request: function (action, args, callback) {

            args = args !== '' && typeof args === 'object' ? window.ADS.serialize(args) : args;

            $.ajaxQueue({
                url: ajaxurl,
                data: { action: 'ads_action_request', ads_action: action, args: args },
                type: 'POST',
                dataType: 'json',
                success: callback
            });
        },
        loadCurrency: function () {

            this.request('page_setting_currency_set', $obj.currencyForm, this.listCurrency);
        },
        listCurrency: function(response) {

            var tmpl = $($obj.currencyList.data('ads_template')).html(),
                target = $($obj.currencyList.data('ads_target'));

            if (response) {

                if (response.hasOwnProperty('error')) {
                    window.ADS.notify(response.error, 'danger');
                    window.ADS.btnUnLock( $obj.currencyForm.find('.ads-button') );
                } else if (response.hasOwnProperty('message')) {
                    window.ADS.mainRequest( $obj.currencyForm );
                    window.ADS.mainRequest( $obj.currencyList );
                    window.ADS.notify(response.message, 'success');
                    window.ADS.btnUnLock( $obj.currencyForm.find('.ads-button') );
                    $obj.currencyForm.find('[name="currency_list"]').val('');
                } else {
                    target.html(window.ADS.objTotmpl(tmpl, response));
                    $obj.currencyForm.find('[name="currency_list"]').val(response.currency_list);
                    Settings.loadCurrency();
                }
            }
        },
        init: function() {
            var $this = this;

            $obj.currencyForm.on('click', '.ads-button', function(e){
                e.preventDefault();
                window.ADS.btnLock( $(this) );
                $obj.currencyList.html();
                $this.loadCurrency();
            });
        }
    };

    Settings.init();
});