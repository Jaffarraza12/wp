<?php

if( ! function_exists( 'list_review' ) ) {
 
	function list_review( $comment, $args, $depth ) {
	    
        $images  = maybe_unserialize( $comment->images );
        $size    = 'ads-medium';
        $gallery = \ads\adsPost::get_gallery( $images, $size );

        if ( ! $gallery )
            $gallery = [];
		?>
		
		<div class="revone" <?php comment_class( 'feedback-one' ); ?>
             id="li-comment-<?php comment_ID() ?>">
			<div class="revL">
    
				<div class="revreverse">
					<div class="revperson"><?php echo $comment->comment_author ?></div>
					<?php if( $comment->flag && cz('tp_comment_flag') )
						echo '<img class="flag" src=" ' . pachFlag( $comment->flag ) . '?1000"/>';
					?>
				</div>
                
                <?php if( cz( 'tp_verifed' ) ) : ?>
                    <div class="revcheck">
                        <i class="fas fa-check-square"></i> <span><?php _e( 'verifed buyer', 'dav2' ); ?></span>
                    </div>
                <?php endif; ?>
			</div>
			<div class="revR">
				<div class="revdate">
                    <?php if($comment->star > 0){ ?>
                        <div class="goldstars">
                            <div class="stars">
                                <?php adsFeedBackTM::renderStarRating( $comment->star ); ?>
                            </div>
                        </div>


                    <?php } ?>

					<div class="date"><?php echo date_i18n( 'j M Y', strtotime( $comment->comment_date ) ) ?></div>
				</div>
				
                <div class="revbody">
					<p class="text"><?php echo $comment->comment_content ?></p>
				</div>
    
				<div class="revpics">
					<?php foreach( $gallery as $image ) : ?>
						<a href="<?php echo $image[ 'url' ] ?>">
                            <img src="<?php echo $image[ $size ] ?>" >
                        </a>
					<?php endforeach; ?>
				</div>
			</div>
		</div>
		<?php
	}
}