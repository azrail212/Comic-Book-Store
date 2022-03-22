/*
SQLyog Community v13.1.9 (64 bit)
MySQL - 10.4.22-MariaDB : Database - comicbookstore
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`comicbookstore` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;

USE `comicbookstore`;

/*Table structure for table `comics` */

DROP TABLE IF EXISTS `comics`;

CREATE TABLE `comics` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(2048) COLLATE utf8_bin NOT NULL,
  `description` varchar(2048) COLLATE utf8_bin DEFAULT NULL,
  `genre` varchar(128) COLLATE utf8_bin DEFAULT NULL,
  `price` int(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `comics` */

insert  into `comics`(`id`,`name`,`description`,`genre`,`price`) values 
(2,'harry potter 2',NULL,'fantasy',NULL),
(3,'updatedname','doIwork','fantasy',NULL),
(5,'harry potter 2',NULL,'fantasy',NULL),
(6,'harry potter 2',NULL,'fantasy',NULL),
(7,'doesitwork','doesitrly',NULL,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
