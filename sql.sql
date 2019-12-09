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

-- Dumping structure for table 517_shop.communication_channel
CREATE TABLE IF NOT EXISTS `communication_channel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) COLLATE utf8_persian_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- Dumping data for table 517_shop.communication_channel: ~7 rows (approximately)
/*!40000 ALTER TABLE `communication_channel` DISABLE KEYS */;
INSERT INTO `communication_channel` (`id`, `title`) VALUES
	(1, 'فکس'),
	(2, 'موبایل'),
	(3, 'ایمیل info'),
	(4, 'تلگرام'),
	(5, 'واتس اپ'),
	(6, 'شماره تماس'),
	(7, 'ایمیل پشتیبانی');
/*!40000 ALTER TABLE `communication_channel` ENABLE KEYS */;

-- Dumping structure for table 517_shop.domain
CREATE TABLE IF NOT EXISTS `domain` (
  `key` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `meta_title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `meta_description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `introduce` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `android` tinyint(1) DEFAULT 0,
  `ios` tinyint(1) DEFAULT 0,
  `maintenance_mode` tinyint(1) DEFAULT 0,
  `register` tinyint(1) DEFAULT 1,
  `basket` tinyint(1) DEFAULT 1,
  `user_dashboard` tinyint(1) DEFAULT 1,
  `admin_panel` tinyint(1) DEFAULT 1,
  `status` tinyint(1) DEFAULT 1,
  `created_at` datetime DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.domain: ~0 rows (approximately)
/*!40000 ALTER TABLE `domain` DISABLE KEYS */;
INSERT INTO `domain` (`key`, `name`, `meta_title`, `meta_description`, `introduce`, `android`, `ios`, `maintenance_mode`, `register`, `basket`, `user_dashboard`, `admin_panel`, `status`, `created_at`, `updated_at`) VALUES
	('localhost:3000', '21212121', 'dfdfd', 'تینساسباسی', 'نسیاتنسابسکنیمب', 1, 0, 0, 1, 1, 1, 1, 1, '2019-12-07 10:11:41', '2019-12-09 10:05:36');
/*!40000 ALTER TABLE `domain` ENABLE KEYS */;

-- Dumping structure for table 517_shop.domain_communication_channel
CREATE TABLE IF NOT EXISTS `domain_communication_channel` (
  `domain_key` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `communication_channel_id` int(11) NOT NULL,
  `value` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`domain_key`,`communication_channel_id`),
  KEY `FK_communication_channel_domain_communication_channel` (`communication_channel_id`),
  CONSTRAINT `FK_communication_channel_domain_communication_channel` FOREIGN KEY (`communication_channel_id`) REFERENCES `communication_channel` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_communication_channel_domain_domain` FOREIGN KEY (`domain_key`) REFERENCES `domain` (`key`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.domain_communication_channel: ~3 rows (approximately)
/*!40000 ALTER TABLE `domain_communication_channel` DISABLE KEYS */;
INSERT INTO `domain_communication_channel` (`domain_key`, `communication_channel_id`, `value`) VALUES
	('localhost:3000', 1, 'dfdfd'),
	('localhost:3000', 2, 'gfhfghfgh'),
	('localhost:3000', 4, '0912222');
/*!40000 ALTER TABLE `domain_communication_channel` ENABLE KEYS */;

-- Dumping structure for table 517_shop.domain_social_media
CREATE TABLE IF NOT EXISTS `domain_social_media` (
  `domain_key` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `social_media_id` int(11) NOT NULL,
  `value` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`domain_key`,`social_media_id`),
  KEY `FK_social_media_domain_social_media` (`social_media_id`),
  CONSTRAINT `FK_social_media_domain_domain` FOREIGN KEY (`domain_key`) REFERENCES `domain` (`key`) ON UPDATE CASCADE,
  CONSTRAINT `FK_social_media_domain_social_media` FOREIGN KEY (`social_media_id`) REFERENCES `social_media` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.domain_social_media: ~4 rows (approximately)
/*!40000 ALTER TABLE `domain_social_media` DISABLE KEYS */;
INSERT INTO `domain_social_media` (`domain_key`, `social_media_id`, `value`) VALUES
	('localhost:3000', 1, 'ddddddddd'),
	('localhost:3000', 2, 'sdfdsfdsf'),
	('localhost:3000', 3, 'یسسیبسی'),
	('localhost:3000', 7, 'بببب');
/*!40000 ALTER TABLE `domain_social_media` ENABLE KEYS */;

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
BEGIN
	SELECT  permission.*,
	IF(ISNULL(role_key), false, true) AS access
	FROM permission 
	left JOIN permission_role ON permission_role.permission_key = permission.`key` AND  permission_role.role_key = role_parameter COLLATE utf8_unicode_ci
	WHERE parent = parent_parameter COLLATE utf8_unicode_ci
	order by permission.created_at ASC;
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
	(2, 4),
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

-- Dumping data for table 517_shop.oauth_access_tokens: ~15 rows (approximately)
/*!40000 ALTER TABLE `oauth_access_tokens` DISABLE KEYS */;
INSERT INTO `oauth_access_tokens` (`id`, `user_id`, `client_id`, `name`, `scopes`, `revoked`, `created_at`, `updated_at`, `expires_at`) VALUES
	('009b41895637095b63154a251896fd6528d7148a0eef90272f3e0ec64e0bca29bcbaaa6aa385a56b', 2, 2, 'Token Name', '[]', 1, '2019-12-09 12:37:27', '2019-12-09 12:37:27', '2020-12-09 12:37:27'),
	('09cc4afb9215c5a46e3a571259a40f4506f08adecb0c1818d1562d7d290a05625fed73e8d6a76737', 2, 2, 'Token Name', '[]', 1, '2019-12-09 12:28:36', '2019-12-09 12:28:36', '2020-12-09 12:28:36'),
	('0c567735de457793fc7584b51f601086039c5446f5d6489cfda0e01af5f9de344540e0ab394027b8', 2, 2, 'Token Name', '[]', 1, '2019-12-09 13:06:16', '2019-12-09 13:06:16', '2020-12-09 13:06:16'),
	('0ff1eca72a37d12a4814f162387915931feefd5eebc0426f93c4b950ff03ea6d62f2e88e68e82d9d', 2, 2, 'Token Name', '[]', 1, '2019-12-09 13:13:09', '2019-12-09 13:13:09', '2020-12-09 13:13:09'),
	('10951993065a7bc852ef3efac20d9fd5384a6da14de04ece8ed3076fefb158b8763089a1a24a6d82', 2, 2, 'Token Name', '[]', 1, '2019-12-09 13:26:07', '2019-12-09 13:26:07', '2020-12-09 13:26:07'),
	('1238a121014741491745fbc21b3c708d348ddbaa30938fd7fc72965909178932003411064cac9e99', 2, 2, 'Token Name', '[]', 1, '2019-12-07 20:47:50', '2019-12-07 20:47:50', '2020-12-07 20:47:50'),
	('1239829f3cc646843f37e163019fc54984c9e58e1c8d540c08b522983c52d3c650f7fc18d8ef9972', 2, 2, 'Token Name', '[]', 1, '2019-12-09 13:11:44', '2019-12-09 13:11:44', '2020-12-09 13:11:44'),
	('16bf0b04a915fc03ffd87990bd92affbcf27c7bcef38b4088d8a75279b21470b758af5258b4f32ed', 2, 2, 'Token Name', '[]', 1, '2019-12-09 12:20:50', '2019-12-09 12:20:50', '2020-12-09 12:20:50'),
	('172731455c9af34036b91379165496fbde2d5e043cf5a79ad2d73d800eb23fa017f2073ede5d6785', 2, 2, 'Token Name', '[]', 1, '2019-12-09 07:46:36', '2019-12-09 07:46:36', '2020-12-09 07:46:36'),
	('1e9f8ecf9c3715dc485436268068cc1796a8c843ad3cf135e7d7198cd9774ba9e785c10e71a8a5fa', 2, 2, 'Token Name', '[]', 1, '2019-12-09 13:22:50', '2019-12-09 13:22:50', '2020-12-09 13:22:50'),
	('22adfff029cda2bb62ebae6feebf67933644e08cc726622a3883b6345b4056e4f60d7fedbd9194ab', 2, 2, 'Token Name', '[]', 1, '2019-12-09 13:11:35', '2019-12-09 13:11:35', '2020-12-09 13:11:35'),
	('27d80dfc6827c3b26dc3b36ce0a8d39379ba31ef4a0e52302ab6809419d9c9e3a489da54f685d722', 2, 2, 'Token Name', '[]', 1, '2019-12-09 13:04:32', '2019-12-09 13:04:32', '2020-12-09 13:04:32'),
	('299853ecf1d34727f3c16da51fe70c4384200dbec2f549345fe1da5059db71481b16773a1b8a1a23', 2, 2, 'Token Name', '[]', 1, '2019-12-09 12:21:08', '2019-12-09 12:21:08', '2020-12-09 12:21:08'),
	('2b7ba22651268d3d3fbcd364ca7dcbbdcb5474590f5d02efab3e12017fb804c25b5aed264eea81a2', 2, 2, 'Token Name', '[]', 1, '2019-12-09 14:09:49', '2019-12-09 14:09:49', '2020-12-09 14:09:49'),
	('2b7c58b3e9f89cc4153ce83fc2f9106b32d8d9b7d38c3300473fd0e17c84677d77998aaf0e0d0628', 2, 2, 'Token Name', '[]', 1, '2019-12-09 13:11:20', '2019-12-09 13:11:20', '2020-12-09 13:11:20'),
	('2e5854128d800886f90804622e2e82b904edd4a14054a5558e4d5d56e88ab1604ea5c93cd1ab5296', 2, 2, 'Token Name', '[]', 1, '2019-12-09 13:25:08', '2019-12-09 13:25:08', '2020-12-09 13:25:08'),
	('3022e6ac25b99b6077f91781f366a170cec7d234a219926499c2bab7ea05fc5590cbc9299f5b6e6b', 2, 2, 'Token Name', '[]', 1, '2019-12-09 12:52:54', '2019-12-09 12:52:54', '2020-12-09 12:52:54'),
	('384b746fcc7841319d233fcb9b3a56ab7177aff69db871d5fa28314fd8bdaa7ea26e78d776dc1788', 2, 2, 'Token Name', '[]', 1, '2019-12-09 14:09:38', '2019-12-09 14:09:38', '2020-12-09 14:09:38'),
	('3b994818eb0d6f2ae9a0f82bbf9d4031d810827c8620eaf294d5b1154c91bf63a77591b2a9eafd39', 2, 2, 'Token Name', '[]', 1, '2019-12-09 13:25:59', '2019-12-09 13:25:59', '2020-12-09 13:25:59'),
	('46434b8c2c13e957148b8367e2c9748def07ee7fe048832cf5cc995a98e46aeb2a0e5c77c7d41917', 2, 2, 'Token Name', '[]', 1, '2019-12-09 13:06:07', '2019-12-09 13:06:07', '2020-12-09 13:06:07'),
	('4e64aaf58ba8e01bb2273db16d812c48845b0a755834aaf6429413a03cd0d9b770f865537cc3890c', 2, 2, 'Token Name', '[]', 1, '2019-12-07 20:33:51', '2019-12-07 20:33:51', '2020-12-07 20:33:51'),
	('50aa67bcc3b8d7dd17bda7b0742ec71bf3f0c185e7f7eed4549b69df833db2daa3161153d3ba740a', 2, 2, 'Token Name', '[]', 1, '2019-12-09 12:41:20', '2019-12-09 12:41:20', '2020-12-09 12:41:20'),
	('561a88b8dc7d0fd9f5b3ea7d91bab7f26f87f2e384647138f9cb452dc72234e11e74b1411fb57c67', 2, 2, 'Token Name', '[]', 1, '2019-12-09 12:23:52', '2019-12-09 12:23:52', '2020-12-09 12:23:52'),
	('58d74e41aa55a98b90e76a0ed08d4f1d75b19078cd67d0d2e552d7903d24d35b3006fc0317168856', 2, 2, 'Token Name', '[]', 1, '2019-12-08 18:14:59', '2019-12-08 18:14:59', '2020-12-08 18:14:59'),
	('59d9144185faf90497fe9c46a4a0b5fceb750823e971111b560007b031936be61196b9a743b57b32', 2, 2, 'Token Name', '[]', 1, '2019-12-09 11:12:36', '2019-12-09 11:12:36', '2020-12-09 11:12:36'),
	('5abb16d8273f63b450387d5a86302003786653290c3a6a59c2a4124dae54ecc619c4ee8c5f194a76', 2, 2, 'Token Name', '[]', 1, '2019-12-09 13:24:50', '2019-12-09 13:24:50', '2020-12-09 13:24:50'),
	('5f4614ef23259978d3a40fdd6c372d0819c87f9609afcaea63a0de9bf87fe8d79f711002aff1411b', 2, 2, 'Token Name', '[]', 1, '2019-12-07 20:36:18', '2019-12-07 20:36:18', '2020-12-07 20:36:18'),
	('610b5a6e041d6644353c37cc2f74d17d1148b66669fbef63ab91cfdadfc0e6a97a9feecc26a6857c', 2, 2, 'Token Name', '[]', 1, '2019-12-09 12:52:37', '2019-12-09 12:52:37', '2020-12-09 12:52:37'),
	('660af2622d66c954c242e3802514bb84e36f493b24f02ed5181359613b1f7e8a3401ef318c660514', 2, 2, 'Token Name', '[]', 1, '2019-12-09 13:08:09', '2019-12-09 13:08:09', '2020-12-09 13:08:09'),
	('66f7f10a07acaeabbfeeec2aebaab1727c7b1a507afb5f89dede96ebdcf0d995da71ca6feeff0e76', 2, 2, 'Token Name', '[]', 1, '2019-12-09 13:21:22', '2019-12-09 13:21:22', '2020-12-09 13:21:22'),
	('680f36518604108bb2b4bfe4713933b4fbde8f392395fe1a160f0ec392224e77b421721051fb0636', 2, 2, 'Token Name', '[]', 0, '2019-12-08 18:14:35', '2019-12-08 18:14:35', '2020-12-08 18:14:35'),
	('68f0d7d4c603378e8606347a79a6c7d0bb056228784b1b0d1d3f35a95d24aa1e3f39e268360bc53c', 2, 2, 'Token Name', '[]', 1, '2019-12-09 12:36:49', '2019-12-09 12:36:49', '2020-12-09 12:36:49'),
	('6b3142557efc367199346e2e6a915108dc16c67246a33151a457506b4ad23562fe66a0b61607cfdf', 2, 2, 'Token Name', '[]', 1, '2019-12-09 12:49:03', '2019-12-09 12:49:03', '2020-12-09 12:49:03'),
	('6f4912bdf5c1107e6986396eeba6350b9b154370cec09591299393e62acaabeaf5c6abfeb30b5e48', 2, 2, 'Token Name', '[]', 1, '2019-12-09 12:45:32', '2019-12-09 12:45:32', '2020-12-09 12:45:32'),
	('71b43d5ffe85c3e8fa6130bdb1b7b7423c3080bca8c6bb34fc09e95d088b133d22350bf720bdb03e', 2, 2, 'Token Name', '[]', 1, '2019-12-09 13:08:17', '2019-12-09 13:08:17', '2020-12-09 13:08:17'),
	('75b68f23f2265a002abcc8e1d3b947187fdf3a0665d475df5821ebf19e3bb464472d68c9964da1a3', 2, 2, 'Token Name', '[]', 1, '2019-12-09 13:03:22', '2019-12-09 13:03:22', '2020-12-09 13:03:22'),
	('784d8643524547ab40ee7476a5c38f35744b4988e786591298d7ae1c39ee40ea3824c68572a65218', 2, 2, 'Token Name', '[]', 1, '2019-12-09 13:20:25', '2019-12-09 13:20:25', '2020-12-09 13:20:25'),
	('78999b6de7da7b144137b3c3bb32da6f8cc47e20486e9f44b42c14e370f39848c4df3b5ad6647b17', 2, 2, 'Token Name', '[]', 1, '2019-12-09 12:50:49', '2019-12-09 12:50:49', '2020-12-09 12:50:49'),
	('79321defe7a837859e511e74a9d89944a7fc67426be26743019764dd6ede6f108d5fe3e3f2f2bc3b', 2, 2, 'Token Name', '[]', 0, '2019-12-08 17:24:37', '2019-12-08 17:24:37', '2020-12-08 17:24:37'),
	('7ce5358e6b7e7404f6f23732fe129784820a792dc078279c163e888ae853ca48310bda79425f7564', 2, 2, 'Token Name', '[]', 1, '2019-12-09 12:38:52', '2019-12-09 12:38:52', '2020-12-09 12:38:52'),
	('7d6ca92aa6de0ded01eb7432199e9e65549cbb38b9fce29ca4c8458d0c80e732acbfab360bba50f3', 2, 2, 'Token Name', '[]', 1, '2019-12-09 12:26:44', '2019-12-09 12:26:44', '2020-12-09 12:26:44'),
	('818e4b30025bfda7c4834cdde5372585e2bced1354afc1e52d4aa1978e7dc12ee0cdc05866b8ecb4', 2, 2, 'Token Name', '[]', 1, '2019-12-09 13:08:02', '2019-12-09 13:08:02', '2020-12-09 13:08:02'),
	('848fbdd2de69cd8239a15782d6ef2a05a52f2d070cf8ad31bb113cd89eef6e85b3e81cb1adf424da', 2, 2, 'Token Name', '[]', 1, '2019-12-09 12:33:42', '2019-12-09 12:33:42', '2020-12-09 12:33:42'),
	('8bb1dd3f639d3b509d8b71262b77a956da3b4360c8ab45964d55f32622f8e92960574b8dc6629c82', 2, 2, 'Token Name', '[]', 1, '2019-12-09 12:43:42', '2019-12-09 12:43:42', '2020-12-09 12:43:42'),
	('8c8ba0e3a27849e7d5061529e0447baac29729e045bb5f1fdc4d02b184108697f403d4aa24f36755', 2, 2, 'Token Name', '[]', 1, '2019-12-09 13:20:19', '2019-12-09 13:20:19', '2020-12-09 13:20:19'),
	('9059b6420be024bb8c4237c6de483e787b2ac37aee03bf9d2159f8f2b19e7ebe8b7b42dde03b7803', 2, 2, 'Token Name', '[]', 1, '2019-12-09 13:03:16', '2019-12-09 13:03:16', '2020-12-09 13:03:16'),
	('926083aa5151b92cc4099d175023771e77f407ec815eb66ed306dd3e6317ac26732d7b1a7ebf4819', 2, 2, 'Token Name', '[]', 1, '2019-12-09 12:23:09', '2019-12-09 12:23:09', '2020-12-09 12:23:09'),
	('939a15583d8ba29711d93fd3e91c1fba2d138b6fc27aa24c7140c5c0a23a3a239ef704230f2c8b7b', 2, 2, 'Token Name', '[]', 1, '2019-12-09 14:09:28', '2019-12-09 14:09:28', '2020-12-09 14:09:28'),
	('9f60f5139e923cd765f17a6d2d4c48828e24d1d3d2c639084538bbeed8c31e51d5fbe6dce1d6b589', 2, 2, 'Token Name', '[]', 1, '2019-12-09 13:01:09', '2019-12-09 13:01:09', '2020-12-09 13:01:09'),
	('a24c2e8bf04f39c0cdbc53c5cad3cd3ba77e0151be501823a4232e38ce8382648f4209e95413bee7', 2, 2, 'Token Name', '[]', 1, '2019-12-09 14:09:22', '2019-12-09 14:09:22', '2020-12-09 14:09:22'),
	('a2ed477e7c9ac1e6135a7fe972adec07dcc01384aabd72f683728ad948d24f7fe8c7744cc71b8cb6', 2, 2, 'Token Name', '[]', 1, '2019-12-09 12:43:10', '2019-12-09 12:43:10', '2020-12-09 12:43:10'),
	('a4e2081043e788651cc3585787e4addcb69f0bcc5b80fee0a7fb3c43acbcccb0e853437962fc1c08', 2, 2, 'Token Name', '[]', 1, '2019-12-07 20:48:10', '2019-12-07 20:48:10', '2020-12-07 20:48:10'),
	('a763f207e4dfc822d0e6d524e3e88e067cd8823adb22638f73c7b3a315220258fdfe97d668e3592e', 2, 2, 'Token Name', '[]', 1, '2019-12-09 12:29:15', '2019-12-09 12:29:15', '2020-12-09 12:29:15'),
	('a8872c6a7e427e401b5f7c8e04e0148e1ca3e549faa10d82f06f75040f3001c15246e1fadeef92e6', 2, 2, 'Token Name', '[]', 1, '2019-12-09 13:11:26', '2019-12-09 13:11:26', '2020-12-09 13:11:26'),
	('a94d25110ee080fa2ac653c3915870ef53fb21d716361b59c499488359c7336dfa12b698483a37eb', 2, 2, 'Token Name', '[]', 1, '2019-12-07 20:31:29', '2019-12-07 20:31:29', '2020-12-07 20:31:29'),
	('acfd50b6ff3d130a6d01973cb91cd3d4e7c5ed05ea190bf5fbc4131502b7ea4e216f3ffb5cb99314', 2, 2, 'Token Name', '[]', 1, '2019-12-09 13:24:28', '2019-12-09 13:24:28', '2020-12-09 13:24:28'),
	('af8f68b6eb3673ce683ee26a97cf380bb5869bc95e668f6007476769ddbcdf619cec1afc18cb3c2e', 2, 2, 'Token Name', '[]', 1, '2019-12-07 20:47:40', '2019-12-07 20:47:40', '2020-12-07 20:47:40'),
	('b04661a729178752c3e12490942fda77d98f892535727daf4d7f3ca39fa785185b3f6f801c65f0d5', 2, 2, 'Token Name', '[]', 0, '2019-12-08 18:15:07', '2019-12-08 18:15:07', '2020-12-08 18:15:07'),
	('b0509eab0324a94ee8a5a207e948f8118f852218be72454e04319f3e761b123c5056673351d1443c', 2, 2, 'Token Name', '[]', 1, '2019-12-09 12:30:04', '2019-12-09 12:30:04', '2020-12-09 12:30:04'),
	('b687c0f375eec2fa7a4ec486b86c19a120c96ebc1021cfc1be29df7aade57744a8bc89b17ed904c0', 2, 2, 'Token Name', '[]', 1, '2019-12-09 12:38:39', '2019-12-09 12:38:39', '2020-12-09 12:38:39'),
	('b944083a4d2256bf8d1ed75a34a77e40a690a598f1195f38d7dd4ab6eefd2f009067a086adb3d8a6', 2, 2, 'Token Name', '[]', 0, '2019-12-09 10:03:52', '2019-12-09 10:03:52', '2020-12-09 10:03:52'),
	('bc748bfe3c3537f95a9beeafc86b131c77db2af7091be2d2354b8a1fdceed541b8feed4c769e3773', 2, 2, 'Token Name', '[]', 1, '2019-12-09 12:47:53', '2019-12-09 12:47:53', '2020-12-09 12:47:53'),
	('be8dcac4ef568a1beadd0f57128fb85af05aad78240b374f6200f867d4f36f223718c669d549aa19', 2, 2, 'Token Name', '[]', 0, '2019-12-07 20:33:35', '2019-12-07 20:33:35', '2020-12-07 20:33:35'),
	('c0b3a4965816061f5dbe7e8f12d23563b78e7b1e425e87a70d5a3099949ae4f46ee4cddfa880c119', 2, 2, 'Token Name', '[]', 1, '2019-12-09 12:38:47', '2019-12-09 12:38:47', '2020-12-09 12:38:47'),
	('c275e587d813604e152c4c0e4cae4d18551e7b88d52ef36b815c1b98e4fa3068410ec7fef3705664', 2, 2, 'Token Name', '[]', 1, '2019-12-09 12:30:57', '2019-12-09 12:30:57', '2020-12-09 12:30:57'),
	('c40f8925a73f0f463f9b8ef2a75e7921fd1ca567aae96555d76ded076e0739eb2c9d815cf76d3830', 2, 2, 'Token Name', '[]', 1, '2019-12-09 13:26:17', '2019-12-09 13:26:17', '2020-12-09 13:26:17'),
	('c4d258859969776cdaee5ff7ef48846ceed0f4b41064770aafd1cc6c17985b0c9521ef32e3c2bbb8', 2, 2, 'Token Name', '[]', 1, '2019-12-09 13:04:44', '2019-12-09 13:04:44', '2020-12-09 13:04:44'),
	('ca2a34a1caea768840e3c39314a0828711cd9006c6b06903344f527c74c8e9a9f331d0e7b42f8c89', 2, 2, 'Token Name', '[]', 1, '2019-12-09 13:01:03', '2019-12-09 13:01:03', '2020-12-09 13:01:03'),
	('cc6483fd289246eeb3b0191e56848de499c5fbe8d0c6f81a8cd650efcb72bdbc204ad01d2a09d896', 2, 2, 'Token Name', '[]', 1, '2019-12-08 13:28:28', '2019-12-08 13:28:28', '2020-12-08 13:28:28'),
	('d2e373b06febf33b7feca49ea6e3fe87f4bdfa77f463deea01058507b1ba78e353ba554b997c6f97', 2, 2, 'Token Name', '[]', 1, '2019-12-09 13:23:03', '2019-12-09 13:23:03', '2020-12-09 13:23:03'),
	('d4e0852b764b38bee67ba2e5b07a9f3bc3c306795e4724fb7e4f728441ba782f452ea76651b7cadc', 2, 2, 'Token Name', '[]', 1, '2019-12-09 13:22:03', '2019-12-09 13:22:03', '2020-12-09 13:22:03'),
	('d8f812087f5d6a767223bc1dc2fc5a63f107c7d4e8a5bee6351538cd2a6bcdfc0cebe7936c1d20a2', 2, 2, 'Token Name', '[]', 1, '2019-12-09 13:04:51', '2019-12-09 13:04:51', '2020-12-09 13:04:51'),
	('ddecbec9287a278f5b35fff6b19d8433684caec147e9c68d8570538be77d54651f3501fe720bfa55', 2, 2, 'Token Name', '[]', 1, '2019-12-09 12:51:29', '2019-12-09 12:51:29', '2020-12-09 12:51:29'),
	('de28eec19b38ad1e83ca12458d24a5d5b9fdc5ce506d6d00a878747a353436b65abcb143e5420e5a', 2, 2, 'Token Name', '[]', 0, '2019-12-07 20:42:46', '2019-12-07 20:42:46', '2020-12-07 20:42:46'),
	('dea916fa1b9e7a30c01a84f08d743cb631bb4b9c6578a1e126463914438d1db56fce234094616a27', 2, 2, 'Token Name', '[]', 1, '2019-12-09 12:59:07', '2019-12-09 12:59:07', '2020-12-09 12:59:07'),
	('e2bf563d4acfdcb450f4bd3284679c2c61f0fa59024764016e96a5f051daa0db3f1278ffd02f34da', 2, 2, 'Token Name', '[]', 1, '2019-12-09 12:53:13', '2019-12-09 12:53:13', '2020-12-09 12:53:13'),
	('e5490c6460e8d0fc81058fafd0c36886760f03bec6625e4f650f062c18f0f1611cbfda47564fbd46', 2, 2, 'Token Name', '[]', 0, '2019-12-07 20:40:21', '2019-12-07 20:40:21', '2020-12-07 20:40:21'),
	('e5f8492c8d7c848d62126b5b5c4a1108460a341c6c62fceb27c8d7c817d9e267fb615329e43ad623', 2, 2, 'Token Name', '[]', 1, '2019-12-09 12:32:28', '2019-12-09 12:32:28', '2020-12-09 12:32:28'),
	('ea50ffb6508d65e051407705bcd6fff5b96f40a072e339fa97fac1afccc15649fffb5b2386f289c2', 2, 2, 'Token Name', '[]', 1, '2019-12-09 13:05:36', '2019-12-09 13:05:36', '2020-12-09 13:05:36'),
	('ec228c49131fa49bcfcb9c0cbd38adef15ace98c8110003467b818939c078d0e0976de9de6892ebb', 2, 2, 'Token Name', '[]', 1, '2019-12-09 13:04:38', '2019-12-09 13:04:38', '2020-12-09 13:04:38'),
	('ef2c344fe9c0cd2e653ce82ebfee98e7dc4776830d6cf28554ebbc8e411830abe4851a27a07aa106', 2, 2, 'Token Name', '[]', 1, '2019-12-09 13:21:00', '2019-12-09 13:21:00', '2020-12-09 13:21:00'),
	('f5737eb6baf88815600a406f3313bfb4e5e9310264696f9b643aa28ff42c42625b2e83b49145c4b3', 2, 2, 'Token Name', '[]', 1, '2019-12-09 13:23:25', '2019-12-09 13:23:25', '2020-12-09 13:23:25'),
	('f7d4fb999780ff00a09e38de0c2df85f02f1dbb292ffeebef9510696be020484b85ddfb5291288b4', 2, 2, 'Token Name', '[]', 1, '2019-12-09 13:22:31', '2019-12-09 13:22:31', '2020-12-09 13:22:31'),
	('fb7a917aeb09b3cbca0a481633ca7a081fe95b72ce4cb2f16f1d86cd58b721ba9a437d09d18f8d73', 2, 2, 'Token Name', '[]', 1, '2019-12-09 12:43:28', '2019-12-09 12:43:28', '2020-12-09 12:43:28'),
	('feaab3f8c26a1ad20f79590162e771e9ebe35f100803620c1d004bdf672da0fbe6f38378e4a28def', 2, 2, 'Token Name', '[]', 1, '2019-12-09 13:07:07', '2019-12-09 13:07:07', '2020-12-09 13:07:07');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.oauth_clients: ~2 rows (approximately)
/*!40000 ALTER TABLE `oauth_clients` DISABLE KEYS */;
INSERT INTO `oauth_clients` (`id`, `user_id`, `name`, `secret`, `redirect`, `personal_access_client`, `password_client`, `revoked`, `created_at`, `updated_at`) VALUES
	(2, NULL, 'Laravel Personal Access Client', '3ifOpdDKIvzzcRfIHJakMclRiOhAzj9B4zb98WCb', 'http://localhost', 1, 0, 0, '2019-11-30 19:11:34', '2019-11-30 19:11:34'),
	(3, NULL, 'Laravel Password Grant Client', '0pbp2WmsP5VkpcKmrlx2xhfDu5snRwpxVQNzutOD', 'http://localhost', 0, 1, 0, '2019-11-30 19:11:34', '2019-11-30 19:11:34');
/*!40000 ALTER TABLE `oauth_clients` ENABLE KEYS */;

-- Dumping structure for table 517_shop.oauth_personal_access_clients
CREATE TABLE IF NOT EXISTS `oauth_personal_access_clients` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `client_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_personal_access_clients_client_id_index` (`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.oauth_personal_access_clients: ~0 rows (approximately)
/*!40000 ALTER TABLE `oauth_personal_access_clients` DISABLE KEYS */;
INSERT INTO `oauth_personal_access_clients` (`id`, `client_id`, `created_at`, `updated_at`) VALUES
	(1, 2, '2019-11-30 19:11:34', '2019-11-30 19:11:34');
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
  CONSTRAINT `FK_order_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=780 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.order: ~373 rows (approximately)
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` (`id`, `user_id`, `increment_id`, `discount`, `post_cost`, `tax`, `pure_price`, `total_price`, `order_status`, `transport_status`, `delivery_status`, `items_status`, `created_at`, `updated_at`) VALUES
	(407, 1, 0, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1971-07-24 02:09:30', '1998-05-26 03:41:31'),
	(408, 1, 0, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1990-07-28 02:38:32', '1976-09-07 13:51:37'),
	(409, 1, 1, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1992-10-30 21:13:27', '1992-12-09 19:07:11'),
	(410, 1, 2, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1992-04-05 05:31:39', '2017-09-10 02:38:16'),
	(411, 1, 3, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2012-03-27 15:25:41', '1973-02-07 17:50:06'),
	(412, 1, 4, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2005-05-29 06:16:30', '1980-10-03 17:41:25'),
	(413, 1, 5, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1996-05-30 23:26:55', '1998-12-30 06:55:21'),
	(414, 1, 6, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2018-09-13 11:22:06', '2004-11-11 10:57:29'),
	(415, 1, 7, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1971-01-07 20:59:20', '2001-09-02 13:43:23'),
	(416, 1, 8, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1991-09-26 21:46:24', '1973-05-04 04:13:01'),
	(417, 1, 9, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1996-08-21 10:35:49', '1974-04-20 08:18:28'),
	(418, 1, 10, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1997-11-11 19:25:19', '2007-04-01 23:03:35'),
	(419, 1, 11, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1992-11-23 00:59:28', '1993-03-23 17:35:31'),
	(420, 1, 12, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2019-10-11 04:56:41', '1970-07-23 23:25:06'),
	(421, 1, 13, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1974-01-21 04:12:12', '2006-10-23 21:40:26'),
	(422, 1, 14, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2000-08-22 02:55:10', '1972-04-07 10:38:29'),
	(423, 1, 15, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2008-02-20 06:08:07', '1998-06-15 02:12:07'),
	(424, 1, 16, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1987-10-10 18:26:15', '2009-04-09 14:10:46'),
	(425, 1, 17, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2017-01-19 04:03:16', '2019-01-13 22:10:28'),
	(426, 1, 18, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2008-01-29 20:53:45', '1972-07-02 17:07:39'),
	(427, 1, 19, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1972-11-27 18:59:38', '2006-02-18 01:42:14'),
	(428, 1, 20, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1986-09-01 17:05:05', '2000-08-10 01:03:45'),
	(429, 1, 21, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1976-04-03 05:41:55', '1997-10-30 21:31:58'),
	(430, 1, 22, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1986-07-07 10:24:23', '1975-09-12 14:06:30'),
	(431, 1, 23, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2008-09-05 04:34:10', '2017-06-01 03:34:43'),
	(432, 1, 24, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2005-03-12 13:18:03', '1978-12-27 00:08:37'),
	(433, 1, 25, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2011-12-28 03:49:42', '1990-11-26 06:09:14'),
	(434, 1, 26, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1986-11-13 09:39:09', '1978-01-10 18:48:29'),
	(435, 1, 27, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1992-03-25 22:51:53', '1999-08-19 20:08:29'),
	(436, 1, 28, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2014-10-16 05:30:12', '2014-05-18 02:40:15'),
	(437, 1, 29, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2010-03-31 17:56:17', '1994-05-12 07:30:23'),
	(438, 1, 30, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1973-08-04 21:36:20', '1985-04-26 21:03:58'),
	(439, 1, 31, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2011-01-07 11:33:49', '1978-10-14 20:13:36'),
	(440, 1, 32, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1992-02-29 12:48:49', '1988-05-11 21:50:15'),
	(441, 1, 33, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1998-11-18 14:32:54', '1996-05-12 02:48:13'),
	(442, 1, 34, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1978-01-19 19:19:36', '2006-12-20 12:23:02'),
	(443, 1, 35, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2018-10-28 10:03:17', '2004-06-07 15:01:22'),
	(444, 1, 36, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1977-10-01 10:17:43', '1981-02-15 09:13:35'),
	(445, 1, 37, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2003-05-24 07:27:48', '1999-03-25 16:15:04'),
	(446, 1, 38, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2016-05-10 14:04:13', '1981-06-07 22:38:20'),
	(447, 1, 39, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2011-11-28 15:05:33', '1977-08-09 04:34:56'),
	(448, 1, 40, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1975-11-16 18:18:26', '1999-03-04 14:31:28'),
	(449, 1, 41, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2004-08-16 22:17:09', '1993-10-14 09:38:02'),
	(450, 1, 42, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1971-08-18 14:07:49', '1980-12-17 19:32:10'),
	(451, 1, 43, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1978-10-30 06:36:54', '2019-04-15 22:55:01'),
	(452, 1, 44, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1995-05-21 19:49:10', '2003-12-07 20:39:38'),
	(453, 1, 45, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1990-11-08 22:26:08', '2001-12-02 02:05:22'),
	(454, 1, 46, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1994-02-12 10:55:15', '2012-06-10 18:47:55'),
	(455, 1, 47, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1988-08-14 13:12:58', '2014-02-04 11:37:16'),
	(456, 1, 48, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1990-05-20 20:03:21', '2016-10-09 07:03:24'),
	(457, 1, 49, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1973-05-01 03:50:09', '1979-08-11 21:26:46'),
	(458, 1, 50, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1984-11-03 15:07:55', '1978-04-23 17:21:03'),
	(459, 1, 51, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2019-10-13 18:28:37', '1971-02-03 15:13:38'),
	(460, 1, 52, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1983-08-23 16:31:08', '1988-04-22 13:17:24'),
	(461, 1, 53, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1983-06-14 02:15:45', '1994-09-09 12:14:38'),
	(462, 1, 54, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1978-04-05 01:59:00', '1998-06-19 18:28:24'),
	(463, 1, 55, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1972-03-19 14:21:09', '2008-06-08 05:15:26'),
	(464, 1, 56, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2004-09-08 23:01:52', '1990-02-05 20:47:45'),
	(465, 1, 57, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2012-04-06 09:28:11', '2019-07-12 21:49:50'),
	(466, 1, 58, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1982-10-19 01:56:39', '2005-12-06 17:16:46'),
	(467, 1, 59, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2004-06-08 23:04:03', '2005-04-11 19:58:48'),
	(468, 1, 60, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1995-01-05 13:34:26', '1995-09-05 18:34:41'),
	(469, 1, 61, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1995-05-23 07:27:51', '2018-08-26 16:51:36'),
	(470, 1, 62, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1992-01-15 23:55:08', '2001-05-30 11:25:47'),
	(471, 1, 63, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2003-03-10 11:43:34', '2005-05-25 02:18:18'),
	(472, 1, 64, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1990-02-26 04:30:13', '2007-07-25 07:06:27'),
	(473, 1, 65, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1970-08-03 22:16:11', '2012-04-03 20:27:30'),
	(474, 1, 66, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2014-08-02 10:58:03', '1978-11-01 06:38:44'),
	(475, 1, 67, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1992-11-02 07:01:28', '1975-08-28 13:46:23'),
	(476, 1, 68, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2019-05-20 18:49:23', '2015-12-15 14:36:10'),
	(477, 1, 69, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1991-11-23 06:04:30', '1995-01-19 14:37:07'),
	(478, 1, 70, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2014-06-07 21:12:33', '2016-07-24 22:49:26'),
	(479, 1, 71, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1990-01-24 01:33:03', '1987-06-21 17:28:26'),
	(480, 1, 72, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1971-03-02 17:28:49', '1976-04-03 12:12:57'),
	(481, 1, 73, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1970-06-04 18:19:18', '1973-12-18 05:16:27'),
	(482, 1, 74, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2009-01-12 10:31:46', '1994-02-10 14:05:41'),
	(483, 1, 75, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2012-12-11 10:02:29', '2013-09-11 20:46:22'),
	(484, 1, 76, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2003-02-12 04:04:00', '1973-08-25 09:51:11'),
	(485, 1, 77, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1988-09-23 01:49:37', '1994-04-30 19:40:42'),
	(486, 1, 78, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1979-04-04 00:08:23', '1991-01-18 07:38:51'),
	(487, 1, 79, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1982-01-02 20:47:53', '1978-02-26 21:25:59'),
	(488, 1, 80, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1994-09-29 07:07:13', '2014-07-24 00:36:49'),
	(489, 1, 81, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2013-05-02 22:56:59', '1981-09-25 23:24:01'),
	(490, 1, 82, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1994-11-28 10:27:44', '2011-03-21 21:43:04'),
	(491, 1, 83, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1991-08-26 22:34:52', '1975-09-05 09:34:44'),
	(492, 1, 84, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1998-04-22 20:14:55', '2004-07-21 18:39:59'),
	(493, 1, 85, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1988-04-15 19:18:11', '1981-03-08 17:36:50'),
	(494, 1, 86, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2012-07-12 06:20:42', '1989-10-04 10:42:18'),
	(495, 1, 87, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1974-01-29 11:11:12', '1975-01-11 00:41:29'),
	(496, 1, 88, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1977-01-06 03:01:08', '1986-08-02 00:29:29'),
	(497, 1, 89, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1992-04-10 06:33:52', '1994-02-26 19:43:47'),
	(498, 1, 90, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1989-03-30 02:36:07', '1995-05-21 17:43:12'),
	(499, 1, 91, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1972-03-24 23:02:03', '2012-12-07 20:28:23'),
	(500, 1, 92, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2016-10-25 17:27:54', '1990-12-15 18:42:00'),
	(501, 1, 93, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1979-04-14 10:21:52', '2001-05-11 01:03:41'),
	(502, 1, 94, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2015-01-19 21:57:43', '1978-09-19 00:44:57'),
	(503, 1, 95, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2012-06-18 11:46:52', '1989-06-02 11:27:23'),
	(504, 1, 96, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2018-12-15 22:08:50', '2019-05-12 05:44:59'),
	(505, 1, 97, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1972-10-10 14:02:33', '2008-10-17 11:32:37'),
	(506, 1, 98, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2015-01-14 19:32:23', '1979-05-26 05:22:23'),
	(507, 1, 99, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1978-10-18 21:02:46', '2011-01-19 09:58:12'),
	(508, 1, 100, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1980-03-28 17:40:09', '2015-06-11 04:42:10'),
	(509, 1, 101, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2015-09-30 23:20:52', '2012-08-31 03:17:08'),
	(510, 1, 102, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1984-05-08 14:17:16', '2001-10-19 07:25:48'),
	(511, 1, 103, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1993-07-13 16:47:12', '1983-03-09 07:11:49'),
	(512, 1, 104, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2013-10-05 16:56:29', '2001-02-22 02:12:05'),
	(513, 1, 105, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1980-04-29 02:39:34', '1996-09-17 00:50:13'),
	(514, 1, 106, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1983-11-14 04:28:56', '1982-10-24 01:29:07'),
	(515, 1, 107, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1983-04-01 18:40:59', '1971-06-01 02:21:31'),
	(516, 1, 108, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2017-08-12 07:25:59', '1988-05-21 10:33:18'),
	(517, 1, 109, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1980-04-25 01:29:23', '2011-10-11 17:45:07'),
	(518, 1, 110, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1996-11-25 12:45:01', '1982-09-09 16:12:07'),
	(519, 1, 111, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1978-04-11 01:21:50', '1993-04-17 16:11:10'),
	(520, 1, 112, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2008-06-01 02:04:50', '1985-01-16 15:23:46'),
	(521, 1, 113, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2004-02-21 00:13:52', '1998-06-01 22:44:56'),
	(522, 1, 114, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1970-01-03 13:05:59', '2006-02-01 09:34:15'),
	(523, 1, 115, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2004-12-25 16:42:28', '1975-12-11 04:21:51'),
	(524, 1, 116, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2014-04-27 14:43:02', '2001-01-30 11:55:30'),
	(525, 1, 117, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1990-12-21 06:37:51', '1986-10-19 05:55:37'),
	(526, 1, 118, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1984-10-24 13:26:33', '2015-10-24 02:00:52'),
	(527, 1, 119, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1994-07-26 13:19:46', '2012-11-13 12:51:26'),
	(528, 1, 120, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1977-11-30 14:23:24', '2007-03-24 00:58:41'),
	(529, 1, 121, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2002-11-22 23:59:24', '1972-08-12 10:42:10'),
	(530, 1, 122, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1970-05-01 11:42:53', '2004-01-27 01:36:54'),
	(531, 1, 123, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1996-09-19 12:01:18', '1971-02-10 00:35:53'),
	(532, 1, 124, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2003-11-04 09:23:09', '2019-01-04 06:06:00'),
	(533, 1, 125, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1992-07-15 13:40:04', '1988-06-29 04:21:46'),
	(534, 1, 126, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2011-02-11 23:52:26', '1998-08-28 00:53:34'),
	(535, 1, 127, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1973-02-16 18:57:29', '1998-06-05 19:25:07'),
	(536, 1, 128, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1986-02-02 23:20:47', '1992-12-31 09:19:19'),
	(537, 1, 129, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2002-08-01 00:26:12', '2012-04-20 19:12:56'),
	(538, 1, 130, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1999-09-02 02:26:52', '2004-10-15 18:08:50'),
	(539, 1, 131, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1993-12-08 02:25:17', '2003-03-02 16:40:12'),
	(540, 1, 132, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2019-01-30 03:37:09', '1994-06-23 08:08:08'),
	(541, 1, 133, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1994-01-03 12:07:17', '1994-01-31 13:38:05'),
	(542, 1, 134, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2018-08-21 15:35:30', '1979-08-26 14:23:50'),
	(543, 1, 135, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2014-03-03 16:33:42', '2000-07-06 08:58:51'),
	(544, 1, 136, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1985-01-05 23:19:25', '2014-08-15 11:12:21'),
	(545, 1, 137, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1976-05-09 11:33:39', '2012-07-11 12:21:48'),
	(546, 1, 138, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1984-05-12 04:27:15', '1984-10-14 06:13:44'),
	(547, 1, 139, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1972-01-05 18:19:55', '1970-01-20 06:56:35'),
	(548, 1, 140, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1996-09-26 14:36:19', '1995-06-06 13:46:56'),
	(549, 1, 141, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1972-10-16 12:44:50', '1988-04-07 06:45:03'),
	(550, 1, 142, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1979-11-18 04:27:41', '2012-01-22 11:32:40'),
	(551, 1, 143, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2013-05-16 09:07:40', '2000-05-26 02:17:58'),
	(552, 1, 144, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1982-12-03 21:57:09', '2002-10-05 01:59:08'),
	(553, 1, 145, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1977-05-02 03:31:25', '1997-05-31 23:49:43'),
	(554, 1, 146, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1987-11-30 04:07:38', '1971-08-07 21:14:01'),
	(555, 1, 147, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1994-01-09 19:16:38', '1979-11-27 04:02:42'),
	(556, 1, 148, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1987-07-06 23:04:36', '2000-03-14 08:20:35'),
	(557, 1, 149, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1982-02-08 22:50:17', '2016-03-06 00:39:13'),
	(558, 1, 150, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1972-10-26 11:26:29', '2006-03-28 20:08:45'),
	(559, 1, 151, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1979-12-09 03:47:01', '2001-02-05 14:28:49'),
	(560, 1, 152, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2005-04-28 15:56:36', '1991-06-03 12:01:34'),
	(561, 1, 153, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1974-11-09 06:31:58', '2019-02-24 15:59:55'),
	(562, 1, 154, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1989-01-10 08:25:35', '1993-05-26 20:40:58'),
	(563, 1, 155, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1995-08-26 15:31:35', '2010-03-06 21:22:07'),
	(564, 1, 156, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2013-09-08 04:48:57', '1997-02-06 05:53:52'),
	(565, 1, 157, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1979-12-16 13:11:24', '1970-09-25 10:57:46'),
	(566, 1, 158, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1999-02-05 20:28:00', '2004-12-22 12:43:40'),
	(567, 1, 159, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1987-10-06 10:22:34', '1980-06-10 10:37:56'),
	(568, 1, 160, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2010-10-17 18:30:26', '2010-09-03 16:41:35'),
	(569, 1, 161, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2010-05-15 08:34:41', '2003-02-13 14:13:01'),
	(570, 1, 162, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1979-04-25 08:28:33', '1973-01-03 21:35:47'),
	(571, 1, 163, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2006-05-10 04:56:23', '1976-12-03 19:28:53'),
	(572, 1, 164, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2007-12-25 19:05:30', '2008-11-16 03:39:03'),
	(573, 1, 165, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1995-07-11 19:03:35', '2004-04-29 23:34:49'),
	(574, 1, 166, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2015-06-13 09:44:19', '1980-05-30 20:56:06'),
	(575, 1, 167, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1988-04-01 10:46:57', '2003-12-29 03:58:04'),
	(576, 1, 168, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1988-06-04 14:16:13', '1987-02-19 21:57:09'),
	(577, 1, 169, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2003-10-18 15:24:15', '1998-02-10 22:56:27'),
	(578, 1, 170, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2015-02-16 14:20:28', '2019-06-01 07:54:57'),
	(579, 1, 171, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2014-10-17 19:49:08', '1998-09-19 14:13:25'),
	(580, 1, 172, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2017-02-10 12:02:45', '1987-08-27 22:11:05'),
	(581, 1, 173, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1975-07-11 10:15:27', '2002-03-12 04:30:56'),
	(582, 1, 174, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2016-04-20 08:48:07', '2013-08-19 12:27:55'),
	(583, 1, 175, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1987-09-05 06:07:47', '1993-12-10 15:47:32'),
	(584, 1, 176, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2012-05-22 15:11:42', '1989-08-01 09:22:01'),
	(585, 1, 177, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2012-08-16 02:09:05', '1983-11-01 13:34:39'),
	(586, 1, 178, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2015-06-03 01:32:50', '1987-12-22 04:24:16'),
	(587, 1, 179, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2008-05-11 02:55:04', '1984-02-14 01:38:47'),
	(588, 1, 180, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1976-05-20 16:29:22', '1992-12-08 12:06:45'),
	(589, 1, 181, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1989-07-31 06:10:34', '1987-09-12 16:22:39'),
	(590, 1, 182, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1997-10-05 17:30:50', '1990-08-17 06:34:55'),
	(591, 1, 183, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1989-01-08 18:53:59', '2017-02-05 06:14:33'),
	(592, 1, 184, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1972-01-05 19:28:55', '2001-04-06 01:10:19'),
	(593, 1, 185, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1981-02-18 07:10:30', '2018-09-17 04:42:05'),
	(594, 1, 186, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1974-06-27 00:01:54', '2016-05-10 09:49:47'),
	(595, 1, 187, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1999-12-11 14:58:56', '1997-01-07 23:56:23'),
	(596, 1, 188, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1982-08-15 23:34:19', '1971-06-07 18:46:25'),
	(597, 1, 189, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2001-02-27 18:40:25', '2018-10-11 11:44:13'),
	(598, 1, 190, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2009-03-22 08:41:28', '2016-11-08 22:19:42'),
	(599, 1, 191, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1981-09-24 15:28:46', '1990-11-12 23:27:30'),
	(600, 1, 192, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1982-05-31 07:40:49', '2013-02-18 10:06:20'),
	(601, 1, 193, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1979-04-09 10:35:21', '1980-07-24 23:38:14'),
	(602, 1, 194, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1980-06-14 09:22:57', '1973-05-29 21:22:10'),
	(603, 1, 195, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1979-08-10 12:28:17', '2014-02-19 10:23:18'),
	(604, 1, 196, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1999-10-10 10:20:51', '2011-07-22 08:21:12'),
	(605, 1, 197, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1984-11-29 22:05:47', '1978-09-26 23:44:58'),
	(606, 1, 198, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1991-11-18 19:07:59', '1999-06-07 05:58:13'),
	(607, 1, 199, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1983-06-30 12:33:00', '1998-11-23 18:58:54'),
	(608, 1, 200, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1974-12-17 02:09:49', '2007-11-27 09:34:18'),
	(609, 1, 201, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1993-01-17 02:22:56', '1990-09-05 00:28:41'),
	(610, 1, 202, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2005-08-20 18:02:41', '1998-05-26 15:18:45'),
	(611, 1, 203, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2005-04-25 11:29:08', '1987-01-19 02:33:52'),
	(612, 1, 204, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1988-11-02 01:39:54', '1984-12-31 00:39:39'),
	(613, 1, 205, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2005-10-01 23:59:52', '1992-12-25 07:58:45'),
	(614, 1, 206, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1987-06-22 08:40:36', '1992-01-13 03:41:51'),
	(615, 1, 207, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2018-08-31 04:23:48', '1987-03-25 06:51:56'),
	(616, 1, 208, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1976-10-15 15:03:52', '1973-08-22 00:39:06'),
	(617, 1, 209, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2005-12-09 05:59:39', '2002-11-08 09:02:22'),
	(618, 1, 210, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1999-02-04 05:39:24', '1984-01-02 23:14:31'),
	(619, 1, 211, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2011-02-27 09:27:12', '1995-09-20 03:11:10'),
	(620, 1, 212, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1987-11-12 23:24:32', '1997-12-19 12:43:02'),
	(621, 1, 213, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1976-06-10 09:16:46', '2004-11-05 23:28:55'),
	(622, 1, 214, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1972-08-29 18:15:21', '1990-03-04 10:04:56'),
	(623, 1, 215, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1972-03-30 14:05:55', '2012-12-28 22:37:12'),
	(624, 1, 216, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2012-10-12 02:23:35', '2005-12-26 14:41:08'),
	(625, 1, 217, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1983-12-26 22:41:40', '1991-10-26 02:09:51'),
	(626, 1, 218, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2015-10-25 13:26:59', '1982-07-04 22:16:35'),
	(627, 1, 219, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2011-09-01 00:47:59', '2014-06-23 14:48:20'),
	(628, 1, 220, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1994-09-05 22:18:36', '2000-02-01 03:21:33'),
	(629, 1, 221, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2012-04-18 23:22:25', '2001-12-28 02:10:24'),
	(630, 1, 222, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2013-06-08 12:26:44', '2000-05-04 01:58:00'),
	(631, 1, 223, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2007-02-28 12:08:37', '1973-06-17 16:37:13'),
	(632, 1, 224, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1985-12-05 16:12:37', '2002-09-06 04:14:52'),
	(633, 1, 225, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2008-02-12 21:55:07', '1995-12-18 12:31:54'),
	(634, 1, 226, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1976-09-20 12:39:13', '2017-03-24 10:11:37'),
	(635, 1, 227, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1977-12-01 00:59:16', '1978-03-26 07:59:12'),
	(636, 1, 228, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2010-10-19 19:20:01', '1999-06-13 09:52:05'),
	(637, 1, 229, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2014-06-03 16:42:38', '2002-07-09 01:13:17'),
	(638, 1, 230, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1983-04-29 08:06:21', '1991-12-13 10:57:30'),
	(639, 1, 231, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2003-02-15 16:54:50', '1976-05-21 17:13:33'),
	(640, 1, 232, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2010-12-23 15:48:42', '1980-05-01 07:18:34'),
	(641, 1, 233, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2010-10-03 15:33:58', '2005-04-20 21:04:09'),
	(642, 1, 234, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1992-02-08 03:20:11', '1994-09-27 22:39:51'),
	(643, 1, 235, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1991-09-29 13:55:09', '2004-10-25 21:02:00'),
	(644, 1, 236, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2002-12-04 19:39:53', '2010-03-29 01:23:36'),
	(645, 1, 237, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1994-11-17 11:55:28', '1993-01-28 08:55:34'),
	(646, 1, 238, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1982-12-17 03:15:47', '2005-08-13 02:18:53'),
	(647, 1, 239, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1998-03-25 15:59:38', '1988-03-01 08:42:28'),
	(648, 1, 240, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1991-09-01 19:13:51', '1986-02-27 06:28:51'),
	(649, 1, 241, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1980-10-15 06:50:51', '1988-06-11 20:55:34'),
	(650, 1, 242, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1989-09-27 07:20:48', '1999-11-24 20:43:19'),
	(651, 1, 243, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2007-06-01 05:04:04', '2008-05-22 13:11:52'),
	(652, 1, 244, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2012-10-20 05:53:23', '1989-07-14 22:42:50'),
	(653, 1, 245, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1999-10-19 08:47:36', '1975-01-21 14:22:40'),
	(654, 1, 246, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1993-01-29 13:13:51', '1977-04-19 01:17:55'),
	(655, 1, 247, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1997-04-20 01:18:27', '2016-04-17 05:24:51'),
	(656, 1, 248, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1988-10-01 04:07:51', '1994-06-23 19:57:39'),
	(657, 1, 249, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1979-09-17 23:24:25', '2011-06-13 13:56:18'),
	(658, 1, 250, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2009-12-12 14:12:38', '1988-11-25 09:32:09'),
	(659, 1, 251, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2001-02-11 16:50:43', '2004-07-03 19:24:15'),
	(660, 1, 252, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1996-08-26 15:23:12', '2013-05-30 06:02:04'),
	(661, 1, 253, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1974-06-29 20:47:46', '1995-12-29 13:51:31'),
	(662, 1, 254, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1974-03-12 06:32:04', '2003-11-27 12:44:53'),
	(663, 1, 255, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1970-01-29 18:49:09', '2006-08-13 23:52:32'),
	(664, 1, 256, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1986-05-16 11:55:03', '1999-07-10 06:04:07'),
	(665, 1, 257, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2017-02-21 03:31:14', '1975-01-13 21:41:53'),
	(666, 1, 258, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1972-09-02 09:22:33', '1986-02-25 00:35:35'),
	(667, 1, 259, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1998-02-05 17:40:34', '1970-11-14 03:55:00'),
	(668, 1, 260, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2011-12-24 05:11:47', '1974-06-10 14:25:32'),
	(669, 1, 261, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1992-08-31 13:17:27', '2014-06-10 11:37:34'),
	(670, 1, 262, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2006-12-16 07:44:15', '1997-07-17 22:39:13'),
	(671, 1, 263, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1994-06-06 19:15:29', '1992-11-27 05:25:44'),
	(672, 1, 264, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1986-09-19 23:21:08', '2018-01-15 03:49:27'),
	(673, 1, 265, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1992-01-28 14:04:03', '1999-02-03 01:21:52'),
	(674, 1, 266, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1978-11-07 12:06:04', '1971-05-11 02:27:29'),
	(675, 1, 267, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1975-08-23 17:27:19', '2002-08-15 23:25:44'),
	(676, 1, 268, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1974-03-22 16:15:19', '1996-07-09 16:30:58'),
	(677, 1, 269, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1997-10-07 09:15:47', '1996-07-01 20:08:54'),
	(678, 1, 270, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1976-09-28 23:00:03', '2015-07-31 07:04:32'),
	(679, 1, 271, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1996-03-18 05:55:16', '1970-01-19 08:05:19'),
	(680, 1, 272, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1982-11-18 13:42:13', '2017-08-08 16:50:38'),
	(681, 1, 273, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1997-10-06 06:22:55', '2005-09-22 11:02:50'),
	(682, 1, 274, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1997-10-18 11:29:04', '1977-12-25 04:04:50'),
	(683, 1, 275, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2005-11-05 05:16:48', '1973-04-07 15:51:42'),
	(684, 1, 276, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2002-12-31 01:09:45', '1999-07-04 03:34:35'),
	(685, 1, 277, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1970-09-17 12:51:30', '2009-04-19 03:53:38'),
	(686, 1, 278, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1988-02-05 13:48:46', '1997-12-24 20:54:03'),
	(687, 1, 279, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1992-03-04 19:34:38', '1988-05-01 16:56:12'),
	(688, 1, 280, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2016-11-27 02:09:41', '2013-01-22 22:06:56'),
	(689, 1, 281, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2016-07-04 08:05:15', '1974-12-26 08:26:37'),
	(690, 1, 282, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2012-11-04 21:14:03', '1999-08-25 18:46:02'),
	(691, 1, 283, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1974-10-19 19:28:03', '1986-10-24 09:04:13'),
	(692, 1, 284, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2015-02-19 16:35:30', '2009-04-25 13:18:30'),
	(693, 1, 285, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1974-03-13 13:02:40', '2017-02-15 19:41:01'),
	(694, 1, 286, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1974-11-24 18:11:40', '2017-06-04 13:37:36'),
	(695, 1, 287, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1983-04-29 13:01:25', '2005-02-26 02:17:57'),
	(696, 1, 288, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2018-10-12 11:21:21', '2000-10-06 01:46:15'),
	(697, 1, 289, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2003-08-18 15:01:51', '2008-03-15 11:10:46'),
	(698, 1, 290, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1988-01-15 12:59:17', '2012-01-15 16:30:37'),
	(699, 1, 291, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1978-08-05 14:58:27', '2012-12-13 05:18:04'),
	(700, 1, 292, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1974-04-10 21:09:07', '1981-02-27 17:24:46'),
	(701, 1, 293, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1977-06-10 11:11:39', '1981-08-01 05:52:35'),
	(702, 1, 294, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2010-10-09 19:32:16', '1992-09-02 11:26:43'),
	(703, 1, 295, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1971-05-14 20:25:49', '1977-05-17 10:06:22'),
	(704, 1, 296, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1982-02-19 01:12:52', '2009-08-16 08:19:20'),
	(705, 1, 297, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1979-12-14 18:15:17', '1998-03-04 22:09:07'),
	(706, 1, 298, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1999-10-13 18:23:58', '1978-06-29 21:12:28'),
	(707, 1, 299, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2016-12-21 07:20:33', '1980-03-26 06:55:02'),
	(708, 1, 300, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2018-06-16 14:45:24', '1970-09-11 00:51:40'),
	(709, 1, 301, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1977-11-04 17:00:56', '1995-08-02 09:17:01'),
	(710, 1, 302, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1993-07-07 21:53:11', '1972-08-26 12:31:59'),
	(711, 1, 303, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1975-11-06 05:40:18', '1998-04-28 06:01:19'),
	(712, 1, 304, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2010-12-08 05:31:50', '1985-03-01 15:22:13'),
	(713, 1, 305, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2011-01-10 17:13:54', '1980-01-02 19:23:23'),
	(714, 1, 306, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2004-06-14 05:34:51', '2006-04-28 21:15:01'),
	(715, 1, 307, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2012-08-29 14:22:26', '1985-11-11 01:31:49'),
	(716, 1, 308, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2000-09-07 19:52:25', '1980-07-05 14:05:28'),
	(717, 1, 309, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1987-09-28 14:21:01', '1982-07-10 16:40:51'),
	(718, 1, 310, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1993-05-29 14:35:22', '2006-11-15 15:51:14'),
	(719, 1, 311, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1994-02-17 00:58:07', '1976-02-04 02:06:18'),
	(720, 1, 312, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1970-07-06 03:44:43', '2004-08-22 03:55:36'),
	(721, 1, 313, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1981-05-27 02:55:59', '2004-04-28 17:15:33'),
	(722, 1, 314, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1989-02-11 23:25:17', '1978-02-07 17:30:06'),
	(723, 1, 315, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2010-03-30 11:14:32', '1976-05-23 13:58:41'),
	(724, 1, 316, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2012-09-01 23:32:01', '1990-06-18 16:23:17'),
	(725, 1, 317, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1978-08-04 14:23:31', '1996-09-02 19:27:47'),
	(726, 1, 318, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2018-04-22 05:28:42', '2011-05-12 23:51:45'),
	(727, 1, 319, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2017-10-08 12:41:20', '2001-10-08 21:26:22'),
	(728, 1, 320, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2012-11-16 18:27:17', '1977-09-29 11:08:32'),
	(729, 1, 321, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1996-02-26 17:12:56', '1990-06-30 07:36:17'),
	(730, 1, 322, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2010-04-13 09:08:48', '1973-08-07 08:42:25'),
	(731, 1, 323, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1992-02-20 12:43:48', '1987-11-17 12:28:05'),
	(732, 1, 324, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2008-05-19 00:17:12', '1992-10-12 15:22:37'),
	(733, 1, 325, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2011-11-27 22:43:54', '2015-03-19 13:51:46'),
	(734, 1, 326, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2000-12-23 18:21:12', '2002-05-31 23:30:10'),
	(735, 1, 327, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1997-12-06 04:07:22', '2005-02-14 19:04:52'),
	(736, 1, 328, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2003-08-15 08:33:28', '2003-12-04 22:49:49'),
	(737, 1, 329, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1975-09-03 20:58:03', '2011-10-19 17:32:13'),
	(738, 1, 330, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1976-09-21 19:59:03', '1998-07-02 19:06:40'),
	(739, 1, 331, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2007-02-04 05:10:37', '1993-12-23 18:55:18'),
	(740, 1, 332, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1985-08-08 02:42:04', '2005-11-30 07:53:19'),
	(741, 1, 333, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1996-08-21 05:33:47', '1988-06-07 03:43:51'),
	(742, 1, 334, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1977-01-24 10:14:55', '2019-03-07 18:57:54'),
	(743, 1, 335, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2017-01-04 11:05:17', '1974-11-11 09:52:05'),
	(744, 1, 336, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2018-10-27 09:10:45', '1997-09-08 03:11:34'),
	(745, 1, 337, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1980-04-12 02:03:44', '1971-09-05 09:20:56'),
	(746, 1, 338, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2017-11-12 03:39:36', '1988-07-21 13:12:13'),
	(747, 1, 339, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1986-02-22 08:40:54', '2000-10-29 07:58:32'),
	(748, 1, 340, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1985-04-09 03:33:45', '1977-07-20 12:54:12'),
	(749, 1, 341, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1976-09-20 14:43:03', '1982-03-17 05:33:00'),
	(750, 1, 342, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1991-11-25 07:31:51', '1971-02-24 20:42:01'),
	(751, 1, 343, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1996-01-15 07:00:02', '2009-10-04 17:05:03'),
	(752, 1, 344, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1998-01-09 22:31:20', '1972-03-01 05:49:41'),
	(753, 1, 345, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1982-10-17 07:21:57', '1993-11-27 22:41:05'),
	(754, 1, 346, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1980-12-09 12:13:27', '1983-07-30 12:12:15'),
	(755, 1, 347, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2002-05-13 20:23:12', '1974-03-22 01:12:03'),
	(756, 1, 348, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1973-09-12 04:56:12', '1991-12-21 01:49:17'),
	(757, 1, 349, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1979-07-23 03:03:22', '1991-03-05 07:12:20'),
	(758, 1, 350, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1992-08-04 02:01:38', '2003-02-04 20:18:21'),
	(759, 1, 351, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2004-10-15 15:43:49', '1986-02-07 09:07:46'),
	(760, 1, 352, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2000-12-17 15:25:13', '1974-02-02 12:51:17'),
	(761, 1, 353, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1976-03-07 07:30:12', '2019-04-27 23:58:28'),
	(762, 1, 354, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2006-01-22 01:30:56', '1971-02-07 22:03:43'),
	(763, 1, 355, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2018-11-30 16:23:41', '2005-05-23 01:24:32'),
	(764, 1, 356, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1999-08-15 20:02:53', '2016-07-14 06:29:49'),
	(765, 1, 357, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1973-01-05 11:24:56', '2013-07-22 15:47:01'),
	(766, 1, 358, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2010-02-05 10:03:19', '1971-08-01 18:37:10'),
	(767, 1, 359, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2019-06-05 02:35:48', '1997-04-07 01:41:30'),
	(768, 1, 360, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2017-11-21 07:03:25', '1992-12-26 10:36:51'),
	(769, 1, 361, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1997-05-11 06:17:06', '1978-02-06 16:03:41'),
	(770, 1, 362, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1979-07-29 16:28:35', '1979-10-19 04:50:29'),
	(771, 1, 363, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2006-02-11 05:53:48', '2009-11-02 16:47:11'),
	(772, 1, 364, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1998-12-24 23:31:01', '2005-10-04 13:00:02'),
	(773, 1, 365, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1970-04-25 20:42:08', '1990-10-15 04:51:37'),
	(774, 1, 366, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2013-12-25 00:38:26', '1998-12-21 01:35:08'),
	(775, 1, 367, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1971-07-04 16:00:58', '2019-10-13 20:09:27'),
	(776, 1, 368, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '2013-04-20 22:10:16', '2003-01-17 01:57:57'),
	(777, 1, 369, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1995-05-04 06:48:28', '2009-03-27 14:27:04'),
	(778, 1, 370, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 0, 0, 0, '1974-12-20 13:32:41', '2006-06-25 12:22:01'),
	(779, 1, 371, 0.00, 10000.00, 0.00, 340000.00, 350000.00, 1, 1, 1, 0, '2001-11-13 13:02:04', '2019-11-29 19:12:45');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;

-- Dumping structure for table 517_shop.order_fractive_request
CREATE TABLE IF NOT EXISTS `order_fractive_request` (
  `order_id` bigint(20) unsigned NOT NULL,
  `product_pins` longtext COLLATE utf8_unicode_ci NOT NULL,
  `document` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `type` tinyint(1) NOT NULL DEFAULT 0,
  `post_barcode` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `order_weight` float DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`order_id`),
  CONSTRAINT `FK_order_request__order` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='این جدول درخواست اپراتور به انباردار برای مشخص کردن کسری و یا معیوبی است.کلمه اخر نام جدول ترکیب کسری و معیوبی است.';

-- Dumping data for table 517_shop.order_fractive_request: ~0 rows (approximately)
/*!40000 ALTER TABLE `order_fractive_request` DISABLE KEYS */;
INSERT INTO `order_fractive_request` (`order_id`, `product_pins`, `document`, `status`, `type`, `post_barcode`, `order_weight`, `created_at`, `updated_at`) VALUES
	(779, '{\n  "data" : "x"\n}', NULL, 1, 1, NULL, NULL, '2019-11-29 19:13:01', '2019-11-29 23:50:33');
/*!40000 ALTER TABLE `order_fractive_request` ENABLE KEYS */;

-- Dumping structure for table 517_shop.order_in_anbar
CREATE TABLE IF NOT EXISTS `order_in_anbar` (
  `order_id` bigint(20) unsigned NOT NULL,
  `anbar_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `FK_order_in_anbar_anbar` (`anbar_id`),
  CONSTRAINT `FK_order_in_anbar_anbar` FOREIGN KEY (`anbar_id`) REFERENCES `anbar` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_order_in_anbar_order` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.order_in_anbar: ~0 rows (approximately)
/*!40000 ALTER TABLE `order_in_anbar` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_in_anbar` ENABLE KEYS */;

-- Dumping structure for table 517_shop.order_post_info
CREATE TABLE IF NOT EXISTS `order_post_info` (
  `order_id` bigint(20) unsigned NOT NULL,
  `region_id` bigint(20) unsigned NOT NULL,
  `full_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `national_code` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `mobile` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `postal_code` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `FK_order_post_info_region` (`region_id`),
  CONSTRAINT `FK_order_post_info_order` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_order_post_info_region` FOREIGN KEY (`region_id`) REFERENCES `region` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.order_post_info: ~372 rows (approximately)
/*!40000 ALTER TABLE `order_post_info` DISABLE KEYS */;
INSERT INTO `order_post_info` (`order_id`, `region_id`, `full_name`, `national_code`, `mobile`, `phone`, `postal_code`, `address`, `created_at`, `updated_at`) VALUES
	(408, 1, 'آرمین نجفی', '14973974763', '02691378556', '02606270344', '6122887472', 'آذربایجان شرقی خیابان تبریزی ساختمان قدسی', NULL, NULL),
	(409, 1, 'آصفه خسروپناه', '96335099694', '02169496342', '02111737861', '5799033365', 'خراسان جنوبی خیابان مهاجرانی ساختمان نصیح پلاک 73 کد پستی 2301058491', NULL, NULL),
	(410, 1, 'مهدخت ملکیان', '63289314105', '02612396818', '02617080300', '1119446789', 'گلستان خیابان آختاچی ساختمان رعنا', NULL, NULL),
	(411, 1, 'آران ترکان', '25336873023', '02641570454', '02640784335', '6151025984', 'هرمزگان خیابان مجاهد ساختمان ایران دخت کد پستی 5795132234', NULL, NULL),
	(412, 1, 'رامدخت صباغ', '68288155107', '02198096697', '02628343293', '2898080663', 'استان لرستان خیابان رهنما ساختمان نیکی ناز پلاک 10 کد پستی 5818120069', NULL, NULL),
	(413, 1, 'مهرگان انوری', '63044822108', '02121879829', '02668044029', '7359869051', 'استان خراسان شمالی خیابان مشا ساختمان عبّاس پلاک 49', NULL, NULL),
	(414, 1, 'مهجبین ملک', '80554178329', '03158379882', '03100308254', '4375027897', 'استان کردستان خیابان هومن ساختمان ویستا پلاک 89', NULL, NULL),
	(415, 1, 'مهندس الناز چنگیزی', '27096163122', '02672638634', '02180220152', '3192160681', 'استان تهران خیابان نقدی ساختمان تلیمان پلاک 27', NULL, NULL),
	(416, 1, 'ملاحت ملکیان', '26413253353', '02159348482', '02678606401', '8264397057', 'تهران خیابان دیباج ساختمان عزیزه قطعه 62', NULL, NULL),
	(417, 1, 'دکتر خینا قهرمانیان', '35549411676', '02684790750', '02123413132', '5202307282', 'استان گلستان خیابان راوندی ساختمان نهاله پلاک 39', NULL, NULL),
	(418, 1, 'سالار همدانی', '83651015717', '02612613031', '02696840549', '5981592943', 'استان کرمان خیابان رحمانیان ساختمان صفیّه پلاک 32 کد پستی 9405291459', NULL, NULL),
	(419, 1, 'تهمینه آهی', '62323062447', '02620899523', '02171271592', '1370166299', 'همدان خیابان داودی ساختمان سوگل قطعه 13 کد پستی 3392701332', NULL, NULL),
	(420, 1, 'نصیر دستغیب', '6484774999', '02180823279', '02696580834', '9787131978', 'استان سیستان و بلوچستان خیابان ارسباران ساختمان وحید قطعه 12', NULL, NULL),
	(421, 1, 'افری ابریشمی', '88460623868', '02101948424', '02144988201', '1544624565', 'کرمانشاه خیابان شیرمحمدی ساختمان شمس', NULL, NULL),
	(422, 1, 'غزل رستمی', '13121813572', '02192473788', '02135951290', '7117878949', 'اصفهان خیابان ضابطی ساختمان سیمبر قطعه 21 کد پستی 4239640363', NULL, NULL),
	(423, 1, 'پویان مجتهدی', '807355893', '02632455824', '02176140886', '0921142964', 'مازندران خیابان باطنی ساختمان تیربُد', NULL, NULL),
	(424, 1, 'مه سیما مجتهدی', '96300660854', '03187707386', '02187159833', '7403168596', 'آذربایجان شرقی خیابان نامور ساختمان سمن قطعه 84', NULL, NULL),
	(425, 1, 'مهربانو کیمیایی', '29081762750', '02136479643', '03151401208', '6124641421', 'آذربایجان غربی خیابان خامنه‌ای ساختمان متین پلاک 70 کد پستی 6684392092', NULL, NULL),
	(426, 1, 'فرنیا اوستا', '62406269343', '03158606702', '03187918003', '1136257321', 'استان لرستان خیابان شیرمحمدی ساختمان زادمهر', NULL, NULL),
	(427, 1, 'جهانسوز ابتکار', '32962580442', '02645403357', '02162445157', '2701624582', 'اصفهان خیابان مظفر ساختمان مینا کد پستی 9888119364', NULL, NULL),
	(428, 1, 'دکتر امجد فنی‌زاده', '9101024105', '02115053902', '02679608658', '1122249900', 'استان اصفهان خیابان امانت ساختمان آرتین پلاک 77', NULL, NULL),
	(429, 1, 'اکتای آیتی', '69392621032', '03161615214', '03132728463', '2047375612', 'ایلام خیابان کاکاوند ساختمان نوین', NULL, NULL),
	(430, 1, 'شوشا فهمیده', '32646236435', '02120576583', '03122351393', '4773230356', 'گیلان خیابان شبستری ساختمان آرایه قطعه 95 کد پستی 6161680933', NULL, NULL),
	(431, 1, 'مازیار عبدالکریمی', '1458900394', '02158996184', '02693908559', '8021219124', 'سمنان خیابان میدری ساختمان ویره کد پستی 2426354391', NULL, NULL),
	(432, 1, 'حانی حکمت', '46943206659', '02101508158', '02106733707', '2994159021', 'کرمان خیابان خسروپناه ساختمان مجید', NULL, NULL),
	(433, 1, 'دکتر نَستور بیگی', '76519555032', '02616437546', '02653669342', '5598317381', 'استان خراسان جنوبی خیابان وکیلی ساختمان روشاک کد پستی 2310173958', NULL, NULL),
	(434, 1, 'فریبا ملک', '6181088386', '03156823647', '02632096068', '0603691367', 'تهران خیابان ادب ساختمان ارشمید', NULL, NULL),
	(435, 1, 'ثریّا خسروپناه', '77892058347', '03189286033', '03106602064', '3068606282', 'هرمزگان خیابان پناهیان ساختمان آروشا پلاک 59', NULL, NULL),
	(436, 1, 'مهندس پروه آهی', '30387684108', '03128657469', '02628206839', '2726861444', 'استان قزوین خیابان مستوفی ساختمان سمند', NULL, NULL),
	(437, 1, 'بی بی ناز مظفر', '72204142890', '03100415759', '02107285123', '6095645722', 'سمنان خیابان واعظ‌زاده ساختمان هژیر کد پستی 5419480547', NULL, NULL),
	(438, 1, 'فریماه صفوی', '19466424101', '02139476307', '02616024861', '4914411618', 'فارس خیابان نراقی ساختمان ساغر قطعه 59', NULL, NULL),
	(439, 1, 'مهرورز ملک', '88292728997', '02610594281', '03142796441', '2260380038', 'یزد خیابان کاملی ساختمان نوری کد پستی 2430524369', NULL, NULL),
	(440, 1, 'بازان مستوفی', '56301314168', '02679410153', '03105460306', '1643559079', 'البرز خیابان جنتی ساختمان رامش', NULL, NULL),
	(441, 1, 'شفق علی‌زمانی', '80505480091', '02156563371', '02119106609', '9718204993', 'استان گلستان خیابان نقیب‌زاده ساختمان کیانوش پلاک 86 کد پستی 1839285570', NULL, NULL),
	(442, 1, 'گوماتا خاموشی', '41134996504', '03112346976', '03147983667', '0311800868', 'سیستان و بلوچستان خیابان طباطبائی ساختمان حسین', NULL, NULL),
	(443, 1, 'داور خاموشی', '13687295534', '03164710684', '02121364421', '6469862558', 'گلستان خیابان آقاجری ساختمان جهانبخش قطعه 29', NULL, NULL),
	(444, 1, 'گلچهره انوری', '27460861330', '02604742599', '02139996128', '4959355000', 'استان یزد خیابان مجتهد ساختمان ماهرخ کد پستی 7549552885', NULL, NULL),
	(445, 1, 'پرستوک غنی', '61448327676', '03115901028', '03112512761', '7613236027', 'سیستان و بلوچستان خیابان حکیمی ساختمان آروین کد پستی 5626087020', NULL, NULL),
	(446, 1, 'فرّخ رسولی', '35972924131', '02663121575', '03167174910', '0714857015', 'استان اردبیل خیابان فنایی ساختمان نشاط کد پستی 0474449355', NULL, NULL),
	(447, 1, 'بلکا پستا', '76445189541', '03133668438', '03199490859', '0720855864', 'لرستان خیابان رفیعی ساختمان سارنگ', NULL, NULL),
	(448, 1, 'پرمیدا جنتی', '2868470399', '02616224426', '02607359212', '1960279924', 'استان گیلان خیابان پازارگاد ساختمان مهراندخت کد پستی 2970762089', NULL, NULL),
	(449, 1, 'استاد الناز عنایت', '64333228822', '03142717596', '03132956506', '7329268102', 'استان کرمانشاه خیابان شریعتی ساختمان مهسو قطعه 92 کد پستی 5568645729', NULL, NULL),
	(450, 1, 'نعمت میرزاده', '10760455242', '02183147027', '02193041690', '0353899977', 'استان مازندران خیابان قهستانی ساختمان رهام قطعه 95', NULL, NULL),
	(451, 1, 'آریامن هاشمی', '95781186363', '02106249729', '02639142679', '6197591496', 'استان کردستان خیابان ضرغامی ساختمان شیفته قطعه 87 کد پستی 5221736857', NULL, NULL),
	(452, 1, 'فریان ابریشمی', '35032749177', '02171386130', '02615395715', '3158072799', 'استان هرمزگان خیابان جعفریان ساختمان فرنگ پلاک 23', NULL, NULL),
	(453, 1, 'کیارش روستا', '47519537980', '02129665706', '02652133797', '2198597592', 'استان کهگیلویه و بویراحمد خیابان شیرمحمدی ساختمان سمنه کد پستی 8463660386', NULL, NULL),
	(454, 1, 'تیرداد مجتهدی', '77026963718', '02681061666', '02663660750', '7226712004', 'خوزستان خیابان نوبختی ساختمان فرزام قطعه 95 کد پستی 7181516156', NULL, NULL),
	(455, 1, 'خانم مارال میرباقری', '57239216392', '02677004563', '02110287361', '6728530664', 'استان زنجان خیابان کامکار ساختمان مهیاز قطعه 73 کد پستی 9268261308', NULL, NULL),
	(456, 1, 'نسرین اشتری', '39711151488', '02668722518', '02644574453', '7302247310', 'خراسان شمالی خیابان پناهی ساختمان سزانه پلاک 76', NULL, NULL),
	(457, 1, 'سیمبر روحانی', '39690475076', '03183721096', '03190988362', '1020244724', 'استان قزوین خیابان بهشتی ساختمان آندیا', NULL, NULL),
	(458, 1, 'رسا اشراقی', '76316459723', '03119218157', '02693557775', '5563824877', 'گلستان خیابان مجتهدی ساختمان باورد', NULL, NULL),
	(459, 1, 'کاساندان اللهیاری', '43947068838', '02660977906', '03172526681', '1081390113', 'ایلام خیابان دری ساختمان نارسیس', NULL, NULL),
	(460, 1, 'تیرداد فرشیدورد', '83961289028', '02113497023', '03143302355', '7325946456', 'مازندران خیابان صغیری ساختمان فرورتیش کد پستی 8318977858', NULL, NULL),
	(461, 1, 'فریما چاوشی', '72670686545', '03113213108', '02137546737', '2746830518', 'استان زنجان خیابان اشراقی ساختمان کاناز قطعه 54 کد پستی 6338693990', NULL, NULL),
	(462, 1, 'استاد ایمان روحانی', '43911779677', '03140584474', '03175958050', '2213916168', 'استان بوشهر خیابان فنایی ساختمان بامشاد', NULL, NULL),
	(463, 1, 'آرتاباز قاضی', '35580160805', '02663995829', '03152549107', '0862742783', 'اصفهان خیابان خراسانی ساختمان اردشیر کد پستی 6282086255', NULL, NULL),
	(464, 1, 'آسمانه ابوذر', '88867609471', '02116986634', '03144388049', '9820009236', 'استان زنجان خیابان شریعتمداری ساختمان احسان پلاک 42 کد پستی 2125452048', NULL, NULL),
	(465, 1, 'مستوره هوشیار', '94022912068', '02641573678', '03117845245', '2863963495', 'استان چهارمحال و بختیاری خیابان مصباح‌زاده ساختمان باورد پلاک 15', NULL, NULL),
	(466, 1, 'خانم سروین گل', '67411288576', '03155915298', '02646271795', '5909459479', 'استان مرکزی خیابان محمدرضایی ساختمان کیوان پلاک 93', NULL, NULL),
	(467, 1, 'یاشار یلدا', '23927312853', '02608923758', '03109444836', '2748676001', 'فارس خیابان آهنگری ساختمان پروند', NULL, NULL),
	(468, 1, 'مهندس مانک بحرینی', '52313561966', '02130136957', '02674688754', '9386866036', 'کردستان خیابان فرهنگ ساختمان بهنیود پلاک 86 کد پستی 1729025570', NULL, NULL),
	(469, 1, 'بهنیود ابریشمی', '97401581452', '02120447578', '03154498765', '4243951225', 'استان خراسان شمالی خیابان سرشار ساختمان گشتاسب', NULL, NULL),
	(470, 1, 'جهان ناز حکمی', '62237884747', '02681330967', '02662372157', '0951402041', 'استان کرمانشاه خیابان سرمد ساختمان مه سیما کد پستی 1292952727', NULL, NULL),
	(471, 1, 'استاد مهربانو هروی', '90583106168', '02679934956', '02166573437', '3996749046', 'اردبیل خیابان مفتاح ساختمان باور کد پستی 6934540726', NULL, NULL),
	(472, 1, 'آتوسا راوندی', '32730415773', '02699444767', '03104965423', '2309579300', 'استان کرمان خیابان زنوزی ساختمان سوری قطعه 64', NULL, NULL),
	(473, 1, 'آقای هیرمند علی‌پور', '64842435203', '02103449837', '03168476434', '6417958432', 'خراسان رضوی خیابان بزرگیان ساختمان پرتاش کد پستی 6342260454', NULL, NULL),
	(474, 1, 'ارنواز صدیقی', '24218871792', '02138628419', '02672275430', '7695721884', 'استان قم خیابان جهانگیری ساختمان ملیکا پلاک 33 کد پستی 3346838209', NULL, NULL),
	(475, 1, 'پژواک پایدار', '68446415702', '03160277386', '02136057091', '3502991796', 'همدان خیابان ضابطی ساختمان هژیر قطعه 35 کد پستی 4248847422', NULL, NULL),
	(476, 1, 'سعید سبحانی', '76607572014', '03114593503', '02620271782', '7229635775', 'اردبیل خیابان نیلوفری ساختمان فردوس', NULL, NULL),
	(477, 1, 'برزو ندوشن', '78000196086', '03135172695', '03146277905', '9468827677', 'خراسان رضوی خیابان اقلیما ساختمان پارسادخت کد پستی 7707292820', NULL, NULL),
	(478, 1, 'استاد فیروز خاتمی', '47117522310', '02675777322', '02130102918', '4178349916', 'استان تهران خیابان توفیق ساختمان رامک', NULL, NULL),
	(479, 1, 'رامتین زارع', '4894730069', '03149115636', '03160223196', '4237123481', 'استان زنجان خیابان محجوب ساختمان امین', NULL, NULL),
	(480, 1, 'گرگین سحابی', '70836407977', '02628274389', '03112448007', '8375622046', 'استان کرمان خیابان توسلی ساختمان نینا کد پستی 3858492826', NULL, NULL),
	(481, 1, 'آذردخت کدیور', '50897930467', '02138728618', '02168005929', '2311057955', 'استان اصفهان خیابان باغچه‌بان ساختمان گلریز', NULL, NULL),
	(482, 1, 'فردین داور', '38565938109', '02667436886', '02134183244', '5610290509', 'هرمزگان خیابان روحانی ساختمان شرمین قطعه 63 کد پستی 5083357218', NULL, NULL),
	(483, 1, 'دکتر پیراسته شاملو', '62242289699', '02678960170', '02656349971', '7310734550', 'استان آذربایجان غربی خیابان سروش ساختمان صفا کد پستی 9248229742', NULL, NULL),
	(484, 1, 'پرمیدا محدثی', '27792225383', '02626198859', '03100274258', '2805417391', 'استان اردبیل خیابان پیوندی ساختمان درسا', NULL, NULL),
	(485, 1, 'دکتر فرداد حائری', '70290901101', '03198026020', '02696923847', '9416470281', 'استان سمنان خیابان ایمانی ساختمان باربد پلاک 49', NULL, NULL),
	(486, 1, 'شهرداد عقیلی', '15571476358', '02602844767', '02164850033', '5405469553', 'استان خراسان شمالی خیابان پارسی ساختمان زرتشت کد پستی 3381175612', NULL, NULL),
	(487, 1, 'فاریا نقیب‌زاده', '46835070401', '02126374570', '02670496264', '2281665081', 'استان کردستان خیابان آریان‌پور ساختمان ستوده', NULL, NULL),
	(488, 1, 'مقصود رهنما', '47557262458', '02679227567', '02188208690', '9423745773', 'همدان خیابان رهنما ساختمان چنگیز قطعه 60 کد پستی 5096113660', NULL, NULL),
	(489, 1, 'نارین علیا', '24370001977', '02628961265', '02619549621', '0171132604', 'استان خراسان جنوبی خیابان مجتهد ساختمان آیسا پلاک 45', NULL, NULL),
	(490, 1, 'مردآویج رنگرز', '4596964426', '02175552294', '03127929883', '7494464141', 'البرز خیابان بختیاری ساختمان سمیره کد پستی 5535670416', NULL, NULL),
	(491, 1, 'رامی فاطمی', '95598178071', '02607744167', '03197587927', '2351200223', 'مازندران خیابان دستغیب ساختمان مهتا قطعه 34', NULL, NULL),
	(492, 1, 'نوید صدیق', '16978004856', '02678376823', '03145588602', '7539685600', 'استان گلستان خیابان لاجوردی ساختمان هیتاسب پلاک 35 کد پستی 9539654245', NULL, NULL),
	(493, 1, 'علی داد فاطمی', '92016524886', '03150869429', '02683035160', '0699356409', 'استان گلستان خیابان لاجوردی ساختمان رایان', NULL, NULL),
	(494, 1, 'ارشان واعظ‌زاده', '71046628116', '02178294171', '03190031139', '9662789357', 'مرکزی خیابان اوستا ساختمان مهرساد', NULL, NULL),
	(495, 1, 'پُژمان داودی', '54578113031', '02601811168', '02673244297', '7808810869', 'استان البرز خیابان زنجانی ساختمان شاهد کد پستی 1836565301', NULL, NULL),
	(496, 1, 'رسام انوشه', '55697421486', '02114274914', '03112369714', '9178240039', 'استان سیستان و بلوچستان خیابان فرمانفرمائیان ساختمان رسا پلاک 93', NULL, NULL),
	(497, 1, 'ویراف ساعی', '34041575170', '03176310595', '02694525239', '6418773659', 'آذربایجان غربی خیابان فاطمی ساختمان احمد قطعه 26 کد پستی 3419150775', NULL, NULL),
	(498, 1, 'جهانیار پناهنده', '16160823242', '02171327467', '03104360993', '2422300081', 'خراسان جنوبی خیابان سادات ساختمان گرزم قطعه 64', NULL, NULL),
	(499, 1, 'زرسا فرامرزی', '62650286929', '03115798273', '02630637409', '8775563143', 'اصفهان خیابان آقاجری ساختمان شووان کد پستی 5680329288', NULL, NULL),
	(500, 1, 'افرنگ اشتری', '39041740786', '02176577278', '02120760104', '9408694184', 'کرمان خیابان مجتبایی ساختمان سپینود قطعه 76', NULL, NULL),
	(501, 1, 'زواره بختیاری', '81559655464', '03145774796', '02133780612', '6704389694', 'آذربایجان شرقی خیابان چنگیزی ساختمان آرتمیس قطعه 64 کد پستی 0456194532', NULL, NULL),
	(502, 1, 'سحر شهیدی', '81631673403', '03195119907', '02104539720', '1011218810', 'هرمزگان خیابان عراقی ساختمان پرندیس قطعه 77 کد پستی 6899161453', NULL, NULL),
	(503, 1, 'فریمان سرمد', '41017525610', '03178350532', '02112393239', '0895247578', 'استان خراسان شمالی خیابان مطهری ساختمان بکتاش کد پستی 0106890291', NULL, NULL),
	(504, 1, 'کوهیار آشوری', '74843740684', '02195314725', '03145202600', '5148290338', 'همدان خیابان هاشمی ساختمان کوشا پلاک 91 کد پستی 4646716954', NULL, NULL),
	(505, 1, 'شاهوش سروستانی', '52631274329', '03174159894', '03132695272', '1104167809', 'هرمزگان خیابان سبزواری ساختمان پولاد کد پستی 3155385173', NULL, NULL),
	(506, 1, 'استاد منیر موسویان', '45554458823', '03197897103', '03126110268', '9905945953', 'استان کرمان خیابان استادی ساختمان قباد پلاک 67', NULL, NULL),
	(507, 1, 'محمّد دباغ', '77349684582', '02163616985', '02600431145', '5221265133', 'مرکزی خیابان شیخ‌الاسلامی ساختمان نیوند کد پستی 6149430130', NULL, NULL),
	(508, 1, 'هومان سروستانی', '93800763109', '03128462573', '02639315250', '5671782293', 'استان اصفهان خیابان امانت ساختمان نیکا قطعه 52 کد پستی 1829114265', NULL, NULL),
	(509, 1, 'استاد نازآفرین تبریزی', '47865625477', '03180617712', '03132476905', '1393882434', 'استان قزوین خیابان دانایی‌فر ساختمان فرزاد پلاک 61 کد پستی 2066299876', NULL, NULL),
	(510, 1, 'علی داد علی‌زمانی', '62475601387', '03102884621', '02174845202', '4326529010', 'مرکزی خیابان خوئینی ساختمان بازور قطعه 75 کد پستی 8661166828', NULL, NULL),
	(511, 1, 'سعیده ناظری', '13515665822', '02602353072', '02149567640', '2851612365', 'فارس خیابان رنجبر ساختمان کژال', NULL, NULL),
	(512, 1, 'نیک نواب', '40196237737', '03132170472', '02664861520', '8075400576', 'کهگیلویه و بویراحمد خیابان ارسباران ساختمان زریر پلاک 96 کد پستی 4279770048', NULL, NULL),
	(513, 1, 'ملودی لاجوردی', '41940733674', '03158576612', '03161632004', '4866673149', 'استان گیلان خیابان سلامت ساختمان لیث قطعه 59 کد پستی 5190064161', NULL, NULL),
	(514, 1, 'نادیا علی‌زمانی', '34726891456', '03141653943', '03148439904', '1465932405', 'استان گلستان خیابان سروستانی ساختمان سپهر قطعه 58 کد پستی 6456575767', NULL, NULL),
	(515, 1, 'فریدون غضنفری', '74986580823', '02109979108', '02188339020', '4518365385', 'یزد خیابان فنایی ساختمان کام کد پستی 2830147803', NULL, NULL),
	(516, 1, 'فرزاد حائری', '58543882403', '03195202569', '02160561884', '1527258515', 'استان سیستان و بلوچستان خیابان افخمی ساختمان پوریا کد پستی 4048959740', NULL, NULL),
	(517, 1, 'مصطفی آژند', '38293504238', '02645593713', '02637873963', '0658750919', 'بوشهر خیابان معین ساختمان سیروس پلاک 44 کد پستی 2888153272', NULL, NULL),
	(518, 1, 'مهندس مهوار شادمهر', '81998363273', '03150215131', '02633915053', '1203289787', 'استان کرمان خیابان فارسی ساختمان بهناک قطعه 96', NULL, NULL),
	(519, 1, 'پیران عنایت', '86306520977', '02148240246', '03169806697', '6476402975', 'استان بوشهر خیابان عزیزی ساختمان آزرمیدخت کد پستی 9012695014', NULL, NULL),
	(520, 1, 'مهندس آلیش پایور', '23179909806', '02137653883', '02159756983', '4368837601', 'بوشهر خیابان خوئینی‌ها ساختمان ارم', NULL, NULL),
	(521, 1, 'فائقه علی‌زمانی', '69638577692', '03193192562', '03106875557', '9351548323', 'کردستان خیابان شیرازی ساختمان فرانه قطعه 10', NULL, NULL),
	(522, 1, 'کامران رسولی', '44792608462', '02612101146', '02678207414', '9553209913', 'استان آذربایجان غربی خیابان پیوندی ساختمان رامینه کد پستی 3442637556', NULL, NULL),
	(523, 1, 'آقای بهروز باطنی', '22700567722', '02142335706', '02610411791', '4329068770', 'هرمزگان خیابان فنی‌زاده ساختمان هوشیار کد پستی 1472279295', NULL, NULL),
	(524, 1, 'خانم عنبر شعبانی', '33663401095', '02694876889', '02171976623', '0065678919', 'البرز خیابان انوشه ساختمان آرمون قطعه 98 کد پستی 3319297703', NULL, NULL),
	(525, 1, 'خانم سوگند پویان', '27445969361', '02102147384', '03135899973', '6639533119', 'استان لرستان خیابان شیدا ساختمان آناهیتا کد پستی 7099456204', NULL, NULL),
	(526, 1, 'ایرمان یلدا', '43879263683', '03178186118', '02155864255', '0667499225', 'استان گیلان خیابان محجوبی ساختمان رامیاد قطعه 20', NULL, NULL),
	(527, 1, 'زال مجتبایی', '54038259262', '02679017156', '03169525633', '5944222842', 'آذربایجان شرقی خیابان قنبری ساختمان نرسی قطعه 36 کد پستی 8668878163', NULL, NULL),
	(528, 1, 'آقای جویان امین‌زاده', '62245511051', '02688971671', '02660709324', '7066682795', 'قم خیابان سپه‌وند ساختمان آذردخت قطعه 45 کد پستی 9639556358', NULL, NULL),
	(529, 1, 'مرزبان سروستانی', '28283594066', '02102301262', '02616990810', '8158498656', 'استان گلستان خیابان عارف ساختمان کیهان پلاک 66', NULL, NULL),
	(530, 1, 'رخشان پیران', '41104426437', '02104689745', '02171888828', '3932409439', 'کهگیلویه و بویراحمد خیابان بختیار ساختمان فرزاد کد پستی 7914346096', NULL, NULL),
	(531, 1, 'کیخسرو سراج', '12561493642', '02690962926', '02113840765', '5030541574', 'استان خوزستان خیابان علیا ساختمان رستم', NULL, NULL),
	(532, 1, 'کترا زهرایی', '5765283584', '02131938878', '02622305317', '2905796171', 'خوزستان خیابان توکلیان ساختمان گلسان کد پستی 4066272045', NULL, NULL),
	(533, 1, 'آرتان علی‌آبادی', '55967321094', '02653098363', '02119202573', '2575502468', 'استان آذربایجان شرقی خیابان علم ساختمان بهنام پلاک 24 کد پستی 6807555907', NULL, NULL),
	(534, 1, 'اریکا بیگی', '81769119198', '02632496874', '02688561971', '9826533668', 'مازندران خیابان روزبه ساختمان حسین کد پستی 8833316900', NULL, NULL),
	(535, 1, 'شهرام عاشوری', '18441866143', '02149001789', '02184802475', '7830279515', 'استان کردستان خیابان کمالی ساختمان ارمیا', NULL, NULL),
	(536, 1, 'بیژن اشتری', '48537669002', '02117612164', '02624661372', '7156412710', 'گلستان خیابان قهستانی ساختمان ورنا پلاک 36 کد پستی 1642089389', NULL, NULL),
	(537, 1, 'گوشاسب معارف', '48398846924', '02127126188', '02184709871', '2459109611', 'استان کهگیلویه و بویراحمد خیابان حقیقی ساختمان رامبُد قطعه 91', NULL, NULL),
	(538, 1, 'خانم نوشه جنتی', '16437321416', '02652837836', '02105181645', '6767295849', 'استان چهارمحال و بختیاری خیابان غضنفری ساختمان رازان قطعه 31', NULL, NULL),
	(539, 1, 'خاطره کدیور', '3685960155', '02173582857', '02130125617', '5930595748', 'استان تهران خیابان نیلوفری ساختمان فردات کد پستی 8921205150', NULL, NULL),
	(540, 1, 'ابراهیم مجاهد', '55236062151', '03149314284', '02148995284', '3501161886', 'تهران خیابان حائری ساختمان شروین قطعه 55 کد پستی 1432061867', NULL, NULL),
	(541, 1, 'ماهدخت چگنی', '63542394549', '03105655563', '03127466089', '7301954828', 'کرمان خیابان داور ساختمان بهپور', NULL, NULL),
	(542, 1, 'سوران کاویانی', '68176292578', '02177098291', '03124391306', '6035335678', 'البرز خیابان هومن ساختمان تابا پلاک 42 کد پستی 7928579562', NULL, NULL),
	(543, 1, 'ناژین شاه‌حسینی', '51148981699', '02650125238', '02158585098', '3522632949', 'استان قم خیابان راسخ ساختمان کَیان کد پستی 8244704095', NULL, NULL),
	(544, 1, 'هوشنگ علی‌پور', '13327405928', '03191207188', '02196803461', '3425936497', 'خراسان رضوی خیابان ملکیان ساختمان گلاب کد پستی 7575337861', NULL, NULL),
	(545, 1, 'مهندس باشو میرسپاسی', '55180245912', '02611772716', '02148892467', '9012422601', 'استان اصفهان خیابان حقیقی ساختمان چنگیز پلاک 44 کد پستی 5199544516', NULL, NULL),
	(546, 1, 'استاد ارسیا قاضی', '72834774943', '03170336865', '02604579611', '4919275674', 'استان گیلان خیابان قنبری ساختمان جاودانه قطعه 84 کد پستی 6340294408', NULL, NULL),
	(547, 1, 'استاد شایان دخت حکمی', '86155647358', '03186671878', '02670646588', '8510246175', 'استان آذربایجان غربی خیابان چنگیزی ساختمان پوپه پلاک 98 کد پستی 5983285217', NULL, NULL),
	(548, 1, 'استاد آذربُد امین‌زاده', '21030503198', '02195250258', '02129493228', '0455935183', 'استان قم خیابان میدری ساختمان کریمان کد پستی 9520082587', NULL, NULL),
	(549, 1, 'کوهیار غنی', '4409919453', '03153608323', '02124920040', '4488151056', 'اصفهان خیابان مصاحب ساختمان برید پلاک 11', NULL, NULL),
	(550, 1, 'ابی قمیشی', '44374796938', '02604024832', '03198603094', '6349786576', 'کردستان خیابان امانی ساختمان افرا', NULL, NULL),
	(551, 1, 'گل اندام بختیار', '5678880393', '02123570298', '03108499891', '7373714147', 'استان قم خیابان قاضی ساختمان گرزم', NULL, NULL),
	(552, 1, 'سیماه ضابطی', '91704906823', '02193252803', '02137060218', '6724191540', 'استان قزوین خیابان پارسا ساختمان نیکان کد پستی 0632282639', NULL, NULL),
	(553, 1, 'راستاک فرامرزی', '21466999125', '02685167817', '02697326573', '8159790315', 'استان سیستان و بلوچستان خیابان حیاتی ساختمان حبیبه پلاک 89', NULL, NULL),
	(554, 1, 'پیوند ملکیان', '45215793938', '03139531349', '02615918523', '2132848025', 'گیلان خیابان دری ساختمان افشنگ قطعه 71 کد پستی 7427632100', NULL, NULL),
	(555, 1, 'آرتا سیف‌زاده', '99824947934', '02180951483', '02153710070', '0137461961', 'خراسان رضوی خیابان هوشیار ساختمان مهداد پلاک 46 کد پستی 6372424373', NULL, NULL),
	(556, 1, 'ارم شاملو', '28908185491', '03189803864', '02609789428', '8517801401', 'استان کهگیلویه و بویراحمد خیابان خمسه ساختمان چلیپا کد پستی 9816958515', NULL, NULL),
	(557, 1, 'گیلدا عبدالملکی', '31622293398', '02644130948', '03101956493', '1503346841', 'کهگیلویه و بویراحمد خیابان راسخ ساختمان دنیا پلاک 47 کد پستی 5359117045', NULL, NULL),
	(558, 1, 'پوپه فرشیدورد', '82349715287', '02137899442', '02158899077', '9024972050', 'هرمزگان خیابان فارسی ساختمان شهرزاد پلاک 52 کد پستی 0214723958', NULL, NULL),
	(559, 1, 'وشمگیر آیتی', '28562545701', '03128131786', '02656760851', '4627346039', 'فارس خیابان زهرایی ساختمان نازک پلاک 72 کد پستی 7264982336', NULL, NULL),
	(560, 1, 'کورش صفوی', '23433752198', '02601380471', '02172008968', '9836226310', 'اصفهان خیابان لاهوتی ساختمان افرند پلاک 45', NULL, NULL),
	(561, 1, 'سینام فریاد', '51079285040', '03133236766', '03171676619', '4249064348', 'استان زنجان خیابان صدیق ساختمان سپندار قطعه 69', NULL, NULL),
	(562, 1, 'آریابد مهدی‌پور', '5503502241', '02170544313', '02188496279', '1904916580', 'ایلام خیابان مظفر ساختمان باناز قطعه 79 کد پستی 9797531574', NULL, NULL),
	(563, 1, 'راستاک زمردیان', '53997021991', '03109528458', '03177082102', '4043701954', 'قزوین خیابان اشتری ساختمان ارشن کد پستی 1442484030', NULL, NULL),
	(564, 1, 'یاور ظریف', '27284830923', '02146096470', '02657810125', '9779403463', 'استان هرمزگان خیابان باطنی ساختمان استر', NULL, NULL),
	(565, 1, 'خانم منیر دهقان', '32785613212', '02198208059', '03170367770', '8045559088', 'لرستان خیابان صفوی ساختمان کورش کد پستی 6485709194', NULL, NULL),
	(566, 1, 'نازبانو یثربی', '4413486334', '02662516531', '03108052089', '7076327793', 'استان مازندران خیابان داودی ساختمان ارغوان', NULL, NULL),
	(567, 1, 'موژان باستانی', '14884413555', '03138938353', '02191326709', '4760294179', 'استان سیستان و بلوچستان خیابان وکیلی ساختمان ارشاسب', NULL, NULL),
	(568, 1, 'استاد ریما هومن', '48660195272', '02676558939', '02128180806', '3376662640', 'استان لرستان خیابان علی ساختمان رادین پلاک 64 کد پستی 6519753503', NULL, NULL),
	(569, 1, 'بازان کیان', '76098095747', '03187232493', '02668551809', '8068891839', 'کرمان خیابان صفوی ساختمان مانا', NULL, NULL),
	(570, 1, 'آقای پاتون واعظی', '97648067299', '02662794489', '03164445978', '7591731927', 'استان فارس خیابان خمسه ساختمان نسا کد پستی 2872063785', NULL, NULL),
	(571, 1, 'مهندس برجسب راسخ', '87324098531', '03184067487', '02152639182', '8284935386', 'استان بوشهر خیابان داور ساختمان بهنیا قطعه 20 کد پستی 3403973808', NULL, NULL),
	(572, 1, 'پِشنگ کرمانی', '39001534820', '02169831553', '02119196643', '8458500608', 'استان همدان خیابان امانی ساختمان مهرنوش قطعه 61 کد پستی 6657473538', NULL, NULL),
	(573, 1, 'منیلا کمالی', '74132157055', '03186144443', '02656135026', '2011700328', 'کرمانشاه خیابان بهاور ساختمان ساحل قطعه 81', NULL, NULL),
	(574, 1, 'استاد جنّت دانایی‌فرد', '90031616291', '02613982320', '03181871501', '7689253473', 'خوزستان خیابان دیباج ساختمان مرجان کد پستی 2196987556', NULL, NULL),
	(575, 1, 'آیدین زرشناس', '14765343406', '03159918405', '02638081412', '1661963306', 'چهارمحال و بختیاری خیابان خامنه‌ای ساختمان واله پلاک 51 کد پستی 5055859401', NULL, NULL),
	(576, 1, 'آرون جنتی', '74364801216', '02658560948', '02107031701', '7429165654', 'استان زنجان خیابان امانت ساختمان مهنوش', NULL, NULL),
	(577, 1, 'آقای سالار روحانی', '77714215682', '02698940764', '02605548614', '7882157441', 'استان اصفهان خیابان صغیری ساختمان کاظم', NULL, NULL),
	(578, 1, 'بهبود انتظامی', '49577863728', '02154305329', '02168526760', '2351042568', 'مرکزی خیابان شفا ساختمان نیسیا', NULL, NULL),
	(579, 1, 'فریناز سراج', '22893416505', '02610965766', '02185590513', '8461645124', 'البرز خیابان فرج ساختمان شادآفرین قطعه 43', NULL, NULL),
	(580, 1, 'استاد فربد ثابتی', '79364803619', '03107631486', '03146765524', '6946757066', 'استان لرستان خیابان شیروانی ساختمان جهان ناز پلاک 73', NULL, NULL),
	(581, 1, 'شباویز آهی', '17665619726', '02134440234', '02198133293', '1370043637', 'بوشهر خیابان توسلی ساختمان چاووش کد پستی 1553420143', NULL, NULL),
	(582, 1, 'اُوژن قانونی', '79385571478', '03183101350', '02624443002', '3973601348', 'گلستان خیابان قهرمان ساختمان سحرناز قطعه 25 کد پستی 2139955703', NULL, NULL),
	(583, 1, 'اکبر میدری', '95049818148', '03129783525', '03172643119', '5351480161', 'قزوین خیابان واثقی ساختمان مرجان پلاک 63 کد پستی 1496333166', NULL, NULL),
	(584, 1, 'افراسیاب خداپناهی', '45285274604', '03170374111', '02671886877', '3446819726', 'مرکزی خیابان میدری ساختمان اکتای کد پستی 7290982420', NULL, NULL),
	(585, 1, 'توران جهانگیری', '92373980823', '02168017582', '02604446501', '3234462508', 'کرمان خیابان ارسباران ساختمان رهادخت', NULL, NULL),
	(586, 1, 'آسیه پایا', '1122589799', '02108332709', '02191272649', '0851455261', 'استان آذربایجان غربی خیابان جمادی ساختمان پرور', NULL, NULL),
	(587, 1, 'ثمن آدینه', '48548102577', '03187294970', '02654735592', '8064026435', 'خراسان رضوی خیابان پیران ساختمان رازان پلاک 47 کد پستی 3977831489', NULL, NULL),
	(588, 1, 'تورک شیدا', '85596580577', '02635721061', '02173455250', '4520515844', 'مرکزی خیابان جمادی ساختمان یوسف کد پستی 6368381321', NULL, NULL),
	(589, 1, 'بهادر نیلوفری', '15573444944', '03177905928', '02105330425', '1624094252', 'استان تهران خیابان آهنگر ساختمان سامیار قطعه 75', NULL, NULL),
	(590, 1, 'استاد آناهیتا علی', '7995075054', '02140896882', '02180347948', '4204008632', 'استان اصفهان خیابان کیانی ساختمان وحدت پلاک 52 کد پستی 2450854313', NULL, NULL),
	(591, 1, 'خانم اروانه مستوفی', '29316072720', '03126505716', '03119435990', '8404234482', 'قزوین خیابان شاملو ساختمان بوران کد پستی 5533049294', NULL, NULL),
	(592, 1, 'کوشیار پایا', '21422829955', '02651145344', '02113987176', '7158049896', 'ایلام خیابان میزبانی ساختمان انوشه پلاک 46', NULL, NULL),
	(593, 1, 'فردوس رفیعی', '38458065069', '02164945529', '02630927166', '9700187096', 'استان سیستان و بلوچستان خیابان توکل ساختمان فربد', NULL, NULL),
	(594, 1, 'استاد مهکامه انوار', '30114788315', '02632018849', '03199939321', '1721816189', 'تهران خیابان پستا ساختمان آیسان قطعه 16 کد پستی 8315876284', NULL, NULL),
	(595, 1, 'روئین پارسی', '15283108167', '02107844790', '02185977125', '9483072330', 'استان آذربایجان شرقی خیابان طریقت ساختمان دانا', NULL, NULL),
	(596, 1, 'نیکنیا ابریشمی', '12885369235', '03137230766', '03155517254', '3482030413', 'گیلان خیابان شریعتی ساختمان عزیز کد پستی 8948477792', NULL, NULL),
	(597, 1, 'ساعد رهنما', '65514774471', '02685567378', '02676887020', '5330141138', 'استان گلستان خیابان خدایی ساختمان سیماه قطعه 89', NULL, NULL),
	(598, 1, 'بازیار پیران', '51394345646', '02675705025', '03132678497', '9047783727', 'استان فارس خیابان محجوب ساختمان هوشمند کد پستی 9602798606', NULL, NULL),
	(599, 1, 'ارشد فانی', '64047564409', '02605873042', '03105505360', '9721256103', 'استان زنجان خیابان ملکیان ساختمان چکاوک پلاک 84', NULL, NULL),
	(600, 1, 'فرزانک انوری', '41548857295', '02153834008', '02118978097', '2992143594', 'فارس خیابان جهانی ساختمان پرشه قطعه 96', NULL, NULL),
	(601, 1, 'کیارش دانایی‌فرد', '52994155190', '02637238567', '03155067145', '4255996130', 'استان قزوین خیابان پیوندی ساختمان یاس پلاک 28 کد پستی 4845606294', NULL, NULL),
	(602, 1, 'منیلا همت', '83579741552', '02635506324', '02139585383', '1960531394', 'استان همدان خیابان صدر ساختمان عدلان کد پستی 1034730148', NULL, NULL),
	(603, 1, 'اُرند ساعی', '72657838214', '03148416879', '02157728884', '3646958264', 'استان فارس خیابان معین ساختمان لیلوپر', NULL, NULL),
	(604, 1, 'نیرا دانایی‌فرد', '95124501362', '02189118369', '02107521034', '4880175035', 'استان خراسان رضوی خیابان توکل ساختمان لیث', NULL, NULL),
	(605, 1, 'گودرز سراج', '68583227929', '02107768148', '02628549896', '8491049931', 'گیلان خیابان خاموشی ساختمان رخشان قطعه 80', NULL, NULL),
	(606, 1, 'تاجفر فنی‌زاده', '27865468211', '02157422856', '03130638625', '9765776315', 'استان سیستان و بلوچستان خیابان پیرحیاتی ساختمان هژیر کد پستی 9998121113', NULL, NULL),
	(607, 1, 'نازدخت اشراقی', '13786887448', '02136706554', '02624613924', '9462466735', 'استان زنجان خیابان مرادخانی ساختمان ماهر پلاک 96 کد پستی 4536437931', NULL, NULL),
	(608, 1, 'نیکی ترکان', '58435598420', '02662267857', '02685734995', '5387748006', 'قم خیابان ابوذر ساختمان نیلوفر پلاک 84', NULL, NULL),
	(609, 1, 'رامتین همایون', '76021914414', '02618369390', '02655089486', '0229755918', 'کردستان خیابان دانایی‌فرد ساختمان جهانمهر قطعه 84 کد پستی 3222786346', NULL, NULL),
	(610, 1, 'آقای مجید ناظری', '22028344207', '02619286602', '03123454246', '1316700181', 'استان یزد خیابان لاچینی ساختمان ایران دخت پلاک 74', NULL, NULL),
	(611, 1, 'تندیس روحانی', '32805268974', '03152256980', '02156401565', '4014661218', 'گیلان خیابان صغیری ساختمان زربانو', NULL, NULL),
	(612, 1, 'آدر یلدا', '28804104761', '03157235530', '02167831185', '1968145028', 'استان مرکزی خیابان ندوشن ساختمان کیهان کد پستی 7775385103', NULL, NULL),
	(613, 1, 'داریوش ضرغامی', '87518791162', '03134618797', '03133886930', '8860001598', 'ایلام خیابان حقانی ساختمان پاکسیما', NULL, NULL),
	(614, 1, 'خانم فاخته پایدار', '29097189840', '02125352542', '03177250517', '4980631366', 'استان کهگیلویه و بویراحمد خیابان نهاوندی ساختمان گردیا کد پستی 4547773337', NULL, NULL),
	(615, 1, 'رهادخت زمردیان', '95303646714', '02180378857', '02136260389', '6211655743', 'استان سمنان خیابان خدایی ساختمان سلیمان', NULL, NULL),
	(616, 1, 'رامین حقانی', '55877042076', '02665564176', '03187463872', '0495500281', 'خراسان شمالی خیابان پایور ساختمان داور کد پستی 9358713157', NULL, NULL),
	(617, 1, 'صفیّه دیباج', '37107685931', '02110887270', '03162514804', '5942539087', 'خراسان جنوبی خیابان روستا ساختمان آویده قطعه 49 کد پستی 4064783371', NULL, NULL),
	(618, 1, 'ظریفه مقدم', '24312354979', '02170719242', '02145625192', '7162301489', 'استان سیستان و بلوچستان خیابان حکمی ساختمان جهانشیر پلاک 68', NULL, NULL),
	(619, 1, 'دلیر ثابتی', '95663688673', '03122182474', '02626273470', '8987532775', 'استان هرمزگان خیابان پارسا ساختمان رامبُد قطعه 26', NULL, NULL),
	(620, 1, 'عهدیه زهرایی', '99482631292', '03146024312', '02687690316', '7252821593', 'استان قزوین خیابان شیرمحمدی ساختمان نوال قطعه 45 کد پستی 2799951301', NULL, NULL),
	(621, 1, 'رسام کهنمویی', '22922807709', '02182440280', '02159809693', '7615920282', 'کرمان خیابان ظریف ساختمان نگین قطعه 31 کد پستی 3882949737', NULL, NULL),
	(622, 1, 'طوسک شعبانی', '86041735525', '02114920649', '03165282279', '3765611888', 'البرز خیابان طبیب‌زاده ساختمان فروردین قطعه 50 کد پستی 5176688986', NULL, NULL),
	(623, 1, 'رشید سبحانی', '77161875263', '02116745942', '03164882642', '6855435118', 'استان کهگیلویه و بویراحمد خیابان توفیق ساختمان داور پلاک 33', NULL, NULL),
	(624, 1, 'خانم رامین دخت نامور', '6769610547', '03118358502', '02606703519', '7242769195', 'استان خراسان جنوبی خیابان صفوی ساختمان ارسیا پلاک 45 کد پستی 7219010583', NULL, NULL),
	(625, 1, 'شولان محمدی', '35981993965', '02118293275', '02186942838', '6383069879', 'البرز خیابان محجوبی ساختمان الیاس پلاک 47', NULL, NULL),
	(626, 1, 'ایران بانو زمردیان', '44672371565', '02140011100', '02192396183', '3156416594', 'استان البرز خیابان حسابی ساختمان جوانشیر', NULL, NULL),
	(627, 1, 'برنا لاجوردی', '64151654882', '02649916866', '02604916435', '0987311048', 'استان مرکزی خیابان کیمیایی ساختمان زند قطعه 33 کد پستی 2025218453', NULL, NULL),
	(628, 1, 'استاد شارود شیدا', '32109928876', '02166124951', '02681587535', '6912123674', 'استان اردبیل خیابان رستمی ساختمان فردخت پلاک 37 کد پستی 2091438355', NULL, NULL),
	(629, 1, 'آقای هوشان مهاجرانی', '26042021379', '02645964385', '03131447399', '8206855449', 'استان قزوین خیابان شیروانی ساختمان اسفندیار پلاک 21 کد پستی 7541393256', NULL, NULL),
	(630, 1, 'بارمان فرج', '6396140653', '02690933003', '02115345674', '3395344446', 'اردبیل خیابان اصلانی ساختمان فهیمه پلاک 96 کد پستی 8160248285', NULL, NULL),
	(631, 1, 'هاني سبحانی', '14739266515', '02623849180', '03160268101', '1220926485', 'گیلان خیابان ابطحی ساختمان فرشیدورد', NULL, NULL),
	(632, 1, 'اوتانا پازارگاد', '55689172234', '02614144351', '03124257548', '8516872997', 'کردستان خیابان بختیاری ساختمان اقبال قطعه 16', NULL, NULL),
	(633, 1, 'مهبد جهانبگلو', '45239302943', '02644613289', '03162563698', '1853219883', 'استان کردستان خیابان کاشی ساختمان نازک پلاک 63 کد پستی 3477574514', NULL, NULL),
	(634, 1, 'بیتا صدر', '71155366368', '02114346482', '03191587686', '3053938609', 'استان خراسان شمالی خیابان نقدی ساختمان محمّد کد پستی 6401199260', NULL, NULL),
	(635, 1, 'همراز توکل', '72740991576', '02698072412', '03177763993', '2470747383', 'سیستان و بلوچستان خیابان کاویانی ساختمان آذربُد پلاک 22', NULL, NULL),
	(636, 1, 'سهی کلباسی', '31107017193', '02633070171', '02657261188', '3726671363', 'استان هرمزگان خیابان قهرمانی ساختمان نیوراد کد پستی 9667369202', NULL, NULL),
	(637, 1, 'جبّاره کدیور', '59640603876', '02632436039', '02132324218', '8397829984', 'استان کردستان خیابان ارسباران ساختمان آیه', NULL, NULL),
	(638, 1, 'استاد تاج مجاهد', '43908298884', '03195524103', '02193988697', '6174660697', 'استان کردستان خیابان استادی ساختمان پوران دخت قطعه 90 کد پستی 0468828149', NULL, NULL),
	(639, 1, 'یازان شبستری', '13995542457', '02649435441', '02183620698', '0888699243', 'کردستان خیابان جهانی ساختمان هانا قطعه 51 کد پستی 4571704518', NULL, NULL),
	(640, 1, 'ارشام پازوکی', '48708035040', '02633023039', '02689860272', '0753772148', 'استان خراسان جنوبی خیابان مجتبوی ساختمان گوماتا پلاک 22', NULL, NULL),
	(641, 1, 'پدیده ندوشن', '67991013014', '02197440793', '02115807774', '2655884545', 'گیلان خیابان شیروانی ساختمان فردید قطعه 51 کد پستی 8179171795', NULL, NULL),
	(642, 1, 'وشتی گل', '52432902477', '02113865114', '03128635592', '5803440235', 'استان سمنان خیابان علم‌الهدی ساختمان سلمان', NULL, NULL),
	(643, 1, 'روشانه ترکاشوند', '4820259343', '03167225426', '02604868007', '7533803124', 'همدان خیابان پناهیان ساختمان نیوشه قطعه 78', NULL, NULL),
	(644, 1, 'سامیه مفتح', '89100435770', '02648796080', '02187105037', '6394492971', 'استان ایلام خیابان طباطبائی ساختمان تاج بانو پلاک 23', NULL, NULL),
	(645, 1, 'مهندس پرنگ بهشتی', '20271954789', '02687277709', '02150335549', '6146067807', 'استان قزوین خیابان پناهنده ساختمان پرسته پلاک 92', NULL, NULL),
	(646, 1, 'هوشان کمالی', '576866468', '02650818856', '02184236519', '0766432726', 'سیستان و بلوچستان خیابان مشا ساختمان مهتاب کد پستی 7748514096', NULL, NULL),
	(647, 1, 'نوید ابتکار', '55999118060', '03122554422', '03125584354', '9609257035', 'بوشهر خیابان قهرمانی ساختمان افسون کد پستی 0834370123', NULL, NULL),
	(648, 1, 'مروارید راوندی', '90729429916', '02632341960', '02696445944', '0394142483', 'خراسان رضوی خیابان معروف ساختمان نوری کد پستی 0977651105', NULL, NULL),
	(649, 1, 'استاد دانش شیرمحمدی', '70275760587', '03168051062', '03164621956', '3158095698', 'آذربایجان شرقی خیابان لاچینی ساختمان یوسف', NULL, NULL),
	(650, 1, 'گوشاسب نراقی', '80864719337', '02633181917', '02630704339', '1265121795', 'تهران خیابان کدیور ساختمان ارسلان پلاک 56 کد پستی 0604002192', NULL, NULL),
	(651, 1, 'محمود فهمیده', '16987187646', '03106054805', '02105615334', '1677836313', 'استان گلستان خیابان طالب‌زاده ساختمان مهراد کد پستی 5159296906', NULL, NULL),
	(652, 1, 'مهراب سرمد', '27760478346', '03185145175', '03163996962', '3636563310', 'آذربایجان غربی خیابان مجتهد ساختمان رادین کد پستی 8835624044', NULL, NULL),
	(653, 1, 'انور آریان‌پور', '45501964665', '03156281291', '02197066909', '2158483996', 'چهارمحال و بختیاری خیابان سرشار ساختمان ژرفا قطعه 14 کد پستی 0286032878', NULL, NULL),
	(654, 1, 'آقای کمبوجیه ترکان', '45439752394', '03148507477', '02617507584', '4297475918', 'اردبیل خیابان ترکان ساختمان قاسم پلاک 58', NULL, NULL),
	(655, 1, 'حورا کمالی', '84757711596', '02119298279', '02117779560', '7140701468', 'قزوین خیابان کریمی ساختمان طراوت', NULL, NULL),
	(656, 1, 'ماندیس خامنه‌ای', '32088842093', '03184840833', '03191543939', '4647085471', 'استان خوزستان خیابان واعظ ساختمان نرمینه پلاک 26', NULL, NULL),
	(657, 1, 'مهداد باغچه‌بان', '97308694185', '03108489530', '03111609757', '7704684932', 'فارس خیابان لاجوردی ساختمان آریابد پلاک 24', NULL, NULL),
	(658, 1, 'سنبل حکمت', '12911223938', '02159498046', '03163933651', '1534514454', 'استان همدان خیابان استادی ساختمان بنان پلاک 40', NULL, NULL),
	(659, 1, 'وارتان ترکاشوند', '66226759202', '03152002087', '02665061598', '6903351261', 'استان اصفهان خیابان پایور ساختمان هونام پلاک 79 کد پستی 2832047379', NULL, NULL),
	(660, 1, 'سپند ناظری', '97450132758', '03163534156', '02626613051', '2582746168', 'هرمزگان خیابان یثربی ساختمان کیقباد کد پستی 1742076636', NULL, NULL),
	(661, 1, 'دکتر کامشاد خوئینی‌ها', '53548140302', '03115853552', '02646779781', '5060186613', 'استان آذربایجان غربی خیابان واعظی ساختمان نیسا کد پستی 9551099823', NULL, NULL),
	(662, 1, 'برید زین‌الدین', '96466693631', '03126737352', '02626697276', '0897987664', 'بوشهر خیابان میرزاده ساختمان داریان پلاک 19 کد پستی 4814278912', NULL, NULL),
	(663, 1, 'نیوند آهنگر', '2263207891', '02674590799', '03142649894', '3306678253', 'گلستان خیابان شبستری ساختمان یعقوب', NULL, NULL),
	(664, 1, 'بیتا پستا', '94969545064', '02139113866', '02117877016', '5265040991', 'زنجان خیابان خداپناهی ساختمان رهام پلاک 38 کد پستی 6105442091', NULL, NULL),
	(665, 1, 'اردلان ناظری', '7773826398', '02162899891', '02638168435', '2045035881', 'همدان خیابان رحماندوست ساختمان امیر کد پستی 6641595901', NULL, NULL),
	(666, 1, 'شمسا بخاری', '29445939145', '03157803388', '02108340529', '4685016399', 'قزوین خیابان دانایی‌فرد ساختمان زکریا پلاک 34 کد پستی 1134115470', NULL, NULL),
	(667, 1, 'گلشهر هوشیار', '22557275201', '02188182721', '03190777304', '0370854273', 'لرستان خیابان تهرانی ساختمان شمسی قطعه 58 کد پستی 9031171289', NULL, NULL),
	(668, 1, 'دکتر سزانه پایا', '71559179636', '03175700440', '02614694335', '0656210098', 'مازندران خیابان میردامادی ساختمان گلاره پلاک 39 کد پستی 0093113304', NULL, NULL),
	(669, 1, 'استاد کامران داور', '38636527210', '02672987490', '02662741003', '5021467839', 'استان همدان خیابان علم ساختمان شهره قطعه 18', NULL, NULL),
	(670, 1, 'نازآفرین تهرانی', '48578241456', '02685717108', '02109496776', '6248038740', 'استان کردستان خیابان دری ساختمان دادبین کد پستی 3814151256', NULL, NULL),
	(671, 1, 'صبا انوشه', '44863231892', '03178702527', '03147389273', '0256367551', 'اردبیل خیابان بختیار ساختمان پروا کد پستی 4365933564', NULL, NULL),
	(672, 1, 'شراره مشا', '2310061306', '02157225094', '03144197418', '4947906943', 'استان آذربایجان غربی خیابان کاویانی ساختمان فرساد', NULL, NULL),
	(673, 1, 'پیوند ثابتی', '13507435458', '03191914870', '02123210458', '5015339216', 'یزد خیابان پناهنده ساختمان ارشد پلاک 79 کد پستی 3187609894', NULL, NULL),
	(674, 1, 'مزدک جنتی', '80047839788', '02106243381', '02134065940', '3212349963', 'استان آذربایجان غربی خیابان صدر ساختمان پیروزدخت', NULL, NULL),
	(675, 1, 'مهندس خرداد الهام', '83249204582', '03191090613', '02633275929', '9462412022', 'چهارمحال و بختیاری خیابان رحماندوست ساختمان زامیاد پلاک 20', NULL, NULL),
	(676, 1, 'فریدون مجرد', '62854097840', '02105401790', '02681774129', '2650830036', 'مرکزی خیابان حائری ساختمان سوران پلاک 69 کد پستی 9043955077', NULL, NULL),
	(677, 1, 'استاد منیلا هومن', '4526662182', '03133786029', '03144200239', '6925459964', 'فارس خیابان مطهری ساختمان طیبه', NULL, NULL),
	(678, 1, 'طیبه ابطحی', '2365473274', '02115785624', '03105513192', '3352866560', 'چهارمحال و بختیاری خیابان سیف‌زاده ساختمان چمن کد پستی 9307835713', NULL, NULL),
	(679, 1, 'هاله بختیاری', '87136600552', '02694805580', '02191782951', '6600679281', 'استان تهران خیابان حقیقی ساختمان انوشه پلاک 65 کد پستی 6485476711', NULL, NULL),
	(680, 1, 'کاژیره ضابطی', '87800122079', '03150315455', '02629271645', '1096127841', 'هرمزگان خیابان چگنی ساختمان هوردخت کد پستی 6525946022', NULL, NULL),
	(681, 1, 'آراسته واعظی', '28900751388', '02180928955', '02686307533', '0979072645', 'قم خیابان مددی ساختمان رجاء', NULL, NULL),
	(682, 1, 'دکتر اورنگ کاویانی', '17032411468', '02196451621', '02662939329', '6780568535', 'خوزستان خیابان واعظ ساختمان سام قطعه 89 کد پستی 5011400875', NULL, NULL),
	(683, 1, 'آقای اوشنر پازوکی', '68011692272', '02104104276', '02680407700', '1136379270', 'زنجان خیابان گلپایگانی ساختمان گلاب', NULL, NULL),
	(684, 1, 'چکاد عبدالکریمی', '29838302379', '03179921061', '02633367841', '3351669119', 'کرمان خیابان سرمد ساختمان شووان پلاک 34 کد پستی 3638556909', NULL, NULL),
	(685, 1, 'دکتر رازان کیان', '86042491751', '02652073973', '02689290486', '0441506267', 'استان گیلان خیابان عنایت ساختمان فرشیده کد پستی 4850997582', NULL, NULL),
	(686, 1, 'میلی پازوکی', '5578235611', '02699222243', '02693397267', '4580979087', 'مازندران خیابان ابطحی ساختمان کیانوش پلاک 67', NULL, NULL),
	(687, 1, 'روح انگیز توسلی', '18988067926', '02182004953', '02628299387', '6163641998', 'استان گلستان خیابان الهام ساختمان فرانه قطعه 36 کد پستی 5328156135', NULL, NULL),
	(688, 1, 'مهندس مهکامه توکل', '72855414782', '03179701193', '03153413065', '1085034110', 'استان کرمان خیابان سبزواری ساختمان گلاره کد پستی 3080343455', NULL, NULL),
	(689, 1, 'ماهرو ترکاشوند', '32545661477', '02191420080', '02138110288', '1928171777', 'استان آذربایجان شرقی خیابان طریقت ساختمان اصغر قطعه 52 کد پستی 4601245185', NULL, NULL),
	(690, 1, 'سیکا پورنگ', '76229558727', '02194943354', '03136808402', '1983722174', 'آذربایجان شرقی خیابان آهنگر ساختمان ایاز', NULL, NULL),
	(691, 1, 'مهرنوش دانایی‌فرد', '5835148866', '02118124902', '03156287243', '2989974701', 'البرز خیابان محدثی ساختمان شیده قطعه 35 کد پستی 9274420745', NULL, NULL),
	(692, 1, 'افسانه کرمانی', '89426602285', '02140494974', '02199388596', '1304393304', 'هرمزگان خیابان صدیقی ساختمان حبیب قطعه 82 کد پستی 9065774267', NULL, NULL),
	(693, 1, 'کاساندان ندوشن', '11588047406', '02134044306', '02650310348', '6633565499', 'استان ایلام خیابان باطنی ساختمان جهانمهر قطعه 33', NULL, NULL),
	(694, 1, 'گلشنک پورناظری', '54468633460', '02670076696', '02642222094', '1041196500', 'استان سیستان و بلوچستان خیابان صفوی ساختمان نظیره', NULL, NULL),
	(695, 1, 'دکتر کامکار نیلوفری', '51562881980', '02138926307', '02670200187', '2340994073', 'استان آذربایجان شرقی خیابان رسولی ساختمان بازیار پلاک 97 کد پستی 3894640792', NULL, NULL),
	(696, 1, 'آذرمهر جهانگیری', '17033015872', '03140565967', '02695153545', '4428550279', 'هرمزگان خیابان نامور ساختمان تابا', NULL, NULL),
	(697, 1, 'آذربُد مصباح‌زاده', '45657318804', '02187416226', '02697593493', '5865710521', 'استان فارس خیابان فروتن ساختمان آرمان قطعه 92 کد پستی 7490881546', NULL, NULL),
	(698, 1, 'ارژنگ شیرمحمدی', '86531754776', '02143550430', '02155642229', '1962887349', 'البرز خیابان رحمانیان ساختمان مرجانه کد پستی 3715883723', NULL, NULL),
	(699, 1, 'شهرباز حیاتی', '6928351983', '02152384726', '02661031844', '0071117245', 'خراسان رضوی خیابان سیف ساختمان مهسو پلاک 75 کد پستی 9142825115', NULL, NULL),
	(700, 1, 'استاد عذرا بزرگیان', '97684350193', '03195573491', '02189880651', '1980091421', 'کرمان خیابان ظریف ساختمان آذر', NULL, NULL),
	(701, 1, 'مهندس فرینام موسویان', '67412693956', '03167331796', '02675161681', '7624538144', 'استان خراسان شمالی خیابان آهی ساختمان عدیله پلاک 72 کد پستی 3018351136', NULL, NULL),
	(702, 1, 'آوند ملایری', '16792802689', '03187335732', '03110854953', '2145228882', 'استان چهارمحال و بختیاری خیابان سراج ساختمان روشاک قطعه 61 کد پستی 9553570829', NULL, NULL),
	(703, 1, 'رامینه ادب', '17274169871', '02143197589', '03134652151', '1532718161', 'استان اصفهان خیابان آیت‌اللهی ساختمان مهرام قطعه 97', NULL, NULL),
	(704, 1, 'مهندس رضا شادمهر', '20765303009', '02182222040', '02639384237', '9609572589', 'استان کرمان خیابان روستا ساختمان فریمان پلاک 83 کد پستی 1772029966', NULL, NULL),
	(705, 1, 'سلمان نیلوفری', '8868851720', '03121089729', '03174402370', '5025182525', 'آذربایجان شرقی خیابان دانایی‌فرد ساختمان فرشته قطعه 12', NULL, NULL),
	(706, 1, 'آویش آیتی', '30248130346', '02674325798', '02685155227', '4172379722', 'زنجان خیابان نراقی ساختمان یاشار پلاک 77 کد پستی 8891838693', NULL, NULL),
	(707, 1, 'مانوش توکلیان', '62251876567', '03114957516', '03138437268', '7880631836', 'استان خراسان شمالی خیابان هومن ساختمان پوریا قطعه 91 کد پستی 9288952889', NULL, NULL),
	(708, 1, 'سریر روحانی', '89026003568', '03101227595', '02606425184', '5667074099', 'آذربایجان غربی خیابان اشراقی ساختمان سهیل پلاک 14 کد پستی 9130156683', NULL, NULL),
	(709, 1, 'پارسا مظفر', '16958206991', '02121645415', '02147020842', '5207202130', 'استان گیلان خیابان هاشمیان ساختمان بامین پلاک 44', NULL, NULL),
	(710, 1, 'کترا ندوشن', '2780074885', '03102633869', '03135709255', '5843811593', 'قزوین خیابان نجفی ساختمان ماهرخ قطعه 30 کد پستی 9552887497', NULL, NULL),
	(711, 1, 'پرتاش فرهنگ', '95109893928', '02107389986', '02113649761', '2226154497', 'البرز خیابان لنکرانی ساختمان خشایار پلاک 68', NULL, NULL),
	(712, 1, 'تلیمان محمدی', '73962848056', '02108097384', '03189077048', '5311445853', 'خوزستان خیابان مرادخانی ساختمان نورا کد پستی 0992070839', NULL, NULL),
	(713, 1, 'هدایت رحماندوست', '71331686373', '03107620152', '02649287315', '2720075279', 'استان اصفهان خیابان هامون ساختمان آرین پلاک 12', NULL, NULL),
	(714, 1, 'اکبر چگنی', '77009801329', '03197560362', '02643040613', '8670205054', 'استان مازندران خیابان حقیقی ساختمان فردید قطعه 48', NULL, NULL),
	(715, 1, 'دکتر ارشیا ارسباران', '85382750974', '02100461448', '03151778269', '7774815440', 'استان کرمانشاه خیابان قهستانی ساختمان پرتام', NULL, NULL),
	(716, 1, 'ویشپر ناظری', '5476667606', '03160321010', '02138678953', '8110741625', 'بوشهر خیابان زهرایی ساختمان فردید قطعه 93', NULL, NULL),
	(717, 1, 'کیانوش فولادوند', '19872111967', '03162505582', '03179563763', '4331867329', 'البرز خیابان موحد ساختمان سزانه', NULL, NULL),
	(718, 1, 'مهرک تهرانی', '33058872497', '02140350623', '03145839304', '3771783057', 'استان آذربایجان غربی خیابان شرف ساختمان کامبد کد پستی 1442001349', NULL, NULL),
	(719, 1, 'آذرفروز سرمد', '66303419745', '03143401904', '02679186674', '1985466138', 'البرز خیابان پورنگ ساختمان آریا کد پستی 7901788261', NULL, NULL),
	(720, 1, 'سامی افخمی', '56508266870', '03132817458', '02675426387', '1847797023', 'یزد خیابان اصلانی ساختمان فرج کد پستی 3292225587', NULL, NULL),
	(721, 1, 'استاد فائقه آشنا', '7026291763', '02173392180', '02170574768', '8242471604', 'خراسان شمالی خیابان برزویی ساختمان نگان کد پستی 9814390054', NULL, NULL),
	(722, 1, 'رامتین اشکوری', '2536314511', '03132211469', '02698472117', '7621460493', 'استان کردستان خیابان محدثی ساختمان شهاب', NULL, NULL),
	(723, 1, 'آقای یاور پورناظری', '30033689133', '02609631554', '02669041149', '7022298746', 'استان زنجان خیابان همت ساختمان کریمداد کد پستی 0113600189', NULL, NULL),
	(724, 1, 'فائقه آشنا', '78187622157', '02614250673', '03104524531', '6977805212', 'لرستان خیابان امین‌زاده ساختمان گلشن کد پستی 4333133070', NULL, NULL),
	(725, 1, 'عنبر قنبری', '5130367440', '02180176097', '03175793026', '2430749147', 'استان چهارمحال و بختیاری خیابان علم ساختمان پورنگ قطعه 28', NULL, NULL),
	(726, 1, 'آذران شاملو', '62109439172', '03110988739', '02640054751', '9871942218', 'هرمزگان خیابان موحد ساختمان رسام قطعه 99', NULL, NULL),
	(727, 1, 'نزهت آشنا', '34160725155', '02671540509', '02112621203', '6003199958', 'استان گیلان خیابان آیتی ساختمان جهانمهر کد پستی 4696103485', NULL, NULL),
	(728, 1, 'وحید سیف‌زاده', '79697983299', '02658995528', '02115681206', '8723095620', 'مرکزی خیابان آریان‌پور ساختمان عادیله قطعه 85 کد پستی 8567235614', NULL, NULL),
	(729, 1, 'نیک آهنگ عبادی', '30174029292', '02698266913', '02659855247', '4095249258', 'خوزستان خیابان واثقی ساختمان سلمان', NULL, NULL),
	(730, 1, 'گودرز داد', '1356776134', '03186711068', '02620015352', '3623924682', 'استان قزوین خیابان منوچهری ساختمان ثمره کد پستی 6210906174', NULL, NULL),
	(731, 1, 'رویا نیشابوری', '22055839384', '03173302637', '03169226943', '9106779110', 'سیستان و بلوچستان خیابان اعتماد ساختمان آریارمنا پلاک 34', NULL, NULL),
	(732, 1, 'ونداد دباغ', '9101840266', '02172922500', '03127614797', '9246965806', 'استان خراسان جنوبی خیابان خرم‌آبادی ساختمان عمید قطعه 96 کد پستی 8659830505', NULL, NULL),
	(733, 1, 'خانم آذرگل سلامت', '65819712463', '02630943120', '03179990783', '9666533485', 'استان همدان خیابان رجایی ساختمان باورد کد پستی 5789597475', NULL, NULL),
	(734, 1, 'اریکا زمردیان', '50098790982', '02659535611', '03131153000', '7227786756', 'استان آذربایجان غربی خیابان شادمهر ساختمان آیدین کد پستی 4747411445', NULL, NULL),
	(735, 1, 'مهندس شهکام کامکار', '884607791', '02134299531', '02667457361', '2667278493', 'مرکزی خیابان سرشار ساختمان احسان پلاک 21', NULL, NULL),
	(736, 1, 'هلاله فنایی', '64717035790', '03163444628', '03193932088', '3679954758', 'گلستان خیابان شبستری ساختمان آیتان پلاک 29 کد پستی 7910070267', NULL, NULL),
	(737, 1, 'پارسادخت شفا', '31602355401', '02190072412', '02188114153', '5804140153', 'آذربایجان شرقی خیابان خوئینی ساختمان ساناز قطعه 22 کد پستی 8371408115', NULL, NULL),
	(738, 1, 'نیکنیا جنتی', '21156300471', '02612184410', '02616132716', '0236378489', 'تهران خیابان پیوندی ساختمان ژاوه پلاک 84', NULL, NULL),
	(739, 1, 'مرداس توفیقی', '7798981871', '03171127926', '02166375970', '5366071680', 'استان کهگیلویه و بویراحمد خیابان آشتیانی ساختمان مهین کد پستی 3454167122', NULL, NULL),
	(740, 1, 'پیروز واعظ', '10982098549', '02129917903', '03139331558', '8843377099', 'استان کرمان خیابان حسابی ساختمان شجاع پلاک 86', NULL, NULL),
	(741, 1, 'ویدا شعبانی', '5298654746', '02602040947', '03117473002', '4456037977', 'استان اصفهان خیابان کلباسی ساختمان بهمن پلاک 60 کد پستی 8736159308', NULL, NULL),
	(742, 1, 'رخند آشتیانی', '22274758608', '02178804326', '03168210340', '3031740251', 'البرز خیابان کیمیایی ساختمان پریشم کد پستی 7068905609', NULL, NULL),
	(743, 1, 'سالومه حکیمی', '13444032770', '02119184464', '02665709815', '9498716358', 'هرمزگان خیابان پارسی ساختمان دانه پلاک 98 کد پستی 3859869918', NULL, NULL),
	(744, 1, 'آبان موسوی', '32144963910', '03124738570', '03105027937', '7342864785', 'استان چهارمحال و بختیاری خیابان آدینه ساختمان پرسته کد پستی 8430523046', NULL, NULL),
	(745, 1, 'آرمین دخت منوچهری', '87939407100', '02652184243', '03134170135', '3208698261', 'خراسان شمالی خیابان کیمیایی ساختمان الیا کد پستی 7449086778', NULL, NULL),
	(746, 1, 'داتیس صدیقی', '87879493182', '02177182497', '02673869836', '4566246027', 'استان فارس خیابان پورنگ ساختمان هانا', NULL, NULL),
	(747, 1, 'استاد چکامه صدر', '3461188076', '02630011118', '02163341489', '2185923699', 'کهگیلویه و بویراحمد خیابان خیابانی ساختمان مازیار کد پستی 0116453277', NULL, NULL),
	(748, 1, 'مهندس نیناد کریمی', '28321599828', '02164155358', '03120686577', '7300775800', 'استان زنجان خیابان لوکس ساختمان روشان قطعه 74 کد پستی 3527984611', NULL, NULL),
	(749, 1, 'آرآسب محجوب', '34862467499', '02154926391', '03117210531', '1300518229', 'قزوین خیابان معین ساختمان اردا', NULL, NULL),
	(750, 1, 'دکتر لیلوپر فاطمی', '93990498884', '02156593518', '03197606494', '6357923874', 'استان خوزستان خیابان وکیلی ساختمان مهرنگ', NULL, NULL),
	(751, 1, 'نعمت شرع‌پسند', '4524767732', '02689701544', '02618630946', '7710293172', 'استان اصفهان خیابان قهرمان ساختمان راضیه', NULL, NULL),
	(752, 1, 'مهندس روشاک عارف', '97122424691', '02119200744', '02143872988', '6761937742', 'استان لرستان خیابان بدخشانی ساختمان افروز', NULL, NULL),
	(753, 1, 'فروز مجتهدی', '50567553647', '02140049105', '03111879949', '3908443912', 'استان یزد خیابان صدیق ساختمان حامده پلاک 64', NULL, NULL),
	(754, 1, 'نامدار افخم', '42713846381', '02175892074', '03179526948', '0493229541', 'استان همدان خیابان مجاهد ساختمان خوروش', NULL, NULL),
	(755, 1, 'خوروش مفتح', '5718980135', '02620239746', '02635664860', '3950490967', 'خوزستان خیابان فرامرزی ساختمان شهره قطعه 84', NULL, NULL),
	(756, 1, 'ارستو آژند', '22413542487', '02137392266', '02658439552', '7882731303', 'استان گیلان خیابان نواب ساختمان ارجمند پلاک 32', NULL, NULL),
	(757, 1, 'چکا خسروپناه', '13364477086', '03163934106', '02163775523', '7689008216', 'استان مازندران خیابان ناظری ساختمان نارین کد پستی 7067682338', NULL, NULL),
	(758, 1, 'مهندس ایده صباغ', '78693256547', '02642579125', '02691852579', '5657490372', 'هرمزگان خیابان ثابتی ساختمان آذرخش قطعه 73', NULL, NULL),
	(759, 1, 'مهندس آذرمینا بیگی', '91514307214', '03163714893', '02644100941', '0372560972', 'استان خراسان شمالی خیابان کمالی ساختمان مهدی قطعه 71 کد پستی 3872018023', NULL, NULL),
	(760, 1, 'نرمینه بیگی', '51777020042', '02143612549', '02638627525', '5381148967', 'استان خراسان جنوبی خیابان جهانی ساختمان ویستا پلاک 86 کد پستی 3894431124', NULL, NULL),
	(761, 1, 'بی بی منوچهری', '30824234657', '02184196915', '02670691473', '5261155950', 'گلستان خیابان کاملی ساختمان نیناد', NULL, NULL),
	(762, 1, 'رعنا فرج', '42815386985', '02650578529', '03186589190', '6297353153', 'البرز خیابان عزیزی ساختمان نازیتا پلاک 29', NULL, NULL),
	(763, 1, 'جواد آقاجری', '91477235780', '02604038460', '02692964940', '9315885750', 'گلستان خیابان لاچینی ساختمان گوماتا پلاک 23 کد پستی 3306544592', NULL, NULL),
	(764, 1, 'شده فاطمی', '52635213623', '03108248948', '02613276643', '2400659800', 'استان فارس خیابان میرسپاسی ساختمان سارنگ کد پستی 9298424824', NULL, NULL),
	(765, 1, 'گلسان دری', '50461590160', '02654615421', '02615808283', '1286065525', 'سیستان و بلوچستان خیابان بیگی ساختمان شروین قطعه 48', NULL, NULL),
	(766, 1, 'یاسمن مفتح', '27956074246', '03130395040', '02604193390', '3784426752', 'استان همدان خیابان بزرگ‌نیا ساختمان فروَد', NULL, NULL),
	(767, 1, 'شاهین خاموشی', '8894393239', '02605188212', '03193471863', '3293506890', 'مرکزی خیابان کهنمویی ساختمان مراجل', NULL, NULL),
	(768, 1, 'جهان تاب بهاور', '32982876741', '02138788877', '02158171392', '6469791008', 'استان بوشهر خیابان کیمیایی ساختمان شعله', NULL, NULL),
	(769, 1, 'خانم سپیدا میدری', '24785055651', '03160213140', '02105439803', '0907042086', 'آذربایجان شرقی خیابان آیتی ساختمان سپینود', NULL, NULL),
	(770, 1, 'فردین مددی', '30223299383', '02665209989', '02100454253', '6016653410', 'سیستان و بلوچستان خیابان نراقی ساختمان سلیم', NULL, NULL),
	(771, 1, 'باربد ابوذر', '27394813173', '02671173317', '02689308508', '8751623358', 'سیستان و بلوچستان خیابان مطهری ساختمان زادفر', NULL, NULL),
	(772, 1, 'مازار اعتماد', '8501392690', '02109415872', '02106508561', '3785562821', 'استان مازندران خیابان رحمانیان ساختمان شارود کد پستی 5670280574', NULL, NULL),
	(773, 1, 'هورداد داد', '65006062492', '02626508377', '02168054108', '6259675717', 'استان همدان خیابان ملایری ساختمان کریمان', NULL, NULL),
	(774, 1, 'دکتر کریمداد ایمانی', '25278750866', '02116898832', '02629218874', '0439550899', 'سمنان خیابان عراقی ساختمان پرشند قطعه 47', NULL, NULL),
	(775, 1, 'شایا شیرمحمدی', '26582112064', '03157135603', '02651731469', '6002249573', 'خراسان رضوی خیابان عقیلی ساختمان میرزا', NULL, NULL),
	(776, 1, 'کوشا گنجی', '25160198686', '02637408471', '03170089007', '1855531160', 'خراسان رضوی خیابان سحاب ساختمان جبّار', NULL, NULL),
	(777, 1, 'سلا ذاکری', '43168197414', '03146127389', '02190589633', '2897848411', 'استان اصفهان خیابان حجتی ساختمان بی بی ناز پلاک 74', NULL, NULL),
	(778, 1, 'کیانوش پیوندی', '8885809107', '02151827238', '03176796282', '8463278512', 'خراسان جنوبی خیابان مطهری ساختمان سپند', NULL, NULL),
	(779, 1, 'روا چنگیزی', '49339462005', '02117262242', '02647593580', '9419027189', 'استان چهارمحال و بختیاری خیابان مصباح ساختمان گوشاسب کد پستی 6488728396', NULL, NULL);
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
  `detail` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`order_id`,`product_pins_id`),
  KEY `FK_order_product_pins_product_pins` (`product_pins_id`),
  CONSTRAINT `FK_order_product_pins_order` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_order_product_pins_product_pins` FOREIGN KEY (`product_pins_id`) REFERENCES `product_pins` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.order_product_pins: ~372 rows (approximately)
/*!40000 ALTER TABLE `order_product_pins` DISABLE KEYS */;
INSERT INTO `order_product_pins` (`order_id`, `product_pins_id`, `count`, `price`, `discount`, `fractional_count`, `defactive_count`, `detail`, `created_at`, `updated_at`) VALUES
	(408, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(409, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(410, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(411, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(412, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(413, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(414, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(415, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(416, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(417, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(418, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(419, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(420, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(421, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(422, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(423, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(424, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(425, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(426, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(427, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(428, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(429, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(430, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(431, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(432, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(433, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(434, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(435, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(436, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(437, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(438, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(439, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(440, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(441, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(442, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(443, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(444, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(445, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(446, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(447, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(448, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(449, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(450, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(451, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(452, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(453, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(454, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(455, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(456, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(457, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(458, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(459, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(460, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(461, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(462, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(463, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(464, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(465, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(466, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(467, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(468, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(469, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(470, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(471, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(472, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(473, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(474, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(475, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(476, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(477, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(478, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(479, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(480, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(481, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(482, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(483, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(484, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(485, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(486, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(487, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(488, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(489, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(490, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(491, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(492, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(493, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(494, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(495, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(496, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(497, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(498, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(499, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(500, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(501, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(502, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(503, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(504, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(505, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(506, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(507, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(508, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(509, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(510, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(511, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(512, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(513, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(514, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(515, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(516, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(517, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(518, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(519, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(520, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(521, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(522, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(523, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(524, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(525, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(526, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(527, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(528, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(529, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(530, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(531, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(532, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(533, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(534, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(535, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(536, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(537, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(538, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(539, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(540, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(541, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(542, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(543, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(544, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(545, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(546, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(547, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(548, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(549, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(550, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(551, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(552, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(553, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(554, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(555, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(556, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(557, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(558, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(559, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(560, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(561, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(562, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(563, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(564, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(565, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(566, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(567, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(568, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(569, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(570, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(571, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(572, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(573, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(574, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(575, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(576, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(577, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(578, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(579, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(580, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(581, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(582, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(583, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(584, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(585, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(586, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(587, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(588, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(589, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(590, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(591, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(592, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(593, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(594, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(595, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(596, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(597, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(598, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(599, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(600, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(601, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(602, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(603, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(604, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(605, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(606, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(607, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(608, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(609, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(610, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(611, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(612, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(613, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(614, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(615, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(616, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(617, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(618, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(619, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(620, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(621, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(622, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(623, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(624, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(625, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(626, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(627, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(628, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(629, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(630, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(631, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(632, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(633, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(634, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(635, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(636, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(637, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(638, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(639, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(640, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(641, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(642, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(643, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(644, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(645, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(646, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(647, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(648, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(649, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(650, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(651, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(652, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(653, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(654, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(655, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(656, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(657, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(658, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(659, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(660, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(661, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(662, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(663, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(664, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(665, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(666, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(667, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(668, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(669, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(670, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(671, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(672, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(673, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(674, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(675, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(676, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(677, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(678, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(679, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(680, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(681, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(682, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(683, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(684, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(685, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(686, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(687, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(688, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(689, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(690, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(691, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(692, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(693, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(694, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(695, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(696, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(697, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(698, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(699, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(700, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(701, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(702, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(703, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(704, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(705, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(706, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(707, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(708, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(709, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(710, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(711, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(712, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(713, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(714, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(715, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(716, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(717, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(718, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(719, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(720, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(721, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(722, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(723, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(724, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(725, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(726, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(727, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(728, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(729, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(730, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(731, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(732, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(733, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(734, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(735, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(736, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(737, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(738, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(739, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(740, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(741, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(742, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(743, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(744, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(745, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(746, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(747, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(748, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(749, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(750, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(751, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(752, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(753, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(754, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(755, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(756, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(757, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(758, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(759, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(760, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(761, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(762, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(763, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(764, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(765, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(766, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(767, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(768, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(769, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(770, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(771, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(772, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(773, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(774, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(775, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(776, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(777, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(778, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL),
	(779, 1, 1, 340000.00, 0.00, 0, 0, NULL, NULL, NULL);
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
  `key` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `url` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `method` enum('GET','POST','PUT','DELETE') COLLATE utf8_unicode_ci NOT NULL,
  `parent` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`key`),
  KEY `parent` (`parent`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.permission: ~39 rows (approximately)
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` (`key`, `title`, `url`, `method`, `parent`, `created_at`, `updated_at`) VALUES
	('anbar_index', 'مدیریت', '/api/backend/anbar', 'GET', 'anbar', '2019-11-29 11:41:15', '2019-11-29 15:54:36'),
	('brand_index', 'مدیریت', '/api/backend/products/brands', 'GET', 'brand', '2019-11-29 11:41:16', '2019-11-29 15:54:37'),
	('brand_show', 'نمایش', '/api/backend/products/brands/{id}', 'GET', 'brand', '2019-11-29 11:41:16', '2019-11-29 15:54:37'),
	('brand_store', 'ذخیره سازی', '/api/backend/products/brands', 'POST', 'brand', '2019-11-29 11:41:16', '2019-11-29 15:54:37'),
	('brand_update', 'به روز رسانی', '/api/backend/products/brands/{id}', 'PUT', 'brand', '2019-11-29 11:41:16', '2019-11-29 15:54:37'),
	('group_attribute_index', 'مدیریت', '/api/backend/products/attributes', 'GET', 'group_attribute', '2019-11-29 11:41:16', '2019-11-29 15:54:36'),
	('group_attribute_show', 'نمایش', '/api/backend/products/attributes/{id}', 'GET', 'group_attribute', '2019-11-29 11:41:16', '2019-11-29 15:54:36'),
	('group_attribute_store', 'ذخیره سازی', '/api/backend/products/attributes', 'POST', 'group_attribute', '2019-11-29 11:41:16', '2019-11-29 15:54:36'),
	('group_attribute_update', 'به روز رسانی', '/api/backend/products/attributes/{id}', 'PUT', 'group_attribute', '2019-11-29 11:41:16', '2019-11-29 15:54:37'),
	('order_fractive_request', 'درخواست کسری یا موجودی', '/api/backend/orders/{id}/fractive-request', 'POST', 'order', '2019-11-29 11:41:15', '2019-11-29 15:54:36'),
	('order_index', 'مدیریت', '/api/backend/orders', 'GET', 'order', '2019-11-29 11:41:15', '2019-11-29 15:54:36'),
	('order_show', 'نمایش', '/api/backend/orders/{id}', 'GET', 'order', '2019-11-29 11:41:15', '2019-11-29 15:54:36'),
	('order_update', 'به روز رسانی', '/api/backend/orders/{id}', 'PUT', 'order', '2019-11-29 11:41:15', '2019-11-29 15:54:36'),
	('permission_index', 'مدیریت', '/api/backend/users/permissions', 'GET', 'permission', '2019-11-29 11:41:18', '2019-11-29 15:54:38'),
	('permission_initial', 'ایجاد اولیه', '/api/backend/users/permissions/initial', 'GET', 'permission', '2019-11-29 11:41:17', '2019-11-29 15:54:37'),
	('product_category_get_attributes', 'ویژگی ها', '/api/backend/products/categories/{id}/attributes', 'GET', 'product_category', '2019-11-29 11:41:16', '2019-11-29 15:54:36'),
	('product_category_index', 'مدیریت', '/api/backend/products/categories', 'GET', 'product_category', '2019-11-29 11:41:15', '2019-11-29 15:54:36'),
	('product_category_show', 'نمایش', '/api/backend/products/categories/{id}', 'GET', 'product_category', '2019-11-29 11:41:15', '2019-11-29 15:54:36'),
	('product_category_store', 'ذخیره سازی', '/api/backend/products/categories', 'POST', 'product_category', '2019-11-29 11:41:15', '2019-11-29 15:54:36'),
	('product_category_store_attributes', 'دخیره سازی ویژگی ها', '/api/backend/products/categories/{id}/attributes', 'POST', 'product_category', '2019-11-29 11:41:16', '2019-11-29 15:54:36'),
	('product_category_update', 'به روز رسانی', '/api/backend/products/categories/{id}', 'PUT', 'product_category', '2019-11-29 11:41:16', '2019-11-29 15:54:36'),
	('product_change_status', 'تغییر وضعیت', '/api/backend/products/{id}/change/status', 'PUT', 'product', '2019-11-29 11:41:17', '2019-11-29 15:54:37'),
	('product_index', 'مدیریت', '/api/backend/products', 'GET', 'product', '2019-11-29 11:41:16', '2019-11-29 15:54:37'),
	('product_pins', 'قیمت تخفیف و تعداد محصول', '/api/backend/products/{id}/pins', 'GET', 'product', '2019-11-29 11:41:17', '2019-11-29 15:54:37'),
	('product_product_attributes', 'ویژگی های گروهی محصول', '/api/backend/products/{id}/categories/{categories}/attributes', 'GET', 'product', '2019-11-29 11:41:17', '2019-11-29 15:54:37'),
	('product_show', 'نمایش', '/api/backend/products/{id}', 'GET', 'product', '2019-11-29 11:41:17', '2019-11-29 15:54:37'),
	('product_store', 'ذخیره سازی', '/api/backend/products', 'POST', 'product', '2019-11-29 11:41:17', '2019-11-29 15:54:37'),
	('product_store_pins', 'ذخیره سازی قیمت تخفیف و تعداد محصول', '/api/backend/products/{id}/pins', 'POST', 'product', '2019-11-29 11:41:17', '2019-11-29 15:54:37'),
	('product_update', 'به روز رسانی', '/api/backend/products/{id}', 'PUT', 'product', '2019-11-29 11:41:17', '2019-11-29 15:54:37'),
	('role_index', 'مدیریت', '/api/backend/users/roles', 'GET', 'role', '2019-11-29 11:41:18', '2019-11-29 15:54:38'),
	('role_permissions', 'سطوح دسترسی', '/api/backend/users/roles/{role}/permissions', 'GET', 'role', '2019-11-29 11:41:18', '2019-11-29 15:54:38'),
	('role_set_permission', 'ست کردن سطح دسترسی', '/api/backend/users/roles/{role}/permissions', 'PUT', 'role', '2019-11-29 11:41:18', '2019-11-29 15:54:38'),
	('role_store', 'ذخیره سازی', '/api/backend/users/roles', 'POST', 'role', '2019-11-29 11:41:18', '2019-11-29 15:54:38'),
	('user_change_password', 'تغییر رمز', '/api/backend/users/{id}/change-password', 'PUT', 'user', '2019-11-29 11:41:18', '2019-11-29 15:54:38'),
	('user_change_status', 'تغییر وضعیت', '/api/backend/users/{id}/change-status', 'PUT', 'user', '2019-11-29 11:41:18', '2019-11-29 15:54:38'),
	('user_index', 'مدیریت', '/api/backend/users', 'GET', 'user', '2019-11-29 11:41:18', '2019-11-29 15:54:38'),
	('user_show', 'نمایش', '/api/backend/users/{id}', 'GET', 'user', '2019-11-29 11:41:18', '2019-11-29 15:54:38'),
	('user_store', 'ذخیره سازی', '/api/backend/users', 'POST', 'user', '2019-11-29 11:41:18', '2019-11-29 15:54:38'),
	('user_update', 'به روز رسانی', '/api/backend/users/{id}', 'PUT', 'user', '2019-11-29 11:41:18', '2019-11-29 15:54:38');
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;

-- Dumping structure for table 517_shop.permission_role
CREATE TABLE IF NOT EXISTS `permission_role` (
  `role_key` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `permission_key` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`role_key`,`permission_key`),
  KEY `FK_permission_role_permission` (`permission_key`),
  CONSTRAINT `FK_permission_role_permission` FOREIGN KEY (`permission_key`) REFERENCES `permission` (`key`) ON UPDATE CASCADE,
  CONSTRAINT `FK_permission_role_role` FOREIGN KEY (`role_key`) REFERENCES `role` (`key`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.permission_role: ~129 rows (approximately)
/*!40000 ALTER TABLE `permission_role` DISABLE KEYS */;
INSERT INTO `permission_role` (`role_key`, `permission_key`) VALUES
	('admin', 'brand_index'),
	('admin', 'brand_show'),
	('admin', 'brand_store'),
	('admin', 'brand_update'),
	('admin', 'group_attribute_index'),
	('admin', 'group_attribute_show'),
	('admin', 'group_attribute_store'),
	('admin', 'group_attribute_update'),
	('admin', 'order_index'),
	('admin', 'order_show'),
	('admin', 'permission_index'),
	('admin', 'permission_initial'),
	('admin', 'product_category_get_attributes'),
	('admin', 'product_category_index'),
	('admin', 'product_category_show'),
	('admin', 'product_category_store'),
	('admin', 'product_category_store_attributes'),
	('admin', 'product_category_update'),
	('admin', 'product_change_status'),
	('admin', 'product_index'),
	('admin', 'product_pins'),
	('admin', 'product_product_attributes'),
	('admin', 'product_show'),
	('admin', 'product_store'),
	('admin', 'product_store_pins'),
	('admin', 'product_update'),
	('admin', 'role_index'),
	('admin', 'role_permissions'),
	('admin', 'role_set_permission'),
	('admin', 'role_store'),
	('admin', 'user_change_password'),
	('admin', 'user_change_status'),
	('admin', 'user_index'),
	('admin', 'user_show'),
	('admin', 'user_store'),
	('admin', 'user_update'),
	('anbar_dar', 'anbar_index'),
	('anbar_dar', 'brand_index'),
	('anbar_dar', 'brand_show'),
	('anbar_dar', 'order_fractive_request'),
	('anbar_dar', 'order_index'),
	('anbar_dar', 'order_show'),
	('anbar_dar', 'order_update'),
	('anbar_dar', 'user_index'),
	('anbar_dar', 'user_show'),
	('dddd', 'permission_index'),
	('dddd', 'permission_initial'),
	('dddd', 'role_index'),
	('dddd', 'role_permissions'),
	('dddd', 'role_set_permission'),
	('dddd', 'role_store'),
	('dddd', 'user_change_password'),
	('dddd', 'user_change_status'),
	('dddd', 'user_index'),
	('dddd', 'user_show'),
	('dddd', 'user_store'),
	('dddd', 'user_update'),
	('operrator', 'brand_index'),
	('operrator', 'brand_show'),
	('operrator', 'order_index'),
	('operrator', 'order_show'),
	('operrator', 'product_category_index'),
	('operrator', 'product_index'),
	('operrator', 'product_show'),
	('operrator', 'user_change_password'),
	('operrator', 'user_change_status'),
	('operrator', 'user_index'),
	('operrator', 'user_show'),
	('operrator', 'user_update'),
	('programmer', 'anbar_index'),
	('programmer', 'brand_index'),
	('programmer', 'brand_show'),
	('programmer', 'brand_store'),
	('programmer', 'brand_update'),
	('programmer', 'group_attribute_index'),
	('programmer', 'group_attribute_show'),
	('programmer', 'group_attribute_store'),
	('programmer', 'group_attribute_update'),
	('programmer', 'order_fractive_request'),
	('programmer', 'order_index'),
	('programmer', 'order_show'),
	('programmer', 'order_update'),
	('programmer', 'permission_index'),
	('programmer', 'permission_initial'),
	('programmer', 'product_category_get_attributes'),
	('programmer', 'product_category_index'),
	('programmer', 'product_category_show'),
	('programmer', 'product_category_store'),
	('programmer', 'product_category_store_attributes'),
	('programmer', 'product_category_update'),
	('programmer', 'product_change_status'),
	('programmer', 'product_index'),
	('programmer', 'product_pins'),
	('programmer', 'product_product_attributes'),
	('programmer', 'product_show'),
	('programmer', 'product_store'),
	('programmer', 'product_store_pins'),
	('programmer', 'product_update'),
	('programmer', 'role_index'),
	('programmer', 'role_permissions'),
	('programmer', 'role_set_permission'),
	('programmer', 'role_store'),
	('programmer', 'user_change_password'),
	('programmer', 'user_change_status'),
	('programmer', 'user_index'),
	('programmer', 'user_show'),
	('programmer', 'user_store'),
	('programmer', 'user_update'),
	('super_admin', 'anbar_index'),
	('super_admin', 'brand_index'),
	('super_admin', 'brand_show'),
	('super_admin', 'brand_store'),
	('super_admin', 'brand_update'),
	('super_admin', 'group_attribute_index'),
	('super_admin', 'group_attribute_show'),
	('super_admin', 'group_attribute_store'),
	('super_admin', 'group_attribute_update'),
	('super_admin', 'order_fractive_request'),
	('super_admin', 'order_index'),
	('super_admin', 'order_show'),
	('super_admin', 'order_update'),
	('super_admin', 'permission_index'),
	('super_admin', 'permission_initial'),
	('super_admin', 'product_category_get_attributes'),
	('super_admin', 'product_category_index'),
	('super_admin', 'product_category_show'),
	('super_admin', 'product_category_store'),
	('super_admin', 'product_category_store_attributes'),
	('super_admin', 'product_category_update'),
	('super_admin', 'product_change_status'),
	('super_admin', 'product_index'),
	('super_admin', 'product_pins'),
	('super_admin', 'product_product_attributes'),
	('super_admin', 'product_show'),
	('super_admin', 'product_store'),
	('super_admin', 'product_store_pins'),
	('super_admin', 'product_update'),
	('super_admin', 'role_index'),
	('super_admin', 'role_permissions'),
	('super_admin', 'role_set_permission'),
	('super_admin', 'role_store'),
	('super_admin', 'user_change_password'),
	('super_admin', 'user_change_status'),
	('super_admin', 'user_index'),
	('super_admin', 'user_show'),
	('super_admin', 'user_store'),
	('super_admin', 'user_update');
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
  `key` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.role: ~11 rows (approximately)
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` (`key`, `title`, `created_at`, `updated_at`) VALUES
	('aaa', 'یلیبلیبل', '2019-12-09 09:59:46', '2019-12-09 09:59:46'),
	('admin', 'ادمین', '2019-11-29 10:26:16', '2019-11-29 10:26:16'),
	('anbar_dar', 'انباردار', '2019-11-29 10:27:54', '2019-11-29 10:27:54'),
	('content_manager', 'مدیر محتوا', '2019-11-29 10:26:59', '2019-11-29 10:27:24'),
	('crm_admin', 'مدیر CRM', '2019-11-29 10:29:30', '2019-11-29 10:29:30'),
	('crm_operator', 'اپراتور CRM', '2019-12-09 08:08:15', '2019-12-09 08:08:15'),
	('dddd', 'dddd', '2019-12-09 09:59:57', '2019-12-09 09:59:57'),
	('operrator', 'اپراتور', '2019-11-29 10:26:30', '2019-11-29 10:26:30'),
	('product_charger', 'مسئول شارژ محصولات', '2019-11-29 10:28:22', '2019-11-29 10:28:22'),
	('programmer', 'تیم برنامه نویس', '2019-11-29 10:25:41', '2019-11-29 10:25:41'),
	('rrrrr', 'rrrrrrrrr', '2019-12-09 10:00:07', '2019-12-09 10:00:07'),
	('super_admin', 'سوپر ادمین', '2019-11-29 10:25:52', '2019-11-29 10:25:52'),
	('test', 'تست', '2019-12-09 08:08:36', '2019-12-09 08:08:36'),
	('ییی', 'ییی', '2019-12-09 08:10:52', '2019-12-09 08:10:52');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;

-- Dumping structure for table 517_shop.social_media
CREATE TABLE IF NOT EXISTS `social_media` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) COLLATE utf8_persian_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- Dumping data for table 517_shop.social_media: ~10 rows (approximately)
/*!40000 ALTER TABLE `social_media` DISABLE KEYS */;
INSERT INTO `social_media` (`id`, `title`) VALUES
	(1, 'اینستاگرام'),
	(2, 'کانال تلگرام'),
	(3, 'فیس بوک'),
	(4, 'توئیتر'),
	(5, 'لینکدین'),
	(6, 'گیت هاب'),
	(7, 'گوگل پلاس'),
	(8, 'یوتیوب'),
	(9, 'اپارات'),
	(10, 'ویرگول');
/*!40000 ALTER TABLE `social_media` ENABLE KEYS */;

-- Dumping structure for table 517_shop.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `mobile` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `domain` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `role_key` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `validation_code` int(5) DEFAULT NULL,
  `verify_account` tinyint(1) NOT NULL DEFAULT 0,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mobile_domain` (`mobile`,`domain`),
  KEY `role_key` (`role_key`),
  KEY `FK_users_domain` (`domain`),
  CONSTRAINT `FK_users_domain` FOREIGN KEY (`domain`) REFERENCES `domain` (`key`) ON UPDATE CASCADE,
  CONSTRAINT `FK_users_role` FOREIGN KEY (`role_key`) REFERENCES `role` (`key`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.users: ~2 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `mobile`, `domain`, `role_key`, `name`, `status`, `validation_code`, `verify_account`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
	(1, '09398624739', 'localhost:3000', 'programmer', 'مهرداد معصومی', 1, 1, 1, '70082665', NULL, '2019-11-29 17:18:50', '2019-11-29 17:18:50'),
	(2, '09120246217', 'localhost:3000', 'programmer', 'مهداد', 1, 58709, 1, '$2y$10$qQqMnT3dQTRGZYmAaX0LsOOKieaM2BYxo99iYyUqZraV8DUFKmjPa', '$2y$10$yHkE16OzI8G6XKUqglnnHOuZ1lXPU247V8w1CQfzH6yB.f2EyW03e', '2019-11-30 20:13:25', '2019-12-09 14:18:36'),
	(3, '09361753251', 'localhost:3000', 'super_admin', 'dddd', 0, NULL, 0, '70082665', NULL, '2019-12-09 10:04:44', '2019-12-09 11:27:56');
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
