import {getSku} from './common';
import {pageSingleProduct} from './pageSingleProduct';

export const  changePriceSku = (function () {
			var $this, skuAttr, sku, currency;

			function setFirstSku() {
				if ( typeof skuAttr == 'undefined' ) {
					return null
				}

				selectSku(Object.keys( skuAttr )[ 0 ]);
			}

			function setMinPriceSku() {
				if ( typeof skuAttr == 'undefined' ) {
					return null
				}
				var name='', min;
				$.each(skuAttr, function ( i, e ) {
					if(!min || (min > parseFloat(e._salePrice) && e.quantity > 0)  ){
						min = e._salePrice;
						name = i;
					}
				});

				selectSku( name );

			}

			function setOneSku() {
				if ( typeof skuAttr == 'undefined' ) {
					return null
				}

                $('.js-item-sku').each(function() {
                    if($('.js-sku-set', this).length == 1){
                        $('.js-sku-set', this).click();
					}
				});
			}

			function selectSku( name ) {

				var names = name.split( ';' ),
					key;

				for ( key in names ) {
					var sku = $( 'input[value="' + names[ key ] + '"]' ).closest( '.js-sku-set' );
					setSkuParamsActive( sku );
				}

				render();
				changeSku();
			}

			function renderSkuActive() {
				var value = getSku( false );

				if ( !value )return false;
				var foo = value.foo;

				$( '.js-sku-set' ).addClass( 'disabled' ).removeClass( 'active' );

				$.each( skuAttr, function ( skuAttrName, e ) {
					var sku = skuAttrName.split( ';' );

					var count = 0, l = foo.length;

					for ( var k in foo ) {
						if ( foo[ k ] == sku[ k ] ) {
							count++;
						}

						$( 'input[value="' + foo[ k ] + '"]' ).closest( '.js-sku-set' ).addClass( 'active' );
					}

					if ( count >= l - 1 ) {
						$.each( sku, function ( i ) {
							$( 'input[value="' + sku[ i ] + '"]').closest( '.js-sku-set' ).removeClass( 'disabled' );
						} );
					}

				} );

			}

			function renderValidSku() {
				var value = getSku( false );
				if ( !value ){
					$( '.js-sku-set' ).removeClass( 'disabled' ).removeClass( 'active' );
				}

				var foo = value.foo;

				for ( var k in foo ) {
					if ( !foo[ k ] ){
						return;
					}
				}

				if(typeof skuAttr[foo.join(';')] === "undefined"){
					$( '.js-sku-set' ).removeClass( 'disabled' ).removeClass( 'active' );
				}
			}

    		function renderEmptySetSku() {
				var emptyCount =  $( '[name="sku-meta-set[]"][value=""]').length;
				var countRowSku =  $('[name="sku-meta-set[]"]').length;
				if(emptyCount && countRowSku > 1){
					$('.js-item-sku').each(function (index) {

						$(this).find('.js-sku-set').removeClass( 'disabled' );

						if(!$(this).find('[name="sku-meta-set[]"]').val()){
							$(this).find('[name="sku-meta"]').each(function () {
								var val = $(this).val();
								var value = getSku( false );
								var foo 	= value.foo;

								if(foo.join('')){
									foo[index] = val;
									var nSku = foo.join(';');

									if( typeof skuAttr[nSku] == 'undefined' ){
										$(this).closest('.js-sku-set').addClass( 'disabled' );
									}
								}

							});
						}
					});

					var l = $('.js-item-sku').length;
					var c = $('[name="sku-meta-set[]"][value=""]').length;

					if(c !==1 && c <= l-1){
						$('.js-item-sku').find('[name="sku-meta-set[]"]').each(function () {
							if(!$(this).val()){
								$(this).closest('.js-item-sku').find('.js-sku-set').removeClass( 'disabled' ).addClass( 'test' );
							}
						});
					}

				}
				$( '.js-sku-set.disabled.active' ).removeClass( 'active' ).closest('.js-item-sku').find('[name="sku-meta-set[]"]').val('');
    		}

			function changeSku() {

				var value = getSku( false ),
					skuAttrName;

				if ( !value )return false;

				var foo     = value.foo;
				console.log(foo); 
				skuAttrName = foo.join( ';' );

				if ( typeof skuAttr[ skuAttrName ] == 'undefined' ) {
					console.log( 'no sku' );
					return;
				}

				$( 'body' ).trigger( {
					type        : "changeSku",
					foo         : foo,
					item        : skuAttr[ skuAttrName ],
					skuAttrName : skuAttrName
				} );

			}

			function setSkuParamsActive( skuSet ) {

				var pid       = $( skuSet ).data( 'set' ),
					variation = $( skuSet ).data( 'meta' ),
					skuval    = $( '#check-' + pid + '-' + variation ).val();

				$( '#js-set-' + pid ).val( skuval );

			}

			function setSkuParamsToggle( skuSet ) {

				var pid       = $( skuSet ).data( 'set' ),
					variation = $( skuSet ).data( 'meta' ),
					skuval    = $( '#check-' + pid + '-' + variation ).val(),
					skuvalOld = $( '#js-set-' + pid ).val();

					if(skuval == skuvalOld){
						$( '#js-set-' + pid ).val( '' );
					}else{
						$( '#js-set-' + pid ).val( skuval );
					}
			}

            function setSkuParams( skuSet ) {

                if($(skuSet).hasClass('disabled')){
                    $('.js-item-sku').find('[name="sku-meta-set[]"]').val( '' );
                }

                var pid       = $( skuSet ).data( 'set' ),
                    variation = $( skuSet ).data( 'meta' ),
                    skuval    = $( '#check-' + pid + '-' + variation ).val();

                    $( '#js-set-' + pid ).val( skuval );
            }

			function setSkuPrice( e ) {
				var item = e.item;
				var data = {
					price         : item.price,
					_price        : item._price,
					_price_nc     : item._price_nc,
					salePrice     : item.salePrice,
					_salePrice    : item._salePrice,
					_salePrice_nc : item._salePrice_nc,
					stock         : item.quantity,
					savePercent   : item.discount,
					_save         : item._price - item._salePrice,
					_save_nc      : item._price_nc - item._salePrice_nc,
					save          : item.save,
				};

				if ( data._save < 0 ) {
					data._save = 0
				}

				pageSingleProduct.setStage( data );
				pageSingleProduct.setPrice();

			}

			function render(  ) {
				renderSkuActive();
				renderEmptySetSku();
                renderValidSku();
			}

			function setUnselectedSkuViewAndValues() {

				$('[name="sku-meta-set[]"]').val('');
				$('.js-sku-set').removeClass('active').removeClass('disabled');

			}

			return {
				init : function () {
					if($this){
						return;
					}
					$this    = this;
					skuAttr  = window.skuAttr;
					sku      = window.sku;
					currency = $( '[name="currency"]' ).val();
					$( 'body' )
						.on( 'click', '.js-sku-set', function () {
                            setSkuParams( this );
							render();
							changeSku();
						} )
						.on( 'changeSku', setSkuPrice );

					//setFirstSku();
					setMinPriceSku();

                    if(!$( 'body' ).hasClass( 'js-show-pre-selected-variation')){
                        setUnselectedSkuViewAndValues();
                    }

                    $( '.js-empty-sku-view' ).removeClass( 'js-empty-sku-view' );

                    setOneSku();

					$('.js-product-sku').show();

                    var height2line = 96;
                    $('.sku-row .value').each(function () {
                        if($(this).height() > height2line){
							$(this)
								.closest('.sku-row').addClass('line-sku')
								.find('.js-all-sku').show();
						}
                    });

                    $('.js-all-sku').on('click', function () {
						$(this).closest('.sku-row').toggleClass('line-sku');
                    });


				}
			}
		})();
