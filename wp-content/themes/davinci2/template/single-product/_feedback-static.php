<?php

$reviews = adsTmpl::review();
$stars   = $reviews->getStat();

?>

<div class="reviewscont">
	<div class="review_stats">
  
		<div class="rsL">

            <div class="goldstars">
                <div class="stars">
                    <?php $reviews->renderStarRating( $reviews->averageStar() ); ?>
                </div>
            </div>

            <div class="reviewcount">
                 <?php printf( '%s %s', $reviews->countFeedback(), __( 'reviews', 'dav2' ) ) ?>
            </div>

            <div class="reviewpercent">
                <span><?php echo $stars[ 'positive' ] ?>%</span> <?php _e( 'of buyers enjoyed this product!', 'dav2' ) ?>
            </div>

		</div>

		<div class="rsR">
			<?php
			
			$stars[ 'stars' ] = array_reverse( $stars[ 'stars' ], true );

			foreach( $stars[ 'stars' ] as $key => $value ) : ?>

				<div class="rs_rev_one">
     
					<div class="rs_desc">
                        <?php echo $key ?> <?php echo $key == 1 ? __( 'star', 'dav2' ) : __( 'stars', 'dav2' ) ?>
                    </div>
					
                    <div class="rs_perc percent">
                        <span style="width:<?php echo $value[ 'percent' ] ?>%"></span>
                    </div>
                    
					<div class="rs_count">(<?php echo $value[ 'count' ] ?>)</div>
     
				</div>
            
            <?php endforeach; ?>
            
		</div>
	</div>
</div>