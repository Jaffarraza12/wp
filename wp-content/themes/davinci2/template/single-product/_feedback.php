<?php

$reviews = adsTmpl::review();

if( $reviews->countFeedback() > 0 ) :
    
    get_template_part( 'template/single-product/_feedback-static' );
	
    comments_template( '/template/single-product/_review.php' );

else :

	echo '<p class="text-center noreviews">' . __( 'There are no reviews yet', 'dav2' ) . '</p>';

endif;

