<?php
/**
 * Created by PhpStorm.
 * User: pavel
 * Date: 09.09.2015
 * Time: 8:51
 */

function dav2_create_pages() {

    global $wp_rewrite;

    if ( isset( $_POST[ 'tp_create' ] ) && $_POST[ 'tp_create' ] == true && is_admin() ) {
    	
        update_option( 'posts_per_rss', 20 );
        update_option( 'posts_per_page', 20 );
        update_option( 'show_on_front', 'page' );
        update_option( 'comments_per_page', 25 );
        update_option( 'page_comments', 1 );

        wp_delete_post(1, true );
        wp_delete_post(2, true );
        wp_delete_post(3, true );

        
        $wp_rewrite->set_permalink_structure( '/%postname%/' );

	    $pageObj = new dav2_PageTemplate();
	    $pageObj->addPage( [ 'title' => __( 'Home', 'dav2' ), 'post_name' => 'home', 'static' => 'front' ] );
	    $pageObj->addPage( [ 'title' => __( 'Blog', 'dav2' ), 'post_name' => 'blog', 'static' => 'posts' ] );

	    $pageObj->addPage( [ 'title' => __( 'Subscription', 'dav2' ), 'post_name' => 'subscription' ] );
	    $pageObj->addPage( [ 'title' => __( 'Thank you', 'dav2' ), 'post_name' => 'thank-you-contact' ] );
	    $pageObj->addPage( [ 'title' => __( 'Payment methods', 'dav2' ), 'post_name' => 'payment-methods' ] );
	    $pageObj->addPage( [ 'title' => __( 'Shipping & Delivery', 'dav2' ), 'post_name' => 'shipping-delivery' ] );
	    $pageObj->addPage( [ 'title' => __( 'About Us', 'dav2' ), 'post_name' => 'about-us' ] );
	    $pageObj->addPage( [ 'title' => __( 'Contact Us', 'dav2' ), 'post_name' => 'contact-us' ] );
	    $pageObj->addPage( [ 'title' => __( 'Privacy Policy', 'dav2' ), 'post_name' => 'privacy-policy' ] );
	    $pageObj->addPage( [ 'title' => __( 'Terms and Conditions', 'dav2' ), 'post_name' => 'terms-and-conditions' ] );
	    $pageObj->addPage( [ 'title' => __( 'Refunds & Returns Policy', 'dav2' ), 'post_name' => 'refund-policy' ] );
	    $pageObj->addPage( [ 'title' => __( 'Frequently Asked Questions', 'dav2' ), 'post_name' => 'frequently-asked-questions' ] );
	    $pageObj->addPage( [ 'title' => __( 'Track your order', 'dav2' ), 'post_name' => 'track-your-order' ] );
	    $pageObj->addPageContent( [ 'title' => __( 'Account', 'dav2' ), 'post_name' => 'account', 'content' => '[ads_account]' ] );
	    $pageObj->addPageContent( [ 'title' => __( 'Orders', 'dav2' ), 'post_name' => 'orders', 'content' => '[ads_orders]' ] );

	    $pageObj->addPage( [ 'title' => __( 'Your shopping cart', 'dav2' ), 'post_name' => 'cart' ] );
	    $pageObj->addPage( [ 'title' => __( 'Thank you page', 'dav2' ), 'post_name' => 'thankyou' ] );

	    $pageObj->create();

	    createMenu( [
		    [ 'title' => __( 'Home', 'dav2' ), 'url' => '/' ],
	        [ 'title' => __( 'Products', 'dav2' ), 'url' => '/product/' ],
	        [ 'title' => __( 'Shipping', 'dav2' ), 'url' => '/shipping-delivery/' ],
	        [ 'title' => __( 'Returns', 'dav2' ), 'url' => '/refund-policy/' ],
	        [ 'title' => __( 'About', 'dav2' ), 'url' => '/about-us/' ],
	        [ 'title' => __( 'Tracking', 'dav2' ), 'url' => '/track-your-order/' ],
	        [ 'title' => __( 'Contact', 'dav2' ), 'url' => '/contact-us/' ]
	    ], 'Top Menu', 'top_menu' );

	    createMenu( [
		    [ 'title' => __( 'About Us', 'dav2' ), 'url' => '/about-us/' ],
		    [ 'title' => __( 'Privacy Policy', 'dav2' ), 'url' => '/privacy-policy/' ],
		    [ 'title' => __( 'Terms & Conditions', 'dav2' ), 'url' => '/terms-and-conditions/' ]
	    ], 'Company Info', 'footer-company' );

	    createMenu( [
		    [ 'title' => __( 'Payment Methods', 'dav2' ), 'url' => '/payment-methods/' ],
		    [ 'title' => __( 'Shipping & Delivery', 'dav2' ), 'url' => '/shipping-delivery/' ],
		    [ 'title' => __( 'Returns Policy', 'dav2' ), 'url' => '/refund-policy/' ]
	    ], 'Purchase info', 'footer-purchase' );
	    
        createMenu( [
	        [ 'title' => __( 'Contact Us', 'dav2' ), 'url' => '/contact-us/' ],
	        [ 'title' => __( 'Frequently Asked Questions', 'dav2' ), 'url' => '/frequently-asked-questions/' ]
        ], 'Customer service', 'footer-service' );
        
        add_action( 'init', 'createCategoryProduct', 10, [
	        [ 'title' => __( 'Costumes', 'dav2' ), 'url' => '/costumes/', 'slug' => 'costumes' ],
	        [ 'title' => __( 'Custom category', 'dav2' ), 'url' => '/custom-category/', 'slug' => 'custom-category' ],
	        [ 'title' => __( 'Gifts', 'dav2' ), 'url' => '/gifts/', 'slug' => 'gifts' ],
	        [ 'title' => __( 'Jewelry', 'dav2' ), 'url' => '/jewelry/', 'slug' => 'jewelry' ],
	        [ 'title' => __( 'Men clothing', 'dav2' ), 'url' => '/men-clothing/', 'slug' => 'men-clothing' ],
	        [ 'title' => __( 'Phone cases', 'dav2' ), 'url' => '/phone-cases/', 'slug' => 'phone-cases' ],
	        [ 'title' => __( 'Posters', 'dav2' ), 'url' => '/posters/', 'slug' => 'posters' ],
	        [ 'title' => __( 'T-shirts', 'dav2' ), 'url' => '/t-shirts/', 'slug' => 't-shirts' ],
	        [ 'title' => __( 'Toys', 'dav2' ), 'url' => '/toys/', 'slug' => 'toys' ],
	        [ 'title' => __( 'Women clothing', 'dav2' ), 'url' => '/women-clothing/', 'slug' => 'women-clothing' ]
        ] );
        
        createMenu( [
	        [ 'title' => __( 'Costumes', 'dav2' ), 'url' => '/costumes/' ],
	        [ 'title' => __( 'Custom category', 'dav2' ), 'url' => '/custom-category/' ],
	        [ 'title' => __( 'Gifts', 'dav2' ), 'url' => '/gifts/' ],
	        [ 'title' => __( 'Jewelry', 'dav2' ), 'url' => '/jewelry/' ],
	        [ 'title' => __( 'Men clothing', 'dav2' ), 'url' => '/men-clothing/' ],
	        [ 'title' => __( 'Phone cases', 'dav2' ), 'url' => '/phone-cases/' ],
	        [ 'title' => __( 'Posters', 'dav2' ), 'url' => '/posters/' ],
	        [ 'title' => __( 'T-shirts', 'dav2' ), 'url' => '/t-shirts/' ],
	        [ 'title' => __( 'Toys', 'dav2' ), 'url' => '/toys/' ],
	        [ 'title' => __( 'Women clothing', 'dav2' ), 'url' => '/women-clothing/' ]
        ], 'Main menu', 'category' );

    }
}
add_action( 'admin_init', 'dav2_create_pages' );

