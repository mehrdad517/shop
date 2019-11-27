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


-- Dumping database structure for 517_shop
CREATE DATABASE IF NOT EXISTS `517_shop` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_persian_ci */;
USE `517_shop`;

-- Dumping structure for table 517_shop.anbar
CREATE TABLE IF NOT EXISTS `anbar` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `barcode` tinyint(4) NOT NULL DEFAULT 0,
  `anbar_label` tinyint(4) NOT NULL DEFAULT 0,
  `customer_invoice` tinyint(4) NOT NULL DEFAULT 0,
  `transport_status` tinyint(4) NOT NULL DEFAULT 0,
  `post_sending_data` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- Dumping data for table 517_shop.anbar: ~2 rows (approximately)
/*!40000 ALTER TABLE `anbar` DISABLE KEYS */;
INSERT INTO `anbar` (`id`, `barcode`, `anbar_label`, `customer_invoice`, `transport_status`, `post_sending_data`, `created_at`, `updated_at`) VALUES
	(1, 0, 0, 0, 0, 0, '2019-11-22 16:36:31', '2019-11-22 16:36:31'),
	(2, 0, 0, 0, 0, 0, '2019-11-23 11:07:54', '2019-11-23 11:07:54');
/*!40000 ALTER TABLE `anbar` ENABLE KEYS */;

-- Dumping structure for table 517_shop.attachment
CREATE TABLE IF NOT EXISTS `attachment` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `attachmentable_id` bigint(20) unsigned NOT NULL,
  `attachmentable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `attachmentable_id` (`attachmentable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.attachment: ~0 rows (approximately)
/*!40000 ALTER TABLE `attachment` DISABLE KEYS */;
/*!40000 ALTER TABLE `attachment` ENABLE KEYS */;

-- Dumping structure for table 517_shop.brand
CREATE TABLE IF NOT EXISTS `brand` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(50) COLLATE utf8_persian_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8_persian_ci DEFAULT NULL,
  `content` text COLLATE utf8_persian_ci DEFAULT NULL,
  `meta_title` varchar(255) COLLATE utf8_persian_ci DEFAULT NULL,
  `meta_description` varchar(255) COLLATE utf8_persian_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `brand_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- Dumping data for table 517_shop.brand: ~0 rows (approximately)
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
INSERT INTO `brand` (`id`, `title`, `slug`, `content`, `meta_title`, `meta_description`, `status`, `created_at`, `updated_at`) VALUES
	(1, 'مای', 'سمعل', 'سیبسی', NULL, NULL, 1, '2019-11-10 11:57:50', '2019-11-10 11:57:50');
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;

-- Dumping structure for table 517_shop.error
CREATE TABLE IF NOT EXISTS `error` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_persian_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- Dumping data for table 517_shop.error: ~6 rows (approximately)
/*!40000 ALTER TABLE `error` DISABLE KEYS */;
INSERT INTO `error` (`id`, `title`) VALUES
	(1, 'کسری و یا معیوبی کالاهای موجود در مرسوله توسط انباردار تایید شده است.'),
	(2, 'امکان تغییر وضعیت مرسوله به این حالت وجود ندارد.'),
	(3, 'مبلغ مرجوعی به حساب کاربر واریز شده است.'),
	(4, 'مرسوله فاکتور پرداخت نشده دارد.'),
	(5, 'مبلغ پرداختی با مبلغ مرسوله همخانی ندارد'),
	(6, NULL);
/*!40000 ALTER TABLE `error` ENABLE KEYS */;

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

-- Dumping structure for procedure 517_shop.fetch_permissions_with_access
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `fetch_permissions_with_access`(
	IN `role_parameter` VARCHAR(50),
	IN `parent_parameter` VARCHAR(50)

)
    READS SQL DATA
BEGIN
	SELECT  permission.*,
	IF(ISNULL(role_key), false, true) AS access
	FROM permission 
	left JOIN permission_role ON permission_role.permission_key = permission.`key` AND  permission_role.role_key = role_parameter
	WHERE parent = parent_parameter
	order by permission.created_at asc
	;
END//
DELIMITER ;

-- Dumping structure for table 517_shop.finance
CREATE TABLE IF NOT EXISTS `finance` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL DEFAULT 0,
  `financeable_id` int(11) NOT NULL,
  `financeable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `debtor` decimal(18,2) NOT NULL DEFAULT 0.00,
  `credit` decimal(18,2) NOT NULL DEFAULT 0.00,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `financeable_id` (`financeable_id`),
  KEY `FK_finance_user` (`user_id`),
  CONSTRAINT `FK_finance_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.finance: ~0 rows (approximately)
/*!40000 ALTER TABLE `finance` DISABLE KEYS */;
/*!40000 ALTER TABLE `finance` ENABLE KEYS */;

-- Dumping structure for table 517_shop.group_attribute
CREATE TABLE IF NOT EXISTS `group_attribute` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(50) COLLATE utf8_persian_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8_persian_ci DEFAULT NULL,
  `content` text COLLATE utf8_persian_ci DEFAULT NULL,
  `meta_title` varchar(255) COLLATE utf8_persian_ci DEFAULT NULL,
  `meta_description` varchar(255) COLLATE utf8_persian_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `has_link` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `group_attribute_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- Dumping data for table 517_shop.group_attribute: ~4 rows (approximately)
/*!40000 ALTER TABLE `group_attribute` DISABLE KEYS */;
INSERT INTO `group_attribute` (`id`, `title`, `slug`, `content`, `meta_title`, `meta_description`, `status`, `has_link`, `created_at`, `updated_at`) VALUES
	(1, 'رنگ', NULL, NULL, NULL, NULL, 1, 1, '2019-11-24 20:17:04', '2019-11-24 20:17:04'),
	(2, 'وزن', NULL, NULL, NULL, NULL, 1, 1, '2019-11-24 20:17:10', '2019-11-24 20:17:10'),
	(3, 'حجم', NULL, NULL, NULL, NULL, 1, 1, '2019-11-24 20:17:16', '2019-11-24 20:17:16'),
	(4, 'مناسب برای', NULL, NULL, NULL, NULL, 1, 1, '2019-11-24 20:18:58', '2019-11-24 20:18:58');
/*!40000 ALTER TABLE `group_attribute` ENABLE KEYS */;

