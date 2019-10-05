jQuery(function($) {

    var pricesHandlebars = {

        isUrl : function(s) {
            var regexp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
            return regexp.test(s);
        },
        init: function () {
            var $this = this;
            Handlebars.registerHelper('gravatar', function (option, color) {

                option = Handlebars.escapeExpression( option );

                return $this.isUrl( option ) ?
                    new Handlebars.SafeString( '<img src="'+ option +'" class="gravatar">' ) :
                    new Handlebars.SafeString( '<span class="gravatar text-uppercase '+ color +'">'+ option +'</span>' );
            });

            Handlebars.registerHelper( 'image', function ( url, option ) {

                if( option === 1 )
                    return url.replace('_640x640.jpg', '_50x50.jpg');
                else
                    return url.replace('_640x640.jpg', '');
            } );
        }
    };

    pricesHandlebars.init();

    var obj = {
        tmpl : {
            list     : '#ali-list-template',
            orders   : '#ali-orders-list',
            notfound : '#ali-list-notfound',
            more     : '#ali-more-template'
        },
        check : '#checkAll',
        p : {
            page : '#ads_page'
        }
    };

    var Orders = {

        request: function (action, args, callback) {

            args = args !== '' && typeof args === 'object' ? window.ADS.serialize(args) : args;

            $.ajaxQueue({
                url: ajaxurl,
                data: {action: 'ads_action_orders', ads_action: action, args: args},
                type: 'POST',
                dataType: 'json',
                success: callback
            });
        },

        listOrders: function () {

            this.request('list_tracking', $('#params'), this.listOrdersRender);
        },

        listOrdersRender: function (response) {

            var tmpl = $(obj.tmpl.list).html(),
                target = $(obj.tmpl.orders);
            if (response) {

                if (response.hasOwnProperty('error')) {
                    window.ADS.notify(response.error, 'danger');
                } else {

                    if( response.orders.length === 0 )
                        tmpl = $( obj.tmpl.notfound ).html();

                    target.html(window.ADS.objTotmpl(tmpl, response));
                    setTimeout(window.ADS.switchery(target), 300);

                    if( target.find('.pagination-menu').length )
                        window.ADS.createJQPagination( '#'+target.attr('id'), response.total, response.ads_page);
                }
            }
        },

        renderChangeStatus: function(response) {

            if (response) {

                if (response.hasOwnProperty('error')) {
                    window.ADS.notify(response.error, 'danger');
                } else {

                    window.ADS.notify(response.message, 'success');

                    var p = $( '[data-id="'+response.id+'"]' );

                    p.find('.gravatar').addClass(response.color);
                    p.find('.fulfillment').addClass('status-'+response.color);
                }
            }
        },

        handler: function () {

            var $this = this,
                $d = $(document);

            $d.on('click', '#btn-clear', function(){

                var foo = { ads_page : 1, fulfillment : 'all', s : '', from : '', to : '', tracking_status : 'all' };

                $('#all-fulfillment').val('all').change();
                $('#all-tracking_status').val('all').change();
                $('#all-filter_tracking').val('all').change();

                $.each(foo, function(i, v){
                    $('#params').find('input[name="'+i+'"]').val(v);
                });

                $.event.trigger({ type : "datepicker:change" });

                $this.listOrders();

                $.event.trigger({ type : "changedocinfo" });
            });

            $d.on('pagination:click', function (e) {
                $(obj.p.page).val(e.page);
                $this.listOrders();
                $.event.trigger({ type : "changedocinfo" });
            });

            $d.on('datepicker:update', function () {
                $(obj.p.page).val(1);
                $this.listOrders();
                $.event.trigger({ type : "changedocinfo" });
            });

            $d.on('click', '#btn-search', function (e) {

                e.preventDefault();

                var s = $('#search').val().trim();

                $(obj.p.page).val(1);
                $('#s').val( s );
                $this.listOrders();
                $.event.trigger({ type : "changedocinfo" });

            });

            $d.on('change', '#all-fulfillment', function (e) {
                $('#fulfillment').val($(this).val());
                $('#ads_page').val(1);
                $this.listOrders();
                $.event.trigger({ type : "changedocinfo" });
            });

            $d.on('change', '#all-tracking_status', function (e) {
                $('#tracking_status').val($(this).val());
                $('#ads_page').val(1);
                $this.listOrders();
                $.event.trigger({ type : "changedocinfo" });
            });

            $d.on('change', '#all-filter_tracking', function (e) {
                $('#filter_tracking').val($(this).val());
                $('#ads_page').val(1);
                $this.listOrders();
                $.event.trigger({ type : "changedocinfo" });
            });

            $d.on('change', '#all-filter_order', function (e) {
                $('#filter_order').val($(this).val());
                $('#ads_page').val(1);
                $this.listOrders();
                $.event.trigger({ type : "changedocinfo" });
            });

            $d.on('click', '.js-get-tracking', function(){
                $(this).find('.fa').addClass('spin');
                var order_number = $(this).data('order_number');
                var order_id = $(this).data('order_id');

                if(order_number && order_id){
                    window.ADS.aliExtension.getTIPOrder(order_id, order_number);
                }

            });

            $d.on('click', '#all-sync', function(){
                $(this).find('.fa').addClass('spin');
                Orders.request('list_ordersIdAli', $('#params'), Orders.getTIPOrders);
            });

            window.ADS.Dispatcher.on('adsGoogleExtension:setOrderTIP', function ( e ) {

                if(typeof e.orderIdStore == 'undefined' || typeof e.orderDetail.trackingNo == 'undefined'){
                    var error = $('#msg-tip-error').text();
                    window.ADS.notify( error );
                    return;
                }

                Orders.listOrders();

            }, this);


            window.ADS.Dispatcher.on('adsGoogleExtension:setOrdersTIP', function ( e ) {

                $('#all-sync .fa').removeClass('spin');

                if(typeof e.ordersDetail == 'undefined' || !e.ordersDetail.length){
                    var error = $('#msg-tip-error').text();
                    window.ADS.notify( error );
                    return;
                }

                Orders.listOrders();

            }, this);

            window.ADS.switchery( $('#action-box') );
        },

        getTIPOrders: function(res){

            if(res.ordersIdAli){
                $.each(res.ordersIdAli, function(i, orderIdAli){
                    $('.js-get-tracking[data-order_number="'+orderIdAli+'"]').find('.fa').addClass('spin');

                });
                window.ADS.aliExtension.getTIPOrders( res.ordersIdAli );
            }
        },

        init: function () {
            this.handler();
            this.listOrders();
        }
    };

    Orders.init();

});