import {getSku} from './single_product/common';
import {pageSingleProduct} from './single_product/pageSingleProduct.js';

$('body').on('infoCurrency:done', function (  ) {
	pageSingleProduct.init();
});

/**
 * Add product to cart
 */
$( '.js-addToCart' ).on( 'click', function ( e ) {
	e.preventDefault();
	addOrder();

} );

function addOrder() {

	var options = {
		item     : '[data-singleProductInput="quantity"]',
		post_id  : '[name="post_id"]',
		shipping : '[name="shipping"]'
	};

	var $sku = getSku();

	if ( $sku === false ) return false;
	window.adsCart.add( {
		post_id   : $( options.post_id ).val(),
		quantity  : $( options.item ).val(),
		shipping  : $( options.shipping ).val(),
		variation : $sku.foo
	} );

}

/**
 * Buy Now
 */
$( '#buyNow' ).on( 'click', function ( e ) {

    const error = getSku();

    if ( error === false )
        e.preventDefault();
} );

/**
 * quantity item btn
 */
jQuery( function ( $ ) {
    var options = {
        el     : '.js-select_quantity',
        add    : '.js-quantity_add',
        remove : '.js-quantity_remove',
        input  : 'input'
    };

    var $body = $( 'body' );
    $body.on( 'click', options.add, function ( e ) {
        e.preventDefault();
        set( 1, this )
    } );

    $body.on( 'click', options.remove, function ( e ) {
        e.preventDefault();
        set( -1, this )
    } );

    function set( change, $this ) {
        var $input = $( $this ).closest( options.el ).find( options.input );
        var v      = $input.val();
        v          = (v = parseInt( v ) + change) > 0 ? v : 1;
        $input.val( v )
            .trigger( 'mouseup' );

    }
} );

if(!$('#cart-sidebar').length){
    $('.view_cart').hide();
}

$('body').on( 'cart:change cart:update cart:add', function ( e ) {
    if(!$('#cart-sidebar').length){
        $('.view_cart').hide();
        return;
    }
    if(e.cart.quantity > 0){
        $('.view_cart').show();
        return;
    }
    $('.view_cart').hide();
} );

$('.view_cart').on('click', function () {
    $('html').addClass('cart-pull-page')
});

