jQuery(function($) {

    window.adsModal = {
            init: function () {
                if(!$('#ads-modal').length){
                    $('body').append($('#ads-tmpl-modal').html());
                }

            },
            clear: function () {
                $('#ads-modal .modal-title').text('');
                $('#ads-modal .modal-body').html('');
                $('#ads-modal .modal-footer').html('');
                $('#ads-modal .modal-dialog').removeClass('modal-md').removeClass('modal-lg');
            },
            hide:function () {
                window.adsModal.clear();
                $('#ads-modal').modal('hide');
            },
            show: function (head, body, footer, size) {
                window.adsModal.clear();

                head = head || '';
                body = body || '';
                footer = footer || '';
                size = size || 'lg';

                $('#ads-modal .modal-title').text(head);
                $('#ads-modal .modal-body').html(body);
                $('#ads-modal .modal-footer').html(footer);
                $('#ads-modal .modal-dialog').addClass('modal-' + size);

                $('#ads-modal').modal('show');

                setTimeout(window.ADS.switchery($('#ads-modal')), 300);
            }
        };

    window.adsModal.init();


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
        },
        order : {
            details  : '#order-details',
            shipping : '#order-shipping',
            billing : '#order-billing-details',
            action   : '#order-action',
            items    : '#order-items',
            tmpl_details  : '#tmpl-details',
            tmpl_shipping : '#tmpl-shipping',
            tmpl_billing  : '#tmpl-billing',
            tmpl_action   : '#tmpl-action',
            tmpl_items    : '#tmpl-list-items'
        }
    };

    var Orders = {

        request: function (action, args, callback) {

            args = args !== '' && args instanceof jQuery ? window.ADS.serialize(args) : args;

            $.ajaxQueue({
                url: ajaxurl,
                data: {action: 'ads_action_orders', ads_action: action, args: args},
                type: 'POST',
                dataType: 'json',
                success: callback
            });
        },

        listOrders: function () {

            this.request('list_orders', $('#params'), this.listOrdersRender);
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

        showMoreRender: function (response) {

            var tmpl = $(obj.tmpl.more).html();

            if (response) {

                if (response.hasOwnProperty('error')) {
                    window.ADS.notify(response.error, 'danger');
                } else {

                    $('.order-more-' + response.id).html(window.ADS.objTotmpl(tmpl, response));
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
//TODO удалить текущий цвет без перечисления цветов
                    p.find('.gravatar').removeClass('blue green orange dark light-red').addClass(response.color);
                    p.find('.fulfillment').removeClass('status- status-blue status-green status-orange status-dark status-light-red').addClass('status-'+response.color);
                }
            }
        },

        changeFulfillment: function( el ) {

            this.request('change_fulfillment', 'fulfillment='+el.val()+'&id='+el.parents('.order-item').data('id'), this.renderChangeStatus);
        },

        checker : function(){

            $(document).on('change', obj.check, function () {
                $(obj.tmpl.orders).find('[name="order_id"]').prop('checked', $(this).is(':checked'));
                $.uniform.update();
            });

            $(obj.tmpl.orders).on('click', '[name="order_id"]', function(){

                var u = $(obj.tmpl.orders).find('[name="order_id"]:not(:checked)');

                if( u.length && $(obj.check).prop( "checked" ) ){
                    $(obj.check).prop( "checked", false );
                } else if( u.length === 0 && ! $(obj.check).prop( "checked" )){
                    $(obj.check).prop( "checked", true );
                }
                $.uniform.update(obj.check);
            });
        },

        toTrashRender : function( response ) {

            if (response) {

                if (response.hasOwnProperty('error')) {
                    window.ADS.notify(response.error, 'danger');
                } else {

                    window.ADS.notify(response.message, 'success');

                    Orders.listOrders();
                }
            }
        },

        toTrash : function( el ) {

            var id = el.closest('.order-item');

            if( $(obj.tmpl.orders).find('[name="id"]').length <= 1 )
                $(obj.p.page).val(1);

            this.request('to_trash_order', id, this.toTrashRender);
        },

        toTrashItems : function($items) {

            var ids = [];

            $items.each(function () {
                ids.push($(this).data('id'))
            });

            if(ids.length){
                $(obj.p.page).val(1);
            }

            this.request('to_trash_orders', {ids : ids}, this.toTrashRender);
        },

        fromTrashItems : function($items) {

            var ids = [];

            $items.each(function () {
                ids.push($(this).data('id'))
            });

            if(ids.length){
                $(obj.p.page).val(1);
            }

            this.request('from_trash_orders', {ids : ids}, this.toTrashRender);
        },

        deleteOrders : function($items) {

            var ids = [];

            $items.each(function () {
                ids.push($(this).data('id'))
            });

            if(ids.length){
                $(obj.p.page).val(1);
            }

            this.request('delete_orders', {ids : ids}, this.toTrashRender);
        },

        placeOrders : function($items){
            var ids = [];

            $items.each(function () {
                ids.push($(this).data('id'))
            });

            autofilling.bulk(ids);

        },

        bulk: function() {
            var $this = this;

            $('body').on('click', '#bulk-apply', function (e) {
                e.preventDefault();

                var value = $('#bulk-action').val();

                var $items = $('#ali-orders-list').find('.table-container [id^="check-item-"]:checked')
                    .closest('.order-item');

                if(!$items.length){
                    window.ADS.notify($('.select-element-text').val());
                    return false;
                }

                switch (value) {
                    case 'totrash':
                        $this.toTrashItems($items);
                        break;
                    case 'from_trash':
                    $this.fromTrashItems($items);
                    break;
                    case 'delete':
                        $this.deleteOrders($items);
                        break;
                    case 'place_orders':
                        $this.placeOrders($items);
                        break;
                }
                return false;
            })
        },

        handler: function () {

            var $this = this,
                $d = $(document);

            $this.bulk();

            $d.on('click', '#btn-clear', function(){

                var foo = { ads_page : 1, status : 'all', s : '', from : '', to : '', fulfillment: 'all' };

                $('#all-fulfillment').val('all').change();
                $('#all-status').val('all').change();

                $.each(foo, function(i, v){
                    $('#params').find('input[name="'+i+'"]').val(v);
                });

                $.event.trigger({ type : "datepicker:change" });

                $this.listOrders();

                $.event.trigger({ type : "changedocinfo" });
            });

            $d.on('click', '.js-to_trash', function(){
                $this.toTrash( $(this) );
            });

            $d.on('click', '.js-restore', function(){

                var ids = $(this).closest('.order-item').find('[name="id"]').val();

                if( $(obj.tmpl.orders).find('[name="id"]').length <= 1 )
                    $(obj.p.page).val(1);

                $this.request('from_trash_orders', {ids : [ids]}, $this.toTrashRender);
            });

            $d.on('change', '[name="fulfillment"]', function(){
                $(this).closest('.fulfillment').removeClass('status- status-blue status-green status-orange status-dark status-light-red');
                $this.changeFulfillment( $(this) );
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
                    $('#ads_page').val(1);
                    $('#s').val( s );
                    $this.listOrders();
                    $.event.trigger({ type : "changedocinfo" });
            });

            $d.on('change', '#all-status', function (e) {
                $('#status').val($(this).val());
                $('#ads_page').val(1);
                $this.listOrders();
                $.event.trigger({ type : "changedocinfo" });
            });

            $d.on('change', '#all-fulfillment', function (e) {
                $('#fulfillment').val($(this).val());
                $(obj.p.page).val(1);
                $this.listOrders();
                $.event.trigger({ type : "changedocinfo" });
            });

            $d.on('click', '.js-type', function () {

                $('.js-type').removeClass('active');

                $(this).addClass('active');

                var trash = $(this).data('action') === 'all_orders' ? 0 : 1;

                $('#trash').val(trash);
                $(obj.p.page).val(1);
                $('#s').val('');
                $('#all-status').val('all').selectpicker('refresh');
                $('#status').val('all');

                $this.listOrders();
                $.event.trigger({ type : "changedocinfo" });
            });

            $d.on('click', '.order-show-more', function (e) {
                e.preventDefault();

                var id = $(this).closest('.order-item');

                if( $(this).hasClass('opened') ) {
                    $( '.order-more-' + id.data('id') ).toggle();
                } else {
                    $(this).addClass('opened');
                    $this.request('show_more', id, $this.showMoreRender);
                }
            });

            window.ADS.switchery( $('#action-box') );
        },

        renderOrderDetails: function( response ) {

            if (response) {

                if (response.hasOwnProperty('error')) {
                    window.ADS.notify(response.error, 'danger');
                } else {

                    $(obj.order.details).html(window.ADS.objTotmpl( $(obj.order.tmpl_details).html(), response));
                    $(obj.order.shipping).html(window.ADS.objTotmpl( $(obj.order.tmpl_shipping).html(), response));
                    $(obj.order.action).html(window.ADS.objTotmpl( $(obj.order.tmpl_action).html(), response));
                    $(obj.order.items).html(window.ADS.objTotmpl( $(obj.order.tmpl_items).html(), response));
                    setTimeout(window.ADS.switchery( $('#wpbody-content') ), 300);

                    if(response.billing_address)
                        $(obj.order.billing).html(window.ADS.objTotmpl( $(obj.order.tmpl_billing).html(), response));
                    else{
                        $('.js-billing_address').hide();
                    }

                    if($('body').hasClass('expansion-alids-init')){
                        $('.autofilling').show();
                        $('a#get_tracking').show();
                    }
                }
            }
        },

        orderDetails : function() {

            var id = $('#order_id').val();

            if(!id){
                return;
            }

            this.request('order_details', 'id='+id, this.renderOrderDetails)
        },

        handlerItems: function(){

            var $this = this,
                $d = $(document);

            $d.on('click', '.js-move_to', function () {

                Orders.request('to_trash_order', 'id='+$('#order_id').val(), function( response ) {
                    if (response) {
                        if (response.hasOwnProperty('error')) {
                            window.ADS.notify(response.error, 'danger');
                        } else {
                            window.ADS.notify(response.message, 'success');
                        }
                    }
                });
            });

            $d.on('change', '[name="fulfillment"]', function(){
                $this.request('change_fulfillment', 'fulfillment='+$(this).val()+'&id='+$('#order_id').val(), function (response) {
                    if (response) {
                        if (response.hasOwnProperty('error')) {
                            window.ADS.notify(response.error, 'danger');
                        } else {
                            window.ADS.notify(response.message, 'success');
                        }
                    }
                });
            });

            $d.on('change', '[name="status"]', function(){
                $this.request('change_status', 'status='+$(this).val()+'&id='+$('#order_id').val(), function (response) {
                    if (response) {
                        if (response.hasOwnProperty('error')) {
                            window.ADS.notify(response.error, 'danger');
                        } else {
                            window.ADS.notify(response.message, 'success');
                            Orders.orderDetails();
                        }
                    }
                });
            });

        },

        order : function(){

            $(document).on('click','.js-edit_shipping',function(){
                $('#shipping-info, #shipping-form').toggle();
            });
        },

        init: function () {

            $this = this;

            if( $(obj.tmpl.orders).length ) {
                this.handler();
                this.checker();
                this.listOrders();
            } else {
                this.handlerItems();
                this.orderDetails();
            }
        },
        getOrder: function(){
            return new Promise(function(resolve, reject){
                var id = $('#order_id').val();
                if(!id){
                    return;
                }
                Orders.request('order_details', 'id='+id, resolve);
            })
        }
    };

    Orders.init();


    var shipping_details = (function(){

        return {
            init: function(){
                $('body').on('click', '.js-edit_shipping', function(){

                    Orders.getOrder().then(function(response){
                        var tmpl = $('#tmpl-edit-shipping_details').html();
                        var head = $('#tmpl-edit-shipping_details_head').html();
                        window.adsModal.show(head, window.ADS.objTotmpl( tmpl, response));
                        setTimeout(window.ADS.switchery( $('#wpbody-content') ), 300);
                    });

                });

                $( 'body' ).on('click', '#js-edit_shipping_save', function(e){
                    e.preventDefault();

                    var $modal = $(this).closest('#ads-modal');

                    Orders.request('edit_order', $modal, function (response) {

                          if (response) {

                            if (response.hasOwnProperty('error')) {
                                window.ADS.notify(response.error, 'danger');
                            } else {
                                window.ADS.notify(response.message, 'success');
                                Orders.orderDetails();
                            }
                        }

                        window.adsModal.hide();
                    });
                });
            }
        }
    })().init();


    var autofilling = (function(){
        var $this;

        var obj = {};

        var bulk = {
            active : false,
            ids : []
        };

        function nextOrderBulk() {

            if(!bulk.ids){
                alert('bulk done');
                return;
            }

            var id = bulk.ids.shift();

            if(!id){
                bulk.active = false;

                window.postMessage( {
                    source : 'NAME_SOURCE_PAGE_ADD_ORDER',
                    action : 'pageOrders:openTabListOrders',
                    info   : {}
                }, "*" );
                return;
            }

            addOrderBulk(id);

        }

        function addOrder(trans_id) {

            $.ajaxQueue({
                url: ajaxurl,
                data: {action: 'ads_placeOrderOnAli', trans_id: trans_id},
                type: "POST",
                dataType: 'json',
                success: function (response){
                    data = response;
                    if(data){
                        window.postMessage( { source : 'NAME_SOURCE_PAGE_ADD_ORDER', action : 'addOrder', info : data }, "*" );
                    }
                }
            });
        }

        function addOrderBulk(trans_id) {

            $.ajaxQueue({
                url: ajaxurl,
                data: {action: 'ads_placeOrderOnAli', trans_id: trans_id},
                type: "POST",
                dataType: 'json',
                success: function (response){
                    data = response;
                    if(data){
                        window.postMessage( { source : 'NAME_SOURCE_PAGE_ADD_ORDER', action : 'addOrderBulk', info : data }, "*" );
                    }
                }
            });
        }

        return {
            init: function(){

                if($this){
                    return $this;
                }

                $this = this;

                var data = {
                    score : {
                        url  : window.location.href,
                        name : 'nameScore',
                        type : 'addOrder'
                    }
                };

                window.ADS.Dispatcher.on('doneAutofillBulk', function (params) {
                    nextOrderBulk();
                }, this, false);

                setTimeout( function () {
                    window.postMessage( {
                        source : 'NAME_SOURCE_PAGE_ADD_ORDER',
                        action : 'initPageOrders',
                        info   : data
                    }, "*" );
                }, 1000 );

                window.addEventListener( "message", function ( event ) {

                    if (event.source !== window)
                        return;

                    if (!event.data.source && event.data.source !== 'NAME_SOURCE_PAGE_ADD_ORDER_STORE')
                        return;
                    window.ADS.Dispatcher.trigger(event.data.action, event.data.info);
                });


                $('body').on('click','a.autofilling', function (  ) {
                    var trans_id = parseInt($(this).data('tid'));

                    if(!trans_id){
                        return;
                    }

                    addOrder(trans_id);

                });

                return $this;
            },
            bulk: function (ids) {
/*                if(bulk.active){
                    return;
                }*/
                bulk.active = true;
                bulk.ids = ids;

                nextOrderBulk();

            },

        }
    })().init();

    var tracking = {
        init: function(){

            function searchOrderId( productId, products ) {
                for (var k in products) {
                    if ( products[k][ 'productId' ] === productId ) {
                        return products[k][ 'id' ];
                    }
                }

                return null;
            }

            window.ADS.Dispatcher.on('adsGoogleExtension:setOrderTIP', function ( e ) {

                if(typeof e.orderIdStore == 'undefined' || typeof e.orderDetail.trackingNo == 'undefined'){
                    var error = $('#msg-tip-error').text();
                    window.ADS.notify( error );
                    return;
                }

                var trackingNo = e.orderDetail.trackingNo.trim();

                var $row = $('[data-item_id="'+e.orderIdStore+'"]');

                var success = $('#msg-tip-success').text();

                success = success.replace('{trackingNo}', trackingNo);

                if($row.length){
                    $row.data('tip', trackingNo);
                    $row.find('.tip').hide(0)
                        .html('<a href="http://www.17track.net/?nums=' + trackingNo + '" target="_blank">' + trackingNo + '</a>')
                        .show(300);

                    window.ADS.notify( success, 'success' );
                }

            }, this);


            window.ADS.Dispatcher.on('adsGoogleExtension:setOrdersTIP', function ( e ) {


                if(typeof e.ordersDetail == 'undefined' || !e.ordersDetail.length){
                    var error = $('#msg-tip-error').text();
                    window.ADS.notify( error );
                    return;
                }

                var success = $('#msg-tip-success-all').text();
                window.ADS.notify( success, 'success' );

                Orders.orderDetails();

            }, this);




            window.ADS.Dispatcher.on('adsGoogleExtension:setOrdersIdAli', function ( e ) {

                Orders.orderDetails();

            }, this);

            /**
             * получение tracking для одного продукта из заказа
             */
            $('body').on('click', 'a.js-get-tracking', function ( e  ) {

                e.preventDefault();

                var $row = $(this).closest('.more-order-line');

                var item_id = $row.data('item_id');
                var order_number = $row.data('order_number');

                if(order_number && item_id){
                    window.ADS.aliExtension.getTIPOrder(item_id, order_number);
                }

            });

            /**
             * получение tracking для всех продуктов из заказа
             */
            $( 'body' ).on( 'click', 'a#get_tracking', function () {

                Orders.getOrder().then(function(order){

                    var ordersIdAli = order.list.map(function(i){
                        return !i.tip ?  i.order_number : null});

                    ordersIdAli = ordersIdAli.filter(Boolean);

                    if ( ordersIdAli.length ) {
                        window.ADS.aliExtension.getTIPOrders( ordersIdAli );
                    }
                });

            } );


            $( 'body' ).on( 'click', '.js-placeorder-manually', function () {

                var product_url = $(this).attr('href');
                var $row = $(this).closest('.more-order-line');

                var orderIdStore = $row.data('item_id');
                var order_number = $row.data('order_number');
                var product_id = $row.data('product_id');
                var productUrlOrigin = $row.data('product_url');

                if(window.AvailableExtensions.is() && !order_number && orderIdStore && product_id){
                    window.ADS.aliExtension.placeOrderManually( product_url, product_id, orderIdStore, productUrlOrigin );
                    return false;
                }

            } );

            $( 'body' ).on('click', '.js-edit-tip', function(e){
                e.preventDefault();

                var $row = $(this).closest('.more-order-line');

                var tip = $row.data('tip');
                var order_number = $row.data('order_number');
                var item_id = $row.data('item_id');
                var head = $('#tmpl-edit-tip-head').text();

                var response = {
                    tip: tip,
                    order_number: order_number,
                    item_id: item_id
                };

                var tmpl = $('#tmpl-edit-tip').html();

                window.adsModal.show(head, window.ADS.objTotmpl( tmpl, response));

            });

            $( 'body' ).on('click', '#js-saveTIP', function(e){
                e.preventDefault();

                var $modal = $(this).closest('#ads-modal');

                var $item_id = $modal.find('#item_id'),
                    $tip   = $modal.find('#tip'),
                    $order = $modal.find('#order_number'),
                    i      = $.trim( $item_id.val() ),
                    t      = $.trim( $tip.val() ),
                    o      = $.trim($order.val());

                $.ajaxQueue({
                    url: ajaxurl,
                    data: {action: 'ads_save_tip', id: i, tip: t, order: o},
                    type: "POST",
                    success: function (response){

                        if( response == 'done' ){
                            Orders.orderDetails()
                        }
                    }
                });

                window.adsModal.hide();

            });

        }
    };
    tracking.init();

    (function () {
        var $this;

        var obj = {
            root: '.select-sku',
            row: '.js-list-sku-row',
            sku: '.js-select-sku-item',
            value: '#js-new_sku_item',
            addBtn: '#js-variations-add',
            template: {
                head : '#tmpl-select-variation-head',
                sku : '#tmpl-select-variation',
                footer : '#tmpl-select-variation-footer'
            }
        };

        var params= {
            skuAttr : {},
            sku : {},
            detailsCurrent : [],
            skuRender : []
        };

        var value = null;

        function getSelectSku() {
            var foo = [];
            $(obj.sku+'.active').each(function (i, e) {
                foo.push($(this).data('key'));
            });

            if($(obj.row).length !== foo.length)
                return [];

            return foo;
        }

        function renderSku() {

            var foo = [];
            $(obj.sku+'.active').each(function (i, e) {
                foo.push($(this).data('key'));
            });

            var l = foo.length;

            $(obj.sku ).addClass( 'disabled' );

            $.each( params.skuAttr, function ( skuAttrName ) {

                var sku = skuAttrName.split( ';' );
                var count = 0;
                for ( var k in foo ) {
                    if ( foo[ k ] == sku[ k ] ) {
                        count++;
                    }
                }

                if ( count >= l - 1 ) {
                    $.each(sku, function (i) {
                        $(obj.sku + '[data-key="' + sku[i] + '"]').removeClass('disabled');
                    });
                }

            });

            $(obj.sku+'.active.disabled' ).removeClass('active');
        }

        function setActiveDefault(  ) {
            for(var i in params.detailsCurrent){
                var skuAttr = params.detailsCurrent[i];
                var sku = skuAttr['prop_id'] + ':' + skuAttr['sku_id'];
                $(obj.sku + '[data-key="' + sku + '"]', 'body').addClass('active');
            }
        }

        function setParams(response) {

            var tmpl = $(obj.template.sku).html();

            var head = $(obj.template.head).text();
            var footer = $(obj.template.footer).text();
            var body = window.ADS.objTotmpl( tmpl, response);

            window.adsModal.show(head, body, footer, 'md');

            params.skuAttr = response.skuAttr;
            params.sku = response.sku;
            params.detailsCurrent = response.detailsCurrent;
            params.skuRender = response.skuRender;

            setActiveDefault();
            renderSku();
        }

        return {
            request: window.ADS.request('OrderSku'),
            init: function () {
                if ($this) return;
                $this = this;

                $('body').on('click', obj.sku+':not(.disabled)', function () {
                    $(this).closest(obj.row).find(obj.sku).removeClass('active');
                    $(this).addClass('active');
                    renderSku();
                });

                $('body').on('click', '#btn-csv', function (e) {
                    e.preventDefault();

                    var date_from = $('#date-from').val(),
                        date_to = $('#date-to').val(),
                        status = $('#status').val(),
                        fulfillment = $('#fulfillment').val(),
                        link = $(this).attr('href');

                    date_from   = date_from ? Date.parse(date_from) : '';
                    date_from     = date_from ? '&date-from=' + moment(date_from).format('YYYY-MM-DD') : '';

                    date_to     = date_to ? Date.parse(date_to) : '';
                    date_to   = date_to ? '&date-to=' + moment(date_to).format('YYYY-MM-DD') : '';

                    window.location.replace(link + '&status='+status+'&fulfillment='+fulfillment+ date_to + date_from);
                });

                $('body').on('click', '#js-variation_save', function () {
                    var value = getSelectSku();
                    $this.request('save', { post_id : params.post_id, trans_id: params.trans_id, item_id : params.item_id, value : value}, function (response) {

                        if (response) {
                            if (response.hasOwnProperty('error')) {
                                window.ADS.notify(response.error, 'danger');
                            } else {
                                window.ADS.notify(response.message, 'success');
                                Orders.orderDetails();
                            }
                        }

                        params = {
                            skuAttr : {},
                            sku : {},
                            detailsCurrent : [],
                            skuRender : []
                        };

                        window.adsModal.hide();

                    });

                });

                $('body').on('click', '.js-edit-details', function () {
                    var $row = $(this).closest('.table-item');

                    params.item_id = $row.data('item_id');
                    params.trans_id = $row.data('trans_id');
                    params.post_id = $row.data('post_id');

                    $this.request('params', { post_id : params.post_id, trans_id: params.trans_id, item_id : params.item_id}, function (response) {
                        if(response.error){
                            window.ADS.notify(response.error, 'danger');
                            return;
                        }
                         setParams(response);
                    });

                });

            }
        }
    })().init();


});


