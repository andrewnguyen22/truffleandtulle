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
define('DB_NAME', 'truffleandtulle');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'root');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'f?00:fDFEdOZ}AJRh_N6/Xv):.<hmpQEe)?a_`@C!6&)O1H*uYjxi.N![xuBMUZf');
define('SECURE_AUTH_KEY',  'C5)p~U|!cq>%Ma)^GOD.`B$./na#5g+&uOKAuJSO+x?s|b&lGy bSZx^5Xpu8Z6f');
define('LOGGED_IN_KEY',    'EvVK_@5jr]bO]!;dNl!2-ZtFMR Py kLbRh:=o#=vDYEn~Fx!VuI(95 nk[iLe(x');
define('NONCE_KEY',        ')#%Cyn8oaC[NE@dIn3tC+,118<GJIOp8lO^+Z:u0s#R=M(6V8HAZgczh-@~cm-Z%');
define('AUTH_SALT',        'p;{%3Rl1AK,Q=_C]^[AC%&=@fXOixb7!Cnrh-FwU>HkDA,+}rhV)Pak+<{T.7KZ>');
define('SECURE_AUTH_SALT', '@WMc+g|+<{(N2vj&T~??0s@(NRlO)~BK0yF99s%!#-IkflBuV.x^<}ag8K@VB #6');
define('LOGGED_IN_SALT',   'T>EQ~TaSAEqVNHbxp.uN D)+;x-,<h6;[2MVR_AOL;`d*YL;Cf__u5Ipe=? hyzn');
define('NONCE_SALT',       '~0:5p?Ho7%]6^KJn$#^go;zO`G=AQX]7>lp76rSUHrb` wl:m9S*,2tK9#h6r#MI');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

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
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
