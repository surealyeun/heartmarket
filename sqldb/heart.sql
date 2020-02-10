-- MySQL dump 10.16  Distrib 10.1.43-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: 
-- ------------------------------------------------------
-- Server version	10.1.43-MariaDB-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `heartmarket`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `heartmarket` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `heartmarket`;

--
-- Table structure for table `area`
--

DROP TABLE IF EXISTS `area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `area` (
  `area_no` int(11) NOT NULL AUTO_INCREMENT,
  `user_no` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`area_no`),
  KEY `Area.user_no_idx` (`user_no`),
  CONSTRAINT `Area.user_no_FK` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area`
--

LOCK TABLES `area` WRITE;
/*!40000 ALTER TABLE `area` DISABLE KEYS */;
INSERT INTO `area` VALUES (1,1,'역삼2동'),(2,2,'역삼1동'),(3,1,'삼성동'),(4,3,'역삼동'),(5,5,'test'),(6,6,'상동');
/*!40000 ALTER TABLE `area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart` (
  `cart_no` int(11) NOT NULL AUTO_INCREMENT,
  `user_no` int(11) DEFAULT NULL,
  `trade_no` int(11) DEFAULT NULL,
  PRIMARY KEY (`cart_no`),
  KEY `cart.user_no_FK_idx` (`user_no`),
  KEY `cart.trade_no_FK_idx` (`trade_no`),
  CONSTRAINT `cart.trade_no_FK` FOREIGN KEY (`trade_no`) REFERENCES `trade` (`trade_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `cart.user_no_FK` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manner`
--

DROP TABLE IF EXISTS `manner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `manner` (
  `manner_no` int(11) NOT NULL AUTO_INCREMENT,
  `user_no` int(11) DEFAULT NULL,
  `trade_no` int(11) DEFAULT NULL,
  `manner_point` int(11) DEFAULT NULL,
  `user_type` varchar(45) DEFAULT NULL,
  `manner_type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`manner_no`),
  KEY `Manner.user_no_FK_idx` (`user_no`),
  KEY `Manner.trade_no_FK_idx` (`trade_no`),
  CONSTRAINT `Manner.trade_no_FK` FOREIGN KEY (`trade_no`) REFERENCES `trade` (`trade_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `manner.user_no_FK` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manner`
--

LOCK TABLES `manner` WRITE;
/*!40000 ALTER TABLE `manner` DISABLE KEYS */;
/*!40000 ALTER TABLE `manner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trade`
--

DROP TABLE IF EXISTS `trade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trade` (
  `trade_no` int(11) NOT NULL AUTO_INCREMENT,
  `trade_category` varchar(45) DEFAULT NULL,
  `trade_title` varchar(255) DEFAULT NULL,
  `buyer_no` int(11) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `product_info` varchar(255) DEFAULT NULL,
  `product_price` varchar(255) DEFAULT NULL,
  `trade_date` datetime DEFAULT NULL,
  `trade_area` varchar(255) DEFAULT NULL,
  `user_no` int(11) DEFAULT NULL,
  PRIMARY KEY (`trade_no`),
  KEY `user_no_idx` (`buyer_no`,`user_no`),
  KEY `trade.user_no_FK_idx` (`user_no`,`buyer_no`),
  CONSTRAINT `trade.buyer_no_FK` FOREIGN KEY (`buyer_no`) REFERENCES `user` (`user_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `trade.user_no_FK` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trade`
--

LOCK TABLES `trade` WRITE;
/*!40000 ALTER TABLE `trade` DISABLE KEYS */;
INSERT INTO `trade` VALUES (1,'가전','에어팟 2세대 팝니다.',2,'에어팟2','에어팟 프로 구매로 에어팟2 팝니다.','12000원','2020-02-04 11:29:12','역삼2동',1),(2,'가전','갤럭시 S10 팝니다.',NULL,'갤럭시 S10','역삼역 2번 출구에서 팝니다.','100000원','2020-02-04 13:58:22','역삼1동',2),(3,'가전','갤럭시 S10 팝니다.',NULL,'갤럭시 S10','역삼역 2번 출구에서 팝니다.','100000원','2020-02-04 14:00:05','역삼1동',2),(4,'서적','자바 책 팝니다',NULL,'JAVA프로그래밍','자바 표준  프로그래밍 서적','20000','2020-02-06 03:19:03','역삼1동',1),(5,'서적','자바 책 팝니다',NULL,'JAVA프로그래밍','자바 표준  프로그래밍 서적','20000','2020-02-06 03:19:10','역삼1동',1),(6,'서적','자바 책 팝니다',NULL,'JAVA프로그래밍','자바 표준  프로그래밍 서적','20000','2020-02-06 03:19:10','역삼1동',1),(7,'서적','자바 책 팝니다',NULL,'JAVA프로그래밍','자바 표준  프로그래밍 서적','20000','2020-02-06 03:19:11','역삼1동',1),(8,'서적','자바 책 팝니다',NULL,'JAVA프로그래밍','자바 표준  프로그래밍 서적','20000','2020-02-06 03:19:11','역삼1동',1),(9,'서적','자바 책 팝니다',NULL,'JAVA프로그래밍','자바 표준  프로그래밍 서적','20000','2020-02-06 03:19:11','역삼1동',1),(10,'서적','자바 책 팝니다',NULL,'JAVA프로그래밍','자바 표준  프로그래밍 서적','20000','2020-02-06 03:19:11','역삼1동',1),(11,'서적','자바 책 팝니다',NULL,'JAVA프로그래밍','자바 표준  프로그래밍 서적','20000','2020-02-06 03:19:12','역삼1동',1),(12,'서적','자바 책 팝니다',NULL,'JAVA프로그래밍','자바 표준  프로그래밍 서적','20000','2020-02-06 03:19:12','역삼1동',1),(13,'서적','자바 책 팝니다',NULL,'JAVA프로그래밍','자바 표준  프로그래밍 서적','20000','2020-02-06 03:19:12','역삼1동',1),(14,'서적','자바 책 팝니다',NULL,'JAVA프로그래밍','자바 표준  프로그래밍 서적','20000','2020-02-06 03:19:12','역삼1동',1);
/*!40000 ALTER TABLE `trade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trade_img`
--

DROP TABLE IF EXISTS `trade_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trade_img` (
  `img_no` int(11) NOT NULL AUTO_INCREMENT,
  `trade_no` int(11) DEFAULT NULL,
  `org_img` varchar(260) DEFAULT NULL,
  `stored_img` varchar(260) DEFAULT NULL,
  PRIMARY KEY (`img_no`),
  KEY `Trade_img.trade_no_FK_idx` (`trade_no`),
  CONSTRAINT `Trade_img.trade_no_FK` FOREIGN KEY (`trade_no`) REFERENCES `trade` (`trade_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trade_img`
--

LOCK TABLES `trade_img` WRITE;
/*!40000 ALTER TABLE `trade_img` DISABLE KEYS */;
INSERT INTO `trade_img` VALUES (1,3,'not',NULL),(6,NULL,'\\img\\2020\\02\\06\\6ccc1625-f0d9-467b-9c9d-de1eccec635b_wellshicogi.jpg','\\img\\2020\\02\\06\\s\\s_6ccc1625-f0d9-467b-9c9d-de1eccec635b_wellshicogi.jpg'),(7,NULL,'\\img\\2020\\02\\06\\a09da19a-f54b-4196-8d53-74bda47c49ee_검색 고급설정 - RSS 추가.png','\\img\\2020\\02\\06\\s\\s_a09da19a-f54b-4196-8d53-74bda47c49ee_검색 고급설정 - RSS 추가.png'),(8,NULL,'\\img\\2020\\02\\06\\454cfeae-62b1-4162-9d0c-9dc588a081dc_wellshicogi.jpg','\\img\\2020\\02\\06\\s\\s_454cfeae-62b1-4162-9d0c-9dc588a081dc_wellshicogi.jpg'),(9,NULL,'\\img\\2020\\02\\07\\911f5ae5-85e0-468d-830b-e45a45a956c2_huskey.jpg','\\img\\2020\\02\\07\\s\\s_911f5ae5-85e0-468d-830b-e45a45a956c2_huskey.jpg'),(10,NULL,'\\img\\2020\\02\\07\\f3d1284c-17dc-4d76-acb3-23a5651f6ad5_NorwayCat.jpg','\\img\\2020\\02\\07\\s\\s_f3d1284c-17dc-4d76-acb3-23a5651f6ad5_NorwayCat.jpg'),(11,NULL,'\\img\\2020\\02\\07\\df4cdd8c-2525-4b00-afb0-6ee99aeeafed_wellshicogi.jpg','\\img\\2020\\02\\07\\s\\s_df4cdd8c-2525-4b00-afb0-6ee99aeeafed_wellshicogi.jpg');
/*!40000 ALTER TABLE `trade_img` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_no` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_img` varchar(255) DEFAULT NULL,
  `nickname` varchar(50) DEFAULT NULL,
  `user_permission` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`user_no`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'test@test.com','test',NULL,NULL,'admin'),(2,'asdf@asdf.com','test',NULL,NULL,NULL),(3,'haha@test.com','$2a$10$y.UfKLV.y32FoWUCtTxi9.ek.Zhq/LWok1Xr4LHzSs8D4onjppI6u','\\images\\none.png','하하','ROLE_USER'),(4,'nana@test.com','$2a$10$DZCabKmphD30Do//VtWKaOBYLsl2I5j7k9/Fs5Vp3t2DLeuDTtYO2','\\img\\2020\\02\\06\\872ce9d2-8801-46c2-a0be-fe6540042e2b_wellshicogi.jpg','nana','ROLE_USER'),(5,'join@test.com','$2a$10$DP9eBDC0TjhZgcak72moQ..3p13v2I9xB86QSI9pd8a2RUCFVuS..','/images/none.png','test','ROLE_USER'),(6,'ssongda9412@naver.com','$2a$10$dXlkeZ2H8xHTunTzZktk1edism.MRxdNB8Mkn70t5xyAZyImU5OoG','/images/none.png','다니다니','ROLE_USER');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-07  1:05:54
