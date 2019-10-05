jQuery( function ( $ ) {
window.currencyPrice = (function(){

	function renderPriceListProduct( products ) {
		$.each(products, function ( i, e ) {
			var productItem = $('input[name="post_id"][value="'+e.post_id+'"]').closest('.product-item');
			productItem.find('.js-price').html( e.price );
			productItem.find('.js-salePrice').html( e.salePrice );
		});
	}

	function formatItem( item ) {

		item.price = window.formatPrice.convertPriceOut(item.price, item.priceCurrency );
		item.salePrice = window.formatPrice.convertPriceOut(item.salePrice, item.priceCurrency);

		return item;
	}

	function listProduct() {
		var products  = [];
		var $products = $( '.product-item' );

		if ( !$products ) {
			return;
		}

		$products.each( function () {
			var item = {
				post_id       : $( this ).find('input[name="post_id"]').val(),
				priceCurrency : $( this ).find('input[name="currency"]').val(),
				price         : $( this ).find('input[name="_price_nc"]').val(),
				salePrice     : $( this ).find('input[name="_salePrice_nc"]').val()
			};
			products.push( formatItem( item ) );
		} );

		renderPriceListProduct( products );
	}

	return {
		init: function ( ) {

			$('body').on('infoCurrency:done', function ( data ) {
				$('[ajax_update="currency"]').html(data.info.html);
			});

			$('body').on('infoCurrency:done', function ( data ) {
					listProduct();
			});

			$('body').on('updateListPrice:init', function ( data ) {
				listProduct();
			});

		}
	}
})();
    window.currencyPrice.init();
});

