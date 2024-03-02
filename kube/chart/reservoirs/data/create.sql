-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               11.1.3-MariaDB - Source distribution
-- Server OS:                    Linux
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table reservoirs.reservoirs
CREATE TABLE IF NOT EXISTS `reservoirs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text DEFAULT NULL,
  `capacity` int(11) DEFAULT NULL,
  `utilisation` float DEFAULT NULL,
  `image` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table reservoir_track.reservoirs: ~17 rows (approximately)
INSERT INTO `reservoirs` (`id`, `name`, `capacity`, `utilisation`, `image`) VALUES
	(1, 'Pok Fu Lam Reservoir', 168000, 0.721, 'https://i.ytimg.com/vi/KbO-S3BsrYM/maxresdefault.jpg'),
	(2, 'Aberdeen Upper Reservoir', 773000, 0.7439, 'http://www.wsd.gov.hk/filemanager/en/content_592/aberdeen_upper_lower.jpg'),
	(3, 'Tai Tam Byewash Reservoir', 80000, 0.9125, 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Tai_Tam_Byewash_Reservoir_Subsidiary_Dam_02.JPG'),
	(4, 'Tai Tam Intermediate Reservoir', 686000, 0.9985, 'http://www.wsd.gov.hk/filemanager/en/content_592/tai_tam_intermediate.jpg'),
	(5, 'Tai Tam Tuk Reservoir', 5690000, 0.8813, 'http://www.hongkongextras.com/resources/Trail+-+Tai+Tam15.jpg'),
	(6, 'Tai Tam Upper Reservoir', 1490000, 0.8081, 'http://industrialhistoryhk.org/wp-content/uploads/2016/08/Tai-Tam-Upper-Reservoir-Nick-Kitton-image.jpg'),
	(7, 'Shek Pik Reservoir', 24410000, 0.7861, 'https://upload.wikimedia.org/wikipedia/commons/7/73/Shek_Pik_Reservoir_3.jpg'),
	(8, 'Kowloon Byewash Reservoir', 800000, 0.415, 'http://www.wsd.gov.hk/filemanager/en/content_592/kowloon_group.jpg'),
	(9, 'Shek Lei Pui Reservoir', 374000, 0.4305, 'http://www.walkonhill.com/images/route_40_4_1.jpg'),
	(10, 'Kowloon Reservoir', 1313000, 0.8346, 'http://www.dulichao.com/images/plg_imagesized/389-thien_nhien_hongkong_02.jpg'),
	(11, 'Lower Shing Mun Reservoir', 1291000, 0.2296, 'http://www.wsd.gov.hk/filemanager/en/content_592/shing_mun.jpg'),
	(12, 'Kowloon Reception Reservoir', 121000, 0.9091, 'https://upload.wikimedia.org/wikipedia/commons/a/ad/HK_KowloonReceptionReservoir.JPG'),
	(13, 'Shing Mun Reservoir', 12665000, 0.8207, 'http://www.wsd.gov.hk/filemanager/en/content_592/lower_shing_mun.jpg'),
	(14, 'Tai Lam Chung Reservoir', 20404000, 0.916, 'http://industrialhistoryhk.org/wp-content/uploads/2016/03/Tai-Lam-Chung-Reservoir-snipped-image-Courtesy-WSD.jpg'),
	(15, 'Plover Cove Reservoir', 169235000, 0.8925, 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Plover_Cove_Reservoir.JPG'),
	(16, 'High Island Reservoir', 224572000, 0.6557, 'http://www.skywalker.autozine.org/Place/144_Tuk_Ngu_Shan/29.jpg'),
	(17, 'Aberdeen Lower Reservoir', 486000, 0.9486, 'http://www.taiwilliams.com/blog/wp-content/uploads/2015/02/tai-spike-january23-01.jpg');

-- Dumping structure for table reservoirs.reservoirs_history
CREATE TABLE IF NOT EXISTS `reservoirs_history` (
  `history_id` int(11) NOT NULL AUTO_INCREMENT,
  `reservoir_id` int(11) NOT NULL,
  `time` timestamp NOT NULL,
  `capacity` int(11) DEFAULT NULL,
  `utilisation` float DEFAULT NULL,
  PRIMARY KEY (`history_id`),
  KEY `reservoir_id` (`reservoir_id`),
  CONSTRAINT `reservoir_id` FOREIGN KEY (`reservoir_id`) REFERENCES `reservoirs` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
