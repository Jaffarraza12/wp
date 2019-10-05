<?php

get_header();

global $wp_query;

$typePost = isset( $_GET[ 'post_type' ] ) && $_GET[ 'post_type' ] == 'post';

?>

    <div class="container aship-box-products">

        <div class="breadcrumbs"><?php adsTmpl::breadcrumbs() ?></div>

        <div class="adapbread">
            <a href="<?php echo adstm_home_url() ?>">
                <i class="fas fa-angle-left"></i> <?php _e( 'Back to homepage', 'dav2' ) ?>
            </a>
        </div>

        <div class="searchH1 aship-title">
            <?php printf( '<h1>%s </h1><div>%s <span>(%s)&#x200E;</span></div>',
                __( 'Search results for:', 'dav2' ),
                get_search_query(),
                $wp_query->found_posts
            ); ?>
        </div>

        <?php if( have_posts() ) : ?>

            <div class="searchresults">

                <div class="catfilters">
                    <div class="row no-gutters justify-content-end">
                        <div class="category-select"><?php do_action( 'sortby_show_select' ) ?></div>
                    </div>
                </div>

                <div class="itemscat">
                    <?php
                    while ( have_posts() ) : the_post() ?>
                        <div class="item-sp item-md">
                            <?php do_action( 'adstm_product_item', 'ads-medium' ) ?>
                        </div>
                     <?php endwhile; ?>
                </div>

                <div class="pagercont">
                    <div class="pager js-pagination pagination"><?php do_action( 'adstm_paging_nav' ) ?></div>
                </div>

                <div class="clearfix wrap-loadProduct" style="display: none">
                    <button class="loadProduct"><?php _e( 'Load More', 'dav2' ) ?></button>
                </div>

            </div>

        <?php else : ?>

            <div class="searchresults noresults aship-title">

                <div class="searchpops">
                    <p><?php _e( 'Double-check your spelling or try again with a less specific term.', 'dav2' ) ?></p>
                    <div class="h1 superH1"><?php _e( 'Check these popular products', 'dav2' ) ?></div>
                </div>

                <div class="itemscat">
                    <?php

                    do_action( 'adstm_start_loop_topselling_product', 10 );

                    while ( have_posts() ) : the_post();

                        echo '<div class="item-sp item-md">';

                        do_action( 'adstm_product_item', 'ads-medium' );

                        echo '</div>';

                    endwhile; ?>
                </div>
                <div class="viewmore wrap-loadProduct">
                    <a class="btn btn-black" href="<?php echo adstm_home_url( 'product' ) ?>">
                        <?php _e( 'View More', 'dav2' ) ?>
                    </a>
                </div>

            </div>

        <?php endif; ?>

    </div>

<?php get_footer() ?>