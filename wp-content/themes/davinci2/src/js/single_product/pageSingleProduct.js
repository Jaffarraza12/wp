import {$form} from './common';
import {changePriceSku} from './changePriceSku.js';

export const pageSingleProduct = (function () {
	var $this;
	var $body         = $( 'body' );
	var _timeout      = null;
	var _timeoutStage = null;

	var obj = {
		outValue : {
			price       : '[data-singleProduct="price"]',
			salePrice   : '[data-singleProduct="savePrice"]',
            stock       : '[data-singleProduct="stock"]',
			save        : '[data-singleProduct="save"]',
			savePercent : '[data-singleProduct="savePercent"]',
			totalPrice  : '[data-singleProduct="totalPrice"]',
		},

		box : {
			price       : '[data-singleProductBox="price"]',
			salePrice   : '[data-singleProductBox="salePrice"]',
			savePercent : '[data-singleProductBox="savePercent"]',
            stock       : '[data-singleProductBox="stock"]',
			save    	: '[data-singleProductBox="savePercent"]',
			totalPrice  : '[data-singleProductBox="totalPrice"]'
		}
	};

	var stage = {
		isTotalPrice: false,

		price     : $form.find( '[name="price"]' ).val(),
		save      : $form.find('[name="save"]' ).val(),
		salePrice : $form.find('[name="salePrice"]' ).val(),
		savePercent  :  $form.find('[name="savePercent"]' ).val(),
        stock     : $form.find('[name="stock"]' ).val(),

		_price        : $form.find('[name="_price"]' ).val(),
		_price_nc     : $form.find('[name="_price_nc"]' ).val(),
		_salePrice    : $form.find('[name="_salePrice"]' ).val(),
		_quantity     : $( '[data-singleProductInput="quantity"]' ).val(),
		_salePrice_nc :  $form.find('[name="_salePrice_nc"]' ).val(),
		_save         :  $form.find('[name="_save"]' ).val(),
		_save_nc      :  $form.find('[name="_save_nc"]' ).val(),

		currency          : $form.find('[name="currency"]' ).val(),
		currency_shipping : $form.find('[name="currency_shipping"]' ).val(),
		price_shipping    : $form.find('[data-singleproduct="shipping"] option:selected' ).data( 'price' ),
	};

	function getCurrency(  ) {
		stage.currency = $form.find('[name="currency"]' ).val();
		return stage.currency;
	}

	function getCurrencyShipping() {
		stage.currency_shipping = $form.find('[name="currency_shipping"]' ).val();
		return stage.currency_shipping;
	}

	function renderShipping(  ) {

		var shippingInput = $('input[data-singleproduct="single-shipping"]'),
			shippingSelect = $('select[data-singleproduct="single-shipping"]');

		if(shippingSelect.length){
			$(shippingSelect).find('option').each(function ( e, i ) {
				var _price_nc = $(this).attr('data-cost_nc');
				var _price = window.formatPrice.convertPriceOut( _price_nc , getCurrencyShipping(), false );

				var template = $(this).attr('data-template');
				template = template.replace(/{{\s*price\s*}}/, _price);
				$(this).text(template);
			});
			shippingSelect.selectpicker('refresh');

		}else if(shippingInput.length){
			var _price_nc = shippingInput.attr('data-cost_nc');
			if(_price_nc >0){
				var valueBoxShipping = $('[data-singleproduct="single-shipping_value"]');

				var _price = window.formatPrice.convertPriceOut( _price_nc , getCurrencyShipping(), false );
				var template = shippingInput.attr('data-template');
				template = template.replace(/{{\s*price\s*}}/, _price);

				valueBoxShipping.text(template);
			}

		}
	}

	function renderPrice() {

		$( obj.outValue.salePrice ).text( stage.salePrice );
		$( obj.outValue.totalPrice ).text( stage.totalPrice );
		$( obj.outValue.price ).text( stage.price );

		$( obj.outValue.save ).text( stage.save );
		$( obj.outValue.savePercent ).text( stage.savePercent + '%');

		$( obj.outValue.stock ).text( stage.stock );

		$( obj.box.salePrice ).show();

		if ( parseFloat( stage._price ) > 0 && stage._price != stage._salePrice ) {
			$( obj.box.price ).show();
		} else {
			$( obj.box.price ).hide();
		}

		if ( parseFloat( stage._price ) - parseFloat( stage._salePrice ) > 0 ) {
			$( obj.box.savePercent ).show();
		} else {
			$( obj.box.savePercent ).hide();
		}

		if(stage.stock > 0){
			$( obj.box.totalPrice ).show();
		}else{
			$( obj.box.totalPrice ).hide();
		}

		if ( parseInt(stage.stock) < parseInt(window.adstmCustomize.tp_single_stock_count) ) {
			$( obj.box.stock ).show();
		} else {
			$( obj.box.stock ).hide();
		}
	}

	function setInfoShipping(){
		var option = $('[data-singleproduct="single-shipping"]').find( 'option:selected' );
		$( '[data-singleproduct="shipping-info"]' ).html( option.data( 'info' ) );
	}

	return {
		init     : function () {
			$this = this;

			$body.on( 'keyup mouseup click', '[data-singleProductInput="quantity"]', function () {

					clearTimeout( _timeout );
					var _this = this;
					_timeout  = setTimeout( function () {
						var quantity = parseInt( $( _this ).val() );
						quantity     = quantity > 0 ? quantity : 1;
						$('[data-singleproductinput="quantity"]').val(quantity);
						$this.setStage( '_quantity', quantity );
						$this.setPrice();
					}, 400 );
				}
			);

			$( '[data-singleproduct="single-shipping"]' ).on( 'change', function () {
				setInfoShipping();
			} );
			setInfoShipping();

			$this.setPrice();

			changePriceSku.init();
		},
		setStage : function ( name, value, trigger ) {
			console.log( name );
			if ( typeof name === "object" ) {
				for ( var i in name ) {
					stage[ i ] = name[ i ];
				}
				trigger = value;
			} else {
				stage[ name ] = value;
			}

			if ( trigger !== true ) return;

			clearTimeout( _timeoutStage );
			_timeoutStage = setTimeout( function () {
				renderPrice();
				renderShipping();
			}, 100 );

		},
		setPrice : function () {

			stage._quantity = stage._quantity || 0;

			var val_quantity = 1;
			if(stage.isTotalPrice){
				val_quantity = stage._quantity;
			}

			var _price = window.formatPrice.convertPrice( stage._price_nc , getCurrency() );
			var price = window.formatPrice.outPrice( _price * val_quantity );

			var _salePrice = window.formatPrice.convertPrice( stage._salePrice_nc, getCurrency() );
			var salePrice = window.formatPrice.outPrice( _salePrice * val_quantity);

			var _save = stage._price - stage._salePrice;
			var save = window.formatPrice.outPrice(_save, getCurrency());

			var savePercent = _price > 0 && _salePrice > 0 ? Math.round( ( ( _price - _salePrice ) / _price ) * 100 ) : '';

			var totalPrice = window.formatPrice.outPrice( _salePrice * stage._quantity);


			$this.setStage( '_price', _price );
			$this.setStage( '_salePrice', _salePrice );
			$this.setStage( 'price', price );
			$this.setStage( 'salePrice', salePrice );
			$this.setStage( 'save', save );
			$this.setStage( 'totalPrice', totalPrice );
			$this.setStage( 'savePercent', savePercent, true );

		},
		isTotalPrice($value){
			$this.setStage( 'isTotalPrice', !!$value );

		}
	}
})();