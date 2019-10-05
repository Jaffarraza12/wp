jQuery(function($) {

    var lockBtn = false;

    var UpdateProduct = (function(){

        var $this = null,
            con = {
                total   : '#total_item',
                current : '#current_item'
            },
            obj = {
                form     : '#ads_setting-form',
                list     : '#ads_activities-list',
                progress : '#activity-list'
            },
            atc = {
                save   : '#js-saveSettings',
                update : '#js-startNow',
                next   : '#js-getNext'
            },
            $tmpl = {
                settings : $('#ali-update-settings').html(),
                item     : $('#item-product-template').html()
            },
            taskTimer = null;

        function renderSettingForm ( response ) {

            var target = $( obj.form );

            if( response ) {

                if ( response.hasOwnProperty( 'error' ) ) {
                    window.ADS.notify( response.error, 'danger' );
                } else {

                    target.html( window.ADS.objTotmpl( $tmpl.settings, response ) );
                    setTimeout( window.ADS.switchery( target ), 300 );

                    var total   = parseInt( $( con.total ).val() ),
                        current = parseInt( $( con.current ).val() );

                    if( current > 0 && total > 0 ) {
                        window.ADS.progress( $( obj.progress ), total, current );
                    }

                    var select = $('#ads_setting-form [name="applyto"]').val();
                    select = select ? select.split(','): [];

                    $('#ads_setting-form .js-select-cat').find('[multiple="multiple"]').multiselect('select', select);
                    renderApplyto();

                    $.event.trigger( {
                        type : "request:done",
                        obj  : '#'+$(obj.form).attr('id')
                    } );
                }
            }
        }

        function request(action, args, callback) {

            args = args !== '' && typeof args === 'object' ? window.ADS.serialize(args) : args;

            $.ajaxQueue({
                url: ajaxurl,
                data: {action: 'ads_update_product', ads_action: action, args: args},
                type: 'POST',
                dataType: 'json',
                success: callback
            });
        }

        function send(action, args, callback) {

            $.ajaxQueue({
                url: ajaxurl,
                data: {action: 'ads_update_product', ads_action: action, args: args},
                type: 'POST',
                dataType: 'json',
                success: callback
            });
        }

        function updateActivity( response ) {

            var item = $( obj.list ).find('[data-post_id="' + response.post_id + '"]');
            item.find('.status-message').html( $('<span/>', {class: 'color-light-green'}).text( response.notice ) );
            var price_item = item.find('.price-item');
            price_item.html( response.html_price );

            if(response.changePrice)
                price_item.addClass('price-'+response.changePrice);

            if(response.changeQuantity)
                price_item.addClass('quantity-'+response.changeQuantity);

            getNextProduct( response );
        }



        function sendUpdate( e, params ) {
            clearTimeout(taskTimer);
            var post_id = params.post_id,
                product_id = params.product_id,
                product = e.product;

            if(e.code === false){
                request( 'next_product', $( obj.form ), getNextProduct );
                return;
            }

            if( e.code && e.code === 404){
                product = {
                    id : product_id,
                };
                product.available_product = false;
            } else {
                product.description = '';
                product.available_product = true;
            }

            var data = {
                post_id : post_id,
                product : window.ADS.b64EncodeUnicode( JSON.stringify( product ) ),
                setting : {
                    status  : $('#status').val(),
                    variant : $('#variant').val(),
                    cost    : $('#cost').val(),
                    stock   : $('#stock').val()
                }
            };

            send( 'update_product', data, updateActivity );
        }

        function getNextProduct( response ) {

            if (response.hasOwnProperty('error')) {

                window.ADS.notify(response.error, 'danger');

                window.ADS.btnUnLock(lockBtn);
                lockBtn = false;
            } else if ( response.hasOwnProperty( 'message' ) ) {

                window.ADS.notify(response.message, 'success');
                window.ADS.progress( $(obj.progress), 10, 10 );

                window.ADS.btnUnLock(lockBtn);
                lockBtn = false;
            } else {

                var $el = $( obj.list );

                if (!$el.find('.table-container').length)
                    $el.html($('<div/>', {class: 'table-container'}));

                $el = $el.find('.table-container');

                window.ADS.progress( $(obj.progress), response.total, response.current );

                var c = $el.find('.review-item');

                if (c.length >= 15) {
                    c.last().remove();
                }

                $el.prepend( window.ADS.objTotmpl( $tmpl.item, response.row ) );

                $( con.current ).val(response.current);

                if( ! response.row.url ) {
                    if(response.row.post_id)
                        $('[data-post_id="'+response.row.post_id+'"]').find('.status-message').html('');
                    update(false);
                } else {

                    var params = {
                        post_id : response.row.post_id,
                        url     : response.row.url,
                        product_id : response.row.product_id
                    };

                    window.ADS.aliExtension.productAli( response.row.url).then(function (e) {

                        if( e.code && e.code === 404){
                            setTimeout(function () {
                                window.ADS.aliExtension.productAli( response.row.url).then(function (e) {
                                    sendUpdate(e, params)
                                } );
                            }, 3000);
                        }else{
                            sendUpdate(e, params)
                        }

                    });

                    taskTimer = setTimeout(function () {
                        window.ADS.aliExtension.startTask(response.row.url);
                    }, 60000);

                }
            }
        }

        function update( first ) {

            var action = first ? 'first_product' : 'next_product';

            request( action, $( obj.form ), getNextProduct );
        }

        function checkStatus() {
            var inn = $('#interval').parents('.form-group');

            if( $(document).find('#enabled').is(':checked') ) {
                inn.show();
            } else {
                inn.hide();
            }
        }

        function renderApplyto(){

            $('#ads_setting-form .js-select-cat').hide();

            var v = $('#ads_setting-form [name="prod_type"]').val();

            if( v == 'categories' ){
                var selectedValues = [];
                $('option:selected', '#ads_setting-form .js-select-cat').each(function() {
                    selectedValues.push($(this).val());
                });
                $('#ads_setting-form [name="applyto"]').val(selectedValues.join());
                $('#ads_setting-form .js-select-cat').show();
            }

        }

        return {
            init: function(){

                $this = this;

                window.ADS.aliExtension.sleepTask(1);
                window.ADS.aliExtension.enableAjax();

                request( 'setting_form', '', renderSettingForm );

                $(document).on('click', atc.update, function(e){

                    e.preventDefault();

                    $( obj.list ).html('');
                    $( atc.next ).remove();

                    lockBtn = $(this);
                    window.ADS.btnLock( lockBtn );

                    $( con.current ).val(0);

                    window.ADS.progress( $( obj.progress ), 0, 0 );

                    update(true);
                });

                $(document).on('click', atc.next, function(e){

                    e.preventDefault();

                    $( obj.list ).html('');
                    $( atc.next ).remove();

                    lockBtn = $(atc.update);
                    window.ADS.btnLock( lockBtn );

                    update();
                });

                $(document).on('click', atc.save, function(e){

                    e.preventDefault();

                    lockBtn = $(this);
                    window.ADS.btnLock( lockBtn );

                    request( 'save_form', $(obj.form), renderSettingForm );
                });

                $(document).on('click', '#js-reviewNext', function(e){

                    e.preventDefault();

                    $(this).remove();
                    lockBtn = $('#js-reviewImport');

                    window.ADS.btnLock( lockBtn );

                    $('#current_item').val(0);

                    importReviews(false);
                });

                $(document).on('request:done', function(e) {
                    if( e.obj === obj.form ) {
                        checkStatus();
                    }
                });

                $(document).on('click', '#enabled', function(){

                    var interval = $('#interval').parents('.form-group');

                    if( $(this).is(':checked') ) {
                        interval.show();
                    } else {
                        interval.hide();
                    }
                });

                $(document).on('change', '#ads_setting-form [name="prod_type"]', function(){
                    $('#ads_review-form [name="applyto"]').val('');
                    renderApplyto();
                });

                $(document).on('change', '#ads_setting-form .js-select-cat', function(){
                    renderApplyto();
                });

            }
        };
    })();

    UpdateProduct.init();
});