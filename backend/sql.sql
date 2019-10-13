-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               10.3.16-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table 517_shop.failed_jobs
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.failed_jobs: ~0 rows (approximately)
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;

-- Dumping structure for table 517_shop.migrations
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.migrations: ~17 rows (approximately)
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
	(18, '2014_10_12_000000_create_users_table', 1),
	(19, '2014_10_12_100000_create_password_resets_table', 1),
	(20, '2016_06_01_000001_create_oauth_auth_codes_table', 1),
	(21, '2016_06_01_000002_create_oauth_access_tokens_table', 1),
	(22, '2016_06_01_000003_create_oauth_refresh_tokens_table', 1),
	(23, '2016_06_01_000004_create_oauth_clients_table', 1),
	(24, '2016_06_01_000005_create_oauth_personal_access_clients_table', 1),
	(25, '2019_08_19_000000_create_failed_jobs_table', 1),
	(26, '2019_08_19_064142_create_products_table', 1),
	(27, '2019_08_19_064614_create_orders_table', 1),
	(28, '2019_08_19_064643_create_order_products_pins', 1),
	(29, '2019_08_21_092525_craete_setting_table', 1),
	(30, '2019_08_21_094719_craete_slider_table', 1),
	(31, '2019_08_22_192303_create_product_category_table', 1),
	(32, '2019_10_04_154639_create_permission', 1),
	(33, '2019_10_05_081416_create_role_table', 1),
	(34, '2019_10_05_120513_create_permission_role_table', 1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;

-- Dumping structure for table 517_shop.oauth_access_tokens
CREATE TABLE IF NOT EXISTS `oauth_access_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `client_id` int(10) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_access_tokens_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.oauth_access_tokens: ~0 rows (approximately)
/*!40000 ALTER TABLE `oauth_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_access_tokens` ENABLE KEYS */;

-- Dumping structure for table 517_shop.oauth_auth_codes
CREATE TABLE IF NOT EXISTS `oauth_auth_codes` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `client_id` int(10) unsigned NOT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.oauth_auth_codes: ~0 rows (approximately)
/*!40000 ALTER TABLE `oauth_auth_codes` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_auth_codes` ENABLE KEYS */;

-- Dumping structure for table 517_shop.oauth_clients
CREATE TABLE IF NOT EXISTS `oauth_clients` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `redirect` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_clients_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.oauth_clients: ~0 rows (approximately)
/*!40000 ALTER TABLE `oauth_clients` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_clients` ENABLE KEYS */;

-- Dumping structure for table 517_shop.oauth_personal_access_clients
CREATE TABLE IF NOT EXISTS `oauth_personal_access_clients` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `client_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_personal_access_clients_client_id_index` (`client_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.oauth_personal_access_clients: ~0 rows (approximately)
/*!40000 ALTER TABLE `oauth_personal_access_clients` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_personal_access_clients` ENABLE KEYS */;

-- Dumping structure for table 517_shop.oauth_refresh_tokens
CREATE TABLE IF NOT EXISTS `oauth_refresh_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.oauth_refresh_tokens: ~0 rows (approximately)
/*!40000 ALTER TABLE `oauth_refresh_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_refresh_tokens` ENABLE KEYS */;

-- Dumping structure for table 517_shop.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `region_id` int(11) NOT NULL,
  `total` int(11) NOT NULL DEFAULT 0,
  `price` int(11) NOT NULL DEFAULT 0,
  `post_cost` int(11) NOT NULL DEFAULT 0,
  `tax_cost` int(11) NOT NULL DEFAULT 0,
  `discount` int(11) NOT NULL DEFAULT 0,
  `receiver_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `receiver_mobile` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `receiver_phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `receiver_address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_user_id_index` (`user_id`),
  KEY `orders_region_id_index` (`region_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.orders: ~0 rows (approximately)
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;

-- Dumping structure for table 517_shop.order_products_pins
CREATE TABLE IF NOT EXISTS `order_products_pins` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `price` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`order_id`,`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.order_products_pins: ~0 rows (approximately)
/*!40000 ALTER TABLE `order_products_pins` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_products_pins` ENABLE KEYS */;

-- Dumping structure for table 517_shop.password_resets
CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.password_resets: ~0 rows (approximately)
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;

-- Dumping structure for table 517_shop.permission
CREATE TABLE IF NOT EXISTS `permission` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `method` enum('GET','POST','PUT','DELETE') COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.permission: ~0 rows (approximately)
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;

-- Dumping structure for table 517_shop.permission_role
CREATE TABLE IF NOT EXISTS `permission_role` (
  `role_key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `permission_key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`role_key`,`permission_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.permission_role: ~0 rows (approximately)
/*!40000 ALTER TABLE `permission_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `permission_role` ENABLE KEYS */;

-- Dumping structure for table 517_shop.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `count` int(11) NOT NULL DEFAULT 0,
  `price` int(11) NOT NULL,
  `discount` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `meta_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sales_number` int(11) NOT NULL DEFAULT 0,
  `visitor` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_slug_unique` (`slug`),
  FULLTEXT KEY `title_content` (`title`,`content`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.products: ~0 rows (approximately)
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
/*!40000 ALTER TABLE `products` ENABLE KEYS */;

-- Dumping structure for table 517_shop.product_category
CREATE TABLE IF NOT EXISTS `product_category` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pic_link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `_lft` int(10) unsigned NOT NULL DEFAULT 0,
  `_rgt` int(10) unsigned NOT NULL DEFAULT 0,
  `parent_id` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_category__lft__rgt_parent_id_index` (`_lft`,`_rgt`,`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.product_category: ~0 rows (approximately)
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;

-- Dumping structure for table 517_shop.role
CREATE TABLE IF NOT EXISTS `role` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.role: ~2 rows (approximately)
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` (`key`, `title`, `created_at`, `updated_at`) VALUES
	('programmer', 'برنامه نویس', NULL, NULL),
	('super_admin', '', NULL, NULL);
/*!40000 ALTER TABLE `role` ENABLE KEYS */;

-- Dumping structure for table 517_shop.setting
CREATE TABLE IF NOT EXISTS `setting` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `shop_id` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 11,
  `main_domain` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mail_info` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fax` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `keywords` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `script` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hours_of_work` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facebook` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instagram` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `google` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telegram` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.setting: ~0 rows (approximately)
/*!40000 ALTER TABLE `setting` DISABLE KEYS */;
/*!40000 ALTER TABLE `setting` ENABLE KEYS */;

-- Dumping structure for table 517_shop.slider
CREATE TABLE IF NOT EXISTS `slider` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `shop_id` int(11) NOT NULL,
  `pic_link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT 1,
  `caption` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `data` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.slider: ~0 rows (approximately)
/*!40000 ALTER TABLE `slider` DISABLE KEYS */;
/*!40000 ALTER TABLE `slider` ENABLE KEYS */;

-- Dumping structure for table 517_shop.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `mobile` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role_key` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_mobile_unique` (`mobile`),
  KEY `role_key` (`role_key`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.users: ~62 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `mobile`, `email`, `role_key`, `name`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
	(2, '02666024477', 'ayousefi@gmail.com', 'programmer', 'فریّن چهر فرج', NULL, '<IlT#9/CV3KE#k0\'\\"n+', NULL, '1972-08-13 23:15:02', '2013-06-06 13:39:03'),
	(3, '03172743161', 'javad15@yahoo.com', 'programmer', 'استاد سالار جعفریان', NULL, 'bW{X)ol"', NULL, '1996-07-15 04:23:09', '1996-03-30 18:33:22'),
	(4, '02653932200', 'yasaman.soleimani@hotmail.com', 'programmer', 'زند خمسه', NULL, 'HK:eSTPI{.yhRd>', NULL, '1993-05-10 08:53:35', '1999-04-24 09:41:00'),
	(5, '02651485560', 'aria09@gmail.com', 'programmer', 'سوری پازارگاد', NULL, '/kad==`#', NULL, '1979-10-29 06:26:50', '2007-09-22 09:58:56'),
	(6, '02692506255', 'namdar.meysam@yahoo.com', 'programmer', 'حوروش نوبخت', NULL, '%s(8MnrC>5WZ/', NULL, '2008-05-23 17:59:52', '1980-02-07 07:05:54'),
	(7, '02667456857', 'farbod29@hotmail.com', 'programmer', 'رایان تهرانی', NULL, ']MPkJ|}Ima&', NULL, '2000-03-09 14:26:47', '2012-03-06 21:40:41'),
	(8, '03117300566', 'soraya49@paria.co.ir', 'programmer', 'شادرخ تبریزی', NULL, ';3A~K?v(4D5G+', NULL, '1975-12-02 06:12:33', '1986-12-12 19:04:31'),
	(9, '03151765795', 'ebrahim.nazari@abdullahi.ac.ir', 'programmer', 'فربد فرامرزی', NULL, 'Y^Zn3D5@{u', NULL, '1989-11-29 04:09:26', '1983-02-22 21:28:51'),
	(10, '02180189212', 'tara62@karimi.biz', 'programmer', 'مهریار نجفی', NULL, '?rOR7:um&yre2UVWb', NULL, '1974-06-19 17:47:28', '2000-03-28 16:50:00'),
	(11, '02185640155', 'vnazari@yahoo.com', 'programmer', 'کاوان علیا', NULL, ',s+gfrl^pqQ', NULL, '2000-02-21 23:20:21', '1970-12-09 03:47:39'),
	(12, '02632456631', 'kiana61@yahoo.com', 'programmer', 'کوشیار رستمی', NULL, 'K#MF)Bpv3z', NULL, '1995-05-09 09:58:11', '1995-10-17 02:13:00'),
	(13, '02140795081', 'sepideh55@heidari.ac.ir', 'programmer', 'انوش آشنا', NULL, 'Pg|5.<m#X)Dhu', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(14, '03149766262', 'qjalili@yahoo.com', 'programmer', 'جهانیار شاه‌حسینی', NULL, '3@v}rtAKGXRDj:', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(15, '02612059950', 'okhomeini@gmail.com', 'programmer', 'صدیقه اصلانی', NULL, 'fz5hxC92{K%D', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(16, '02601953556', 'yasamin.namazi@yahoo.com', 'programmer', 'نامدار همایون', NULL, 'N?l2q#_,Q1KGBD:', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(17, '03112081242', 'orezaei@gmail.com', 'programmer', 'پرشه پیوندی', NULL, '2<_qRkC', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(18, '02600957197', 'rahimi.laleh@shahidi.info', 'programmer', 'مها فاطمی', NULL, 'eUaj9H0\\cF', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(19, '03176103988', 'taraneh.talebi@tabatabaei.biz', 'programmer', 'مهندس دارا بیگی', NULL, '2\':2I+xb4V%1kQ\':@c\'q', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(20, '02118503870', 'mahdavi.sahar@kashani.org', 'programmer', 'آرتمان رحمانیان', NULL, ')Y+bH|b7U', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(21, '02183820490', 'bahare.ebrahimi@gmail.com', 'programmer', 'گلنسا دانایی‌فر', NULL, 'HV->t?U', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(22, '03197150779', 'marzban57@hotmail.com', 'programmer', 'ثمره شادمهر', NULL, '`0}mv34X<+d', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(23, '02657286864', 'lrajaei@hotmail.com', 'programmer', 'خانم گلسا دانایی‌فرد', NULL, '7T!pcIG\\at_|j1:F', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(24, '03184204961', 'fateme91@yahoo.com', 'programmer', 'تینا شرف', NULL, 'RLr%,NoS', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(25, '02663207925', 'qrashidi@rahimi.sch.ir', 'programmer', 'زینت واعظ', NULL, 'bSs>u;P#`Y}b1w', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(26, '02693692960', 'sohrab65@gmail.com', 'programmer', 'نازدانه عنایت', NULL, 'S;LL\\-7%zlR1>', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(27, '02185214510', 'pahlavi.farbod@gmail.com', 'programmer', 'تیراژه کامکار', NULL, '0s~QGI<dbHmRjy}[', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(28, '02152142412', 'aria.salemi@naceri.info', 'programmer', 'شمسا شرف', NULL, 'n\\qKrX4impCOb4j', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(29, '03117407385', 'nili.farzaneh@hotmail.com', 'programmer', 'آران پیوندی', NULL, '=ZZ/h;g=<(}z$0PWj>y', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(30, '02145197156', 'roxana13@gmail.com', 'programmer', 'نوشآفرین چنگیزی', NULL, 'b;d=qZ1Y{?ib|3', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(31, '02679389331', 'farbod69@hotmail.com', 'programmer', 'سهی خامنه‌ای', NULL, ';Q*!*4P', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(32, '03118161216', 'ahadi.anahita@yahoo.com', 'programmer', 'قیصر ستاری', NULL, '{OWV-yw!SK=VdKXeR{H', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(33, '02111812475', 'nazanin97@hotmail.com', 'programmer', 'ویشکا فتاحی', NULL, '$^mqs:fMBw]\'(A%$&UI', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(34, '02608357926', 'nmahdavi@hotmail.com', 'programmer', 'مجتبی علیا', NULL, '0\\mw,L[)48}W$-z7)', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(35, '02178039709', 'kasra60@namazi.info', 'programmer', 'سنبل سرمد', NULL, 'R1Pc{g~V', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(36, '02615280703', 'afshin.rajaei@zandi.com', 'programmer', 'اُخشان ادیانی', NULL, 'ae6O%Mi', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(37, '03174246117', 'soroush23@asadi.info', 'programmer', 'آقای احسان امانت', NULL, '7~.xN3a9*dKIGZe8-Y', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(38, '02164119126', 'parvin.salehi@gmail.com', 'programmer', 'مهندس طوفان مصباح‌زاده', NULL, '6evR)l-?9sVN%Su5RdGO', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(39, '03128014663', 'hoda93@gmail.com', 'programmer', 'آرتان رسولی', NULL, 'Va:n=|<C-lw?:', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(40, '03148443434', 'parvin60@esfahani.org', 'programmer', 'استاد بازان خداپناهی', NULL, 'J7pg%6"g3m}', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(41, '02671104776', 'xhijazi@hotmail.com', 'programmer', 'نهاله محدثی', NULL, '@)9nr*|qg3Lk>nTT>{5Z', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(42, '02148811843', 'anahita01@farsi.biz', 'programmer', 'مهندس دریاناز صفوی', NULL, '~7s:Y(', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(43, '02159448243', 'roya70@khorsandi.ac.ir', 'programmer', 'مرجان جنتی', NULL, 'B|n~{<IO#jPYVU9%', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(44, '02675362593', 'dzandi@hotmail.com', 'programmer', 'ملیح شفا', NULL, '`/C"5Edd$_^wKq', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(45, '02187739378', 'qmahmoudieh@gmail.com', 'programmer', 'نازک عاشوری', NULL, ';_d(I}rP4n', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(46, '02110018532', 'musa.ramadani@gmail.com', 'programmer', 'عبّاس آدینه', NULL, '"YzxOG5\'N\\j2', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(47, '03176980847', 'mousavi.sepehr@hotmail.com', 'programmer', 'واریان پورناظری', NULL, 'Cq03Mb~V,P)Vb+=x@*', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(48, '03108123490', 'cheidari@gmail.com', 'programmer', 'مارال نقیب‌زاده', NULL, '*/j!_-K!4t,4n[bUIVx', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(49, '02652599878', 'vahid71@yahoo.com', 'programmer', 'حمید حسابی', NULL, '5N@1}.~[.LRN+', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(50, '02692679161', 'mousavi.ali@ahadi.info', 'programmer', 'شادی حبیبی', NULL, '{A4i5=5uRu/JoE._', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(51, '02151341606', 'pouria85@farahani.org', 'programmer', 'فرشاد میدری', NULL, '>6v[;vr5', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(52, '02132588973', 'kasra96@gmail.com', 'programmer', 'دلیر نقدی', NULL, 'm7M\'*n', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(53, '03103615245', 'fmirzaei@yousefi.biz', 'programmer', 'کیوان ابطحی', NULL, ']!pW-Qhu8}A.K[z>}', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(54, '03160737832', 'benyamin23@esfahani.sch.ir', 'programmer', 'سمناز شبستری', NULL, 'tv7z(k|52L', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(55, '03154936789', 'yaghoub.kashani@ebrahimi.biz', 'programmer', 'ساحل شفا', NULL, '&mF)PO]+%(lTE9P7uJ', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(56, '02620054540', 'kasra02@mazanderani.sch.ir', 'programmer', 'سمیر مجتبوی', NULL, '_s@o]W', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(57, '02142115382', 'farideh30@pejman.biz', 'programmer', 'چامه خسروپناه', NULL, ',iM#`W6T', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(58, '02195261178', 'mazanderani.farnaz@hotmail.com', 'programmer', 'تیشتار هراتی', NULL, '=nT$WZ.nii8n`_v\'_}a', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28'),
	(59, '02144808398', 'gsalemi@farahani.ir', 'programmer', 'افسان میرزاده', NULL, ':N)8J\\b<1n(sX43F)', NULL, '2019-10-12 06:52:28', '2019-10-12 06:52:28');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
