<?php
/**
 * User: Vitaly Kukin
 * Date: 28.03.2016
 * Time: 15:55
 */

if( ! function_exists( 'ads_sql_list' ) ) {

	function ads_sql_list() {

	    global $wpdb;

		$charset_collate = $wpdb->get_charset_collate();

	    return [

	        "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}ads_products (
	            `id` BIGINT(20) unsigned NOT NULL AUTO_INCREMENT,
	            `post_id` BIGINT(20) unsigned NOT NULL,
	            `imageUrl` VARCHAR(255) DEFAULT NULL,
	            `price` DECIMAL(10,2) DEFAULT '0.00',
	            `priceMax` DECIMAL(10,2) DEFAULT '0.00',
	            `salePrice` DECIMAL(10,2) DEFAULT '0.00',
	            `salePriceMax` DECIMAL(10,2) DEFAULT '0.00',
	            `discount` INT(3) DEFAULT '0',
	            `countReview` INT(11) DEFAULT '0',
	            `packageType` ENUM('lot','piece') DEFAULT 'piece',
	            `evaluateScore` DECIMAL(2,1) DEFAULT '0',
				`quantity` INT(11) unsigned DEFAULT '0',
				`promotionVolume` INT(11) unsigned DEFAULT '0',
				`currency` CHAR(4) DEFAULT 'USD',
	            PRIMARY KEY (`id`),
	            KEY (`post_id`),
	            KEY (`evaluateScore`)
		    ) {$charset_collate};",

	        "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}ads_products_meta (
	            `id` BIGINT(20) unsigned NOT NULL AUTO_INCREMENT,
	            `post_id` BIGINT(20) unsigned NOT NULL,
	            `gallery` TEXT DEFAULT NULL,
	            `shipping` VARCHAR(255) DEFAULT NULL,
	            `lotNum` INT(11) unsigned DEFAULT '0',
	            `pack` TEXT DEFAULT NULL,
	            `sku` TEXT DEFAULT NULL,
	            `skuAttr` LONGTEXT DEFAULT NULL,
	            `sizeAttr` LONGTEXT DEFAULT NULL,
	            `seo_keywords` VARCHAR(255) DEFAULT NULL,
	            `seo_description` VARCHAR(255) DEFAULT NULL,
	            `seo_title` VARCHAR(255) DEFAULT NULL,
	            `links` TEXT DEFAULT NULL,
	            PRIMARY KEY (`id`),
	            KEY (`post_id`)
		    ) {$charset_collate};",

	        "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}ads_attributes (
	            `id` BIGINT(20) unsigned NOT NULL AUTO_INCREMENT,
	            `post_id` BIGINT(20) unsigned NOT NULL,
	            `attr_name` VARCHAR(40) DEFAULT NULL,
	            `attr_value` VARCHAR(255) DEFAULT NULL,
	            PRIMARY KEY (`id`),
	            KEY (`post_id`),
	            KEY (`attr_name`)
		    ) {$charset_collate};",

	        "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}ads_ali_meta (
	            `id` BIGINT(20) unsigned NOT NULL AUTO_INCREMENT,
	            `post_id` BIGINT(20) unsigned NOT NULL,
	            `product_id` VARCHAR(20) NOT NULL,
	            `origPrice` DECIMAL(10,2) DEFAULT '0.00',
	            `origPriceMax` DECIMAL(10,2) DEFAULT '0.00',
	            `origSalePrice` DECIMAL(10,2) DEFAULT '0.00',
	            `origSalePriceMax` DECIMAL(10,2) DEFAULT '0.00',
	            `productUrl` VARCHAR(255) DEFAULT NULL,
	            `feedbackUrl` VARCHAR(255) DEFAULT NULL,
	            `storeUrl` VARCHAR(255) DEFAULT NULL,
	            `storeName` VARCHAR(255) DEFAULT NULL,
	            `storeRate` VARCHAR(255) DEFAULT NULL,
	            `adminDescription` TEXT DEFAULT NULL,
	            `skuOriginaAttr` LONGTEXT DEFAULT NULL,
	            `skuOriginal` LONGTEXT DEFAULT NULL,
	            `countries` TEXT DEFAULT NULL,
	            `currencyCode` CHAR(4) DEFAULT 'USD',
	            `needUpdate` TINYINT(1) DEFAULT 1,
	            PRIMARY KEY (`id`),
	            KEY (`post_id`),
	            KEY (`product_id`)
		    ) {$charset_collate};",

	        "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}ads_categories (
	            `id` BIGINT(20) unsigned NOT NULL AUTO_INCREMENT,
	            `term_id` BIGINT(20) unsigned NOT NULL,
	            `title` VARCHAR(255) DEFAULT NULL,
	            `seo_title` VARCHAR(255) DEFAULT NULL,
	            `seo_description` TEXT DEFAULT NULL,
	            `seo_keywords` TEXT DEFAULT NULL,
	            PRIMARY KEY (`id`),
	            KEY (`term_id`)
		    ) {$charset_collate};",

	        "CREATE TABLE IF NOT EXISTS `{$wpdb->base_prefix}ads_orders_item` (
	            `id` BIGINT(20) unsigned NOT NULL AUTO_INCREMENT,
	            `trans_id` BIGINT(20) unsigned NOT NULL,
	            `productId` BIGINT(20) unsigned NOT NULL,
	            `title` VARCHAR(255) DEFAULT NULL,
	            `price` DECIMAL(10,2) NOT NULL,
	            `quantity` INT(11) DEFAULT '1',
	            `tip` VARCHAR(255) DEFAULT NULL,
	            `delivery` VARCHAR(255) DEFAULT NULL,
	            `tracking_status` VARCHAR(255) DEFAULT NULL,
	            `order_number` VARCHAR(255) DEFAULT NULL,
	            `shipping_status` VARCHAR(40) DEFAULT NULL,
	            `shipping_method` VARCHAR(40) DEFAULT 'free', 
	            `shipping_price` DECIMAL(10,2) DEFAULT 0,
	            `details` TEXT DEFAULT NULL,
	            `item_detail` TEXT DEFAULT NULL,
	            PRIMARY KEY (`id`),
	            KEY (`productId`),
	            KEY (`trans_id`)
		    ) {$charset_collate};",

	        "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}payment_transaction (
	            `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
	            `user_id` BIGINT(20) DEFAULT '0',
	            `hash` VARCHAR(255) NOT NULL,
	            `tnx_id` VARCHAR(255) NOT NULL,
	            `status` VARCHAR(15) DEFAULT 'abandoned',
	            `fulfillment` VARCHAR(15) DEFAULT 'not_processed',
	            `type` VARCHAR(20) NOT NULL,
			    `payment_type` ENUM('express','standard') DEFAULT 'standard',
			    `payment_details` TEXT DEFAULT NULL,
	            `prod_type` VARCHAR(20) DEFAULT NULL,
	            `email` VARCHAR(255) DEFAULT NULL,
	            `title` VARCHAR(255) DEFAULT NULL,
	            `description` TEXT DEFAULT NULL,
	            `amount` DECIMAL(12,2) DEFAULT '0',
	            `amount_clean` DECIMAL(12,2) DEFAULT '0',
	            `amount_shipping` DECIMAL(12,2) DEFAULT '0',
	            `amount_purchase` DECIMAL(12,2) DEFAULT '0',
	            `tax` LONGTEXT DEFAULT NULL,
	            `currency_code` CHAR(4) DEFAULT NULL,
	            `date` DATETIME DEFAULT '0000-00-00 00:00:00',
	            `date_update` DATETIME DEFAULT '0000-00-00 00:00:00',
	            `details` TEXT DEFAULT NULL,
	            `discount_code` VARCHAR(255) DEFAULT NULL,
	            `discount_info` VARCHAR(255) DEFAULT NULL,
	            `trash` INT(1) NOT NULL DEFAULT '0',
	            `full_name` VARCHAR(255) DEFAULT NULL,
	            `address` TEXT DEFAULT NULL,
	            `city` VARCHAR(255) DEFAULT NULL,
	            `country` VARCHAR(10) DEFAULT NULL,
	            `state` VARCHAR(255) DEFAULT NULL,
	            `postal_code` VARCHAR(20) DEFAULT NULL,
	            `phone_number` VARCHAR(255) DEFAULT NULL,
	            `basket` TEXT DEFAULT NULL,
	            `billing_address` TEXT DEFAULT NULL,
	            PRIMARY KEY (`id`),
	            KEY(`user_id`),
	            KEY(`hash` (100)),
	            KEY(`tnx_id` (100)),
	            KEY status (`status`, `fulfillment` (15))
	        ) {$charset_collate};",

	        "CREATE TABLE IF NOT EXISTS `{$wpdb->prefix}payment_discount` (
	            `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
	            `code` VARCHAR(255) NOT NULL,
	            `type` VARCHAR(20) DEFAULT NULL,
	            `prod_type` VARCHAR(20) DEFAULT NULL,
	            `applyto` TEXT DEFAULT NULL,
	            `value` DECIMAL(12,2) DEFAULT '0',
	            `date` INT(10) DEFAULT NULL,
	            `date_active` INT(10) DEFAULT NULL,
	            `count` INT(10) DEFAULT '0',
	            `count_max` INT(10) DEFAULT '0',
	            `status` INT(1) DEFAULT '0',
	            `never_expires` INT(1) DEFAULT '0',
	            `tickbox` INT(1) DEFAULT '0',
	            `tickbox_value` DECIMAL(12,2) DEFAULT '0',
	            `tickbox_auto` INT(1) DEFAULT '0',
	            PRIMARY KEY (`id`)
	        ) {$charset_collate};",

	        "CREATE TABLE IF NOT EXISTS `{$wpdb->prefix}ads_activities` (
	            `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
	            `post_id` BIGINT(20) unsigned NOT NULL,
	            `hash` VARCHAR(255) DEFAULT NULL,
	            `product_data` TEXT DEFAULT NULL,
	            `type` VARCHAR(20) DEFAULT NULL,
	            `date` DATETIME DEFAULT '0000-00-00 00:00:00',
	            `anonce` VARCHAR(255) DEFAULT NULL,
	            `trouble` VARCHAR(40) DEFAULT NULL,
	            `status` VARCHAR(20) DEFAULT NULL,
	            PRIMARY KEY (`id`)
	        ) {$charset_collate};",

	        "CREATE TABLE IF NOT EXISTS `{$wpdb->prefix}ads_search_analytics` (
	            `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
	            `search` VARCHAR(255) NOT NULL,
	            `q` INT(10) DEFAULT 0,
	            `date` DATETIME DEFAULT CURRENT_TIMESTAMP,
	            PRIMARY KEY (`id`),
	            KEY(`search`)
	        ) {$charset_collate};",

            "CREATE TABLE IF NOT EXISTS `{$wpdb->prefix}ads_task_upload_images` (	            
	            `post_id` BIGINT(20) UNSIGNED NOT NULL,
	            `product_id` VARCHAR(20) NOT NULL,
	            `links` TEXT DEFAULT NULL,
	            `count` SMALLINT(5) UNSIGNED DEFAULT NULL,	            
	            PRIMARY KEY (`post_id`),
	            KEY (`product_id`)
		    ) {$charset_collate};"
	    ];
	}
}
