<?php

$i = 0;

if( have_posts() ) : while ( have_posts() ) : the_post();

	do_action( 'adstm_iterator_loop_product' );
	
	$i++;
	
	if( $i == 1 || $i == 5 ) {

		$img_size = 'ads-big';

		echo '<div class="col-xl-3 col-lg-4 col-md-6"><div class="item-sp item-lg">';

			do_action('adstm_product_item', $img_size);

		echo '</div></div>';
	} else {
		
		$img_size = 'ads-medium';

		if( $i == 2 || $i == 6 ) {

			$class = ( $i == 6 ) ? 'three-item-last' : '';

			echo '<div class="three-item ' . $class . ' col-xl-3 col-lg-4 col-md-6 col-sm-4">';
		}

		echo '<div class="item-sp item-sm">';

			do_action('adstm_product_item', $img_size);

		echo '</div>';

		if( $i == 4 || $i == 8 ) {
			echo '</div>';
		}
	}

endwhile; endif;

if( ! in_array( $i, [ 0, 1, 4, 5, 8 ] ) ) echo '</div>';

do_action( 'adstm_end_loop_product' );