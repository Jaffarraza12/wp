<?php
/**
 *	Plugin Name: AliDropship Plugin
 *	Plugin URI: https://alidropship.com/
 *	Description: AliDropship is a WordPress plugin created for AliExpress Drop Shipping
 *	Version: 1.7.12
 *	Text Domain: ads
 *	Requires at least: WP 5.2.3
 *	Author: Vitaly Kukin & Yaroslav Nevskiy & Pavel Shishkin
 *	Author URI: https://yellowduck.me/
 *	License: SHAREWARE
 */

if ( ! defined( 'ADS_VERSION' ) ) define( 'ADS_VERSION', '1.7.12' );
if ( ! defined( 'ADS_PATH' ) )    define( 'ADS_PATH', plugin_dir_path( __FILE__ ) );
if ( ! defined( 'ADS_URL' ) )     define( 'ADS_URL', str_replace( [ 'https:', 'http:' ], '', plugins_url( 'alids' ) ) );
if ( ! defined( 'ADS_CODE' ) )    define( 'ADS_CODE', 'ion72' );
if ( ! defined( 'ADS_ERROR' ) )   define( 'ADS_ERROR', ads_check_server() );

function ads_check_server() {

	if( version_compare( '7.1', PHP_VERSION, '>' ) )
		return sprintf(
		    'PHP Version is not suitable. You need version 7.1+. %s',
            '<a href="https://alidropship.com/codex/6-install-ioncube-loader-hosting/" target="_blank">Learn more</a>.'
        );

	$ion_args = [ 'ion71' => '7.1', 'ion72' => '7.2' ];
	$ver      = explode( '.', PHP_VERSION );
	$version  = PHP_MAJOR_VERSION . '.' . PHP_MINOR_VERSION . '.' . PHP_RELEASE_VERSION;
	$ion_pref = 'ion' . $ver[ 0 ] . $ver[ 1 ];
    
    if( $ion_pref != ADS_CODE && $ver[ 0 ] . $ver[ 1 ] < 73 )
        return sprintf(
            'You installed AliDropship plugin for PHP %1$s, but your version of PHP is %2$s.' . ' ' .
            'Please <a href="%3$s" target="_blank">download</a> and install AliDropship plugin for PHP %2$s.',
            isset( $ion_args[ ADS_CODE ] ) ? $ion_args[ ADS_CODE ] : 'Unknown',
            $version,
            'https://alidropship.com/updates-plugin/'
        );
	
	$extensions = get_loaded_extensions();

	$key = 'ionCube Loader';

	if ( ! in_array( $key, $extensions ) )
        return sprintf(
            '%s Loader not found. Alidropship plugin can\'t be activated. %s', $key,
            '<a href="https://alidropship.com/codex/6-install-ioncube-loader-hosting/" target="_blank">
                Please check instructions
            </a>.'
        );
	
	$plugins_local = apply_filters( 'active_plugins', (array) get_option( 'active_plugins', [] ) );
	
	if( in_array( 'alidswoo/alidswoo.php', $plugins_local ) ) {
		
		return 'AliDropship plugin is not compatible with AliDropship Woo plugin. You need to deactivate and delete AliDropship Woo plugin.';
	}
	
	if( in_array( 'woocommerce/woocommerce.php', $plugins_local ) ) {
		
		return sprintf(
			'If you use WooCommerce please <a href="%1$s" target="_blank">download</a> and install AliDropship Woo plugin version for PHP %2$s',
			'https://alidropship.com/updates-plugin/',
            $version
		);
	}
	
	return false;
}

function ads_admin_notice__error() {

	$check = ads_check_server();

	if( $check ) {

		$class = 'notice notice-error';
		$message = __( 'AliDropship plugin alert: Error!', 'ads' ) . ' ' . $check;

		printf( '<div class="%1$s"><p>%2$s</p></div>', $class, $message );
	}
	
	if( defined( 'DM_VERSION' ) ) {
        printf(
            '<div class="notice notice-warning"><p>%s <strong>%s</strong>%s</p></div>',
            __( 'AliDropship plugin alert:', 'ads' ),
            __( 'Duplicate function has been found: please deactivate and uninstall DropshipMe plugin.', 'ads' ),
            __( 'You are trying to install AliDropship and DropshipMe plugins together.', 'ads' ) . ' ' .
            __( 'Note that AliDropship includes DropshipMe database and functions.', 'ads' )
        );
    }
}
add_action( 'admin_notices', 'ads_admin_notice__error' );

/**
 * Localization
 */
function ads_lang_init() {
	
	load_plugin_textdomain( 'ads' );
}
add_action( 'init', 'ads_lang_init' );

if( is_admin() ) :

	require( ADS_PATH . 'core/setup.php');

    register_activation_hook( __FILE__, 'ads_lang_init' );
	register_activation_hook( __FILE__, 'ads_install' );
	register_activation_hook( __FILE__, 'ads_activate' );

endif;

if( ! ADS_ERROR ) {
    
    require( ADS_PATH . 'core/filters.php' );
    require( ADS_PATH . 'core/core.php' );
    require( ADS_PATH . 'core/init.php' );
    require( ADS_PATH . 'admin/cron.php' );
    require( ADS_PATH . 'core/17track.php' );
    require( ADS_PATH . 'core/payments.php' );
    require( ADS_PATH . 'core/handlersFront.php' );
    require( ADS_PATH . 'core/seositemap.php' );
    require( ADS_PATH . 'core/handlersActions.php' );
    
    require( ADS_PATH . 'core/searchFront.php' );
    require( ADS_PATH . 'core/customization/field.php' );
    require( ADS_PATH . 'core/customization/old_cart.php' );
    require( ADS_PATH . 'core/customization/old_thankyou.php' );
    require( ADS_PATH . 'core/customization/old_blog.php' );
    require( ADS_PATH . 'core/customization/old_acc.php' );
    
    function ads_init_customization()
    {
        require( ADS_PATH . 'core/customization/cart.php' );
        require( ADS_PATH . 'core/customization.php' );
        
    }
    
    add_action( 'cz_menu_init', 'ads_init_customization' );
    
    //TODO Удалить после замены старой кастомизации в темах
    if ( ! function_exists( 'cz' ) ) {
        function cz( $name ) {
            global $cz_data;
            
            return isset( $cz_data[ $name ] ) ? $cz_data[ $name ] : '';
        }
        
    }

	if ( is_admin() ) :
		require( ADS_PATH . 'core/controller.php' );
	endif;

	require( ADS_PATH . 'core/front/breadcrumbs.php' );
}