/**
 * Created by pavel on 17.05.2016.
 */

(function($) {

    'use strict';

    window.adsCart = (function() {
        var $this;
        var cart_box  = false;
        var status    = false;
        var $time     = null;
        var params      = {
            cart : {}
        };

        var cb_update = function (data) {
            var obj = ADS.tryJSON(data);
            if (obj) {
                status = true;

                params.cart = obj;

                window.ADS.Dispatcher.trigger('cart:update', {
                    cart : obj
                });

                $('body').trigger({
                    type : "cart:update",
                    cart : obj
                });
            }
        };

        var cb_change = function (data, order_id) {
            var obj = ADS.tryJSON(data);
            if (obj) {

                params.cart = obj;

				window.ADS.Dispatcher.trigger('cart:change', {
				    cart : obj,
                    order_id : order_id
				});

                $('body').trigger({
                    type     : "cart:change",
                    cart     : obj,
                    order_id : order_id
                });
            }
        };

        var add_order = function (data, order) {
            var obj = ADS.tryJSON(data);

			if (obj) {
                params.cart = obj;

				window.ADS.Dispatcher.trigger('cart:add', {
					cart  : obj,
					order : order,
					info  : {order_id : obj.info.change_order},
					obj   : obj.info
				});

                $('body').trigger( {
                    type  : "cart:add",
                    cart  : obj,
                    order : order,
                    info  : {order_id : obj.info.change_order},
                    obj   : obj.info
                });
            }
        };

        var objTotmpl = function ( tmpl, data ) {
            if ( typeof Handlebars === 'undefined' ) {
                return false
            }
            var template = Handlebars.compile( tmpl );
            return template( data );
        };

        var openCart = function(){
            $('html').addClass('cart-pull-page');
        };

        var init_cart_box = function() {

            if(cart_box){
                return;
            }

            cart_box = true;

            $('#modalCart').remove();

            var over = '#cart-sidebar-overlay',
                close = 'a.cart-close-btn';

            $(document).on('click', '.js-cart-info, .cart a:not(.login-button)',function(e){
                e.preventDefault();
                if($('#cart-sidebar').is('.no-cart-side')){
                    if($('#cart-sidebar').is('.enable-cart-page')){
                        document.location.href = '/shopping-cart';
                    }else{
                        document.location.href = '/cart';
                    }
                }else{
                    openCart();
                }

            });

            if($('#cart-sidebar').is('.no-cart-side')){
                $(document).on('click', '.view_cart', function (e) {
                    document.location.href = '/shopping-cart';
                });

                $( '[data-singleProduct="addCart"], .js-addToCart' ).on( 'click', function ( e ) {
                    $('#cart-message').html('"'+$('h1').html()+'" '+$('#cart-message').attr('data-success'));
                    $('#cart-message').fadeIn(500);
                    setTimeout(function(){$('#cart-message').fadeOut(500);},5000)
                });
            }

            $(document).on('click', close+','+over, function (e) {
                e.preventDefault();
                $('html').removeClass('cart-pull-page');
            });

            $(document).on('click', 'a.cart-item-remove', function(){
                var th = $(this).closest('.cart-item-flex');
                th.addClass('cart-loader');
                $this.remove( th.attr('data-order_id') );
            });



            $(document).on('click', '.cart-numb-plus', function(){
                var th = $(this).parent('.cart-quantity').find('[name="cart-quantity"]');
                var    q = parseInt( th.val() );

                q = q + 1;
                th.val( q ).trigger('change');

            });

            $(document).on('click', '.cart-numb-minus', function(){
                var th = $(this).parent('.cart-quantity').find('[name="cart-quantity"]'),
                    q = parseInt( th.val() );

                q = q - 1;
                if( q <= 0 )
                    q = 1;

                th.val( q ).trigger('change');
            });

            $(document).on('change', '.cart-quantity [name="cart-quantity"]', function(){

                var v = $(this);
                var th = $(this).closest('.cart-item-flex');

                clearTimeout( $time );

                $time = setTimeout(function(){
                    $this.newQuantity( th.attr('data-order_id'), v.val() );
                }, 300);
            });
        };

        var renderCart = function( cart ) {

            var $tmpl = $('#cart-template').html(),
                $bar  = $('#cart-sidebar'),
                $page_tmpl = $('#page-cart-template').html(),
                $page_cart = $('.sc_cont');

            cart.items = cart.items.reverse();

            $( $bar ).find( '.cart-body' ).html( objTotmpl( $tmpl, cart ) );
            var price = cart.hasOwnProperty('cur_salePriceNotShipping') ? cart.cur_salePriceNotShipping : cart.cur_salePrice;
            $( $bar ).find( '.cart-footer .item-price' ).text( price );
            if($page_tmpl){
                $( $page_cart ).find( '.item-price' ).text( price );
                $( $page_cart ).find( '.sc_items' ).html( objTotmpl( $page_tmpl, cart ) );
            }
        };

        function _cart_box() {

            var $body = $('body');

            $body.on('cart:update', function (e) {
                if(!jQuery('#cart-sidebar').length) {
                    return;
                }
                init_cart_box();
                renderCart(e.cart);
            });

            $body.on('cart:add', function (e) {
                if(!jQuery('#cart-sidebar').length) {
                    return;
                }
                init_cart_box();
                renderCart(e.cart);

                if(!$('#cart-sidebar').is('.no-cart-side')){
                    openCart();
                }

            });

            $body.on('cart:change', function (e) {
                if(!jQuery('#cart-sidebar').length) {
                    return;
                }
                init_cart_box();
                renderCart(e.cart);
            });

            if(jQuery('#cart-sidebar').length) {
                init_cart_box();
            }
        }

        return {
            init : function (el) {
                $this           = this;
                $this.$discount = '[name="discount"]';

                var $body = $('body');

				window.ADS.Dispatcher.trigger('cart:init');

                $body.trigger({
                    type     : "cart:init"
                });

                $this.load();

                _cart_box();

                var popover = '[data-toggle="popover"]';

                if( $( popover ).length )
                    $( popover ).popover();

                $(window).on('click touchstart', function (e) {
                    $(popover).each(function () {
                        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                            $(this).popover('hide');
                        }
                    });
                });

            },
            cartGetStatus : function() {
                return status;
            },
            newQuantity    : function (order_id, quantity) {
                $.ajax({
                    url     : alidAjax.ajaxurl,
                    type    : "POST",
                    async   : true,
                    data    : {
                        discount    : adsCart.getDiscount(),
                        action      : "ads_actions_basket",
                        ads_actions : "set_quantity",
                        order_id    : order_id,
                        quantity    : quantity
                    },
                    success : function (data) {
                        cb_change(data, order_id);
                    }
                });
            },
            newShipping    : function (order_id, shipping) {
                $.ajax({
                    url     : alidAjax.ajaxurl,
                    type    : "POST",
                    async   : true,
                    data    : {
                        discount    : adsCart.getDiscount(),
                        action      : "ads_actions_basket",
                        ads_actions : "set_shipping",
                        order_id    : order_id,
                        shipping    : shipping
                    },
                    success : function (data) {
                        cb_change(data, order_id);

                        var obj = ADS.tryJSON( data );
                        if (obj) {
							window.ADS.Dispatcher.trigger('cart:shipping',
                                {
									cart : obj,
									info : {
										order_id : obj.info.change_order
									}
                                }
                            );

                            $('body').trigger( {
                                type : "cart:shipping",
                                cart : obj,
                                info : {
                                    order_id : obj.info.change_order
                                }
                            });
                        }
                    }
                });
            },
            newShippingForOrdersGroup    : function ( ordersObj ) {

              var orders_ids = [];
              var shipping = '';

              for( var key in ordersObj ) {
                if( !ordersObj.hasOwnProperty(key) ) continue;
                orders_ids.push( key );
                shipping = ordersObj[key];
              }

              $.ajax({
                url: alidAjax.ajaxurl,
                type: "POST",
                async: true,
                data: {
                  discount: adsCart.getDiscount(),
                  action: "ads_actions_basket",
                  ads_actions: "set_shipping_to_orders_group",
                  orders_ids: orders_ids,
                  shipping: shipping
                },
                success: function (data) {
                  cb_change(data, orders_ids[orders_ids.length - 1]);

                  var obj = ADS.tryJSON(data);
                  if (obj) {
                    window.ADS.Dispatcher.trigger('cart:shipping',
                      {
                        cart: obj,
                        info: {
                          order_id: obj.info.change_order
                        }
                      }
                    );

                    $('body').trigger({
                      type: "cart:shipping",
                      cart: obj,
                      info: {
                        order_id: obj.info.change_order
                      }
                    });
                  }
                }
              });

            },
            add            : function (order) {
                var data = $.extend({
                    id        : '',
                    quantity  : 1,
                    variation : '',
                    title     : ''
                }, order);

                data.action      = "ads_actions_basket";
                data.ads_actions = "add";
                data.discount    = adsCart.getDiscount();
                $.ajax({
                    url     : alidAjax.ajaxurl,
                    type    : "POST",
                    async   : true,
                    data    : data,
                    success : function (data) {
                        add_order(data, order);
                    }
                });
            },
            remove         : function (order_id) {
                $.ajax({
                    url     : alidAjax.ajaxurl,
                    type    : "POST",
                    async   : true,
                    data    : {
                        discount    : adsCart.getDiscount(),
                        action      : "ads_actions_basket",
                        ads_actions : "remove",
                        order_id    : order_id
                    },
                    success : function(data){

                        var obj = ADS.tryJSON(data);
                        if (obj) {
                            window.ADS.Dispatcher.trigger('cart:remove', {
                                cart : params.cart,
                                order_id : order_id
                            });
                            $('.sc_cont .cart-item-flex[data-order_id="'+order_id+'"]').replaceWith('');

                        }

                        cb_update(data);

                    }
                });
            },
            load           : function () {
                $.ajax({
                    url     : alidAjax.ajaxurl,
                    type    : "POST",
                    async   : true,
                    data    : {
                        discount    : adsCart.getDiscount(),
                        action      : "ads_actions_basket",
                        ads_actions : "get_orders"
                    },
                    success : cb_update
                });
            },
            convPrice      : function ( v, callback ) {
                $.ajax({
                    url     : alidAjax.ajaxurl,
                    type    : "POST",
                    async   : true,
                    data    : {
                        action   : "ads_conv_price",
                        price    : v[ 0 ],
                        currency : v[ 1 ]
                    },
                    success : callback
                });
            },
            convPriceTotal : function (v, callback) {
                $.ajax({
                    url     : alidAjax.ajaxurl,
                    type    : "POST",
                    async   : true,
                    data    : {
                        action            : "ads_conv_price_total",
                        price             : v.price,
                        currency          : v.currency,
                        price_shipping    : v.price_shipping,
                        currency_shipping : v.currency_shipping,
                        quantity          : v.quantity
                    },
                    success : callback
                });
            },
            getDiscount    : function () {
                var $discount = $( $this.$discount );
                if ($discount.length) {
                    return $discount.val();
                }
                return '';
            },
            cart: function () {
                return params.cart;
            },
            setOrders: function (orders, discount) {
                $.ajax({
                    url     : alidAjax.ajaxurl,
                    type    : "POST",
                    async   : true,
                    data    : {
                        discount    : discount,
                        orders      : orders,
                        action      : "ads_actions_basket",
                        ads_actions : "set_orders"
                    },
                    success : cb_update
                });
            },
            setShipping: function (shipping, discount) {
            $.ajax({
                url     : alidAjax.ajaxurl,
                type    : "POST",
                async   : true,
                data    : {
                    discount    : discount,
                    shipping      : shipping,
                    action      : "ads_actions_basket",
                    ads_actions : "set_shipping_cart"
                },
                success : cb_update
            });
        }
        };
    })();

    var tt = setInterval(function(){
        if( typeof alidAjax != 'undefined' ){
            clearInterval(tt);
            window.adsCart.init();
        }
    }, 300);

})(jQuery);
