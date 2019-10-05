<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'trendswa_y' );

/** MySQL database username */
define( 'DB_USER', 'trendswa_y' );

/** MySQL database password */
define( 'DB_PASSWORD', 'Dl1fJgy4RTS]' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'Jl$|<B|n!;QuOZ;$m3v0yeOWf{Lf50ae#=M4w&s}x;+V%viW*V@`JbQD5{S=y)r;' );
define( 'SECURE_AUTH_KEY',  '2&E5HP_FA/ruQi?4 qt/Keb4Nanw5uyiJtw|(:CTq6#D;)4|}7_T(ou!c1D7aVND' );
define( 'LOGGED_IN_KEY',    'C0]>!uS>6Z9a{H.?q3Y@8)KaTlz<))#a6_oGb-P3v[hl&~~ hckv^elz?FwxXtVK' );
define( 'NONCE_KEY',        'W_sKcN[#0b<`KbNJjf#csA TReKr~NFKHCIdE19O!.@l&XU|:JfOG7eAeR[H7v3C' );
define( 'AUTH_SALT',        '*D7Y|Q  otlVej2oxy`4LA#wa$lD$@G[4a25%LiPU{sX{ |p_>4M<}{[j@BcpgH>' );
define( 'SECURE_AUTH_SALT', 'y`8G1Tq9V*qxInn!b9|k10=J>*rMdb$Vo_D!E#VRS94D@F=KE^4w$U;n};GDO4p~' );
define( 'LOGGED_IN_SALT',   '{5XowYW3#{Z,v3<Oj^Bt#x;+N~)PE7a9ilk]Inv)x^j8pYq(B#&<KHPqGBX3VuHN' );
define( 'NONCE_SALT',       'o%rlz:fPJDce:~oo7*@;To?7Zg`ow%gk rNRl@KkK*~8nWxofLOx5iH_;XG-Xb,}' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'tw_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
