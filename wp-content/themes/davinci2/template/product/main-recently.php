<?php
/**
 * Author: Vitaly Kukin
 * Date: 03.07.2015
 * Time: 10:28
 */

global $img_size;

$viewed = ads_recently_viewed_ids();

if( count( $viewed ) > 0 ) : ?>

    <!-- RECENTLY VIEWED ITEMS -->
	<div class="aship-box-products recents swiper-container">
  
		<h2 class="aship-title"><?php _e( 'Recently viewed', 'dav2' ); ?></h2>
		
        <div class="items-small swiper-wrapper blackdots">
            <?php
            
            query_posts( [
	            'post_type'      => 'product',
	            'posts_per_page' => 4,
	            'post__in'       => ads_shuffle_assoc( $viewed ),
	            '_orderby'       => 'post_id',
	            '_order'         => 'array',
	            'post_status'    => [ 'publish' ]
            ] );
            
            if( have_posts() ) : while ( have_posts() ) : the_post();
				
                echo '<div class="item-sp item-sm">';
                
					do_action( 'adstm_product_item', 'ads-big',true );
					
				echo '</div>';
				
            endwhile; endif;
            
            wp_reset_query();

            ?>
        </div>
        <div class="swiper-pagination"></div>
    </div>

<?php endif; ?>