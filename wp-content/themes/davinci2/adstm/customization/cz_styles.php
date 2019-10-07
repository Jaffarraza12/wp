<style rel="stylesheet">
    
    <?php if(cz( 'tp_color' )){?>
        .reliable .bigtext{color:<?php echo cz( 'tp_color' )?>;}
        .benpic path{fill:<?php echo cz( 'tp_color' )?>;stroke:<?php echo cz( 'tp_color' )?>;}
        /*.pager a,.pager>span,.pager li span{color:<?php echo cz( 'tp_color' )?>!important;}*/
        .pager li.active a,.pager li.active span{
            color:<?php echo cz( 'tp_color' )?>!important;
            border-bottom:2px solid <?php echo cz( 'tp_color' )?>!important;}

        .subitem-nav li .active {color: <?php echo cz( 'tp_color' )?>;}
        .subitem-nav li .active:after {background: <?php echo cz( 'tp_color' )?>;}

        .mainnav ul li:hover>a,.mainnav ul li:active>a{background:<?php echo cz( 'tp_header_text_color' )?>;}
        .upheader,.adapupheader {background: <?php echo cz( 'tp_color' )?>!important;}
        @media(max-width:1289px) {
            .searchcont input,.upheaderR,.upheaderL:before{background: <?php echo cz( 'tp_color' )?>!important;}

        }

        .size_chart_table tr+tr:hover{background: <?php _cz( 'tp_color' )."!important;"; ?> }


    <?php } ?>

    <?php if(cz( 'tp_header_text_color' )){?>
        .upheaderR{color:<?php echo cz( 'tp_header_text_color' )?>!important;}
        @media(min-width:1290px){
            .upheader a{color:<?php echo cz( 'tp_header_text_color' )?>!important;}

            .topmenu>ul>li.current-menu-item a {
                border-color:<?php echo cz( 'tp_header_text_color' )?>!important;;
            }


            .mainnav a {color: #2b2d2e!important;}
            .mainnav ul li:active>a, .mainnav ul li:hover>a {color: #2b2d2e!important;}
            .mainnav li ul li:active>a, .mainnav li ul li:hover>a {color: #2b2d2e!important;}
        }
        @media(max-width:1289px) {
            .searchcont input,.searchcont input::placeholder,.searchcont span,.adapupheader{color:<?php echo cz( 'tp_header_text_color' )?>!important;}
            .upheaderR a{color:<?php echo cz( 'tp_header_text_color' )?>!important;}
        }
    <?php } ?>

    <?php if(cz( 'tp_header_text_color_hover' )){?>
    .upheaderR a:active, .upheaderR a:hover,.topmenu li a:active, .topmenu li a:hover{color:<?php echo cz( 'tp_header_text_color_hover' )?>!important;}
    .topmenu li a:active, .topmenu li a:hover,.topmenu>ul>li.current-menu-item a:hover {border-color:<?php echo cz( 'tp_header_text_color_hover' )?>!important;}

    <?php } ?>


    <?php if(cz( 'cart_color' )){?>
        div.cart .btn{
            background-color:<?php echo cz( 'cart_color' )?>!important;
            border-color:<?php echo cz( 'cart_color' )?>!important;}
    <?php } ?>

    <?php if(cz( 'cart_color_hover' )){?>
        div.cart .btn:hover{
            background-color:<?php echo cz( 'cart_color_hover' )?>!important;
            border-color:<?php echo cz( 'cart_color_hover' )?>!important;}
    <?php } ?>

    <?php if(cz( 'tp_account_btn_color' )){?>
    .btn.btn-primary{
        background-color:<?php echo cz( 'tp_account_btn_color' )?>!important;
        border-color:<?php echo cz( 'tp_account_btn_color' )?>!important;}
    <?php } ?>

    <?php if(cz( 'tp_account_btn_color_hover' )){?>
    .btn.btn-primary:hover{
        background-color:<?php echo cz( 'tp_account_btn_color_hover' )?>!important;
        border-color:<?php echo cz( 'tp_account_btn_color_hover' )?>!important;}
    <?php } ?>


    <?php if(cz( 'buttons_default' )){?>
        input[type="submit"], button[type="submit"],.btn-black,.attach_files{
            background-color:<?php echo cz( 'buttons_default' )?>!important;
            border-color:<?php echo cz( 'buttons_default' )?>!important;}

            .btn-white{
                border: 1px solid <?php echo cz( 'buttons_default' )?>!important;
                color: <?php echo cz( 'buttons_default' )?>!important;}
    <?php } ?>
    <?php if(cz( 'buttons_default_hover' )){?>
        input[type="submit"]:hover, button[type="submit"]:hover, .btn-black:hover,.attach_files:hover{
            background-color:<?php echo cz( 'buttons_default_hover' )?>!important;
            border-color:<?php echo cz( 'buttons_default_hover' )?>!important;
        }
        .btn-white:hover{
            border: 1px solid <?php echo cz( 'buttons_default_hover' )?>!important;
            background-color:<?php echo cz( 'buttons_default_hover' )?>!important;
            color: #fff!important;}
    <?php } ?>


    <?php if(cz( 'tp_price_color' )){?>
        .price .sale,.wrap-meta .newprice,.singlecartplateT .total-price,.ads-search-product .price{color:<?php echo cz( 'tp_price_color' )?>;}
    <?php } ?>

    <?php if(cz( 'tp_discount_bg_color' )){?>
        .discount:after{background:<?php echo cz( 'tp_discount_bg_color' )?>!important;}
    <?php } ?>

    <?php if(cz( 'tp_cart_pay_btn_color' )){?>
        #addToCart.btn,.btn-proceed{background-color:<?php echo cz( 'tp_cart_pay_btn_color' )?>!important;border-color:<?php echo cz( 'tp_cart_pay_btn_color' )?>!important;}
    <?php } ?>

    <?php if(cz( 'tp_cart_pay_btn_color_hover' )){?>
        #addToCart.btn:hover,div.cart-sidenav .cart-footer .item-cart a.btn-proceed:hover{background-color:<?php echo cz( 'tp_cart_pay_btn_color_hover' )?>!important;border-color:<?php echo cz( 'tp_cart_pay_btn_color_hover' )?>!important;}
    <?php } ?>


    <?php if(cz( 'tp_home_buttons_color' )){?>
    .slidebtns a.btn-primary{background-color:<?php echo cz( 'tp_home_buttons_color' )?>!important;border-color:<?php echo cz( 'tp_home_buttons_color' )?>!important;}
    <?php } ?>

    <?php if(cz( 'tp_home_buttons_color_hover' )){?>
    .slidebtns a.btn-primary:hover{background-color:<?php echo cz( 'tp_home_buttons_color_hover' )?>!important;border-color:<?php echo cz( 'tp_home_buttons_color_hover' )?>!important;}
    <?php } ?>

    
    <?php if(cz( 'slider_home_fs_desk' )){?>
        .slideblacktext{font-size:<?php echo cz( 'slider_home_fs_desk' )?>px;}
    <?php } ?>

    <?php if(cz( 'slider_home_fs_mob' )){?>
    @media(max-width:767px) {
        .slideblacktext{font-size:<?php echo cz( 'slider_home_fs_mob' )?>px;}
    }
    <?php } ?>


    <?php if(cz( 'tp_color_text_countdown' )){?>
    .content-countdown .top-plate .text{color:<?php echo cz( 'tp_color_text_countdown' )?>;}
    #clock .clock .item{background:<?php echo cz( 'tp_color_text_countdown' )?>;border-color:<?php echo cz( 'tp_color_text_countdown' )?>;}
    #clock .clock .item span{color:<?php echo cz( 'tp_color_text_countdown' )?>;}
    <?php } ?>

    <?php if(cz( 'tp_color_text_countdown_sale' )){?>
    .content-countdown .top-plate .text span{color:<?php echo cz( 'tp_color_text_countdown_sale' )?>;}
    <?php } ?>

    <?php if(cz( 'features_title_color' )){?>
    .features-main-text{color:<?php echo cz( 'features_title_color' )?>;}
    <?php } ?>

    <?php if(cz( 'features_text_color' )){?>
    .text-feat p{color:<?php echo cz( 'features_text_color' )?>;}
    <?php } ?>


    <?php if(cz( 'tp_footer_bgr_color' )){?>
    .bgr>.footer{background:<?php echo cz( 'tp_footer_bgr_color' )?>!important;}
    <?php } ?>

    <?php if(cz( 'tp_footer_title_color' )){?>
    .bgr>.footer h5,.footone:not(.footone_soc) h5:after{color:<?php echo cz( 'tp_footer_title_color' )?>!important;}

    <?php } ?>

    <?php if(cz( 'tp_footer_text_color' )){?>
    .bgr>.footer p,.footer{color:<?php echo cz( 'tp_footer_text_color' )?>!important;}
    <?php } ?>

    <?php if(cz( 'tp_footer_link_color' )){?>
    .bgr>.footer a{color:<?php echo cz( 'tp_footer_link_color' )?>!important;}
    <?php } ?>

    <?php if(cz( 'tp_footer_link_color_hover' )){?>
    .bgr>.footer a:hover{color:<?php echo cz( 'tp_footer_link_color_hover' )?>!important;}
    <?php } ?>

    <?php if(cz( 'tp_copyright_bgr_color' )){?>
    .footerB{background:<?php echo cz( 'tp_copyright_bgr_color' )?>!important;}
    <?php } ?>

    <?php if(cz( 'tp_copyright_notice_color' )){?>
    .footerB{color:<?php echo cz( 'tp_copyright_notice_color' )?>!important;}
    <?php } ?>

    <?php if(cz( 'tp_copyright_domain_color' )){?>
    .footerB a{color:<?php echo cz( 'tp_copyright_domain_color' )?>!important;}
    <?php } ?>

    <?php
     foreach( cz( 'slider_home' ) as $key => $item ) {

        if ( ! $item[ 'img' ] ){
        continue;
        }
        if ($item[ 'img_adap' ]){
            printf('
                %s
                %s
                ',
                '@media(min-width:1024px){
                    .scene'.$key.' {background: url('.$item[ 'img' ].') no-repeat center center transparent;background-size:cover;}
                }',
                '@media(max-width:1023px){
                    .scene'.$key.' {background: url('.$item[ 'img_adap' ].') no-repeat center center transparent;background-size:cover;}
                }'

                );
        }else{
            echo '.scene'.$key.' {background: url('.$item[ 'img' ].') no-repeat center center transparent;background-size:cover;}';
        }

     }
     ?>


</style>