function createCategoryProduct() {
	
	$category   = [
		[ 'title' => __( 'Costumes', 'dav2' ), 'url' => '/costumes/', 'slug' => 'costumes' ],
		[ 'title' => __( 'Custom category', 'dav2' ), 'url' => '/custom-category/', 'slug' => 'custom-category' ],
		[ 'title' => __( 'Gifts', 'dav2' ), 'url' => '/gifts/', 'slug' => 'gifts' ],
		[ 'title' => __( 'Jewelry', 'dav2' ), 'url' => '/jewelry/', 'slug' => 'jewelry' ],
		[ 'title' => __( 'Men clothing', 'dav2' ), 'url' => '/men-clothing/', 'slug' => 'men-clothing' ],
		[ 'title' => __( 'Phone cases', 'dav2' ), 'url' => '/phone-cases/', 'slug' => 'phone-cases' ],
		[ 'title' => __( 'Posters', 'dav2' ), 'url' => '/posters/', 'slug' => 'posters' ],
		[ 'title' => __( 'T-shirts', 'dav2' ), 'url' => '/t-shirts/', 'slug' => 't-shirts' ],
		[ 'title' => __( 'Toys', 'dav2' ), 'url' => '/toys/', 'slug' => 'toys' ],
		[ 'title' => __( 'Women clothing', 'dav2' ), 'url' => '/women-clothing/', 'slug' => 'women-clothing' ]
	];
	
	foreach ( $category as $key => $item ) {
		wp_insert_term( $item[ 'title' ], 'product_cat', [
			'description' => '',
			'slug'        => $item[ 'slug' ],
			'parent'      => 0
		] );
	}
}