-- Dumping structure for table 517_shop.group_attribute_category
CREATE TABLE IF NOT EXISTS `group_attribute_category` (
  `category_id` int(11) NOT NULL,
  `attribute_id` int(11) NOT NULL,
  PRIMARY KEY (`category_id`,`attribute_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.group_attribute_category: ~11 rows (approximately)
/*!40000 ALTER TABLE `group_attribute_category` DISABLE KEYS */;
INSERT INTO `group_attribute_category` (`category_id`, `attribute_id`) VALUES
	(1, 1),
	(1, 2),
	(1, 3),
	(1, 4),
	(2, 1),
	(2, 2),
	(2, 3),
	(3, 1),
	(3, 2),
	(3, 3),
	(3, 4);
/*!40000 ALTER TABLE `group_attribute_category` ENABLE KEYS */;

-- Dumping structure for table 517_shop.group_attribute_product
CREATE TABLE IF NOT EXISTS `group_attribute_product` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `attribute_id` int(11) NOT NULL,
  `value` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` tinyint(4) NOT NULL DEFAULT 0,
  `main` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `group_attribute_product_product_id_index` (`product_id`),
  KEY `group_attribute_product_attribute_id_index` (`attribute_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.group_attribute_product: ~0 rows (approximately)
/*!40000 ALTER TABLE `group_attribute_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `group_attribute_product` ENABLE KEYS */;

-- Dumping structure for table 517_shop.migrations
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.migrations: ~26 rows (approximately)
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
	(1, '2014_10_12_000000_create_users_table', 1),
	(2, '2014_10_12_100000_create_password_resets_table', 1),
	(3, '2016_06_01_000001_create_oauth_auth_codes_table', 1),
	(4, '2016_06_01_000002_create_oauth_access_tokens_table', 1),
	(5, '2016_06_01_000003_create_oauth_refresh_tokens_table', 1),
	(6, '2016_06_01_000004_create_oauth_clients_table', 1),
	(7, '2016_06_01_000005_create_oauth_personal_access_clients_table', 1),
	(8, '2019_08_19_000000_create_failed_jobs_table', 1),
	(9, '2019_08_21_0000000_create_role_table', 1),
	(10, '2019_08_21_092524_create_permission', 1),
	(11, '2019_08_21_092530_create_permission_role_table', 1),
	(12, '2019_08_22_192303_create_product_category_table', 1),
	(13, '2019_08_22_192303_create_products_table', 1),
	(14, '2019_10_16_130851_create_brand_table', 1),
	(15, '2019_10_21_085733_create_group_attribute_table', 1),
	(16, '2019_10_28_094036_create_product_categories_table', 1),
	(17, '2019_10_29_211010_create_product_pins_table', 1),
	(18, '2019_10_29_211841_create_group_attribute_product_table', 1),
	(19, '2019_10_29_211958_create_group_attribute_product_category_table', 1),
	(20, '2019_11_02_140840_create_order_table', 1),
	(21, '2019_11_02_141802_create_order_receiver_table', 1),
	(22, '2019_11_02_141832_create_finance_table', 1),
	(23, '2019_11_02_141851_create_payment_table', 1),
	(24, '2019_11_03_084122_create_order_product_pins', 1),
	(25, '2019_11_06_183604_create_attachment_table', 1),
	(26, '2019_11_09_162055_create_region_table', 1);
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

-- Dumping structure for table 517_shop.order
CREATE TABLE IF NOT EXISTS `order` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `increment_id` int(11) NOT NULL,
  `discount` decimal(18,2) NOT NULL DEFAULT 0.00,
  `post_cost` decimal(18,2) NOT NULL DEFAULT 0.00,
  `tax` decimal(18,2) NOT NULL DEFAULT 0.00,
  `pure_price` decimal(18,2) NOT NULL,
  `total_price` decimal(18,2) NOT NULL,
  `order_status` smallint(6) NOT NULL DEFAULT 0,
  `transport_status` smallint(6) NOT NULL DEFAULT 0,
  `delivery_status` smallint(6) NOT NULL DEFAULT 0,
  `items_status` smallint(6) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_order_user` (`user_id`),
  CONSTRAINT `FK_order_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=406 DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- Dumping data for table 517_shop.order: ~403 rows (approximately)
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` (`id`, `user_id`, `increment_id`, `discount`, `post_cost`, `tax`, `pure_price`, `total_price`, `order_status`, `transport_status`, `delivery_status`, `items_status`, `created_at`, `updated_at`) VALUES
	(1, 1, 1, 0.00, 7500.00, 2500.00, 250000.00, 256000.00, 1, 1, 1, 0, '2019-11-10 13:02:46', '2019-11-21 15:15:52'),
	(4, 5, 0, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2003-09-21 22:21:10', '1998-09-30 21:38:36'),
	(5, 1, 0, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1978-03-22 00:11:42', '1972-09-28 07:46:16'),
	(6, 4, 0, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2006-09-05 14:44:06', '1993-05-22 18:06:16'),
	(7, 3, 1, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1978-03-11 22:01:16', '1980-04-24 07:47:49'),
	(8, 5, 2, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1971-01-11 05:45:23', '1976-10-06 18:41:31'),
	(9, 3, 3, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1978-02-27 06:24:38', '1976-01-24 18:20:35'),
	(10, 1, 4, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2013-05-30 18:27:29', '1970-09-11 10:46:57'),
	(11, 5, 5, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1999-10-21 13:05:08', '2002-08-07 03:08:23'),
	(12, 2, 6, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2014-05-14 22:14:05', '2013-04-11 16:45:22'),
	(13, 5, 7, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1979-05-03 14:55:50', '1987-09-05 17:29:25'),
	(14, 3, 8, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2005-08-25 02:09:43', '2004-04-11 11:35:00'),
	(15, 5, 9, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1978-08-10 17:31:47', '2001-07-09 15:31:18'),
	(16, 1, 10, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2016-01-31 02:52:49', '2013-06-11 20:47:35'),
	(17, 5, 11, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2000-01-04 07:00:22', '2008-02-03 18:44:27'),
	(18, 2, 12, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1972-09-15 15:24:33', '1973-07-21 12:52:15'),
	(19, 2, 13, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1972-02-17 20:21:18', '1974-11-03 09:09:01'),
	(20, 5, 14, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2005-01-07 23:11:22', '1975-03-26 01:53:33'),
	(21, 5, 15, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2009-08-30 06:27:03', '1983-04-06 18:36:57'),
	(22, 1, 16, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2004-12-22 07:29:44', '1987-02-17 14:16:50'),
	(23, 3, 17, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2003-05-24 18:56:10', '2011-11-20 10:03:45'),
	(24, 2, 18, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1985-02-16 16:39:24', '1990-10-22 16:56:31'),
	(25, 3, 19, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1989-08-24 13:56:47', '2012-02-12 06:09:37'),
	(26, 2, 20, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1986-01-23 06:16:40', '1993-10-31 22:36:35'),
	(27, 5, 21, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2017-06-28 03:51:34', '1997-03-01 21:24:46'),
	(28, 3, 22, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1987-01-18 13:43:45', '2007-08-09 03:01:46'),
	(29, 5, 23, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2001-06-30 22:42:18', '2007-04-30 05:06:06'),
	(30, 4, 24, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1979-03-15 04:25:55', '1984-11-09 22:25:04'),
	(31, 1, 25, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2001-02-25 21:39:02', '1998-02-02 17:48:08'),
	(32, 5, 26, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1975-03-18 02:11:41', '2017-05-28 21:55:51'),
	(33, 4, 27, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1997-03-29 02:32:07', '2012-05-19 19:52:51'),
	(34, 4, 28, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1980-11-16 19:01:28', '1999-08-14 07:05:31'),
	(35, 4, 29, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1980-10-30 01:56:35', '1987-07-27 18:29:14'),
	(36, 1, 30, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1980-07-26 08:41:13', '1985-06-08 14:21:49'),
	(37, 3, 31, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2011-09-22 01:36:29', '2007-06-06 09:41:50'),
	(38, 3, 32, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1992-11-23 14:38:37', '2002-04-09 18:28:55'),
	(39, 3, 33, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2014-02-22 08:03:18', '2000-05-08 19:42:00'),
	(40, 4, 34, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2018-11-19 09:31:19', '2013-12-23 09:52:26'),
	(41, 4, 35, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1977-12-24 08:27:39', '2007-05-09 23:26:23'),
	(42, 5, 36, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2006-03-10 20:14:26', '2009-03-01 23:30:15'),
	(43, 2, 37, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2003-01-25 15:50:33', '1976-11-01 03:49:33'),
	(44, 2, 38, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1984-03-21 18:19:13', '2010-09-03 17:36:42'),
	(45, 2, 39, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2001-01-09 00:21:44', '2011-11-08 11:47:00'),
	(46, 2, 40, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1982-10-26 04:54:12', '1993-04-12 18:26:23'),
	(47, 4, 41, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1979-12-30 20:23:37', '2019-07-29 12:38:58'),
	(48, 4, 42, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2006-12-25 18:02:00', '1996-11-28 05:02:29'),
	(49, 1, 43, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1981-08-20 08:10:38', '1987-08-26 01:53:52'),
	(50, 2, 44, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2013-03-09 00:44:36', '1976-09-11 16:12:52'),
	(51, 4, 45, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1974-02-02 07:31:45', '1990-10-04 00:14:27'),
	(52, 2, 46, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2001-06-04 19:31:14', '2000-11-27 21:30:15'),
	(53, 4, 47, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1971-11-28 07:44:05', '1989-08-10 11:44:12'),
	(54, 5, 48, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1970-05-08 09:20:36', '1978-05-02 12:37:01'),
	(55, 4, 49, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2011-10-07 16:00:06', '2009-02-14 11:54:42'),
	(56, 5, 50, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2007-07-02 00:30:34', '1985-08-27 04:27:03'),
	(57, 4, 51, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2018-02-22 16:53:17', '2016-12-16 04:33:39'),
	(58, 3, 52, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1982-06-21 08:49:45', '2015-07-17 15:46:58'),
	(59, 2, 53, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1992-08-04 00:46:59', '2000-08-01 06:28:14'),
	(60, 5, 54, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1983-07-29 18:28:50', '1996-02-25 14:06:12'),
	(61, 3, 55, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1970-08-29 23:00:48', '1975-11-30 18:43:02'),
	(62, 2, 56, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2005-08-05 02:02:48', '1995-10-13 03:22:41'),
	(63, 1, 57, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1985-04-26 15:31:45', '1988-02-21 16:17:30'),
	(64, 1, 58, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2010-03-06 01:50:46', '2000-06-08 03:14:10'),
	(65, 3, 59, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2007-09-30 14:23:10', '1991-12-19 22:50:31'),
	(66, 3, 60, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2017-02-23 20:58:43', '1986-11-21 17:19:05'),
	(67, 4, 61, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1997-09-27 18:07:07', '1987-10-09 00:05:06'),
	(68, 4, 62, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2003-09-15 20:22:52', '2006-08-10 09:21:54'),
	(69, 5, 63, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1977-01-13 11:22:46', '1970-08-03 13:25:25'),
	(70, 5, 64, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1992-02-21 02:56:07', '1998-10-16 10:26:43'),
	(71, 4, 65, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1982-02-16 11:15:29', '1995-10-08 04:19:30'),
	(72, 4, 66, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1993-05-21 00:55:54', '1984-12-31 00:38:04'),
	(73, 1, 67, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1995-06-14 03:08:04', '1984-12-05 02:45:41'),
	(74, 4, 68, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1999-07-26 18:23:03', '1975-02-26 13:06:35'),
	(75, 4, 69, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1998-07-23 22:15:50', '1977-05-07 03:17:58'),
	(76, 4, 70, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1987-05-07 12:00:27', '1973-09-24 07:50:22'),
	(77, 3, 71, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1993-10-04 11:55:45', '1971-07-20 09:08:33'),
	(78, 5, 72, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1979-09-27 01:45:58', '1973-10-21 13:50:34'),
	(79, 1, 73, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1989-09-14 17:10:05', '1975-11-13 08:15:11'),
	(80, 3, 74, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2014-12-01 01:28:20', '1996-07-24 14:50:19'),
	(81, 4, 75, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1975-11-02 16:36:22', '2004-11-07 02:43:57'),
	(82, 4, 76, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1998-08-26 19:00:06', '1983-07-04 08:57:43'),
	(83, 3, 77, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2019-11-19 22:06:31', '2006-11-07 20:34:16'),
	(84, 1, 78, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1982-07-20 14:07:04', '1974-01-11 02:55:09'),
	(85, 3, 79, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1997-06-07 12:28:12', '1974-06-19 19:30:19'),
	(86, 1, 80, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2017-06-21 23:52:39', '1992-04-09 08:12:26'),
	(87, 2, 81, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1975-02-01 20:20:15', '1985-01-08 07:07:02'),
	(88, 1, 82, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2008-05-05 03:06:43', '1978-01-08 19:47:37'),
	(89, 5, 83, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1989-04-15 14:22:50', '1992-04-17 00:20:36'),
	(90, 1, 84, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1976-09-18 21:55:53', '1987-07-12 11:42:17'),
	(91, 4, 85, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1974-03-21 12:45:37', '1978-02-16 11:45:55'),
	(92, 5, 86, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2018-04-09 14:44:43', '1978-06-25 14:45:00'),
	(93, 5, 87, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1994-03-02 01:21:09', '2014-05-08 00:24:17'),
	(94, 4, 88, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2011-05-14 00:53:00', '1970-05-12 01:24:46'),
	(95, 2, 89, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1973-06-01 01:31:02', '1973-12-08 08:49:54'),
	(96, 3, 90, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1974-07-12 09:05:29', '1995-05-20 03:37:37'),
	(97, 3, 91, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1975-02-15 06:42:42', '2005-06-17 06:00:15'),
	(98, 3, 92, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1992-03-14 22:15:18', '1979-12-14 06:34:13'),
	(99, 3, 93, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1988-01-20 12:32:44', '1986-12-27 19:13:26'),
	(100, 5, 94, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2005-06-18 19:52:39', '1976-11-01 07:30:49'),
	(101, 1, 95, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2002-09-28 13:53:50', '2011-02-25 18:45:50'),
	(102, 2, 96, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1979-03-27 18:07:36', '1977-09-23 02:58:24'),
	(103, 5, 97, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1976-08-15 20:16:54', '1994-12-08 22:21:59'),
	(104, 5, 98, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2013-10-09 03:14:13', '1996-07-26 15:35:44'),
	(105, 5, 99, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1985-11-04 12:55:43', '1971-10-01 04:25:49'),
	(106, 4, 100, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1972-02-10 16:49:52', '1993-03-02 03:38:22'),
	(107, 3, 101, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2005-04-10 05:54:34', '1985-12-27 01:12:54'),
	(108, 4, 102, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2018-02-14 12:18:32', '2005-01-26 01:47:04'),
	(109, 2, 103, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1976-06-08 00:45:27', '1995-09-23 09:27:51'),
	(110, 4, 104, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1989-02-25 16:32:34', '1995-06-16 02:24:53'),
	(111, 1, 105, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1979-10-19 04:09:38', '2018-12-15 01:06:32'),
	(112, 3, 106, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2017-07-20 05:52:02', '1990-10-24 04:57:25'),
	(113, 4, 107, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2009-01-04 20:58:14', '1985-12-07 20:02:40'),
	(114, 1, 108, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2009-11-18 12:04:27', '1981-05-10 05:47:11'),
	(115, 5, 109, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1976-09-09 12:27:39', '1971-05-23 11:34:31'),
	(116, 1, 110, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1993-05-11 04:54:41', '2019-02-10 20:48:44'),
	(117, 5, 111, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2010-08-15 00:11:07', '1987-01-18 06:46:23'),
	(118, 2, 112, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2016-03-30 04:26:21', '1986-06-20 13:41:42'),
	(119, 5, 113, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2007-12-18 05:51:47', '1977-12-02 06:53:59'),
	(120, 2, 114, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1990-07-24 23:55:26', '2001-04-06 19:35:50'),
	(121, 1, 115, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2006-08-20 02:33:33', '2013-05-30 22:23:35'),
	(122, 4, 116, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1987-09-30 19:31:21', '1986-06-16 08:06:42'),
	(123, 2, 117, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1973-04-16 17:42:32', '2002-10-07 03:37:40'),
	(124, 3, 118, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1984-10-26 09:40:58', '1970-05-30 06:56:46'),
	(125, 3, 119, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2014-03-28 08:55:10', '1974-09-01 07:29:33'),
	(126, 4, 120, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2003-04-21 02:01:29', '1978-08-30 13:10:50'),
	(127, 4, 121, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1987-11-22 18:42:16', '2002-04-29 09:40:04'),
	(128, 4, 122, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1983-11-10 05:02:24', '1989-04-07 14:16:25'),
	(129, 3, 123, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1999-09-28 07:31:26', '2013-08-04 19:42:20'),
	(130, 4, 124, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1987-10-29 13:44:49', '2003-07-15 09:11:47'),
	(131, 2, 125, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1974-06-03 13:59:50', '1983-06-21 02:15:02'),
	(132, 3, 126, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2016-09-09 14:48:24', '1972-10-22 21:17:00'),
	(133, 5, 127, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1992-07-05 15:25:20', '1981-02-06 01:12:30'),
	(134, 4, 128, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2018-02-01 21:38:40', '2008-02-06 07:31:39'),
	(135, 4, 129, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1977-08-24 20:34:40', '2013-09-15 17:17:05'),
	(136, 3, 130, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1982-07-08 22:21:23', '2004-01-10 21:03:41'),
	(137, 2, 131, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1992-10-24 20:49:16', '1979-03-29 16:37:06'),
	(138, 5, 132, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2017-03-20 07:34:35', '2001-06-13 01:22:36'),
	(139, 2, 133, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2007-12-17 12:18:42', '1999-12-01 12:05:53'),
	(140, 3, 134, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1987-12-05 18:12:44', '2005-11-04 05:27:16'),
	(141, 4, 135, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2011-10-11 12:26:42', '1984-07-16 05:20:17'),
	(142, 2, 136, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1973-04-24 09:24:18', '2001-11-24 19:52:52'),
	(143, 2, 137, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1982-11-02 18:23:53', '1999-12-23 11:46:03'),
	(144, 4, 138, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1977-06-29 14:24:17', '2018-03-25 08:57:12'),
	(145, 4, 139, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2004-01-15 02:11:11', '1981-06-10 13:49:47'),
	(146, 4, 140, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2005-09-03 10:27:50', '1994-07-06 03:48:39'),
	(147, 1, 141, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2013-02-06 08:46:32', '1972-06-06 18:55:20'),
	(148, 1, 142, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1998-03-11 20:44:35', '1999-10-22 02:05:59'),
	(149, 1, 143, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1977-10-15 00:14:10', '1985-02-17 04:11:34'),
	(150, 4, 144, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1983-08-06 19:32:25', '2013-08-27 11:46:06'),
	(151, 1, 145, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2013-05-16 05:46:16', '1981-03-27 19:04:06'),
	(152, 5, 146, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1981-03-12 12:33:09', '2017-06-18 00:41:51'),
	(153, 2, 147, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2013-04-20 18:29:24', '2005-07-27 04:05:02'),
	(154, 3, 148, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2001-08-22 20:33:34', '2010-09-15 10:36:50'),
	(155, 3, 149, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2001-12-05 05:39:42', '2014-08-14 00:02:29'),
	(156, 2, 150, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1981-07-14 20:30:48', '2000-08-18 21:56:08'),
	(157, 1, 151, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2004-03-09 12:39:31', '2015-12-20 01:33:44'),
	(158, 5, 152, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1973-05-03 06:04:29', '1988-02-12 08:38:35'),
	(159, 1, 153, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1984-02-18 06:34:26', '1979-09-16 08:25:27'),
	(160, 4, 154, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2017-09-03 04:51:28', '1997-02-23 12:32:00'),
	(161, 4, 155, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1991-12-07 07:45:03', '2018-05-05 11:26:59'),
	(162, 3, 156, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2010-08-16 13:45:11', '2000-08-13 20:18:29'),
	(163, 1, 157, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1995-09-27 15:40:05', '1977-10-14 12:31:21'),
	(164, 5, 158, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2016-01-17 10:30:32', '1981-03-06 21:43:41'),
	(165, 4, 159, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1991-03-24 22:45:46', '1988-04-23 20:45:10'),
	(166, 5, 160, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1973-02-06 03:06:33', '1982-10-14 15:00:15'),
	(167, 3, 161, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2015-01-03 21:21:07', '2009-05-20 19:14:03'),
	(168, 5, 162, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1976-08-16 13:17:02', '1971-05-05 19:13:59'),
	(169, 4, 163, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2001-02-02 07:02:33', '1990-06-07 11:37:07'),
	(170, 1, 164, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2003-05-11 12:54:52', '1988-04-03 12:55:36'),
	(171, 2, 165, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1982-09-21 06:28:50', '2012-05-15 09:20:50'),
	(172, 4, 166, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1992-08-09 17:44:59', '2012-09-28 10:01:57'),
	(173, 3, 167, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2019-05-04 03:14:15', '2013-06-30 22:09:01'),
	(174, 1, 168, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2013-04-27 04:17:21', '2008-03-09 01:43:39'),
	(175, 5, 169, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1996-08-09 22:51:51', '2013-03-22 19:49:33'),
	(176, 2, 170, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2005-08-25 18:01:00', '1971-11-21 05:18:51'),
	(177, 2, 171, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1974-06-13 23:25:17', '1999-04-12 02:36:23'),
	(178, 1, 172, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1986-12-04 15:34:06', '1996-01-09 21:43:12'),
	(179, 3, 173, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2003-02-07 01:33:39', '1988-07-30 03:22:07'),
	(180, 3, 174, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2005-12-13 03:16:44', '1984-01-16 10:41:54'),
	(181, 1, 175, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1973-08-30 08:56:05', '1980-08-30 15:43:41'),
	(182, 1, 176, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1998-04-01 03:08:57', '1972-06-04 01:43:23'),
	(183, 2, 177, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1997-10-23 22:25:04', '1973-12-11 10:09:36'),
	(184, 1, 178, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2008-02-25 22:14:28', '2003-08-13 23:34:12'),
	(185, 4, 179, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1970-04-16 00:20:12', '1995-06-26 00:27:20'),
	(186, 4, 180, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2013-07-22 21:43:57', '1976-03-03 04:19:53'),
	(187, 2, 181, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1979-03-06 22:07:36', '2003-12-08 01:42:39'),
	(188, 1, 182, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1985-05-24 07:40:18', '1989-08-28 20:52:00'),
	(189, 4, 183, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2016-12-31 08:43:12', '2006-01-18 01:54:18'),
	(190, 4, 184, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2016-06-13 19:11:06', '2008-09-06 08:06:52'),
	(191, 5, 185, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2005-12-17 23:42:52', '2002-11-17 04:13:40'),
	(192, 1, 186, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1992-08-21 22:03:07', '1997-02-14 04:37:29'),
	(193, 4, 187, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2016-06-08 13:24:50', '1990-10-29 12:08:47'),
	(194, 1, 188, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1976-04-08 19:59:18', '1980-03-05 11:29:07'),
	(195, 5, 189, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2015-05-31 09:17:07', '2003-02-27 16:03:30'),
	(196, 1, 190, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2001-06-06 06:26:30', '1977-08-30 23:43:43'),
	(197, 2, 191, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1984-06-19 02:48:08', '2000-11-05 05:40:13'),
	(198, 3, 192, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2003-09-17 16:03:09', '2008-01-15 06:25:25'),
	(199, 5, 193, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1975-10-25 19:14:08', '2012-11-18 00:34:25'),
	(200, 1, 194, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1985-01-28 20:46:42', '2015-05-07 07:48:07'),
	(201, 5, 195, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1988-07-27 07:17:55', '2015-06-13 02:03:32'),
	(202, 2, 196, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1971-03-15 15:52:50', '1980-01-04 14:01:45'),
	(203, 3, 197, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1977-03-26 09:26:28', '1980-01-17 16:33:31'),
	(204, 1, 198, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1973-10-03 03:17:06', '2014-07-02 09:17:26'),
	(205, 5, 199, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1998-04-28 15:56:24', '1992-09-29 21:50:00'),
	(206, 5, 200, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2001-11-13 05:08:02', '1980-03-14 07:43:13'),
	(207, 3, 201, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1986-02-22 15:14:02', '1999-09-04 10:09:31'),
	(208, 3, 202, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2000-05-19 01:41:47', '1993-08-26 18:14:20'),
	(209, 3, 203, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1978-03-08 07:46:09', '2003-07-19 02:39:04'),
	(210, 4, 204, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2004-09-01 08:53:56', '1971-05-10 10:43:30'),
	(211, 5, 205, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2002-01-31 19:16:15', '1997-04-22 20:25:51'),
	(212, 3, 206, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2014-08-11 07:03:00', '1978-04-22 05:08:36'),
	(213, 4, 207, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2013-08-22 22:11:52', '2004-10-09 15:40:54'),
	(214, 1, 208, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1970-09-10 02:50:34', '2013-07-05 23:29:01'),
	(215, 3, 209, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2012-08-09 19:02:10', '1999-04-27 12:28:36'),
	(216, 4, 210, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2004-04-25 13:54:01', '2015-08-04 19:56:26'),
	(217, 4, 211, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1989-11-04 03:06:53', '1980-08-26 10:32:28'),
	(218, 3, 212, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1973-01-21 14:17:32', '1986-01-24 10:39:31'),
	(219, 5, 213, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2000-07-03 08:46:03', '2010-03-31 15:37:22'),
	(220, 3, 214, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1970-09-17 08:41:19', '1980-12-01 11:41:02'),
	(221, 1, 215, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2012-07-20 15:18:36', '2011-12-23 12:12:11'),
	(222, 3, 216, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2005-03-21 05:28:46', '1992-04-26 04:41:15'),
	(223, 5, 217, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1978-05-28 07:06:43', '1981-08-30 23:34:31'),
	(224, 3, 218, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1970-02-13 07:26:52', '1970-08-09 13:30:40'),
	(225, 4, 219, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1991-07-27 02:38:07', '1985-09-07 16:54:59'),
	(226, 3, 220, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2017-01-04 05:06:47', '2003-05-13 05:55:10'),
	(227, 1, 221, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2002-09-08 04:19:33', '2005-01-07 21:56:05'),
	(228, 4, 222, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2008-11-26 16:59:33', '1997-09-20 14:13:53'),
	(229, 5, 223, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1982-11-06 17:12:19', '1970-05-04 03:01:35'),
	(230, 1, 224, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2014-01-30 09:02:16', '2009-12-20 07:12:23'),
	(231, 5, 225, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2002-04-12 07:29:18', '1983-03-22 02:05:41'),
	(232, 2, 226, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2000-07-23 09:28:54', '2000-12-25 21:24:59'),
	(233, 3, 227, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1991-08-06 22:07:47', '1989-12-30 07:33:04'),
	(234, 3, 228, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1980-08-07 05:40:01', '2000-07-11 19:39:17'),
	(235, 2, 229, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1980-01-06 06:18:12', '2016-02-18 18:55:54'),
	(236, 1, 230, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1981-12-03 19:42:27', '1973-07-31 18:07:26'),
	(237, 5, 231, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1974-11-26 20:38:46', '2013-06-26 00:19:36'),
	(238, 4, 232, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1998-11-12 07:45:57', '2007-07-07 07:16:56'),
	(239, 3, 233, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1989-04-11 19:19:46', '2008-07-24 06:25:32'),
	(240, 3, 234, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1971-02-27 21:26:57', '1996-02-04 03:18:03'),
	(241, 1, 235, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1995-04-07 17:08:25', '1971-08-17 10:39:18'),
	(242, 3, 236, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1996-03-21 09:26:37', '1980-06-10 15:22:43'),
	(243, 4, 237, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2018-04-21 18:36:27', '1971-11-01 17:53:02'),
	(244, 4, 238, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1981-11-08 15:51:13', '2016-04-14 01:54:42'),
	(245, 4, 239, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2016-03-19 19:11:47', '2014-04-26 04:57:22'),
	(246, 3, 240, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1987-10-01 02:07:31', '2001-03-08 22:39:05'),
	(247, 1, 241, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1985-06-16 03:06:28', '2005-10-01 01:30:43'),
	(248, 5, 242, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1984-08-27 10:38:35', '1972-09-03 17:44:43'),
	(249, 3, 243, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1997-07-25 23:46:00', '2014-03-09 13:56:18'),
	(250, 5, 244, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2000-02-08 06:35:36', '1985-09-25 23:32:59'),
	(251, 5, 245, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1984-02-11 06:40:55', '2017-12-01 05:41:14'),
	(252, 3, 246, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2019-08-25 13:43:11', '1989-02-14 14:16:42'),
	(253, 3, 247, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1979-09-26 05:39:31', '2018-09-01 02:51:32'),
	(254, 4, 248, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2006-10-26 21:40:44', '1989-07-26 13:32:12'),
	(255, 1, 249, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1974-03-11 03:38:03', '2003-08-19 19:25:36'),
	(256, 1, 250, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2016-06-02 20:29:08', '2019-03-30 17:49:36'),
	(257, 1, 251, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1971-12-25 19:40:26', '1980-12-25 11:44:43'),
	(258, 4, 252, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2008-04-08 06:57:49', '2018-11-29 20:39:38'),
	(259, 3, 253, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2008-04-01 23:06:10', '1994-10-24 17:15:39'),
	(260, 5, 254, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1971-06-14 20:57:56', '1970-01-23 16:20:49'),
	(261, 2, 255, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2012-06-08 01:33:05', '1998-09-11 01:45:42'),
	(262, 4, 256, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2018-12-12 04:05:47', '2016-03-22 17:38:37'),
	(263, 1, 257, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2005-04-08 13:50:56', '2002-10-30 04:38:09'),
	(264, 5, 258, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1999-09-16 17:12:46', '2012-12-13 21:32:08'),
	(265, 5, 259, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1988-02-07 00:35:06', '1983-05-08 06:36:37'),
	(266, 2, 260, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2002-09-07 04:44:08', '2011-03-08 10:12:01'),
	(267, 5, 261, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2011-03-05 09:30:01', '2015-04-14 06:32:16'),
	(268, 3, 262, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1979-10-24 01:18:10', '2012-09-06 06:58:59'),
	(269, 2, 263, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2001-02-01 21:20:51', '2003-07-13 13:11:27'),
	(270, 2, 264, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2014-01-08 13:53:48', '1985-11-11 23:43:01'),
	(271, 3, 265, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1991-11-03 01:51:03', '2018-01-11 17:13:53'),
	(272, 5, 266, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1970-04-05 10:21:14', '2000-12-10 00:10:01'),
	(273, 2, 267, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2019-09-29 12:01:14', '2008-03-22 03:33:28'),
	(274, 4, 268, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2018-05-13 18:44:44', '2016-01-27 22:14:50'),
	(275, 1, 269, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2019-10-05 19:18:41', '1993-03-19 19:53:22'),
	(276, 1, 270, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2014-08-13 05:58:43', '1981-05-13 08:09:28'),
	(277, 4, 271, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2019-08-21 11:57:56', '2017-08-26 14:27:24'),
	(278, 5, 272, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2007-01-12 04:39:45', '2003-08-16 11:24:53'),
	(279, 4, 273, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1999-06-27 01:22:56', '1992-08-25 10:31:02'),
	(280, 4, 274, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1987-12-24 02:20:39', '2015-03-29 13:39:25'),
	(281, 4, 275, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1971-04-24 03:28:53', '2000-03-11 17:28:47'),
	(282, 2, 276, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1997-07-19 22:21:24', '1978-02-09 16:06:47'),
	(283, 4, 277, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1994-02-15 13:07:35', '2001-08-25 10:11:49'),
	(284, 1, 278, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2003-01-17 16:05:51', '1982-07-31 02:12:53'),
	(285, 5, 279, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2004-09-10 02:18:48', '1970-11-03 17:31:41'),
	(286, 2, 280, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2013-06-14 02:44:37', '2010-07-18 09:39:02'),
	(287, 5, 281, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1981-06-20 11:33:57', '2015-05-01 11:02:23'),
	(288, 5, 282, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1977-12-08 22:23:59', '2012-07-25 11:59:13'),
	(289, 1, 283, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1995-09-30 02:40:56', '2000-12-08 15:30:53'),
	(290, 4, 284, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1979-10-02 17:40:10', '2019-08-23 08:22:18'),
	(291, 1, 285, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1978-08-04 10:02:47', '1988-01-29 02:04:36'),
	(292, 4, 286, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1970-01-25 19:49:52', '1979-09-21 17:05:19'),
	(293, 1, 287, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2008-09-20 20:27:02', '1983-09-09 04:10:18'),
	(294, 2, 288, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1981-11-15 00:15:20', '2013-10-04 05:17:33'),
	(295, 4, 289, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1981-12-21 10:36:42', '1995-08-04 18:49:43'),
	(296, 1, 290, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2016-06-09 23:05:03', '2000-11-23 14:41:58'),
	(297, 5, 291, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1983-04-05 14:40:07', '2016-12-14 07:51:42'),
	(298, 1, 292, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1995-06-23 18:24:58', '2014-02-16 19:52:02'),
	(299, 5, 293, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1971-08-19 13:22:44', '2006-05-19 03:36:09'),
	(300, 5, 294, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1978-09-03 04:49:23', '2000-11-23 22:42:12'),
	(301, 3, 295, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2016-08-31 17:11:59', '2016-01-22 02:52:54'),
	(302, 4, 296, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2008-11-03 08:08:26', '1996-11-29 01:58:23'),
	(303, 2, 297, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1994-07-04 07:09:45', '1994-04-14 01:01:03'),
	(304, 1, 298, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1980-08-23 16:49:46', '1985-08-05 11:25:43'),
	(305, 2, 299, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2018-02-17 03:23:50', '1998-09-07 05:21:13'),
	(306, 3, 300, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1971-03-21 01:16:13', '2010-07-29 08:31:30'),
	(307, 3, 301, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1984-01-27 00:39:45', '2003-09-04 03:28:26'),
	(308, 4, 302, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1996-04-07 20:05:25', '2018-10-16 07:27:00'),
	(309, 2, 303, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1997-01-29 12:54:39', '1995-09-27 19:22:17'),
	(310, 1, 304, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2001-07-07 09:26:09', '1990-05-24 05:30:58'),
	(311, 4, 305, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2007-03-01 09:26:32', '1982-08-28 20:51:19'),
	(312, 5, 306, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1980-04-12 00:37:15', '1986-09-23 08:26:52'),
	(313, 5, 307, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1971-11-12 00:03:05', '1993-07-27 13:58:46'),
	(314, 4, 308, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2002-08-18 15:52:51', '2014-01-11 08:43:34'),
	(315, 4, 309, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1997-03-14 06:54:56', '1984-07-04 07:40:42'),
	(316, 5, 310, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2010-10-04 05:41:28', '2016-11-28 12:10:38'),
	(317, 3, 311, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1982-06-10 12:19:19', '1990-01-06 23:37:44'),
	(318, 5, 312, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2005-03-26 05:20:12', '2001-01-15 04:01:10'),
	(319, 3, 313, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1997-05-28 10:45:24', '1998-07-31 21:59:33'),
	(320, 4, 314, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1989-10-09 09:39:06', '1972-01-30 13:46:38'),
	(321, 4, 315, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1971-04-11 17:11:30', '2008-06-01 20:10:23'),
	(322, 4, 316, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1998-09-17 08:01:54', '1993-03-31 11:17:59'),
	(323, 3, 317, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1989-04-24 20:46:32', '2004-05-03 14:57:32'),
	(324, 5, 318, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1991-04-05 11:08:20', '1995-08-06 19:52:16'),
	(325, 2, 319, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2015-04-15 22:16:28', '2002-09-22 15:27:00'),
	(326, 1, 320, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2017-03-18 03:35:35', '1975-07-21 13:09:53'),
	(327, 3, 321, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1992-03-11 12:13:49', '1988-07-18 07:28:54'),
	(328, 3, 322, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1981-03-21 19:51:24', '2004-04-12 10:25:02'),
	(329, 5, 323, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2016-09-14 05:15:12', '2018-12-24 01:23:17'),
	(330, 5, 324, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1976-06-17 17:19:18', '2005-05-29 11:40:11'),
	(331, 2, 325, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1991-08-08 22:37:51', '1985-12-15 23:40:41'),
	(332, 1, 326, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1977-12-30 11:57:52', '1977-11-27 06:37:20'),
	(333, 4, 327, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1971-11-18 07:14:38', '1986-04-15 07:08:38'),
	(334, 4, 328, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1983-01-18 07:27:04', '2016-07-19 01:59:45'),
	(335, 2, 329, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1980-06-10 01:33:26', '2014-03-29 22:15:33'),
	(336, 4, 330, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1995-06-15 05:41:07', '1978-09-15 06:12:04'),
	(337, 3, 331, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1986-09-12 15:07:26', '1996-08-12 01:20:55'),
	(338, 2, 332, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1970-10-15 08:15:34', '2018-05-22 14:36:21'),
	(339, 4, 333, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2003-01-28 09:21:35', '1977-03-09 19:07:34'),
	(340, 4, 334, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2003-06-01 18:35:01', '1989-11-19 07:31:35'),
	(341, 4, 335, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1987-01-28 07:04:03', '1971-06-17 20:00:57'),
	(342, 1, 336, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2001-07-14 14:11:21', '1992-06-03 03:57:15'),
	(343, 5, 337, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1982-05-30 01:09:01', '1999-04-15 20:48:41'),
	(344, 1, 338, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1985-01-15 06:42:12', '2013-09-28 04:50:59'),
	(345, 4, 339, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1993-06-14 02:23:28', '1998-01-20 10:49:20'),
	(346, 1, 340, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1976-01-04 09:21:44', '2007-07-13 17:39:15'),
	(347, 3, 341, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2012-10-04 07:00:27', '1992-03-08 14:28:09'),
	(348, 2, 342, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2005-02-11 19:27:52', '1975-09-07 21:04:25'),
	(349, 5, 343, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1972-12-19 17:27:56', '2014-05-05 05:51:19'),
	(350, 1, 344, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1983-03-20 08:05:28', '1989-04-21 14:35:30'),
	(351, 1, 345, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2006-03-19 17:39:14', '1989-10-06 13:13:39'),
	(352, 2, 346, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2010-05-29 16:16:15', '1991-01-19 16:59:39'),
	(353, 3, 347, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1995-09-21 13:26:35', '1970-07-06 18:08:13'),
	(354, 5, 348, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1998-04-12 09:25:47', '1989-02-03 22:10:53'),
	(355, 4, 349, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1987-02-27 23:30:42', '2018-02-14 00:03:29'),
	(356, 1, 350, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2015-06-30 07:27:30', '2001-09-06 23:43:15'),
	(357, 5, 351, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1982-05-05 00:06:45', '1992-11-11 20:27:20'),
	(358, 5, 352, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1997-07-09 10:42:34', '1999-09-05 08:59:28'),
	(359, 3, 353, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1978-09-30 09:24:12', '1971-02-11 22:41:37'),
	(360, 3, 354, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1988-03-28 06:27:15', '1995-01-01 18:58:43'),
	(361, 4, 355, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1989-04-02 08:16:01', '1986-10-19 12:52:38'),
	(362, 4, 356, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2015-07-22 07:07:06', '1992-03-11 16:57:38'),
	(363, 1, 357, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2013-07-23 13:36:33', '1992-08-04 20:15:52'),
	(364, 2, 358, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2017-05-13 23:39:36', '2012-07-30 00:32:30'),
	(365, 2, 359, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1990-05-21 12:55:40', '1974-01-08 05:18:14'),
	(366, 3, 360, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2010-08-29 04:56:54', '2008-09-11 02:23:29'),
	(367, 2, 361, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2010-02-15 07:50:25', '2016-10-19 00:01:41'),
	(368, 3, 362, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1993-02-01 14:16:45', '2006-02-19 19:10:24'),
	(369, 4, 363, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1974-12-08 23:56:48', '1994-06-06 08:46:47'),
	(370, 5, 364, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1989-11-09 11:27:38', '1975-10-27 19:45:56'),
	(371, 3, 365, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2001-03-12 15:44:01', '1990-10-16 19:03:50'),
	(372, 3, 366, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2012-01-11 15:07:15', '1971-10-18 11:58:16'),
	(373, 3, 367, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2005-03-21 13:16:25', '1981-11-28 23:05:31'),
	(374, 5, 368, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1981-09-17 14:23:44', '1995-08-08 14:17:47'),
	(375, 3, 369, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2009-12-01 01:33:51', '1971-07-22 22:17:11'),
	(376, 3, 370, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1984-07-28 14:56:53', '1992-11-12 01:45:53'),
	(377, 2, 371, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1975-07-15 18:23:24', '1990-03-29 08:35:57'),
	(378, 4, 372, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2013-10-06 20:26:59', '1979-04-28 15:50:40'),
	(379, 4, 373, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1973-10-11 19:19:05', '1992-06-03 23:13:10'),
	(380, 4, 374, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2010-01-17 06:31:47', '2000-05-07 17:11:30'),
	(381, 5, 375, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2014-10-07 00:25:48', '2013-04-18 21:33:36'),
	(382, 4, 376, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1995-01-02 18:41:48', '1984-12-26 05:20:43'),
	(383, 1, 377, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1995-12-14 18:04:38', '1989-11-07 12:18:15'),
	(384, 2, 378, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1980-03-30 23:41:17', '2007-03-02 15:08:10'),
	(385, 1, 379, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1998-06-13 20:00:11', '1971-11-19 15:29:39'),
	(386, 4, 380, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2002-10-09 13:01:59', '1978-09-27 04:39:53'),
	(387, 1, 381, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1996-01-09 21:43:10', '1973-01-29 09:45:34'),
	(388, 1, 382, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1978-08-30 06:43:57', '2002-06-04 11:39:38'),
	(389, 2, 383, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1993-06-25 06:15:32', '2015-08-10 19:39:52'),
	(390, 5, 384, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1999-01-27 05:21:56', '1972-08-22 12:27:01'),
	(391, 3, 385, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2010-02-22 02:26:05', '1970-04-27 09:33:09'),
	(392, 1, 386, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1986-07-04 02:14:18', '2006-01-10 01:11:47'),
	(393, 1, 387, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1984-01-11 19:21:58', '2002-11-11 06:55:44'),
	(394, 2, 388, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2009-09-03 13:16:12', '1991-07-07 13:35:31'),
	(395, 5, 389, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1973-10-21 20:02:00', '1971-08-18 02:29:27'),
	(396, 4, 390, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1978-09-18 11:46:59', '2001-04-07 22:32:37'),
	(397, 3, 391, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2016-05-22 12:49:37', '1977-08-03 08:14:00'),
	(398, 3, 392, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2000-02-26 08:09:05', '2013-04-30 06:55:21'),
	(399, 4, 393, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2005-09-19 05:41:55', '2005-02-01 13:46:18'),
	(400, 3, 394, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1987-06-03 16:39:08', '2005-07-14 06:43:44'),
	(401, 2, 395, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1992-01-17 11:48:06', '2013-05-25 18:35:34'),
	(402, 3, 396, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2018-02-08 21:04:55', '2015-10-10 04:15:09'),
	(403, 1, 397, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1974-11-18 18:28:21', '1987-05-08 02:05:42'),
	(404, 2, 398, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1975-06-24 16:21:49', '1998-01-03 19:00:28'),
	(405, 3, 399, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 1, 1, 0, '1978-07-16 19:11:01', '2019-11-25 08:06:09');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;

-- Dumping structure for table 517_shop.order_fractive_request
CREATE TABLE IF NOT EXISTS `order_fractive_request` (
  `order_id` bigint(20) unsigned NOT NULL,
  `product_pins` longtext COLLATE utf8_persian_ci NOT NULL,
  `document` longtext COLLATE utf8_persian_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `type` tinyint(1) NOT NULL DEFAULT 0,
  `post_barcode` varchar(50) COLLATE utf8_persian_ci DEFAULT NULL,
  `order_weight` float DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`order_id`),
  CONSTRAINT `FK_order_request__order` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci COMMENT='این جدول درخواست اپراتور به انباردار برای مشخص کردن کسری و یا معیوبی است.کلمه اخر نام جدول ترکیب کسری و معیوبی است.';

-- Dumping data for table 517_shop.order_fractive_request: ~0 rows (approximately)
/*!40000 ALTER TABLE `order_fractive_request` DISABLE KEYS */;
INSERT INTO `order_fractive_request` (`order_id`, `product_pins`, `document`, `status`, `type`, `post_barcode`, `order_weight`, `created_at`, `updated_at`) VALUES
	(1, '[{"product":{"id":1,"title":"\\u0645\\u062d\\u0635\\u0648\\u0644 \\u0634\\u0645\\u0627\\u0631\\u0647 \\u06cc\\u06a9"},"attributes":[],"brand":{"id":1,"title":"\\u0645\\u0627\\u06cc"},"count":5,"price":"100,000","discount":"0","fractional_count":1,"defactive_count":0,"total":"500,000"},{"product":{"id":2,"title":"\\u0645\\u062d\\u0635\\u0648\\u0644 \\u0634\\u0645\\u0627\\u0631 \\u062f\\u0648"},"attributes":[],"brand":{"id":1,"title":"\\u0645\\u0627\\u06cc"},"count":2,"price":"20,000","discount":"0","fractional_count":0,"defactive_count":0,"total":"40,000"}]', NULL, 0, 0, NULL, NULL, '2019-11-21 15:16:08', '2019-11-21 15:16:08');
/*!40000 ALTER TABLE `order_fractive_request` ENABLE KEYS */;

-- Dumping structure for table 517_shop.order_in_anbar
CREATE TABLE IF NOT EXISTS `order_in_anbar` (
  `order_id` bigint(20) unsigned NOT NULL,
  `anbar_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `FK_order_in_anbar_anbar` (`anbar_id`),
  CONSTRAINT `FK_order_in_anbar_anbar` FOREIGN KEY (`anbar_id`) REFERENCES `anbar` (`id`),
  CONSTRAINT `FK_order_in_anbar_order` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- Dumping data for table 517_shop.order_in_anbar: ~3 rows (approximately)
/*!40000 ALTER TABLE `order_in_anbar` DISABLE KEYS */;
INSERT INTO `order_in_anbar` (`order_id`, `anbar_id`) VALUES
	(1, 1),
	(5, 1),
	(11, 1);
/*!40000 ALTER TABLE `order_in_anbar` ENABLE KEYS */;

-- Dumping structure for table 517_shop.order_post_info
CREATE TABLE IF NOT EXISTS `order_post_info` (
  `order_id` bigint(20) unsigned NOT NULL,
  `region_id` bigint(20) unsigned NOT NULL,
  `full_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `national_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postal_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `FK_order_post_info_region` (`region_id`),
  CONSTRAINT `FK_order_post_info_order` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`),
  CONSTRAINT `FK_order_post_info_region` FOREIGN KEY (`region_id`) REFERENCES `region` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.order_post_info: ~401 rows (approximately)
/*!40000 ALTER TABLE `order_post_info` DISABLE KEYS */;
INSERT INTO `order_post_info` (`order_id`, `region_id`, `full_name`, `national_code`, `mobile`, `phone`, `postal_code`, `address`, `created_at`, `updated_at`) VALUES
	(1, 1, 'مهرداد معصومی', '3920206231', '09361753251', '0215486455', '3920206231', 'م.ونک-خ.ملاصدرا-خ.شیخ بهایی شمالی-خ.صائب تبریزی-پلاک 1', '2019-11-10 23:45:03', '2019-11-10 23:45:03'),
	(6, 1, 'شیدا صدیق', '11311672495', '02618996145', '02141358972', '5543928506', 'یزد خیابان حیاتی ساختمان نگار کد پستی 2739455319', NULL, NULL),
	(7, 1, 'مقصود لوکس', '36130662985', '02695201238', '02626068447', '6345258305', 'استان قم خیابان معارف ساختمان موسی کد پستی 2326849855', NULL, NULL),
	(8, 1, 'آقای شادان ستاری', '53448185463', '03106829554', '02621809048', '3798828089', 'استان اردبیل خیابان کهنمویی ساختمان شیرویه پلاک 82', NULL, NULL),
	(9, 1, 'شعله آشوری', '36937988920', '02115930409', '02194713101', '3089818564', 'استان خراسان جنوبی خیابان محدثی ساختمان سامان قطعه 83 کد پستی 6456265739', NULL, NULL),
	(10, 1, 'استاد ساره گل', '26263642073', '02695364048', '02610655785', '5164575064', 'کرمانشاه خیابان داد ساختمان جهانیار قطعه 47', NULL, NULL),
	(11, 1, 'لیث ابریشمی', '48076620043', '02631067285', '03137839191', '3160588417', 'استان خوزستان خیابان فریاد ساختمان واروژ پلاک 27', NULL, NULL),
	(12, 1, 'پریچهر نوبخت', '28099460036', '02622601770', '02636276631', '9742893367', 'استان قزوین خیابان نجفی ساختمان شووان قطعه 78', NULL, NULL),
	(13, 1, 'ژیله طالقانی', '73444677107', '03164398009', '03153523233', '7318519885', 'خوزستان خیابان رسولی ساختمان مَلِک پلاک 55 کد پستی 0057049217', NULL, NULL),
	(14, 1, 'مرتیا ابریشمی', '39080228707', '02122833289', '03127653402', '3615490633', 'استان اردبیل خیابان مشا ساختمان ارستو', NULL, NULL),
	(15, 1, 'نگار نقدی', '88070693249', '03123894633', '02686699241', '4788886895', 'استان قزوین خیابان زهرایی ساختمان فرّخ کد پستی 6035977318', NULL, NULL),
	(16, 1, 'استاد آذین دخت پورناظری', '64111723764', '03192245794', '02644017104', '6591190819', 'استان بوشهر خیابان قنبری ساختمان بهپور پلاک 54 کد پستی 0123856752', NULL, NULL),
	(17, 1, 'دکتر میعاد وکیلی', '90128597232', '02140627663', '02170028819', '7030962042', 'استان بوشهر خیابان پایور ساختمان زنبق کد پستی 6517492730', NULL, NULL),
	(18, 1, 'دکتر زال قهستانی', '756063931', '02619898529', '02181745184', '5943105244', 'قزوین خیابان دهقان ساختمان فیروزه کد پستی 9755891088', NULL, NULL),
	(19, 1, 'آیدین اصلانی', '65170551885', '02687364385', '03132980105', '4525348740', 'قزوین خیابان اشکوری ساختمان حمیرا', NULL, NULL),
	(20, 1, 'ماهرخسارر امانت', '10470082372', '03135087579', '02659863814', '3708804271', 'گیلان خیابان بدخشانی ساختمان کامبیز', NULL, NULL),
	(21, 1, 'ملوس توسلی', '41075275589', '02107970163', '03120781263', '7294744481', 'استان ایلام خیابان مرتضوی ساختمان هدیه کد پستی 1025025802', NULL, NULL),
	(22, 1, 'کاووس خسروپناه', '30827373703', '03157421450', '02671102808', '5794420137', 'استان قم خیابان نواب ساختمان صلاح کد پستی 9932090167', NULL, NULL),
	(23, 1, 'خانم رونق ابطحی', '16001531694', '02694630079', '03108655792', '1208108212', 'گلستان خیابان راوندی ساختمان لیلی کد پستی 3387625574', NULL, NULL),
	(24, 1, 'ژکفر کیمیایی', '44162585237', '02632904974', '02684135920', '7839352677', 'تهران خیابان ملکیان ساختمان کاژیره قطعه 22 کد پستی 5035751730', NULL, NULL),
	(25, 1, 'استاد برزین صدر', '84601755964', '03138528187', '02171462155', '6404299448', 'آذربایجان غربی خیابان موسوی ساختمان کاوه', NULL, NULL),
	(26, 1, 'پرنیا رستمی', '7704639217', '02119871403', '02657328789', '1521481238', 'استان کرمانشاه خیابان گل ساختمان شوشا کد پستی 1816284420', NULL, NULL),
	(27, 1, 'سمند یثربی', '64934663781', '02685040592', '02148906723', '8458437792', 'گلستان خیابان رحمانیان ساختمان زادمهر', NULL, NULL),
	(28, 1, 'والا تبریزی', '72304684411', '03110173800', '02603325694', '2477470855', 'استان خراسان جنوبی خیابان پناهیان ساختمان فرینوش قطعه 68 کد پستی 8057881371', NULL, NULL),
	(29, 1, 'آیسل فریاد', '86172682634', '02691271776', '02637692612', '2179568012', 'استان فارس خیابان آختاچی ساختمان ناجی کد پستی 7643915743', NULL, NULL),
	(30, 1, 'آبان فولادوند', '20989317814', '02619362568', '02615533931', '0619181387', 'استان فارس خیابان آژند ساختمان تلیمان قطعه 90 کد پستی 3907106483', NULL, NULL),
	(31, 1, 'سارا واعظ‌زاده', '77668498282', '02109834774', '02146116074', '1067770029', 'اردبیل خیابان تبریزی ساختمان نوین', NULL, NULL),
	(32, 1, 'مهندس طاوس الهام', '6923067439', '02175432329', '02618896751', '8712126949', 'کهگیلویه و بویراحمد خیابان صغیری ساختمان نرگس', NULL, NULL),
	(33, 1, 'شایان شاه‌حسینی', '96891149458', '02162670491', '03117640709', '1213954454', 'استان فارس خیابان فنی‌زاده ساختمان رامبُد قطعه 62', NULL, NULL),
	(34, 1, 'استاد صدف مهدی‌پور', '34914770832', '02153273820', '03102426725', '6200385796', 'کرمان خیابان شیروانی ساختمان لیث پلاک 47 کد پستی 5861011627', NULL, NULL),
	(35, 1, 'رخند محمدی', '73349843872', '03123248411', '03130078428', '3137581356', 'استان چهارمحال و بختیاری خیابان امین‌زاده ساختمان آذرگل پلاک 44 کد پستی 1974428113', NULL, NULL),
	(36, 1, 'عرفان هاشمی', '36308239208', '02682074125', '02115535042', '8947560322', 'بوشهر خیابان امین‌زاده ساختمان سلیمان قطعه 29', NULL, NULL),
	(37, 1, 'نگارین هاشمیان', '98103993407', '03110906350', '02132923411', '2340104771', 'سیستان و بلوچستان خیابان نیلوفری ساختمان مشیا', NULL, NULL),
	(38, 1, 'ونیژه عزیزی', '93943129977', '02180352689', '02125020973', '2136728808', 'استان اصفهان خیابان لنکرانی ساختمان صدیقه قطعه 11', NULL, NULL),
	(39, 1, 'نرگس دیباج', '4551043092', '02653597158', '03142121753', '1154253337', 'استان خراسان جنوبی خیابان ایمانی ساختمان نیو پلاک 41 کد پستی 2312155399', NULL, NULL),
	(40, 1, 'فرجام فرامرزی', '37857652063', '02633429282', '03129925984', '8447149119', 'قم خیابان پناهنده ساختمان انسیه قطعه 66', NULL, NULL),
	(41, 1, 'پروچیستا انوری', '39673771868', '02171634766', '02125103216', '7642093818', 'کرمان خیابان بیگی ساختمان دل افرز پلاک 79', NULL, NULL),
	(42, 1, 'حاتفه حبیبی', '2871018866', '02164586193', '02607103794', '1448338313', 'استان کرمان خیابان بزرگی ساختمان یازان قطعه 27', NULL, NULL),
	(43, 1, 'کاووس لنکرانی', '13020846791', '03155003449', '02681711760', '3536123645', 'هرمزگان خیابان کریمی ساختمان چلیپا', NULL, NULL),
	(44, 1, 'ناژین دانایی‌فر', '67905933131', '02616250461', '02648843258', '3113051662', 'استان کردستان خیابان بختیاری ساختمان دلکش', NULL, NULL),
	(45, 1, 'دکتر ژاله معروف', '72833009300', '02106384324', '02171066321', '3115478117', 'استان خراسان جنوبی خیابان هاشمیان ساختمان سزانه قطعه 63 کد پستی 5405299091', NULL, NULL),
	(46, 1, 'مردآویج سبحانی', '43318284125', '03176668574', '02189589942', '6285263553', 'خراسان رضوی خیابان کیانی ساختمان آران', NULL, NULL),
	(47, 1, 'منصور اعتماد', '84894380746', '02182915802', '02184874418', '6311329542', 'مرکزی خیابان خمسه ساختمان کامکار پلاک 99', NULL, NULL),
	(48, 1, 'گل نسرین دری', '47602833375', '02181012618', '03187052776', '1798149796', 'گلستان خیابان خوئینی‌ها ساختمان رامبُد', NULL, NULL),
	(49, 1, 'یاسمین باستانی', '18603942317', '02191086624', '02175110798', '4090339346', 'گلستان خیابان شریعتی ساختمان وهاب قطعه 82', NULL, NULL),
	(50, 1, 'کترا رنجبر', '49293908033', '02188476180', '02686926559', '4080972949', 'زنجان خیابان هدایت ساختمان اُرند قطعه 27 کد پستی 4741457210', NULL, NULL),
	(51, 1, 'آفرین مفتاح', '94678860192', '02670545058', '03165218854', '4587102343', 'کردستان خیابان عراقی ساختمان نامی', NULL, NULL),
	(52, 1, 'سمینه کدیور', '36413403530', '02155812304', '03166476021', '3524360771', 'استان مازندران خیابان غنی ساختمان دانیال قطعه 16 کد پستی 0285751645', NULL, NULL),
	(53, 1, 'رامبهشت آریان‌پور', '53009135259', '03135309608', '03108504563', '5961994819', 'استان مازندران خیابان کلباسی ساختمان اُخشان پلاک 20', NULL, NULL),
	(54, 1, 'آتشبان پیران', '76486553903', '03115159226', '02177616074', '3587012392', 'هرمزگان خیابان شیخ‌الاسلامی ساختمان داریا قطعه 54 کد پستی 6686466090', NULL, NULL),
	(55, 1, 'مهروند مقدم', '11723564099', '02600049193', '02177572832', '3276691888', 'کهگیلویه و بویراحمد خیابان علی ساختمان برسام قطعه 37 کد پستی 3031517585', NULL, NULL),
	(56, 1, 'استاد یزدانفر پارسا', '56741204285', '03128459725', '02114870762', '8872872592', 'استان لرستان خیابان مرادخانی ساختمان نیّر', NULL, NULL),
	(57, 1, 'آلاله شیروانی', '25454273851', '02646565567', '02691088535', '3604037956', 'گلستان خیابان فنی‌زاده ساختمان جهان ناز پلاک 18', NULL, NULL),
	(58, 1, 'رهام آشوری', '23277518255', '02115908144', '02671380418', '9710820042', 'استان کرمانشاه خیابان روحانی ساختمان سروش', NULL, NULL),
	(59, 1, 'راجی صغیری', '76101229063', '02176588881', '03188630480', '9529911308', 'خراسان شمالی خیابان کاویانی ساختمان بهاربانو کد پستی 3530910089', NULL, NULL),
	(60, 1, 'مزدک تهرانی', '8110785324', '03146564658', '02686718983', '3537601105', 'اصفهان خیابان موسویان ساختمان داریا پلاک 87', NULL, NULL),
	(61, 1, 'بهدله غضنفری', '53855140750', '02647785201', '03103719869', '6743851598', 'گیلان خیابان خدایی ساختمان شیردخت پلاک 90', NULL, NULL),
	(62, 1, 'آرمان اشتری', '53813198024', '02621685666', '02192799247', '0898205163', 'خوزستان خیابان حسابی ساختمان ارغوان کد پستی 6504722788', NULL, NULL),
	(63, 1, 'شادورد حبیبی', '39667906666', '02130183980', '02158455435', '3813327780', 'بوشهر خیابان کیمیایی ساختمان رخند', NULL, NULL),
	(64, 1, 'نیکی سحابی', '87347150134', '02666180583', '03195713373', '6275629906', 'کرمانشاه خیابان قاضی ساختمان نازتا', NULL, NULL),
	(65, 1, 'جوانه شریعتمداری', '43913033333', '02198791973', '02618707002', '9516032877', 'استان خراسان شمالی خیابان خراسانی ساختمان مرتضی قطعه 32 کد پستی 4435890857', NULL, NULL),
	(66, 1, 'سلمک منوچهری', '25483697525', '02130502686', '02667712063', '4141750867', 'فارس خیابان شیروانی ساختمان دادبه قطعه 34', NULL, NULL),
	(67, 1, 'دکتر واله مستوفی', '81860450210', '02613170359', '03139844532', '7431953041', 'کرمانشاه خیابان پارسا ساختمان شیده قطعه 72', NULL, NULL),
	(68, 1, 'استاد بهار خوئینی‌ها', '87285060758', '02104918291', '02668888424', '0458856021', 'استان کرمانشاه خیابان طریقت ساختمان شهریار کد پستی 3450188654', NULL, NULL),
	(69, 1, 'اریکا حجتی', '95472165895', '02135887026', '02175469588', '4190909186', 'مرکزی خیابان ضرغامی ساختمان مهرسا پلاک 53', NULL, NULL),
	(70, 1, 'خانم افشک هاشمی', '57874814120', '02680847037', '03167615755', '8010488859', 'آذربایجان غربی خیابان راسخ ساختمان ساینا کد پستی 5222290566', NULL, NULL),
	(71, 1, 'شارود پارسی', '39978844752', '02621748030', '02601105047', '2587304453', 'قزوین خیابان نوبخت ساختمان مهرک کد پستی 8483050072', NULL, NULL),
	(72, 1, 'سلمک قنبری', '99409700325', '03149620131', '02126081853', '6377034065', 'استان فارس خیابان صدیقی ساختمان تابا پلاک 47 کد پستی 0278468895', NULL, NULL),
	(73, 1, 'آقای آریانا جهانبگلو', '74758848006', '02654927382', '03175935245', '5779942484', 'آذربایجان غربی خیابان هوشیار ساختمان گیتا کد پستی 8100763987', NULL, NULL),
	(74, 1, 'مهربان قنبری', '82250306932', '03100070351', '02642961670', '9104100289', 'استان قم خیابان شجاعی ساختمان آرا کد پستی 3725871436', NULL, NULL),
	(75, 1, 'آقای نیکزاد ابوذر', '66304117641', '02120944417', '02180713657', '8794996842', 'چهارمحال و بختیاری خیابان شجاعی ساختمان نکیسا', NULL, NULL),
	(76, 1, 'رخشان سپه‌وند', '1885198361', '03166313015', '02179624250', '2387505023', 'سمنان خیابان ستاری ساختمان مانوش', NULL, NULL),
	(77, 1, 'خرداد بخاری', '9761941297', '02674761718', '02635373405', '4346939404', 'مرکزی خیابان کاشی ساختمان فریور کد پستی 3064249005', NULL, NULL),
	(78, 1, 'استاد نسا اعلم', '12445899788', '02677926711', '02669397187', '2162728061', 'لرستان خیابان محمدرضایی ساختمان بها قطعه 90', NULL, NULL),
	(79, 1, 'بهاره انتظامی', '38198725765', '02698000312', '02196163733', '3193698559', 'آذربایجان شرقی خیابان شرع‌پسند ساختمان شورانگیز کد پستی 0537279058', NULL, NULL),
	(80, 1, 'دنا فتاحی', '17112382396', '02660201237', '03153230022', '8815139513', 'استان آذربایجان غربی خیابان هوشیار ساختمان بابوک پلاک 21', NULL, NULL),
	(81, 1, 'مهندس فریما شیخ‌الاسلامی', '66129722174', '02635413982', '02687809039', '0099371923', 'استان چهارمحال و بختیاری خیابان ابوذر ساختمان شاپور', NULL, NULL),
	(82, 1, 'فرورتیش معارف', '4375791729', '03180311078', '02138252555', '3630996829', 'لرستان خیابان جعفریان ساختمان یازان کد پستی 3586190410', NULL, NULL),
	(83, 1, 'استاد ستوده تبریزی', '8818048543', '03153680250', '02626028584', '9484546814', 'استان آذربایجان شرقی خیابان صانعی ساختمان مانک', NULL, NULL),
	(84, 1, 'شریف یاحقی', '14412945421', '02602706668', '03148312921', '3849957354', 'استان گیلان خیابان اشتری ساختمان فرزام کد پستی 4015483059', NULL, NULL),
	(85, 1, 'نیکی غنی', '64121257447', '03160566469', '02194106949', '8166763992', 'قم خیابان بزرگیان ساختمان ژکفر', NULL, NULL),
	(86, 1, 'ریماز فاطمی', '56029269640', '02666439591', '02617305172', '9799635576', 'یزد خیابان زهرایی ساختمان فرهود کد پستی 1689974556', NULL, NULL),
	(87, 1, 'فرجام عبدالکریمی', '15720378409', '02634213312', '02647528841', '8026701251', 'هرمزگان خیابان پارسا ساختمان آریامن', NULL, NULL),
	(88, 1, 'استاد انور موسویان', '24915564513', '03185210862', '02698679355', '1443916674', 'استان خراسان جنوبی خیابان شیروانی ساختمان عنایت قطعه 82 کد پستی 6644995379', NULL, NULL),
	(89, 1, 'نیکا چنگیزی', '8291895044', '03148958239', '02184295556', '5237295101', 'استان خوزستان خیابان علی ساختمان رُکندین پلاک 24', NULL, NULL),
	(90, 1, 'استاد ستّاره خدایی', '5253921219', '02686700797', '02188271326', '0256603589', 'استان آذربایجان شرقی خیابان کامکار ساختمان رُکندین قطعه 31', NULL, NULL),
	(91, 1, 'سینا اعلم', '57438143905', '02612704470', '03142818765', '4889611484', 'استان زنجان خیابان هراتی ساختمان گل آذین پلاک 45', NULL, NULL),
	(92, 1, 'پرخیده طریقت', '99867167805', '02670623502', '02103126948', '0924512452', 'استان آذربایجان شرقی خیابان سروش ساختمان مانی کد پستی 1951590955', NULL, NULL),
	(93, 1, 'روشنک نهاوندی', '6701890212', '03106682273', '03159957107', '4354527075', 'استان همدان خیابان پایا ساختمان آفری کد پستی 1740143307', NULL, NULL),
	(94, 1, 'پردیس محجوب', '20812149187', '02660546477', '03135173231', '6119439137', 'یزد خیابان فارسی ساختمان اسماعیل کد پستی 6571225775', NULL, NULL),
	(95, 1, 'هاشم نواب', '55173121942', '03135574355', '02148726186', '2004484782', 'هرمزگان خیابان لاهوتی ساختمان میعاد کد پستی 1514204567', NULL, NULL),
	(96, 1, 'استاد گلدوز شاه‌حسینی', '8810154489', '03133491657', '02626896188', '5784604002', 'کرمانشاه خیابان ندوشن ساختمان سیاوش قطعه 15 کد پستی 6070930646', NULL, NULL),
	(97, 1, 'کبری هامون', '46403761400', '03186855166', '03106426518', '9889533649', 'استان مرکزی خیابان پارسی ساختمان المیرا قطعه 33 کد پستی 5246686886', NULL, NULL),
	(98, 1, 'زیکا کیانی', '40757388553', '02685866501', '02108719483', '6362370078', 'استان قم خیابان کاویانی ساختمان بهاک کد پستی 6165831693', NULL, NULL),
	(99, 1, 'نوبان رنگرز', '97028442539', '03180433827', '02686463916', '5566676448', 'استان اردبیل خیابان نقیب‌زاده ساختمان واژه', NULL, NULL),
	(100, 1, 'فتنه هروی', '22722967543', '02662016070', '02659766647', '1036685160', 'استان آذربایجان شرقی خیابان شبستری ساختمان راجی', NULL, NULL),
	(101, 1, 'زیبا لاهوتی', '15388944953', '02165815489', '02668711846', '0427432865', 'گیلان خیابان محجوب ساختمان سیکا', NULL, NULL),
	(102, 1, 'آذران عزیزی', '95317331834', '02137028252', '02129756293', '2185941865', 'ایلام خیابان رستمی ساختمان شادان پلاک 82 کد پستی 8838336971', NULL, NULL),
	(103, 1, 'فریده باستانی', '66197367208', '02194244910', '02671162950', '0403675562', 'قم خیابان اعتماد ساختمان سمند پلاک 30 کد پستی 0758625443', NULL, NULL),
	(104, 1, 'دکتر شهروز تهرانی', '29585121949', '02129238419', '03145351184', '5781692338', 'قزوین خیابان فرشیدورد ساختمان شبپر', NULL, NULL),
	(105, 1, 'پیرایه نوبختی', '91507694482', '03106037923', '02685337018', '9199756803', 'قم خیابان فریاد ساختمان فرخاد', NULL, NULL),
	(106, 1, 'یکتا سیف‌زاده', '59882744126', '02618100296', '03143344427', '3037279473', 'گلستان خیابان ظریف ساختمان بامین قطعه 25 کد پستی 1095134341', NULL, NULL),
	(107, 1, 'بههن واعظی', '91313194413', '02141669831', '02156950688', '3957487875', 'استان قم خیابان امانی ساختمان ورفان', NULL, NULL),
	(108, 1, 'آوگان صفوی', '99384182625', '02199419501', '02662376444', '3922635236', 'سیستان و بلوچستان خیابان رستمی ساختمان ژیله قطعه 85 کد پستی 8228237131', NULL, NULL),
	(109, 1, 'آقای صادق فرهنگ', '63904740666', '03196910436', '03172303818', '7894052501', 'استان ایلام خیابان شیدا ساختمان وارسته قطعه 66', NULL, NULL),
	(110, 1, 'بوران توسلی', '36823356021', '02143498465', '02127087458', '9005428760', 'استان گیلان خیابان شریعتمداری ساختمان آلما پلاک 75', NULL, NULL),
	(111, 1, 'خانم پرسون کدیور', '96451682453', '03131939119', '02681161168', '6602150680', 'سیستان و بلوچستان خیابان پازوکی ساختمان داراب قطعه 19', NULL, NULL),
	(112, 1, 'دکتر برسام امانی', '83255854372', '02662053710', '03115724206', '7071429645', 'استان اصفهان خیابان زنجانی ساختمان گوهر', NULL, NULL),
	(113, 1, 'دکتر ماهرو نامور', '4051570544', '02126790688', '03106712854', '2268989866', 'یزد خیابان یلدا ساختمان شادرخ قطعه 96', NULL, NULL),
	(114, 1, 'فرنام آژند', '45969480445', '02659562522', '02639610591', '3516254358', 'استان کرمانشاه خیابان گل ساختمان پولاد کد پستی 8025647241', NULL, NULL),
	(115, 1, 'آیتان اللهیاری', '25493715248', '02126120308', '02157393982', '6816876478', 'خراسان شمالی خیابان ابوذر ساختمان آسا قطعه 36', NULL, NULL),
	(116, 1, 'یاشار فرامرزی', '37393650446', '02140884049', '02191231956', '5346410545', 'قم خیابان پویان ساختمان پرشه کد پستی 4498215841', NULL, NULL),
	(117, 1, 'آرا شادمهر', '70528787227', '02600436019', '02639190104', '0201474898', 'استان کرمان خیابان نیلوفری ساختمان افروزه کد پستی 8459139969', NULL, NULL),
	(118, 1, 'فهیمه امانی', '29249454803', '02161470982', '02173709756', '5494000658', 'استان همدان خیابان طباطبائی ساختمان پوپک', NULL, NULL),
	(119, 1, 'نعمت شیروانی', '81700237210', '03147448191', '02646760917', '2762385375', 'استان قزوین خیابان شریعتی ساختمان ارشد قطعه 61', NULL, NULL),
	(120, 1, 'نوزر نعمت‌زاده', '56442700273', '02682511952', '02164578587', '9657038754', 'استان زنجان خیابان مجتهدی ساختمان بابوک پلاک 93 کد پستی 5908345495', NULL, NULL),
	(121, 1, 'فرلاس میزبانی', '26944892329', '02182379282', '03100692903', '6607041070', 'استان چهارمحال و بختیاری خیابان ادب ساختمان احسان قطعه 90', NULL, NULL),
	(122, 1, 'دکتر آذرک وکیلی', '65529860915', '02616036733', '03132811078', '7657942774', 'تهران خیابان مقدم ساختمان ماندا کد پستی 2491797659', NULL, NULL),
	(123, 1, 'دل آویز عبدالکریمی', '27718922278', '03108321821', '03164979817', '7937958249', 'استان اردبیل خیابان مجرد ساختمان الناز کد پستی 5813174949', NULL, NULL),
	(124, 1, 'پژواک بزرگی', '72161823383', '02604597392', '02659392393', '1580854050', 'استان قم خیابان طالب‌زاده ساختمان ناژو', NULL, NULL),
	(125, 1, 'بهناک صفوی', '82064296886', '03126009706', '02123204359', '1588613447', 'استان ایلام خیابان صباغ ساختمان گلک کد پستی 4871924009', NULL, NULL),
	(126, 1, 'طلعت علی‌آبادی', '65908790061', '03118025092', '02120377671', '1176630793', 'استان البرز خیابان درگاهی ساختمان شاپور پلاک 50', NULL, NULL),
	(127, 1, 'نازتا فریاد', '30499117058', '02183007339', '03142033499', '9297003526', 'البرز خیابان شاملو ساختمان پرمیدا پلاک 83 کد پستی 7605616406', NULL, NULL),
	(128, 1, 'خانم چیترا جهانی', '99405133662', '02176489292', '03108630876', '9254528771', 'آذربایجان شرقی خیابان میزبانی ساختمان جهانفر', NULL, NULL),
	(129, 1, 'ناژو مطهری', '28924846834', '02614204375', '03198013609', '9306792359', 'کهگیلویه و بویراحمد خیابان مصاحب ساختمان انوشیروان پلاک 49', NULL, NULL),
	(130, 1, 'شیدوش فروتن', '6567411145', '03133652577', '03179413903', '3900456291', 'استان هرمزگان خیابان حکمت ساختمان فرهود', NULL, NULL),
	(131, 1, 'پشنگ علیا', '36446580370', '03174198681', '02131886977', '9873375820', 'آذربایجان شرقی خیابان شرع‌پسند ساختمان دلنواز', NULL, NULL),
	(132, 1, 'گرشاسب مجاهد', '33524047117', '02190799291', '03138491727', '8206267307', 'سمنان خیابان نهاوندی ساختمان مهرگان پلاک 71 کد پستی 3555668296', NULL, NULL),
	(133, 1, 'رازک صغیری', '92137981592', '02611867559', '03191310635', '3738504975', 'استان یزد خیابان کیمیایی ساختمان رومینا پلاک 44 کد پستی 5638010870', NULL, NULL),
	(134, 1, 'دکتر حوروش بخاری', '60182284864', '03129550528', '02179065026', '3681882289', 'آذربایجان غربی خیابان توفیق ساختمان کیقباد', NULL, NULL),
	(135, 1, 'برزین رحمانیان', '67437262469', '03135469263', '02137588788', '2535207279', 'گلستان خیابان کریمی ساختمان کامران قطعه 47 کد پستی 3744494932', NULL, NULL),
	(136, 1, 'قیصر شیدا', '28357270199', '03147505878', '02165965945', '5298764102', 'آذربایجان شرقی خیابان رحمانیان ساختمان رسام قطعه 24 کد پستی 7922387425', NULL, NULL),
	(137, 1, 'سیما تهرانی', '83747567539', '03173113536', '02162872289', '8985776383', 'بوشهر خیابان چگنی ساختمان هوشنگ پلاک 44', NULL, NULL),
	(138, 1, 'بازیار علی‌آبادی', '18865860651', '03140702329', '02114686878', '6774202331', 'استان مازندران خیابان خمسه ساختمان اُوژن پلاک 32', NULL, NULL),
	(139, 1, 'المیرا فاطمی', '84159423436', '03197111834', '02133318213', '6843420076', 'استان چهارمحال و بختیاری خیابان اشتری ساختمان نوید قطعه 56', NULL, NULL),
	(140, 1, 'نیکنام دری', '59425284800', '03182055164', '02147096675', '6344720276', 'چهارمحال و بختیاری خیابان واعظ‌زاده ساختمان همراز پلاک 28', NULL, NULL),
	(141, 1, 'دانوش عنایت', '90532320406', '02606688611', '02614276903', '6710514538', 'خوزستان خیابان فتاحی ساختمان جبّاره', NULL, NULL),
	(142, 1, 'خانم آسمان نوبختی', '8442390391', '02116655789', '02197643096', '0078112983', 'مازندران خیابان شبستری ساختمان آیتان پلاک 60', NULL, NULL),
	(143, 1, 'خانم الیا عراقی', '96333686494', '02615914266', '03184190960', '9476426415', 'مرکزی خیابان آریان‌پور ساختمان سریر قطعه 65 کد پستی 2768402187', NULL, NULL),
	(144, 1, 'سیوا شیروانی', '49776757236', '02138092831', '02121729642', '2942920971', 'استان گلستان خیابان سبزواری ساختمان ارسلان کد پستی 5575694206', NULL, NULL),
	(145, 1, 'آدر پناهیان', '41636679198', '02131699205', '02119541392', '5404496602', 'استان خراسان جنوبی خیابان واثقی ساختمان فرازمان کد پستی 1388324659', NULL, NULL),
	(146, 1, 'فاضل بختیار', '15271558599', '02607915160', '02628237082', '6124093122', 'ایلام خیابان کهنمویی ساختمان سلیمان پلاک 50 کد پستی 3551816265', NULL, NULL),
	(147, 1, 'فروزا درگاهی', '27496825625', '03152957227', '02649419600', '5502401162', 'کهگیلویه و بویراحمد خیابان نیشابوری ساختمان بامین', NULL, NULL),
	(148, 1, 'استاد اقبال شیدا', '28227372795', '03168943162', '02642487504', '1195261827', 'لرستان خیابان قانونی ساختمان گلاویز پلاک 47 کد پستی 1253391925', NULL, NULL),
	(149, 1, 'هاله قهرمان', '95670453067', '02126018356', '02696274551', '2077901661', 'کرمان خیابان امین‌زاده ساختمان سنجر کد پستی 1365380230', NULL, NULL),
	(150, 1, 'دانش شاملو', '44565508690', '02658645170', '02676106894', '8901257684', 'مازندران خیابان صفوی ساختمان گل اندام', NULL, NULL),
	(151, 1, 'ارژنگ اصفهانی', '67524100448', '03169792110', '02164995217', '8816171123', 'چهارمحال و بختیاری خیابان اشراقی ساختمان ساتراپ کد پستی 0332282081', NULL, NULL),
	(152, 1, 'یزدگرد حقانی', '50569150695', '02626113505', '02657847053', '9297559531', 'استان یزد خیابان رجایی ساختمان مستانه قطعه 11', NULL, NULL),
	(153, 1, 'استاد گلنوش کیان', '20952474158', '02695485552', '02131106272', '3128106936', 'کهگیلویه و بویراحمد خیابان پیران ساختمان پالیز پلاک 52 کد پستی 8720368980', NULL, NULL),
	(154, 1, 'مهفام پایور', '67842311489', '02675637376', '02648706637', '4432929062', 'استان هرمزگان خیابان ایمانی ساختمان ایزد قطعه 91 کد پستی 2425656528', NULL, NULL),
	(155, 1, 'مهندس سپهر فرج', '33972141213', '02607772954', '03157279623', '2786673485', 'سمنان خیابان زمردیان ساختمان رحیم قطعه 78 کد پستی 5047704001', NULL, NULL),
	(156, 1, 'معین حقانی', '51345610223', '02177994952', '02195472944', '5997401198', 'استان سیستان و بلوچستان خیابان مقدم ساختمان سرور قطعه 54 کد پستی 4343251393', NULL, NULL),
	(157, 1, 'الیا اصلانی', '17372580342', '02199664632', '02152043951', '1456043228', 'استان البرز خیابان کلباسی ساختمان نیکاو', NULL, NULL),
	(158, 1, 'دکتر بدریه ابطحی', '76401362370', '03131873510', '02167086794', '8587763539', 'مازندران خیابان مجاهد ساختمان پرشین کد پستی 8790556702', NULL, NULL),
	(159, 1, 'فریدون مهاجرانی', '16229152687', '02168269076', '03123398130', '6923986483', 'کهگیلویه و بویراحمد خیابان طباطبائی ساختمان شارود کد پستی 1188051876', NULL, NULL),
	(160, 1, 'استاد بامی صدیق', '89944404926', '02127829968', '02166912202', '2256313147', 'استان خراسان جنوبی خیابان هوشیار ساختمان چامه', NULL, NULL),
	(161, 1, 'فرجام کمالی', '97310452405', '03142090381', '02653767540', '4415593348', 'استان سیستان و بلوچستان خیابان دری ساختمان دیبا قطعه 77', NULL, NULL),
	(162, 1, 'برزین رستمی', '1250568098', '03105557320', '03194523299', '3522476398', 'خوزستان خیابان معین ساختمان آرون قطعه 80 کد پستی 6979324331', NULL, NULL),
	(163, 1, 'مهرزاد محمدی', '72890666785', '03157670341', '02183853057', '2258198560', 'استان خراسان رضوی خیابان قهرمانی ساختمان مهرزاد کد پستی 4126153414', NULL, NULL),
	(164, 1, 'همایون علی‌پور', '71351916474', '02161017204', '02695164243', '5680969797', 'استان البرز خیابان باهنر ساختمان ارستو', NULL, NULL),
	(165, 1, 'والا اقلیما', '1376610305', '02135457802', '02605606866', '2719550324', 'استان خوزستان خیابان ابطحی ساختمان شاهرخ', NULL, NULL),
	(166, 1, 'رایکا مطهری', '98677846250', '02634324555', '03139399736', '3555033658', 'ایلام خیابان دباغ ساختمان بیدخت', NULL, NULL),
	(167, 1, 'میثاق زهرایی', '54839711849', '02662226555', '03106429550', '7753190664', 'فارس خیابان باطنی ساختمان آرمین قطعه 66', NULL, NULL),
	(168, 1, 'سارنگ واعظ‌زاده', '25751468215', '03119023115', '02693568207', '2384882613', 'استان خوزستان خیابان انتظامی ساختمان مهیار پلاک 24 کد پستی 9588884054', NULL, NULL),
	(169, 1, 'میلی موحد', '44866389321', '02144523411', '03158485969', '1154913961', 'بوشهر خیابان راوندی ساختمان ماهدخت پلاک 11 کد پستی 8118224631', NULL, NULL),
	(170, 1, 'سپنتا نیشابوری', '1213552069', '02104143280', '03109665641', '6776671967', 'استان ایلام خیابان بهبهانی ساختمان عنایت کد پستی 9125583794', NULL, NULL),
	(171, 1, 'استاد حریره هراتی', '90433077475', '03141324651', '03140780837', '6717246373', 'قزوین خیابان سروش ساختمان احسان قطعه 11 کد پستی 4146230475', NULL, NULL),
	(172, 1, 'پریجهان سبحانی', '66996400359', '02623086617', '02114960442', '5450940824', 'خراسان شمالی خیابان فرامرزی ساختمان سایه پلاک 68 کد پستی 4926195148', NULL, NULL),
	(173, 1, 'اپرنگ شرع‌پسند', '1887265538', '02196932477', '03104141091', '0162490334', 'چهارمحال و بختیاری خیابان پازوکی ساختمان منوچهر قطعه 81 کد پستی 4709183017', NULL, NULL),
	(174, 1, 'خانم سودابه اوستا', '55589564776', '02695990658', '03145645435', '8590550160', 'اردبیل خیابان کاکاوند ساختمان دلیار', NULL, NULL),
	(175, 1, 'آقای اشکان مرادخانی', '12862670360', '02690942107', '02691660986', '8494428286', 'اصفهان خیابان عقیلی ساختمان یعقوب قطعه 67 کد پستی 5360168110', NULL, NULL),
	(176, 1, 'دادفر حقیقی', '61126142310', '02601824102', '02680299889', '7192991010', 'زنجان خیابان شیدا ساختمان فرامرز قطعه 76 کد پستی 0453753225', NULL, NULL),
	(177, 1, 'ستاره اصفهانی', '15886643892', '03178960457', '03151610548', '8892459336', 'استان خراسان شمالی خیابان خامنه‌ای ساختمان نجوی کد پستی 6670587245', NULL, NULL),
	(178, 1, 'افرند علی', '25264652392', '02621982600', '02192446876', '8998295514', 'کرمان خیابان خاموشی ساختمان طوبی کد پستی 0430830020', NULL, NULL),
	(179, 1, 'مهندس ساسان گلپایگانی', '81903769407', '02118913167', '03177182964', '8483402400', 'استان همدان خیابان یثربی ساختمان جاوید', NULL, NULL),
	(180, 1, 'بهرام مهاجرانی', '44737913885', '03165207980', '02687841905', '3043805555', 'ایلام خیابان نجفی ساختمان مرجانه کد پستی 2709957652', NULL, NULL),
	(181, 1, 'فرلاس همدانی', '25023331934', '03110883661', '02665709064', '0031958705', 'آذربایجان شرقی خیابان ادیانی ساختمان چکاد کد پستی 3876316535', NULL, NULL),
	(182, 1, 'بهشته اصفهانی', '77983649451', '02627498859', '02641148959', '9309658402', 'استان تهران خیابان کیمیایی ساختمان ارسلان', NULL, NULL),
	(183, 1, 'واروژ هراتی', '32352190906', '02681957411', '02141286564', '9077714140', 'لرستان خیابان امین‌زاده ساختمان آوین کد پستی 4617996035', NULL, NULL),
	(184, 1, 'یاشار بهبهانی', '41235613327', '03135247634', '02159189013', '0892387322', 'استان البرز خیابان پناهی ساختمان فاریا قطعه 64 کد پستی 7398293315', NULL, NULL),
	(185, 1, 'فرشیدورد علیا', '86446280611', '03198428335', '02617203142', '9483699393', 'استان یزد خیابان روحانی ساختمان اورنگ پلاک 88 کد پستی 3550247184', NULL, NULL),
	(186, 1, 'گلدوز طالقانی', '36781649039', '02194105836', '02603283707', '0898640377', 'استان آذربایجان غربی خیابان سروش ساختمان زکریا قطعه 17 کد پستی 1415100067', NULL, NULL),
	(187, 1, 'نیوتور اصلانی', '27135980219', '02681361223', '02607098614', '9113037446', 'بوشهر خیابان سروستانی ساختمان زرسا پلاک 15', NULL, NULL),
	(188, 1, 'صدیق امین‌زاده', '56027385246', '02128984775', '02162178742', '4904105159', 'کردستان خیابان شیرمحمدی ساختمان عزیز پلاک 22 کد پستی 6658274862', NULL, NULL),
	(189, 1, 'آرمان بزرگ‌نیا', '44369869629', '03164033325', '03126847226', '7874166690', 'استان آذربایجان شرقی خیابان توفیق ساختمان فرزانه قطعه 23 کد پستی 6559308387', NULL, NULL),
	(190, 1, 'آیدا علم', '10129577172', '02177642596', '02157535523', '2858489366', 'یزد خیابان خاموشی ساختمان فرشین کد پستی 6224647240', NULL, NULL),
	(191, 1, 'بهرخ سلامت', '55809485604', '03188981383', '02173925632', '2444376719', 'استان آذربایجان غربی خیابان بدخشانی ساختمان رخشا', NULL, NULL),
	(192, 1, 'مهشید همایون', '42670580694', '03119660840', '03151138525', '9430616959', 'البرز خیابان صدیقی ساختمان دلبر کد پستی 0171285111', NULL, NULL),
	(193, 1, 'فرنود نراقی', '83505887888', '03165754866', '02688392296', '6582589243', 'مرکزی خیابان مقدم ساختمان تیران کد پستی 7936455902', NULL, NULL),
	(194, 1, 'هیربد درگاهی', '73680545902', '02653543888', '02110105694', '6287638172', 'استان هرمزگان خیابان اعلم ساختمان فروغ کد پستی 2782602834', NULL, NULL),
	(195, 1, 'آزرمیدخت عارف', '67993774130', '02696273242', '03177708915', '9712796172', 'استان گلستان خیابان خمسه ساختمان گلدوز کد پستی 1528510259', NULL, NULL),
	(196, 1, 'منیره استادی', '83785805450', '02661226021', '03108755021', '6776265312', 'کردستان خیابان افخم ساختمان لیما کد پستی 5963982464', NULL, NULL),
	(197, 1, 'گلاره محدثی', '58928992591', '03127226878', '02637227527', '7387250305', 'خراسان جنوبی خیابان داودی ساختمان شمیلا', NULL, NULL),
	(198, 1, 'رشین معارف', '81554151848', '02602024035', '02652956369', '9460004913', 'استان بوشهر خیابان کریمی ساختمان ایراف کد پستی 4314613414', NULL, NULL),
	(199, 1, 'خانم راستا درگاهی', '33713468387', '03127935443', '03119068086', '5646008460', 'البرز خیابان ناظری ساختمان پرشنگ قطعه 47 کد پستی 2462946948', NULL, NULL),
	(200, 1, 'سیاوش نهاوندی', '83468467438', '02183522537', '02645713184', '6517076768', 'استان زنجان خیابان ترکاشوند ساختمان بهکام قطعه 94', NULL, NULL),
	(201, 1, 'استاد نسترن بهبهانی', '96249888074', '02683999507', '02145914798', '2748067962', 'استان اردبیل خیابان کوشکی ساختمان ایرمان پلاک 38 کد پستی 7873298445', NULL, NULL),
	(202, 1, 'فرجاد نهاوندی', '58143305429', '02680446963', '02657244944', '2271307256', 'استان کرمانشاه خیابان روحانی ساختمان توتک قطعه 34 کد پستی 6849447611', NULL, NULL),
	(203, 1, 'شادان توکلیان', '63747549396', '03108833245', '03157188271', '1796821838', 'لرستان خیابان حسابی ساختمان شیروان', NULL, NULL),
	(204, 1, 'تینوش رسولی', '8690635613', '02152786633', '03172221252', '1197185480', 'خراسان رضوی خیابان افخمی ساختمان شایگان قطعه 17', NULL, NULL),
	(205, 1, 'شهلا کوشکی', '81201085069', '02119957754', '02124299007', '9577198182', 'استان البرز خیابان پناهیان ساختمان دریا قطعه 36', NULL, NULL),
	(206, 1, 'قمر گل', '99066494702', '02652168311', '02168115846', '2202837959', 'قم خیابان بهبهانی ساختمان نشوا قطعه 61 کد پستی 2215414357', NULL, NULL),
	(207, 1, 'گیسو شجاعی', '23974891452', '02611652208', '03170356820', '3016268134', 'استان هرمزگان خیابان قمیشی ساختمان کامشاد قطعه 83 کد پستی 9287560004', NULL, NULL),
	(208, 1, 'هوردخت ادیانی', '80334443399', '02654905153', '02622522985', '4470307055', 'استان خراسان جنوبی خیابان چنگیزی ساختمان رخشان پلاک 61 کد پستی 7695212340', NULL, NULL),
	(209, 1, 'خانم گلی عالی', '32422915354', '02631458384', '02197652432', '1024580291', 'چهارمحال و بختیاری خیابان بزرگیان ساختمان آویده کد پستی 2112688086', NULL, NULL),
	(210, 1, 'شاورد رسولی', '86155882071', '03176731569', '02143731042', '9807365138', 'قم خیابان شفا ساختمان وستا قطعه 66', NULL, NULL),
	(211, 1, 'سیتا هوشیار', '83604035999', '02139063088', '02102316034', '8730992386', 'استان مازندران خیابان فروتن ساختمان جهانمهر پلاک 91', NULL, NULL),
	(212, 1, 'برمک نیشابوری', '66068304436', '03128140924', '02158848141', '0561742157', 'هرمزگان خیابان انوار ساختمان آفری کد پستی 7524083477', NULL, NULL),
	(213, 1, 'رخشاد خامنه‌ای', '28962159862', '03176297999', '03166762796', '4174733922', 'استان خوزستان خیابان پستا ساختمان رویا پلاک 27 کد پستی 9232888708', NULL, NULL),
	(214, 1, 'توریا ترکاشوند', '73009485311', '02177208174', '03143676298', '0424142746', 'مازندران خیابان آشوری ساختمان رامین قطعه 42 کد پستی 0470753789', NULL, NULL),
	(215, 1, 'زیور اعلم', '43121299043', '02692989185', '02132594892', '6366349932', 'استان مازندران خیابان صانعی ساختمان رازک کد پستی 2673874558', NULL, NULL),
	(216, 1, 'حوریه خامنه‌ای', '21643520898', '02165496201', '02118650799', '6406703689', 'استان قم خیابان ظریف ساختمان مه منیر قطعه 24 کد پستی 4927675425', NULL, NULL),
	(217, 1, 'رایکا علیا', '81135600616', '03135339373', '02681134486', '8950753097', 'استان کرمانشاه خیابان شریفیان ساختمان نیکزاد', NULL, NULL),
	(218, 1, 'فتّانه طبیب‌زاده', '5267763013', '02105212337', '03109427218', '0958289307', 'خراسان شمالی خیابان بهبهانی ساختمان چکاد', NULL, NULL),
	(219, 1, 'میلی پازوکی', '5006050720', '03171411330', '03194974082', '2366396263', 'خراسان جنوبی خیابان مستوفی ساختمان شهره قطعه 36', NULL, NULL),
	(220, 1, 'زوزان اوستا', '18751767858', '02125448801', '02138963661', '9128734127', 'استان فارس خیابان شیرازی ساختمان پریا پلاک 47', NULL, NULL),
	(221, 1, 'روزچهر فاطمی', '83536500929', '02689215773', '03135424587', '9402384699', 'استان سمنان خیابان پناهیان ساختمان جاماسب پلاک 27 کد پستی 1647003362', NULL, NULL),
	(222, 1, 'صفورا میرسپاسی', '64393132604', '02170355409', '02150476216', '7173086481', 'لرستان خیابان فرهنگ ساختمان سرمد پلاک 75', NULL, NULL),
	(223, 1, 'خانم ماندا خاتمی', '36553094233', '03108936373', '03144314099', '5410964871', 'خوزستان خیابان علی‌پور ساختمان توریا', NULL, NULL),
	(224, 1, 'مهندس شریفه ساعی', '30520872958', '02150423658', '02108486077', '0483563385', 'استان چهارمحال و بختیاری خیابان رحماندوست ساختمان بهداد', NULL, NULL),
	(225, 1, 'زرّین معین', '45660682825', '03125647197', '03143043435', '4731908958', 'استان فارس خیابان شاه‌حسینی ساختمان نکیسا قطعه 79 کد پستی 8772018714', NULL, NULL),
	(226, 1, 'استاد ماهر باطنی', '22038796335', '03119521226', '03112362583', '5765219203', 'استان گیلان خیابان پارسا ساختمان نسیم کد پستی 1635169768', NULL, NULL),
	(227, 1, 'استاد پُژمان حکیمی', '45026220036', '02102382670', '02642106303', '2394150709', 'استان گیلان خیابان پیوندی ساختمان فرشاد', NULL, NULL),
	(228, 1, 'عمید جهانگیری', '99009066421', '03101789221', '02637037956', '1091146278', 'استان خوزستان خیابان میردامادی ساختمان ساقی کد پستی 9785118055', NULL, NULL),
	(229, 1, 'نسا سرشار', '57334181342', '03146931075', '02681898332', '6696512910', 'تهران خیابان باطنی ساختمان دنا', NULL, NULL),
	(230, 1, 'مینا بختیار', '69829902509', '02116338822', '03104556061', '2922978591', 'استان آذربایجان غربی خیابان واعظ‌زاده ساختمان ملوس کد پستی 9101716105', NULL, NULL),
	(231, 1, 'فریان صغیری', '55265974083', '02159321753', '03166223219', '8816237159', 'استان لرستان خیابان بحرینی ساختمان استر قطعه 49 کد پستی 9897877833', NULL, NULL),
	(232, 1, 'بهتام جمادی', '48578694925', '03159370547', '02678849262', '8207587813', 'تهران خیابان اعتبار ساختمان نوژان پلاک 42', NULL, NULL),
	(233, 1, 'الیا عصار', '77614466386', '02661832754', '02157303562', '0368147535', 'مرکزی خیابان شریعتی ساختمان نوبان کد پستی 8190636855', NULL, NULL),
	(234, 1, 'نیکتا معین', '31453995566', '02656432025', '03191320525', '3658477916', 'مرکزی خیابان نواب ساختمان ستاه پلاک 39', NULL, NULL),
	(235, 1, 'استاد جهان ناز آیتی', '46820645986', '02184317474', '03107482461', '1215112121', 'اصفهان خیابان آهی ساختمان یونس قطعه 56', NULL, NULL),
	(236, 1, 'هوشان میردامادی', '44228309009', '02183976558', '02678598829', '0289612150', 'چهارمحال و بختیاری خیابان پورنگ ساختمان آذروان کد پستی 3673729722', NULL, NULL),
	(237, 1, 'آذرنوش انتظامی', '52408624895', '02653241297', '02155845136', '1918754478', 'کهگیلویه و بویراحمد خیابان انوری ساختمان مهشاد', NULL, NULL),
	(238, 1, 'هیتاسب دانایی‌فرد', '86040456928', '02170784854', '02128343920', '7567750361', 'استان اصفهان خیابان اشراقی ساختمان تیربُد قطعه 47 کد پستی 6629132568', NULL, NULL),
	(239, 1, 'جوانشیر پیران', '25297160591', '03133213373', '02111813601', '3571185854', 'استان خراسان رضوی خیابان هامون ساختمان علی کد پستی 8851806102', NULL, NULL),
	(240, 1, 'جمال فنی‌زاده', '85110737148', '03199462595', '03126733364', '7626311634', 'استان کهگیلویه و بویراحمد خیابان مجرد ساختمان اصغر پلاک 39', NULL, NULL),
	(241, 1, 'حورا بختیار', '29049281325', '02173831895', '02694210020', '4145997540', 'گلستان خیابان مهاجرانی ساختمان گوهرشاد کد پستی 1832349173', NULL, NULL),
	(242, 1, 'افشان واعظ‌زاده', '94446673060', '02165395282', '02683788619', '7453648687', 'استان کردستان خیابان دری ساختمان آرمون قطعه 70', NULL, NULL),
	(243, 1, 'مهرانگیز انتظامی', '12342772252', '03124088923', '02657728251', '1318277577', 'استان خراسان جنوبی خیابان بزرگی ساختمان نظام کد پستی 2335226149', NULL, NULL),
	(244, 1, 'نوید پویان', '56455241486', '02675856991', '02660360873', '9904019486', 'قزوین خیابان ندوشن ساختمان بوبک قطعه 38 کد پستی 7999908162', NULL, NULL),
	(245, 1, 'دکتر برزویه صفوی', '41057408120', '02177295045', '02104842282', '7192232851', 'استان سمنان خیابان محجوب ساختمان پریساتیس قطعه 13', NULL, NULL),
	(246, 1, 'فرنیا خوئینی', '87502084593', '02613215466', '02106549449', '4579498258', 'خراسان شمالی خیابان طالقانی ساختمان بهمنیار کد پستی 4313822330', NULL, NULL),
	(247, 1, 'فرخروز شریف', '89759706332', '02163188030', '02681388030', '8154226544', 'یزد خیابان موسوی ساختمان شهرداد کد پستی 2450422676', NULL, NULL),
	(248, 1, 'خانم فتّانه فریاد', '85774108706', '02115127204', '02167656949', '5132802563', 'قم خیابان پستا ساختمان نویان قطعه 74', NULL, NULL),
	(249, 1, 'پژواک ابوذر', '41732229629', '02656474907', '03122305608', '6268050767', 'آذربایجان غربی خیابان آیت‌اللهی ساختمان نیوشه پلاک 41', NULL, NULL),
	(250, 1, 'خجسته پازوکی', '81505452884', '03143214449', '03118752807', '7258100352', 'استان کرمانشاه خیابان حقانی ساختمان یارا پلاک 67 کد پستی 6077568674', NULL, NULL),
	(251, 1, 'کامبخش قنبری', '11114662395', '02124533298', '02618438442', '3252996281', 'استان زنجان خیابان شریعتمداری ساختمان میلا پلاک 57 کد پستی 2454504822', NULL, NULL),
	(252, 1, 'عدیله حکمی', '12126747864', '02191429209', '02687518336', '0963194222', 'استان چهارمحال و بختیاری خیابان پیران ساختمان شبپر پلاک 72', NULL, NULL),
	(253, 1, 'پولاد شجاعی', '85259626458', '02643077510', '03183466107', '0462416504', 'اردبیل خیابان باهنر ساختمان سهیل کد پستی 9340621709', NULL, NULL),
	(254, 1, 'رحیم فولادوند', '69236687287', '02610563898', '02161427523', '4797659049', 'ایلام خیابان طالب‌زاده ساختمان بیژن پلاک 67', NULL, NULL),
	(255, 1, 'کامبین نیلوفری', '35194786204', '03131885408', '02140867855', '9727947070', 'استان هرمزگان خیابان بزرگی ساختمان جهانبان', NULL, NULL),
	(256, 1, 'مهین سرمد', '15181364231', '03186871548', '02110860420', '3722727719', 'خراسان شمالی خیابان فریاد ساختمان فائزه پلاک 77', NULL, NULL),
	(257, 1, 'کاموس صدیقی', '93988501354', '03113367934', '02629238064', '5004286331', 'هرمزگان خیابان سحاب ساختمان فربد کد پستی 0489872590', NULL, NULL),
	(258, 1, 'رامی اشتری', '73346180467', '02184987058', '02609785670', '5718082652', 'همدان خیابان کوشکی ساختمان آوین قطعه 91', NULL, NULL),
	(259, 1, 'دکتر انوش مجتهدی', '23412995257', '02196421170', '02613198449', '2592147493', 'زنجان خیابان آیتی ساختمان ویشپر قطعه 86', NULL, NULL),
	(260, 1, 'پرهام ضرغامی', '60071970055', '03179945214', '02624626260', '2177409729', 'استان کرمان خیابان صدر ساختمان پریساتیس پلاک 54 کد پستی 3218308884', NULL, NULL),
	(261, 1, 'گوهرشاد شاملو', '43963616832', '03194903785', '03160084438', '3344552723', 'هرمزگان خیابان حیاتی ساختمان سلا قطعه 15 کد پستی 8763317277', NULL, NULL),
	(262, 1, 'بهاک پورناظری', '10257852437', '03110344590', '02627753717', '8746130090', 'استان تهران خیابان زرشناس ساختمان پریوش', NULL, NULL),
	(263, 1, 'استر بختیاری', '57415241893', '02631035645', '02686450697', '5151375312', 'استان مرکزی خیابان فهمیده ساختمان آتیشه پلاک 66 کد پستی 7354446876', NULL, NULL),
	(264, 1, 'سعیده زنجانی', '30681987628', '02160594852', '03174945055', '4617793152', 'اصفهان خیابان صانعی ساختمان دری کد پستی 7494833806', NULL, NULL),
	(265, 1, 'پروانه ابتکار', '80449169570', '03190321497', '03190577721', '2165396940', 'استان همدان خیابان آیت‌اللهی ساختمان جهانگیر کد پستی 7459032770', NULL, NULL),
	(266, 1, 'کاوان قهرمان', '92286053316', '02654363255', '03160597987', '5919454283', 'مازندران خیابان قمیشی ساختمان کیومرث پلاک 56', NULL, NULL),
	(267, 1, 'سمیرا عبدالکریمی', '72301879213', '02182522766', '02666275837', '2084770459', 'اصفهان خیابان کیان ساختمان سمند پلاک 60', NULL, NULL),
	(268, 1, 'مهرساد مجتهد', '47010464965', '02616171156', '02601907681', '6332985460', 'کردستان خیابان زرشناس ساختمان پیمان قطعه 29', NULL, NULL),
	(269, 1, 'مهندس یگانه علی', '7537608939', '03107405366', '02690661536', '6369196758', 'هرمزگان خیابان رهنما ساختمان کَیان کد پستی 3496317936', NULL, NULL),
	(270, 1, 'پریما جهانبگلو', '57713800303', '02600469207', '03177625334', '2369829691', 'همدان خیابان واعظی ساختمان آتنا پلاک 54', NULL, NULL),
	(271, 1, 'هیوند پایدار', '77504458554', '02615313882', '03156524002', '7107373742', 'کرمان خیابان فروتن ساختمان فرشیدورد کد پستی 9633150420', NULL, NULL),
	(272, 1, 'خانم مهداد خاتمی', '84772767197', '03102223568', '02148241766', '8181286082', 'استان گلستان خیابان مطهری ساختمان مهشید', NULL, NULL),
	(273, 1, 'استاد قباد جمادی', '94455297869', '02181040043', '03108093356', '8355617233', 'خوزستان خیابان نیلوفری ساختمان موجان پلاک 87', NULL, NULL),
	(274, 1, 'برسام خداپناهی', '77138719099', '02686031146', '03115154094', '1354857539', 'استان تهران خیابان شجاعی ساختمان معصومه کد پستی 3049063733', NULL, NULL),
	(275, 1, 'ارستو هاشمیان', '5258255104', '02690039112', '03120942450', '1132631002', 'هرمزگان خیابان نقیب‌زاده ساختمان آروین', NULL, NULL),
	(276, 1, 'آذردخت حقیقی', '42393380642', '02625706999', '03179611340', '8432886329', 'ایلام خیابان سحاب ساختمان نیکناز پلاک 27 کد پستی 2673429537', NULL, NULL),
	(277, 1, 'آذر صدیق', '1427163132', '02194547890', '02122435985', '8227730898', 'استان قم خیابان خوئینی‌ها ساختمان ملوک پلاک 30 کد پستی 0231118543', NULL, NULL),
	(278, 1, 'آرنگ شیروانی', '35579993456', '02658137717', '02114431640', '0736296744', 'سیستان و بلوچستان خیابان خرم‌آبادی ساختمان فریمان', NULL, NULL),
	(279, 1, 'دکتر اوتانا مستوفی', '75930238560', '02681666421', '02121694700', '6604934929', 'استان خراسان رضوی خیابان شیرازی ساختمان مهسو پلاک 49', NULL, NULL),
	(280, 1, 'نیکاو گل', '8586272940', '02674699402', '02147876230', '8433662083', 'استان اردبیل خیابان قانونی ساختمان شهنواز قطعه 66', NULL, NULL),
	(281, 1, 'نیوتور معارف', '21683583388', '02685176254', '02185430596', '9502491866', 'استان اردبیل خیابان کهنمویی ساختمان یازان', NULL, NULL),
	(282, 1, 'باستین شریفیان', '6724707643', '02639761138', '02645251630', '3745690865', 'خراسان جنوبی خیابان بختیار ساختمان وارسته قطعه 53 کد پستی 7453549798', NULL, NULL),
	(283, 1, 'دکتر تیرنام توفیق', '83178314095', '03175545262', '02102282112', '2022316044', 'البرز خیابان غنی ساختمان ویس', NULL, NULL),
	(284, 1, 'افشیده هاشمی', '83940554185', '02646048125', '03139952737', '8159512277', 'استان اصفهان خیابان زمردیان ساختمان آریارمنا پلاک 19 کد پستی 2212673742', NULL, NULL),
	(285, 1, 'دنا تهرانی', '50721776484', '02116065460', '03166282775', '9053616869', 'استان بوشهر خیابان اوستا ساختمان گوهرشاد کد پستی 7191421150', NULL, NULL),
	(286, 1, 'صلاح سرشار', '24142248959', '02675846172', '03138042649', '4986937614', 'خراسان جنوبی خیابان شبستری ساختمان کواد پلاک 41', NULL, NULL),
	(287, 1, 'پرندین سبزواری', '1608684894', '02190039162', '03137517851', '7773133863', 'هرمزگان خیابان روحانی ساختمان هانا پلاک 39 کد پستی 6614792209', NULL, NULL),
	(288, 1, 'تیربُد رسولی', '96619086000', '03134745617', '02168096231', '6577367342', 'استان لرستان خیابان طریقت ساختمان عقیق پلاک 28', NULL, NULL),
	(289, 1, 'استاد ندا فولادوند', '86994423743', '02696388509', '03122618254', '2848304615', 'بوشهر خیابان اشکوری ساختمان فریده کد پستی 5379402859', NULL, NULL),
	(290, 1, 'عماد شهیدی', '81196746911', '03196839801', '02127576985', '4974866464', 'لرستان خیابان آدینه ساختمان پروین', NULL, NULL),
	(291, 1, 'ارشد الهام', '3024638087', '02619019267', '02167146919', '9993977545', 'قزوین خیابان معروف ساختمان فاریا قطعه 18 کد پستی 0626331844', NULL, NULL),
	(292, 1, 'دکتر کیمیا رنجبر', '18946766228', '02624889688', '02198016931', '8441651777', 'استان سیستان و بلوچستان خیابان هامون ساختمان تیرگر کد پستی 6200320548', NULL, NULL),
	(293, 1, 'مهرزاد سیف', '4143119855', '02666084213', '02651758811', '2204518166', 'خوزستان خیابان شریعتمداری ساختمان اروسا', NULL, NULL),
	(294, 1, 'سروناز نراقی', '85443856091', '02628262540', '02688798031', '1735991445', 'ایلام خیابان دری ساختمان پاپلی کد پستی 2338811220', NULL, NULL),
	(295, 1, 'دکتر ورجاوند بزرگیان', '86694097849', '02118664934', '02695814516', '8319750111', 'استان قم خیابان فروتن ساختمان بی بی پلاک 35', NULL, NULL),
	(296, 1, 'پگاه هروی', '67254562744', '03113199872', '02172388394', '2054914608', 'استان مازندران خیابان عنایت ساختمان زربانو', NULL, NULL),
	(297, 1, 'استاد رادمان لوکس', '77085213472', '03190744816', '02143855392', '3693333839', 'آذربایجان غربی خیابان اللهیاری ساختمان یارا کد پستی 6831205743', NULL, NULL),
	(298, 1, 'استاد روشنک صدیق', '1545892500', '02188357854', '02641291756', '4986298297', 'زنجان خیابان حیاتی ساختمان آندیا کد پستی 9869737662', NULL, NULL),
	(299, 1, 'دانوش آشتیانی', '96868269168', '02124655074', '02113701551', '4772990438', 'خراسان رضوی خیابان پناهیان ساختمان روئین کد پستی 4414004989', NULL, NULL),
	(300, 1, 'مهندس مائده عبادی', '74108807363', '02632342203', '03163935702', '5318166331', 'استان خراسان جنوبی خیابان فرشیدورد ساختمان عبّاسه کد پستی 3390406886', NULL, NULL),
	(301, 1, 'نیکناز امانی', '98757507675', '03188978256', '03109421605', '2140632827', 'خراسان جنوبی خیابان کهنمویی ساختمان رخساره', NULL, NULL),
	(302, 1, 'مهندس کارن بزرگی', '37515759233', '02639493395', '03108533568', '1580652484', 'استان همدان خیابان علی‌آبادی ساختمان آبان قطعه 34 کد پستی 9429570759', NULL, NULL),
	(303, 1, 'مهندس شووان محجوبی', '75193009175', '02128253686', '02137597224', '6483138222', 'استان لرستان خیابان غضنفری ساختمان آریوبرزن کد پستی 0898265084', NULL, NULL),
	(304, 1, 'خانم پرمون نواب', '65408645153', '02665624684', '02142003319', '1278734840', 'فارس خیابان کهنمویی ساختمان پرخیده', NULL, NULL),
	(305, 1, 'آقای علی داد مهدی‌پور', '2180873286', '02615648708', '03108612141', '6913566397', 'استان سمنان خیابان پناهی ساختمان برسام قطعه 15', NULL, NULL),
	(306, 1, 'جوریل دباغ', '79998790967', '02173872670', '03105545045', '3647435776', 'خراسان جنوبی خیابان فروتن ساختمان خدیجه', NULL, NULL),
	(307, 1, 'نیاز حجتی', '86578360006', '02135515462', '03185296548', '3307798503', 'اصفهان خیابان زمردیان ساختمان سیرانوش کد پستی 6187096092', NULL, NULL),
	(308, 1, 'مروان آیت‌اللهی', '96136555346', '02684683126', '03191860786', '1564099701', 'همدان خیابان هاشمیان ساختمان نوشیروان پلاک 51 کد پستی 7574388636', NULL, NULL),
	(309, 1, 'مهندس نگارین جمادی', '31430868688', '02675489451', '03195202415', '1946382839', 'قزوین خیابان عصار ساختمان اختر قطعه 55 کد پستی 6197076335', NULL, NULL),
	(310, 1, 'کواد همایون', '6599186453', '02642631233', '02131686826', '1168168527', 'خراسان رضوی خیابان حکمی ساختمان مهرنام', NULL, NULL),
	(311, 1, 'حافظ روحانی', '15210789475', '02652065574', '02100977036', '8626693825', 'استان کهگیلویه و بویراحمد خیابان حقیقی ساختمان مهرشید کد پستی 8147517650', NULL, NULL),
	(312, 1, 'آقای کیهان ثابتی', '34442560262', '03121475904', '02698767652', '5494497163', 'کردستان خیابان مظفر ساختمان مردآویج کد پستی 9002803128', NULL, NULL),
	(313, 1, 'راحیل طبیب‌زاده', '33224546428', '03169349107', '02670698040', '5290751026', 'کهگیلویه و بویراحمد خیابان خداپناهی ساختمان فرهاد پلاک 62', NULL, NULL),
	(314, 1, 'جهانبخت واعظی', '94271656365', '03196121072', '02625796575', '7641540225', 'گلستان خیابان کاکاوند ساختمان کیانا پلاک 94 کد پستی 9608620773', NULL, NULL),
	(315, 1, 'بهدیس نیشابوری', '44358786247', '02134124373', '02117879745', '5612419087', 'قم خیابان علی ساختمان عظیم کد پستی 4081222059', NULL, NULL),
	(316, 1, 'استاد داریوش حبیبی', '22780163590', '02607412129', '03127153385', '1433203599', 'استان قزوین خیابان یثربی ساختمان صدیق قطعه 66', NULL, NULL),
	(317, 1, 'مونا عبدالملکی', '20237176790', '03196173898', '03184847330', '3200734020', 'استان فارس خیابان تبریزی ساختمان متین پلاک 79', NULL, NULL),
	(318, 1, 'ریحانه قهرمانیان', '40991151259', '03112890176', '03194828857', '7662649321', 'گلستان خیابان سبحانی ساختمان بابک کد پستی 0149334684', NULL, NULL),
	(319, 1, 'فروزا ایمانی', '78844290897', '03109212304', '03133706819', '2914585156', 'استان خراسان رضوی خیابان قاضی ساختمان سمراد', NULL, NULL),
	(320, 1, 'سلیم رجایی', '40669208495', '02102143203', '02144242469', '7763483933', 'فارس خیابان حکمی ساختمان آصفه پلاک 36', NULL, NULL),
	(321, 1, 'خانم وشتا ارسباران', '54587743361', '02637370182', '02648136822', '7427052287', 'استان کرمان خیابان میرباقری ساختمان فریبا پلاک 51 کد پستی 9854590921', NULL, NULL),
	(322, 1, 'هانيه ضابطی', '62357492435', '03124461268', '03103117661', '9686403396', 'اصفهان خیابان گلپایگانی ساختمان نازیتا پلاک 48', NULL, NULL),
	(323, 1, 'مهندس مهراد پورناظری', '20979986999', '02628710991', '03171044867', '2168037744', 'استان سیستان و بلوچستان خیابان کیمیایی ساختمان مهجبین قطعه 65 کد پستی 3560061631', NULL, NULL),
	(324, 1, 'لیان خسروپناه', '98647919686', '03199907163', '02107294481', '7561321798', 'استان البرز خیابان کیان ساختمان روح انگیز پلاک 91 کد پستی 2795746193', NULL, NULL),
	(325, 1, 'نگان چلبی', '47980284546', '02125928582', '02614850218', '6868909655', 'خوزستان خیابان خرم‌آبادی ساختمان افرند پلاک 26', NULL, NULL),
	(326, 1, 'حمید مصاحب', '58350057623', '02692212118', '02694676168', '5719723792', 'کرمان خیابان فرشیدورد ساختمان جهانبان پلاک 23 کد پستی 7001907051', NULL, NULL),
	(327, 1, 'فرانک آیتی', '69318853851', '02648916515', '02647486584', '7311241590', 'استان گلستان خیابان ضرغامی ساختمان طاهر', NULL, NULL),
	(328, 1, 'زروند زارع', '30984467681', '02107740496', '03155995525', '1906370849', 'استان کردستان خیابان علی‌زمانی ساختمان نیوشا قطعه 28', NULL, NULL),
	(329, 1, 'طوبی خوئینی', '11967159213', '02175902989', '02119444352', '1897315837', 'استان آذربایجان غربی خیابان بحرینی ساختمان صلاح الدین قطعه 98 کد پستی 1996167646', NULL, NULL),
	(330, 1, 'سرور نیشابوری', '26743302766', '03143813384', '02652472263', '7684874435', 'البرز خیابان لوکس ساختمان آتشبان قطعه 36 کد پستی 0789443681', NULL, NULL),
	(331, 1, 'میشا نهاوندی', '17982752824', '02188708040', '02189902247', '5630621688', 'خراسان شمالی خیابان شریعتمداری ساختمان آذرجهر پلاک 77 کد پستی 4743306951', NULL, NULL),
	(332, 1, 'شمسا فرهنگ', '83519781683', '02197036865', '02673206402', '9854629295', 'استان همدان خیابان اوستا ساختمان طوفان کد پستی 6295562743', NULL, NULL),
	(333, 1, 'اردون روستا', '87016313385', '02175773079', '03116564689', '9209424967', 'کردستان خیابان توسلی ساختمان بهرامن کد پستی 0893101639', NULL, NULL),
	(334, 1, 'اوتانا انوری', '13103962400', '02179230783', '03141986464', '4195323718', 'استان زنجان خیابان خدایی ساختمان نازک', NULL, NULL),
	(335, 1, 'خانم جهان دخت انوری', '77122061636', '02160560498', '02683506583', '3435464854', 'استان هرمزگان خیابان محمدرضایی ساختمان شیدفر پلاک 77 کد پستی 6306169279', NULL, NULL),
	(336, 1, 'مهندس فریبرز دانایی‌فر', '53537054043', '03177730184', '02135629387', '1453406431', 'خوزستان خیابان خیابانی ساختمان پرهام قطعه 38 کد پستی 3459154729', NULL, NULL),
	(337, 1, 'آیدان امین‌زاده', '49898377849', '02123965476', '03173277460', '2796474000', 'یزد خیابان میدری ساختمان پاپلی قطعه 95', NULL, NULL),
	(338, 1, 'ماکان سحاب', '2401260538', '03115385038', '03157488978', '8547909871', 'استان تهران خیابان فرشیدورد ساختمان آذرمینا', NULL, NULL),
	(339, 1, 'آرا خمسه', '19621256515', '02115637288', '02181701820', '5216093823', 'استان سیستان و بلوچستان خیابان هاشمی ساختمان آذرافروز کد پستی 1014346524', NULL, NULL),
	(340, 1, 'گلاویز مصباح', '87702739278', '02145849651', '02661862737', '5129131388', 'استان اردبیل خیابان همت ساختمان جهانمهر پلاک 77 کد پستی 8758975402', NULL, NULL),
	(341, 1, 'جمیله آژند', '52680472588', '02647855900', '03163766635', '5494146476', 'استان قم خیابان جمادی ساختمان لُعبت', NULL, NULL),
	(342, 1, 'فردیس واعظ‌زاده', '27529445336', '02199745721', '02691735422', '9564214489', 'گیلان خیابان آقاجری ساختمان فاخره کد پستی 9690969377', NULL, NULL),
	(343, 1, 'تهمینه طریقت', '7227532022', '03117482659', '02622380899', '5479192985', 'استان آذربایجان شرقی خیابان پارسا ساختمان گیتی', NULL, NULL),
	(344, 1, 'به آفرید اقلیما', '23821158532', '03107875001', '02627777440', '7743870547', 'استان خوزستان خیابان نیلوفری ساختمان عهدیه کد پستی 8777864272', NULL, NULL),
	(345, 1, 'آقای سهند ابوذر', '47136297072', '02126026297', '02621633456', '3081990936', 'استان آذربایجان شرقی خیابان بزرگیان ساختمان نوید قطعه 73', NULL, NULL),
	(346, 1, 'باران شعبانی', '52591873448', '02682064704', '03103125542', '3582058745', 'استان آذربایجان شرقی خیابان فرمانفرمائیان ساختمان فرزین کد پستی 2074980526', NULL, NULL),
	(347, 1, 'بهدخت رجایی', '14994742720', '02651815944', '02119288130', '5370539163', 'کردستان خیابان مطهری ساختمان راستین قطعه 11', NULL, NULL),
	(348, 1, 'مهستی هاشمی', '26038688499', '02664093117', '03195708615', '6394624493', 'گلستان خیابان کدیور ساختمان بهمن پلاک 69', NULL, NULL),
	(349, 1, 'استاد عقدس پارسا', '50386305027', '02108567304', '02145184019', '9466464235', 'استان سیستان و بلوچستان خیابان فانی ساختمان مستوره کد پستی 0475469525', NULL, NULL),
	(350, 1, 'قدرت جهانی', '46765455255', '02619605463', '03114522049', '1289424419', 'استان فارس خیابان علی‌آبادی ساختمان گلی', NULL, NULL),
	(351, 1, 'مهندس ویدا مصاحب', '57121194748', '02189128102', '02647641312', '2912693663', 'استان ایلام خیابان راسخ ساختمان مهبد پلاک 87', NULL, NULL),
	(352, 1, 'آقای ابراهیم مرتضوی', '82813641479', '02643630184', '03140148877', '3556559046', 'اردبیل خیابان هومن ساختمان گلسا', NULL, NULL),
	(353, 1, 'ملکه محجوبی', '94680296498', '02604980674', '02616059324', '6039879093', 'چهارمحال و بختیاری خیابان بختیاری ساختمان عقیق پلاک 52', NULL, NULL),
	(354, 1, 'مهجبین شریعتمداری', '62892699742', '03188982351', '02619896583', '3744687184', 'ایلام خیابان کدیور ساختمان ویراف قطعه 45', NULL, NULL),
	(355, 1, 'نریمان اعتبار', '33796495382', '02656255098', '02611812544', '2886539383', 'هرمزگان خیابان پستا ساختمان بهرخ قطعه 87', NULL, NULL),
	(356, 1, 'فرهان عزیزی', '90723092627', '02102821441', '02671380539', '5853730490', 'استان قزوین خیابان مطهری ساختمان سوسنک', NULL, NULL),
	(357, 1, 'یاقوت نقدی', '64315339978', '02188860875', '02621107101', '7493296397', 'البرز خیابان شیدا ساختمان تارا', NULL, NULL),
	(358, 1, 'گل اندام جهانی', '7948318763', '03154387898', '03116476729', '8079898338', 'استان قم خیابان جمادی ساختمان افسان', NULL, NULL),
	(359, 1, 'پرناز علیا', '84363737867', '02674007088', '02137193254', '4357166413', 'قم خیابان طریقت ساختمان سیتا کد پستی 9506323867', NULL, NULL),
	(360, 1, 'کریم ندوشن', '30784791697', '02639600476', '02673049380', '6463126041', 'زنجان خیابان هاشمی ساختمان جلا کد پستی 9159500498', NULL, NULL),
	(361, 1, 'ناهیده نامور', '79501383874', '03109976175', '02694641348', '6628306638', 'استان یزد خیابان واعظ‌زاده ساختمان مهرنگ', NULL, NULL),
	(362, 1, 'راستینه اصفهانی', '47543614381', '02630738513', '02611889738', '5619925104', 'ایلام خیابان افخمی ساختمان باناز قطعه 41', NULL, NULL),
	(363, 1, 'کاژیره دستغیب', '28643338207', '02176561637', '02111597554', '2843443049', 'آذربایجان شرقی خیابان شیدا ساختمان شادناز قطعه 98 کد پستی 6403755945', NULL, NULL),
	(364, 1, 'انارام فنی‌زاده', '72248914855', '03173728792', '03136940741', '1574464982', 'اردبیل خیابان زنجانی ساختمان کیان قطعه 98', NULL, NULL),
	(365, 1, 'برید سپه‌وند', '66163858380', '02198238739', '03180119382', '2262852948', 'مرکزی خیابان توکل ساختمان زینا قطعه 52', NULL, NULL),
	(366, 1, 'مهشید شهیدی', '67364227226', '02629147281', '03180635409', '7691421786', 'لرستان خیابان بیگی ساختمان مهراد قطعه 50', NULL, NULL),
	(367, 1, 'بهفر اصلانی', '15317907010', '02184609989', '03189414501', '1880902065', 'قم خیابان رحماندوست ساختمان پرشاد کد پستی 0206859970', NULL, NULL),
	(368, 1, 'پرین زمردیان', '85422979921', '02630903723', '03187814030', '3397980604', 'استان سمنان خیابان هاشمی ساختمان الیزه قطعه 30 کد پستی 7173760905', NULL, NULL),
	(369, 1, 'مهریار مظفر', '67997100348', '03128952614', '03142644277', '3951075856', 'سمنان خیابان محمدی ساختمان مارال پلاک 86', NULL, NULL),
	(370, 1, 'نوزر مجتهدی', '81341887794', '03179115558', '02693020351', '0326517014', 'کرمان خیابان باهنر ساختمان زریر قطعه 53 کد پستی 6403881982', NULL, NULL),
	(371, 1, 'ماهرو آدینه', '54202733806', '02194100635', '02667890980', '4084214712', 'فارس خیابان محدثی ساختمان روئین کد پستی 2182840545', NULL, NULL),
	(372, 1, 'دکتر فرازمان بخاری', '79241429466', '02605299698', '02119061255', '6783266392', 'استان سیستان و بلوچستان خیابان تهرانی ساختمان شهکام کد پستی 8505640331', NULL, NULL),
	(373, 1, 'دکتر الیا عراقی', '34440433672', '02671240141', '02639555940', '6701788196', 'خوزستان خیابان مجتبوی ساختمان قادر', NULL, NULL),
	(374, 1, 'دکتر یعقوب فهمیده', '39236369680', '02670637459', '02698377026', '4697408000', 'گیلان خیابان استادی ساختمان انسی', NULL, NULL),
	(375, 1, 'آقای فرهنگ زین‌الدین', '32190886364', '02125351101', '03173046037', '8936156689', 'قم خیابان مشا ساختمان اسفندیار', NULL, NULL),
	(376, 1, 'کیاوش قهرمانی', '82854913931', '02137055406', '02159228733', '7638362877', 'استان ایلام خیابان اشتری ساختمان مهسو', NULL, NULL),
	(377, 1, 'استاد ویرا مصباح‌زاده', '18120668006', '02123379077', '02618093078', '1131143549', 'استان خراسان رضوی خیابان فاطمی ساختمان آریان قطعه 46', NULL, NULL),
	(378, 1, 'رُکندین دهقان', '20586436252', '02621939443', '03151308891', '7182560562', 'استان گلستان خیابان پیوندی ساختمان داتیس قطعه 26', NULL, NULL),
	(379, 1, 'ارشن عصار', '76409365980', '02189330835', '02175978285', '0594916225', 'آذربایجان غربی خیابان صفوی ساختمان امیر پلاک 69 کد پستی 5904406592', NULL, NULL),
	(380, 1, 'ریحان علی‌زمانی', '97354150359', '02639834076', '02676273491', '1726160581', 'تهران خیابان راوندی ساختمان تیربُد پلاک 13', NULL, NULL),
	(381, 1, 'کاملیا عنایت', '40021612647', '03149612753', '02649411941', '9394772403', 'زنجان خیابان بحرینی ساختمان شادمهر پلاک 58', NULL, NULL),
	(382, 1, 'ترنگ پناهیان', '26277986149', '03131660770', '02126008814', '8571497554', 'استان کردستان خیابان کیمیایی ساختمان آلما', NULL, NULL),
	(383, 1, 'استاد چیستا حائری', '28834798058', '03165435984', '02667251128', '9314189626', 'قم خیابان ابطحی ساختمان اوتانا', NULL, NULL),
	(384, 1, 'سلیم پارسا', '55279348932', '02175484733', '02666657848', '3067783246', 'کرمان خیابان کاملی ساختمان پریچهره پلاک 44 کد پستی 0645568605', NULL, NULL),
	(385, 1, 'سپند شریعتی', '66388378902', '03158874639', '02652235805', '9725635502', 'خراسان جنوبی خیابان اشکوری ساختمان نوا کد پستی 7602336274', NULL, NULL),
	(386, 1, 'الهام مجتهدی', '57901481874', '02651983736', '03152086856', '8423244633', 'سمنان خیابان شیرمحمدی ساختمان پرشاد قطعه 86', NULL, NULL),
	(387, 1, 'هومان پیرحیاتی', '34796413523', '02157667788', '02159616336', '5055084863', 'استان لرستان خیابان مرادخانی ساختمان وُریا قطعه 57', NULL, NULL),
	(388, 1, 'وحید قمیشی', '56221885678', '02662522379', '02656392806', '4687928766', 'استان کردستان خیابان فرامرزی ساختمان شهرا پلاک 12 کد پستی 1417948559', NULL, NULL),
	(389, 1, 'مهران آژند', '81483943883', '02157385733', '03187743422', '5454248178', 'اصفهان خیابان محجوب ساختمان گلبانو کد پستی 5141266300', NULL, NULL),
	(390, 1, 'جهانسوز باغچه‌بان', '23789254304', '02115015639', '03187457880', '0446518914', 'سیستان و بلوچستان خیابان کیمیایی ساختمان قیصر کد پستی 9037983053', NULL, NULL),
	(391, 1, 'پارمین ندوشن', '83355271908', '03169946002', '02137734592', '0999492327', 'خراسان شمالی خیابان قمیشی ساختمان فروهر قطعه 87', NULL, NULL),
	(392, 1, 'کاوان پازارگاد', '90380694046', '03139018390', '02149051432', '3342315469', 'استان خراسان شمالی خیابان فرهنگ ساختمان هیرمند قطعه 95', NULL, NULL),
	(393, 1, 'آریامنش راوندی', '16531322187', '02167207806', '02152371334', '4238227624', 'استان گیلان خیابان فهمیده ساختمان امیر کد پستی 1943791635', NULL, NULL),
	(394, 1, 'دکتر نغمه میرزاده', '11325296210', '02162553844', '03181203231', '4481852819', 'استان آذربایجان شرقی خیابان علم‌الهدی ساختمان سارنگ', NULL, NULL),
	(395, 1, 'دکتر صدری انوشه', '46308766484', '03124046375', '02633021535', '0650329682', 'استان خراسان شمالی خیابان مرتضوی ساختمان نیکی', NULL, NULL),
	(396, 1, 'کاظم واعظ', '92588658957', '02648957014', '02146903774', '6003085455', 'استان چهارمحال و بختیاری خیابان قهرمانیان ساختمان بهارک پلاک 10', NULL, NULL),
	(397, 1, 'مهندس پارسادخت توفیق', '9617271279', '03142713168', '03120607780', '1608175415', 'سیستان و بلوچستان خیابان گل ساختمان زادمهر قطعه 57 کد پستی 3671000249', NULL, NULL),
	(398, 1, 'ویس محدثی', '64928918491', '02174800902', '02668837556', '1863887607', 'کرمانشاه خیابان دری ساختمان نوژان پلاک 22 کد پستی 6200040041', NULL, NULL),
	(399, 1, 'افراسیاب سراج', '30292923127', '03194140456', '02164107627', '9380406471', 'استان تهران خیابان علم‌الهدی ساختمان هیلا', NULL, NULL),
	(400, 1, 'به آرا ابطحی', '56169611359', '02637241281', '03165752224', '2529842969', 'اردبیل خیابان خداپناهی ساختمان بشیر پلاک 24 کد پستی 4528927891', NULL, NULL),
	(401, 1, 'پریور رستمی', '75900235689', '02601282073', '02165728701', '5758858600', 'استان همدان خیابان فولادوند ساختمان فرهاد', NULL, NULL),
	(402, 1, 'احمد کاویانی', '63084238097', '02668949124', '03198989645', '4884850315', 'کرمان خیابان زنوزی ساختمان مهرنام پلاک 75', NULL, NULL),
	(403, 1, 'نیکدخت حسابی', '44236719689', '02651390233', '03179364536', '5521847967', 'استان آذربایجان شرقی خیابان بحرینی ساختمان فرنوش', NULL, NULL),
	(404, 1, 'گلدار شبستری', '35509477729', '02110924848', '03189013504', '0305752619', 'استان کردستان خیابان رحماندوست ساختمان بدریه قطعه 94 کد پستی 9962144975', NULL, NULL),
	(405, 1, 'بامشاد ندوشن', '36234089720', '03184851156', '02192785234', '3717924585', 'مرکزی خیابان خمسه ساختمان قاسم', NULL, NULL);
/*!40000 ALTER TABLE `order_post_info` ENABLE KEYS */;

-- Dumping structure for table 517_shop.order_product_pins
CREATE TABLE IF NOT EXISTS `order_product_pins` (
  `order_id` bigint(20) unsigned NOT NULL,
  `product_pins_id` bigint(20) unsigned NOT NULL,
  `count` int(11) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `discount` decimal(8,2) NOT NULL DEFAULT 0.00,
  `fractional_count` int(11) NOT NULL DEFAULT 0,
  `defactive_count` int(11) NOT NULL DEFAULT 0,
  `detail` text CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`order_id`,`product_pins_id`),
  KEY `FK_order_product_pins_product_pins` (`product_pins_id`),
  CONSTRAINT `FK_order_product_pins_order` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`),
  CONSTRAINT `FK_order_product_pins_product_pins` FOREIGN KEY (`product_pins_id`) REFERENCES `product_pins` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- Dumping data for table 517_shop.order_product_pins: ~402 rows (approximately)
/*!40000 ALTER TABLE `order_product_pins` DISABLE KEYS */;
INSERT INTO `order_product_pins` (`order_id`, `product_pins_id`, `count`, `price`, `discount`, `fractional_count`, `defactive_count`, `detail`, `created_at`, `updated_at`) VALUES
	(1, 1, 5, 100000.00, 0.00, 0, 0, NULL, '2019-11-10 12:05:10', '2019-11-10 12:05:11'),
	(1, 2, 2, 20000.00, 0.00, 0, 0, NULL, '2019-11-10 12:05:08', '2019-11-10 12:05:09'),
	(6, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(7, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(8, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(9, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(10, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(11, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(12, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(13, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(14, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(15, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(16, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(17, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(18, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(19, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(20, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(21, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(22, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(23, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(24, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(25, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(26, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(27, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(28, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(29, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(30, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(31, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(32, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(33, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(34, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(35, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(36, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(37, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(38, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(39, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(40, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(41, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(42, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(43, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(44, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(45, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(46, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(47, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(48, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(49, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(50, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(51, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(52, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(53, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(54, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(55, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(56, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(57, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(58, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(59, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(60, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(61, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(62, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(63, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(64, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(65, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(66, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(67, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(68, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(69, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(70, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(71, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(72, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(73, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(74, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(75, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(76, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(77, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(78, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(79, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(80, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(81, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(82, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(83, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(84, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(85, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(86, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(87, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(88, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(89, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(90, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(91, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(92, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(93, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(94, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(95, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(96, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(97, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(98, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(99, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(100, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(101, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(102, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(103, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(104, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(105, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(106, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(107, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(108, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(109, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(110, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(111, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(112, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(113, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(114, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(115, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(116, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(117, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(118, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(119, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(120, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(121, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(122, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(123, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(124, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(125, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(126, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(127, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(128, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(129, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(130, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(131, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(132, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(133, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(134, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(135, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(136, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(137, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(138, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(139, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(140, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(141, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(142, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(143, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(144, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(145, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(146, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(147, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(148, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(149, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(150, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(151, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(152, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(153, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(154, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(155, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(156, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(157, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(158, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(159, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(160, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(161, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(162, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(163, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(164, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(165, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(166, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(167, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(168, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(169, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(170, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(171, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(172, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(173, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(174, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(175, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(176, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(177, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(178, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(179, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(180, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(181, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(182, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(183, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(184, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(185, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(186, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(187, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(188, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(189, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(190, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(191, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(192, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(193, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(194, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(195, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(196, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(197, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(198, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(199, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(200, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(201, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(202, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(203, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(204, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(205, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(206, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(207, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(208, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(209, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(210, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(211, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(212, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(213, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(214, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(215, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(216, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(217, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(218, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(219, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(220, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(221, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(222, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(223, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(224, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(225, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(226, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(227, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(228, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(229, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(230, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(231, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(232, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(233, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(234, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(235, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(236, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(237, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(238, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(239, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(240, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(241, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(242, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(243, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(244, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(245, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(246, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(247, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(248, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(249, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(250, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(251, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(252, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(253, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(254, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(255, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(256, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(257, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(258, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(259, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(260, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(261, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(262, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(263, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(264, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(265, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(266, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(267, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(268, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(269, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(270, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(271, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(272, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(273, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(274, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(275, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(276, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(277, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(278, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(279, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(280, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(281, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(282, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(283, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(284, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(285, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(286, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(287, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(288, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(289, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(290, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(291, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(292, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(293, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(294, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(295, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(296, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(297, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(298, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(299, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(300, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(301, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(302, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(303, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(304, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(305, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(306, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(307, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(308, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(309, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(310, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(311, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(312, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(313, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(314, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(315, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(316, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(317, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(318, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(319, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(320, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(321, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(322, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(323, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(324, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(325, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(326, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(327, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(328, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(329, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(330, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(331, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(332, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(333, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(334, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(335, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(336, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(337, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(338, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(339, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(340, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(341, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(342, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(343, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(344, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(345, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(346, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(347, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(348, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(349, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(350, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(351, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(352, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(353, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(354, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(355, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(356, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(357, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(358, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(359, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(360, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(361, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(362, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(363, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(364, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(365, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(366, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(367, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(368, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(369, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(370, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(371, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(372, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(373, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(374, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(375, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(376, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(377, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(378, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(379, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(380, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(381, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(382, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(383, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(384, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(385, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(386, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(387, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(388, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(389, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(390, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(391, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(392, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(393, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(394, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(395, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(396, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(397, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(398, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(399, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(400, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(401, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(402, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(403, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(404, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(405, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL);
/*!40000 ALTER TABLE `order_product_pins` ENABLE KEYS */;

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

-- Dumping structure for table 517_shop.payment
CREATE TABLE IF NOT EXISTS `payment` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `paymentable_id` bigint(20) unsigned NOT NULL,
  `paymentable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(18,2) NOT NULL,
  `ref_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('online') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'online',
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `paymentable_id` (`paymentable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.payment: ~2 rows (approximately)
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` (`id`, `paymentable_id`, `paymentable_type`, `amount`, `ref_id`, `type`, `status`, `created_at`, `updated_at`) VALUES
	(1, 1, 'App\\Order', 240000.00, '1221135445', 'online', 1, '2019-11-10 11:54:44', '2019-11-10 11:54:45'),
	(2, 1, 'App\\Order', 16000.00, '1254878', 'online', 1, '2019-11-10 15:52:04', '2019-11-10 15:52:05');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;

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

-- Dumping data for table 517_shop.permission: ~37 rows (approximately)
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` (`key`, `title`, `url`, `method`, `parent`, `created_at`, `updated_at`) VALUES
	('api_backend_anbar_index', 'فارسی', '/api/backend/anbar', 'GET', 'anbar', '2019-11-23 09:45:46', '2019-11-23 09:45:46'),
	('api_backend_orders_fractiveRequest', 'api_backend_orders_fractiveRequest', '/api/backend/orders/{id}/fractive-request', 'POST', 'order', '2019-11-23 09:45:46', '2019-11-23 09:45:46'),
	('api_backend_orders_index', 'api_backend_orders_index', '/api/backend/orders', 'GET', 'order', '2019-11-23 09:45:46', '2019-11-23 09:45:46'),
	('api_backend_orders_show', 'api_backend_orders_show', '/api/backend/orders/{id}', 'GET', 'order', '2019-11-23 09:45:46', '2019-11-23 09:45:46'),
	('api_backend_orders_update', 'api_backend_orders_update', '/api/backend/orders/{id}', 'PUT', 'order', '2019-11-23 09:45:46', '2019-11-23 09:45:46'),
	('api_backend_products_attributes_index', 'api_backend_products_attributes_index', '/api/backend/products/attributes', 'GET', 'groupAttribute', '2019-11-23 09:45:47', '2019-11-23 09:45:47'),
	('api_backend_products_attributes_show', 'api_backend_products_attributes_show', '/api/backend/products/attributes/{id}', 'GET', 'groupAttribute', '2019-11-23 09:45:47', '2019-11-23 09:45:47'),
	('api_backend_products_attributes_store', 'api_backend_products_attributes_store', '/api/backend/products/attributes', 'POST', 'groupAttribute', '2019-11-23 09:45:47', '2019-11-23 09:45:47'),
	('api_backend_products_attributes_update', 'api_backend_products_attributes_update', '/api/backend/products/attributes/{id}', 'PUT', 'groupAttribute', '2019-11-23 09:45:47', '2019-11-23 09:45:47'),
	('api_backend_products_brands_index', 'api_backend_products_brands_index', '/api/backend/products/brands', 'GET', 'brand', '2019-11-23 09:45:47', '2019-11-23 09:45:47'),
	('api_backend_products_brands_show', 'api_backend_products_brands_show', '/api/backend/products/brands/{id}', 'GET', 'brand', '2019-11-23 09:45:47', '2019-11-23 09:45:47'),
	('api_backend_products_brands_store', 'api_backend_products_brands_store', '/api/backend/products/brands', 'POST', 'brand', '2019-11-23 09:45:47', '2019-11-23 09:45:47'),
	('api_backend_products_brands_update', 'api_backend_products_brands_update', '/api/backend/products/brands/{id}', 'PUT', 'brand', '2019-11-23 09:45:47', '2019-11-23 09:45:47'),
	('api_backend_products_categories_getAttributes', 'api_backend_products_categories_getAttributes', '/api/backend/products/categories/{id}/attributes', 'GET', 'productCategory', '2019-11-23 09:45:46', '2019-11-23 09:45:46'),
	('api_backend_products_categories_index', 'api_backend_products_categories_index', '/api/backend/products/categories', 'GET', 'productCategory', '2019-11-23 09:45:46', '2019-11-23 09:45:46'),
	('api_backend_products_categories_show', 'api_backend_products_categories_show', '/api/backend/products/categories/{id}', 'GET', 'productCategory', '2019-11-23 09:45:46', '2019-11-23 09:45:46'),
	('api_backend_products_categories_store', 'api_backend_products_categories_store', '/api/backend/products/categories', 'POST', 'productCategory', '2019-11-23 09:45:46', '2019-11-23 09:45:46'),
	('api_backend_products_categories_storeAttributes', 'api_backend_products_categories_storeAttributes', '/api/backend/products/categories/{id}/attributes', 'POST', 'productCategory', '2019-11-23 09:45:46', '2019-11-23 09:45:46'),
	('api_backend_products_categories_update', 'api_backend_products_categories_update', '/api/backend/products/categories/{id}', 'PUT', 'productCategory', '2019-11-23 09:45:46', '2019-11-23 09:45:46'),
	('api_backend_products_changeStatus', 'api_backend_products_changeStatus', '/api/backend/products/{id}/change/status', 'PUT', 'product', '2019-11-23 09:45:47', '2019-11-23 09:45:47'),
	('api_backend_products_index', 'api_backend_products_index', '/api/backend/products', 'GET', 'product', '2019-11-23 09:45:47', '2019-11-23 09:45:47'),
	('api_backend_products_pins', 'api_backend_products_pins', '/api/backend/products/{id}/pins', 'GET', 'product', '2019-11-23 09:45:47', '2019-11-23 09:45:47'),
	('api_backend_products_productAttributes', 'api_backend_products_productAttributes', '/api/backend/products/{id}/categories/{categories}/attributes', 'GET', 'product', '2019-11-23 09:45:47', '2019-11-23 09:45:47'),
	('api_backend_products_show', 'api_backend_products_show', '/api/backend/products/{id}', 'GET', 'product', '2019-11-23 09:45:47', '2019-11-23 09:45:47'),
	('api_backend_products_store', 'api_backend_products_store', '/api/backend/products', 'POST', 'product', '2019-11-23 09:45:47', '2019-11-23 09:45:47'),
	('api_backend_products_storePins', 'api_backend_products_storePins', '/api/backend/products/{id}/pins', 'POST', 'product', '2019-11-23 09:45:47', '2019-11-23 09:45:47'),
	('api_backend_products_update', 'api_backend_products_update', '/api/backend/products/{id}', 'PUT', 'product', '2019-11-23 09:45:47', '2019-11-23 09:45:47'),
	('api_backend_users_changePassword', 'api_backend_users_changePassword', '/api/backend/users/{id}/change/password', 'PUT', 'user', '2019-11-23 09:45:46', '2019-11-23 09:45:46'),
	('api_backend_users_changeStatus', 'api_backend_users_changeStatus', '/api/backend/users/{id}/change/status', 'PUT', 'user', '2019-11-23 09:45:46', '2019-11-23 09:45:46'),
	('api_backend_users_index', 'api_backend_users_index', '/api/backend/users', 'GET', 'user', '2019-11-23 09:45:46', '2019-11-23 09:45:46'),
	('api_backend_users_permissions_index', 'api_backend_users_permissions_index', '/api/backend/users/permissions', 'GET', 'permission', '2019-11-23 09:45:46', '2019-11-23 09:45:46'),
	('api_backend_users_permissions_initial', 'api_backend_users_permissions_initial', '/api/backend/users/permissions/initial', 'GET', 'permission', '2019-11-23 09:45:46', '2019-11-23 09:45:46'),
	('api_backend_users_roles_index', 'api_backend_users_roles_index', '/api/backend/users/roles', 'GET', 'role', '2019-11-23 09:45:46', '2019-11-23 09:45:46'),
	('api_backend_users_roles_store', 'api_backend_users_roles_store', '/api/backend/users/roles', 'POST', 'role', '2019-11-23 09:45:46', '2019-11-23 09:45:46'),
	('api_backend_users_show', 'api_backend_users_show', '/api/backend/users/{id}', 'GET', 'user', '2019-11-23 09:45:46', '2019-11-23 09:45:46'),
	('api_backend_users_store', 'api_backend_users_store', '/api/backend/users', 'POST', 'user', '2019-11-23 09:45:46', '2019-11-23 09:45:46'),
	('api_backend_users_update', 'api_backend_users_update', '/api/backend/users/{id}', 'PUT', 'user', '2019-11-23 09:45:46', '2019-11-23 09:45:46');
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;

-- Dumping structure for table 517_shop.permission_role
CREATE TABLE IF NOT EXISTS `permission_role` (
  `role_key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `permission_key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`role_key`,`permission_key`),
  KEY `FK_permission_role_permission` (`permission_key`),
  CONSTRAINT `FK_permission_role_permission` FOREIGN KEY (`permission_key`) REFERENCES `permission` (`key`),
  CONSTRAINT `FK_permission_role_role` FOREIGN KEY (`role_key`) REFERENCES `role` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.permission_role: ~36 rows (approximately)
/*!40000 ALTER TABLE `permission_role` DISABLE KEYS */;
INSERT INTO `permission_role` (`role_key`, `permission_key`) VALUES
	('admin', 'api_backend_orders_index'),
	('admin', 'api_backend_orders_show'),
	('super_admin', 'api_backend_orders_index'),
	('super_admin', 'api_backend_orders_show'),
	('super_admin', 'api_backend_products_attributes_index'),
	('super_admin', 'api_backend_products_attributes_show'),
	('super_admin', 'api_backend_products_attributes_store'),
	('super_admin', 'api_backend_products_attributes_update'),
	('super_admin', 'api_backend_products_brands_index'),
	('super_admin', 'api_backend_products_brands_show'),
	('super_admin', 'api_backend_products_brands_store'),
	('super_admin', 'api_backend_products_brands_update'),
	('super_admin', 'api_backend_products_categories_getAttributes'),
	('super_admin', 'api_backend_products_categories_index'),
	('super_admin', 'api_backend_products_categories_show'),
	('super_admin', 'api_backend_products_categories_store'),
	('super_admin', 'api_backend_products_categories_storeAttributes'),
	('super_admin', 'api_backend_products_categories_update'),
	('super_admin', 'api_backend_products_changeStatus'),
	('super_admin', 'api_backend_products_index'),
	('super_admin', 'api_backend_products_pins'),
	('super_admin', 'api_backend_products_productAttributes'),
	('super_admin', 'api_backend_products_show'),
	('super_admin', 'api_backend_products_store'),
	('super_admin', 'api_backend_products_storePins'),
	('super_admin', 'api_backend_products_update'),
	('super_admin', 'api_backend_users_changePassword'),
	('super_admin', 'api_backend_users_changeStatus'),
	('super_admin', 'api_backend_users_index'),
	('super_admin', 'api_backend_users_permissions_index'),
	('super_admin', 'api_backend_users_permissions_initial'),
	('super_admin', 'api_backend_users_roles_index'),
	('super_admin', 'api_backend_users_roles_store'),
	('super_admin', 'api_backend_users_show'),
	('super_admin', 'api_backend_users_store'),
	('super_admin', 'api_backend_users_update');
/*!40000 ALTER TABLE `permission_role` ENABLE KEYS */;

-- Dumping structure for table 517_shop.product
CREATE TABLE IF NOT EXISTS `product` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `brand_id` int(11) unsigned NOT NULL,
  `slug` varchar(255) COLLATE utf8_persian_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  `code` varchar(50) COLLATE utf8_persian_ci DEFAULT NULL,
  `count` int(11) NOT NULL DEFAULT 0,
  `price` int(11) NOT NULL DEFAULT 0,
  `discount` int(11) NOT NULL DEFAULT 0,
  `sales_number` int(11) NOT NULL DEFAULT 0,
  `visitor` int(11) NOT NULL DEFAULT 0,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `content` text COLLATE utf8_persian_ci DEFAULT NULL,
  `meta_title` varchar(255) COLLATE utf8_persian_ci DEFAULT NULL,
  `meta_description` varchar(255) COLLATE utf8_persian_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_slug_unique` (`slug`),
  KEY `FK_products_brand` (`brand_id`),
  CONSTRAINT `FK_products_brand` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- Dumping data for table 517_shop.product: ~2 rows (approximately)
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` (`id`, `brand_id`, `slug`, `title`, `code`, `count`, `price`, `discount`, `sales_number`, `visitor`, `status`, `content`, `meta_title`, `meta_description`, `created_at`, `updated_at`) VALUES
	(1, 1, 'pro', 'محصول شماره یک', 'fsdfsdf', 10, 100000, 100000, 0, 0, 1, NULL, NULL, NULL, '2019-11-10 11:58:14', '2019-11-24 20:27:47'),
	(2, 1, NULL, 'محصول شمار دو', NULL, 0, 0, 0, 0, 0, 1, NULL, NULL, NULL, '2019-11-10 12:04:13', '2019-11-27 06:40:15');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;

-- Dumping structure for table 517_shop.product_categories
CREATE TABLE IF NOT EXISTS `product_categories` (
  `product_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`category_id`,`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.product_categories: ~0 rows (approximately)
/*!40000 ALTER TABLE `product_categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_categories` ENABLE KEYS */;

-- Dumping structure for table 517_shop.product_category
CREATE TABLE IF NOT EXISTS `product_category` (
  `value` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pic_link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `_lft` int(10) unsigned NOT NULL DEFAULT 0,
  `_rgt` int(10) unsigned NOT NULL DEFAULT 0,
  `parent_id` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`value`),
  UNIQUE KEY `product_category_slug_unique` (`slug`),
  KEY `product_category__lft__rgt_parent_id_index` (`_lft`,`_rgt`,`parent_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.product_category: ~3 rows (approximately)
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;
INSERT INTO `product_category` (`value`, `label`, `slug`, `meta_title`, `meta_description`, `pic_link`, `status`, `_lft`, `_rgt`, `parent_id`, `created_at`, `updated_at`) VALUES
	(1, 'دسته بندی محصولات', NULL, NULL, NULL, NULL, 1, 1, 6, NULL, '2019-11-24 20:18:01', '2019-11-24 20:18:01'),
	(2, 'محصولات بهداشتی', NULL, NULL, NULL, NULL, 1, 2, 3, 1, '2019-11-24 20:18:10', '2019-11-24 20:18:10'),
	(3, 'محصولات آرایشی', NULL, NULL, NULL, NULL, 1, 4, 5, 1, '2019-11-24 20:18:18', '2019-11-24 20:18:18');
/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;

-- Dumping structure for table 517_shop.product_pins
CREATE TABLE IF NOT EXISTS `product_pins` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) unsigned NOT NULL DEFAULT 0,
  `group_attribute_product_ids` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` int(11) NOT NULL DEFAULT 0,
  `discount` int(11) NOT NULL DEFAULT 0,
  `count` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_product_pins_product` (`product_id`),
  CONSTRAINT `FK_product_pins_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.product_pins: ~2 rows (approximately)
/*!40000 ALTER TABLE `product_pins` DISABLE KEYS */;
INSERT INTO `product_pins` (`id`, `product_id`, `group_attribute_product_ids`, `price`, `discount`, `count`, `created_at`, `updated_at`) VALUES
	(1, 1, NULL, 100000, 100000, 10, '2019-11-10 12:03:33', '2019-11-10 12:03:34'),
	(2, 2, NULL, 0, 0, 0, '2019-11-10 12:03:50', '2019-11-10 12:03:50');
/*!40000 ALTER TABLE `product_pins` ENABLE KEYS */;

-- Dumping structure for table 517_shop.region
CREATE TABLE IF NOT EXISTS `region` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `_lft` int(10) unsigned NOT NULL DEFAULT 0,
  `_rgt` int(10) unsigned NOT NULL DEFAULT 0,
  `parent_id` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `region__lft__rgt_parent_id_index` (`_lft`,`_rgt`,`parent_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.region: ~0 rows (approximately)
/*!40000 ALTER TABLE `region` DISABLE KEYS */;
INSERT INTO `region` (`id`, `title`, `_lft`, `_rgt`, `parent_id`, `created_at`, `updated_at`) VALUES
	(1, 'تهران', 1, 2, 0, '2019-11-10 23:44:31', '2019-11-10 23:44:31');
/*!40000 ALTER TABLE `region` ENABLE KEYS */;

-- Dumping structure for table 517_shop.role
CREATE TABLE IF NOT EXISTS `role` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.role: ~5 rows (approximately)
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` (`key`, `title`, `created_at`, `updated_at`) VALUES
	('admin', 'ادمین', '2019-11-10 11:43:47', '2019-11-10 11:43:48'),
	('anbar_dar', 'انباردار', '2019-11-24 18:29:47', '2019-11-24 18:29:47'),
	('programmer', 'برنامه نویس', '2019-11-26 10:08:12', '2019-11-26 10:08:12'),
	('sadasd', 'sadasd', '2019-11-27 06:39:18', '2019-11-27 06:39:18'),
	('super_admin', 'سوپر ادمین', '2019-11-26 10:07:59', '2019-11-26 10:07:59');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;

-- Dumping structure for table 517_shop.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_persian_ci NOT NULL,
  `mobile` varchar(11) COLLATE utf8_persian_ci NOT NULL,
  `role_key` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `password` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_persian_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_mobile_unique` (`mobile`),
  KEY `role_key` (`role_key`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- Dumping data for table 517_shop.users: ~5 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `name`, `mobile`, `role_key`, `status`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
	(1, 'مهرداد', '09120246217', '', 1, '', NULL, '2019-11-09 20:37:55', '2019-11-09 20:37:55'),
	(2, 'مهدی', '09398624739', '', 1, '', NULL, '2019-11-22 11:38:50', '2019-11-22 11:38:51'),
	(3, 'محسن', '09120246219', '', 1, '', NULL, '2019-11-22 11:39:04', '2019-11-22 11:39:04'),
	(4, 'علی', '09361753251', '', 1, '', NULL, '2019-11-22 11:39:14', '2019-11-22 11:39:15'),
	(5, 'مصطفی', '09142013333', 'programmer', 1, '', NULL, '2019-11-22 11:39:33', '2019-11-27 14:02:23'),
	(6, 'مهرداد معصومی', '09120123567', 'super_admin', 1, '$2y$10$.dE08BjAlMFN7gWXDDTpCOVhFZjnvUKFDCg0R5kHoyPIesLEouxeq', NULL, '2019-11-27 10:19:04', '2019-11-27 14:02:25'),
	(7, 'مهرداد معصومی', '09361111111', 'anbar_dar', 0, '$2y$10$A2bNd7dXsd3jG7V8JkSWpO9FPNtMFkq33Rxfbc1DBrdp9xtcFbCEm', NULL, '2019-11-27 10:26:00', '2019-11-27 14:02:21');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

-- Dumping structure for trigger 517_shop.anbar_before_delete
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `anbar_before_delete` BEFORE DELETE ON `anbar` FOR EACH ROW BEGIN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Access denaid';
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger 517_shop.order_after_update
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `order_after_update` AFTER UPDATE ON `order` FOR EACH ROW BEGIN 
	DECLARE counter INTEGER;
	IF OLD.delivery_status != 4 and  NEW.delivery_status = 4
	THEN 
		
		INSERT INTO finance (user_id, financeable_id, financeable_type, debtor, credit, description, created_at, updated_at) VALUES
		(OLD.user_id, OLD.id, 'AppOrder', 0, OLD.total_price, 'بابت مرجوعی کالا', NOW(), NOW()),
		(OLD.user_id, OLD.Id, 'AppOrder', OLD.post_cost, 0, 'هزینه پستی کسر گردید', NOW(), NOW());
		
		delete from payment where status = 0 and paymentable_id = OLD.id and paymentable_type="AppOrder" AND amount = OLD.post_cost;
		
	ELSEIF OLD.delivery_status = 4 and  NEW.delivery_status != 4
	THEN
		DELETE
		FROM finance
		WHERE financeable_id = OLD.id AND financeable_type= 'AppOrder' and status = 0;	
	END IF;
	
	IF OLD.transport_status <> 3 and NEW.transport_status = 3
	THEN 
		SET counter = (select count(*) from payment where paymentable_id= OLD.id and paymentable_type = 'AppOrder' and status = 0 and amount = OLD.post_cost);
			IF counter = 0
			THEN
				INSERT INTO payment (paymentable_id, paymentable_type, amount, status, type, created_at, updated_at)
				values (OLD.id, 'AppOrder', OLD.post_cost, 0, 'online', NOW(), NOW());	
			END IF;
	end IF;		
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger 517_shop.order_before_update
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `order_before_update` BEFORE UPDATE ON `order` FOR EACH ROW BEGIN

	IF NEW.delivery_status <> 1 AND NEW.items_status = 1
	THEN
		SET NEW.items_status = 0;
	END IF;

	IF NEW.delivery_status <> 1 AND (NEW.items_status = 2 or OLD.items_status = 2) and (select count(*) from order_fractive_request where status = 1 and order_fractive_request.order_id = OLD.id) > 0
	THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'مرسوله توسط انبار دار برای کسری یا معیوبی کالا تایید شده است.';
	END IF;
	

	/* وضعیت جدید حمل و نقل ارسال مجدد است*/
	IF NEW.transport_status = 3
	THEN
		IF OLD.transport_status IN (0, 2) /* اگر ار صف ارسال و در حال اماده سازی به ارسال مجدد تبدیل شد*/
		THEN 
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message;			
		ELSE /*اگر از حالت خروج از انبار یا حالت دیگه تبدیل شد*/
			IF OLD.delivery_status = 0 OR NEW.delivery_status = 0 /*در صورتی که هنوز ارسال نشده است نمیتولند ارسال مجدد شود*/
			THEN
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ORDER BE DATE USER NARESIDE KE BEKHAD MOJADAD BASHE';
			ELSEIF OLD.delivery_status <> 3 AND NEW.delivery_status <> 3 /* ارسال شده و وضعیت بازگشت به انبار ندارد*/
			THEN
				SET NEW.delivery_status = 3;	
			END IF;
		END IF;
	END IF;
	
	/*از حالت بی تاثیر به ارسال مجدد قابل انجام نیست*/
	IF NEW.transport_status IN (0, 2)
	THEN
		IF OLD.transport_status = 3
		THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = message;
		END IF;
		set new.delivery_status = 0;
	END IF;
	
	IF OLD.delivery_status = 3 AND NEW.transport_status = 3 AND NEW.delivery_status NOT IN(3,4)
	THEN
		 SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'TA ZAMANI KE ERSAL MOJAJD AST NEMISHAVARD';
	END IF;
	

	IF NEW.delivery_status = 4 AND (OLD.transport_status = 3 OR NEW.transport_status = 3)
	THEN
		SET NEW.transport_status = 1;
		delete from payment where status = 0 and paymentable_id = OLD.id and paymentable_type="AppOrder" AND amount = OLD.post_cost;
	END IF;

	
	
	/* اگر فاکتور پرداختی نداشته باشد نمیشود به خروج از انبار تبدیل کرد.*/
	IF NEW.transport_status = 1
	THEN
		IF OLD.total_price <> (SELECT SUM(amount) FROM payment WHERE paymentable_id = OLd.id and paymentable_type = 'AppOrder' and status = 1) OR (SELECT COUNT(*) FROM payment WHERE payment.paymentable_id = OLD.id AND payment.paymentable_type = 'AppOrder' AND payment.status = 0) > 0
		THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'PAYMENT KAMEL NISTS';		
		END IF;
	END IF;
	
	/*پس از پرداخت الحاقیه خروج از انبار میشود و وضعیت تحویل دیفالت میشود.*/
	IF NEW.transport_status = 1 AND OLD.transport_status IN(0,2,3) AND NEW.delivery_status <> 4
	THEN
		SET NEW.delivery_status = 0;
	END IF; 
		
	/* تبدیل خروج از انبار به حالت دیگری در صورتی انجام میشود که در فاکتور تجمیعی انبار نباشد*/
	IF OLD.transport_status = 1 AND NEW.transport_status <> 1
	THEN
		IF (SELECT COUNT(*) FROM anbar left join order_in_anbar on anbar.id = order_in_anbar.anbar_id WHERE order_in_anbar.order_id = OLD.id and post_sending_data = 1) > 0
		THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = ' IN TAJMIEE FACTOR';
		END IF;
	END IF;	
	
					
	
	/*اگر ار مرجوعی بخاد خارج بشه*/
	IF OLD.delivery_status = 4 AND NEW.delivery_status <> 4
	THEN
		IF (SELECT COUNT(*) FROM finance WHERE finance.financeable_id = OLD.id AND finance.financeable_type = 'AppOrder' AND finance.status = 1) > 0
		THEN
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'MARJOEE VA PARDAKHT BE KARBAR';
		END IF;
	END IF;
	



	IF NEW.order_status = 1 and OLD.total_price <> (SELECT SUM(amount) FROM payment WHERE paymentable_id = OLd.id and paymentable_type = 'AppOrder' and status = 1)
	THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'پرداخت کامل نیست.';
	END IF;	
	
	IF OLD.order_status = 1 AND NEW.order_status <> 1 AND OLD.total_price = (SELECT SUM(amount) FROM payment WHERE paymentable_id = OLd.id and paymentable_type = 'AppOrder' and status = 1)
	THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'امکان تغییر وضغیت سفارش نیست.';
	END IF;
		



	IF NEW.delivery_status > 0 AND NEW.transport_status <> 1
	THEN
		IF NEW.delivery_status <> 3 AND NEW.transport_status <> 3
		THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'سفارش خروج از انبار نشده است.';			
		END IF;	
	END IF;
	
	
	
	IF NEW.items_status > 0 and New.delivery_status <> 1
	THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'سفارش به دست مشتری نرسیده است.';			
	END IF;
	
	

	
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger 517_shop.order_fractive_request_after_update
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `order_fractive_request_after_update` AFTER UPDATE ON `order_fractive_request` FOR EACH ROW BEGIN

END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger 517_shop.product_pins_after_update
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `product_pins_after_update` AFTER UPDATE ON `product_pins` FOR EACH ROW BEGIN
	DECLARE counter INTEGER;
	DECLARE discount INTEGER;
	DECLARE price INTEGER;
	SET counter = (select sum(product_pins.count) from product_pins where product_id = OLD.product_id);
	SET discount = (SELECT AVG(product_pins.discount) FROM product_pins WHERE product_id = OLD.product_id) ;
	set price = (SELECT AVG(product_pins.price) FROM product_pins WHERE product_id = OLD.product_id);
	
	update product set count = counter, price = price, discount = discount where id = OLD.product_id;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
