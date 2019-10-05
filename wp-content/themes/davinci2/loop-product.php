<?php get_header() ?>

<div class="container">
	
    <div class="breadcrumbs">
		<?php adsTmpl::breadcrumbs() ?>
	</div>
	
    <div class="adapbread">
		<a href="<?php echo adstm_home_url() ?>">
            <i class="fas fa-angle-left"></i> <?php _e( 'Back', 'dav2' ) ?>
        </a>
	</div>
    
    <div class="aship-box-products row">
        <div class="col-12 col-xl-3">
            <div class="categorynav mainnav">
                <h3>Categories</h3>
                <ul>
                    <?php
                    $menuProduct = wp_list_categories( [
                        'child_of'            => 0,
                        'current_category'    => 0,
                        'depth'               => 4,
                        'echo'                => 0,
                        'exclude'             => '',
                        'exclude_tree'        => '',
                        'feed'                => '',
                        'feed_image'          => '',
                        'feed_type'           => '',
                        'hide_empty'          => 1,
                        'hide_title_if_empty' => false,
                        'hierarchical'        => true,
                        'order'               => 'ASC',
                        'orderby'             => 'name',
                        'separator'           => '<br />',
                        'show_count'          => 1,
                        'show_option_all'     => '',
                        'show_option_none'    => '',
                        'style'               => 'list',
                        'taxonomy'            => 'product_cat',
                        'title_li'            => '',
                        'use_desc_for_title'  => 0
                    ] );

                    $menuProduct = preg_replace( "#<ul\s*class='children'#", "<span class='arrright'></span><ul class='children'", $menuProduct );
                    $menuProduct = preg_replace( "#<a([^>]*)>([^>]*)<\/a>\s*\(([^>]*)\)#", "<a$1>$2 <span>($3)</span></a>", $menuProduct );

                    echo $menuProduct ?>
                </ul>

            </div>
        </div>
        <div class="col-12 col-xl-9">
            <div class="catfilters">
                <div class="row no-gutters justify-content-between">

                    <div class="h1cont"><?php echo adsTmpl::singleTerm( true ) ?></div>

                    <div class="category-select"><?php do_action( 'sortby_show_select' ) ?></div>
                </div>
            </div>
            
            <div class="itemscat">
                
                <?php if( have_posts() ) : while ( have_posts() ) : the_post();

                    echo '<div class="item-sp item-md">';

                    do_action( 'adstm_product_item', 'ads-big' );

                    echo '</div>';

                endwhile; endif; ?>
                
            </div>
            
            <div class="pagercont">
                <div class="pager js-pagination pagination">
                    <?php do_action( 'adstm_paging_nav' ) ?>
                </div>
            </div>
        </div>
    </div>
		
    <div class="simple-content">

        <?php $queried_object = get_queried_object();
        if(isset($queried_object->description) && $queried_object->description ){
            echo $queried_object->description;
        } ?>
        
    </div>

</div>

<?php get_footer(); ?>