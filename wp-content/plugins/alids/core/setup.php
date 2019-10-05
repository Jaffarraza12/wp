<?php

/**
 * Setup the plugin
 */
function ads_install() {

	require( ADS_PATH . 'core/sql.php' );

	require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

	foreach( ads_sql_list() as $key ) {
		dbDelta($key);
    }
	
	ads_maybe_add_columns();

	ads_alter_transact();

    update_option( 'comments_notify', '' );
    update_option( 'moderation_notify', '' );
	update_option( 'ads-version', ADS_VERSION  );

    adsSetFrontPage();

	add_rewrite_rule( '^oauth1/extension/?$','index.php?rest_oauth1=extension','top' );

	flush_rewrite_rules();
}

function adsSetFrontPage() {

    update_option( 'show_on_front', 'page' );

    $home = get_page_by_path( 'home' );

    if ( $home ) {
        $id = $home->ID;
    } else {
        $id = wp_insert_post( [
            'post_type'    => 'page',
            'post_title'   => __( 'Home', 'ads' ),
            'post_name'    => 'home',
            'post_content' => '',
            'post_status'  => 'publish',
            'post_author'  => 1,
        ] );
    }

    update_option( 'page_on_front', $id );

    $blog = get_page_by_path( 'blog' );

    if ( $blog ) {
        $id = $blog->ID;
    } else {
        $id = wp_insert_post( [
            'post_type'    => 'page',
            'post_title'   => __('Blog', 'ads'),
            'post_name'    => 'blog',
            'post_content' => '',
            'post_status'  => 'publish',
            'post_author'  => 1,
        ] );
    }

    update_option( 'page_for_posts', $id );
}

function ads_maybe_add_columns() {
	
	global $wpdb;

	$args = [
		'payment_discount' => [
			'applyto'       => "ALTER TABLE `{$wpdb->prefix}payment_discount` ADD `applyto` TEXT DEFAULT NULL;",
			'tickbox'       => "ALTER TABLE `{$wpdb->prefix}payment_discount` ADD `tickbox` INT(1) DEFAULT '0';",
			'tickbox_value' => "ALTER TABLE `{$wpdb->prefix}payment_discount` ADD `tickbox_value` DECIMAL(12,2) DEFAULT '0';",
			'tickbox_auto'  => "ALTER TABLE `{$wpdb->prefix}payment_discount` ADD `tickbox_auto` INT(1) DEFAULT '0';"
		],
		'ads_products_meta' => [
			'links' => "ALTER TABLE `{$wpdb->prefix}ads_products_meta` ADD `links` TEXT DEFAULT NULL;",
			'sizeAttr' => "ALTER TABLE `{$wpdb->prefix}ads_products_meta` ADD `sizeAttr` LONGTEXT DEFAULT NULL;",
        
        ],
        'ads_orders_item' => [
            'item_detail'     => "ALTER TABLE `{$wpdb->prefix}ads_orders_item` ADD `item_detail` TEXT DEFAULT NULL;",
            'delivery'        => "ALTER TABLE `{$wpdb->prefix}ads_orders_item` ADD `delivery` VARCHAR(255) DEFAULT NULL;",
            'tracking_status' => "ALTER TABLE `{$wpdb->prefix}ads_orders_item` ADD `tracking_status` VARCHAR(255) DEFAULT NULL;"
        ],
		'ads_ali_meta' => [
			'skuOriginal' => "ALTER TABLE `{$wpdb->prefix}ads_ali_meta` ADD `skuOriginal` LONGTEXT DEFAULT NULL;"
		],
		'payment_transaction' => [
			'basket'          => "ALTER TABLE `{$wpdb->prefix}payment_transaction` ADD `basket` TEXT DEFAULT NULL;",
			'fulfillment'     => "ALTER TABLE `{$wpdb->prefix}payment_transaction` ADD `fulfillment` VARCHAR(15) DEFAULT 'not_processed';",
			'amount_shipping' => "ALTER TABLE `{$wpdb->prefix}payment_transaction` ADD `amount_shipping` DECIMAL(12,2) DEFAULT NULL ;",
			'tax'             => "ALTER TABLE `{$wpdb->prefix}payment_transaction` ADD `tax` LONGTEXT DEFAULT NULL;",
			'amount_purchase' => "ALTER TABLE `{$wpdb->prefix}payment_transaction` ADD `amount_purchase` DECIMAL(12,2) DEFAULT NULL ;",
			'billing_address' => "ALTER TABLE `{$wpdb->prefix}payment_transaction` ADD `billing_address` TEXT DEFAULT NULL;"
		],
		'ads_activities' => [
			'hash' => "ALTER TABLE `{$wpdb->prefix}ads_activities` ADD hash VARCHAR(255) DEFAULT NULL",
			'trouble' => "ALTER TABLE `{$wpdb->prefix}ads_activities` ADD trouble VARCHAR(40) DEFAULT NULL"
		]
	];

	foreach( $args as $key => $val ) {
		
		$result = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT *
			 	 FROM `information_schema`.`COLUMNS`
			 	 WHERE `TABLE_SCHEMA` = '%s' AND `TABLE_NAME` = '{$wpdb->prefix}{$key}'",
				DB_NAME
			)
		);
		
		$col = [];
		if( count($result) > 0 ) foreach( $result as $column ) {
			$col[] = $column->COLUMN_NAME;
		}
		
		if( count($col) > 0 ) foreach( $val as $k => $v ) {
			if( ! in_array( $k, $col ) )
				$wpdb->query( $v );
		}
	}
}

function ads_alter_transact() {

	global $wpdb;

    $row = $wpdb->get_var(
        $wpdb->prepare(
            "SELECT DATA_TYPE
             FROM `information_schema`.`COLUMNS`
             WHERE `TABLE_SCHEMA` = '%s' AND COLUMN_NAME = 'status'
             AND `TABLE_NAME` = '{$wpdb->prefix}payment_transaction'",
            DB_NAME
        )
    );

    if( ! empty( $row ) && $row == 'enum' ) {

        $charset_collate = $wpdb->get_charset_collate();
        $charset_collate = str_replace('DEFAULT', '', $charset_collate);

        $wpdb->query(
        	"ALTER TABLE `{$wpdb->prefix}payment_transaction` 
				CHANGE `status` `status` VARCHAR(15) {$charset_collate} DEFAULT 'abandoned'");

        $wpdb->query(
        	"ALTER TABLE `{$wpdb->prefix}payment_transaction` ADD KEY status (`status`, `fulfillment` (15))");
    }
}

/**
 * Check installed plugin
 */
function ads_installed() {

	if( ! current_user_can( 'install_plugins' ) ) {
        return;
    }

	if ( get_option( 'ads-version', 0 ) < ADS_VERSION ) {
		ads_install();
    }
}
add_action( 'admin_init', 'ads_installed' );

/**
 * When activate plugin
 */
function ads_activate() {

	ads_installed();

	do_action( 'ads_activate' );
}

/**
 * When deactivate plugin
 */
function ads_deactivate() {

	do_action( 'ads_deactivate' );
}