/**
 * @param $memu
 * @param $menu_name
 * @param bool|string $location
 *
 * @return bool
 */
function createMenu( $memu, $menu_name, $location = false ) {
	
	$menu_exists = wp_get_nav_menu_object( $menu_name );
	if ( !$menu_exists ) {
		$menu_id = wp_create_nav_menu( $menu_name );

		if ( $location ) {
			$locations              = get_theme_mod( 'nav_menu_locations' );
			$locations[ $location ] = $menu_id;
			set_theme_mod( 'nav_menu_locations', $locations );
		}

		foreach ( $memu as $key => $item ) {
			wp_update_nav_menu_item( $menu_id, 0, [
				'menu-item-title'    => $item[ 'title' ],
				'menu-item-position' => $key,
				'menu-item-url'      => home_url( $item[ 'url' ] ),
				'menu-item-status'   => 'publish'
			] );
		}

		return true;
	}

	return false;
}

class dav2_PageTemplate {
	
	private $_pages = [];

	public function __construct() {}

	/**
	 * @param $page
	 * @throws Exception
	 */
	public function addPage( $page ) {

		if ( empty( $page[ 'post_name' ] ) )
			throw new Exception( 'no post_name' );

		$page[ 'content' ] = $this->getContent( $page[ 'post_name' ] );

		array_push( $this->_pages, $page );
	}

	/**
	 * addPageContent
	 *
	 * @param object $pageObj
	 * @throws Exception
	 */
	public function addPageContent( $pageObj ) {
		
		if( empty( $pageObj[ 'post_name' ] ) ) {
			throw new Exception( 'no post_name' );
		}

		if( empty( $pageObj[ 'content' ] ) ) {
			throw new Exception(' no post_content' );
		}

		array_push( $this->_pages, $pageObj );
	}

	public function create() {
		
		foreach ( $this->_pages as $page ) {

			$new_page = [
				'post_type'    => 'page',
				'post_title'   => $page[ 'title' ],
				'post_name'    => $page[ 'post_name' ],
				'post_content' => $page[ 'content' ],
				'post_status'  => 'publish',
				'post_author'  => 1,
			];

			if ( !$this->issetPage( $page[ 'post_name' ] ) ) {
				$id = wp_insert_post( $new_page );
				if ( isset( $page[ 'static' ] ) && $page[ 'static' ] == 'front' ) update_option( 'page_on_front', $id );
				if ( isset( $page[ 'static' ] ) && $page[ 'static' ] == 'posts' ) update_option( 'page_for_posts', $id );
			}
		}
	}

	/**
	 * @param $slug
	 * @return bool
	 */
	private function issetPage( $slug ) {
		
		$page_check = new WP_Query( [
			'pagename' => $slug
		] );
		
		if ( $page_check->post ) return true;

		return false;
	}

	/**
	 * @param $pagename
	 * @return mixed|string
	 */
	private function getContent( $pagename ) {
		
		$file = dirname( __FILE__ ) . '/pages_default/' . $pagename . '.php';
		if ( file_exists( $file ) ) {
			ob_start();
			include( $file );
			$text = ob_get_contents();
			ob_end_clean();

			return $text;
		}

		return '';
	}
}