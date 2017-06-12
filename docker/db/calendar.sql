# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.5-10.2.6-MariaDB)
# Database: calendar
# Generation Time: 2017-06-12 00:31:53 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table access_token
# ------------------------------------------------------------

DROP TABLE IF EXISTS `access_token`;

CREATE TABLE `access_token` (
  `token` varchar(255) NOT NULL,
  `created` datetime DEFAULT NULL,
  `expired` datetime DEFAULT NULL,
  `users_idx` int(11) NOT NULL,
  PRIMARY KEY (`token`),
  KEY `fk_access_token_users1_idx` (`users_idx`),
  CONSTRAINT `fk_access_token_users1` FOREIGN KEY (`users_idx`) REFERENCES `users` (`idx`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `access_token` WRITE;
/*!40000 ALTER TABLE `access_token` DISABLE KEYS */;

INSERT INTO `access_token` (`token`, `created`, `expired`, `users_idx`)
VALUES
	('cda62a7405f08a203d1b415155b62fa297d2f3b1ce4fc19dddd15fcff8093ccb','2017-06-12 00:13:51','2017-07-12 00:43:51',1);

/*!40000 ALTER TABLE `access_token` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table groups
# ------------------------------------------------------------

DROP TABLE IF EXISTS `groups`;

CREATE TABLE `groups` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `users_idx` int(11) NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `modified` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`idx`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `fk_groups_users1_idx` (`users_idx`),
  CONSTRAINT `fk_groups_users1` FOREIGN KEY (`users_idx`) REFERENCES `users` (`idx`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;

INSERT INTO `groups` (`idx`, `name`, `users_idx`, `created`, `modified`)
VALUES
	(5,'group2',1,'2017-06-12 00:47:16','2017-06-19 00:47:16'),
	(6,'group3',1,'2017-06-12 00:47:20','2017-06-12 00:47:20'),
	(8,'ttteeesssttt',1,'2017-06-12 05:27:59','2017-06-12 05:27:59');

/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table groups_has_users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `groups_has_users`;

CREATE TABLE `groups_has_users` (
  `groups_idx` int(11) NOT NULL,
  `users_idx` int(11) NOT NULL,
  `selected` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`groups_idx`,`users_idx`),
  KEY `fk_groups_has_users_users1_idx` (`users_idx`),
  CONSTRAINT `fk_groups_has_users_groups1` FOREIGN KEY (`groups_idx`) REFERENCES `groups` (`idx`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_groups_has_users_users1` FOREIGN KEY (`users_idx`) REFERENCES `users` (`idx`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `groups_has_users` WRITE;
/*!40000 ALTER TABLE `groups_has_users` DISABLE KEYS */;

INSERT INTO `groups_has_users` (`groups_idx`, `users_idx`, `selected`)
VALUES
	(5,1,0),
	(6,1,1),
	(8,1,1);

/*!40000 ALTER TABLE `groups_has_users` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table schedules
# ------------------------------------------------------------

DROP TABLE IF EXISTS `schedules`;

CREATE TABLE `schedules` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `type` char(2) DEFAULT NULL,
  `users_idx` int(11) NOT NULL,
  `groups_idx` int(11) DEFAULT NULL,
  PRIMARY KEY (`idx`),
  KEY `fk_schedules_users1_idx` (`users_idx`),
  KEY `fk_schedules_groups1_idx` (`groups_idx`),
  CONSTRAINT `fk_schedules_groups1` FOREIGN KEY (`groups_idx`) REFERENCES `groups` (`idx`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_schedules_users1` FOREIGN KEY (`users_idx`) REFERENCES `users` (`idx`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `schedules` WRITE;
/*!40000 ALTER TABLE `schedules` DISABLE KEYS */;

INSERT INTO `schedules` (`idx`, `title`, `start_date`, `end_date`, `type`, `users_idx`, `groups_idx`)
VALUES
	(1,'ttteeesssttt','2017-06-12 05:15:45','2017-06-12 05:15:45',NULL,1,NULL),
	(2,'schedule 2','2017-06-12 00:00:00','2017-06-12 00:00:00',NULL,1,5),
	(4,'owww','2017-06-12 04:09:28','2017-06-12 04:09:31',NULL,1,6),
	(5,'schedule 5','2017-06-08 00:00:00','2017-06-09 00:00:00',NULL,1,NULL);

/*!40000 ALTER TABLE `schedules` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `birthday` datetime DEFAULT NULL,
  `created` datetime DEFAULT current_timestamp(),
  `modified` timestamp NULL DEFAULT current_timestamp() COMMENT '	',
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`idx`, `email`, `password`, `name`, `birthday`, `created`, `modified`)
VALUES
	(1,'admin@mydomain.com','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4','admin','1989-02-20 00:00:00','2017-06-12 00:11:59','2017-06-12 00:12:02');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
