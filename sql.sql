-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.11-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

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

-- Dumping structure for table 517_shop.blog_categories
CREATE TABLE IF NOT EXISTS `blog_categories` (
  `content_id` bigint(20) unsigned NOT NULL,
  `category_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`content_id`,`category_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.blog_categories: 4 rows
/*!40000 ALTER TABLE `blog_categories` DISABLE KEYS */;
INSERT INTO `blog_categories` (`content_id`, `category_id`) VALUES
	(68, 13),
	(68, 14),
	(69, 13),
	(69, 14);
/*!40000 ALTER TABLE `blog_categories` ENABLE KEYS */;

-- Dumping structure for table 517_shop.blog_category
CREATE TABLE IF NOT EXISTS `blog_category` (
  `value` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `_lft` int(10) unsigned NOT NULL DEFAULT 0,
  `_rgt` int(10) unsigned NOT NULL DEFAULT 0,
  `parent_id` int(10) unsigned DEFAULT NULL,
  `label` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `heading` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `meta_title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `meta_description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`value`),
  UNIQUE KEY `slug` (`slug`),
  KEY `_lft` (`_lft`),
  KEY `_rgt` (`_rgt`),
  KEY `parent_id` (`parent_id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.blog_category: 4 rows
/*!40000 ALTER TABLE `blog_category` DISABLE KEYS */;
INSERT INTO `blog_category` (`value`, `slug`, `_lft`, `_rgt`, `parent_id`, `label`, `heading`, `meta_title`, `meta_description`, `content`, `status`, `created_at`, `updated_at`) VALUES
	(13, '1', 1, 4, NULL, 'مطالب آموزشی', NULL, NULL, NULL, NULL, 1, '2020-01-22 10:12:59', '2020-01-22 10:12:59'),
	(14, '2', 5, 8, NULL, 'گوشی موبایل', NULL, NULL, NULL, NULL, 1, '2020-01-22 10:36:47', '2020-01-22 10:36:47'),
	(15, NULL, 9, 10, NULL, 'علم و فناوری', NULL, NULL, NULL, NULL, 1, '2020-03-26 15:54:41', '2020-03-26 15:54:41'),
	(16, NULL, 11, 12, NULL, 'آشپزی', NULL, NULL, NULL, NULL, 1, '2020-03-26 15:54:52', '2020-03-26 15:54:52'),
	(17, NULL, 2, 3, 13, 'اخبار', NULL, NULL, NULL, NULL, 1, '2020-03-26 23:24:22', '2020-03-26 23:24:22'),
	(18, NULL, 6, 7, 14, 'لوازم آرایشی', NULL, NULL, NULL, NULL, 1, '2020-03-26 23:24:30', '2020-03-26 23:24:30');
/*!40000 ALTER TABLE `blog_category` ENABLE KEYS */;

-- Dumping structure for table 517_shop.blog_content
CREATE TABLE IF NOT EXISTS `blog_content` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_by` bigint(20) unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `heading` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `meta_title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `meta_description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `visitor` bigint(20) NOT NULL DEFAULT 0,
  `created_at` datetime DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `FK_blog_content_users` (`created_by`)
) ENGINE=MyISAM AUTO_INCREMENT=81 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.blog_content: 4 rows
/*!40000 ALTER TABLE `blog_content` DISABLE KEYS */;
INSERT INTO `blog_content` (`id`, `slug`, `created_by`, `title`, `heading`, `meta_title`, `meta_description`, `content`, `status`, `visitor`, `created_at`, `updated_at`) VALUES
	(68, 'شسیشیشی', 1, 'شسیشیشی', 'شیشسیسشیشس', 'شسیشیشی', 'شسیشیشی', 'به گزارش" ورزش سه"، امروز یحیی گل محمدی سرمربی پرسپولیس در کنفرانس خبری پیش از بازی با تراکتور درباره حضور آنتونی استوکس گفت که با توجه به شرایط مالی که باشگاه دارد با وجود آنکه حضور این مهاجم می تواند در لیگ برتر و لیگ قهرمانان کمک بسیار خوبی باشد اما ترجیح می دهد که او را جذب نکنند.با این وجود و در حالی که گفته می شد پرسپولیس هنوز نتوانسته مبلغ پیش پرداخت استوکس را تهیه کند اما محمدحسن انصاری فرد مدیرعامل پرسپولیس در گفت و گویی که با برنامه "فرمول یک" شبکه یک داشت اعلام کرد که این مهاجم ایرلندی و سابق تراکتور امشب به تهران خواهد آمد.البته به گفته مدیر روابط عمومی پرسپولیس زمان حضور استوکس در ایران ممکن است به فردا بیفتد چرا که هنوز قرارداد طرفین نهایی نشده است.', 1, 0, '2020-01-18 21:50:24', '2020-01-26 02:54:58'),
	(69, 'دیدار-با-نخبگان', 1, 'دیدار با نخبگان', 'شیشسیسشیشس', 'دیدار با نخبگان', 'دیدار با نخبگان', 'به گزارش" ورزش سه"، امروز یحیی گل محمدی سرمربی پرسپولیس در کنفرانس خبری پیش از بازی با تراکتور درباره حضور آنتونی استوکس گفت که با توجه به شرایط مالی که باشگاه دارد با وجود آنکه حضور این مهاجم می تواند در لیگ برتر و لیگ قهرمانان کمک بسیار خوبی باشد اما ترجیح می دهد که او را جذب نکنند.با این وجود و در حالی که گفته می شد پرسپولیس هنوز نتوانسته مبلغ پیش پرداخت استوکس را تهیه کند اما محمدحسن انصاری فرد مدیرعامل پرسپولیس در گفت و گویی که با برنامه "فرمول یک" شبکه یک داشت اعلام کرد که این مهاجم ایرلندی و سابق تراکتور امشب به تهران خواهد آمد.البته به گفته مدیر روابط عمومی پرسپولیس زمان حضور استوکس در ایران ممکن است به فردا بیفتد چرا که هنوز قرارداد طرفین نهایی نشده است.', 1, 0, '2020-01-22 10:40:33', '2020-01-26 02:54:57'),
	(70, 'متن-تستی', 1, 'دیدار با وطن', 'یسدستبم', 'اتسیبلسابل', 'سیابمسا', 'در هر تصادف، داخل ماشین مقصر طبق ظرفیت مندرج در کارت خودرو و بیرون از اون تا 10 نفر پوشش جانی دارن.', 1, 0, '2020-01-26 02:31:21', '2020-03-26 16:27:29'),
	(80, 'بیمه-نامه-شخص-ثالث', 1, 'بیمه نامه شخص ثالث', 'بیمه نامه شخص ثالث', 'sadadasdasd', 'asdasd', 'در هر تصادف، داخل ماشین مقصر طبق ظرفیت مندرج در کارت خودرو و بیرون از اون تا 10 نفر پوشش جانی دارن.', 1, 0, '2020-01-26 15:40:49', '2020-01-27 21:00:44');
/*!40000 ALTER TABLE `blog_content` ENABLE KEYS */;

-- Dumping structure for table 517_shop.blog_content_products
CREATE TABLE IF NOT EXISTS `blog_content_products` (
  `content_id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  PRIMARY KEY (`content_id`,`product_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.blog_content_products: 1 rows
/*!40000 ALTER TABLE `blog_content_products` DISABLE KEYS */;
INSERT INTO `blog_content_products` (`content_id`, `product_id`) VALUES
	(68, 1);
/*!40000 ALTER TABLE `blog_content_products` ENABLE KEYS */;

-- Dumping structure for procedure 517_shop.blog_posts
DELIMITER //
CREATE PROCEDURE `blog_posts`(
	IN `limit_parameter` INT,
	IN `page_parameter` INT,
	IN `category_parameter` INT
)
BEGIN
	DECLARE offseter INT;
	DECLARE limiter INT;
	DECLARE backend CHAR(50);
	SET backend = (SELECT d.backend FROM domain AS d LIMIT 1);
	
	SET offseter = (ifnull(page_parameter, 1) - 1) * 10;
	SET limiter = IFNULL(limit_parameter, 10);
	
SELECT bc.id, title, IFNULL(heading, '') AS heading, slug, meta_title, meta_description, content, bc.visitor, (SELECT `fetch_file_address`(f.id)) AS file, bc.created_at
FROM blog_content AS bc
LEFT JOIN blog_categories AS c ON bc.id = c.content_id
LEFT JOIN (
SELECT id, file, fileable_id, fileable_type FROM FILE
WHERE fileable_type = "App\\BlogContent" AND collection = 0
GROUP BY fileable_id, fileable_type 
) AS f ON f.fileable_id = bc.id
WHERE c.category_id =  category_parameter OR IFNULL(category_parameter, '') = ''
AND bc.status = 1 
GROUP BY bc.id order BY bc.created_at desc LIMIT limiter OFFSET offseter;
END//
DELIMITER ;

-- Dumping structure for table 517_shop.blog_tags
CREATE TABLE IF NOT EXISTS `blog_tags` (
  `content_id` bigint(20) unsigned NOT NULL,
  `tag_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`content_id`,`tag_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.blog_tags: 3 rows
/*!40000 ALTER TABLE `blog_tags` DISABLE KEYS */;
INSERT INTO `blog_tags` (`content_id`, `tag_id`) VALUES
	(68, 38),
	(69, 39),
	(69, 40);
/*!40000 ALTER TABLE `blog_tags` ENABLE KEYS */;

-- Dumping structure for table 517_shop.brand
CREATE TABLE IF NOT EXISTS `brand` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `title` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `heading` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `meta_title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `meta_description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `brand_slug_unique` (`slug`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.brand: 10 rows
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
INSERT INTO `brand` (`id`, `slug`, `title`, `heading`, `content`, `meta_title`, `meta_description`, `status`, `created_at`, `updated_at`) VALUES
	(7, 'سامسونگ', 'سامسونگ', NULL, NULL, NULL, NULL, 1, '2020-01-18 07:23:21', '2020-01-18 07:23:21'),
	(8, 'ال-جی', 'ال جی', NULL, NULL, NULL, NULL, 1, '2020-01-18 07:23:27', '2020-01-18 07:23:27'),
	(9, 'هواوی', 'هواوی', NULL, NULL, NULL, NULL, 1, '2020-01-18 07:23:32', '2020-01-18 07:23:32'),
	(10, 'ایسوس', 'ایسوس', NULL, NULL, NULL, NULL, 1, '2020-01-18 07:23:57', '2020-01-18 07:23:57'),
	(11, 'هیمالیا', 'هیمالیا', NULL, NULL, NULL, NULL, 1, '2020-01-18 07:24:05', '2020-01-18 07:24:05'),
	(12, 'پاکشوما', 'پاکشوما', NULL, NULL, NULL, NULL, 1, '2020-01-18 07:24:14', '2020-01-18 07:24:14'),
	(13, 'مای', 'مای', NULL, NULL, NULL, NULL, 1, '2020-01-18 07:24:18', '2020-01-18 07:24:18'),
	(14, 'بلکبری', 'بلکبری', NULL, NULL, NULL, NULL, 1, '2020-01-18 07:24:46', '2020-01-18 07:24:46'),
	(15, 'اپل', 'اپل', NULL, NULL, NULL, NULL, 1, '2020-01-18 07:24:50', '2020-01-18 07:24:50'),
	(16, 'بوش', 'بوش', NULL, NULL, NULL, NULL, 1, '2020-01-18 07:26:26', '2020-01-18 07:26:26');
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;

-- Dumping structure for table 517_shop.brand_switch_category
CREATE TABLE IF NOT EXISTS `brand_switch_category` (
  `brand_id` bigint(20) NOT NULL,
  `category_id` bigint(20) NOT NULL,
  PRIMARY KEY (`brand_id`,`category_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.brand_switch_category: 66 rows
/*!40000 ALTER TABLE `brand_switch_category` DISABLE KEYS */;
INSERT INTO `brand_switch_category` (`brand_id`, `category_id`) VALUES
	(7, 18),
	(7, 22),
	(7, 24),
	(7, 25),
	(8, 18),
	(9, 18),
	(10, 18),
	(10, 22),
	(10, 24),
	(10, 25),
	(11, 12),
	(11, 13),
	(11, 17),
	(11, 19),
	(11, 20),
	(11, 21),
	(11, 22),
	(11, 23),
	(11, 24),
	(11, 25),
	(11, 26),
	(11, 27),
	(12, 12),
	(12, 13),
	(12, 17),
	(12, 19),
	(12, 20),
	(12, 21),
	(12, 22),
	(12, 23),
	(12, 24),
	(12, 25),
	(12, 26),
	(12, 27),
	(13, 22),
	(13, 24),
	(13, 25),
	(14, 18),
	(14, 22),
	(14, 24),
	(14, 25),
	(15, 12),
	(15, 13),
	(15, 17),
	(15, 18),
	(15, 19),
	(15, 20),
	(15, 21),
	(15, 22),
	(15, 23),
	(15, 24),
	(15, 25),
	(15, 26),
	(15, 27),
	(16, 12),
	(16, 13),
	(16, 17),
	(16, 19),
	(16, 20),
	(16, 21),
	(16, 22),
	(16, 23),
	(16, 24),
	(16, 25),
	(16, 26),
	(16, 27);
/*!40000 ALTER TABLE `brand_switch_category` ENABLE KEYS */;

-- Dumping structure for table 517_shop.domain
CREATE TABLE IF NOT EXISTS `domain` (
  `key` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `backend` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `meta_title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `meta_description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `introduce` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `copy_right` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `android` tinyint(1) DEFAULT 0,
  `ios` tinyint(1) DEFAULT 0,
  `maintenance_mode` tinyint(1) DEFAULT 0,
  `register` tinyint(1) DEFAULT 1,
  `basket` tinyint(1) DEFAULT 1,
  `user_dashboard` tinyint(1) DEFAULT 1,
  `admin_panel` tinyint(1) DEFAULT 1,
  `notify_order` tinyint(1) DEFAULT 1,
  `notify_ticket` tinyint(1) DEFAULT 1,
  `notify_register` tinyint(1) DEFAULT 1,
  `status` tinyint(1) DEFAULT 1,
  `min_purchase` decimal(10,0) NOT NULL DEFAULT 0,
  `free_postage` decimal(10,0) NOT NULL DEFAULT 100000,
  `default_post_cost` decimal(10,0) NOT NULL DEFAULT 5000,
  `created_at` datetime DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.domain: ~1 rows (approximately)
/*!40000 ALTER TABLE `domain` DISABLE KEYS */;
INSERT INTO `domain` (`key`, `backend`, `name`, `meta_title`, `meta_description`, `introduce`, `copy_right`, `android`, `ios`, `maintenance_mode`, `register`, `basket`, `user_dashboard`, `admin_panel`, `notify_order`, `notify_ticket`, `notify_register`, `status`, `min_purchase`, `free_postage`, `default_post_cost`, `created_at`, `updated_at`) VALUES
	('localhost:3002', 'http://localhost:8000', 'فروشگاه اینترنتی لوکس آرا', 'لوکس ارا انتخاب و خرید انلاین', 'لوکس ارا انتخاب و خرید انلاین', '<p>دیجی&zwnj;کالا به عنوان یکی از قدیمی&zwnj;ترین فروشگاه های اینترنتی با بیش از یک دهه تجربه، با پایبندی به سه اصل، پرداخت در محل، 7 روز ضمانت بازگشت کالا و تضمین اصل&zwnj;بودن کالا موفق شده تا همگام با فروشگاه&zwnj;های معتبر جهان، به بزرگ&zwnj;ترین فروشگاه اینترنتی ایران تبدیل شود. به محض ورود به سایت دیجی&zwnj;کالا با دنیایی از کالا رو به رو می&zwnj;شوید! هر آنچه که نیاز دارید و به ذهن شما خطور می&zwnj;کند در اینجا پیدا خواهید کرد. دیجی&zwnj;کالا مثل یک ویترین پر زرق و برق است که با انواع و اقسام برندهایی نظیرسامسونگ (Samsung)، ال جی (LG)، اپل (Apple)، نوکیا (Nokia)، شیائومی (Xiaomi)، هواوی (Huawei) و همچنین محصولاتی که هر فرد در زندگی شخصی، تحصیلی و کاری خود به آنها احتیاج پیدا می&zwnj;کند، چیده شده است. اینجا مرجع متنوع&zwnj;ترین کالاهای دیجیتال از گوشی موبایل اندروید و iOS (آیفون) گرفته تا تبلت، لپ تاپ، هارد اکسترنال، اسپیکر، هدفون، هندزفری و پاور بانک است. دیجی&zwnj;کالا همچنین یک بازار آنلاین برای خرید جدیدترین و ضروری&zwnj;ترین لوازم خانگی همانند فرش، پرده، کاغذ دیواری، مبلمان، میز تلویزیون و ماشین ظرفشویی و لباسشویی است تا هر فرد بتواند مطابق با سلیقه شخصی خود، خانه رویاهایش را بسازد. حتی می&zwnj;توانید محیط کار خود را با بهترین ماشین های اداری نظیر پرینتر، اسکنر و لوازم التحریر تجهیز کنید. علاوه بر این، می&zwnj;توانید با سر زدن به شبکه های اجتماعی دیجی کالا نظیر فیس بوک و تلگرام از جدیدترین مدل&zwnj;های لباس، اکسسوری، کیف و کفش زنانه، مردانه، بچه گانه، دخترانه، پسرانه و نوزاد مطلع شوید و از مشهورترین برندهای دنیا نظیر نایکی، آدیداس، ریباک، کلمبیا، باس، گوچی و مانگو اجناس اصل و باکیفیت خریداری نمایید. همچنین با سر زدن به محصولات آرایشی و بهداشتی، لوازم شخصی برقی و انواع عطر و ادکلن اصل تجربه&zwnj;ای جدید از خرید آنلاین کسب کنید و برای خرید انواع لوازم سفر، دوچرخه و آلات موسیقی با مقایسه دقیق محصولات دیگر دچار سردرگمی نشوید. این روزها با اضافه شدن محصولات سوپرمارکت (دیجی کالا فرش)، انواع خواربار، میوه و سبزیجات، مواد پروتئینی اعم از گوشت، مرغ و ماهی و انواع نوشیدنی و تنقلات و عطاری آنلاین می توانید کلیه نیازهای خود را تنها با چند کلیک سفارش داده و در کمترین زمان ممکن درب منزل تحویل بگیرید. مناسب&zwnj;ترین جمله درباره دیجی&zwnj;کالا ،بازار بزرگ اینترنتی، است؛ چرا که با قدم گذاشتن در آن می&zwnj;توانید، یک خرید اینترنتی لذت بخش، با قیمت مناسب و ارزان به همراه تخفیف ویژه در حراج ها را تجربه کنید.</p>', 'کلیه حقوق این سایت برای فروشگاه اینترنتی لوکس آرا  محفوظ است', 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 10000, 100000, 5000, '2019-12-07 10:11:41', '2020-03-26 19:19:48');
/*!40000 ALTER TABLE `domain` ENABLE KEYS */;

-- Dumping structure for table 517_shop.domain_links
CREATE TABLE IF NOT EXISTS `domain_links` (
  `domain_key` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `links_id` int(11) NOT NULL,
  `value` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`domain_key`,`links_id`),
  CONSTRAINT `FK_domain_communication_channel_domain` FOREIGN KEY (`domain_key`) REFERENCES `domain` (`key`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.domain_links: ~9 rows (approximately)
/*!40000 ALTER TABLE `domain_links` DISABLE KEYS */;
INSERT INTO `domain_links` (`domain_key`, `links_id`, `value`) VALUES
	('localhost:3002', 2, '09398624739'),
	('localhost:3002', 3, 'https://instagram.com'),
	('localhost:3002', 8, 'https://instagram.com'),
	('localhost:3002', 9, 'https://facebook.com'),
	('localhost:3002', 13, 'https://bazzar.com'),
	('localhost:3002', 14, 'https://appstor.com'),
	('localhost:3002', 18, 'https://instagram.com'),
	('localhost:3002', 19, 'https://instagram.com'),
	('localhost:3002', 20, 'https://instagram.com');
/*!40000 ALTER TABLE `domain_links` ENABLE KEYS */;

-- Dumping structure for table 517_shop.failed_jobs
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `connection` text COLLATE utf8_unicode_ci NOT NULL,
  `queue` text COLLATE utf8_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.failed_jobs: ~0 rows (approximately)
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;

-- Dumping structure for function 517_shop.fetch_file_address
DELIMITER //
CREATE FUNCTION `fetch_file_address`(`id_parameter` INT
) RETURNS char(255) CHARSET utf8 COLLATE utf8_unicode_ci
BEGIN
	DECLARE address CHAR(255) DEFAULT '';
	DECLARE backend CHAR(50);
	
	if id_parameter IS NULL then RETURN NULL; END if;
	
	SET backend = 	(SELECT d.backend FROM domain AS d LIMIT 1);
	SELECT CONCAT(backend, '/storage/', DIRECTORY , '/' ,fileable_id) INTO address FROM file WHERE id = id_parameter;
	
	RETURN address;
END//
DELIMITER ;

-- Dumping structure for procedure 517_shop.fetch_parent_tree
DELIMITER //
CREATE PROCEDURE `fetch_parent_tree`(
	IN `table_parameter` VARCHAR(50),
	IN `select_parameter` VARCHAR(100),
	IN `node_parameter` INT
)
BEGIN
	SET @statemant = CONCAT('SELECT ', select_parameter ,'
	FROM ', table_parameter ,' AS node,
	', table_parameter ,' AS parent
	WHERE node._lft BETWEEN parent._lft  AND parent._rgt
	AND node.value =', node_parameter);
  PREPARE stmt FROM @statemant;
  EXECUTE stmt;
END//
DELIMITER ;

-- Dumping structure for procedure 517_shop.fetch_permissions_with_access
DELIMITER //
CREATE PROCEDURE `fetch_permissions_with_access`(
	IN `role_parameter` VARCHAR(50),
	IN `parent_parameter` VARCHAR(50)
)
    SQL SECURITY INVOKER
BEGIN
	SELECT  permission.*,
	IF(ISNULL(role_key), false, true) AS access
	FROM permission 
	left JOIN permission_role ON permission_role.permission_key = permission.`key` AND  permission_role.role_key = role_parameter
	WHERE parent = parent_parameter
	order by permission.created_at ASC;
END//
DELIMITER ;

-- Dumping structure for procedure 517_shop.fetch_products_with_brand
DELIMITER //
CREATE PROCEDURE `fetch_products_with_brand`(
	IN `page_parameter` INT,
	IN `limiter_parameter` INT,
	IN `min_price_parameter` DECIMAL(10,0),
	IN `max_price_parameter` DECIMAL(10,0)
)
BEGIN
	DECLARE offseter INT;
	SET offseter = (page_parameter - 1) * limiter_parameter;
	
	SELECT * FROM product AS p 
	WHERE p.brand_id = 1 AND p.count > 0 AND p.price >= min_price_parameter AND p.price <= max_price_parameter
	ORDER BY id desc
	LIMIT limiter_parameter OFFSET offseter;
END//
DELIMITER ;

-- Dumping structure for table 517_shop.file
CREATE TABLE IF NOT EXISTS `file` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fileable_id` bigint(20) NOT NULL,
  `fileable_type` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `created_by` bigint(20) unsigned NOT NULL,
  `mime_type` enum('image','video') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'image',
  `directory` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `file` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `collection` tinyint(1) NOT NULL DEFAULT 1,
  `order` tinyint(2) NOT NULL DEFAULT 1,
  `size` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `link` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `caption` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fileable_id` (`fileable_id`),
  KEY `fileable_type` (`fileable_type`),
  KEY `FK_file_users` (`created_by`)
) ENGINE=MyISAM AUTO_INCREMENT=341 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.file: 8 rows
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
INSERT INTO `file` (`id`, `fileable_id`, `fileable_type`, `created_by`, `mime_type`, `directory`, `file`, `collection`, `order`, `size`, `link`, `caption`, `created_at`, `updated_at`) VALUES
	(340, 68, 'App\\BlogContent', 1, 'image', 'content', '7DsnhDFHwAOFJvr2fO9rPtYChcZjejihgtRXBDou.jpeg', 0, 1, '[500,300,200,100,50]', NULL, NULL, '2020-03-26 16:27:50', '2020-03-26 16:27:50'),
	(339, 69, 'App\\BlogContent', 1, 'image', 'content', 'jX2gt0npj1hmgu80dJiCYvccegNaBfEbtGvWo73w.jpeg', 0, 1, '[500,300,200,100,50]', NULL, NULL, '2020-03-26 16:27:40', '2020-03-26 16:27:40'),
	(338, 70, 'App\\BlogContent', 1, 'image', 'content', 'hUu1quWsrRAaEHr3UupNpWXdtdoY3mBkw8PYGgH7.jpeg', 0, 1, '[500,300,200,100,50]', NULL, NULL, '2020-03-26 16:27:30', '2020-03-26 16:27:30'),
	(337, 80, 'App\\BlogContent', 1, 'image', 'content', 'Ony8J2EmVgIxgLenCeuKDixyTFjXJGJvTPYweqA7.jpeg', 0, 1, '[500,300,200,100,50]', NULL, NULL, '2020-03-26 16:27:17', '2020-03-26 16:27:17'),
	(335, 11, 'App\\Gallery', 1, 'image', 'gallery', '4BqZr8JHcGdF0VRJc0370GqN0l5RRpZTzLiDuiTs.jpeg', 1, 3, '[500]', NULL, NULL, '2020-03-26 16:26:35', '2020-03-26 16:26:35'),
	(336, 11, 'App\\Gallery', 1, 'image', 'gallery', 'TfqYnqenIkglCCfWjQFy00gN4PGG4TaVAaD0YVfJ.jpeg', 1, 4, '[500]', NULL, NULL, '2020-03-26 16:26:35', '2020-03-26 16:26:35'),
	(333, 11, 'App\\Gallery', 1, 'image', 'gallery', 'gvuw5RuCOVLe7JzffWUD7O0RQNZum1hQv7RrSWLM.jpeg', 1, 1, '[500]', NULL, NULL, '2020-03-26 16:23:12', '2020-03-26 16:26:34'),
	(334, 11, 'App\\Gallery', 1, 'image', 'gallery', 'wwz33rolCH0rwTVdqxyAKzFxdc9p7WTKd7jsgu1x.jpeg', 1, 2, '[500]', NULL, NULL, '2020-03-26 16:26:35', '2020-03-26 16:26:35');
/*!40000 ALTER TABLE `file` ENABLE KEYS */;

-- Dumping structure for table 517_shop.finance
CREATE TABLE IF NOT EXISTS `finance` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL DEFAULT 0,
  `financeable_id` int(11) NOT NULL,
  `financeable_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `debtor` decimal(18,2) NOT NULL DEFAULT 0.00,
  `credit` decimal(18,2) NOT NULL DEFAULT 0.00,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `financeable_id` (`financeable_id`),
  KEY `FK_finance_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.finance: ~0 rows (approximately)
/*!40000 ALTER TABLE `finance` DISABLE KEYS */;
/*!40000 ALTER TABLE `finance` ENABLE KEYS */;

-- Dumping structure for table 517_shop.gallery
CREATE TABLE IF NOT EXISTS `gallery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by` bigint(20) unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `is_slider` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_gallery_users` (`created_by`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.gallery: 1 rows
/*!40000 ALTER TABLE `gallery` DISABLE KEYS */;
INSERT INTO `gallery` (`id`, `created_by`, `title`, `status`, `is_slider`, `created_at`, `updated_at`) VALUES
	(11, 1, 'برند جدید تستیddddd', 1, 1, '2020-01-24 21:00:07', '2020-01-24 21:00:07');
/*!40000 ALTER TABLE `gallery` ENABLE KEYS */;

-- Dumping structure for procedure 517_shop.get_all_filter_category_parameters
DELIMITER //
CREATE PROCEDURE `get_all_filter_category_parameters`()
BEGIN
	
	SELECT pp.value, pp._lft, pp._rgt,parent_id INTO @id, @lft, @rgt, @parent FROM product_category AS pp WHERE  VALUE = 17;
	
	
	SELECT VALUE INTO @categories  FROM product_category WHERE STATUS = 1 and VALUE = 17 or _lft > @lft AND _rgt < @rgt LIMIT 1;
		
	SELECT DISTINCT b.id, b.title, b.slug FROM brand AS b
	LEFT JOIN brand_switch_category AS bsc on b.id = bsc.brand_id
	WHERE b.`status` = 1  
	and bsc.category_id IN (@categories) 
	order BY title asc;
END//
DELIMITER ;

-- Dumping structure for table 517_shop.group_attribute
CREATE TABLE IF NOT EXISTS `group_attribute` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `title` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `heading` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `meta_title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `meta_description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `has_link` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `group_attribute_slug_unique` (`slug`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.group_attribute: 5 rows
/*!40000 ALTER TABLE `group_attribute` DISABLE KEYS */;
INSERT INTO `group_attribute` (`id`, `slug`, `title`, `heading`, `content`, `meta_title`, `meta_description`, `status`, `has_link`, `created_at`, `updated_at`) VALUES
	(6, 'cpu', 'cpu', NULL, NULL, 'cpu', 'cpu', 1, 1, '2020-01-17 11:09:11', '2020-01-17 11:11:33'),
	(7, 'اندازه-صفحه', 'اندازه صفحه', NULL, NULL, 'اندازه صفحه', 'اندازه صفحه', 1, 1, '2020-01-17 11:09:35', '2020-01-17 11:10:27'),
	(8, 'رم', 'رم', NULL, NULL, 'رم', 'رم', 1, 1, '2020-01-17 11:09:40', '2020-01-17 11:11:01'),
	(9, 'وزن', 'وزن', NULL, NULL, NULL, NULL, 1, 1, '2020-01-17 18:39:52', '2020-01-17 18:39:52'),
	(10, 'جنس', 'جنس', NULL, NULL, 'جنس', 'جنس', 1, 1, '2020-01-17 20:45:20', '2020-01-17 20:46:04');
/*!40000 ALTER TABLE `group_attribute` ENABLE KEYS */;

-- Dumping structure for table 517_shop.group_attribute_category
CREATE TABLE IF NOT EXISTS `group_attribute_category` (
  `category_id` bigint(20) NOT NULL,
  `attribute_id` bigint(20) NOT NULL,
  PRIMARY KEY (`category_id`,`attribute_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.group_attribute_category: 17 rows
/*!40000 ALTER TABLE `group_attribute_category` DISABLE KEYS */;
INSERT INTO `group_attribute_category` (`category_id`, `attribute_id`) VALUES
	(13, 6),
	(13, 7),
	(13, 8),
	(13, 9),
	(14, 6),
	(14, 7),
	(14, 8),
	(14, 9),
	(14, 10),
	(15, 6),
	(15, 7),
	(15, 8),
	(15, 9),
	(16, 6),
	(16, 7),
	(16, 8),
	(16, 9);
/*!40000 ALTER TABLE `group_attribute_category` ENABLE KEYS */;

-- Dumping structure for table 517_shop.group_attribute_product
CREATE TABLE IF NOT EXISTS `group_attribute_product` (
  `product_id` bigint(20) NOT NULL,
  `attribute_id` bigint(20) NOT NULL,
  `value` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tag_id` bigint(20) DEFAULT NULL,
  `order` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` datetime DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`product_id`,`attribute_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.group_attribute_product: 4 rows
/*!40000 ALTER TABLE `group_attribute_product` DISABLE KEYS */;
INSERT INTO `group_attribute_product` (`product_id`, `attribute_id`, `value`, `tag_id`, `order`, `created_at`, `updated_at`) VALUES
	(1, 6, '36', NULL, 0, NULL, NULL),
	(1, 7, '24', NULL, 1, NULL, NULL),
	(1, 8, '31', NULL, 2, NULL, NULL),
	(1, 9, '34 گرم', NULL, 3, NULL, NULL);
/*!40000 ALTER TABLE `group_attribute_product` ENABLE KEYS */;

-- Dumping structure for table 517_shop.group_attribute_values
CREATE TABLE IF NOT EXISTS `group_attribute_values` (
  `attribute_id` bigint(20) unsigned NOT NULL,
  `tag_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`attribute_id`,`tag_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.group_attribute_values: 16 rows
/*!40000 ALTER TABLE `group_attribute_values` DISABLE KEYS */;
INSERT INTO `group_attribute_values` (`attribute_id`, `tag_id`) VALUES
	(6, 32),
	(6, 33),
	(6, 34),
	(6, 35),
	(6, 36),
	(7, 23),
	(7, 24),
	(7, 25),
	(7, 26),
	(8, 27),
	(8, 28),
	(8, 29),
	(8, 30),
	(8, 31),
	(10, 37),
	(10, 38);
/*!40000 ALTER TABLE `group_attribute_values` ENABLE KEYS */;

-- Dumping structure for table 517_shop.links
CREATE TABLE IF NOT EXISTS `links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `type` enum('social','contact','app','license') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'social',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.links: 23 rows
/*!40000 ALTER TABLE `links` DISABLE KEYS */;
INSERT INTO `links` (`id`, `title`, `type`) VALUES
	(1, 'فکس', 'contact'),
	(2, 'موبایل', 'contact'),
	(3, 'ایمیل info', 'contact'),
	(4, 'تلگرام', 'contact'),
	(5, 'واتس اپ', 'contact'),
	(6, 'شماره تماس', 'contact'),
	(7, 'ایمیل پشتیبانی', 'contact'),
	(8, 'اینستاگرام', 'social'),
	(9, 'فیس بوک', 'social'),
	(10, 'توئیتر', 'social'),
	(11, 'کانال تلگرام', 'social'),
	(12, 'لینکدین', 'social'),
	(13, 'اپ اندروید', 'app'),
	(14, 'اپ آِی او اس', 'app'),
	(15, 'وب اپ', 'app'),
	(16, 'گوگل پلی', 'app'),
	(17, 'اپ استور', 'app'),
	(18, 'ای نماد', 'license'),
	(19, 'نماد رضا', 'license'),
	(20, 'کسب و کار اینترنتی', 'license'),
	(21, 'بازاریابی شبکه ای', 'license'),
	(22, 'اپارات', 'social'),
	(23, 'یوتیوب', 'social');
/*!40000 ALTER TABLE `links` ENABLE KEYS */;

-- Dumping structure for procedure 517_shop.map_reports
DELIMITER //
CREATE PROCEDURE `map_reports`()
    SQL SECURITY INVOKER
BEGIN
DROP TABLE IF EXISTS map_reports;
CREATE TEMPORARY TABLE IF NOT EXISTS map_reports(
    title VARCHAR(100) NULL,
    counter INT NULL
) 
COLLATE='utf8_persian_ci'
ENGINE = MEMORY ;

TRUNCATE map_reports;
INSERT INTO map_reports (title, counter) VALUES
('کل سفارشات', (select count(id) from `order` where order_status=1)),
('مرجوعی ها', (select count(id) from `order` where delivery_status= 4)),
('سفارشات تعدیلی', (select count(id) FROM `order` where order_status = 3 )),
('کسری و معیوبی', (select count(id) from `order` where items_status = 2)),
('محصولات', (select count(id) from product)),
('محصولات غیرفعال', (select count(id) from product where status = 0)),
('محصولات ناموجود', (select count(id) from product where count > 0)),
('محصولات دارای تخفیف', 0),
('تعداد کاربران', (select count(id) from users)),
('کاربران غیرفعال', (select count(id) from users where status = 0)),
('عضو سایت', (select count(id) from users where role_key = 'guest')),
('کابران سیستمی', (select count(id) from users where role_key <> 'guest')),
('برندها', (select count(id) from brand)),
('کیف پول کاربران', (select IFNULL(sum(credit), 0) - IFNULL(sum(debtor), 0) from finance WHERE status = 0)),
('تیکت ها', (SELECT COUNT(id) FROM ticket)),
('تیکت در انتظار', (SELECT COUNT(id) FROM ticket WHERE status = 0))
;


SELECT * FROM map_reports;
END//
DELIMITER ;

-- Dumping structure for table 517_shop.menu
CREATE TABLE IF NOT EXISTS `menu` (
  `value` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(255) CHARACTER SET utf8 COLLATE utf8_persian_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `_lft` int(10) unsigned NOT NULL DEFAULT 0,
  `_rgt` int(10) unsigned NOT NULL DEFAULT 0,
  `parent_id` int(10) unsigned DEFAULT NULL,
  `external_link` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`value`),
  KEY `_lft` (`_lft`),
  KEY `_rgt` (`_rgt`),
  KEY `parent_id` (`parent_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.menu: ~13 rows (approximately)
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` (`value`, `label`, `status`, `_lft`, `_rgt`, `parent_id`, `external_link`, `created_at`, `updated_at`) VALUES
	(1, 'هدر', 1, 1, 2, NULL, NULL, '2020-01-26 20:21:40', '2020-01-26 20:21:40'),
	(2, 'فوتر', 1, 3, 26, NULL, NULL, '2020-01-26 20:21:46', '2020-01-27 22:54:49'),
	(20, 'فعالیت های سایت', 1, 4, 13, 2, NULL, '2020-01-26 21:28:37', '2020-01-27 11:41:03'),
	(21, 'مطالب آموزشی', 1, 14, 15, 2, NULL, '2020-01-26 21:38:29', '2020-01-27 11:41:03'),
	(22, 'قوانین و مقررات', 1, 5, 10, 20, 'http://google.com', '2020-01-26 21:40:18', '2020-01-27 14:47:51'),
	(23, 'پل های ارتباطی', 1, 11, 12, 20, NULL, '2020-01-26 21:40:31', '2020-01-27 11:41:03'),
	(24, 'لوازم آرایشی', 1, 6, 9, 22, NULL, '2020-01-26 22:06:24', '2020-01-27 11:41:03'),
	(25, 'موبایل', 1, 7, 8, 24, NULL, '2020-01-27 08:11:03', '2020-01-27 08:11:03'),
	(26, 'آذربايجان شرقي', 1, 16, 21, 2, NULL, '2020-01-27 08:11:13', '2020-01-27 11:41:26'),
	(27, 'اخبار', 1, 17, 20, 26, NULL, '2020-01-27 08:11:20', '2020-01-27 11:41:26'),
	(28, 'مطالب آموزشی', 1, 18, 19, 27, NULL, '2020-01-27 08:11:27', '2020-01-27 08:11:27'),
	(29, 'مطالب آموزشی', 1, 22, 23, 2, NULL, '2020-01-27 09:48:59', '2020-01-27 09:48:59'),
	(30, 'موبایل', 1, 24, 25, 2, NULL, '2020-01-27 19:24:49', '2020-01-27 19:24:49');
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;

-- Dumping structure for table 517_shop.migrations
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.migrations: ~0 rows (approximately)
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
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

-- Dumping data for table 517_shop.oauth_access_tokens: ~32 rows (approximately)
/*!40000 ALTER TABLE `oauth_access_tokens` DISABLE KEYS */;
INSERT INTO `oauth_access_tokens` (`id`, `user_id`, `client_id`, `name`, `scopes`, `revoked`, `created_at`, `updated_at`, `expires_at`) VALUES
	('049d260fe016b3b825bba7619bee31799d510479bcb8fa951f5b34e713b810b99e8835c9af4665ff', 1, 4, 'Token Name', '[]', 0, '2020-01-17 11:07:33', '2020-01-17 11:07:33', '2021-01-17 11:07:33'),
	('1896e9c3e431615c8059e12ded12c9df85a402c22ea35abe5bec6698c74222bd931d6627ea4beae2', 1, 4, 'Token Name', '[]', 1, '2020-01-15 09:17:48', '2020-01-15 09:17:48', '2021-01-15 09:17:48'),
	('330b419e7703b2fbce8f6b290b417e0cb76d34feba215221b2ca20854295229221ad23cc72428f6d', 1, 4, 'Token Name', '[]', 1, '2020-01-15 07:36:21', '2020-01-15 07:36:21', '2021-01-15 07:36:21'),
	('394647465743a35ba3efb92f4bdcdb5bf47f22bf423e80600b231c8d44e2fd08fae9dd8aaf4af2d8', 1, 4, 'Token Name', '[]', 0, '2020-01-14 19:27:43', '2020-01-14 19:27:43', '2021-01-14 19:27:43'),
	('52c29d4bd0b5310ec4da17610b7dce0ca05f34cbae06660298af3a2320a93b02ec556cb5bf92ec18', 1, 4, 'Token Name', '[]', 0, '2020-01-14 19:24:17', '2020-01-14 19:24:17', '2021-01-14 19:24:17'),
	('55935780281968469f6c49ae70942b36afc506fa979b2a2017cdd5ec219fa1c54f62a1280f029872', 1, 4, 'Token Name', '[]', 0, '2020-01-14 13:18:29', '2020-01-14 13:18:29', '2021-01-14 13:18:29'),
	('5b112eb523fe497407dabe4711bab1a295c2d42ccbb42bbfa1555d2e1a397aa28581ef39409f3c6e', 1, 4, 'Token Name', '[]', 1, '2020-01-15 06:51:05', '2020-01-15 06:51:05', '2021-01-15 06:51:05'),
	('5ed82df941d8dc41eb9f2a1aac46d03c27b8e46c7cdf988516ba2e6bc1dc822323cde4757c42d048', 1, 4, 'Token Name', '[]', 1, '2020-01-14 19:29:26', '2020-01-14 19:29:26', '2021-01-14 19:29:26'),
	('678175e9cdb5e281dceb7805f53945db029731dfc226658a1fc3348515911c1f67323989b4e87bc7', 1, 4, 'Token Name', '[]', 1, '2020-01-14 19:31:50', '2020-01-14 19:31:50', '2021-01-14 19:31:50'),
	('6c7f92e28e48253ff2c9f629f5bb5f4efd332c988bd39fa7a0427144b5d115e476f9ff44869e2701', 1, 4, 'Token Name', '[]', 0, '2020-01-14 11:03:59', '2020-01-14 11:03:59', '2021-01-14 11:03:59'),
	('6d232567384d91bdd69463dca6c7ec443487cbfa785f908cffb14dc64f09321d31f008cf3434bc6e', 1, 4, 'Token Name', '[]', 0, '2020-01-14 19:24:20', '2020-01-14 19:24:20', '2021-01-14 19:24:20'),
	('6e16cc77acc7039a06064d5e6a71c9a9984adb6e2a3109bf0dd52c69a1bd0a78fed1558c188b5e46', 1, 4, 'Token Name', '[]', 1, '2020-01-14 14:22:39', '2020-01-14 14:22:39', '2021-01-14 14:22:39'),
	('6e2478cffc7d23d8e8795a8604e054d74ad97e2720559022d04ebd83a6f6aacdb2f5c4ab4f76d98f', 1, 7, NULL, '[]', 0, '2020-03-26 15:51:49', '2020-03-26 15:51:49', '2021-03-26 15:51:49'),
	('72152d6348a9eb72aa61aa40703aafac24d4f054595d262906acdbe916cf6c0eb4f0bba7fbcf138c', 1, 7, 'Token Name', '[]', 0, '2020-03-26 15:52:08', '2020-03-26 15:52:08', '2021-03-26 15:52:08'),
	('7d0e8e2e7131759e761a8c63f89524f8003b7afb65d4cec60ad65fc7a33800dd73b486998977a809', 1, 4, 'Token Name', '[]', 0, '2020-01-20 11:13:38', '2020-01-20 11:13:38', '2021-01-20 11:13:38'),
	('7d4093d5465940c2683a95c9fa173996eff735fbe4a17f46bd4b518e031236a333dcf667127badb1', 1, 4, 'Token Name', '[]', 0, '2020-01-14 19:24:10', '2020-01-14 19:24:10', '2021-01-14 19:24:10'),
	('83e1ea9f2ca47740a73e7e0cf15ecec333876060719a33bb7d0610441f8fe6ce29e3655d5f1c9691', 1, 4, 'Token Name', '[]', 0, '2020-01-15 18:07:45', '2020-01-15 18:07:45', '2021-01-15 18:07:45'),
	('8c9b294f8137702b9fa0f57ac38cb23385bdefd8b32cecf1f082accc98eb47bc9f87101fc7274a9a', 1, 4, 'Token Name', '[]', 1, '2020-01-15 07:36:47', '2020-01-15 07:36:47', '2021-01-15 07:36:47'),
	('98bae98ce4d2dfd831769528081ffd62a78de0b7ce213944f744bc5f1b270ff26e8fa930c12733f0', 1, 4, 'Token Name', '[]', 0, '2020-01-14 19:27:46', '2020-01-14 19:27:46', '2021-01-14 19:27:46'),
	('9a11d225bcc64bbdcbd2b1842dcec72cf0324e0852341dab3507bb5a07b9194786a3b56d3a5a2af1', 1, 4, 'Token Name', '[]', 1, '2020-01-15 09:16:46', '2020-01-15 09:16:46', '2021-01-15 09:16:46'),
	('a0bbfefdee0adfc11b850b70057b2ec8b9a71912d66cc3b2168ef60e6e505647915e23921617390d', 1, 4, 'Token Name', '[]', 1, '2020-01-14 19:28:36', '2020-01-14 19:28:36', '2021-01-14 19:28:36'),
	('ac9e11f858f34a5173f2c3e970f73f481a5d51456ba1e2d8446aafdd0713ccdc8ac9ff34e3bb1836', 1, 4, 'Token Name', '[]', 0, '2020-01-14 11:03:08', '2020-01-14 11:03:08', '2021-01-14 11:03:08'),
	('b5dac6f04e353a340211b1f1d863e7fc1159553fdf41b7f39dbcd7a42761ec589ae16cd515f72aaf', 1, 4, 'Token Name', '[]', 0, '2020-01-14 11:05:04', '2020-01-14 11:05:04', '2021-01-14 11:05:04'),
	('c257b8348e0a48a987e1256b30d530d1ccc7ec917b793e9250f4a7c1267b1070ccc30777f9030e63', 1, 4, 'Token Name', '[]', 0, '2020-01-15 12:41:14', '2020-01-15 12:41:14', '2021-01-15 12:41:14'),
	('c4a80d1cb153c1b157702c8faabc8b825b6fae2122e7085554715acac48c1d345bfd5a6415d0cce8', 1, 4, 'Token Name', '[]', 0, '2020-01-27 08:10:50', '2020-01-27 08:10:50', '2021-01-27 08:10:50'),
	('c9763d6cdd1f214c4a2fcbb92a07bb7da68b7b522c7bc909f307f6640b4bc4b6e2fad2b17128ce97', 1, 4, 'Token Name', '[]', 0, '2020-01-28 08:11:06', '2020-01-28 08:11:06', '2021-01-28 08:11:06'),
	('d447a5a1452efafb20e967fdc57cb80b203927daca84a558670c56fa1b2a618e0804b680466960ef', 1, 4, 'Token Name', '[]', 0, '2020-01-15 18:44:55', '2020-01-15 18:44:55', '2021-01-15 18:44:55'),
	('da2db5c49dbc91f72c9050dfc8ba06b14f8da294c2d7bf50d7422793fdace90b354302466e8c836d', 1, 4, 'Token Name', '[]', 0, '2020-01-24 14:56:18', '2020-01-24 14:56:18', '2021-01-24 14:56:18'),
	('da7ee2df23dd8dcd582884c2b74a81c03eeeb8a7b9297d4f5ef8e1b0a20ef910bf80015c65e597ca', 1, 4, 'Token Name', '[]', 0, '2020-01-14 14:19:29', '2020-01-14 14:19:29', '2021-01-14 14:19:29'),
	('e1fa4cacffffa9e8669653c973ff8c00843de5e4d4e3a332212d73c990f9d2396c25a34f6d5b8b35', 1, 4, 'Token Name', '[]', 0, '2020-01-14 19:27:37', '2020-01-14 19:27:37', '2021-01-14 19:27:37'),
	('f4b5eda1a3adc97621a163b51cf5634a1d5c4ca0a89a6c2a835a58c3d61621b3aec7d09052b17b76', 1, 4, 'Token Name', '[]', 0, '2020-01-20 17:18:46', '2020-01-20 17:18:46', '2021-01-20 17:18:46'),
	('f6d80f2d831972a11a923ba7858cad0217dadb8c62decdf5298121c423eb9f9293acb023d429655f', 1, 4, 'Token Name', '[]', 0, '2020-01-14 11:06:29', '2020-01-14 11:06:29', '2021-01-14 11:06:29');
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.oauth_clients: ~7 rows (approximately)
/*!40000 ALTER TABLE `oauth_clients` DISABLE KEYS */;
INSERT INTO `oauth_clients` (`id`, `user_id`, `name`, `secret`, `redirect`, `personal_access_client`, `password_client`, `revoked`, `created_at`, `updated_at`) VALUES
	(2, NULL, 'Laravel Personal Access Client', '3ifOpdDKIvzzcRfIHJakMclRiOhAzj9B4zb98WCb', 'http://localhost', 1, 0, 0, '2019-11-30 22:41:34', '2019-11-30 22:41:34'),
	(3, NULL, 'Laravel Password Grant Client', '0pbp2WmsP5VkpcKmrlx2xhfDu5snRwpxVQNzutOD', 'http://localhost', 0, 1, 0, '2019-11-30 22:41:34', '2019-11-30 22:41:34'),
	(4, NULL, 'Laravel Personal Access Client', 'VLp36NhbUsGSV3t9wxKb1Ub3n6b5PEtEgOlm0OWd', 'http://localhost', 1, 0, 0, '2020-01-10 19:28:29', '2020-01-10 19:28:29'),
	(5, NULL, 'Laravel Password Grant Client', 'ytK472tDoW5Q03rHg4FMWaFVVkLOtlGttk1LKk1W', 'http://localhost', 0, 1, 0, '2020-01-10 19:28:29', '2020-01-10 19:28:29'),
	(6, 1, 'mehrdad', 'w1H6jXTAOuIcmJTi3TpCybLh2dyhocHb1hzaazfC', 'http://localhost:8000/auth/callback', 0, 0, 0, '2020-01-10 19:29:37', '2020-01-10 19:29:37'),
	(7, NULL, 'Laravel Personal Access Client', 'eyz8nGJLpOkxa8b5UiPVaqVWxpMSD98sLMf1zNwr', 'http://localhost', 1, 0, 0, '2020-03-26 15:51:42', '2020-03-26 15:51:42'),
	(8, NULL, 'Laravel Password Grant Client', 'zBS6ftUkUfGjFEOo9VnP4TOfGxhNhDqqinJh2ngm', 'http://localhost', 0, 1, 0, '2020-03-26 15:51:43', '2020-03-26 15:51:43');
/*!40000 ALTER TABLE `oauth_clients` ENABLE KEYS */;

-- Dumping structure for table 517_shop.oauth_personal_access_clients
CREATE TABLE IF NOT EXISTS `oauth_personal_access_clients` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `client_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_personal_access_clients_client_id_index` (`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.oauth_personal_access_clients: ~1 rows (approximately)
/*!40000 ALTER TABLE `oauth_personal_access_clients` DISABLE KEYS */;
INSERT INTO `oauth_personal_access_clients` (`id`, `client_id`, `created_at`, `updated_at`) VALUES
	(2, 4, '2020-01-10 19:28:29', '2020-01-10 19:28:29'),
	(3, 7, '2020-03-26 15:51:43', '2020-03-26 15:51:43');
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
  KEY `order_status_created_at` (`order_status`,`created_at`),
  CONSTRAINT `FK_order_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11038 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.order: ~0 rows (approximately)
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
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

-- Dumping data for table 517_shop.order_post_info: ~0 rows (approximately)
/*!40000 ALTER TABLE `order_post_info` DISABLE KEYS */;
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
  CONSTRAINT `FK_order_product_pins_product_pins` FOREIGN KEY (`product_pins_id`) REFERENCES `product_pins` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.order_product_pins: ~0 rows (approximately)
/*!40000 ALTER TABLE `order_product_pins` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_product_pins` ENABLE KEYS */;

-- Dumping structure for table 517_shop.package_type
CREATE TABLE IF NOT EXISTS `package_type` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `type` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.package_type: 13 rows
/*!40000 ALTER TABLE `package_type` DISABLE KEYS */;
INSERT INTO `package_type` (`id`, `title`, `status`, `type`, `created_at`, `updated_at`) VALUES
	(7, 'عدد', 1, 1, '2020-01-01 20:47:36', '2020-01-01 20:47:36'),
	(8, 'کارتون', 1, 1, '2020-01-01 20:47:37', '2020-01-01 20:47:37'),
	(9, 'دستگاه', 1, 1, '2020-01-01 20:47:37', '2020-01-01 20:47:37'),
	(10, 'قوطی', 1, 1, '2020-01-01 20:47:37', '2020-01-01 20:47:37'),
	(11, 'کیسه', 1, 1, '2020-01-01 20:47:37', '2020-01-01 20:47:37'),
	(12, 'ست', 1, 1, '2020-01-01 20:47:37', '2020-01-01 20:47:37'),
	(13, 'جفت', 1, 1, '2020-01-01 20:47:37', '2020-01-01 20:47:37'),
	(14, 'کیلو', 1, 0, '2020-01-01 20:48:36', '2020-01-01 20:48:36'),
	(15, 'متر', 1, 0, '2020-01-01 20:48:36', '2020-01-01 20:48:36'),
	(16, 'گرم', 1, 0, '2020-01-01 20:48:36', '2020-01-01 20:48:36'),
	(17, 'مجموعه', 1, 1, '2020-01-01 20:48:36', '2020-01-01 20:48:36'),
	(18, 'لیتر', 1, 0, '2020-01-01 20:48:36', '2020-01-01 20:48:36'),
	(19, 'تن', 1, 0, '2020-01-04 22:57:23', '2020-01-04 22:57:24');
/*!40000 ALTER TABLE `package_type` ENABLE KEYS */;

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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table 517_shop.payment: ~0 rows (approximately)
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;

-- Dumping structure for table 517_shop.permission
CREATE TABLE IF NOT EXISTS `permission` (
  `key` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `url` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `method` enum('GET','POST','PUT','DELETE') COLLATE utf8_unicode_ci NOT NULL,
  `parent` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`key`),
  KEY `parent` (`parent`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.permission: ~100 rows (approximately)
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` (`key`, `title`, `url`, `method`, `parent`, `created_at`, `updated_at`) VALUES
	('anbar_index', 'مدیریت', '/api/backend/anbar', 'GET', 'anbar', '2019-12-28 16:56:11', '2019-12-28 16:56:11'),
	('attachment_delete', 'permissions.attachment delete', '/api/backend/attachment', 'DELETE', 'attachment', '2019-12-28 16:56:11', '2019-12-28 16:56:11'),
	('attachment_post', 'permissions.attachment post', '/api/backend/attachment', 'POST', 'attachment', '2019-12-28 16:56:11', '2019-12-28 16:56:11'),
	('blog_category_index', 'مدیریت', '/api/backend/blog/categories', 'GET', 'blog_category', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('blog_category_show', 'نمایش', '/api/backend/blog/categories/{id}', 'GET', 'blog_category', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('blog_category_store', 'ذخیره سازی', '/api/backend/blog/categories', 'POST', 'blog_category', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('blog_category_update', 'به روز رسانی', '/api/backend/blog/categories/{id}', 'PUT', 'blog_category', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('blog_content_change_status', 'تغییر وضعیت', '/api/backend/blog/contents/{id}/status', 'PUT', 'blog_content', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('blog_content_index', 'مدیریت', '/api/backend/blog/contents', 'GET', 'blog_content', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('blog_content_show', 'نمایش', '/api/backend/blog/contents/{id}', 'GET', 'blog_content', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('blog_content_store', 'ذخیره سازی', '/api/backend/blog/contents', 'POST', 'blog_content', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('blog_content_update', 'به روز رسانی', '/api/backend/blog/contents/{id}', 'PUT', 'blog_content', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('brand_index', 'مدیریت', '/api/backend/products/brands', 'GET', 'brand', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('brand_show', 'نمایش', '/api/backend/products/brands/{id}', 'GET', 'brand', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('brand_store', 'ذخیره سازی', '/api/backend/products/brands', 'POST', 'brand', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('brand_update', 'به روز رسانی', '/api/backend/products/brands/{id}', 'PUT', 'brand', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('communication_channels_get', 'permissions.communication channels get', '/api/backend/communicationChannels', 'GET', 'communication_channels', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('domain_read', 'permissions.read', '/api/backend/setting', 'GET', 'domain', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('domain_read_sticky', 'permissions.read sticky', '/api/backend/setting/sticky-setting', 'GET', 'domain', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('domain_update', 'به روز رسانی', '/api/backend/setting', 'PUT', 'domain', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('domain_update_sticky', 'permissions.update sticky', '/api/backend/setting/sticky-setting', 'PUT', 'domain', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('filter_price-parameter_get', 'permissions.filter price-parameter get', '/api/backend/filter/price-parameter', 'GET', 'filter', '2020-01-07 12:37:44', '2020-01-07 12:37:44'),
	('filter_products_get', 'permissions.filter products get', '/api/backend/filter/products', 'GET', 'filter', '2020-01-20 20:50:34', '2020-01-20 20:50:34'),
	('filter_tags_get', 'permissions.filter tags get', '/api/backend/filter/tags', 'GET', 'filter', '2019-12-28 16:56:11', '2019-12-28 16:56:11'),
	('filter_users_accessible_get', 'permissions.filter users accessible get', '/api/backend/filter/users/accessible', 'GET', 'filter', '2019-12-28 16:56:11', '2019-12-28 16:56:11'),
	('filter_users_get', 'permissions.filter users get', '/api/backend/filter/users', 'GET', 'filter', '2019-12-28 16:56:11', '2019-12-28 16:56:11'),
	('gallery_index', 'مدیریت', '/api/backend/galleries', 'GET', 'gallery', '2020-01-14 11:35:10', '2020-01-14 11:35:10'),
	('gallery_show', 'نمایش', '/api/backend/galleries/{id}', 'GET', 'gallery', '2020-01-14 11:35:10', '2020-01-14 11:35:10'),
	('gallery_store', 'ذخیره سازی', '/api/backend/galleries', 'POST', 'gallery', '2020-01-14 11:35:10', '2020-01-14 11:35:10'),
	('gallery_update', 'به روز رسانی', '/api/backend/galleries/{id}', 'PUT', 'gallery', '2020-01-14 11:35:10', '2020-01-14 11:35:10'),
	('group_attribute_index', 'مدیریت', '/api/backend/products/attributes', 'GET', 'group_attribute', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('group_attribute_show', 'نمایش', '/api/backend/products/attributes/{id}', 'GET', 'group_attribute', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('group_attribute_store', 'ذخیره سازی', '/api/backend/products/attributes', 'POST', 'group_attribute', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('group_attribute_update', 'به روز رسانی', '/api/backend/products/attributes/{id}', 'PUT', 'group_attribute', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('order_fractive_request', 'درخواست کسری یا موجودی', '/api/backend/orders/{id}/fractive-request', 'POST', 'order', '2019-12-28 16:56:11', '2019-12-28 16:56:11'),
	('order_index', 'مدیریت', '/api/backend/orders', 'GET', 'order', '2019-12-28 16:56:11', '2019-12-28 16:56:11'),
	('order_show', 'نمایش', '/api/backend/orders/{id}', 'GET', 'order', '2019-12-28 16:56:11', '2019-12-28 16:56:11'),
	('order_update', 'به روز رسانی', '/api/backend/orders/{id}', 'PUT', 'order', '2019-12-28 16:56:11', '2019-12-28 16:56:11'),
	('orders_status_get', 'permissions.orders status get', '/api/backend/orders/status', 'GET', 'orders', '2019-12-28 16:56:11', '2019-12-28 16:56:11'),
	('permission_index', 'مدیریت', '/api/backend/users/permissions', 'GET', 'permission', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('product_category_get_all_attributes_with_checked', 'permissions.get all attributes with checked', '/api/backend/products/categories/{id}/getAllAttributesWithChecked', 'GET', 'product_category', '2019-12-31 21:32:40', '2019-12-31 21:32:40'),
	('product_category_get_all_brands_with_checked', 'permissions.get all brands with checked', '/api/backend/products/categories/{id}/getAllBrandsWithChecked', 'GET', 'product_category', '2020-01-20 20:50:34', '2020-01-20 20:50:34'),
	('product_category_get_all_price_parameters_with_checked', 'permissions.get all price parameters with checked', '/api/backend/products/categories/{id}/getAllPriceParametersWithChecked', 'GET', 'product_category', '2020-01-20 20:50:35', '2020-01-20 20:50:35'),
	('product_category_get_attributes', 'ویژگی ها', '/api/backend/products/categories/{id}/attributes', 'GET', 'product_category', '2019-12-28 16:56:11', '2019-12-28 16:56:11'),
	('product_category_get_brands', 'permissions.get brands', '/api/backend/products/categories/{id}/brands', 'GET', 'product_category', '2020-01-20 20:50:34', '2020-01-20 20:50:34'),
	('product_category_get_price_parameters', 'permissions.get price parameters', '/api/backend/products/categories/{id}/priceParameters', 'GET', 'product_category', '2020-01-20 20:50:35', '2020-01-20 20:50:35'),
	('product_category_index', 'مدیریت', '/api/backend/products/categories', 'GET', 'product_category', '2019-12-28 16:56:11', '2019-12-28 16:56:11'),
	('product_category_show', 'نمایش', '/api/backend/products/categories/{id}', 'GET', 'product_category', '2019-12-28 16:56:11', '2019-12-28 16:56:11'),
	('product_category_store', 'ذخیره سازی', '/api/backend/products/categories', 'POST', 'product_category', '2019-12-28 16:56:11', '2019-12-28 16:56:11'),
	('product_category_store_attributes', 'دخیره سازی ویژگی ها', '/api/backend/products/categories/{id}/attributes', 'POST', 'product_category', '2019-12-28 16:56:11', '2019-12-28 16:56:11'),
	('product_category_store_brands', 'permissions.store brands', '/api/backend/products/categories/{id}/brands', 'POST', 'product_category', '2020-01-20 20:50:34', '2020-01-20 20:50:34'),
	('product_category_store_price_parameters', 'permissions.store price parameters', '/api/backend/products/categories/{id}/priceParameters', 'POST', 'product_category', '2020-01-20 20:50:35', '2020-01-20 20:50:35'),
	('product_category_update', 'به روز رسانی', '/api/backend/products/categories/{id}', 'PUT', 'product_category', '2019-12-28 16:56:11', '2019-12-28 16:56:11'),
	('product_change_status', 'تغییر وضعیت', '/api/backend/products/{id}/change/status', 'PUT', 'product', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('product_index', 'مدیریت', '/api/backend/products', 'GET', 'product', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('product_list_index', 'مدیریت', '/api/backend/products/product-lists', 'GET', 'product_list', '2020-01-20 20:50:35', '2020-01-20 20:50:35'),
	('product_list_show', 'نمایش', '/api/backend/products/product-lists/{id}', 'GET', 'product_list', '2020-01-20 20:50:35', '2020-01-20 20:50:35'),
	('product_list_store', 'ذخیره سازی', '/api/backend/products/product-lists', 'POST', 'product_list', '2020-01-20 20:50:35', '2020-01-20 20:50:35'),
	('product_list_update', 'به روز رسانی', '/api/backend/products/product-lists/{id}', 'PUT', 'product_list', '2020-01-20 20:50:35', '2020-01-20 20:50:35'),
	('product_package_type_index', 'مدیریت', '/api/backend/products/package-types', 'GET', 'product_package_type', '2020-01-02 08:17:09', '2020-01-02 08:17:09'),
	('product_package_type_show', 'نمایش', '/api/backend/products/package-types/{id}', 'GET', 'product_package_type', '2020-01-02 08:17:09', '2020-01-02 08:17:09'),
	('product_package_type_store', 'ذخیره سازی', '/api/backend/products/package-types', 'POST', 'product_package_type', '2020-01-02 08:17:09', '2020-01-02 08:17:09'),
	('product_package_type_update', 'به روز رسانی', '/api/backend/products/package-types/{id}', 'PUT', 'product_package_type', '2020-01-02 08:17:09', '2020-01-02 08:17:09'),
	('product_pins', 'قیمت تخفیف و تعداد محصول', '/api/backend/products/{id}/pins', 'GET', 'product', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('product_price_parameter_index', 'مدیریت', '/api/backend/products/price-parameters', 'GET', 'product_price_parameter', '2020-01-07 12:37:44', '2020-01-07 12:37:44'),
	('product_price_parameter_show', 'نمایش', '/api/backend/products/price-parameters/{id}', 'GET', 'product_price_parameter', '2020-01-07 12:37:44', '2020-01-07 12:37:44'),
	('product_price_parameter_store', 'ذخیره سازی', '/api/backend/products/price-parameters', 'POST', 'product_price_parameter', '2020-01-07 12:37:44', '2020-01-07 12:37:44'),
	('product_price_parameter_update', 'به روز رسانی', '/api/backend/products/price-parameters/{id}', 'PUT', 'product_price_parameter', '2020-01-07 12:37:44', '2020-01-07 12:37:44'),
	('product_product_attributes', 'permissions.product attributes', '/api/backend/products/{id}/categories/{categories}/attributes', 'GET', 'product', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('product_show', 'نمایش', '/api/backend/products/{id}', 'GET', 'product', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('product_store', 'ذخیره سازی', '/api/backend/products', 'POST', 'product', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('product_store_pins', 'ذخیره سازی قیمت تخفیف و تعداد محصول', '/api/backend/products/{id}/pins', 'POST', 'product', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('product_update', 'به روز رسانی', '/api/backend/products/{id}', 'PUT', 'product', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('region_index', 'مدیریت', '/api/backend/regions', 'GET', 'region', '2020-01-15 12:39:35', '2020-01-15 12:39:35'),
	('region_show', 'نمایش', '/api/backend/regions/{id}', 'GET', 'region', '2020-01-15 12:39:35', '2020-01-15 12:39:35'),
	('region_store', 'ذخیره سازی', '/api/backend/regions', 'POST', 'region', '2020-01-15 12:39:35', '2020-01-15 12:39:35'),
	('region_update', 'به روز رسانی', '/api/backend/regions/{id}', 'PUT', 'region', '2020-01-15 12:39:35', '2020-01-15 12:39:35'),
	('report_map_reports', 'permissions.map reports', '/api/backend/reports/map-reports', 'GET', 'report', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('report_sales_report', 'permissions.sales report', '/api/backend/reports/sales-daily-report', 'GET', 'report', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('role_index', 'مدیریت', '/api/backend/users/roles', 'GET', 'role', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('role_permissions', 'سطوح دسترسی', '/api/backend/users/roles/{role}/permissions', 'GET', 'role', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('role_set_permission', 'ست کردن سطح دسترسی', '/api/backend/users/roles/{role}/permissions', 'PUT', 'role', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('role_store', 'ذخیره سازی', '/api/backend/users/roles', 'POST', 'role', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('social_medias_get', 'permissions.social medias get', '/api/backend/socialMedias', 'GET', 'social_medias', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('ticket_category_index', 'مدیریت', '/api/backend/tickets/categories', 'GET', 'ticket_category', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('ticket_category_show', 'نمایش', '/api/backend/tickets/categories/{id}', 'GET', 'ticket_category', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('ticket_category_store', 'ذخیره سازی', '/api/backend/tickets/categories', 'POST', 'ticket_category', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('ticket_category_update', 'به روز رسانی', '/api/backend/tickets/categories/{id}', 'PUT', 'ticket_category', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('ticket_conversations', 'permissions.conversations', '/api/backend/tickets/{id}/conversations', 'GET', 'ticket', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('ticket_delete_conversation', 'permissions.delete conversation', '/api/backend/tickets/{ticket}/conversations/{id}', 'DELETE', 'ticket', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('ticket_index', 'مدیریت', '/api/backend/tickets', 'GET', 'ticket', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('ticket_store', 'ذخیره سازی', '/api/backend/tickets', 'POST', 'ticket', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('ticket_store_conversations', 'permissions.store conversations', '/api/backend/tickets/{id}/conversations', 'POST', 'ticket', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('ticket_update', 'به روز رسانی', '/api/backend/tickets/{id}', 'PUT', 'ticket', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('user_change_password', 'تغییر رمز', '/api/backend/users/{id}/change-password', 'PUT', 'user', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('user_change_status', 'تغییر وضعیت', '/api/backend/users/{id}/change-status', 'PUT', 'user', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('user_index', 'مدیریت', '/api/backend/users', 'GET', 'user', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('user_show', 'نمایش', '/api/backend/users/{id}', 'GET', 'user', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('user_store', 'ذخیره سازی', '/api/backend/users', 'POST', 'user', '2019-12-28 16:56:12', '2019-12-28 16:56:12'),
	('user_update', 'به روز رسانی', '/api/backend/users/{id}', 'PUT', 'user', '2019-12-28 16:56:12', '2019-12-28 16:56:12');
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

-- Dumping data for table 517_shop.permission_role: ~89 rows (approximately)
/*!40000 ALTER TABLE `permission_role` DISABLE KEYS */;
INSERT INTO `permission_role` (`role_key`, `permission_key`) VALUES
	('programmer', 'anbar_index'),
	('programmer', 'attachment_delete'),
	('programmer', 'attachment_post'),
	('programmer', 'blog_category_index'),
	('programmer', 'blog_category_show'),
	('programmer', 'blog_category_store'),
	('programmer', 'blog_category_update'),
	('programmer', 'blog_content_change_status'),
	('programmer', 'blog_content_index'),
	('programmer', 'blog_content_show'),
	('programmer', 'blog_content_store'),
	('programmer', 'blog_content_update'),
	('programmer', 'brand_index'),
	('programmer', 'brand_show'),
	('programmer', 'brand_store'),
	('programmer', 'brand_update'),
	('programmer', 'communication_channels_get'),
	('programmer', 'domain_read'),
	('programmer', 'domain_read_sticky'),
	('programmer', 'domain_update'),
	('programmer', 'domain_update_sticky'),
	('programmer', 'filter_price-parameter_get'),
	('programmer', 'filter_tags_get'),
	('programmer', 'filter_users_accessible_get'),
	('programmer', 'filter_users_get'),
	('programmer', 'gallery_index'),
	('programmer', 'gallery_show'),
	('programmer', 'gallery_store'),
	('programmer', 'gallery_update'),
	('programmer', 'group_attribute_index'),
	('programmer', 'group_attribute_show'),
	('programmer', 'group_attribute_store'),
	('programmer', 'group_attribute_update'),
	('programmer', 'order_fractive_request'),
	('programmer', 'order_index'),
	('programmer', 'order_show'),
	('programmer', 'order_update'),
	('programmer', 'orders_status_get'),
	('programmer', 'permission_index'),
	('programmer', 'product_category_get_all_attributes_with_checked'),
	('programmer', 'product_category_get_attributes'),
	('programmer', 'product_category_index'),
	('programmer', 'product_category_show'),
	('programmer', 'product_category_store'),
	('programmer', 'product_category_store_attributes'),
	('programmer', 'product_category_update'),
	('programmer', 'product_change_status'),
	('programmer', 'product_index'),
	('programmer', 'product_package_type_index'),
	('programmer', 'product_package_type_show'),
	('programmer', 'product_package_type_store'),
	('programmer', 'product_package_type_update'),
	('programmer', 'product_pins'),
	('programmer', 'product_price_parameter_index'),
	('programmer', 'product_price_parameter_show'),
	('programmer', 'product_price_parameter_store'),
	('programmer', 'product_price_parameter_update'),
	('programmer', 'product_product_attributes'),
	('programmer', 'product_show'),
	('programmer', 'product_store'),
	('programmer', 'product_store_pins'),
	('programmer', 'product_update'),
	('programmer', 'region_index'),
	('programmer', 'region_show'),
	('programmer', 'region_store'),
	('programmer', 'region_update'),
	('programmer', 'report_map_reports'),
	('programmer', 'report_sales_report'),
	('programmer', 'role_index'),
	('programmer', 'role_permissions'),
	('programmer', 'role_set_permission'),
	('programmer', 'role_store'),
	('programmer', 'social_medias_get'),
	('programmer', 'ticket_category_index'),
	('programmer', 'ticket_category_show'),
	('programmer', 'ticket_category_store'),
	('programmer', 'ticket_category_update'),
	('programmer', 'ticket_conversations'),
	('programmer', 'ticket_delete_conversation'),
	('programmer', 'ticket_index'),
	('programmer', 'ticket_store'),
	('programmer', 'ticket_store_conversations'),
	('programmer', 'ticket_update'),
	('programmer', 'user_change_password'),
	('programmer', 'user_change_status'),
	('programmer', 'user_index'),
	('programmer', 'user_show'),
	('programmer', 'user_store'),
	('programmer', 'user_update');
/*!40000 ALTER TABLE `permission_role` ENABLE KEYS */;

-- Dumping structure for table 517_shop.price_parameter
CREATE TABLE IF NOT EXISTS `price_parameter` (
  `value` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `_lft` int(10) unsigned NOT NULL DEFAULT 0,
  `_rgt` int(10) unsigned NOT NULL DEFAULT 0,
  `parent_id` int(10) unsigned DEFAULT NULL,
  `label` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`value`),
  KEY `_lft` (`_lft`),
  KEY `_rgt` (`_rgt`),
  KEY `parent_id` (`parent_id`)
) ENGINE=MyISAM AUTO_INCREMENT=46 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.price_parameter: 29 rows
/*!40000 ALTER TABLE `price_parameter` DISABLE KEYS */;
INSERT INTO `price_parameter` (`value`, `_lft`, `_rgt`, `parent_id`, `label`, `status`, `created_at`, `updated_at`) VALUES
	(17, 1, 12, NULL, 'رنگ', 1, '2020-01-06 00:31:33', '2020-01-09 20:21:49'),
	(18, 13, 18, NULL, 'جنس', 1, '2020-01-05 14:05:24', '2020-01-05 14:05:24'),
	(19, 19, 36, NULL, 'بسته بندی', 1, '2020-01-05 14:05:48', '2020-01-05 14:05:48'),
	(20, 37, 44, NULL, 'گارانتی', 1, '2020-01-05 14:05:56', '2020-01-05 14:05:56'),
	(21, 45, 50, NULL, 'حجم', 1, '2020-01-05 14:06:08', '2020-01-05 14:06:08'),
	(22, 2, 9, 17, 'سفید', 1, '2020-01-05 14:06:50', '2020-01-09 20:21:49'),
	(23, 10, 11, 17, 'آبی', 1, '2020-01-05 14:06:50', '2020-01-09 20:21:49'),
	(24, 14, 15, 18, 'چرم', 1, '2020-01-05 14:07:10', '2020-01-05 14:07:10'),
	(25, 16, 17, 18, 'پلاستیک', 1, '2020-01-05 14:07:10', '2020-01-05 14:07:10'),
	(26, 20, 21, 19, '25 گرمی', 1, '2020-01-05 18:39:02', '2020-01-05 18:39:02'),
	(27, 22, 23, 19, '50 گرمی', 1, '2020-01-05 18:39:02', '2020-01-05 18:39:02'),
	(28, 24, 25, 19, '100 گرمی', 1, '2020-01-05 18:39:02', '2020-01-05 18:39:02'),
	(29, 26, 27, 19, '200 گرمی', 1, '2020-01-05 18:39:02', '2020-01-05 18:39:02'),
	(30, 28, 29, 19, '500 گرمی', 1, '2020-01-05 18:39:02', '2020-01-05 18:39:02'),
	(31, 30, 31, 19, '1 کیلویی', 1, '2020-01-05 18:39:03', '2020-01-05 18:39:03'),
	(32, 38, 39, 20, 'سام سرویس', 1, '2020-01-05 18:39:32', '2020-01-05 18:39:32'),
	(33, 40, 41, 20, 'گلدیران', 1, '2020-01-05 18:39:32', '2020-01-05 18:39:32'),
	(34, 46, 47, 21, '50ml', 1, '2020-01-05 18:39:49', '2020-01-05 18:39:49'),
	(35, 48, 49, 21, '100ml', 1, '2020-01-05 18:39:49', '2020-01-05 18:39:49'),
	(36, 3, 6, 22, 'یخچالی', 1, '2020-01-09 20:21:10', '2020-01-09 20:21:10'),
	(37, 7, 8, 22, 'صدفی', 1, '2020-01-09 20:21:10', '2020-01-09 20:21:10'),
	(38, 32, 35, 19, 'کم حجمی', 1, '2020-01-18 07:22:24', '2020-01-18 07:22:24'),
	(39, 33, 34, 38, '1 گرمی', 1, '2020-01-18 07:22:36', '2020-01-18 07:22:36'),
	(40, 51, 58, NULL, 'عصاره', 1, '2020-01-18 07:28:25', '2020-01-18 07:28:25'),
	(41, 52, 55, 40, 'عطر', 1, '2020-01-18 07:28:36', '2020-01-18 07:28:36'),
	(42, 53, 54, 41, 'استوایی', 1, '2020-01-18 07:28:46', '2020-01-18 07:28:46'),
	(43, 42, 43, 20, 'کالای برقی', 1, '2020-01-21 07:23:17', '2020-01-21 07:23:17'),
	(44, 56, 57, 40, 'عرقیجات', 1, '2020-01-21 07:24:01', '2020-01-21 07:24:01'),
	(45, 4, 5, 36, 'داخلی', 1, '2020-01-21 07:54:00', '2020-01-21 07:54:00');
/*!40000 ALTER TABLE `price_parameter` ENABLE KEYS */;

-- Dumping structure for table 517_shop.price_parameter_switch_category
CREATE TABLE IF NOT EXISTS `price_parameter_switch_category` (
  `price_parameter_id` bigint(20) NOT NULL DEFAULT 0,
  `category_id` bigint(20) NOT NULL DEFAULT 0,
  PRIMARY KEY (`price_parameter_id`,`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table 517_shop.price_parameter_switch_category: ~26 rows (approximately)
/*!40000 ALTER TABLE `price_parameter_switch_category` DISABLE KEYS */;
INSERT INTO `price_parameter_switch_category` (`price_parameter_id`, `category_id`) VALUES
	(17, 12),
	(17, 13),
	(17, 17),
	(17, 18),
	(17, 19),
	(17, 20),
	(17, 21),
	(17, 22),
	(17, 23),
	(17, 24),
	(17, 25),
	(17, 26),
	(17, 27),
	(20, 12),
	(20, 13),
	(20, 17),
	(20, 18),
	(20, 19),
	(20, 20),
	(20, 21),
	(20, 22),
	(20, 23),
	(20, 24),
	(20, 25),
	(20, 26),
	(20, 27);
/*!40000 ALTER TABLE `price_parameter_switch_category` ENABLE KEYS */;

-- Dumping structure for table 517_shop.product
CREATE TABLE IF NOT EXISTS `product` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `created_by` bigint(20) unsigned NOT NULL,
  `brand_id` bigint(20) unsigned NOT NULL,
  `package_type_id` bigint(20) unsigned NOT NULL,
  `slug` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `heading` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `code` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `count` int(11) NOT NULL DEFAULT 0,
  `price` int(11) NOT NULL DEFAULT 0,
  `discount` int(11) NOT NULL DEFAULT 0,
  `weight` int(11) NOT NULL DEFAULT 0,
  `sales_number` int(11) NOT NULL DEFAULT 0,
  `visitor` int(11) unsigned NOT NULL DEFAULT 0,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `content` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `meta_title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `meta_description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_slug_unique` (`slug`),
  UNIQUE KEY `code` (`code`),
  KEY `FK_products_brand` (`brand_id`),
  KEY `FK_product_package_type` (`package_type_id`),
  KEY `FK_product_users` (`created_by`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.product: 6 rows
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` (`id`, `created_by`, `brand_id`, `package_type_id`, `slug`, `title`, `heading`, `code`, `count`, `price`, `discount`, `weight`, `sales_number`, `visitor`, `status`, `content`, `meta_title`, `meta_description`, `created_at`, `updated_at`) VALUES
	(1, 1, 7, 9, 'گلکسی-نوت-5', 'گلکسی نوت 5', NULL, '1', 0, 5000000, 0, 250, 0, 0, 0, NULL, 'گلکسی نوت 5', 'گلکسی نوت 5', '2020-01-17 11:14:38', '2020-01-20 21:09:05'),
	(2, 1, 7, 16, 'گوشی-موبایل-سامسونگ-مدل-Galaxy-A30s-SM-A307FN/DS-دو-سیم-کارت-ظرفیت-128-گیگابایت', 'گوشی موبایل سامسونگ مدل Galaxy A30s SM-A307FN/DS دو سیم کارت ظرفیت 128 گیگابایت', 'شیشسیسشیشس', '12', 0, 0, 0, 0, 0, 0, 0, NULL, 'گوشی موبایل سامسونگ مدل Galaxy A30s SM-A307FN/DS دو سیم کارت ظرفیت 128 گیگابایت', 'گوشی موبایل سامسونگ مدل Galaxy A30s SM-A307FN/DS دو سیم کارت ظرفیت 128 گیگابایت', '2020-02-05 21:07:48', '2020-02-05 21:07:48'),
	(3, 1, 11, 17, 'مچ-بند-هوشمند-شیائومی-مدل-Mi-Band-4-Global', 'مچ بند هوشمند شیائومی مدل Mi Band 4 Global', 'شیشسیسشیشس', '12سسس', 0, 0, 0, 0, 0, 0, 0, NULL, 'مچ بند هوشمند شیائومی مدل Mi Band 4 Global', 'مچ بند هوشمند شیائومی مدل Mi Band 4 Global', '2020-02-05 21:12:05', '2020-02-05 21:12:05'),
	(4, 1, 10, 14, 'گوشی-موبایل-سامسونگ-مدل-Galaxy-A10s-SM-A107F/DS-دو-سیم-کارت-ظرفیت-32-گیگابایت', 'گوشی موبایل سامسونگ مدل Galaxy A10s SM-A107F/DS دو سیم کارت ظرفیت 32 گیگابایت', 'شیشسیسشیشس', '121212', 0, 0, 0, 0, 0, 0, 0, NULL, 'گوشی موبایل سامسونگ مدل Galaxy A10s SM-A107F/DS دو سیم کارت ظرفیت 32 گیگابایت', 'گوشی موبایل سامسونگ مدل Galaxy A10s SM-A107F/DS دو سیم کارت ظرفیت 32 گیگابایت', '2020-02-05 21:21:28', '2020-02-05 21:21:28'),
	(5, 1, 13, 16, 'ماشین-لباسشویی-ال-جی-مدل-wm-843-ظرفیت-8-کیلوگرم', 'ماشین لباسشویی ال جی مدل wm-843 ظرفیت 8 کیلوگرم', 'شیشسیسشیشس', '12dsdsdsdsds', 0, 0, 0, 0, 0, 0, 0, NULL, 'ماشین لباسشویی ال جی مدل wm-843 ظرفیت 8 کیلوگرم', 'ماشین لباسشویی ال جی مدل wm-843 ظرفیت 8 کیلوگرم', '2020-02-05 21:22:08', '2020-02-05 21:22:08'),
	(6, 1, 15, 19, 'لباسشویی-اینترنشنال-آنیل-مدل-WM9-با-ظرفیت-9-کیلوگرم', 'لباسشویی اینترنشنال آنیل مدل WM9 با ظرفیت 9 کیلوگرم', 'لباسشویی اینترنشنال آنیل مدل WM9 با ظرفیت 9 کیلوگرم', '12ffff', 0, 0, 0, 0, 0, 0, 0, NULL, 'لباسشویی اینترنشنال آنیل مدل WM9 با ظرفیت 9 کیلوگرم', 'لباسشویی اینترنشنال آنیل مدل WM9 با ظرفیت 9 کیلوگرم', '2020-02-05 21:23:22', '2020-02-05 21:23:22');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;

-- Dumping structure for procedure 517_shop.products
DELIMITER //
CREATE PROCEDURE `products`()
BEGIN

END//
DELIMITER ;

-- Dumping structure for table 517_shop.product_categories
CREATE TABLE IF NOT EXISTS `product_categories` (
  `product_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`category_id`,`product_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.product_categories: 6 rows
/*!40000 ALTER TABLE `product_categories` DISABLE KEYS */;
INSERT INTO `product_categories` (`product_id`, `category_id`) VALUES
	(2, 12),
	(3, 12),
	(4, 12),
	(5, 12),
	(6, 12),
	(1, 13);
/*!40000 ALTER TABLE `product_categories` ENABLE KEYS */;

-- Dumping structure for table 517_shop.product_category
CREATE TABLE IF NOT EXISTS `product_category` (
  `value` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `_lft` int(10) unsigned NOT NULL DEFAULT 0,
  `_rgt` int(10) unsigned NOT NULL DEFAULT 0,
  `parent_id` int(10) unsigned DEFAULT NULL,
  `label` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `heading` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `meta_title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `meta_description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`value`),
  UNIQUE KEY `product_category_slug_unique` (`slug`),
  KEY `product_category__lft__rgt_parent_id_index` (`_lft`,`_rgt`,`parent_id`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.product_category: 13 rows
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;
INSERT INTO `product_category` (`value`, `slug`, `_lft`, `_rgt`, `parent_id`, `label`, `heading`, `meta_title`, `meta_description`, `content`, `status`, `created_at`, `updated_at`) VALUES
	(12, NULL, 1, 38, NULL, 'کالای دیجیتال', NULL, NULL, NULL, NULL, 1, '2020-01-17 11:08:12', '2020-01-17 11:08:12'),
	(13, 'موبایل', 2, 25, 12, 'موبایل', NULL, 'گوشی موبایل', 'گوشی موبایل', NULL, 1, '2020-01-17 11:08:22', '2020-01-18 06:48:39'),
	(18, 'گوشی-موبایل', 23, 24, 13, 'گوشی موبایل', NULL, 'گوشی موبایل', 'گوشی موبایل', NULL, 1, '2020-01-18 06:48:56', '2020-01-18 06:48:56'),
	(17, 'لوازم-جانبی', 9, 16, 13, 'لوازم جانبی', NULL, 'لوازم جانبی', 'لوازم جانبی', NULL, 1, '2020-01-18 06:47:26', '2020-01-18 06:47:26'),
	(19, 'کیف-و-کاور-گوشی', 10, 11, 17, 'کیف و کاور گوشی', NULL, 'کیف و کاور گوشی', 'کیف و کاور گوشی', NULL, 1, '2020-01-18 06:50:36', '2020-01-18 06:50:36'),
	(20, 'پاور-بانک', 12, 13, 17, 'پاور بانک', NULL, 'پاور بانک', 'پاور بانک', NULL, 1, '2020-01-18 06:50:36', '2020-01-18 06:50:36'),
	(21, 'پایه-نگهدارنده', 14, 15, 17, 'پایه نگهدارنده', NULL, 'پایه نگهدارنده', 'پایه نگهدارنده', NULL, 1, '2020-01-18 06:50:36', '2020-01-18 06:50:36'),
	(22, 'دوربین', 26, 31, 12, 'دوربین', NULL, 'دوربین', 'دوربین', NULL, 1, '2020-01-18 06:52:08', '2020-01-18 06:52:08'),
	(23, 'لبتاب', 32, 37, 12, 'لبتاب', NULL, 'لبتاب', 'لبتاب', NULL, 1, '2020-01-18 06:52:08', '2020-01-18 06:52:08'),
	(24, 'دوربین-عکاسی', 27, 28, 22, 'دوربین عکاسی', NULL, 'دوربین عکاسی', 'دوربین عکاسی', NULL, 1, '2020-01-18 06:52:33', '2020-01-18 06:52:33'),
	(25, 'دوربین-فیلم-برداری', 29, 30, 22, 'دوربین فیلم برداری', NULL, 'دوربین فیلم برداری', 'دوربین فیلم برداری', NULL, 1, '2020-01-18 06:52:33', '2020-01-18 06:52:33'),
	(26, 'لوازم-جانبی-لپ-تاپ', 33, 34, 23, 'لوازم جانبی لپ تاپ', NULL, 'لوازم جانبی لپ تاپ', 'لوازم جانبی لپ تاپ', NULL, 1, '2020-01-18 06:54:06', '2020-01-18 06:54:06'),
	(27, 'لپ-تاپ-و-الترابوک', 35, 36, 23, 'لپ تاپ و الترابوک', NULL, 'لپ تاپ و الترابوک', 'لپ تاپ و الترابوک', NULL, 1, '2020-01-18 06:54:06', '2020-01-18 06:54:06');
/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;

-- Dumping structure for procedure 517_shop.product_category_get_all_attibutes_with_checked
DELIMITER //
CREATE PROCEDURE `product_category_get_all_attibutes_with_checked`(
	IN `category_id_parameter` INT,
	IN `page_parameter` INT,
	IN `title_parameter` VARCHAR(50)
)
    DETERMINISTIC
    SQL SECURITY INVOKER
BEGIN
	DECLARE offseter INT;
	DECLARE limiter INT;
	
	SET limiter = 52;
	SET offseter = (page_parameter - 1) * limiter;
	
	SELECT DISTINCT id, title, IF(ISNULL(SUB.attribute_id), false, true) AS checked FROM group_attribute AS ga
	left JOIN (SELECT attribute_id FROM group_attribute_category WHERE category_id = category_id_parameter) AS SUB ON  SUB.attribute_id = ga.id
	WHERE title LIKE  CONCAT('%', title_parameter, '%')
	order BY id DESC LIMIT limiter OFFSET offseter;
END//
DELIMITER ;

-- Dumping structure for procedure 517_shop.product_category_get_all_brands_with_checked
DELIMITER //
CREATE PROCEDURE `product_category_get_all_brands_with_checked`(
	IN `category_id_parameter` INT,
	IN `page_parameter` INT,
	IN `title_parameter` VARCHAR(50)
)
BEGIN
	DECLARE offseter INT;
	DECLARE limiter INT;
	
	SET limiter = 52;
	SET offseter = (page_parameter - 1) * limiter;
	
	SELECT DISTINCT id, title, IF(ISNULL(SUB.brand_id), false, true) AS checked FROM brand AS b
	left JOIN (SELECT brand_id FROM brand_switch_category WHERE category_id = category_id_parameter) AS SUB ON  SUB.brand_id = b.id
	WHERE title LIKE  CONCAT('%', title_parameter, '%')
	order BY id DESC LIMIT limiter OFFSET offseter;
END//
DELIMITER ;

-- Dumping structure for procedure 517_shop.product_category_get_all_price_parameters_with_checked
DELIMITER //
CREATE PROCEDURE `product_category_get_all_price_parameters_with_checked`(
	IN `category_id_parameter` INT,
	IN `page_parameter` INT,
	IN `title_parameter` VARCHAR(50)
)
BEGIN
	DECLARE offseter INT;
	DECLARE limiter INT;
	
	SET limiter = 52;
	SET offseter = (page_parameter - 1) * limiter;
	
	SELECT DISTINCT pp.value AS id, pp.label as title, IF(ISNULL(SUB.price_parameter_id), false, true) AS checked FROM price_parameter AS pp
	left JOIN (SELECT price_parameter_id FROM price_parameter_switch_category WHERE category_id = category_id_parameter) AS SUB ON  SUB.price_parameter_id = pp.value
	WHERE label LIKE  CONCAT('%', title_parameter, '%') AND parent_id IS null
	order BY id DESC LIMIT limiter OFFSET offseter;
END//
DELIMITER ;

-- Dumping structure for procedure 517_shop.product_info
DELIMITER //
CREATE PROCEDURE `product_info`()
BEGIN	

	SELECT p.id, p.title, p.heading, p.slug,  p.content, p.meta_title, p.meta_description, p.`status`, p.`count`, p.`code` ,
	CONCAT('[', GROUP_CONCAT(JSON_OBJECT('id', b.id, 'title', b.title, 'slug', b.slug)), ']'), 
	CONCAT('[', GROUP_CONCAT(JSON_OBJECT('id', pt.id, 'title', pt.title)), ']') 
	INTO @id, @title, @heading, @slug , @content, @meta_title, @meta_description, @active , @inventory, @coding, @brand_info, @package_type_info
	FROM product AS p
	LEFT JOIN brand AS b ON b.id = p.brand_id
	LEFT JOIN package_type AS pt ON pt.id = p.package_type_id
	WHERE p.id = 1 LIMIT 1;
	
	SELECT CONCAT('[', GROUP_CONCAT(JSON_OBJECT('file', f.file)), ']') 
	INTO @files
	FROM file AS f WHERE f.fileable_id = 1 LIMIT 1;
	
	
	SELECT CONCAT('[', GROUP_CONCAT(JSON_OBJECT('id', gap.attribute_id, 'title', ga.title, 'value', t.name, 'has_link', ga.has_link, 'slug', ga.slug)), ']') 
	INTO @attributes
	FROM group_attribute_product AS gap
	LEFT JOIN group_attribute AS ga ON ga.id = gap.attribute_id
	LEFT JOIN tag AS t ON t.id = gap.value
	WHERE gap.product_id = 1 LIMIT 1;
	
	
	SELECT @id AS id ,@title AS title, @slug AS slug ,@content AS content, 
	@meta_title AS meta_title, @meta_description AS meta_description,
	@active AS active, @inventory AS inventory, @coding AS coding,
	@brand_info AS brand_info, @package_type_info AS package_type_info, @files AS files, @attributes AS attributes;
END//
DELIMITER ;

-- Dumping structure for table 517_shop.product_list
CREATE TABLE IF NOT EXISTS `product_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by` bigint(20) NOT NULL,
  `title` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `order` tinyint(4) NOT NULL DEFAULT 1,
  `link` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.product_list: 2 rows
/*!40000 ALTER TABLE `product_list` DISABLE KEYS */;
INSERT INTO `product_list` (`id`, `created_by`, `title`, `status`, `order`, `link`, `created_at`, `updated_at`) VALUES
	(1, 1, 'محصولات جدید', 0, 10, '1', '2020-01-18 23:18:14', '2020-02-05 23:36:08'),
	(2, 1, 'محصولات پیشنهادی', 1, 1, '1', '2020-01-18 20:24:34', '2020-02-05 23:36:18');
/*!40000 ALTER TABLE `product_list` ENABLE KEYS */;

-- Dumping structure for procedure 517_shop.product_list_items
DELIMITER //
CREATE PROCEDURE `product_list_items`()
BEGIN

END//
DELIMITER ;

-- Dumping structure for table 517_shop.product_list_items
CREATE TABLE IF NOT EXISTS `product_list_items` (
  `list_id` int(11) NOT NULL,
  `product_id` int(20) NOT NULL,
  PRIMARY KEY (`list_id`,`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table 517_shop.product_list_items: ~7 rows (approximately)
/*!40000 ALTER TABLE `product_list_items` DISABLE KEYS */;
INSERT INTO `product_list_items` (`list_id`, `product_id`) VALUES
	(1, 1),
	(2, 1),
	(2, 2),
	(2, 3),
	(2, 4),
	(2, 5),
	(2, 6);
/*!40000 ALTER TABLE `product_list_items` ENABLE KEYS */;

-- Dumping structure for table 517_shop.product_pins
CREATE TABLE IF NOT EXISTS `product_pins` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) unsigned NOT NULL,
  `weight` int(11) NOT NULL DEFAULT 0,
  `count` int(11) NOT NULL DEFAULT 0,
  `price` int(11) NOT NULL DEFAULT 0,
  `discount` int(11) NOT NULL DEFAULT 0,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_product_pins_product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.product_pins: ~3 rows (approximately)
/*!40000 ALTER TABLE `product_pins` DISABLE KEYS */;
INSERT INTO `product_pins` (`id`, `product_id`, `weight`, `count`, `price`, `discount`, `status`, `created_at`, `updated_at`) VALUES
	(51, 1, 250, 500, 5000000, 0, 1, '2020-01-20 21:08:54', '2020-01-20 21:08:54'),
	(52, 1, 250, 500, 5000000, 0, 1, '2020-01-20 21:08:55', '2020-01-20 21:08:55'),
	(53, 1, 250, 500, 5000000, 0, 1, '2020-01-21 07:54:16', '2020-01-21 07:54:16');
/*!40000 ALTER TABLE `product_pins` ENABLE KEYS */;

-- Dumping structure for table 517_shop.product_pins_price_parameter
CREATE TABLE IF NOT EXISTS `product_pins_price_parameter` (
  `product_pins_id` bigint(20) unsigned NOT NULL,
  `price_parameter_value` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`product_pins_id`,`price_parameter_value`),
  KEY `FK_product_pins_price_parameter_price_parameter` (`price_parameter_value`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.product_pins_price_parameter: 4 rows
/*!40000 ALTER TABLE `product_pins_price_parameter` DISABLE KEYS */;
INSERT INTO `product_pins_price_parameter` (`product_pins_id`, `price_parameter_value`) VALUES
	(51, 22),
	(51, 32),
	(52, 23),
	(53, 45);
/*!40000 ALTER TABLE `product_pins_price_parameter` ENABLE KEYS */;

-- Dumping structure for table 517_shop.product_tags
CREATE TABLE IF NOT EXISTS `product_tags` (
  `product_id` bigint(20) unsigned NOT NULL,
  `tag_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`product_id`,`tag_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.product_tags: 0 rows
/*!40000 ALTER TABLE `product_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_tags` ENABLE KEYS */;

-- Dumping structure for table 517_shop.region
CREATE TABLE IF NOT EXISTS `region` (
  `value` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `_lft` int(11) NOT NULL,
  `_rgt` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `is_posting` tinyint(1) NOT NULL DEFAULT 1,
  `is_bearing` tinyint(1) NOT NULL DEFAULT 0,
  `is_delivery` tinyint(1) NOT NULL DEFAULT 0,
  `in_person` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`value`),
  KEY `parent_id` (`parent_id`),
  KEY `lft` (`_lft`),
  KEY `rgt` (`_rgt`)
) ENGINE=MyISAM AUTO_INCREMENT=880 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.region: 622 rows
/*!40000 ALTER TABLE `region` DISABLE KEYS */;
INSERT INTO `region` (`value`, `label`, `parent_id`, `_lft`, `_rgt`, `status`, `is_posting`, `is_bearing`, `is_delivery`, `in_person`, `created_at`, `updated_at`) VALUES
	(1, 'آذربايجان شرقي', NULL, 1, 52, 1, 1, 1, 0, 0, NULL, '2020-01-15 12:21:49'),
	(2, 'آذربايجان غربي', NULL, 53, 90, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(3, 'اردبيل', NULL, 91, 114, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(4, 'اصفهان', NULL, 115, 174, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(5, 'البرز', NULL, 175, 192, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(6, 'ايلام', NULL, 193, 210, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(7, 'بوشهر', NULL, 211, 242, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(8, 'تهران', NULL, 243, 598, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(9, 'چهارمحال بختياري', NULL, 599, 614, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(10, 'خراسان جنوبي', NULL, 615, 636, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(11, 'خراسان رضوي', NULL, 637, 684, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(12, 'خراسان شمالي', NULL, 685, 698, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(13, 'خوزستان', NULL, 699, 744, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(14, 'زنجان', NULL, 745, 760, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(15, 'سمنان', NULL, 761, 780, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(16, 'سيستان و بلوچستان', NULL, 781, 802, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(17, 'فارس', NULL, 803, 934, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(18, 'قزوين', NULL, 935, 948, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(19, 'قم', NULL, 949, 952, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(20, 'كردستان', NULL, 953, 972, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(21, 'كرمان', NULL, 973, 998, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(22, 'كرمانشاه', NULL, 999, 1024, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(23, 'كهكيلويه و بويراحمد', NULL, 1025, 1036, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(24, 'گلستان', NULL, 1037, 1086, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(25, 'گيلان', NULL, 1087, 1130, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(26, 'لرستان', NULL, 1131, 1152, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(27, 'مازندران', NULL, 1153, 1200, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(28, 'مركزي', NULL, 1201, 1220, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(29, 'هرمزگان', NULL, 1221, 1248, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(30, 'همدان', NULL, 1249, 1270, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(31, 'يزد', NULL, 1271, 1290, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(32, 'آذر شهر', 1, 2, 3, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(33, 'اسكو', 1, 4, 5, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(34, 'اهر', 1, 6, 7, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(35, 'بستان آباد', 1, 8, 9, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(36, 'بناب', 1, 10, 11, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(37, 'بندر شرفخانه', 1, 12, 13, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(38, 'تبریز', 1, 14, 15, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(39, 'تسوج', 1, 16, 17, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(40, 'جلفا', 1, 18, 19, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(41, 'سراب', 1, 20, 21, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(42, 'شبستر', 1, 22, 23, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(43, 'صوفیان', 1, 24, 25, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(44, 'عجبشير', 1, 26, 27, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(45, 'قره آغاج', 1, 28, 29, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(46, 'كليبر', 1, 30, 31, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(47, 'كندوان', 1, 32, 33, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(48, 'مراغه', 1, 34, 35, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(49, 'مرند', 1, 36, 37, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(50, 'ملكان', 1, 38, 39, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(51, 'ممقان', 1, 40, 41, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(52, 'ميانه', 1, 42, 43, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(53, 'هاديشهر', 1, 44, 45, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(54, 'هريس', 1, 46, 47, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(55, 'هشترود', 1, 48, 49, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(56, 'ورزقان', 1, 50, 51, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(57, 'اروميه', 2, 54, 55, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(58, 'اشنويه', 2, 56, 57, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(59, 'بازرگان', 2, 58, 59, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(60, 'بوكان', 2, 60, 61, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(61, 'پلدشت', 2, 62, 63, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(62, 'پيرانشهر', 2, 64, 65, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(63, 'تكاب', 2, 66, 67, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(64, 'خوي', 2, 68, 69, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(65, 'سردشت', 2, 70, 71, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(66, 'سلماس', 2, 72, 73, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(67, 'سيه چشمه- چالدران', 2, 74, 75, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(68, 'سیمینه', 2, 76, 77, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(69, 'شاهين دژ', 2, 78, 79, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(70, 'شوط', 2, 80, 81, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(71, 'ماكو', 2, 82, 83, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(72, 'مهاباد', 2, 84, 85, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(73, 'مياندوآب', 2, 86, 87, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(74, 'نقده', 2, 88, 89, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(75, 'اردبيل', 3, 92, 93, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(76, 'بيله سوار', 3, 94, 95, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(77, 'پارس آباد', 3, 96, 97, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(78, 'خلخال', 3, 98, 99, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(79, 'سرعين', 3, 100, 101, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(80, 'كيوي (كوثر)', 3, 102, 103, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(81, 'گرمي (مغان)', 3, 104, 105, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(82, 'مشگين شهر', 3, 106, 107, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(83, 'مغان (سمنان)', 3, 108, 109, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(84, 'نمين', 3, 110, 111, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(85, 'نير', 3, 112, 113, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(86, 'آران و بيدگل', 4, 116, 117, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(87, 'اردستان', 4, 118, 119, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(88, 'اصفهان', 4, 120, 121, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(89, 'باغ بهادران', 4, 122, 123, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(90, 'تيران', 4, 124, 125, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(91, 'خميني شهر', 4, 126, 127, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(92, 'خوانسار', 4, 128, 129, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(93, 'دهاقان', 4, 130, 131, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(94, 'دولت آباد-اصفهان', 4, 132, 133, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(95, 'زرين شهر', 4, 134, 135, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(96, 'زيباشهر (محمديه)', 4, 136, 137, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(97, 'سميرم', 4, 138, 139, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(98, 'شاهين شهر', 4, 140, 141, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(99, 'شهرضا', 4, 142, 143, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(100, 'فريدن', 4, 144, 145, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(101, 'فريدون شهر', 4, 146, 147, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(102, 'فلاورجان', 4, 148, 149, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(103, 'فولاد شهر', 4, 150, 151, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(104, 'قهدریجان', 4, 152, 153, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(105, 'كاشان', 4, 154, 155, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(106, 'گلپايگان', 4, 156, 157, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(107, 'گلدشت اصفهان', 4, 158, 159, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(108, 'گلدشت مركزی', 4, 160, 161, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(109, 'مباركه اصفهان', 4, 162, 163, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(110, 'مهاباد-اصفهان', 4, 164, 165, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(111, 'نايين', 4, 166, 167, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(112, 'نجف آباد', 4, 168, 169, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(113, 'نطنز', 4, 170, 171, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(114, 'هرند', 4, 172, 173, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(115, 'آسارا', 5, 176, 177, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(116, 'اشتهارد', 5, 178, 179, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(117, 'شهر جديد هشتگرد', 5, 180, 181, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(118, 'طالقان', 5, 182, 183, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(119, 'کرج', 5, 184, 185, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(120, 'گلستان تهران', 5, 186, 187, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(121, 'نظرآباد', 5, 188, 189, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(122, 'هشتگرد', 5, 190, 191, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(123, 'آبدانان', 6, 194, 195, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(124, 'ايلام', 6, 196, 197, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(125, 'ايوان', 6, 198, 199, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(126, 'دره شهر', 6, 200, 201, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(127, 'دهلران', 6, 202, 203, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(128, 'سرابله', 6, 204, 205, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(129, 'شيروان چرداول', 6, 206, 207, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(130, 'مهران', 6, 208, 209, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(131, 'آبپخش', 7, 212, 213, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(132, 'اهرم', 7, 214, 215, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(133, 'برازجان', 7, 216, 217, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(134, 'بندر دير', 7, 218, 219, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(135, 'بندر ديلم', 7, 220, 221, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(136, 'بندر كنگان', 7, 222, 223, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(137, 'بندر گناوه', 7, 224, 225, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(138, 'بوشهر', 7, 226, 227, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(139, 'تنگستان', 7, 228, 229, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(140, 'جزيره خارك', 7, 230, 231, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(141, 'جم (ولايت)', 7, 232, 233, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(142, 'خورموج', 7, 234, 235, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(143, 'دشتستان - شبانکاره', 7, 236, 237, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(144, 'دلوار', 7, 238, 239, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(145, 'عسلویه', 7, 240, 241, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(146, 'اسلامشهر', 8, 244, 245, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(147, 'بومهن', 8, 246, 247, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(148, 'پاكدشت', 8, 248, 249, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(149, 'تهران', 8, 250, 569, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(150, 'چهاردانگه', 8, 570, 571, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(151, 'دماوند', 8, 572, 573, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(152, 'رودهن', 8, 574, 575, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(153, 'ري', 8, 576, 577, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(154, 'شريف آباد', 8, 578, 579, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(155, 'شهر رباط كريم', 8, 580, 581, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(156, 'شهر شهريار', 8, 582, 583, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(157, 'فشم', 8, 584, 585, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(158, 'فيروزكوه', 8, 586, 587, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(159, 'قدس', 8, 588, 589, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(160, 'كهريزك', 8, 590, 591, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(161, 'لواسان بزرگ', 8, 592, 593, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(162, 'ملارد', 8, 594, 595, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(163, 'ورامين', 8, 596, 597, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(164, 'اردل', 9, 600, 601, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(165, 'بروجن', 9, 602, 603, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(166, 'چلگرد (كوهرنگ)', 9, 604, 605, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(167, 'سامان', 9, 606, 607, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(168, 'شهركرد', 9, 608, 609, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(169, 'فارسان', 9, 610, 611, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(170, 'لردگان', 9, 612, 613, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(171, 'بشرویه', 10, 616, 617, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(172, 'بيرجند', 10, 618, 619, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(173, 'خضری', 10, 620, 621, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(174, 'خوسف', 10, 622, 623, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(175, 'سرایان', 10, 624, 625, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(176, 'سربيشه', 10, 626, 627, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(177, 'طبس', 10, 628, 629, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(178, 'فردوس', 10, 630, 631, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(179, 'قائن', 10, 632, 633, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(180, 'نهبندان', 10, 634, 635, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(181, 'بجستان', 11, 638, 639, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(182, 'بردسكن', 11, 640, 641, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(183, 'تايباد', 11, 642, 643, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(184, 'تربت جام', 11, 644, 645, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(185, 'تربت حيدريه', 11, 646, 647, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(186, 'جغتای', 11, 648, 649, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(187, 'جوین', 11, 650, 651, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(188, 'چناران', 11, 652, 653, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(189, 'خلیل آباد', 11, 654, 655, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(190, 'خواف', 11, 656, 657, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(191, 'درگز', 11, 658, 659, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(192, 'رشتخوار', 11, 660, 661, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(193, 'سبزوار', 11, 662, 663, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(194, 'سرخس', 11, 664, 665, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(195, 'طبس', 11, 666, 667, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(196, 'طرقبه', 11, 668, 669, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(197, 'فريمان', 11, 670, 671, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(198, 'قوچان', 11, 672, 673, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(199, 'كاشمر', 11, 674, 675, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(200, 'كلات', 11, 676, 677, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(201, 'گناباد', 11, 678, 679, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(202, 'مشهد', 11, 680, 681, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(203, 'نيشابور', 11, 682, 683, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(204, 'آشخانه، مانه و سمرقان', 12, 686, 687, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(205, 'اسفراين', 12, 688, 689, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(206, 'بجنورد', 12, 690, 691, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(207, 'جاجرم', 12, 692, 693, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(208, 'شيروان', 12, 694, 695, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(209, 'فاروج', 12, 696, 697, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(210, 'آبادان', 13, 700, 701, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(211, 'اميديه', 13, 702, 703, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(212, 'انديمشك', 13, 704, 705, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(213, 'اهواز', 13, 706, 707, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(214, 'ايذه', 13, 708, 709, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(215, 'باغ ملك', 13, 710, 711, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(216, 'بستان', 13, 712, 713, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(217, 'بندر ماهشهر', 13, 714, 715, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(218, 'بندرامام خميني', 13, 716, 717, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(219, 'بهبهان', 13, 718, 719, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(220, 'خرمشهر', 13, 720, 721, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(221, 'دزفول', 13, 722, 723, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(222, 'رامشیر', 13, 724, 725, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(223, 'رامهرمز', 13, 726, 727, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(224, 'سوسنگرد', 13, 728, 729, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(225, 'شادگان', 13, 730, 731, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(226, 'شوش', 13, 732, 733, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(227, 'شوشتر', 13, 734, 735, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(228, 'لالي', 13, 736, 737, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(229, 'مسجد سليمان', 13, 738, 739, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(230, 'هنديجان', 13, 740, 741, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(231, 'هويزه', 13, 742, 743, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(232, 'آب بر (طارم)', 14, 746, 747, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(233, 'ابهر', 14, 748, 749, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(234, 'خرمدره', 14, 750, 751, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(235, 'زرین آباد (ایجرود)', 14, 752, 753, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(236, 'زنجان', 14, 754, 755, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(237, 'قیدار (خدا بنده)', 14, 756, 757, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(238, 'ماهنشان', 14, 758, 759, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(239, 'ايوانكي', 15, 762, 763, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(240, 'بسطام', 15, 764, 765, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(241, 'دامغان', 15, 766, 767, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(242, 'سرخه', 15, 768, 769, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(243, 'سمنان', 15, 770, 771, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(244, 'شاهرود', 15, 772, 773, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(245, 'شهمیرزاد', 15, 774, 775, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(246, 'گرمسار', 15, 776, 777, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(247, 'مهدیشهر', 15, 778, 779, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(248, 'ايرانشهر', 16, 782, 783, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(249, 'چابهار', 16, 784, 785, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(250, 'خاش', 16, 786, 787, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(251, 'راسك', 16, 788, 789, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(252, 'زابل', 16, 790, 791, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(253, 'زاهدان', 16, 792, 793, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(254, 'سراوان', 16, 794, 795, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(255, 'سرباز', 16, 796, 797, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(256, 'ميرجاوه', 16, 798, 799, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(257, 'نيكشهر', 16, 800, 801, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(258, 'آباده', 17, 804, 805, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(259, 'آباده طشك', 17, 806, 807, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(260, 'اردكان', 17, 808, 809, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(261, 'ارسنجان', 17, 810, 811, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(262, 'استهبان', 17, 812, 813, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(263, 'اشكنان', 17, 814, 815, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(264, 'اقليد', 17, 816, 817, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(265, 'اوز', 17, 818, 819, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(266, 'ایج', 17, 820, 821, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(267, 'ایزد خواست', 17, 822, 823, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(268, 'باب انار', 17, 824, 825, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(269, 'بالاده', 17, 826, 827, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(270, 'بنارويه', 17, 828, 829, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(271, 'بهمن', 17, 830, 831, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(272, 'بوانات', 17, 832, 833, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(273, 'بيرم', 17, 834, 835, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(274, 'بیضا', 17, 836, 837, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(275, 'جنت شهر', 17, 838, 839, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(276, 'جهرم', 17, 840, 841, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(277, 'حاجي آباد-زرین دشت', 17, 842, 843, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(278, 'خاوران', 17, 844, 845, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(279, 'خرامه', 17, 846, 847, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(280, 'خشت', 17, 848, 849, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(281, 'خفر', 17, 850, 851, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(282, 'خنج', 17, 852, 853, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(283, 'خور', 17, 854, 855, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(284, 'داراب', 17, 856, 857, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(285, 'رونيز عليا', 17, 858, 859, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(286, 'زاهدشهر', 17, 860, 861, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(287, 'زرقان', 17, 862, 863, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(288, 'سده', 17, 864, 865, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(289, 'سروستان', 17, 866, 867, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(290, 'سعادت شهر', 17, 868, 869, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(291, 'سورمق', 17, 870, 871, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(292, 'ششده', 17, 872, 873, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(293, 'شیراز', 17, 874, 875, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(294, 'صغاد', 17, 876, 877, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(295, 'صفاشهر', 17, 878, 879, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(296, 'علاء مرودشت', 17, 880, 881, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(297, 'عنبر', 17, 882, 883, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(298, 'فراشبند', 17, 884, 885, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(299, 'فسا', 17, 886, 887, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(300, 'فيروز آباد', 17, 888, 889, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(301, 'قائميه', 17, 890, 891, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(302, 'قادر آباد', 17, 892, 893, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(303, 'قطب آباد', 17, 894, 895, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(304, 'قير', 17, 896, 897, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(305, 'كازرون', 17, 898, 899, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(306, 'كنار تخته', 17, 900, 901, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(307, 'گراش', 17, 902, 903, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(308, 'لار', 17, 904, 905, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(309, 'لامرد', 17, 906, 907, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(310, 'لپوئی', 17, 908, 909, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(311, 'لطيفي', 17, 910, 911, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(312, 'مبارك آباد ديز', 17, 912, 913, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(313, 'مرودشت', 17, 914, 915, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(314, 'مشكان', 17, 916, 917, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(315, 'مصير', 17, 918, 919, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(316, 'مهر فارس(گله دار)', 17, 920, 921, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(317, 'ميمند', 17, 922, 923, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(318, 'نوبندگان', 17, 924, 925, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(319, 'نودان', 17, 926, 927, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(320, 'نورآباد', 17, 928, 929, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(321, 'ني ريز', 17, 930, 931, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(322, 'کوار', 17, 932, 933, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(323, 'آبيك', 18, 936, 937, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(324, 'البرز', 18, 938, 939, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(325, 'بوئين زهرا', 18, 940, 941, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(326, 'تاكستان', 18, 942, 943, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(327, 'قزوين', 18, 944, 945, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(328, 'محمود آباد نمونه', 18, 946, 947, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(329, 'قم', 19, 950, 951, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(330, 'بانه', 20, 954, 955, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(331, 'بيجار', 20, 956, 957, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(332, 'دهگلان', 20, 958, 959, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(333, 'ديواندره', 20, 960, 961, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(334, 'سقز', 20, 962, 963, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(335, 'سنندج', 20, 964, 965, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(336, 'قروه', 20, 966, 967, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(337, 'كامياران', 20, 968, 969, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(338, 'مريوان', 20, 970, 971, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(339, 'بابك', 21, 974, 975, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(340, 'بافت', 21, 976, 977, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(341, 'بردسير', 21, 978, 979, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(342, 'بم', 21, 980, 981, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(343, 'جيرفت', 21, 982, 983, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(344, 'راور', 21, 984, 985, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(345, 'رفسنجان', 21, 986, 987, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(346, 'زرند', 21, 988, 989, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(347, 'سيرجان', 21, 990, 991, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(348, 'کرمان', 21, 992, 993, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(349, 'كهنوج', 21, 994, 995, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(350, 'منوجان', 21, 996, 997, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(351, 'اسلام آباد غرب', 22, 1000, 1001, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(352, 'پاوه', 22, 1002, 1003, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(353, 'تازه آباد- ثلاث باباجانی', 22, 1004, 1005, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(354, 'جوانرود', 22, 1006, 1007, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(355, 'سر پل ذهاب', 22, 1008, 1009, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(356, 'سنقر كليائي', 22, 1010, 1011, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(357, 'صحنه', 22, 1012, 1013, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(358, 'قصر شيرين', 22, 1014, 1015, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(359, 'کرمانشاه', 22, 1016, 1017, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(360, 'كنگاور', 22, 1018, 1019, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(361, 'گيلان غرب', 22, 1020, 1021, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(362, 'هرسين', 22, 1022, 1023, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(363, 'دهدشت', 23, 1026, 1027, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(364, 'دوگنبدان', 23, 1028, 1029, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(365, 'سي سخت- دنا', 23, 1030, 1031, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(366, 'گچساران', 23, 1032, 1033, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(367, 'ياسوج', 23, 1034, 1035, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(368, 'آزاد شهر', 24, 1038, 1039, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(369, 'آق قلا', 24, 1040, 1041, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(370, 'انبارآلوم', 24, 1042, 1043, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(371, 'اینچه برون', 24, 1044, 1045, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(372, 'بندر گز', 24, 1046, 1047, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(373, 'تركمن', 24, 1048, 1049, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(374, 'جلین', 24, 1050, 1051, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(375, 'خان ببین', 24, 1052, 1053, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(376, 'راميان', 24, 1054, 1055, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(377, 'سرخس کلاته', 24, 1056, 1057, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(378, 'سیمین شهر', 24, 1058, 1059, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(379, 'علي آباد كتول', 24, 1060, 1061, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(380, 'فاضل آباد', 24, 1062, 1063, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(381, 'كردكوي', 24, 1064, 1065, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(382, 'كلاله', 24, 1066, 1067, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(383, 'گالیکش', 24, 1068, 1069, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(384, 'گرگان', 24, 1070, 1071, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(385, 'گمیش تپه', 24, 1072, 1073, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(386, 'گنبد كاووس', 24, 1074, 1075, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(387, 'مراوه تپه', 24, 1076, 1077, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(388, 'مينو دشت', 24, 1078, 1079, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(389, 'نگین شهر', 24, 1080, 1081, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(390, 'نوده خاندوز', 24, 1082, 1083, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(391, 'نوکنده', 24, 1084, 1085, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(392, 'آستارا', 25, 1088, 1089, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(393, 'آستانه اشرفيه', 25, 1090, 1091, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(394, 'املش', 25, 1092, 1093, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(395, 'بندرانزلي', 25, 1094, 1095, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(396, 'خمام', 25, 1096, 1097, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(397, 'رشت', 25, 1098, 1099, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(398, 'رضوان شهر', 25, 1100, 1101, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(399, 'رود سر', 25, 1102, 1103, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(400, 'رودبار', 25, 1104, 1105, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(401, 'سياهكل', 25, 1106, 1107, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(402, 'شفت', 25, 1108, 1109, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(403, 'صومعه سرا', 25, 1110, 1111, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(404, 'فومن', 25, 1112, 1113, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(405, 'كلاچاي', 25, 1114, 1115, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(406, 'لاهيجان', 25, 1116, 1117, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(407, 'لنگرود', 25, 1118, 1119, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(408, 'لوشان', 25, 1120, 1121, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(409, 'ماسال', 25, 1122, 1123, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(410, 'ماسوله', 25, 1124, 1125, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(411, 'منجيل', 25, 1126, 1127, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(412, 'هشتپر', 25, 1128, 1129, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(413, 'ازنا', 26, 1132, 1133, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(414, 'الشتر', 26, 1134, 1135, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(415, 'اليگودرز', 26, 1136, 1137, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(416, 'بروجرد', 26, 1138, 1139, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(417, 'پلدختر', 26, 1140, 1141, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(418, 'خرم آباد', 26, 1142, 1143, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(419, 'دورود', 26, 1144, 1145, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(420, 'سپید دشت', 26, 1146, 1147, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(421, 'كوهدشت', 26, 1148, 1149, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(422, 'نورآباد (خوزستان)', 26, 1150, 1151, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(423, 'آمل', 27, 1154, 1155, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(424, 'بابل', 27, 1156, 1157, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(425, 'بابلسر', 27, 1158, 1159, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(426, 'بلده', 27, 1160, 1161, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(427, 'بهشهر', 27, 1162, 1163, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(428, 'پل سفيد', 27, 1164, 1165, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(429, 'تنكابن', 27, 1166, 1167, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(430, 'جويبار', 27, 1168, 1169, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(431, 'چالوس', 27, 1170, 1171, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(432, 'خرم آباد', 27, 1172, 1173, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(433, 'رامسر', 27, 1174, 1175, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(434, 'رستم کلا', 27, 1176, 1177, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(435, 'ساری', 27, 1178, 1179, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(436, 'سلمانشهر', 27, 1180, 1181, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(437, 'سواد كوه', 27, 1182, 1183, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(438, 'فريدون كنار', 27, 1184, 1185, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(439, 'قائم شهر', 27, 1186, 1187, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(440, 'گلوگاه', 27, 1188, 1189, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(441, 'محمودآباد', 27, 1190, 1191, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(442, 'مرزن آباد', 27, 1192, 1193, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(443, 'نكا', 27, 1194, 1195, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(444, 'نور', 27, 1196, 1197, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(445, 'نوشهر', 27, 1198, 1199, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(446, 'آشتيان', 28, 1202, 1203, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(447, 'اراک', 28, 1204, 1205, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(448, 'تفرش', 28, 1206, 1207, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(449, 'خمين', 28, 1208, 1209, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(450, 'دليجان', 28, 1210, 1211, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(451, 'ساوه', 28, 1212, 1213, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(452, 'شازند', 28, 1214, 1215, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(453, 'محلات', 28, 1216, 1217, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(454, 'کمیجان', 28, 1218, 1219, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(455, 'ابوموسي', 29, 1222, 1223, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(456, 'انگهران', 29, 1224, 1225, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(457, 'بستك', 29, 1226, 1227, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(458, 'بندر جاسك', 29, 1228, 1229, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(459, 'بندر لنگه', 29, 1230, 1231, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(460, 'بندرعباس', 29, 1232, 1233, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(461, 'پارسیان', 29, 1234, 1235, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(462, 'حاجي آباد', 29, 1236, 1237, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(463, 'دشتی', 29, 1238, 1239, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(464, 'دهبارز (رودان)', 29, 1240, 1241, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(465, 'قشم', 29, 1242, 1243, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(466, 'كيش', 29, 1244, 1245, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(467, 'ميناب', 29, 1246, 1247, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(468, 'اسدآباد', 30, 1250, 1251, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(469, 'بهار', 30, 1252, 1253, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(470, 'تويسركان', 30, 1254, 1255, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(471, 'رزن', 30, 1256, 1257, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(472, 'كبودر اهنگ', 30, 1258, 1259, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(473, 'ملاير', 30, 1260, 1265, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(474, 'نهاوند', 30, 1266, 1267, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(475, 'همدان', 30, 1268, 1269, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(476, 'منطقه 1', 149, 297, 320, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(477, 'منطقه 2', 149, 321, 340, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(478, 'منطقه 3', 149, 341, 360, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(479, 'منطقه 4', 149, 361, 378, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(480, 'منطقه 5', 149, 379, 400, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(481, 'منطقه 6', 149, 401, 418, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(482, 'منطقه 7', 149, 419, 428, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(483, 'منطقه 8', 149, 429, 436, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(484, 'منطقه 9', 149, 437, 442, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(485, 'منطقه 10', 149, 443, 452, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(486, 'منطقه 11', 149, 453, 462, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(487, 'منطقه 12', 149, 463, 472, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(488, 'منطقه 13', 149, 473, 480, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(489, 'منطقه 14', 149, 481, 488, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(490, 'منطقه 15', 149, 489, 500, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(491, 'منطقه 16', 149, 501, 512, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(492, 'منطقه 17', 149, 513, 518, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(493, 'منطقه 18', 149, 519, 526, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(494, 'منطقه 19', 149, 527, 538, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(495, 'منطقه 20', 149, 539, 546, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(496, 'منطقه 21', 149, 547, 554, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(497, 'منطقه 22', 149, 555, 564, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(498, 'حومه تهران', 149, 565, 568, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(752, 'ابركوه', 31, 1272, 1273, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(753, 'اردكان', 31, 1274, 1275, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(754, 'اشكذر', 31, 1276, 1277, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(755, 'بافق', 31, 1278, 1279, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(756, 'تفت', 31, 1280, 1281, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(757, 'مهريز', 31, 1282, 1283, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(758, 'ميبد', 31, 1284, 1285, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(759, 'هرات', 31, 1286, 1287, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(760, 'یزد', 31, 1288, 1289, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(765, 'درکه', 476, 298, 299, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(766, 'دربند', 476, 300, 301, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(767, 'تجریش', 476, 302, 303, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(768, 'الهیه', 476, 304, 305, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(769, 'اقدسیه', 476, 306, 307, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(770, 'ازگل', 476, 308, 309, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(771, 'شریعتی', 476, 310, 311, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(772, 'شهرک ها', 476, 312, 313, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(773, 'زعفرانیه و ولنجک', 476, 314, 315, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(774, 'فرمانیه و قیطریه', 476, 316, 317, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(775, 'نیاوران', 476, 318, 319, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(776, 'ژاندارمری', 477, 322, 323, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(777, 'ستارخان', 477, 324, 325, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(778, 'سعادت آباد', 477, 326, 327, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(779, 'شهرآرا', 477, 328, 329, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(780, 'شهرک غرب', 477, 330, 331, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(781, 'صادقیه', 477, 332, 333, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(782, 'طرشت', 477, 334, 335, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(783, 'گیشا', 477, 336, 337, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(784, 'فرحزاد', 477, 338, 339, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(785, 'پاسداران', 478, 342, 343, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(786, 'جردن', 478, 344, 345, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(787, 'دروس و قلهک', 478, 346, 347, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(788, 'دولت', 478, 348, 349, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(789, 'دیباجی', 478, 350, 351, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(790, 'سید خندان', 478, 352, 353, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(791, 'شریعتی', 478, 354, 355, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(792, 'میرداماد', 478, 356, 357, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(793, 'ونک', 478, 358, 359, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(794, 'امیر ابراهیمی', 479, 362, 363, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(795, 'تهرانپارس', 479, 364, 365, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(796, 'حکیمیه', 479, 366, 367, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(797, 'خاک سفید', 479, 368, 369, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(798, 'خواجه عبدالله', 479, 370, 371, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(799, 'لویزان', 479, 372, 373, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(800, 'هروی', 479, 374, 375, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(801, 'هنگام', 479, 376, 377, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(802, 'اکباتان', 480, 380, 381, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(803, 'باغ فیض', 480, 382, 383, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(804, 'بلوار ابوذر', 480, 384, 385, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(805, 'پونک', 480, 386, 387, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(806, 'جنت آباد', 480, 388, 389, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(807, 'جنت آباد شمالی', 480, 390, 391, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(808, 'شهرزیبا', 480, 392, 393, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(809, 'شهران', 480, 394, 395, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(810, 'کن', 480, 396, 397, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(811, 'کوی فردوس', 480, 398, 399, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(812, 'امیر آباد', 481, 402, 403, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(813, 'انقلاب', 481, 404, 405, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(814, 'طالقانی', 481, 406, 407, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(815, 'فاطمی', 481, 408, 409, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(816, 'مطهری و عباس آباد', 481, 410, 411, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(817, 'هفت تیر', 481, 412, 413, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(818, 'ولیعصر', 481, 414, 415, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(819, 'یوسف آباد', 481, 416, 417, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(820, 'بهار', 482, 420, 421, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(821, 'مطهری و عباس آباد', 482, 422, 423, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(822, 'معلم', 482, 424, 425, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(823, 'نظام آباد', 482, 426, 427, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(824, 'فلکه اول تهرانپارس', 483, 430, 431, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(825, 'مجیدیه جنوبی', 483, 432, 433, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(826, 'نارمک', 483, 434, 435, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(827, 'آزادی', 484, 438, 439, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(828, 'سرآسیاب', 484, 440, 441, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(829, 'بریانک', 485, 444, 445, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(830, 'جیهون', 485, 446, 447, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(831, 'خوش', 485, 448, 449, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(832, 'قزوین', 485, 450, 451, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(833, 'جمهوری', 486, 454, 455, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(834, 'راه آهن', 486, 456, 457, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(835, 'قزوین', 486, 458, 459, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(836, 'منیریه و امیریه', 486, 460, 461, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(837, 'بازار', 487, 464, 465, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(838, 'بهارستان', 487, 466, 467, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(839, 'خانی آباد', 487, 468, 469, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(840, 'شوش', 487, 470, 471, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(841, 'پیروزی', 488, 474, 475, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(842, 'نیروی هوایی', 488, 476, 477, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(843, 'تهران نو', 488, 478, 479, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(844, 'دولاب', 489, 482, 483, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(845, 'سلیمانیه و چهارصد دستگاه', 489, 484, 485, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(846, 'فرح آباد و صد دستگاه', 489, 486, 487, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(847, 'افسریه', 490, 490, 491, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(848, 'شهرک ابوذر و سلیمانیه', 490, 492, 493, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(849, 'کیانشهر', 490, 494, 495, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(850, 'مشیریه', 490, 496, 497, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(851, 'هاشم آباد', 490, 498, 499, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(852, 'ترمینال جنوب', 491, 502, 503, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(853, 'جوادیه', 491, 504, 505, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(854, 'خزانه بخارایی', 491, 506, 507, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(855, 'علی آباد', 491, 508, 509, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(856, 'نازی اباد و یاخچی آباد', 491, 510, 511, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(857, 'امام زاده حسن', 492, 514, 515, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(858, 'خزانه فلاح', 492, 516, 517, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(859, 'شادآباد', 493, 520, 521, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(860, 'شهرک ولیعصر', 493, 522, 523, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(861, 'یافت آباد', 493, 524, 525, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(862, 'خانی آباد', 494, 528, 529, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(863, 'صالح آباد', 494, 530, 531, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(864, 'عبدل آباد', 494, 532, 533, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(865, 'نعمت آباد', 494, 534, 535, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(866, 'رهتابی', 494, 536, 537, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(867, 'جوانمرد قصاب', 495, 540, 541, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(868, 'دولت آباد', 495, 542, 543, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(869, 'شهرری', 495, 544, 545, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(870, 'تهرانسر', 496, 548, 549, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(871, 'وردآورد', 496, 550, 551, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(872, 'سپاه اسلام', 496, 552, 553, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(873, 'پیکان شهر', 497, 556, 557, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(874, 'دهکده المپیک', 497, 558, 559, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(875, 'شهرک ها', 497, 560, 561, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(876, 'ورزشگاه آزادی', 497, 562, 563, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(877, 'فشم', 498, 566, 567, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(878, 'منطقه 1', 473, 1261, 1262, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39'),
	(879, 'منطقه 2', 473, 1263, 1264, 1, 1, 0, 0, 0, NULL, '2020-01-15 15:51:39');
/*!40000 ALTER TABLE `region` ENABLE KEYS */;

-- Dumping structure for table 517_shop.role
CREATE TABLE IF NOT EXISTS `role` (
  `key` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `full_access` tinyint(1) NOT NULL DEFAULT 0,
  `crud` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.role: ~9 rows (approximately)
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` (`key`, `title`, `full_access`, `crud`, `created_at`, `updated_at`) VALUES
	('admin', 'ادمین', 1, 1, '2019-11-29 13:56:16', '2019-11-29 13:56:16'),
	('anbar_dar', 'انباردار', 0, 0, '2019-11-29 13:57:54', '2019-11-29 13:57:54'),
	('content_manager', 'مدیر محتوا', 0, 1, '2019-11-29 13:56:59', '2019-11-29 13:57:24'),
	('crm_admin', 'مدیر CRM', 0, 1, '2019-11-29 13:59:30', '2019-11-29 13:59:30'),
	('guest', 'مهمان', 0, 0, '2019-12-10 11:39:15', '2019-12-10 11:39:15'),
	('operator', 'اپراتور', 0, 0, '2019-11-29 13:56:30', '2019-11-29 13:56:30'),
	('product_charger', 'مسئول شارژ محصولات', 0, 0, '2019-11-29 13:58:22', '2019-11-29 13:58:22'),
	('programmer', 'تیم برنامه نویس', 1, 1, '2019-11-29 13:55:41', '2019-11-29 13:55:41'),
	('super_admin', 'سوپر ادمین', 1, 1, '2019-11-29 13:55:52', '2019-11-29 13:55:52');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;

-- Dumping structure for procedure 517_shop.sales_daily_report
DELIMITER //
CREATE PROCEDURE `sales_daily_report`()
    SQL SECURITY INVOKER
BEGIN
	DECLARE i int; 
	DECLARE data_exist int;
	
	
	CREATE TEMPORARY TABLE IF NOT EXISTS calendar(
		calendar_day DATE NOT NULL,
		index idx (calendar_day)	
	) ENGINE=MEMORY; 

	SET i = 29; 
	set data_exist = (select count(calendar_day) from calendar where calendar_day = CAST(NOW() AS DATE));

	IF(data_exist = 0) THEN
		TRUNCATE calendar;
		label: LOOP 
		IF(i < 0) THEN
			LEAVE label;
		END IF;
			INSERT INTO calendar VALUES(DATE_SUB(NOW(),INTERVAL i DAY));
			SET i = i - 1;
	   END LOOP;
   END IF;
   
	SELECT DATE_FORMAT(calendar_day,'%d')  AS label,  IFNULL(total_price, 0) AS total_price, IFNULL(total_count, 0) AS total_count
	FROM calendar
	LEFT JOIN (
	SELECT CAST(created_at AS DATE) AS order_created_at, SUM(total_price) AS total_price, COUNT(id) AS total_count
	FROM `order`
	WHERE CAST(created_at AS DATE) > CAST(DATE_SUB(NOW(), INTERVAL 31 DAY) AS DATE) and order_status = 1
	GROUP BY CAST(created_at AS DATE)) AS sub ON sub.order_created_at = calendar.calendar_day order BY calendar.calendar_day asc; 


END//
DELIMITER ;

-- Dumping structure for procedure 517_shop.setting
DELIMITER //
CREATE PROCEDURE `setting`()
BEGIN

SELECT d.key AS shop, d.name, d.meta_title, d.meta_description, d.introduce, d.copy_right , d.register, d.basket, d.`status`, d.user_dashboard, d.basket, d.maintenance_mode
INTO 
@shop, @title, @d.meta_title, @meta_description, @introduce, @copy_right ,@register, @basket, @active, @user_dashboard, @basket, @maintenance_mode
FROM domain AS d LIMIT 1;

SELECT CONCAT('[', GROUP_CONCAT(JSON_OBJECT('id', cc.id, 'title', cc.title, 'value', dcc.value)), ']') INTO @contact
FROM domain_links AS dcc
LEFT JOIN links AS cc ON cc.id = dcc.links_id WHERE cc.`type` = 'contact' LIMIT 1;

SELECT CONCAT('[', GROUP_CONCAT(JSON_OBJECT('id', cc.id, 'title', cc.title, 'value', dcc.value)), ']') INTO @social
FROM domain_links AS dcc
LEFT JOIN links AS cc ON cc.id = dcc.links_id WHERE cc.`type` = 'social' LIMIT 1;

SELECT CONCAT('[', GROUP_CONCAT(JSON_OBJECT('id', cc.id, 'title', cc.title, 'value', dcc.value)), ']') INTO @app
FROM domain_links AS dcc
LEFT JOIN links AS cc ON cc.id = dcc.links_id WHERE cc.`type` = 'app' LIMIT 1; 

SELECT CONCAT('[', GROUP_CONCAT(JSON_OBJECT('id', cc.id, 'title', cc.title, 'value', dcc.value)), ']') INTO @license
FROM domain_links AS dcc
LEFT JOIN links AS cc ON cc.id = dcc.links_id WHERE cc.`type` = 'license' LIMIT 1; 

SELECT @shop AS shop, @title AS title, @d.meta_title AS meta_title, @meta_description AS meta_description,
 @introduce AS introduce,@copy_right AS copy_right,
  @register AS register, @basket AS basket, @active AS active, @user_dashboard AS user_dashboard, @basket AS basket, @maintenance_mode AS maintenance_mode,
  @contact AS contact, @social AS social, @app AS app, @license AS license;

END//
DELIMITER ;

-- Dumping structure for procedure 517_shop.slider
DELIMITER //
CREATE PROCEDURE `slider`()
BEGIN 
DECLARE counter INT DEFAULT 0; 
DECLARE backend CHAR(50);

SET backend = (SELECT d.backend FROM domain AS d LIMIT 1);

SET counter = (
SELECT COUNT(id)
FROM gallery
WHERE STATUS = 1 AND is_slider = 1);

if counter > 0 THEN
SELECT ifNull(f.`file`, '') AS file, IFNULL(f.link, '') AS link, IFNULL(f.caption, '') AS caption, 
ifnull(CONCAT(backend, '/storage', '/', f.`directory`, '/', f.fileable_id,'/500/',f.`file`), '') AS address
FROM gallery AS g
LEFT JOIN FILE AS f ON f.fileable_id = g.id AND f.fileable_type = 'App\\Gallery'
WHERE STATUS = 1 AND is_slider = 1
ORDER BY f.`order` ASC; END if; END//
DELIMITER ;

-- Dumping structure for table 517_shop.tag
CREATE TABLE IF NOT EXISTS `tag` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.tag: ~18 rows (approximately)
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` (`id`, `name`) VALUES
	(23, '5 اینچ'),
	(24, '5.5 اینچ'),
	(25, '7 اینچ'),
	(26, '9 اینچ'),
	(27, '1 گیگ'),
	(28, '2 گیگ'),
	(29, '3 گیگ'),
	(30, '4 گیگ'),
	(31, '5 گیگ'),
	(32, '3 هسته'),
	(33, '4 هسته'),
	(34, '5 هسته'),
	(35, '6 هسته'),
	(36, '7هسته'),
	(37, 'فلز'),
	(38, 'تیتانیوم'),
	(39, 'تگ'),
	(40, 'تگ 2');
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;

-- Dumping structure for procedure 517_shop.test
DELIMITER //
CREATE PROCEDURE `test`()
BEGIN
SELECT pp.label AS parent, sub.items AS ot

FROM price_parameter AS pp
INNER JOIN (
SELECT pp_parent.value AS parent_value, GROUP_CONCAT(JSON_OBJECT( 'id', pp.value , 'title', pp.label)) AS items
FROM product_pins AS p
LEFT JOIN product_pins_price_parameter pppp ON p.id = pppp.product_pins_id
LEFT JOIN price_parameter pp ON pp.value = pppp.price_parameter_value
LEFT JOIN price_parameter AS pp_parent ON pp_parent._lft < pp._lft AND pp_parent._rgt > pp._rgt AND pp_parent.parent_id IS NULL
WHERE p.product_id = 1
GROUP BY  pp_parent.value
ORDER BY pp_parent.value
) AS sub ON sub.parent_value = pp.value
WHERE pp.`status` = 1 AND pp.parent_id IS NULL
ORDER BY pp._lft ASC;
END//
DELIMITER ;

-- Dumping structure for table 517_shop.ticket
CREATE TABLE IF NOT EXISTS `ticket` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `created_by` bigint(20) unsigned NOT NULL,
  `category_id` bigint(20) unsigned NOT NULL,
  `title` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  KEY `category_id` (`category_id`)
) ENGINE=MyISAM AUTO_INCREMENT=62 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.ticket: 0 rows
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;

-- Dumping structure for table 517_shop.ticket_category
CREATE TABLE IF NOT EXISTS `ticket_category` (
  `value` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `_lft` int(10) unsigned NOT NULL DEFAULT 0,
  `_rgt` int(10) unsigned NOT NULL DEFAULT 0,
  `parent_id` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`value`),
  KEY `_lft` (`_lft`),
  KEY `_rgt` (`_rgt`),
  KEY `parent_id` (`parent_id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.ticket_category: 0 rows
/*!40000 ALTER TABLE `ticket_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket_category` ENABLE KEYS */;

-- Dumping structure for table 517_shop.ticket_conversation
CREATE TABLE IF NOT EXISTS `ticket_conversation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ticket_id` bigint(20) unsigned NOT NULL,
  `created_by` bigint(20) unsigned NOT NULL,
  `content` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_ticket_conversation_users` (`created_by`),
  KEY `FK_ticket_conversation_ticket` (`ticket_id`)
) ENGINE=MyISAM AUTO_INCREMENT=132 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.ticket_conversation: 0 rows
/*!40000 ALTER TABLE `ticket_conversation` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket_conversation` ENABLE KEYS */;

-- Dumping structure for table 517_shop.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `mobile` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `role_key` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `verify_code` int(5) DEFAULT NULL,
  `verify_account` tinyint(1) NOT NULL DEFAULT 0,
  `varify_datetime` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `mobile` (`mobile`),
  KEY `role_key` (`role_key`),
  CONSTRAINT `FK_users_role` FOREIGN KEY (`role_key`) REFERENCES `role` (`key`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table 517_shop.users: ~0 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `mobile`, `role_key`, `name`, `status`, `password`, `remember_token`, `verify_code`, `verify_account`, `varify_datetime`, `created_at`, `updated_at`) VALUES
	(1, '09398624739', 'programmer', 'مهرداد معصومی', 1, '$2y$10$Ndcgp8jjzHUqfHeQjQxmweEhSJ6nc//1CC2SaA4y.oXaljDJYkvdq', '$2y$10$wAv8eRTWZEJip6QG/LC4IuRqjwMaXoFUIUSCBrRx62WZrSftsdihG', 83979, 1, NULL, '2020-01-14 14:06:33', '2020-03-26 15:49:12');
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

-- Dumping structure for trigger 517_shop.order_fractive_request_after_update
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `order_fractive_request_after_update` AFTER UPDATE ON `order_fractive_request` FOR EACH ROW BEGIN

END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger 517_shop.product_before_update_status
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `product_before_update_status` BEFORE UPDATE ON `product` FOR EACH ROW BEGIN
	if NEW.status = 1 AND (NEW.price = 0 || new.package_type_id IS NULL || new.weight = 0)
	then
		SIGNAL SQLSTATE  '45000' SET MESSAGE_TEXT = 'محصول نمیتواند فعال باشد.' ;
	END if;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger 517_shop.product_pins_after_update_countable
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `product_pins_after_update_countable` AFTER UPDATE ON `product_pins` FOR EACH ROW BEGIN
	DECLARE package_type INT;
	DECLARE counter INT;
	SET package_type = (SELECT product.package_type_id FROM product WHERE id = OLD.product_id);
	SET counter = (SELECT SUM(COUNT) FROM product_pins WHERE product_id = OLD.product_id);
	
	if package_type <> 0
	then
		UPDATE product SET count = counter WHERE id = OLD.product_id;
	END if;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- Dumping structure for trigger 517_shop.ticket_conversation_after_insert
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `ticket_conversation_after_insert` AFTER INSERT ON `ticket_conversation` FOR EACH ROW BEGIN
	UPDATE ticket SET ticket.status = 1, ticket.updated_at = NOW() WHERE id = NEW.ticket_id AND NEW.created_by <> ticket.created_by;
	UPDATE ticket SET ticket.status = 0, ticket.updated_at = NOW() WHERE id = NEW.ticket_id AND NEW.created_by = ticket.created_by;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
