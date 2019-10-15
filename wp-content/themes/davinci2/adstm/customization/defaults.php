<?php
/**
 * Autor: Pavel Shishkin
 * Date: 30.06.2016
 * Time: 19:04
 */

if( ! defined( 'ADSTM_HOME' ) ) define( 'ADSTM_HOME', home_url() );

return [
	'tp_head'                => '',
	'tp_style'               => '',


	/*base*/
	'tp_create'              => true,

	'tp_color'                    => '#f8f8f8',
	'tp_color_additional'         => '#a0b4c5',
	'cart_color'                  => '#c90700',
	'cart_color_hover'            => '#c90700',
    'buttons_default'             => '#444444',
    'buttons_default_hover'       => '#222222',
	'tp_menu_hover_color'         => '#3c5460',
    'tp_menu_hover_subitem_color' => '#399fd2',
	'tp_discount_bg_color'        => '#3c5460',
	'tp_price_color'              => '#c90700',
	'tp_cart_pay_btn_color'       => '#ff9841',
	'tp_cart_pay_btn_color_hover' => '#FF831B',
    'tp_account_btn_color'        => '#ff9841',
    'tp_account_btn_color_hover'  => '#FF831B',

    'tp_header_text_color'        => '#f8f8f8',
    'tp_header_text_color_hover'  => '#f8f8f8',

    'tp_do_rtl'         => false,



    'tp_tab_color'        => '#444',
    'tp_tab_active_color' => '#3c5460',

	'tp_img_left_cart' => IMG_DIR . 'godaddy.png',
	'tp_logo_img'      => IMG_DIR . 'logo.jpg',

	'tp_favicon'      => TEMPLATE_URL . '/T.png',
	's_mail'          => 'support@' . parse_url(ADSTM_HOME, PHP_URL_HOST),
	'tp_header_phone' => '+923142587491',
	'tp_icon_phone'   => 'fa-phone',

	'tp_buttons_colors' => '#ff9749',

	'tp_header_email'           => 'support@' . parse_url(ADSTM_HOME, PHP_URL_HOST),
	'tp_text_top_header'        => __( 'Free Worldwide Shipping', 'dav2' ),
    'tp_text_header_call'       => __( 'Got a question? Call us!', 'dav2' ),
    'tp_phone_header'           => __( '(111) 111 11 11', 'dav2' ),

	'shipping_icon'             => '',
	'tp_show_discount'          => true,

	'tp_buttons_cart'       => '#ff7800',
	'tp_buttons_cart_hover' => '#ffa561',


	'tp_countdown'            => true,
	'tp_countdown_text'       => __( 'Super Sale up to', 'dav2' ) . ' <span class="color sale">80%</span> ' . 
	                             __( 'off all items!', 'dav2' ) . ' <span class="color">' . 
	                             __( 'limited time offer', 'dav2' ) . '</span>',
	
	'tp_color_countdown'           => '#455560',
	'tp_color_text_countdown'      => '#3c5460',
	'tp_color_text_countdown_sale' => '#eea12d',


    'tp_countdown_link'           => '',
    'tp_countdown_time_enable'    => false,
    'tp_countdown_days'           => '1',
    'tp_countdown_hours'          => '1',
    'tp_countdown_minutes'        => '1',


	'about_review_color'       => '#003758',
	'about_review_color_hover' => '#008fd3',
	'login_subscription_color' => '#254162',
    'tp_item_imgs_lazy_load' => true,


	/*home*/
	'id_video_youtube_home' => 'rsbZbmMk3BY',
	'slider_home_position' => 'center',
	'values_slider_home_position' => [
        ['value' => 'left', 'title' => __( 'Left', 'dav2' ) ],
        ['value' => 'center', 'title' => __( 'Center', 'dav2' ) ],
        ['value' => 'right', 'title' => __( 'Right', 'dav2' ) ],
    ],
	'slider_home_fs_mob'  => '20',
	'slider_home_fs_desk' => '20',
	'home_grid_enable'    => true,
	'grid_home_img1'      => IMG_DIR . '336-19e569.jpg',
	'grid_home_img2'      => IMG_DIR . '176-497b20.jpg',
	'grid_home_txt1'      => __( 'Women’s Solid Rain Jackets Outdoor Hoodied Waterproof Long Coats Overcoat Long', 'dav2' ),
	'grid_home_txt2'      => __( 'Children Hoodies Hooded Sweatshirts Boys Girls Kids Fleece Cartoon Print Zipper Cotton', 'dav2' ),
	'grid_home_href1'     => home_url( '/womens-solid-rain-jackets-outdoor-hoodied-waterproof-long-coats-overcoat-long-windbreaker-plus-size-outerwear-harajuku/' ),
	'grid_home_href2'     => home_url( '/2019-children-hoodies-hooded-sweatshirts-boys-girls-kids-fleece-cartoon-print-zipper-cotton-tops-baby-boys-autumn-winter-clothes/' ),

	'slider_home' => [
		[
			'img'              => IMG_DIR . 'banner.jpg',
            'img_adap'         => '',
			'head'             => __( 'What is Lorem Ipsum?', 'dav2' ),
			'head_color'       => '#fff',
			'text'             => __( 'Great Collection of Best Products', 'dav2' ),
			'text_color'       => '#fff',
            'button_text'      => __( 'Shop now', 'dav2' ),
			'shop_now_link'    => home_url( '/product/' ),
			'shop_now_enabled' => true,
			'background'       => 'rgba(0, 0, 0, 0.6)',
		],
		[
			'img'              => IMG_DIR . 'banner.jpg',
            'img_adap'         => '',
			'head'             => __( 'What is Lorem Ipsum?', 'dav2' ),
			'head_color'       => '#fff',
			'text'             => __( 'The world’s most popular and secure payment methods', 'dav2' ),
			'text_color'       => '#fff',
            'button_text'      => __( 'Shop now', 'dav2' ),
			'shop_now_link'    => home_url( '/product/' ),
			'shop_now_enabled' => true,
			'background'       => 'rgba(0, 0, 0, 0.6)',
		],
		[
			'img'              => IMG_DIR . 'banner.jpg',
            'img_adap'         => '',
			'head'             => __( 'What is Lorem Ipsum?', 'dav2' ),
			'head_color'       => '#fff',
			'text'             => __( 'Our Buyer Protection covers your purchase from click to delivery', 'dav2' ),
			'text_color'       => '#fff',
            'button_text'      => __( 'Shop now', 'dav2' ),
			'shop_now_link'    => home_url( '/product/' ),
			'shop_now_enabled' => true,
			'background'       => 'rgba(0, 0, 0, 0.6)',
		],
	],

	'features_enable'      => true,
    'features_title_color' => '#444',
    'features_text_color'  => '#444',
    'features_icon_color'  => '#999',

	'features' => [
		'tp_color_features'      => '#8c9092',
		'tp_color_head_features' => '#444',
		'item'=> [
			[
				'head' => '<b>700+</b> '. __( 'Clients Love Us!', 'dav2' ),
				'text' => __( 'We offer best service and great prices on high quality products', 'dav2' ),
			],
			[
				'head' => __( 'Shipping to', 'dav2' ) . ' <b>185</b> ' . __( 'Countries', 'dav2' ),
				'text' => __( 'Our store operates worldwide and you can enjoy free delivery of all orders', 'dav2' ),
			],
			[
				'head' => '<b>100%</b>  ' . __( 'Safe Payment', 'dav2' ),
				'text' => __( 'Buy with confidence using the world’s most popular and secure payment methods', 'dav2' ),
			],
			[
				'head' => '<b>2000+</b> ' . __( 'Successful Deliveries', 'dav2' ),
				'text' => __( 'Our Buyer Protection covers your purchase from click to delivery', 'dav2' ),
			]
		]
	],

	'most_popular_head'      => __( 'Most popular categories', 'dav2' ),
	'most_popular_fix'       => true,
	'most_popular_link_head' => home_url("/product/?orderby=orders"),
	'most_popular_list' => [
		[
			'image'    => IMG_DIR.'home/category_1.jpg',
			'name'     => __( 'Category #1', 'dav2' ),
			'color'    => '#444',
			'bg_color' => 'rgba(0,0,0,.3)',
			'link'     => '#',
		],
		[
			'image'    => IMG_DIR.'home/category_2.jpg',
			'name'     => __( 'Category #2', 'dav2' ),
			'color'    => '#444',
			'bg_color' => 'rgba(0,0,0,.3)',
			'link'     => '#',
		],
		[
			'image'    => IMG_DIR.'home/category_3.jpg',
			'name'     => __( 'Category #3', 'dav2' ),
			'color'    => '#444',
			'bg_color' => 'rgba(0,0,0,.3)',
			'link'     => '#',
		]
	],


	'tp_home_article'              => '',
	'tp_home_article_bg'           => IMG_DIR . 'css/article_bg.jpg',
    'tp_home_slider_rotating'      => true,
    'tp_home_slider_rotating_time' => 4,
    'tp_home_buttons_color'        => '#ff9841',
    'tp_home_buttons_color_hover'  => '#FF831B',
	'home_blog_enable'             => true,

	/*single product*/
	'tp_shipping_details'                => true,
    'tp_tab_item_details'                => true,
	'tp_tab_item_specifics'              => false,
	'tp_tab_shipping'                    => true,
	'tp_single_shipping_payment_content' => ads\customization\czOptions::getTemplateField( 'tm_single_shipping_payment_content' ),
	'tp_show_quantity_orders'            => true,
	'tp_pack'                            => false,
	'tp_share'                           => true,
    'tp_orders'                          => true,
	'tp_best_price_guarantee'            => true,
	'tp_comment_flag'                    => true,
    'tp_verifed'                         => true,
	'tp_tab_item_review'                 => true,
    'tp_single_buyer_protection'         => true,
    'tp_enable_leave_review_box'         => true,
    'cm_readonly'                        => false,
    'cm_readonly_notify'                 => __( 'Please accept Terms & Conditions by checking the box', 'dav2' ),
    'tp_related'                         => true,
    'tp_recently'                        => true,
    'tp_size_chart'                      => true,

    'tp_single_enable_pre_selected_variation' => true,
	'tp_single_enable_payment_icons'          => true,
	'tp_single_enable_payment_text'           => __( 'Guaranteed safe checkout', 'dav2' ),

	'single_payment_icons_1' => IMG_DIR .'icon_single/master_card.svg',
	'single_payment_icons_2' => IMG_DIR .'icon_single/visa.svg',
	'single_payment_icons_3' => IMG_DIR .'icon_single/maestro.svg',
	'single_payment_icons_4' => IMG_DIR .'icon_single/paypal.svg',
	'single_payment_icons_5' => IMG_DIR .'icon_single/american_express.svg',
	'single_payment_icons_6' => IMG_DIR .'icon_single/discover.svg',

	'tp_single_enable_why_buy_from_us' => true,
	'tp_single_enable_tab_name'        => __( 'Why Buy From Us', 'dav2' ),
	'tp_single_why_buy_content'        => ads\customization\czOptions::getTemplateField( 'tp_single_why_buy_content' ),
	'tp_single_show_random_related_products' => true,
    'add_fix' => false,
	'tp_single_stock_count'   => 15,
	'tp_single_stock_enabled' => false,
	
	/*cart*/
	'tp_phone_number_required' => false,
	'tp_description_required'  => false,
	
	'tp_paypal_info_enable' => true,
	'tp_paypal_info_text'   => __( 'You can pay with your credit card without creating a PayPal account', 'dav2' ),

	'tp_credit_card_info_enable' => true,
	'tp_credit_card_info_text'   => __( 'All transactions are secure and encrypted. Credit card information is never stored.', 'dav2' ),

	'tp_readonly_read_required'            => false,
	'tp_readonly_read_required_text'       => __( 'I have read the', 'dav2' ) . ' <a href="' . home_url( '/terms-and-conditions/' ) . '">' . __( 'Terms & Conditions', 'dav2' ) . '</a>',

	/*Checkout _sidebar*/
	'sidebar_safe_shopping_guarantee_show' => true,
	'sidebar_safe_shopping_guarantee'      => __( 'SAFE SHOPPING GUARANTEE', 'dav2' ),

    'sidebar_safe_shopping_guarantee_img_1' => IMG_DIR . 'trustf/goDaddyf.svg',
    'sidebar_safe_shopping_guarantee_img_2' => IMG_DIR . 'trustf/norton.svg',
    'sidebar_safe_shopping_guarantee_img_3' => IMG_DIR . 'trustf/sslf.svg',
	/*SEO*/

	'tp_home_seo_title'       => '',
	'tp_home_seo_description' => '',
	'tp_home_seo_keywords'    => '',

	'tp_seo_products_title'       => __( 'All products', 'Trendsway' ),
	'tp_seo_products_description' => __( 'All products – choose the ones you like and add them to your shopping cart', 'dav2' ),
	'tp_seo_products_keywords'    => '',

	/*about*/
	'tp_bg1_about'                => '',
	'tp_about_b1_title'           => __( 'About Us', 'dav2' ),
	'tp_about_b1_description'     => __( 'Welcome to', 'dav2' ) . ' ' . parse_url( ADSTM_HOME, PHP_URL_HOST ) . '. ' .
	                                 __( 'We are a team of enthusiastic developers and entrepreneurs who decided to convert their common experience into this web store. We hope you’ll like it as much as we do and have a great shopping experience here. Our prime goal is to create a shop in which you can easily find whatever product you need.', 'dav2' ),


	'tp_about_us_keep_in_contact_title'       => __( 'Keep in contact with us ', 'dav2' ),
	'tp_about_us_keep_in_contact_description' => __( "We're continually working on our online store and are open to any suggestions. If you have any questions or proposals, please do not hesitate to contact us.", 'dav2' ),

	'tp_our_core_values'          => true,
	'tp_our_partners'             => true,
	'tp_our_partners_description' => __( 'We work with the world\'s most popular and trusted companies so you can enjoy safe shopping and fast delivery.', 'dav2' ),
    'tp_our_partners_title'       => __( 'Our Partners', 'dav2' ),


	/*contact Us*/
	'tp_contactUs_text'             => __( 'Have any questions or need to get more information about the product? Either way, you’re in the right spot.', 'dav2' ),

	/*thankyou*/
	'tp_bg_thankyou'                => IMG_DIR . 'bg_page_thank.jpg',
	'tp_thankyou_fail_no_head_tag'  => '',
	'tp_thankyou_fail_no_head'      => __( 'Thank you for your order!', 'dav2' ),
	'tp_thankyou_fail_no_text'      => '<p>' . __( 'Your order was accepted and you will get notification on your email address.', 'dav2' ) .
	                                   '</p><p>*' . __( 'Please note that if you’ve ordered more than 2 items, you might not get all of them at the same time due to varying locations of our storehouses.', 'dav2' ) . '</p>',
	'tp_thankyou_fail_yes_head_tag' => '',
	'tp_thankyou_fail_yes_head'     => '<p>' . __( 'We are sorry, we were unable to successfully process this transaction.' ) . '</p>',
	'tp_thankyou_fail_yes_text'     => '',

	/*social*/
	's_title_social_box'            => __( 'join us on social media', 'dav2' ),
	's_link_fb'                     => '',
	's_fb_apiid'                    => '',
	's_fb_name_widget'              => '',

	's_link_in'       => '',
	's_in_name_api'   => '',
	's_in_name_group' => __( 'follow us on instagram', 'dav2' ),

	's_link_tw'           => '',
	's_link_pt'           => '',
	's_link_yt'           => '',
    's_link_fb_page'      => '',
    's_link_in_page'      => '',

    /*Instagram Feed*/
    'inwidget_user_id'       => '',
    'inwidget_client_id'     => '',
    'inwidget_client_secret' => '',
    'inwidget_access_token'  => '',

	/*contact form*/
	's_send_mail'         => 'support@' . parse_url(ADSTM_HOME, PHP_URL_HOST),
	's_send_from'         => 'support@' . parse_url(ADSTM_HOME, PHP_URL_HOST),

	/*subscribe*/
	'tp_subscribe'        => ads\customization\czOptions::getTemplateField( 'tp_subscribe' ),
	/*footer*/
	'tp_confidence'       => __( 'Buy with confidence:', 'dav2' ),

	'tp_confidence_img_1' => IMG_DIR . 'f5.png',
	'tp_confidence_img_2' => IMG_DIR . 'f6.png',
	'tp_confidence_img_3' => IMG_DIR . 'f7.png',
	
    'tp_enable_upbutton'  => true,
	'tp_copyright'               => __( '© Copyright {{YEAR}}. All Rights Reserved', 'dav2' ),
	'tp_address'                 => '111 Your Street, Your City, Your State 11111, Your Country',
	'tp_copyright__line'         => $_SERVER['SERVER_NAME'],
	'tp_footer_script'           => '',
	'tp_footer_payment_methods'  => true,
	'tp_payment_methods'  => __( 'Payment methods:', 'dav2' ),
	'tp_footer_payment_methods_1'  => IMG_DIR .'f1.png',
	'tp_footer_payment_methods_2'  => IMG_DIR .'f2.png',
	'tp_footer_payment_methods_3'  => IMG_DIR .'f3.png',
	'tp_footer_payment_methods_4'  => IMG_DIR .'f4.png',
	'tp_footer_payment_methods_5'  => IMG_DIR .'f9.png',
	'tp_footer_payment_methods_6'  => IMG_DIR .'f8.png',
	'tp_footer_delivery_methods' => true,


    'tp_footer_bgr_color'  => '#434343',
    'tp_footer_title_color'  => '#ffffff',
    'tp_footer_text_color'  => '#999999',
    'tp_footer_link_color'  => '#999999',
    'tp_footer_link_color_hover'  => '#ffffff',

    'tp_copyright_bgr_color'  => '#242424',
    'tp_copyright_notice_color'  => '#999999',
    'tp_copyright_domain_color'  => '#ffffff',

    'tp_footer_menu_title_1'      => 'Contact',
    'tp_footer_menu_title_2'      => 'Company info',
    'tp_footer_menu_title_3'      => 'Purchase Info',
    'tp_footer_menu_title_4'      => 'Customer Service',




	
	'tp_about_delivery_1'  => IMG_DIR .'del1.png',
	'tp_about_delivery_2'  => IMG_DIR .'del2.png',
	'tp_about_delivery_3'  => IMG_DIR .'del3.png',
	'tp_about_delivery_4'  => IMG_DIR .'del4.png',
	'tp_about_delivery_5'  => IMG_DIR .'del5.png',

	/*blog*/

    'blog_main_logos'   => TEMPLATE_URL . '/images_blog/logo.png',
    'blog_links' => '#2C91CB',
    'blog_links_hover' => '#0D6393',
    'blog_buttons' => '#444444',
    'blog_buttons_hover' => '#222222',
    'blog_banner_main'   => TEMPLATE_URL . '/images_blog/banner.jpg',
    'blog_banner_main_link' => '/',

    'blog_banner_single'   => TEMPLATE_URL . '/images_blog/5.jpg',
    'blog_banner_single_link' => '/',

    'blog_upbutton' => true,
    'tp_subscribe_blog'        => ads\customization\czOptions::getTemplateField( 'blog_subscribe' ),


    'blog_more' => '#254162',
    'blog_more_hover' => '',

	'blog_top_full_screen_block_img'   => IMG_DIR . 'blog/blog-top-full-screen-img.jpg',
	'blog_top_full_screen_block_title' => __( 'Get it first', 'dav2' ),
	'blog_top_full_screen_block_text'  =>  __( 'Sign up for awesome content and insider offers in your inbox', 'dav2' ),
	'blog_top_subscribe_form' => ads\customization\czOptions::getTemplateField( 'blog_top_subscribe_form' ),

	'blog_banner_1' => '<a href="#">
                <img src="'.IMG_DIR . 'blog/no_banner.jpg'.'">
            </a>',
	'blog_banner_mobile_show_1'=> true,
	'blog_banner_mobile_show_2'=> true,
	'blog_banner_2' => '<a href="#">
                <img src="'.IMG_DIR . 'blog/no_banner.jpg'.'">
            </a>',

	'blog_show_page_separator_1'           => false,
	'blog_page_separator_1_img_desktop'    => IMG_DIR . 'blog/blog-separator-bg-1.jpg',
	'blog_page_separator_1_img_mobile'     => IMG_DIR . 'blog/blog-separator-bg-1-mobile.jpg',
	'blog_page_separator_1_title'          => __( 'Want to go deep on a subject?', 'dav2' ),
	'blog_page_separator_1_text'           => __( 'Get amazing ideas and find true inspiration', 'dav2' ),
	'blog_page_separator_1_btn_text'       => __( 'Read more', 'dav2' ),
	'blog_page_separator_1_btn_link'       => '#',

	'blog_show_page_separator_2'           => false,
	'blog_page_separator_2_img_desktop'    => IMG_DIR . 'blog/blog-separator-bg-2.jpg',
	'blog_page_separator_2_img_mobile'     => IMG_DIR . 'blog/blog-separator-bg-2-mobile.jpg',
	'blog_page_separator_2_title'          => __( 'Get the full story', 'dav2' ),
	'blog_page_separator_2_text'           => __( 'Keep on exploring, learn more great facts', 'dav2' ),
	'blog_page_separator_2_btn_text'       => __( 'Read more', 'dav2' ),
	'blog_page_separator_2_btn_link'       => '#',

	'blog_show_bottom_subscribe'           => true,
	'blog_bottom_subscribe_title'          => __( 'Don\'t miss out!', 'dav2' ),
	'blog_bottom_subscribe_text'           => __( 'Be the first to find out about flash sales and online exclusives', 'dav2' ),
	'blog_bottom_subscribe_btn_text'       => __( 'Subscribe', 'dav2' )
];