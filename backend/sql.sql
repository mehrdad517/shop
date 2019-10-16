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

-- Dumping structure for table 517_shop.brand
CREATE TABLE IF NOT EXISTS `brand` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(50) COLLATE utf8_persian_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8_persian_ci DEFAULT NULL,
  `content` text COLLATE utf8_persian_ci DEFAULT NULL,
  `meta_title` varchar(255) COLLATE utf8_persian_ci DEFAULT NULL,
  `meta_description` varchar(255) COLLATE utf8_persian_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `brand_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- Dumping data for table 517_shop.brand: ~0 rows (approximately)
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
INSERT INTO `brand` (`id`, `title`, `slug`, `content`, `meta_title`, `meta_description`, `is_active`, `created_at`, `updated_at`) VALUES
	(1, 'تو کفش یکی از.', NULL, NULL, NULL, NULL, 1, NULL, NULL),
	(2, 'به فرهنگ.', NULL, NULL, NULL, NULL, 1, NULL, NULL),
	(3, 'معلم‌ها هم.', NULL, NULL, NULL, NULL, 1, NULL, NULL),
	(4, 'بودیم که در.', NULL, NULL, NULL, NULL, 1, NULL, NULL),
	(5, 'یک نفر نقشه.', NULL, NULL, NULL, NULL, 1, NULL, NULL),
	(6, 'اعلا رساندم.', NULL, NULL, NULL, NULL, 1, NULL, NULL),
	(7, 'آمده بود.', NULL, NULL, NULL, NULL, 1, NULL, NULL),
	(8, 'پاسگاه همین.', NULL, NULL, NULL, NULL, 1, NULL, NULL),
	(9, 'خوردن عجله.', NULL, NULL, NULL, NULL, 1, NULL, NULL),
	(10, 'دو نفر از.', NULL, NULL, NULL, NULL, 1, NULL, NULL),
	(11, 'هن هن.', NULL, NULL, NULL, NULL, 1, NULL, NULL),
	(12, 'نشود و قول و.', NULL, NULL, NULL, NULL, 1, NULL, NULL),
	(13, 'از معلم‌ها.', NULL, NULL, NULL, NULL, 1, NULL, NULL),
	(14, 'روی چهار.', NULL, NULL, NULL, NULL, 1, NULL, NULL),
	(15, 'این آدم‌ها.', NULL, NULL, NULL, NULL, 1, NULL, NULL),
	(16, 'هم بود درشت.', NULL, NULL, NULL, NULL, 1, NULL, NULL),
	(17, 'صدا زدم و.', NULL, NULL, NULL, NULL, 1, NULL, NULL),
	(18, 'آمریکاییه.', NULL, NULL, NULL, NULL, 1, NULL, NULL),
	(19, 'گفتم: -.', NULL, NULL, NULL, NULL, 1, NULL, NULL),
	(20, 'را هم با.', NULL, NULL, NULL, NULL, 1, NULL, NULL);
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;

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
) ENGINE=InnoDB AUTO_INCREMENT=294 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.migrations: ~18 rows (approximately)
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
	(276, '2014_10_12_000000_create_users_table', 1),
	(277, '2014_10_12_100000_create_password_resets_table', 1),
	(278, '2016_06_01_000001_create_oauth_auth_codes_table', 1),
	(279, '2016_06_01_000002_create_oauth_access_tokens_table', 1),
	(280, '2016_06_01_000003_create_oauth_refresh_tokens_table', 1),
	(281, '2016_06_01_000004_create_oauth_clients_table', 1),
	(282, '2016_06_01_000005_create_oauth_personal_access_clients_table', 1),
	(283, '2019_08_19_000000_create_failed_jobs_table', 1),
	(284, '2019_08_19_064142_create_products_table', 1),
	(285, '2019_08_19_064614_create_orders_table', 1),
	(286, '2019_08_19_064643_create_order_products_pins', 1),
	(287, '2019_08_21_092525_craete_setting_table', 1),
	(288, '2019_08_21_094719_craete_slider_table', 1),
	(289, '2019_08_22_192303_create_product_category_table', 1),
	(290, '2019_10_04_154639_create_permission', 1),
	(291, '2019_10_05_081416_create_role_table', 1),
	(292, '2019_10_05_120513_create_permission_role_table', 1),
	(293, '2019_10_16_130851_create_brand_table', 1);
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
  `brand_id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  `code` varchar(50) COLLATE utf8_persian_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8_persian_ci DEFAULT NULL,
  `count` int(11) NOT NULL DEFAULT 0,
  `price` int(11) NOT NULL,
  `discount` int(11) NOT NULL DEFAULT 0,
  `content` text COLLATE utf8_persian_ci NOT NULL,
  `meta_title` varchar(255) COLLATE utf8_persian_ci DEFAULT NULL,
  `meta_description` varchar(255) COLLATE utf8_persian_ci DEFAULT NULL,
  `sales_number` int(11) NOT NULL DEFAULT 0,
  `visitor` int(11) NOT NULL DEFAULT 0,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_slug_unique` (`slug`),
  KEY `products_brand_id_index` (`brand_id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- Dumping data for table 517_shop.products: ~0 rows (approximately)
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` (`id`, `brand_id`, `title`, `code`, `slug`, `count`, `price`, `discount`, `content`, `meta_title`, `meta_description`, `sales_number`, `visitor`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 2, 'خورده بودند. ساده‌ترین شکل بازی‌هایشان در ربع.', 'DC-32', 'inventore-et-qui-maxime', 811, 72889, 0, 'دوم اسفند. سؤال‌ها را سه نفری آمده بودند مدرسه. ناهار هم به خرج ناظم خورده بودند. و ترسی هم از چُرت در آمد.', 'برایش آب بیاورد. یادم هست آن روز صبح که رسیدم، ناظم هنوز نیامده بود. اما پرونده تصریحی نداشت که راننده که بوده..', 'حسن اخلاق. نمی‌آن که... - این مزخرفات کدومه آقا! حرف حساب سرکار چیه؟ و حرکتی کردم که ناشیانه دود کرد از ترس و.', 0, 0, 0, '1982-08-02 21:49:12', '2003-04-20 08:14:38', NULL),
	(2, 3, 'نمی‌نمود. اما بچه‌اش کلاس سوم سراغ کار و بار هر.', 'DC-10', 'est-sunt-aliquid-voluptatibus-quo-cum', 234, 43120, 0, 'بدی نکردی بابا جان. فهمیدی؟ اما می‌خواهم ببینم چه می‌نویسد. ولی چنان مضطرب می‌شدند و دوباره از نو. و این.', 'زیر و رو باخته و بچه‌شان عیناً مثل این عروسک‌های کوکی. سلام و علیک و نشستند. خدایا دیگر چه اتفاقی می‌افتاد..', 'این بود که از دور علم افراشته‌ی هیکل معلم کلاس سه ورزش دارند. گفتم بنشینند دیکته بنویسند آقا. معلم حساب پنج و.', 0, 0, 0, '1976-04-11 05:12:52', '1974-02-14 06:39:25', NULL),
	(3, 8, 'ندارم که بگویم. و از اهلش پرسیدم. از یک فحش نیمه‌کاره.', 'DC-99', 'temporibus-minus-maiores-dolores-voluptate-iste-quia', 165, 66747, 0, 'داشتند، ولی در برنامه به هر کدام‌شان هجده ساعت درس بدهیم، به شرط آن که بفهمی نفهمی، دلال کارم بود. و تازه خلوت.', 'آقای مدیر! اصلاً دوستی سرشون نمی‌شه. تو سَری می‌خوان. ملاحظه کنید بنده با چه اطمینانی به مدرسه رفتم و به.', 'گفتم: - تا سر دماغش بیشتر نیست. و تازه اگر ندیده می‌گرفتم چه؟ باز باید تمرین کنی که مبادا جلویم در بیاید که - به.', 0, 0, 0, '1992-05-23 06:44:17', '1977-03-20 01:12:24', NULL),
	(4, 19, 'که معلم حق ندارد این قدر احمق است که هفته‌ای یک بار.', 'DC-91', 'corrupti-aperiam-qui-et-totam-aliquid', 999, 60903, 0, 'صدای هالتر بود. ناظم سر خود رفته بود و حل شد و رونقی گرفت. فراش جدید که خودش آمده بود این‌جا. پدرش دو تا زن.', 'تند کرد. به خیر گذشت. شاید اتوبوسش دیر کرده. شاید راه‌بندان بوده؛ جاده قرق بوده و به دفتر .پرسید غیر از.', 'مدرسه را خراب کرده‌اند و اعتماد اهل محله را چه بدهد؟ ناچار خواهر او را هم پرسیدم. هر چه باشد یک فراش دیگر از او.', 0, 0, 1, '1970-02-11 15:52:02', '1988-03-24 20:15:08', NULL),
	(5, 14, 'که رفع تکلیف می‌کند. زنگ را گفتم که چه طور می‌شد چنین.', 'DC-47', 'et-voluptas-officiis-sit-ut-optio', 192, 66831, 0, 'و همه‌ی حق و حساب‌دان شده بودند و راننده‌ها توی یکی از ایوان افتاد؛ چه خاکی به سرم خواهم ریخت؟ حالا من چه.', 'بعد با صراحت بهش فهماندم که گر چه معلم جماعت کجا پولش به عرق می‌رسه؟ حالا بدو زغال آورده‌اند. و همین طور مردد.', 'کلاس چهارم روی تخت بود و مثل این که می‌خواست چیزی بگوید که پیش رئیس فرهنگ، صاف برگشتم به اتاقم. یادداشتی برای.', 0, 0, 0, '2004-10-09 22:26:14', '2016-08-02 10:54:23', NULL),
	(6, 2, 'که در ایوان بالا ایستاده بودم و هم‌چه اتفاقی.', 'DC-14', 'iste-et-earum-est-vel-similique', 788, 73002, 0, 'طول می‌کشید. و تازه اگر ندیده می‌گرفتم چه؟ باز باید بر می‌گشتم به این زودی‌ها از سولدونی در خواهد آمد. فکر.', 'کمی این دست و پا به پا می‌شد که چرا اسم پسر او را می‌پرسد و این‌که چرا تا حالا صد تا کاغذ به ادارفردا صبح رفتم.', 'من گوش می‌کردم و مثل این عروسک‌های کوکی. سلام و احوالپرسی و بعد هم دوندگی در اداره‌ی بیمه و قرار شد من سر صف.', 0, 0, 0, '2005-02-25 23:11:43', '1976-04-05 15:15:03', NULL),
	(7, 1, 'و همان توی حیاط تا نفسی تازه کنیم وضع مالی و بودجه و.', 'DC-95', 'numquam-beatae-explicabo-non-maxime-culpa-nostrum-sed-voluptatum', 591, 55231, 0, 'برای خالی نبودن عریضه رونویس را با خودش تو آورده بود، گفت: - دردسر عجیبی شده آقا. تا حالا پاکش نکردی؟ - به! آخه.', 'بیمارستان او بدهند و عصر پس از مدتی رفتم مدرسه و شهادت همه‌ی معلم‌ها در بیاید که - به سر دیوار گلی یک باغ پیدا.', 'ندارد و باید طبق مقررات رفتار می‌کردیم و بدیش همین بود. کم کم خودمان را بگذاریم برای بعد. مثلاً می‌خواست.', 0, 0, 1, '1980-03-30 09:47:01', '2006-03-02 21:01:05', NULL),
	(8, 3, 'اقلاً نپوسد. حتی اگر بخواهی یک معلم کوفتی باشی، نه چرا.', 'DC-52', 'aut-ut-debitis-veniam-corporis-laudantium-qui', 66, 46356, 0, 'چون لابد به همین علت بچه شما دو سال در یک دقیقه همه‌ی درد دل‌هایش را کرد و صندلی آورد و چای و احترامات متقابل!.', 'که ننشسته از تحصیلاتش و از این حرف زدیم که الحمدالله مدرسه مرتب است و وعده‌ها دادیم که معلمش را دم خورشید.', 'هم نبود. به همان توی حیاط مدرسه، خالی کردیم و سومی را دم خورشید کباب کنیم و از در آمده بود. یک روز هم مالک مدرسه.', 0, 0, 1, '1997-10-26 16:16:11', '1983-02-03 22:22:27', NULL),
	(9, 18, 'تعجب بود. به این فکر افتادم که از هر چیز به جای هر جوابی.', 'DC-22', 'cumque-itaque-ea-sequi-et-necessitatibus-quae-quidem', 569, 85873, 0, 'و خودم را به زحمت شما نبودیم...» که عرق سرد بر بدن من نشست. چایی‌ام را که فراش جدید فوری از باغ همسایه آورده.', 'خشک می‌کردند. و خیلی چیزهاشان از او پرسیدم: - چند؟ - دو تومنش دادم آقا. - زحمت کشیدی. نگفتی از کجا آورده؟ - من که.', 'دیگری رنگ و رو باخته و بچه‌شان عیناً مثل این که صدایش را در حضور ما زده باشند. و اجازه دادند معلم کلاس پنج تون.', 0, 0, 1, '1992-04-03 18:33:30', '1984-01-15 01:36:18', NULL),
	(10, 19, 'بزک فحش هنوز باقی بود. قرائت فارسی داشتند. معلم.', 'DC-13', 'aliquid-unde-sit-culpa-harum', 954, 78834, 0, 'وزارت خانه بود و حل شد و بر سر مملکت. اوایل امر توجهی به بچه‌ها نداشتم. خیال می‌کردم اختلاف سِنی میان‌مان آن.', 'دیگری هم برای کمک به آن‌ها آمد. فراش قدیمی مدرسه دم در مدرسه تنها ماندم و پدر. اما حرف نمی‌زد. به خودش اطمینان.', 'می‌دیدیم. خودم با معلم هر کلاس و بعد بی این که کار به دادگستری و این جور سرگرمی‌ها را می‌گفت، که جوانکی بود.', 0, 0, 1, '2014-11-30 12:51:21', '1989-08-21 07:55:04', NULL),
	(11, 12, 'دیده بود. تقریباً می‌دوید. تحمل این یکی را به فرهنگ که.', 'DC-84', 'recusandae-dignissimos-quia-tempora', 332, 70160, 0, 'مردنی حقوق دیگران چنان خجالت کشیدم که انگار مال آن‌ها را دزدیده‌ام. و تازه چند؟ بهترین شاگردها دوازده. و.', 'پدرشان فقیرتر است به نظر می‌آمد و پدر همان بچه‌ی شیطان. و یک دنیا حرف و سخنی پیش آمد. فقط می‌بایست به ناظم.', 'ما بیفتد. دنبال سفته‌ها می‌گشتند، به حسابدار قبلی فحش می‌دادند، التماس می‌کردند که این کتک‌کاری را باید.', 0, 0, 1, '1977-10-14 18:12:36', '2003-11-14 11:05:57', NULL),
	(12, 6, 'حرف می‌زند کجا را نگاه می‌کند. با هر جیغ کوتاهی که.', 'DC-18', 'sequi-vel-mollitia-qui-rem-omnis-nihil-ut', 322, 60335, 0, 'و موهای زبرش را به امضا رسانده بودم. توصیه هم برده بودم و خوانده بودم. اگر یک خرده می‌دویدی تا دو روز تب داشت..', 'نزدیک آخر وقت یک جفت پدر و مادر، بچه‌شان در میان، وارد اتاق شدند. یکی بر افروخته و دیگری باز یکی ازین.', 'محبتی نمی‌بیند و غیب‌گویی‌های دیگر... تا عاقبت رسید.... احضاریه‌ای با تعیین وقت قبلی برای دو روز تمام مدرسه.', 0, 0, 1, '2007-09-19 06:24:24', '1987-10-03 21:13:00', NULL),
	(13, 15, 'مرتفعی در مقابل فرار احتمالی فرهنگ و معلومات مدارس ما.', 'DC-6', 'id-aut-voluptates-qui-qui-consequatur', 847, 55314, 0, 'و خنده‌ای و رفت. ناگهان ناظم از در وارد شد و دست بچه را گرفت و رفت سراغ تلفن. دو سه کلمه برای بچه‌ها کفش و لباس.', 'احتیاجی به من چه بکنم؟ به او انداختم و بعد سه تا سه روز دیگر موعد سور بود، اصلاً یادم نیست چه کردم. اما همه‌اش.', 'شده بود و حالا ناظم مدرسه، داشت به من فقط یک روز هم نشانی مدرسه را وادارد که شن برایمان بفرستد به شرط آن که.', 0, 0, 1, '1975-11-25 22:53:46', '1983-04-15 14:53:24', NULL),
	(14, 2, 'مدرسه را وارسی و صورت‌برداری و ناظم برایم گفت که من.', 'DC-78', 'alias-in-eum-cupiditate-perspiciatis-autem-qui', 984, 49438, 0, 'و نیم درست نشست. ماهی یک بار می‌آمد و پدر بچه در حال نماز خواندن بود. و رونویس حکم را به انجمن ندادیم. وقتی به.', 'همین جورها هم باشد. کم کم قرار شد قبل و منقلی تهیه کنند و داس چکش بکشند آقا. رئیس‌شون رو که گرفتند چه جونی کندم.', 'را می‌کوبیدم. ده روز تمام، قلب من و ناظم باید می‌رفتیم. معلم کلاس چهار گفت: - اگه فحشمون هم می‌دادند من باز.', 0, 0, 0, '2008-11-08 00:33:41', '1986-01-23 17:03:20', NULL),
	(15, 12, 'و پایی‌شان بود. آرام و مثلاً خالی از نفسِ به.', 'DC-60', 'corporis-dolorum-est-autem-ut-pariatur', 659, 74238, 0, 'می‌دهند. حتم دارم که اگر توی کوچه ببینی، خیال می‌کنی مدیر کل است. لفظ قلم حرف می‌زد همه‌اش درین فکر بودم که.', 'آوردند. سیگارم را توی جیبم گذاشتم و بی سر و دستی برای این وسط بیابان و مدرسه‌ای پر از بوهای مخصوص بود. هن هن.', 'امروز می‌خواند سیگار براشون بخرم، فردا می‌فرستنم سراغ عرق. من این‌ها رو می‌شناسم. راست می‌گفت. زودتر از.', 0, 0, 0, '1987-06-25 01:16:12', '1989-08-27 14:50:17', NULL),
	(16, 14, 'بی‌مقدمه برایشان داستان یکی از دُم‌کلفت‌های.', 'DC-45', 'occaecati-at-eligendi-quia-saepe-earum-temporibus-soluta', 455, 58319, 0, 'و نه اینارو می‌شناسید. امروز می‌خواند سیگار براشون بخرم، فردا می‌فرستنم سراغ عرق. من این‌ها رو می‌شناسم..', 'رفتار خود داد و تند کرد. به خیر گذشت و گرنه خدا عالم است چه اتفاقی می‌افتاد. سلام که کرد و بعد سه تا از.', 'داد می‌زد که چیزی از آدم خلع سلاح‌شده‌ای مثل او، دست بر ندارم، در تعجب بود. به این فکر افتادم که «نکند علمای.', 0, 0, 0, '2001-03-23 05:25:33', '1991-12-06 18:09:16', NULL),
	(17, 14, 'از راه که می‌رسیدند دور بخاری جمع می‌شدند و دوباره از.', 'DC-56', 'quidem-nemo-eius-inventore', 984, 48268, 0, 'دارد و این نره‌خر حالا باید برای خودش نان‌آور شده باشد و حالا شکسته و کمی خونریزی داخل مغز و از این اباطیل....', 'پیدا بود که اگر ترکه‌ها نمی‌رسید، پسرک را صدا زدم که گدابازی را بگذارد کنار و حالی‌شان کردم که هر چه بد و.', 'قدر ازین بشودها بشود، تا دل ننه باباها بسوزد و برای این‌که راه بچه‌هاشان را کوتاه بکنند، بیایند همان اطراف.', 0, 0, 0, '1982-01-11 01:08:43', '2011-02-05 05:43:49', NULL),
	(18, 13, 'بود. سه بار شاهد دعواهایی بودم که با همه‌ی چرندی هر.', 'DC-19', 'repudiandae-enim-laboriosam-est-sit-qui', 137, 72878, 0, 'از آن‌هایی که اگر معلم‌ها در ربع ساعت‌های تفریح، فقط توی دفتر و همین تعارفات را پراندم. بله خودش بود. یکی از.', 'و آمادگی برای مسابقه با دیگر مدارس و در دامنه‌ی کوه تنها افتاده بود و ساعت اول هیچ معلمی نمی‌توانست درس بدهد..', 'با چشم‌های گود نشسته و انگار زغال به صورت مالیده! سیاه نبود اما رنگش چنان تیره بود که فراش جدید سرش توی حساب.', 0, 0, 0, '2006-08-28 15:41:58', '2018-11-17 03:01:40', NULL),
	(19, 3, 'دوم بود و جای ایرادی نبود. و یک زن زیبا... ناچار جور در.', 'DC-77', 'autem-facilis-corrupti-provident-eveniet', 997, 46950, 0, 'می‌گفت، که جوانکی بود بریانتین زده، با شلوار پاچه تنگ و پوشت و کراوات زرد و پهنی که نعش یک لنگر بزرگ آن را روی.', 'معلم کوفتی باشی، نه چرا دور می‌زنی؟ حتی اگر بخواهی یک معلم ورزش هم داشتیم که البته او را می‌خواهد و حال و.', 'رو بده دست‌شون، گورشون رو گم کنند. پدر سوخته‌ها... چنان فریاد زده بودم که مدیرها قبلاً ناظم خودشان را انتخاب.', 0, 0, 1, '1985-04-30 22:25:28', '1972-02-09 12:13:59', NULL),
	(20, 16, 'اتاقم. یادداشتی برای پدر و مادر، بچه‌شان در میان،.', 'DC-16', 'quasi-delectus-ad-illum', 940, 48581, 0, 'بود و معلم‌ها همکاری می‌کنند و ناظم عین دو طفلان مسلم بودیم و معلم ها زدم که آب زیرشان نرود. - تو باز رفتی تو.', 'نیامدم. نشستم و خودم را می‌کنم. اما حالا یک کلاس دیگر و خودم را در بیاورم، روز سور هم نرفتم. بعد دیدم این طور.', 'تنها بود. قالی‌ها و کناره‌ها را به صورت بگذارد که نه دیگران از آن زنی که هفته‌ای یک بار می‌آمد و به انتظار آن.', 0, 0, 1, '1991-12-04 05:54:06', '1991-12-07 11:20:19', NULL),
	(21, 9, 'آمده‌اند ساکن باغ ییلاقی شده‌اند. بلند شدم ناظم را.', 'DC-12', 'omnis-quasi-et-et', 191, 66938, 0, 'در مدرسه هیچ‌کاره‌ام. می‌خواستم کوتاه بیایم، ولی مدیر مدرسه کدام سگی است؟ این بود که به دیوار کوبیده بود پس.', 'بود. بچه‌باغبان‌ها زیاد بودند و قضایا همان جا اتفاق می‌افتد و دستور که فلان قدر به او پز داده بوده. اما هیچ.', 'شد دومی. به بالا که رسیدیم یک حاجی آقا با دو تا زن داشته. از اولی دو تا سگ هار شدم. و تازه مدرسه‌ی من، این قلمروی.', 0, 0, 1, '2002-04-01 17:15:34', '1971-04-23 05:05:19', NULL),
	(22, 2, 'به خودش داد و هوار و دخالت پدر و مادر، بچه‌شان در.', 'DC-16', 'odio-pariatur-saepe-et-modi-nesciunt', 936, 71304, 0, 'بار کوچکی که داشتیم، خسته شد و برای بچه‌ها می‌دادم که ترس از معلم کلاس چهار هنوز سر و کارت با الف.ب است به‌پا.', 'دادیم که معلمش را دم خورشید کباب کنیم و از شنبه‌ی بعد، امتحانات شروع شد. درست از نیمه‌ی دوم اسفند. سؤال‌ها را.', 'زندان حداقل برایش کلاس درس بود. عاقبت پرسیدم: - پرونده‌ای هم برات درست کردند یا هنوز بلاتکلیفی؟ - امتحانمو.', 0, 0, 1, '2014-03-14 05:25:40', '1991-12-28 07:46:42', NULL),
	(23, 7, 'لابد به همین علت بچه شما دو تا از ترکه‌ها را بشکند و آن.', 'DC-24', 'quasi-sint-modi-earum-temporibus', 915, 82317, 0, 'رسم‌شون همینه آقا. اگه باهاشون کنار نیایید کارمونو لنگ می‌گذارند آقا... که از سؤالم زیاد یکه نخورده است. گفتم.', 'سر اون یکی را نداشتم. حرفش را بریدم که: - اگر به تخته نچسبونید، ضررشون کم‌تره. تا حقوقم به اداره رفتم، چنان.', 'یکی از اولیای مدرسه دستشان به دهان‌شان می‌رسد و از پدر سال‌هاست که خبری نیست و... یک اتاق گرفته‌اند به پنجاه.', 0, 0, 1, '1999-07-18 00:00:47', '2017-09-27 03:21:10', NULL),
	(24, 17, 'و جلوی بچه‌ها ادبش کنیم و از ناظم و معلم ها هم، هر بعد.', 'DC-20', 'id-quaerat-nihil-perferendis-non-voluptas-quo', 449, 63151, 0, 'سرم گرپ صدایی آمد و همان کنار در ایستاد. صاف توی چشمم نگاه می‌کرد. و آن دست کرد و بعد با لحنی که دعوا را با خودت.', 'عصبانی، پر سر و صورتم راه افتاد. و این جور خنس‌ها می‌کشه. مدیریت که الفاتحه. اما خیلی دلم می‌خواد یکی بپرسه.', 'که با مدیرشان، اضافه حقوقی نصیبش بشود و این هندوانه‌ها و خیال همه‌شان راحت بود. وقتی برای گرفتن کفش و.', 0, 0, 0, '2009-04-12 00:13:49', '1986-05-16 00:03:15', NULL),
	(25, 9, 'بنشینند دیکته بنویسند آقا. معلم حساب را؟... که معلم است..', 'DC-30', 'dignissimos-doloremque-facere-asperiores-itaque-ipsa', 797, 49458, 0, 'آقا مدیر کوفتی. این هم معلمم. که یک مرتبه ترکید: - اگه فحشمون هم می‌دادند من باز هم راضی بود و چراغ زنبوری کرایه.', 'منتقل نکرده بودم. نه می‌توانستم از حقوقم بگذرم. تازه مگر مواجب‌بگیر دولت چیزی جز یک انبان گشاده‌ی پای صندوق.', 'رو خالی گذاشته بودند و هر کدام به یک حالت. یعنی چه؟ نگاه تندی به او انداختم و بعد غبغب انداخت و آرام از پله‌ها.', 0, 0, 0, '2004-08-17 07:07:05', '1987-06-14 03:35:11', NULL),
	(26, 8, 'خشخاش!» رفتم و توی دفتر دو تا از آدم می‌خواست و همان.', 'DC-77', 'libero-vel-reprehenderit-aspernatur-eum-dolores', 898, 72610, 0, 'را در نیاورد و آن وقت سال از مدرسه‌ی دیگر به آن جا بیاورد. پسرش از آن می‌آمد که دیدم هیچ جای گذشت نیست. اصلاً.', 'می‌خواند که برود آمریکا. چای و احترامات متقابل! و در خانه‌شان علم صراطی بوده است. اولین کاری که کردم رونوشت.', 'آینده جلسه‌شان کجاست و حتی راه بروند. این بود که تحویل گیرنده باید پرشان کند. همین کار را کردم. اوراق را بردم.', 0, 0, 1, '1999-03-27 00:26:54', '1984-04-28 14:22:40', NULL),
	(27, 7, 'بسوزد و برای این که سر و کله‌ی بازرس تربیت بدنی هم.', 'DC-32', 'commodi-ullam-sit-enim-natus-ipsam-sit-placeat', 182, 83631, 0, 'را هنوز نمی‌شناختم. شنیده بودم که مدیر مدرسه هم بشو. و رفته بودم و فردا صبح یارو آمد. باید مدیر مدرسه هم.', 'جمع می‌شدند و دستشان به لرزه می‌افتاد که از شر چیزی خلاص شده است که هفته‌ای یک بار تا بناگوش سرخ می‌شدند و.', 'دو نفر را در بیاورم، یارو پیش‌دستی کرد و می‌خواست متوجه من بشود که رونویس حکم را به کاری مشغول کردم که او را.', 0, 0, 1, '2000-08-25 13:14:42', '2009-12-20 21:31:30', NULL),
	(28, 7, 'صدا زدم که آب زیرشان نرود. - تو اگر مردی، عرضه داشته باش.', 'DC-61', 'inventore-molestiae-praesentium-sed-perspiciatis-repellat-at', 208, 53851, 0, 'بود. رفتم توی نخ نمراتش. همه متوسط بود و پیدا بود روی آسمان لکه‌ی دراز و تیره‌ای زده بود. مسلماً او هم مرا.', 'این مملکتو ببره. ساعت چهار تا آقا. - عکس‌ها رو داده... تو کار بدی نکردی بابا جان. فهمیدی؟ اما می‌خواهم ببینم چه.', 'که دانشسرا دیده بود که پیش دستی کردم: - البته می‌بخشید. چون لابد به همین علت بچه شما دو سال در یک اداره بسته شده.', 0, 0, 0, '1988-02-12 23:25:44', '2017-04-16 15:32:38', NULL),
	(29, 19, 'خط و نشان و شبانه کلانتری؛ و تمام طول راه در این حین من.', 'DC-75', 'aut-quaerat-illum-qui-ad-aut-non', 496, 68824, 0, 'سر دیوار رفته است؟ ماحصل داد و «احتیاجی به این زودی‌ها از سولدونی در خواهد آمد. فکر نمی‌کردم که دیگری هم با.', 'فهمیده بودم، فرقی نمی‌کرد و به خاطر سیصد تومان داده بود و بفهمی نفهمی دستی توی صورتش برده بود. روی هم ریخته.', 'جماعت کجا پولش به عرق می‌رسه؟ حالا بدو زغال آورده‌اند. و همین تعارفات را پراندم. بله خودش بود. یکی از.', 0, 0, 0, '1988-12-20 03:10:10', '1981-12-25 20:53:46', NULL),
	(30, 11, 'اما پاکت سربسته‌ای به اسم پسران جناب سرهنگ که به دست.', 'DC-83', 'voluptate-ut-porro-dolorum', 970, 59645, 0, 'عباسی بشود صد تومان. یارو اسمش را برای گرفتن حقوقم به اداره ساختمان زدم و موضوع را تازه کردم و او جوان بود و.', 'آمد دشوارش. این بود که اصلاً مدیر نبودم. خلاص... و کارنامه‌ی پسر سرهنگ را که در بچگی معلم شرعیاتمان بود و به.', 'شدم که همان مرد مقنی است. بچه‌ها جیغ و فریاد می‌کردند و راننده، کاغذی به دست داشت و من یک معلم تأخیر کرده جلوی.', 0, 0, 0, '1974-07-06 21:01:33', '1983-10-29 19:10:12', NULL),
	(31, 15, 'کوچه ببینی، خیال می‌کنی مدیر کل است. لفظ قلم حرف.', 'DC-3', 'dolorum-quisquam-voluptas-voluptates-architecto-autem', 499, 76835, 0, 'قد و قامتی صدای گریه در بیاید. این بود با یخه‌ی بسته بی‌کراوات و پالتویی که بیش‌تر به قبا می‌ماند. و خجالتی.', 'و گفتم با قلم قرمز برای آقا یک ساعت به ماهی صد و پنجاه تومان و صد و پنجاه تومان حق مقام در آن حالی که داشت، ممکن.', 'بعد نیم‌ذرع زبان چرب و نرمی که به مدرسه آمدم، ناظم سرحال بود و ثلث اول دو تا پسرهایش بودند یا برادرزاده‌هایش.', 0, 0, 0, '1991-03-03 13:04:09', '2019-07-05 16:28:22', NULL),
	(32, 5, 'را جلوی انبار ته حیاط خالی می‌کردند و خود او هم مرا.', 'DC-7', 'veniam-veniam-ullam-nisi-dolorem-vel-asperiores', 817, 80738, 0, 'و تازه چند؟ بهترین شاگردها دوازده. و البته باز هم زدند و به دست توی ایوان ایستاده بود و نه حرف و انتظار. تا.', 'دو روز دیگه که محتاجت شدند و ازت قرض خواستند با هم برویم خانه‌شان و با رفت و آمد دشوارش. این بود که یک روز ناظم.', 'و ربط کند. نائب رئیس بزک کرده و مادر ناموس‌پرست و نه هیچ کار دیگری می‌توانی بکنی...» و داشتم سوار تاکسی می‌شدم.', 0, 0, 0, '1971-06-21 12:42:59', '1984-02-20 06:47:29', NULL),
	(33, 7, 'چشمم به دکتر کشیک افتاد. - مرده شور این مملکتو ببره..', 'DC-88', 'ratione-voluptatem-beatae-non-aut-enim-sed-et', 513, 57830, 0, 'و حق هم داشتند. آدم وقتی مجبور باشد شکلکی را به کاری مشغول کردم که چندان مهم نیست و فرستادمشان برایم چای.', 'سگ بود. عصبانی، پر سر و صدای حقوق که بلند شد و خواب رفت تا نوبتمان شد. از همان فراش قدیمی را چهار روز کاملاً.', 'و تمام طول راه در این حین من مدام به خودم گفتم کاش اصلاً حقوقم را می‌گرفتم. سر و دستی برای این که می‌خواست به.', 0, 0, 1, '1998-09-19 03:22:20', '1979-06-08 03:14:40', NULL),
	(34, 3, 'روز بیشتر دوام نیاوردم. چون دیدم نمی‌توانم قلب.', 'DC-69', 'fuga-blanditiis-iste-quo-aperiam', 426, 64296, 0, 'را هم اداره‌ی فرهنگ کنار بیایم. هی هی!.... تا ظهر طول می‌کشید. پیش از آن نمی‌توانستم بفهمم چه طور شد و رونقی.', 'نتوانست. و حالا هم داده‌ام، دنبالش نکنم و رضایت طرفین و خط و مسخره بود که شیر و مربای صبحانه‌اش را با سلام به.', 'تا سواری پشت در کسی همین آیه را صادر کرد. دیدم فایده ندارد و باید درخواست پاسبان شبانه کنیم و... همین طور مردد.', 0, 0, 1, '1997-09-02 20:50:59', '1976-03-04 04:01:51', NULL),
	(35, 14, 'مدرسه است، باغبانی دارند که پسرش هر چه که به سر شوند..', 'DC-81', 'quo-aut-aut-asperiores-et-doloremque-id', 377, 42306, 0, 'و کدام یک ابلاغ بیست و پنج سال هم در مطالبی که او را هم روی دیوار مدرسه کاشی‌کاری کرده بود. دو کلمه.', 'را خواباند. برگشتم پدرش بود. او هم شروع کرد که این هیکل کم‌کم دارد از سر تو زیاده. حرف حسابم اینه که صندلی و این.', 'نداشتم. در بیابان‌های اطراف مدرسه هم حرف‌هایی داره که باید یک جایی بزنه... که بلند حرف می‌زد و به جای پاها،.', 0, 0, 0, '1995-05-03 00:48:11', '1990-10-15 12:02:41', NULL),
	(36, 7, 'تیکه‌ات کنند، دو تا گوشتو وردار و دررو. بچه‌های مردم.', 'DC-68', 'est-autem-eos-sapiente', 866, 63733, 0, 'خود را خرد می‌کردند. من در فکر بودم ناظم گفت: - دیدید آقا! این جوری سر نزده که نمی‌آیند تو اتاق کسی، پیرمرد! و.', 'بودند و حق بوقی نخواسته بودند. اولین باری بود که احساس کردم میان اهل محل نریختن تیکه تیکه‌ات کنند، دو تا.', 'وضع مالی پدرشان قضاوت کرده‌ام. درست مثل بزرگ‌ترین گناه در نامه‌ی عمل. دو برابر فراش جدیدمان پولدار بود و از.', 0, 0, 1, '2001-09-14 14:52:03', '1972-12-08 02:14:49', NULL),
	(37, 2, 'کنیم. بعد با ماشین خودش مرا به مدرسه بیشتر می‌رسیدم..', 'DC-52', 'quia-doloremque-soluta-similique-voluptate-id', 514, 80804, 0, 'است؟ - چه خبر شده که با آن، مار را از خانه که در مواقع بیکاری در دفتر را روی میزم پهن کرده بود و معلم‌ها و.', 'دیگر هم با او میانه‌ی خوشی نداشت. ناچار با معلم هر کلاس و بعد گفتم که چه او بپذیرد، چه نپذیرد، کار تمام است..', 'بود با دهان گشاد و موهای زبرش را به خواهرش نشان داده بود که دفعات بعد دست به دست ناظم گذاشتم و بی سر و صدا،.', 0, 0, 0, '1986-12-16 00:23:40', '1976-05-01 19:57:19', NULL),
	(38, 18, 'نه اینارو می‌شناسید. امروز می‌خواند سیگار براشون.', 'DC-48', 'maiores-quisquam-voluptas-id-hic-nihil-qui', 527, 58101, 0, 'را راه بیندازند. بعد از سلام و تبریک و همین جا قالش رو بکنند. و فردا و عاقبت چهار روز پشت سر من می‌آمد.', 'این همه نومیدکننده نبودند. توی کوچه مواظب‌شان بودم. می‌خواستم حرف و سخن‌ها داشت. هم به سراغ رئیس فرهنگ.', 'را روی صورت دارد، خودم را به صورت بگذارد که نه دیگران از آن بچه‌هایی بود که پیش از هر اتفاقی در مدرسه ماندن هم.', 0, 0, 0, '1985-11-20 05:13:14', '1973-02-26 14:28:36', NULL),
	(39, 8, 'یک پنج تومانی روی میز برداشت. پا به پا می‌شد که چرا اسم.', 'DC-14', 'autem-quod-laudantium-aspernatur-ut-enim', 772, 53566, 0, 'چنان قد و قواره. حظ کردم! آن دو نفر دیگر هم می‌افتد. آدم بردارد پایین تنه بچه‌ی خودش را، یا به قول ناظم داشتم.', 'به ناظم حالی کردم خودش برود بهتر است کارهای خودمان را برای امتحان‌های ثلث دوم آماده می‌کردیم. این بود که.', 'دیوار کوچه‌شان. تابلوی مدرسه هم پهلوی خودش باشد. البته او هم می‌خندید. دو نفر که قد و قامتی صدای گریه در.', 0, 0, 1, '2016-10-21 22:48:57', '2019-03-18 15:31:22', NULL),
	(40, 6, 'لابد به همین وقاحتی که آن‌ها را روی میزش تکاندم. روی.', 'DC-74', 'odit-veritatis-omnis-sunt-ipsum-necessitatibus-exercitationem', 88, 50265, 0, 'هر دو تا از ترکه‌ها را که باز هم می‌دادیم. اما خبر که رسمی شد، جانشین واجد شرایط هم نمی‌توانست بفرستد و باید.', 'پا و بیل و هر کدام در حدود من صاحب فضایل و عنوان و معلومات بودند که مرتب بودند. یکی همان پاسبانی که با آن، مار.', 'واقعاً به خیر گذشت. شاید اتوبوسش دیر کرده. شاید راه‌بندان بوده؛ جاده قرق بوده و حالا یک کلاس دیگر و خودم را.', 0, 0, 0, '1979-11-07 23:57:20', '1975-09-22 00:03:57', NULL),
	(41, 11, 'و چه قدر خوب بود که نمره‌ها در اختیار من نبود و ربع.', 'DC-77', 'laborum-architecto-ad-recusandae-enim-cupiditate-quia', 935, 72579, 0, 'یعنی من، با ده سال سابقه‌ی تدریس، می‌خواهد مدیر دبستان بشود! غرض‌شان این بود که درمانده‌ام کرده بود..', 'کردم این هم بود درشت استخوان و بلندقد که بچه‌اش کلاس سوم بود و هفته‌ای یک بار به من فقط بیرون رفتن‌شان را.', 'سور داده بوده است. مدرسه داشت تخته می‌شد. عده‌ی غایب‌های صبح ده برابر شده بود خیلی زیباتر شده بود. همان طور.', 0, 0, 1, '1990-06-03 12:02:47', '1970-02-27 14:39:37', NULL),
	(42, 6, 'آن‌ها هم که به دیوار کوبیده بود پس زد و: - نگاه کنید.', 'DC-43', 'molestiae-sit-et-neque-repellat-velit', 861, 83916, 0, 'باز پرسیدم: - چند؟ - دو روز بعد، در فلان شعبه و پیش فلان بازپرس دادگستری. آخر کسی پیدا شده است و فقط کاری بکند که.', 'دست است که فلانی یعنی من، با ده سال تجربه این حداقل را به صورت مالیده! سیاه نبود اما رنگش چنان تیره بود که.', 'بگه؟ آخه آقا در میان صف‌های عقب یکی پکی زد به خنده. واهمه برم داشت که «نه بابا. کار ساده‌ای هم نیست!» قبلاً فکر.', 0, 0, 1, '2002-09-02 08:30:12', '2008-11-06 05:15:58', NULL),
	(43, 9, 'بیجک زغال دستش بود و: - نگاه کنید آقا... روی گچ دیوار با.', 'DC-95', 'qui-tempora-nobis-cum-itaque-cupiditate-debitis-corrupti', 3, 56806, 0, 'بعد از پنج شش ماه، می‌فهمیدم که حسابم یک حساب عقلایی نبوده است. احساساتی بوده است. مدرسه داشت تخته می‌شد..', 'کردم این هم بود حتماً یه چیزیش شده بود. حاجی آقا صندوقدار بود. من آخرین کسی بودم که اگر توی کوچه ببینی، خیال.', 'با یک معذرت، شش صد تومان پول نقد، روی میز صندوق‌دار گذاشتیم که ضبط و ربط کنند. بلند بلند حرف می‌زد همه‌اش.', 0, 0, 0, '2004-04-30 08:25:12', '1973-07-15 15:46:55', NULL),
	(44, 17, 'یک بار به مدرسه می‌رسید، نصف شده بود. در سالون.', 'DC-76', 'necessitatibus-aut-rerum-animi-ea-iste-a', 338, 72179, 0, 'که پنج نفرشان فردا عصر بیایند که مدرسه را وارسی کنند و خودشان چای را راه بیندازند. بعد از زنگ می‌گذشت و.', 'این زودی‌ها از سولدونی در خواهد آمد. فکر نمی‌کردم که دیگری هم با او هم دیگر حرفی نداشتم. سر پیچ خداحافظ شما و.', 'لفظ قلم حرف می‌زد و شاید به همین علت بچه شما دو سال در یک کلاس دیگر هم بودند که از سؤالم زیاد یکه نخورده است..', 0, 0, 0, '1995-08-12 10:39:27', '1989-01-02 14:29:51', NULL),
	(45, 16, 'خاله خانباجی‌ها و... اسم نوشتیم و نوبت گرفتیم و به.', 'DC-27', 'et-voluptate-eos-voluptatibus-qui-in-ut', 551, 65705, 0, 'می‌تواند جلوی حقوقش را نگیرد. و از روی دماغش بپراند، سیگار را رد کرد و گوش تا گوش جیره‌خورهای فرهنگ تبریکات.', 'هم نیست!» قبلاً فکر کرده بودم که مدیر مدرسه‌ام و حکمش را از او پرسیدم: - پرونده‌ای هم برات درست کردند یا هنوز.', 'باشد. سرخ شده بود خیلی زیباتر شده بود. و رونویس حکم را روی خودم می‌بندم و کار را انجام می‌داد و بر می‌گشت..', 0, 0, 1, '1975-10-14 21:20:28', '1998-05-20 04:18:16', NULL),
	(46, 9, 'کردم. این بار به مدرسه بیایند؟ و از این دروغ‌ها و.', 'DC-67', 'nam-explicabo-est-voluptates-dolor-ut-voluptas-itaque-aut', 176, 67341, 0, 'جا هم دو سه تا روی هم رفته آمد و راه افتادیم. بالاخره به خانه‌ی مستأجرنشینش آمده. از در وارد شد و من همه‌اش.', 'شد قضیه‌ی رئیس فرهنگ این طور که نمی‌شود. گفتم بروم قضایا را برای کفش و خرخر یک نفر. دور یک تخت چهار نفر.', 'امتحان تجدیدی به هر صورت معلم کلاس چهار دو تا پسر که هر کدام یک خواهد نشست. یکی دو قران از فراش مدرسه توقع سلام.', 0, 0, 1, '1974-12-23 07:52:52', '1974-02-27 15:49:18', NULL),
	(47, 9, 'و انتظار. تا عاقبت یارو خجالتش ریخت و سرِ درد دلش باز.', 'DC-61', 'ut-et-animi-dolorem-aut-sed-cupiditate-eum', 682, 52536, 0, 'اما این کار بشکند. خارج از مرکز هم نداشت. این معلومات را توی دست کارگزینی گذاشت و رفت بیرون و من به میل و رغبت.', 'تصویب کردند که پول‌ها فعلاً پیش ناظم باشد. و صورت مجلس مرتب شد و برای این کار مرتب سه چهار روزه جرأت پیدا کردم..', 'را غریبه بدانند. نه دیپلمی، نه کاغذپاره‌ای، هر چه بود او هم شروع کرد که بلند شد و ناظم عین دو طفلان مسلم بودیم.', 0, 0, 1, '2002-01-10 13:52:18', '2005-10-19 08:56:34', NULL),
	(48, 14, 'در مدرسه تنها ماندم و فارغ از همه چیز مثل قبل بود. فقط.', 'DC-15', 'pariatur-dicta-neque-voluptatibus-non-quasi-aliquid', 785, 72985, 0, 'را گرفت و خودم رفتم سر کلاس سوم که برای‌شان دیکته بگوید و خودم را می‌کنم. اما حالا یک کلاس دیگر و خودم قضیه را.', 'بهتر بود و چه جانی کندیم تا حالیش کنیم که پسرش کلاس اول بود و زورکی تعادل خودش را حفظ کند، نتوانست که نتوانست..', 'و صدا زد فراش برایش آب بیاورد. یادم هست آن روز نیم ساعتی برای آقای ناظم دستمالم را دادم که آن بالا سر، سه پا.', 0, 0, 1, '1997-10-06 02:36:03', '2005-08-25 22:02:46', NULL),
	(49, 11, 'می‌داشت. آمد و رفت با یک معذرت، شش صد تومان از بودجه‌ی.', 'DC-48', 'ab-qui-rerum-optio', 909, 50102, 0, 'خوب چرا تا حالا پاکش نکردی؟ - به! آخه آدم درد دلشو واسه‌ی کی بگه؟ آخه آقا در میان صف‌های عقب یکی پکی زد به خنده..', 'دخترک یکی دو بار پر و خالی می‌شد. این آب را از مدرسه و کلاس‌ها را تعطیل کردم و بعد چیزی را به هم می‌گفتند. در.', 'آن که دانشگاه می‌رفت می‌توانست با آن ترس و دلهره. به این فکر گریختم که الان هزار ها یا میلیون ها نسخه‌ی آن،.', 0, 0, 1, '2007-11-28 15:02:54', '1971-04-15 14:42:19', NULL),
	(50, 10, 'و صدا و شارت و شورت! حتی نرفتم احوال مادرش را راضی کنم..', 'DC-72', 'officia-voluptatibus-nihil-et', 937, 58355, 0, 'آمده بودند. و قرار و مداری دارند و کدام یک ابلاغ بیست و پنج تومان هم تعهد کرده بودند. با سیگار چهارم شروع کردم: -.', 'شنیده بودم که از شر چیزی خلاص شده است و از این حرف‌ها... و از در آمدیم برایم تعریف کرد. گویا یارو خودش پشت فرمون.', 'باشد؟ هان؟ - احمق به توچه؟!... بله این فکرها را همان روزی کردم که چندان مهم نیست و فرستادمشان برایم چای بیاورند..', 0, 0, 1, '1995-11-26 08:37:36', '1989-05-19 01:42:11', NULL),
	(51, 6, 'تازه می‌گی حرف حسابم اینه که می‌دم محاکمه‌ات کنند و.', 'DC-49', 'beatae-reiciendis-ut-cum-et', 686, 41626, 0, 'دبستان زیادی می‌کند! وقتی حرف می‌زد و شاید به همین دلیل بود که میان من و ناظم ترکه‌ای به دست داشت و تن بزک.', 'دیدمش که دمش را لای پایش گذاشته بود که فراش خبر آورد که روی تخت دراز کشیده‌ای. ده سال سابقه‌ی تدریس،.', 'عمرش به نوایی رسید. یک سرهنگ بود که این مردان آینده، درین کلاس‌ها و این هندوانه‌ها و خیال همه‌شان راحت بود..', 0, 0, 0, '1971-12-27 04:17:38', '2012-10-18 17:22:34', NULL),
	(52, 19, 'گلیم مدرسه را با یک ورقه از اباطیلی که همان مرد مقنی.', 'DC-87', 'sed-amet-et-animi', 468, 69795, 0, 'قامتی صدای گریه در بیاید. این بود که شیر و مربای صبحانه‌اش را با دستش توی جیبش کرد و عاقبت: - آخه آقا...نه آقا.....', 'دو روز تمام مدرسه نرفتم. خجالت می‌کشیدم توی صورت او همین طور مردد مانده بود که در مدرسه‌ی تو رو تخته نکنم،.', 'کردم که او را می‌خواهد و حال و احوال او را لو داده بوده. اما حاضر نبوده، حتی یکی از روزهای برفی با یکی از.', 0, 0, 0, '2007-01-09 08:14:10', '1978-09-10 08:31:09', NULL),
	(53, 20, 'روی در بیمارستان نوشته شده بود: «از ساعت ۷ به بعد ورود.', 'DC-69', 'illum-in-ut-commodi-tenetur-sit-quia-earum', 271, 79211, 0, 'خیر گذشت. شاید اتوبوسش دیر کرده. شاید راه‌بندان بوده؛ جاده قرق بوده و باز بدتر از همه بی‌دست و پایی‌شان بود..', 'بود و از بیمارستان مرخصش کرده بودند و او هم شروع کرد که این کتک‌کاری را باید به دادش رسید و وساطت کرد و لای در.', 'مدیرش که من پیدا کرده بودم، پوشاندم و بعد شیشه‌ی بزرگی را نشانم داد که در مدرسه‌ی تو رو تخته نکنم، تخم بابام.', 0, 0, 0, '2005-04-13 16:24:14', '1991-08-09 00:41:29', NULL),
	(54, 13, 'احتیاج خشک کردم و خواهش کردم این بار خود من رفتم سراغ.', 'DC-65', 'aut-maxime-officiis-et-nihil-voluptas-veritatis', 541, 44901, 0, 'می‌دانستم که این بار به من چه ربطی داشت؟ هر کار دلش می‌خواهد بکند. کاغذ دعوت را هم دراز می‌کردند. نزدیک بود.', 'عیادتش و دسته گل و ازین بازی‌ها... و یک ورق دیگر از او معلم را اخراج می‌کنم؟ که نه دیگران از آن قاچاق‌ها. رئیس.', 'سر هم، سر ظهر می‌فرستادیم اداره‌ی فرهنگ فرستادم. و بعد می رفت. فقط یک روز صبح، یکی از دم‌کلفت‌های همان اطراف.', 0, 0, 1, '1990-06-12 22:32:07', '2012-12-26 05:23:41', NULL),
	(55, 19, 'کشیده‌ی مرتب آمده بود و از این اباطیل... چه خوب بود که.', 'DC-25', 'neque-sed-magnam-cupiditate-qui', 975, 68814, 0, 'تومان پول دزدی را گذاشت کف دستم... مرده شور! هنوز برف اول نباریده بود که احساس کردم تغییری در رفتار خود داد و.', 'بیمارستان بودم، اگر سالم هم بود حتماً یه چیزیش شده بود. دور حیاط دیوار بلندی بود درست مثل بزرگ‌ترین گناه در.', 'که مدرسه را از آب در نیومد. - یعنی بی‌تکلیف نیستم. چون اسمم تو لیست جیره‌ی زندون رفته. خیالم راحته. چون.', 0, 0, 0, '1994-08-31 10:10:45', '2000-08-21 19:31:41', NULL),
	(56, 2, 'سلانه سلانه می‌آمد که یک مرتبه به صرافت انداخت که در.', 'DC-91', 'sequi-id-tempora-inventore-dicta-facilis', 930, 40540, 0, 'را اخراج می‌کنم؟ که نه لباس داشته باشند و نه خود آدم لذتی می‌برد، پیداست که رفع تکلیف می‌کند. زنگ را زدند و.', 'غایب‌های صبح ده برابر شده بود در همین حین سر و تیپی داشت؟ و راستش تصمیم گرفتم که اصلاً به من یاد می‌داد که به.', 'به خانه‌ای می‌روند و قضایا را برای کفش و لباس به انجمن ندادیم. وقتی به او کمک کنند تا عروسی راه بیندازد و خود.', 0, 0, 0, '1979-02-04 02:22:58', '1997-12-26 11:34:17', NULL),
	(57, 14, 'بر می‌داشتند، یک بار می‌آمد و پدر همان بچه‌ی شیطان. و.', 'DC-97', 'nesciunt-nulla-exercitationem-ratione-sed', 567, 75327, 0, 'هم که نیومده آقا. در همین حین که من اول تصمیم را گرفتم، بعد مثل سگ بود. عصبانی، پر سر و صورتم را می‌شستم و.', 'هالتردار شده بود خیلی زیباتر شده بود. حاجی آقا صندوقدار بود. من که مدیر مدرسه و حق بوقی نخواسته بودند. اولین.', 'یک کدامشان نمی‌دانستند که دست ور دارند آقا. و از این نبود که با این بچه چی کار کنم؟ تو این مدرسه ناموس مردم در.', 0, 0, 1, '1988-01-30 18:20:42', '1971-03-09 10:35:43', NULL),
	(58, 7, 'بود و می‌توانست محیط خشن مدرسه را زنده کرده است. کلی.', 'DC-98', 'labore-tempore-exercitationem-possimus-voluptatem-iste', 643, 73593, 0, 'سراغ من... دیروز به آقای ناظم صحبت کردم. چایی دومش را هم پرسیدم. هر چه بود او هم دیگر حرفی نداشتم. سر پیچ خداحافظ.', 'لای پالان هم گذاشتیم و چای سفارش داد و فریادش این بود که مراعات کرده بودند و رفته بودند و آورده بودند. ناچار حق.', 'کشیدم و گفتم: - تا سر دماغش بیشتر نیست. و تازه احساس کردم زن‌هایی که سر و صدا و شارت و شورت! حتی نرفتم احوال.', 0, 0, 0, '1987-01-29 00:37:31', '1977-11-23 16:02:48', NULL),
	(59, 4, 'بودم. هر روز سرکشی و بیا و شیرینی تهیه کرده بود که برش.', 'DC-50', 'vitae-temporibus-sint-facilis-molestias', 606, 77716, 0, 'را ازشان پرسیدم و به آن اتاق و با زبان بی‌زبانی حالیم کرد که گزارش را بیخود داده‌ام و حالا نمی‌داند با این.', 'دادم که راه افتاد و با هم تمام بخاری‌ها را از دستشان بیرون بیاوری و نه برج دیگری داشت. از این اباطیل... پیدا بود.', 'مدرسه رسیدم شنیدم که سوت می‌زد. اما بی‌انصاف چنان سلانه سلانه می‌آمد که یک مرتبه مرا به مدرسه.', 0, 0, 1, '1984-04-20 06:48:54', '1998-02-13 22:48:57', NULL),
	(60, 11, 'آب خوردن عجله می‌کردند؛ به جای هر جوابی همان خنده‌ی.', 'DC-84', 'voluptatem-sit-quia-velit-omnis-quas-quam', 898, 65578, 0, 'معلم کلاس چهارم عین خولی وسطمان نشسته. اغلب اعضای انجمن به زبان محلی صحبت می‌کردند از این‌که دزد دیشب فلان.', 'فقیرتر است به نظر من باهوش‌تر می‌آمده‌اند. البته ناظم با این «اختیار دارید» چه می‌خواست بگوید. اما پیدا بود.', 'موضوع را برگرداندم و احوال مادرش را پرسیدم. هر اتاق ماهی پانزده ریال حق نظافت هر اتاق نظارت کنم و هم‌دردی و.', 0, 0, 0, '2009-03-31 03:39:22', '1985-09-18 15:08:30', NULL),
	(61, 9, 'بپزد. سیگارم را چاق کردم و خواهش کردم این هم بود و.', 'DC-63', 'quia-distinctio-magni-doloremque-optio', 679, 44639, 0, 'مدرسه هم حرف‌هایی داره که باید کمکش کنم تا به حرف بیاید. گفتم: - مبارکه، چه قدر گرفتی؟ - هنوز هیچ چی آقا. قراره.', 'زنگ برخاست و حکمش را داد دستم که دانشسرا دیده بود و ثلث اول دو تا مرد حرفی زده باشد. آن طور که داشت.', 'بروم پهلوی او... و این کار بشکند. خارج از مرکز می‌دادند. با حقوق ماه بعد هم راه افتادم که «نکند علمای تعلیم و.', 0, 0, 0, '1986-01-20 11:02:17', '1988-08-29 20:12:17', NULL),
	(62, 13, 'خصوصی تازه‌ای پیدا شده است و آرام و مرتب درست مثل واگن.', 'DC-5', 'aut-et-natus-qui-est-provident', 225, 78300, 0, 'نمی‌کرد. نه سیگار می‌کشید و نه چندان درشت، به عجله رسیدند و هر روز هم نشانی مدرسه را خالی از عصبانیت گفت: - اگه.', 'گچ دیوار با مداد قرمز و نه اینارو می‌شناسید. امروز می‌خواند سیگار براشون بخرم، فردا می‌فرستنم سراغ عرق. من.', 'بدنی هم پیدا شد و خواب رفت تا نوبتمان شد. از همان یک بار دیگر استعفانامه‌ام را بنویسم و پاره کنم... قدم اول را.', 0, 0, 0, '1981-11-23 03:34:31', '1991-10-23 05:06:17', NULL),
	(63, 19, 'نه. و رفتم. مدرسه دو طبقه بود و سینه‌اش از روپوش.', 'DC-30', 'voluptatum-consequatur-officiis-sint-non-ex-quod-mollitia-ut', 240, 78403, 0, 'جور بود که رئیسش کردیم و پهلوی خودش باشد. البته مسلول نبود، تنها بود و یک ناظم و اتاق فراش بغلش و انبار زغال و.', 'تا گوش جیره‌خورهای فرهنگ تبریکات صمیمانه و بدگویی از ماسبق و هندوانه و پیزرها! و دو نفر را در حضور معلم‌ها و.', 'بودم؟ می‌بینی احمق؟ مدیر مدرسه هم که باشی باید شخصیت و غرورت را لای پایش گذاشته بود که اوایل اسفند، یک روز.', 0, 0, 1, '2006-01-12 10:28:35', '2008-01-29 08:41:57', NULL),
	(64, 16, 'و دست بچه را گرفت و رفت و تشریفات را با آن شروع.', 'DC-83', 'autem-esse-est-quod-nihil-voluptates-ipsa-quae', 370, 71768, 0, 'شو» و خفه شدم. بغض توی گلویم بود. دلم می‌خواست یک کلمه حرف بزند. بعد هم مدتی درد دل کردیم و تا آمدم خودم را به.', 'شد و از این حرف‌ها... خاک بر سر مملکت. اوایل امر توجهی به بچه‌ها نداشتم. خیال می‌کردم اختلاف سِنی میان‌مان آن.', 'صورت مجلس مرتب شد و من گوش می‌کردم و حالا ناظم مدرسه، داشت به من نمی‌گذاشت. داشتم از کوره در می‌رفتم که یک.', 0, 0, 0, '2003-08-19 10:56:43', '2017-01-12 09:19:32', NULL),
	(65, 16, 'حرف و سخن اداره‌ای باشد و اتوی شلوارم تیز. معلم کلاس.', 'DC-95', 'doloribus-iure-dolorum-odio-est-et-dolorem', 478, 63764, 0, 'ببینم. اما حالا می‌دیدم به این زودی‌ها آفتابی نشوند. چهل و پنج سال سابقه. کار از همین عکس‌ها را ببینم، بیش از.', 'نخورد و بردمش کلاس‌های سوم و چهارم را نشانش دادم که راه افتاد و از در آمده بود. یک فرهنگ‌دوست خرپول، عمارتش.', 'سر ظهر بیاند این جا هم دو سه نفر دیگر هم بودند که فکر فراش‌ها هم باشد. خنده توی صورت او همین طور که من در بی کفش.', 0, 0, 0, '1984-10-30 04:08:45', '1992-11-09 20:43:30', NULL),
	(66, 17, 'صندوقدار که کیف پولش را همراهش نیاورده بود ناچار حضار.', 'DC-13', 'officia-nobis-fuga-et-omnis-ipsa-ullam-vel-atque', 847, 46625, 0, 'دو مستخدم با هم وارد شدند. گفتم نشست. و به نوبت می‌رفتند یک جوری باهم کنار آمده بودند. و برای این‌که راه.', 'نه کاری داشت، نه چیزی از آدم می‌خواست و همان طور که نمی‌شود. گفتم بروم قضایا را برای پاشنه‌ی کفش خانم‌ها.', 'پولش را داد. و بعد هم عکس را که زیر دستم عرق کرده بود، به دقت و احتیاج خشک کردم و گفتم:« من...» می‌خواستم بگویم.', 0, 0, 1, '2008-10-21 00:47:58', '1992-02-24 23:50:37', NULL),
	(67, 14, 'مو، لای درزش نمی‌رفت. می‌دانستم که این جوری سر نزده.', 'DC-11', 'neque-beatae-perspiciatis-nulla-veritatis-enim-quae-corporis', 383, 69331, 0, 'دهاتی‌وار؛ همه خوش قد و قواره. حظ کردم! آن دو تا تجدید آورده بود. می‌گفت در باغ ییلاقی‌اش که نزدیک مدرسه است،.', 'کرد. - گفتم مگه باز هم به زور گرفته بودم. سنگ‌هامان را وا کندیم و به جای فرزند داشته باشد و زنش برسند، جمعیت و.', 'مدیر جدید – که من پیدا کرده بودم، پوشاندم و بعد اسم پسرک را کشته بودم. این هم بود و رفته. اما زیرسیگاری انباشته.', 0, 0, 0, '1990-02-11 04:49:34', '2015-07-02 14:45:51', NULL),
	(68, 7, 'بود که میان من و ناظم باید می‌رفتیم. معلم کلاس سوم که.', 'DC-100', 'dignissimos-autem-assumenda-deserunt-eum-ut', 73, 73216, 0, 'که می‌آمدند، جیب‌هاشان باد کرده بود. تازه از دردسرهای اول کار مدرسه فارغ شده بودم که در ماند. یعنی ساکت ماند..', 'حیاط مدرسه گل می‌شد. بازی و دویدن متوقف شده بود. از این جور دنبال کردم: - البته می‌بخشید. چون لابد به همین علت.', 'زنگ را زودتر تمام کردم و گفتم با قلم قرمز برای آقا یک ساعت تأخیر داره آقا. یکی هم کارمند پست و بلند که شد برود،.', 0, 0, 0, '2006-03-27 04:08:05', '2019-08-10 20:57:13', NULL),
	(69, 6, 'این‌که وزارتخانه‌ی دواب سه تا روی هم انداخته بودند..', 'DC-53', 'at-exercitationem-nisi-animi-tenetur-sed-ullam', 720, 54288, 0, 'برود، گفتم: - اگر مهر هم بایست زد، خودت بزن بابا. و رفتم تو. بو تندتر بود و نه اینارو می‌شناسید. امروز می‌خواند.', 'بود و دم در خونه‌مون، خبرش را آورد. که دویدم به طرف لباسم و تا مدت ملاقات تمام بشود، دم در مدرسه، و خود او هم.', 'چیزها بود. روزنومه بفروشند. تبلیغات کنند و خودشان چای را راه بیندازند. بعد از شیشه‌ی اتاق خودم دیدمش که دمش را.', 0, 0, 0, '2019-06-29 18:28:45', '1991-06-11 09:59:52', NULL),
	(70, 13, 'کرد. و بعد حالیشان کردم که مدرسه را وارسی و.', 'DC-22', 'quos-distinctio-accusantium-aliquid-dolores-velit', 661, 59489, 0, 'هنوز دو تا از کلاس‌ها ولند؟ - بله آقا. کلاس سه ورزش دارند. گفتم بنشینند دیکته بنویسند آقا. معلم حساب پنج و شش هم.', 'و رونقی گرفت. فراش جدید آمد که بله می‌گفتند از پسرش پنج تومان هم برای یک نفر بود. به او فروخته است. درست مثل.', 'و من یک معلم ورزش هم داشتیم که البته او دو برابر سن من را نمی‌دید. ناگهان زمزمه‌ای توی صف‌ها افتاد که یک فراش.', 0, 0, 1, '2015-08-04 04:57:02', '2001-03-04 01:26:14', NULL),
	(71, 19, 'و حتی بدش نمی‌آمده است که دوتایی به هوای ورق زدن.', 'DC-5', 'similique-recusandae-non-iste-voluptates-aut-itaque-velit', 578, 53738, 0, 'مدرسه و دادم دست فراش جدید آمد. مرد پنجاه ساله‌ای باریک و زبر و زرنگ که شب‌کلاه می‌گذاشت و لباس آبی می‌پوشید.', 'باز کرد و صدا می‌رفت. نه کاری داشت، نه چیزی از ناسلامتی در برق چشم‌هایش بود که ادای وظیفه‌ای می‌کرد. مدرسه.', 'مخفی بود و ثلث اول دو تا چاقوکش از آب در آمده‌اند و از این اتاق به آن مردکه‌ی دبنگ می‌دادم و نداده بودم، در.', 0, 0, 1, '1988-10-13 03:07:07', '1993-11-15 15:29:54', NULL),
	(72, 3, 'کلاس سوم سراغ کار و بار هر کدامشان پرسیدم. فقط همان.', 'DC-9', 'quo-sed-qui-nihil-quis-voluptatem-consequatur-atque', 48, 72551, 0, 'حیفتون نیومد؟... دستی روی شانه‌ام نشست و فریادم را خواباند. برگشتم پدرش بود. او هم دیگر حرفی نداشتم. سر پیچ.', 'بودند و قضایا را برایش روشن کنم و از در که وارد می‌شدند، چنان هجومی می‌بردند که نگو! به جاهای دور از بدن نگه.', 'کاردستی کلاس پنجم، این عکس‌ها دلخوش کرده. ولی آخر چرا این هیکل مدیر کلی را با معلم حساب پنج و شش هم که نیومده.', 0, 0, 1, '1984-12-26 15:35:11', '1979-06-22 14:59:27', NULL),
	(73, 12, 'خاطر بچه‌های جغله دلهره‌ای نداشتم. در بیابان‌های.', 'DC-77', 'natus-quas-odit-ipsa', 18, 48164, 0, 'شده بود: «از ساعت ۷ به بعد ورود ممنوع». در زدم. از پشت در خانه می‌خورند، می‌رفتند بیرون. من فقط بیرون رفتن‌شان.', 'نیاوردم. چون دیدم نمی‌توانم قلب بچگانه‌ای داشته باشم تا با دو تا کله قند به او پز داده بوده. اما حاضر نبوده،.', 'و یک آب‌پاش که سوراخ بود و هوای بارانی. از در که وارد می‌شدند، چنان هجومی می‌بردند که نگو! به جاهای دور از.', 0, 0, 1, '2006-11-23 12:38:24', '2001-03-10 14:46:02', NULL),
	(74, 14, 'آمد. باید مدیر مدرسه هم حرف‌هایی داره که باید یک جایی.', 'DC-83', 'sunt-asperiores-totam-saepe-voluptate-distinctio', 916, 82204, 0, 'نه خودتون این کاره‌اید و نه اهل سینما بود و سرخود دویست سیصد تومان داده بود و حالا شکسته و کمی خونریزی داخل.', 'او را پاییدند تا از معلم‌های عزب و بی‌دست و پایی‌شان بود. آرام و معلم‌ها گوش تا گوش نشسته بودند و به رفقایی.', 'بود و یک استاد نجار را صدا زد و «پسر خفه شو» و خفه شدم. بغض توی گلویم بود. دلم می‌خواست یک کلمه دیگر بگوید. یک.', 0, 0, 0, '1980-11-17 13:41:12', '1977-04-24 00:47:50', NULL),
	(75, 19, 'دفتر سرگرم اختلاط بودند. خودم هم وقتی معلم بودم به این.', 'DC-28', 'excepturi-id-ab-sed-et', 319, 73530, 0, 'چه جونی کندم آقا تا آن‌ها را آزاد گذاشته بودم که یک مرتبه به صرافت ما افتاد و با صاحب‌خانه از قالی‌هایش حرف.', 'که می‌شد، خودم یک میتینگ بدهم که پرید وسط حرفم: - به شما چه مربوط است و پدرش تاجر بازار. بعد برگشتم به کارگزینی.', 'و بعد از معلم کلاس چهار دو تا از معلم‌ها بودند. معلوم شد کار هر روزه‌شان است. ناظم را تا این حکم را به فرهنگ.', 0, 0, 1, '1979-09-16 23:30:14', '1990-11-17 01:21:58', NULL),
	(76, 11, 'رساندم که: - اگر مهر هم بایست زد، خودت بزن بابا. و رفتم.', 'DC-69', 'asperiores-est-rem-non-soluta', 695, 85978, 0, 'ناظم داد که رئیس انجمن بود. رفتم توی نخ نمراتش. همه متوسط بود و پیدا بود باز توی کوک ناظم رفته بود و نه از فاعل.', 'که بروم وارسی، که باب میلم هست یا نه. و رفتم. مدرسه دو طبقه بود و زبان به شکایت باز کرد: - از آثار دوره‌ی اوناست.', 'و صدا می‌رفت. نه کاری داشت، نه چیزی از ناسلامتی در برق چشم‌هایش بود که چنین اهمیتی پیدا می‌کردم. این هم بدتر.', 0, 0, 0, '1980-01-06 10:45:24', '2009-10-25 07:33:41', NULL),
	(77, 10, 'هست آن روز صبح که می‌آمدند، جیب‌هاشان باد کرده بود..', 'DC-40', 'quis-temporibus-deleniti-omnis-et-quis', 525, 74066, 0, 'را سوا کرده بودم و فرستادش بالا. کاغذش را با همان صدا پرسیدم: - چرا به آقای ناظم دستمالم را دادم که لابد خل شدم.', 'زیر سایه‌ی سرکار، سال دیگر کلاس‌های دبیرستان را هم فرستادم سر کلاس سوم بود. روز اول خیلی زیاد بود. فردا صبح.', 'که یک مرتبه ترکید: - اگه من مدیر مدرسه و کلاس‌ها اغلب اوقات بی‌کارند. جانشین معلم کلاس چهار هنوز سر و صدا زد.', 0, 0, 0, '2011-02-12 13:54:34', '1979-08-21 11:37:59', NULL),
	(78, 7, 'مطلع بود. اما پاکت سربسته‌ای به اسم مدیر فرستاده بود.', 'DC-55', 'exercitationem-eum-sapiente-tempore', 794, 55594, 0, 'بود. خوشحال شدیم و احوالپرسی دست کرد و خنده‌ای و بعد حالیشان کردم که ناشیانه دود کرد از ترس و وحشت تپید. تا.', 'ولی سه چهار هفته بیش‌تر دوام نکرد. خسته شدم. ناچار به مدرسه رفتم و به همه‌شان قرض داد. کم کم خودمان را برای.', 'کنی که مبادا جلویم در بیاید که - به سر دیوار رفته است؟ ماحصل داد و رفت، من به ناظم گفتم: - اگر به تخته نچسبونید،.', 0, 0, 0, '1992-11-23 15:02:26', '1992-06-21 10:09:38', NULL),
	(79, 3, 'مثلاً می‌خواستم سفارش معلم کلاس سه، یک جوان ترکه‌ای.', 'DC-57', 'nihil-sapiente-quas-dolor-ut-adipisci-officiis-autem-omnis', 840, 74546, 0, 'تا کامیون شن آمد. دوتایش را توی ظرفش بیندازم که دیدم بسیار احمقانه است. سیگارم که تمام شد قضیه‌ی رئیس فرهنگ هم.', 'این خجالت خواهند ماند و دیگر دیر نخواهند آمد. یک سیاهی از ته جاده‌ی جنوبی پیداشد. جوانک بریانتین زده خورد توی.', 'نشند. بعد هم دوندگی در اداره‌ی بیمه و قرار شد که عصبانی نشود و قول گرفتم که اصلاً وابدا..! فلانی همچین و همچون.', 0, 0, 1, '1978-01-05 23:14:53', '1985-08-18 08:08:09', NULL),
	(80, 8, 'کرد و شروع کردند. مدام از خودشان صحبت می‌کردند از.', 'DC-70', 'sed-iure-eius-quo-quaerat', 499, 78031, 0, 'خودش نگفته باشم. و یک هفته‌ی دیگر خودم بروم پهلوی او... و این جور حماقت‌ها. این بود که رئیسش کردیم و آن وقت سال.', 'اتاق می‌ایستاد و معلم‌ها کلافه می‌شدند. نه می‌توانستند شلکلک‌های معلمی‌شان را در بیاورم، یارو پیش‌دستی.', 'به شمال، ردیف کاج‌های درهم فرو رفته‌ای که از هر طرف که بیایند مرا این ته، دم در زندان شلوغ بود. کلاه.', 0, 0, 1, '2007-08-16 01:32:13', '1989-08-19 15:40:00', NULL),
	(81, 17, 'زننده‌ای ردیف می‌کردم، تا پایش را از هم دوره‌ای‌های.', 'DC-22', 'similique-repudiandae-aut-vel-consequatur-qui-quisquam', 428, 61108, 0, 'کلاس چهارم عین خولی وسطمان نشسته. اغلب اعضای انجمن به زبان محلی صحبت می‌کردند از این‌که زنگ آخر را بزنند و.', 'سیگارش تکیه‌گاهی برای جسارتی که می‌خواست چیزی بگوید که پیش دستی کردم: - ...بازرس وزارت فرهنگم. که کلون صدایی.', 'بود که خیالم راحت بود. از سیصد و خرده‌ای می‌شد که مخفی بود و بچه‌های لاغر زیر بار آن گردن خود را چه بدهد؟.', 0, 0, 0, '1971-09-27 18:05:13', '1991-12-25 02:52:34', NULL),
	(82, 6, 'همین طوری گوشه‌ی اتاق می‌ایستاد و معلم‌ها هم. چون نه.', 'DC-49', 'omnis-qui-et-quaerat-id-sapiente-inventore', 482, 56929, 0, 'که زیر دستم عرق کرده بود، خوردیم تا زنگ را زدند و به انتظار آن که لنگر به سینه انداخته بود، شب‌ها انگلیسی.', 'که آمد حتی شنیدم که سوت می‌زد. اما بی‌انصاف چنان سلانه سلانه می‌آمد که یک مرتبه به صرافت افتادم که از سر.', 'خودش برساند و رسیدش را بیاورد. و پس فردا صبح، بیاید مدرسه و شهادت همه‌ی معلم‌ها برای اداره‌ی فرهنگ، داد.', 0, 0, 0, '1986-04-27 06:31:29', '2018-09-16 13:49:18', NULL),
	(83, 4, 'مرتب و صورت سرخ و سفید و سالکی به گونه. جلوی روی بچه‌ها.', 'DC-93', 'nisi-ut-repellat-et-perferendis-enim-tempora-ratione', 629, 68704, 0, 'کنم؟... از معلم و دویست و سی و چند تا بچه دارد و این جور چیزها. دو نفرشان چلو خورش می‌آوردند؛ فراش اولی مدرسه.', 'راستی اگر رئیس فرهنگ حقوق‌شون رو زده. - عجب! چرا؟ مگه رئیس قبلی چپش کم بود؟ - چه عرض کنم. می‌گند پا تو کفش یکی از.', 'که سر یک کلاس دیگر هم با اسکورت می‌آمدند. از بیست سی نفری که ناهار می‌ماندند، فقط دو تا پسر که هر چه خفت.', 0, 0, 0, '1991-08-09 17:25:29', '1998-09-10 11:34:49', NULL),
	(84, 13, 'و مثلاً خالی از عصبانیت گفت: - جا نداریم آقا. این که.', 'DC-19', 'ea-et-explicabo-sequi-facilis-iste-voluptatibus-sit-totam', 474, 84040, 0, 'هم بودند که برای خالی نبودن عریضه رونویس را با مزخرفی از انبان مزخرفاتت، مثل ذره‌ای روزی در خاکی ریخته‌ای که.', 'گذاشتم و بی این که سوال را ازو کردم. اما همه‌اش در این شهر کسی را زده‌ام که لیاقتش را داشته. حتماً از این.', 'جمع شد به ناظم زدم که ولش کردند و بچه‌ها سر کلاس سوم بود. روز اول که دیدمش لباس نارنجی به تن می‌مالیدم. اما.', 0, 0, 0, '1996-01-03 21:08:41', '1970-09-21 07:12:08', NULL),
	(85, 11, 'بود. درست مثل مدرسه، دور افتاده است و رئیس فرهنگ رفتم..', 'DC-32', 'doloremque-exercitationem-veritatis-atque-debitis', 724, 77151, 0, 'مدرسه، بزرگ‌ترین رقم مال من بود و تا خبر رسمی بشنود و در دامنه‌ی کوه تنها افتاده بود و چه دست‌ها که نبریده.', 'به او می‌زدم. خیس عرق بودم و خوانده بودم. اگر یک فراش که بیشتر نبود! و تازه استخدام شده بود. مدرسه سوت و کور بود..', 'غرض‌شان این بود که میان من و ناظم آمد اتاقم که بودجه‌ی مدرسه را با آب به خوردش دادم و گریختم. از در آمدیم.', 0, 0, 0, '1985-07-16 11:47:49', '2012-02-04 22:59:02', NULL),
	(86, 19, 'در نمی‌آمد. این بود که با نان آقا معلمی چه طور می‌شد.', 'DC-100', 'qui-dolores-velit-itaque-reprehenderit', 735, 74539, 0, 'بالا. کاغذش را با قربان صدقه توی حلقشان می‌تپانند. کلاس دوم بود و خودش سواد داشت و تا خبر رسمی بشنود و در رفته..', 'حظ کردم! آن دو نفر از معلم‌ها بودند. معلوم شد می‌خواسته ناظم را هووی خودشان می‌دانند و خیلی زود معلم‌ها.', 'پیدا بود برای کتک‌کاری هم آماده باشد. سرخ شده بود در همین حین یکی از دم‌کلفت‌های همان اطراف بود و ساعت اول.', 0, 0, 0, '1995-08-07 23:06:17', '1971-02-07 02:05:16', NULL),
	(87, 4, 'آن رسیده بود که تحویل گیرنده باید پرشان کند. همین کار.', 'DC-92', 'est-ea-omnis-a-repudiandae', 300, 56719, 0, 'سیگاری تعارفش کردم که او را غریبه بدانند. نه دیپلمی، نه کاغذپاره‌ای، هر چه بود او هم مرا گذاشت و رفت با یک.', 'نوشتیم آقا. می‌گند نمی‌شه پول دولت رو تو ملک دیگرون خرج کرد. - گفتم مگه باز هم می‌دادیم. اما خبر که رسمی شد،.', 'که از نوشتن باز می‌ماندند. می‌دیدم که این بار به هوای دیدن مجموعه تمبرهای فاعل با هم تمام بخاری‌ها را از.', 0, 0, 1, '2002-04-21 10:31:12', '1987-04-24 07:39:47', NULL),
	(88, 4, 'صبح به صبح ریشم را بتراشم و یخه‌ام تمیز باشد و هر کدام.', 'DC-10', 'atque-rerum-vero-id-eveniet', 230, 63042, 0, 'صندوقدار که کیف پولش را همراهش نیاورده بود ناچار حضار تصویب کردند که پول‌ها فعلاً پیش ناظم باشد. و صورت سرخ و.', 'یکی از آن‌ها جمع شده بودند و هر چه خفت کشیده، بس است و وعده‌ها دادیم که معلمش را دم خورشید کباب کنیم و از.', 'هم به این فکر بودم که از شغل مهم و محترم دبیری دست می‌شویم. ماهی صد و خرده‌ای تومان که می‌گرفت، پنجاه تومان.', 0, 0, 1, '1979-05-21 18:35:34', '2000-10-12 22:25:12', NULL),
	(89, 12, 'بی‌صدا خندیدند و در مقابل یک فراش مدرسه خرت و خورت.', 'DC-67', 'nam-qui-dicta-consequuntur', 203, 73401, 0, 'جوان ترکه‌ای بود؛ بلند و با حالی زار روی صندلی افتادم، نه از عروسک‌های کوکی‌شان که ناموسش دست کاری شده بود..', 'مسلول باشد. البته او هم دیگر حرفی نداشتم. سر پیچ خداحافظ شما و تاکسی گرفتم و کشیدمش کناری و در هر سه ورق نوشتم و.', 'و پهلوی خودش جا باز کرد و گوش تا گوش نشسته بودند و آورده بودند. ناچار حق داشت که خیالش راحت باشد. اما من نه کسی.', 0, 0, 0, '1994-10-31 17:43:30', '1984-09-02 12:30:40', NULL),
	(90, 8, 'کرده است. کلی با مادرش صحبت کردم. پیرانه. و او جوان بود.', 'DC-31', 'odit-perferendis-fugiat-ex-iusto', 301, 54069, 0, 'و حق آب و تاب و خودش سواد داشت و تا حاضر بشوم، می‌شنیدم که دارد قضیه را برای ناظم تعریف کرده بودند و حق بوقی.', 'هم روی دیوار مدرسه را بخرند و خانه بسازند و زمین یارو از عقب سر شنیدم.اما چنان از خودم بدم آمده بود و گفتم این.', 'بود که جمعاً نمی‌توانستم ازو بگذرم. مرد عمل بود. کار را گرفته بودم تا رسیده بودم به این‌جا. همان روز سیاه کرده.', 0, 0, 0, '1985-09-29 15:05:24', '1987-09-23 23:14:25', NULL),
	(91, 15, 'می‌خندد. بعد کمی این دست و سفید و سالکی به گونه. جلوی.', 'DC-96', 'ad-et-ipsa-voluptatem-corrupti-qui', 444, 63228, 0, 'کشیده‌ای. ده سال «الف.ب.» درس دادن و قیافه‌های بهت‌زده‌ی بچه‌های مردم با چه صمیمیتی... حرفش را بریدم که: -.', 'به دست می‌رسید. عصر همان روز وارسی فهمیده بودم که فراش جدید هم در مطالبی که او را می‌خواهد و حال به خاطر سیصد.', 'زغال دستش بود و: - آقایان عرضی دارند. بهتر است و از بیمارستان مرخصش کرده بودند و فرستاده بوده‌اند مریض‌خانه..', 0, 0, 0, '2010-04-05 15:14:34', '1979-12-14 04:35:04', NULL),
	(92, 12, 'و لابد به همین سادگی تمام می‌شود. و بعد شیشه‌ی بزرگی.', 'DC-50', 'et-animi-sed-aut-qui-qui', 811, 41976, 0, 'حیف از من، که حتی بچه‌هایی هم که باشی باید شخصیت و غرورت را لای زرورق بپیچی و طاق کلاهت بگذاری که اقلاً چرا.', 'اغلب اوقات بی‌کارند. جانشین معلم کلاس پنج تون بپرسید. که راحت شدم و داستان آخوندی را گفتم زدند و بچه‌ها را.', 'افزودم: - دو روز بعد رفتم سراغش. معلوم شد آن دخترک ترسیده و «نرسیده متلک پیچش کرده‌اید» رئیس فرهنگ این طور که.', 0, 0, 1, '2015-09-10 07:39:16', '1974-03-31 03:40:26', NULL),
	(93, 16, 'معلوم شد که با کدخدامنشی حل شد و قول‌ها داد و هوار و.', 'DC-93', 'molestias-explicabo-dolorem-et-doloremque-optio-adipisci-et', 117, 65043, 0, 'و گفت چه طور است زنگ بزنیم و جلوی بچه‌ها ادبش کنیم و از این نمی‌شد. بی سر و کله‌ی بازرس تربیت بدنی هم پیدا شد و.', 'اضافه حقوق شغل جدیدم در بیاورم. البته از معلمی، هم اُقم نشسته بود. ده سال تجربه این حداقل را به هم می‌گفتند. در.', 'درست مثل اتاق همان مهمان‌خانه‌ی تازه‌عروس‌ها. هر چیز به جای این‌که حرفی بزند به گریه افتاد. هرگز گمان.', 0, 0, 0, '1996-03-25 05:15:33', '1992-03-29 08:01:22', NULL),
	(94, 15, 'از یک چیزی. صدایم را کلفت کردم و یک آب‌پاش که سوراخ بود.', 'DC-36', 'atque-doloribus-vero-tempore-sint-velit-error-aut', 857, 54483, 0, 'را انتخاب می‌کنند، اما من تا از معلم‌های ما متأهل‌اند. که قرمز شد و هر چه که به من ببخشید. و از این اتفاق‌ها.', 'کرد به این زودی‌ها آفتابی نشوند. چهل و پنج سال سابقه. کار از همین عکس‌ها را با آب به خوردش دادم و وقاحت را با.', 'به من یاد می‌داد که به جای این‌که حرفی بزند به گریه افتاد. هرگز گمان نمی‌کردم از چنان قد و قواره. حظ کردم! آن.', 0, 0, 1, '2008-04-18 12:06:49', '1981-10-25 05:28:30', NULL),
	(95, 15, 'چنان هجومی می‌بردند که نگو! به جاهای دور از نظر. یک بار.', 'DC-94', 'maxime-est-beatae-tempore-ab-cumque-architecto-voluptatem-ut', 230, 44853, 0, 'به اینکه «ان‌شاءالله زیر سایه‌ی سرکار، سال دیگر می‌تواند از حق فنی نظامت مدرسه استفاده کند ... بعد بلند شدیم.', 'اما معلم‌ها هم، لابد هر کدام عبارت بود از مدرسه ببرد که در ماند. یعنی ساکت ماند. آب سرد، عرق بیدمشک، سیگار پشت.', 'خروار تحویل بگیرم و بعد هم اسم مرا هم به سراغ رئیس فرهنگ که چرا اسم پسر او را پاییدند تا از ترکه‌ها را که توی.', 0, 0, 1, '1978-04-12 07:39:18', '2008-11-03 05:01:23', NULL),
	(96, 12, 'حیاط بود و ساعت اول هیچ معلمی نمی‌توانست درس بدهد..', 'DC-3', 'atque-quia-est-voluptates-aut-harum', 409, 74357, 0, 'که هیچ کس در مدرسه خواهند دید و تمام طول راه در این خجالت خواهند ماند و دیگر دیر نخواهند آمد. یک سیاهی از ته.', 'می‌گشتم به این فکر افتادم که بروم ببینم چه می‌نویسد. ولی چنان مضطرب می‌شدند و دستشان به دهان‌شان می‌رسد و.', 'از پسرش و کلی دروغ و دونگ، و چادرش را روی تخته سه لایی بچسباند و دورش را سمباده بکشد و بیاورد. به هر صورت خوشحال.', 0, 0, 1, '1980-02-13 15:54:53', '2015-02-15 05:16:34', NULL),
	(97, 2, 'می‌کردم. این هم معلمم. که یک معلم کوفتی باشی، نه چرا.', 'DC-84', 'suscipit-sed-recusandae-illum-optio-dolorum', 83, 85625, 0, 'و قرار و مداری دارند و کدام یک خواهد نشست. یکی دو بار کوشیدم بالای دست یکی‌شان بایستم و نه لزومی دارد. او چه.', 'دادم و مسخ‌شده‌ی خنده‌اش را با مزخرفی از انبان مزخرفاتت، مثل ذره‌ای روزی در خاکی ریخته‌ای که حالا سبز.', 'پالان هم گذاشتیم و چای دو جانبه. رفتم تو. بو تندتر بود و روی آن ورقه‌ی ماشین شده‌ی «باسکول» که می‌گفت کامیون.', 0, 0, 1, '1972-12-11 09:58:20', '2019-10-16 13:54:24', NULL),
	(98, 2, 'قبلی برای دو روز بعد سه تا از بچه‌ها صورتش مثل چغندر.', 'DC-17', 'qui-maxime-qui-omnis-quo-perspiciatis', 133, 42992, 0, 'بوده فاعل را از مدیر شدن برایش خلاصه کردم و لابد آن‌قدر ساده لوح بودند که مدیرم. و لابد خودش فهمید مدیر کیست..', 'این ولی طفل گیجم کرده بود و دیدم از ترس این که مبادا جلویم در بیاید و نه به دنبال خرده فرمایش‌هایشان می‌رفت..', 'حرف می‌زند کجا را نگاه می‌کند. با هر بار که شیرینی بر می‌داشتند، یک بار دیگر استعفانامه‌ام را توی حیاط تا.', 0, 0, 0, '1985-03-20 15:09:13', '2019-10-16 13:55:36', NULL),
	(99, 20, 'که خانمی توی دفتر بردند و بچه‌ها سر کلاس و بعد حالیشان.', 'DC-68', 'alias-cum-quo-tenetur-occaecati-quia', 632, 41863, 0, 'فاصله‌ی ساعات درس، همچه که معلم‌ها حق دارند جایی بخوابند که آب برایش بیاورد و حالش که جا آمد، بیاوردش پهلوی.', 'است، نجات داده باشم. این بود که محتاج به این زودی‌ها آفتابی نشوند. چهل و پنج ساله مردی بود با یخه‌ی بسته.', 'اتاق نظارت کنم و هم‌دردی نشان بدهم.این جور بود که رعایت حال بچه‌های قد و قواره. حظ کردم! آن دو نفر از معلم‌ها.', 0, 0, 0, '2011-03-08 23:57:45', '2019-10-16 13:55:32', NULL),
	(100, 17, 'و پوشت و کراوات زرد و پهنی که نعش یک لنگر بزرگ آن را روی.', 'DC-87', 'ut-id-tempora-dolorem-dolores-dolores', 660, 49395, 0, 'بار شاهد دعواهایی بودم که صدای سوز و بریز بچه‌ها به پیشبازم آمد. تند کردم. پنج تا شاگرد. دیگر حسابی مدیر مدرسه.', 'نشان و شبانه کلانتری؛ و تمام طول راه در این میان حرفی نزدم. می‌توانستم حرفی بزنم؟ من چیکاره بودم؟ اصلاً به.', 'رو زده. - عجب! پس اونم می‌خواسته اصلاحات کنه! بیچاره. و بعد با ناظم سر و کله‌ی بازرس تربیت بدنی هم پیدا شد و من.', 0, 0, 0, '2012-04-19 03:02:33', '2019-10-16 13:55:34', NULL);
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

-- Dumping data for table 517_shop.role: ~0 rows (approximately)
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` (`key`, `title`, `created_at`, `updated_at`) VALUES
	('admin', 'ادمین', NULL, NULL),
	('charging_products', 'شارژ محصولات', NULL, NULL),
	('content_manage', 'مدیر محتوا', NULL, NULL),
	('programmer', 'برنامه نویس', NULL, NULL),
	('sales_agent', 'نماینده فروش', NULL, NULL),
	('super_admin', 'سوپر ادمین', NULL, NULL),
	('ticketing', 'مدیر تیکت ها', NULL, NULL),
	('warehouse_keeper', 'انباردار', NULL, NULL);
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
  `mobile` varchar(11) COLLATE utf8_persian_ci NOT NULL,
  `role_key` varchar(20) COLLATE utf8_persian_ci NOT NULL,
  `name` varchar(50) COLLATE utf8_persian_ci NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `password` varchar(255) COLLATE utf8_persian_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_persian_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_mobile_unique` (`mobile`),
  KEY `users_role_key_index` (`role_key`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8 COLLATE=utf8_persian_ci;

-- Dumping data for table 517_shop.users: ~0 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `mobile`, `role_key`, `name`, `status`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
	(1, '02681288104', 'programmer', 'شیدخت کامکار', 1, '$2y$10$I5DgAkGN2lSEP6hWF9ofMetTxVNGig/bA93TcAFcPofdFwgfVY9eq', NULL, '2019-10-16 13:40:58', '2019-10-16 13:40:58'),
	(2, '02160299144', 'programmer', 'استاد بهزاد طالقانی', 1, '$2y$10$3aulfNMawO/nJYzPv5Wkf.UpIrX8DoYzau8nZQ41gSPo90QUrGPwu', NULL, '2019-10-16 13:40:58', '2019-10-16 13:40:58'),
	(3, '02630100274', 'programmer', 'پیران خوئینی', 1, '$2y$10$6SszC4LetNMyBgZlsc8IvuT2mt1comlYiYHOcsIWwTWs9TxuRF4DO', NULL, '2019-10-16 13:40:58', '2019-10-16 13:40:58'),
	(4, '02199787385', 'programmer', 'میلا جهانگیری', 1, '$2y$10$WqeA/vJY8Vw6ZujyZtH7PeDPuo.6tIyX2Fmxw5BKveMUCXqgpp4la', NULL, '2019-10-16 13:40:58', '2019-10-16 13:40:58'),
	(5, '02671938456', 'programmer', 'مژگان اشراقی', 1, '$2y$10$5KC2swe0HAe.o.sTxDFNFOp8k6MSwm/hZ337J.Iaytsl5OiVe1oDC', NULL, '2019-10-16 13:40:58', '2019-10-16 13:40:58'),
	(6, '02660038434', 'programmer', 'شهداد شریف', 1, '$2y$10$wKm5jSFpurOWqLLmH4f0cOQKhCyp8vOLx70AvSsjk7aSQIWA8Ni2S', NULL, '2019-10-16 13:40:59', '2019-10-16 13:40:59'),
	(7, '02134820831', 'programmer', 'مهندس رخشان توسلی', 1, '$2y$10$JnxJMobkB1YUaxfPVN8ae.OSZocvMjqxb49NFMjYcCPNINPS1RKyW', NULL, '2019-10-16 13:40:59', '2019-10-16 13:40:59'),
	(8, '02115337274', 'programmer', 'زرآسا طبیب‌زاده', 1, '$2y$10$JLbvIadq8zzoTtEe0x2ciessliqxWLGBM2VgxbxGcJZ1ovOxoFHVO', NULL, '2019-10-16 13:40:59', '2019-10-16 13:40:59'),
	(9, '03114483668', 'programmer', 'طاهر حائری', 1, '$2y$10$NeMk21qC.GllNSTDKJ4dIOG9TuJtiqJy783yJ6dBCN7aiRwY.9Hae', NULL, '2019-10-16 13:40:59', '2019-10-16 13:40:59'),
	(10, '02666427858', 'programmer', 'تارا شیرمحمدی', 1, '$2y$10$78j306eMSVxMNmBLtuoyvOnyTVJdoM.lJUjL.O7f3GyEMfzJgFfxe', NULL, '2019-10-16 13:40:59', '2019-10-16 13:40:59'),
	(11, '03186144259', 'programmer', 'بهتام افخم', 1, '$2y$10$sfJ/Zm2EPmIi9SnAYno5Q.Z3i0G.0q7H7E3M.EOXi2g5RdqSopT3y', NULL, '2019-10-16 13:40:59', '2019-10-16 13:40:59'),
	(12, '03145810663', 'programmer', 'پروسکا قهرمان', 1, '$2y$10$8Mb4hDHsZYdFBhysbWPURuoC8/6wnb08VVZNZzx8FqBQJ6Uk4LOPW', NULL, '2019-10-16 13:40:59', '2019-10-16 13:40:59'),
	(13, '02180862484', 'programmer', 'نیما محمدی', 1, '$2y$10$.Xq1TkpnufA6qoh8yGwlhe4INUSMUt7UMizJ04ArUpHsD6qApQa6O', NULL, '2019-10-16 13:40:59', '2019-10-16 13:40:59'),
	(14, '03174803909', 'programmer', 'مهندس آوا آهنگر', 1, '$2y$10$yB2hJvl4IQ5zTCKzjX56eun5w1VhguXpxYmUfGHHerW/gjC8UesY.', NULL, '2019-10-16 13:40:59', '2019-10-16 13:40:59'),
	(15, '02161105512', 'programmer', 'بهین حقیقی', 1, '$2y$10$tD0wMYZTfDr5yH2PntxoVeWkXE7hPalofrTW1be.PKiGpfeY5OWcG', NULL, '2019-10-16 13:40:59', '2019-10-16 13:40:59'),
	(16, '02670118909', 'programmer', 'تورک اشراقی', 1, '$2y$10$vno1m0HkxsbCJxH9R0pOaOQWCdyDreAxtU2qRXe1krhWhKkPdj0w.', NULL, '2019-10-16 13:40:59', '2019-10-16 13:40:59'),
	(17, '03126318168', 'programmer', 'شاهور فرشیدورد', 1, '$2y$10$qqMQSZqU3PzTZ5gTXYUZVObA5D1FRJVFTtY0uGvlRsQm4iQjzdRtG', NULL, '2019-10-16 13:40:59', '2019-10-16 13:40:59'),
	(18, '02685878684', 'programmer', 'نگان سروش', 1, '$2y$10$KS/mL2nvlI.erXc3Fv.NCeHwRf.s/OmLNFOVM2mr0qkiIzVd0x4PG', NULL, '2019-10-16 13:40:59', '2019-10-16 13:40:59'),
	(19, '03112479768', 'programmer', 'مهفام تبریزی', 1, '$2y$10$pgGYRHrvQ.1sDs4KBNg4seYf0e3yp4hC5YHW4vidQ66GHYeZQThKC', NULL, '2019-10-16 13:40:59', '2019-10-16 13:40:59'),
	(20, '03157760231', 'programmer', 'ورجاوند بزرگ‌نیا', 1, '$2y$10$aJeEWfSq.73.syHmxwfP9eCaq2fyqsnTZZOk1A9ACyPE1Z8B6KzEW', NULL, '2019-10-16 13:40:59', '2019-10-16 13:40:59'),
	(21, '03110602472', 'programmer', 'وُریا عارف', 1, '$2y$10$NKZdy1mRuYMfaK/hZ4U33.CdBl1vV5GURD5/hfKoxXrgUw2awjAwq', NULL, '2019-10-16 13:41:00', '2019-10-16 13:41:00'),
	(22, '02602807990', 'programmer', 'افراسیاب روزبه', 1, '$2y$10$RCQxSVXwAqjnID.ZtpaiXeElXI71RQXcG3RKwGSPnDqeeMWz9JDP2', NULL, '2019-10-16 13:41:00', '2019-10-16 13:41:00'),
	(23, '02625961159', 'programmer', 'مهرورز نهاوندی', 1, '$2y$10$PsukwjVRL2EIL9UBgzT6l.zCdEWJi19BYT7RT4mHw3ounwO2MQjru', NULL, '2019-10-16 13:41:00', '2019-10-16 13:41:00'),
	(24, '03174810190', 'programmer', 'نوند لاهوتی', 1, '$2y$10$UW95wsWD17/IPY88nBKA2O2ZzJTAJsJV2DNSIf/IEubS8xjo7XiBe', NULL, '2019-10-16 13:41:00', '2019-10-16 13:41:00'),
	(25, '03173753636', 'programmer', 'یکامه نیشابوری', 1, '$2y$10$xFFW7LIMp5kHp/NKigXAE.oAYYOzTXznoLEuk0Dw.QPOeJKSn1Ume', NULL, '2019-10-16 13:41:00', '2019-10-16 13:41:00'),
	(26, '03194840352', 'programmer', 'سیمین جنتی', 1, '$2y$10$5Ikdz6pmseRHzMwUaJzuvetbXbMdVDQAiWWXjNs75bB0e2DN5r12e', NULL, '2019-10-16 13:41:00', '2019-10-16 13:41:00'),
	(27, '02136454485', 'programmer', 'دکتر فتّانه زالی', 1, '$2y$10$XA0SBoR06NO1FzLdrWhrT.QU2HpjoMcnpOy1cI/DncZDDol7O7Z2W', NULL, '2019-10-16 13:41:00', '2019-10-16 13:41:00'),
	(28, '02111850839', 'programmer', 'خانم ناجی مظفر', 1, '$2y$10$YgSOW/.dEkBhNLzFmGkVZe0JeDY9XvR.4Zms4rpMJGSV8gZvCnx8u', NULL, '2019-10-16 13:41:00', '2019-10-16 13:41:00'),
	(29, '03134554237', 'programmer', 'نشواد شادمهر', 1, '$2y$10$yZoL1K8PhSzQkqBFhQ3ZvuWiuQY4WhDWaWvmNzp9l1NtIlc1H6qK.', NULL, '2019-10-16 13:41:00', '2019-10-16 13:41:00'),
	(30, '03136131955', 'programmer', 'زادفر کلباسی', 1, '$2y$10$G1CunxIo.jknpC791NiUtO75bidzB/MD3KqYJn3eqynhRNEvSKKlm', NULL, '2019-10-16 13:41:00', '2019-10-16 13:41:00'),
	(31, '02131865656', 'programmer', 'سامین حجتی', 1, '$2y$10$TLZg0t/lJM4sknUuqDak.eH1v7R8HdqvyaS/nWHFCCRcYKARqgaMW', NULL, '2019-10-16 13:41:00', '2019-10-16 13:41:00'),
	(32, '02178709268', 'programmer', 'دکتر مردآویج سپه‌وند', 1, '$2y$10$dGHBu3dGK5NLIEL50cD3quOpYT/.zq99Ex5kFmXpkOJosiFWdrwp.', NULL, '2019-10-16 13:41:00', '2019-10-16 13:41:00'),
	(33, '02175868334', 'programmer', 'یاشار جمادی', 1, '$2y$10$z4kr8RDqJzb.F/vK/SSgvuCh7FXb.vR3b.HKUMydD5lP11l16e2E.', NULL, '2019-10-16 13:41:00', '2019-10-16 13:41:00'),
	(34, '03124516884', 'programmer', 'مهندس فرهنگ شاملو', 1, '$2y$10$Gfs4ib2H0M0Vz4wPTFtFsOLhtFn.SpJ75j.ZU4Xj5lEvHlvv.RAoK', NULL, '2019-10-16 13:41:00', '2019-10-16 13:41:00'),
	(35, '02153661835', 'programmer', 'سحرناز علی‌پور', 1, '$2y$10$9kQzuadfkEyKm7gnmu6h3eoOHY/kQcPc7db9N27Tf4FFvFCOMHEuG', NULL, '2019-10-16 13:41:00', '2019-10-16 13:41:00'),
	(36, '02677504603', 'programmer', 'راجی شرع‌پسند', 1, '$2y$10$yln1SKoUm6bwm6bznA/OveEwI3LXwFbpgY1CqqZD/lv8H2evM2IFq', NULL, '2019-10-16 13:41:01', '2019-10-16 13:41:01'),
	(37, '03183445063', 'programmer', 'دکتر تیشتار مشا', 1, '$2y$10$lR8Yr8YLUQjny.zD98Lk1uUaRA/nIIuSzwGBb4/2dPjh3AKDO7sQy', NULL, '2019-10-16 13:41:01', '2019-10-16 13:41:01'),
	(38, '02658986383', 'programmer', 'نوشزاد مجتهد', 1, '$2y$10$T0oZyOdHCyglidNXSPZrTeW/4LMYMI5bXTqqbEkeWy4GDElhQwJse', NULL, '2019-10-16 13:41:01', '2019-10-16 13:41:01'),
	(39, '02110357715', 'programmer', 'گوماتا زنجانی', 1, '$2y$10$8D/SyheL3pOluQQH1sdvVOqYAfoJXdvv8FhDibNtwNwRPLkp4iQSO', NULL, '2019-10-16 13:41:01', '2019-10-16 13:41:01'),
	(40, '03129897523', 'programmer', 'هیرسا زرشناس', 1, '$2y$10$BiKeJ4bQ6pPyE3pWou0pzu4t1tqdy2ADEOe47SG9ecEC14NdwHGvu', NULL, '2019-10-16 13:41:01', '2019-10-16 13:41:01'),
	(41, '02115195407', 'programmer', 'فائقه ابریشمی', 1, '$2y$10$Louqfaz19fURFV6C9LIvx.ocvIN47zdfE3s6QWAcFVH8ISJwelSuS', NULL, '2019-10-16 13:41:01', '2019-10-16 13:41:01'),
	(42, '02648496757', 'programmer', 'کیانا علی‌زمانی', 1, '$2y$10$4DP8HgXmSCHo872hWZT/JeegEUVxL8lt2tySP2J4hrMf9CmQVOoYu', NULL, '2019-10-16 13:41:01', '2019-10-16 13:41:01'),
	(43, '02130741016', 'programmer', 'شهراد کاشی', 1, '$2y$10$Ww/CqEhpeNmy.BOllb6Wcu8N.0vz2HQgyIHhT8/HubSJ8UfJb.Aju', NULL, '2019-10-16 13:41:01', '2019-10-16 13:41:01'),
	(44, '03108255253', 'programmer', 'خندان میرزاده', 1, '$2y$10$yfGzY8G.yQsqeAZEiR30bu4jLxOSMTZYKGi6SLa9LG6fi0AOq.tby', NULL, '2019-10-16 13:41:01', '2019-10-16 13:41:01'),
	(45, '03144130098', 'programmer', 'وشمگیر زهرایی', 1, '$2y$10$l8oUqqTpEm.sqsF0boMEoOOg2hsKXvLrGyPmkMXjC76umiMr1v0VW', NULL, '2019-10-16 13:41:01', '2019-10-16 13:41:01'),
	(46, '02158472463', 'programmer', 'فریس نجفی', 1, '$2y$10$auIk3ONbtvQqeecomiIIi.D7udzphomVEMzErkGlKNN6PRhoc9hue', NULL, '2019-10-16 13:41:01', '2019-10-16 13:41:01'),
	(47, '02144421669', 'programmer', 'آقای ژوبین استادی', 1, '$2y$10$4.INLhf258g2Ut9g2EASbOtT.Waja1cDOf1V6.ATVBLA0CkOo2RG6', NULL, '2019-10-16 13:41:01', '2019-10-16 13:41:01'),
	(48, '02189391136', 'programmer', 'آریارمنا آهی', 1, '$2y$10$1CsQPTix7JMXQD/t0X2vNuEhcDBHaGM97ym4UrzKXmMYyswEAnOrW', NULL, '2019-10-16 13:41:01', '2019-10-16 13:41:01'),
	(49, '02620085511', 'programmer', 'ارشیا مجتبوی', 1, '$2y$10$yrTUz0FfUeAFYpD6v6oZz.lhNmRb99CCSRDjL4TXsVaWAsPNsBLki', NULL, '2019-10-16 13:41:01', '2019-10-16 13:41:01'),
	(50, '02610223784', 'programmer', 'کوشان قهرمان', 1, '$2y$10$v4EbZx6PNyM/lSzMnnUbMe0xZmqORQlpi2BbllFS6GLpQ.lXeiLRC', NULL, '2019-10-16 13:41:01', '2019-10-16 13:41:01');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
