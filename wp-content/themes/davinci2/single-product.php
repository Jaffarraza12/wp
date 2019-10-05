<?php get_header(); ?>

<?php if ( have_posts() ) : while ( have_posts() ) : the_post() ?>

    <?php
    
    do_action( 'adstm_init_product' );

    global $ADSTM;

    $product = $ADSTM[ 'product' ];
    $review  = $ADSTM[ 'review' ];
    $info    = $ADSTM[ 'info' ];
    ?>

    <?php get_template_part( 'template/single-product/str_data' ); ?>


    <div class="container">
        
        <div class="breadcrumbs">
            <?php adsTmpl::breadcrumbs() ?>
        </div>
        
        <div class="adapbread">
            <a href="<?php echo adsTmpl::singleProduct()->linkCategoryProduct() ?>">
                <i class="fas fa-angle-left"></i> <?php _e( 'Back to category', 'dav2' )?>
            </a>
        </div>

        <?php do_action( 'adstm_start_form_product' ) ?>

        <div class="row adapitemrow">
            
            <div class="col col-sm-12 col-lg-5 col-xl-4 wrap-tumb">
                
                <?php if( cz( 'tp_show_discount' ) ) : ?>
                    <div class="discount" style="display:none;" data-singleProductBox="savePercent">
                        <span>
                            <b data-singleProduct="savePercent"></b> <?php _e( 'off', 'dav2' ) ?>
                        </span>
                    </div>
                <?php endif; ?>
                <?php do_action( 'adstm_single_gallery', $product[ 'gallery' ], get_the_title() ) ?>
            </div>
            <div class="col col-sm-12 col-lg-7 col-xl-8 ">
                <div class="wrap-setter">
                    <div class="wrap-meta">
                        <h1 class="h2" itemprop="name"><?php the_title() ?></h1>
                        <div class="rate">
                            <div class="starscont">

                                <?php
                                if( $product[ 'rate' ] > 0 && $review->countFeedback() > 0 )
                                    printf( '%s <span class="call-item toreview">%s %s</span>',
                                        $info->starRating( false ),
                                        $review->countFeedback(),
                                        __( 'reviews', 'dav2' )
                                    );
                                ?>

                            </div>
                            <div class="ratetext">

                                <?php
                                $stars = $review->getStat();

                                if( $stars[ 'positive' ] )
                                    printf( '%s&percnt; %s! ',
                                        $stars[ 'positive' ] > 100 ? 100 : $stars[ 'positive' ],
                                        __( 'of buyers enjoyed this product', 'dav2' )
                                    );

                                if( cz( 'tp_orders' ) )
                                    printf( ' %s %s',
                                        $product[ 'promotionVolume' ],
                                        __( 'orders', 'dav2' )
                                    );
                                ?>

                            </div>

                        </div>
                        <div class="meta">



                            <div class="priceflex">

                                <?php if ( $product[ '_price' ] > 0 && $product[ '_price' ] !== $product[ '_salePrice' ] ) : ?>
                                    <div class="oldprice" data-singleProductBox="price">
                                        <span data-singleProduct="price"><?php echo $product[ 'price' ] ?></span>
                                    </div>
                                <?php endif; ?>

                                <div class="newprice" data-productPriceBox="salePrice">
                                    <span data-singleProduct="savePrice"
                                          class="price color-orange color-custom cz_price_text_color">

                                    </span>
                                </div>
                                <div class="instock">

                                    <?php if( $product[ 'stock' ] <= 0 ) : ?>
                                        <div class="stock" data-singleProductBox="stock"
                                             itemprop="availability" href="http://schema.org/InStock">
                                            <?php _e( 'Out of stock', 'dav2' ) ?>
                                        </div>
                                    <?php elseif( cz( 'tp_single_stock_enabled' ) ) : ?>
                                        <div class="stock" style="display:none;" data-singleProductBox="stock"
                                             itemprop="availability" href="http://schema.org/InStock">
                                            <?php _e( 'Only', 'dav2' ) ?>
                                            <span data-singleProduct="stock"><?php echo $product[ 'stock' ] ?></span>
                                            <?php _e( 'left in stock', 'dav2' ) ?>
                                        </div>
                                    <?php endif; ?>

                                </div>
                            </div>

                            <div data-productPriceBox="savePercent" style="display:none;">
                                <span class="color-orange color-custom cz_price_text_color" data-singleProduct="save"></span>
                                (<span data-singleProduct="savePercent"></span>%)
                            </div>

                            <div style="display:none;">
                                <?php echo $product[ 'renderShipping' ]; ?>
                            </div>

                            <?php do_action('after_meta_info');?>
                            <div class="sku-listing js-empty-sku-view">
                                <?php do_action( 'adstm_single_sku', $product[ 'sku' ], $product[ 'skuAttr' ] ) ?>
                            </div>

                            <?php if(cz('tp_size_chart') && isset($product['sizeAttr']) && is_array($product['sizeAttr'])){ ?>
                                <div class="size_chart_cont">
                                    <a href="" class="size_chart_btn"><?php _e( 'Size Guide', 'ami3' ); ?></a>
                                </div>
                                <div class="chart_modal">
                                    <div class="chart_modal_inner">
                                        <div class="chart_modal_block">
                                            <span class="chart_close"></span>
                                            <div class="chart_table_block">
                                                <table class="size_chart_table">
                                                    <tr>
                                                        <?php foreach ($product['sizeAttr']['title'] as $k => $v){
                                                            echo '<th>'.$v.'</th>';
                                                        } ?>
                                                    </tr>
                                                    <?php foreach ($product['sizeAttr']['list'] as $k => $v){ ?>
                                                        <tr>
                                                            <?php foreach ($v as $v2){
                                                                echo '<td>'.$v2.'</td>';
                                                            } ?>
                                                        </tr>
                                                    <?php } ?>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <?php } ?>

                        </div>
                    </div>
                    <div class="singlecartplatecont">
                        <?php if( $product[ 'stock' ] > 0 ) : ?>
                        <div class="singlecartplate">
                            <div class="b-add_order test-class" style="border-width: 0 !important;">
                                <div class="price-rate">
                                    <div class="product-meta">
                                        <div class="singlecartplateT">
                                            <dl class="b-add_order__total" data-productPriceBox="totalPrice">
                                                <dt><?php _e( 'Total Price', 'dav2' ) ?>:</dt>
                                                <dd class="">
                                                    <div class="totalPrice">
                                                        <span class="total-price value" data-singleProduct="totalPrice"></span>
                                                    </div>
                                                </dd>
                                            </dl>
                                            <div class="besttip">
                                                <span><i class="fas fa-tags"></i> <?php _e( 'Best price guarantee', 'dav2' ) ?></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <?php do_action('ads_single_product_after_box_total', $product['post_id']);?>

                                    <div class="singlecartplateB">

                                        <dl class="b-add_order__quantity">
                                            <dt><?php _e( 'Quantity', 'dav2' ) ?>:</dt>
                                            <dd>
                                                <div class="select_quantity">
                                                    <?php if ( adsTmpl::product( 'stock' ) != 0 ) : ?>

                                                        <div class="input_quantity">
                                                            <div class="value">
                                                                <div class="select_quantity js-select_quantity">
                                                                    <button type="button" class="select_quantity__btn js-quantity_remove">
                                                                        <i class="fas fa-minus"></i>
                                                                    </button>
                                                                    <input class="js-single-quantity"
                                                                           data-singleProductInput="quantity"
                                                                           name="quantity"
                                                                           type="text"
                                                                           value="1" min="1" max="9999"
                                                                           maxlength="5" autocomplete="off" />
                                                                    <button type="button" class="select_quantity__btn js-quantity_add">
                                                                        <i class="fas fa-plus"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    <?php endif; ?>
                                                </div>
                                            </dd>
                                        </dl>

                                        <div class="b-add_order">
                                            <div class="b-add_order__btn">

                                                <?php if( $product[ 'stock' ] != 0 ) : ?>

                                                    <button type="button" id="addToCart"
                                                            class="btn btn-primary btn-lg b-add_order__btn_addcart js-addToCart">
                                                        <i class="fas fa-shopping-cart"></i> <?php _e( 'Add to Cart', 'dav2' ) ?>
                                                    </button>
                                                    <div class="view_cart">
                                                        <?php _e( 'View cart', 'dav2' ) ?> <i class="fas fa-arrow-right"></i>
                                                    </div>
                                                    <?php if(function_exists('isExpressCheckoutEnabled') && isExpressCheckoutEnabled()): ?>
                                                        <button type="submit" id="buyNow"
                                                                class="btn btn-lg b-add_order__btn_paypal rippler rippler-default"
                                                                name="pay_express_checkout">
                                                            <?php _e( 'Check out with', 'dav2' ) ?> <i class="ico-paypal"></i>
                                                        </button>
                                                    <?php endif; ?>
                                                <?php endif; ?>
                                            </div>
                                        </div>

                                    </div>

                            </div>
                        </div>
                        <?php endif; ?>
                        <?php if( cz( 'tp_share' ) ) : ?>
                            <div class="col-lg-12 single-socs-cont">
                                <div class="row justify-content-center">
                                    <div class="single-socs">
                                        <div class="sharePopup"><div class="share-btn socs whitesocs"></div></div>
                                    </div>
                                </div>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
 
        <?php do_action( 'adstm_end_form_product' ) ?>
        <?php do_action('ads_single_product_before_content'); ?>
        <?php if ( cz( 'tp_single_buyer_protection' ) ) : ?>
        
            <div class="reliable">
                <div class="row no-gutters justify-content-around">
                    <div class="col-xl-7 col-md-8 col-lg-7">
                        <div class="row no-gutters align-items-center jccenter">
                            <div class="col-xl col-md-6 col-lg-7 ico-cartshield bigtext">
                                <i>
                                    <svg width="50" height="50" viewBox="0 0 42 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="43" height="50" fill="black" fill-opacity="0" transform="scale(0.976744)"/>
                                        <path d="M41.9185 6.32011C35.2724 6.40219 21.0428 0 21.0428 0C16.7825 1.88783 12.3518 3.52941 7.83581 4.92476L10.7328 12.8865H36.2948L32.2049 22.736H16.6121L15.9304 20.5198H29.7339L31.6085 16.4159L12.0961 16.3338L14.9932 26.1012H31.6085L30.586 28.6457H11.7553L4.08671 5.90971C2.72341 6.15595 1.44531 6.32011 0.0819989 6.32011C0.0819989 15.4309 -2.4742 35.7866 20.9576 48.8372C44.4747 35.7866 41.9185 15.4309 41.9185 6.32011ZM14.7376 34.4733C13.5447 34.4733 12.6074 33.5705 12.6074 32.4213C12.6074 31.2722 13.5447 30.3694 14.7376 30.3694C15.9304 30.3694 16.8677 31.2722 16.8677 32.4213C16.8677 33.4884 15.8452 34.4733 14.7376 34.4733ZM28.7967 34.4733C27.6038 34.4733 26.6665 33.5705 26.6665 32.4213C26.6665 31.2722 27.6038 30.3694 28.7967 30.3694C29.9896 30.3694 30.9268 31.2722 30.9268 32.4213C30.9268 33.4884 29.9896 34.4733 28.7967 34.4733Z" fill="<?php echo cz('tp_color');?>"/>
                                    </svg>

                                </i>
                                <span><?php _e('Buyer protection', 'dav2');?></span>
                            </div>
                            <div class="col-xl col-md-6 col-lg-4 smalltext">
                                <div>
                                    <i class="far fa-check-square"></i> <span><?php _e( 'Safe shopping', 'dav2' ) ?></span>
                                </div>
                                <div>
                                    <i class="far fa-check-square"></i> <span><?php _e( 'Easy returns and refunds', 'dav2' ) ?></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-md-4 col-lg-5 ico-airplane bigtext">
                        <i>
                            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="50" height="50" fill="black" fill-opacity="0"/>
                                <rect width="50" height="50" fill="black" fill-opacity="0"/>
                                <path d="M50 2.753C50 2.95692 50 3.26281 49.8984 3.46673C49.7967 4.07851 49.6951 4.58833 49.4919 5.09814C49.2886 5.70992 48.9837 6.11777 48.4756 6.52562C46.8496 8.05506 45.3252 9.5845 43.6992 11.012C42.4797 12.1336 41.2602 13.3571 40.0407 14.4787C39.939 14.5807 39.8374 14.6826 39.8374 14.8866C39.8374 17.4356 39.8374 19.9847 39.8374 22.5338C39.8374 25.2868 39.8374 28.0398 39.7358 30.8947C39.7358 33.5458 39.7358 36.1968 39.6341 38.8478C39.6341 41.2949 39.6341 43.844 39.5325 46.2911C39.5325 46.597 39.4309 47.0048 39.4309 47.3107C39.4309 47.4127 39.4309 47.5147 39.4309 47.5147C39.4309 47.6166 39.3293 47.8205 39.2276 47.9225C38.6179 48.5343 38.1098 49.1461 37.5 49.6559C37.3984 49.7578 37.1951 49.8598 36.9919 49.9618C36.687 50.0637 36.3821 49.9618 36.2805 49.6559C36.1789 49.452 36.1789 49.35 36.0772 49.1461C33.6382 41.6008 31.0976 34.1575 28.6585 26.6123C28.6585 26.6123 28.6585 26.5103 28.5569 26.5103C28.4553 26.5103 28.4553 26.6123 28.3537 26.6123C25.6098 28.7535 22.9675 30.7928 20.2236 32.934C20.122 33.0359 20.122 33.0359 20.122 33.1379C20.0203 34.7693 20.0203 36.4007 19.9187 38.0321C19.9187 39.0517 19.8171 40.0714 19.8171 41.091C19.8171 41.6008 19.8171 42.0087 19.7154 42.5185C19.7154 42.5185 19.7154 42.6204 19.6138 42.6204C18.9024 43.3342 18.1911 44.0479 17.4797 44.7617C17.4797 44.7617 17.4797 44.7617 17.378 44.8636C17.0732 45.0676 16.565 44.9656 16.3618 44.6597C16.1585 44.3538 16.0569 43.946 15.9553 43.6401C15.5488 42.0087 15.1423 40.3773 14.7358 38.6439C14.6341 38.338 14.3293 38.1341 14.0244 38.1341C13.7195 38.1341 13.4146 38.236 13.2114 38.5419C12.9065 38.9498 12.6016 39.3576 12.0935 39.5616C11.3821 39.8674 10.7724 39.9694 10.061 39.8674C10.1626 40.0714 9.85772 39.7655 9.85772 39.2557C9.7561 38.338 10.061 37.5223 10.6707 36.8086C10.874 36.6046 11.0772 36.4007 11.1789 36.1968C11.3821 35.9929 11.4837 35.7889 11.5854 35.585C11.687 35.483 11.687 35.2791 11.5854 35.0752C11.4837 34.8713 11.2805 34.7693 10.9756 34.6673C9.24797 34.2595 7.62195 33.8516 5.89431 33.4438C5.79268 33.4438 5.58943 33.3418 5.4878 33.3418C4.97967 33.2399 4.77642 32.7301 4.87805 32.3222C4.87805 32.2202 4.97967 32.1183 4.97967 32.0163C5.58943 31.4045 6.19919 30.6908 6.91057 30.079C7.11382 29.8751 7.4187 29.6712 7.8252 29.6712C10.6707 29.6712 13.5163 29.6712 16.3618 29.6712C16.6667 29.6712 16.8699 29.5692 16.9715 29.3653C17.5813 28.6515 18.1911 27.8358 18.8008 27.1221C20.3252 25.1848 21.9512 23.1455 23.4756 21.2083C23.4756 21.2083 23.4756 21.1063 23.5772 21.1063C23.4756 21.1063 23.4756 21.1063 23.374 21.0043C15.8537 18.5572 8.13008 16.1101 0.50813 13.663C0 13.4591 0.101626 13.4591 0 12.9493C0 12.6434 0.101626 12.3375 0.304878 12.1336C0.813008 11.6238 1.32114 11.2159 1.82927 10.7061C1.93089 10.6041 1.93089 10.6041 2.03252 10.5022C2.23577 10.2982 2.43902 10.1963 2.64228 10.1963C5.79268 10.1963 9.04472 10.1963 12.1951 10.1963C14.2276 10.1963 16.3618 10.0943 18.3943 10.0943C20.4268 10.0943 22.561 9.99235 24.5935 9.99235C26.626 9.99235 28.7602 9.89039 30.7927 9.89039C32.1138 9.89039 33.3333 9.89039 34.6545 9.89039C34.7561 9.89039 34.8577 9.89039 34.9594 9.78843C37.6016 7.1374 40.3455 4.48636 42.9878 1.93729C44.0041 0.917665 45.3252 0.305888 46.748 0.101963C46.9512 0 47.2561 0 47.4594 0C47.561 0 47.6626 0 47.6626 0C47.8659 0 48.0691 0.101963 48.2724 0.101963C49.0854 0.305888 49.5935 0.713739 49.8984 1.52944V1.6314C50 2.03926 50 2.34514 50 2.753Z" fill="<?php echo cz('tp_color');?>"/>
                            </svg>
                        </i>
                        <span><?php _e( 'Free shipping worldwide', 'dav2' ) ?></span>
                    </div>
                </div>
            </div>
        
        <?php endif; ?>
        
        <div class="subitem">
            <div class="row">
                <div class="col col-xl-9">
                    <?php

                    get_template_part( 'template/single-product/content' );

                    if( cz( 'tp_related' ) ) :

                        do_action('adstm_start_loop_related_product', 4);

                        if ( have_posts() ) : ?>
                        
                            <div class="recs recsfull aship-box-products swiper-container">

                                <h2 class="aship-title text-uppercase"><?php _e( 'Recommendations', 'dav2' ) ?></h2>

                                <div class="items-small swiper-wrapper blackdots">

                                    <?php while ( have_posts() ) :	the_post();

                                        echo '<div class="item-sp item-sm">';

                                        do_action('adstm_product_item', 'ads-big', true);

                                        echo '</div>';

                                    endwhile; ?>
                                </div>
                                <div class="swiper-pagination"></div>
                            </div>
                        
                        <?php endif;

                        do_action('adstm_end_loop_product');

                    endif; ?>

                    <div class="fullreviews">
                        <h3 class="title-stripe text-uppercase"><span><?php _e( 'Real customer reviews', 'dav2' ) ?></span></h3>

                        <?php get_template_part( 'template/single-product/_feedback' ) ?>

                        <?php if( cz( 'tp_enable_leave_review_box' ) ) : ?>

                            <div class="Review_formcont">
                                <h5><?php _e( 'Write a review', 'dav2' ) ?></h5>
                                <div class="wrap-review_list">
                                    <div class="review-form">
                                        <div class="row" id="addReviewDiv">
                                            <div class="col">
                                                <form class="addReviewForm nicelabel" enctype="multipart/form-data">
                                                    <div class="form-group is-empty">
                                                        <input type="text" id="Addreviewname" class="form-control" name="Addreview[name]">
                                                        <label for="Addreviewname">* <?php _e( 'Name', 'dav2' ) ?></label>
                                                    </div>
                                                    <div class="form-group is-empty">
                                                        <input type="email" id="Addreviewemail" class="form-control" name="Addreview[email]">
                                                        <label for="Addreviewname">* <?php _e( 'Email', 'dav2' ) ?></label>
                                                    </div>
                                                    <div class="form-group">
                                                        <div class="form-control-select review-dropdown-menu">
                                                            <label for="ads_review_shipping_countries">* <?php _e( 'Country', 'dav2' ) ?></label>
                                                            <select name="Addreview[from]" id="ads_review_shipping_countries" class="selectpicker form-control" data-live-search="true" >
                                                                <?php ads_get_list_contries() ?>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="form-group is-empty">
                                                        <textarea id="textarea" rows="5" class="form-control" name="Addreview[message]"></textarea>
                                                        <label for="textarea">* <?php _e( 'Message', 'dav2' ) ?></label>
                                                    </div>
                                                    <div class="form-group">
                                                        <div class="row justify-content-center">
                                                            <div class="goldstars_set">
                                                                <span class="star"></span>
                                                                <span class="star"></span>
                                                                <span class="star"></span>
                                                                <span class="star"></span>
                                                                <span class="star"></span>
                                                            </div>
                                                            <input name="Addreview[rating]" type="hidden" value="" />
                                                        </div>
                                                    </div>
                                                    <?php

                                                    $options = new \ads\adsOptions();
                                                    $args    = $options->get('ads_recaptcha_options');

                                                    ?>

                                                    <?php if( cz( 'cm_readonly' ) ) : ?>
                                                    
                                                        <div class="form-group conditions-review">
                                                            <label class="checkbox" for="terms">
                                                                <input name="terms" value='0' type='hidden'/>
                                                                <input class="in-conditions-review" id="terms" name="terms" type="checkbox" value="1" />
                                                                <span><?php echo cz( 'tp_readonly_read_required_text' ) ?></span>
                                                            </label>
                                                            <div class="conditions-help errorcheck">
                                                                <span><?php echo cz( 'cm_readonly_notify') ?></span>
                                                            </div>
                                                        </div>
                                                    
                                                    <?php endif;?>
                                                    
                                                    <div class="form-group is-not-empty submit-and-attach">
                                                        <button type="submit" class="btn submit-review">
                                                            <?php _e( 'Submit a Review', 'dav2' ) ?>
                                                        </button>
                                                        <input hidden="hidden" name="action" value="ads_add_user_review">
                                                        <input hidden="hidden" name="Addreview[post_id]" value="<?php echo get_the_ID();?>">
                                                        <span class="btn btn-default fileinput-button" data-toggle="tooltip" data-placement="right" title="<?php _e('Attach file(s)', 'dav2');?>">
                                                            <u class="attach_files"><i class="ico-paperclip"></i><input id="review-file-upload" type="file" name="review_files[]" multiple=""><label for="review-file-upload"></label></u>
                                                        </span>
                                                    </div>
                                                    <div class="list-file"></div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <?php endif;?>

                    </div>
                </div>
                <div class="recs recsside col col-xl-3 aship-box-products"></div>
            </div>

            <?php if( cz( 'tp_recently' ) ) get_template_part( 'template/product/main-recently' ) ?>

        </div>
    </div>

<?php endwhile; endif; ?>

<?php get_footer() ?>