export const CartHeader = (function () {

	var $this, $body = $( 'body' );
	return {
		$cart_info       : '',
		init             : function () {
			$this                 = this;
			$this.$cart_info      = $( '[data-cart="quantity"]' );
			$this.$pluralize_text = $( '[data-cart="pluralize_items"]' );

			$body.on( 'cart:update cart:change', function ( e ) {
				$this.render( e.cart );
			} );

			$body.on( 'cart:add', function ( e ) {
				$this.render( e.cart );
			} );

			$(document).on('click', 'header .cart', function () {
                $('html').addClass('cart-pull-page');
            });
		},
		render           : function ( obj ) {
			$this.updateTotalItems( obj );
		},
		updateTotalItems : function ( obj ) {
			if(obj.quantity){
                $this.$cart_info.show();
			}else{
                $this.$cart_info.hide();
			}

            $this.$cart_info.text( obj.quantity );
			$this.$pluralize_text.text( obj.pluralize_text );
		}
	};

})();