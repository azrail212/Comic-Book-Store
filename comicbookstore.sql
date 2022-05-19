/*
SQLyog Community v13.1.9 (64 bit)
MySQL - 8.0.27 : Database - comicbookstore
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`comicbookstore` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `comicbookstore`;

/*Table structure for table `categories` */

DROP TABLE IF EXISTS `categories`;

CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(2048) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `description` varchar(2048) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `agegroup` varchar(2048) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

/*Data for the table `categories` */

insert  into `categories`(`id`,`name`,`description`,`agegroup`) values 
(15,'1111','11111','9-12'),
(16,'new','new','9-12'),
(17,'aaaaaaa111','12','9-12'),
(18,'nova kategorija','nnnnnn','14+'),
(19,'aaaaa','aaaaaaaaaa','12+');

/*Table structure for table `characters` */

DROP TABLE IF EXISTS `characters`;

CREATE TABLE `characters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(2048) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `description` varchar(2048) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `superpower` varchar(2048) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

/*Data for the table `characters` */

/*Table structure for table `comics` */

DROP TABLE IF EXISTS `comics`;

CREATE TABLE `comics` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `comic_name` varchar(2048) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `comic_description` varchar(2048) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `comic_category_id` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `color` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comics_categories` (`comic_category_id`),
  CONSTRAINT `fk_comics_categories` FOREIGN KEY (`comic_category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

/*Data for the table `comics` */

insert  into `comics`(`id`,`comic_name`,`comic_description`,`comic_category_id`,`price`,`created`,`color`) values 
(47,'12','12',17,12,'2022-05-18 01:23:49','blue'),
(48,'test','1333',17,144,'2022-05-18 01:36:15','white'),
(49,'12222','122',15,13,'2022-05-18 01:37:31','white'),
(50,'aaaaaaaa','1222',15,1222,'2022-05-18 01:38:50','red'),
(51,'aaaaaaaaaaaaaaa','adddd',17,133,'2022-05-18 09:47:26','blue'),
(52,'kkk','kkkkk',15,12,'2022-05-19 13:19:52','yellow'),
(53,'kkk','ppppppppp',16,12,'2022-05-19 13:25:19','yellow');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
