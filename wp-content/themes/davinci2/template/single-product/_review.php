<?php

global $wp_query;

$reviews        = adsTmpl::review();
$posts_per_page =
    isset( $wp_query->query_vars[ 'comments_per_page' ] ) && intval( $wp_query->query_vars[ 'comments_per_page' ] ) ?
	$wp_query->query_vars[ 'comments_per_page' ] : intval( get_option( 'comments_per_page' ) );

if( comments_open() ) : ?>

    <div class="rev_comments">
        <div class="revhead">
            <div class="revL"><?php _e( 'Buyer', 'dav2' ) ?></div>
            <div class="revR"><?php _e( 'Review', 'dav2' ) ?></div>
        </div>
        <div class="revs">
            <?php

            wp_list_comments( [
                'walker'            => null,
                'max_depth'         => '5 ',
                'style'             => 'tr',
                'callback'          => 'list_review',
                'end-callback'      => null,
                'type'              => 'all',
                'reply_text'        => 'Reply',
                'page'              => 1,
                'per_page'          => $posts_per_page,
                'avatar_size'       => 32,
                'reverse_top_level' => null,
                'reverse_children'  => '',
                'format'            => 'html5',
                'echo'              => true,
                'status'            => 'approve'
            ], $reviews->comments );
    
            ?>
        </div>
        
        <div class="pagercont">
            <div class="pager">
                <?php
            
                paginate_comments_links( [
                    'prev_text' => '<i class="fas fa-angle-left"></i>',
                    'next_text' => '<i class="fas fa-angle-right"></i>',
                    'current'   => $reviews->getPage()
                ] );
                ?>
            </div>
        </div>
    </div>

    <div class="wrap-review_list">

        <div class="review_list"></div>

        <?php if( get_comment_pages_count() > 1 ) : ?>

            <div class="more-reviews wrap-load_reviews">
                <div class="load_reviews"><?php _e( 'More reviews', 'dav2' ) ?></div>
            </div>

        <?php endif; ?>

        <div class="inner-box-comment-form">
            <div class="wrap-pagination js-pagination pagination" style="display: none;">
                <div class="pagination"></div>
            </div>
        </div>
    </div>

<?php endif; ?>

