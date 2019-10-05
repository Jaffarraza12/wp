<?php

if( ! function_exists( 'ads_getImages' ) ) {

	function ads_getImages( $img, $size = 'full' ) {

		if ( $img && function_exists( 'ads_is_url' ) && ads_is_url( $img ) ) {
			return $img;
		} elseif ( $img && is_numeric( $img ) ) {
			return function_exists( 'ads_get_image_by_id' ) ? ads_get_image_by_id( $img , $size ) : false;
		}
		
		return false;
	}
}
/**
 * Show SKU parameters from product
 *
 * @param $sku
 */
function adstm_single_sku( $sku, $skuAttr ) {

	if( ! $sku || !$skuAttr ) {
		return;
	}
	
	$foo = [];
	foreach( $sku as $key => $value ) {
		$foo[ $value[ 'prop_id' ] ][ 'title' ]          = $value[ 'prop_title' ];
		$foo[ $value[ 'prop_id' ] ][ 'params' ][ $key ] = $value;
	}

	echo '<script type="text/javascript">
			window.skuAttr = ' . json_encode( $skuAttr ) . ';
			window.sku = ' . json_encode( $sku ) . ';
		</script>';

	$skuBox = '';

	foreach( $foo as $i => $v ) {

		if( ! empty( $v[ 'params' ] ) ) {

			$items = '';
			$value = '';
			$type  = 'text';
			$p     = 0;
			
			foreach( $v[ 'params' ] as $keySku => $val ) {
				
				$p ++;
				
				if( ! empty( $val ) ) {

					$class = '';
					if ( $p == 1 ) {
						$class = 'active';
					}

					$title   = isset( $val[ 'title' ] ) ? trim( $val[ 'title' ] ) : '';
					$img     = ads_getImages( $val[ 'img' ] );
					$img     = ( $img != '' && ads_is_url( $img ) ) ? $img : '';
					$img_big = isset( $val[ 'img_big' ] ) && $val[ 'img_big' ] != '' ? ads_getImages( $val[ 'img_big' ] ): false;
					$img_big = $img_big && ads_is_url( $val[ 'img_big' ] ) ? $img_big : $img;

					if ( $img != '' ) {
						$type   = 'img';
						$items .= sprintf(
							'<span class="js-sku-set meta-item meta-item-img %7$s" data-set="%4$d" data-meta="%5$d" data-title="%3$s">
                                     <img src="%1$s" data-img="%2$s" class="img-responsive" title="%3$s">
                                    <input type="hidden" name="sku-meta" value="%6$s" id="check-%4$d-%5$d">
                                </span>',
							$img, $img_big, $title, $i, $p, $keySku, $class
						);
					} else {
						$items .= sprintf(
							'<span class="js-sku-set meta-item meta-item-text %5$s" data-set="%2$d" data-meta="%3$d" data-title="%1$s">%1$s
                            <input type="hidden" name="sku-meta" value="%4$s" id="check-%2$d-%3$d">
                            </span>',
							$title,
							$i,
							$p,
							$keySku,
							$class
						);
					}

					if ( $p == 1 ) {
						$value = $keySku;
					}
				}
			}

			if ( $items != '' ) {
				$skuBox .= sprintf(
					'<div class="js-item-sku sku-row sku-%6$s">
                        <div class="name">%1$s:</div><div class="value">%2$s<div class="sku-warning" style="display:none">%4$s: %1$s</div></div>
                        <input type="hidden" id="js-set-%3$d" name="sku-meta-set[]" value="%5$s">
                    </div>',
					$v[ 'title' ],
					$items,
					$i,
					__( 'Please select', 'dav2' ),
					$value,
					$type
				);
			}
		}
	}

	printf('<div class="js-product-sku product-sku js-empty-sku-view" style="display: none">%1$s</div>', $skuBox);
}
add_action( 'adstm_single_sku', 'adstm_single_sku', 10, 2 );