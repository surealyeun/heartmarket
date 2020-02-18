-- MySQL dump 10.16  Distrib 10.1.44-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: heartmarket
-- ------------------------------------------------------
-- Server version	10.1.44-MariaDB-0ubuntu0.18.04.1

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
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area`
--

LOCK TABLES `area` WRITE;
/*!40000 ALTER TABLE `area` DISABLE KEYS */;
INSERT INTO `area` VALUES (1,1,'청담동'),(2,2,'청담동'),(3,3,'청담동'),(4,5,'청담동'),(5,6,'삼성1동'),(6,7,'삼성2동'),(7,9,'역삼1동'),(8,10,'역삼2동'),(9,11,'역삼1동'),(10,12,'개포1동'),(11,13,'역삼1동'),(12,14,'대치1동'),(13,15,'역삼1동'),(14,16,'역삼1동'),(15,17,'역삼2동'),(16,18,'청담동'),(17,19,'역삼2동'),(18,20,'역삼2동'),(19,21,'신사동'),(20,22,'압구정동'),(21,23,'논현1동'),(22,24,'논현2동'),(23,25,'삼성1동'),(24,26,'삼성2동'),(25,27,'역삼2동'),(26,28,'도곡1동'),(27,29,'도곡2동'),(28,30,'대치1동'),(29,31,'대치2동'),(30,32,'대치4동'),(31,33,'개포1동'),(32,34,'개포2동'),(33,35,'개포4동'),(34,36,'일원본동'),(35,37,'일원1동'),(36,38,'일원2동'),(37,39,'수서동'),(38,40,'세곡동'),(40,42,'역삼2동');
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
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (8,2,10),(65,3,30),(68,2,33),(72,3,26),(74,2,30),(75,2,22);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mail`
--

DROP TABLE IF EXISTS `mail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mail` (
  `mail_no` int(11) NOT NULL AUTO_INCREMENT,
  `sender_no` int(11) NOT NULL,
  `receiver_no` int(11) NOT NULL,
  `title` varchar(500) COLLATE utf8_bin NOT NULL,
  `content` varchar(4000) COLLATE utf8_bin NOT NULL,
  `read_date` datetime DEFAULT NULL,
  `send_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `send_del` int(11) DEFAULT '0',
  `read_del` int(11) DEFAULT '0',
  `trade_no` int(11) DEFAULT NULL,
  PRIMARY KEY (`mail_no`),
  KEY `sender_no_FK_idx` (`sender_no`),
  KEY `receiver_no_FK_idx` (`receiver_no`),
  KEY `mail_trade_no_FK_idx` (`trade_no`),
  CONSTRAINT `mail_trade_no_FK` FOREIGN KEY (`trade_no`) REFERENCES `trade` (`trade_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `receiver_no_FK` FOREIGN KEY (`receiver_no`) REFERENCES `user` (`user_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `sender_no_FK` FOREIGN KEY (`sender_no`) REFERENCES `user` (`user_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mail`
--

LOCK TABLES `mail` WRITE;
/*!40000 ALTER TABLE `mail` DISABLE KEYS */;
INSERT INTO `mail` VALUES (1,1,2,'테스트','쪽지 보낸다','2020-02-16 01:00:40','2020-02-16 00:33:53',1,0,2),(2,1,2,'테스트2','보낸다','2020-02-17 13:08:21','2020-02-16 01:03:34',0,0,2),(3,1,2,'제목입니다.','테스트333','2020-02-17 13:07:22','2020-02-17 10:39:18',0,0,2),(4,3,2,'asdas','ㄴㅁㅇㅁㄴㅇㅁㄴㅇ','2020-02-17 12:31:55','2020-02-17 01:41:40',1,1,26),(5,3,2,'asdas','ㄴㅁㅇㅁㄴㅇㅁㄴㅇ','2020-02-17 12:32:58','2020-02-17 01:41:41',0,0,26),(6,3,2,'asdas','ㅁㄴㅇㅁㄴㅇ','2020-02-17 12:32:39','2020-02-17 01:43:47',0,0,26),(7,3,2,'ㅁㄴㅇㅁㄴㅇ','ㅁㄴㅇㅁㄴㅇ','2020-02-17 12:32:45','2020-02-17 01:43:54',0,1,26),(8,2,3,'eksleksl','dkssud\neksle','2020-02-17 08:32:23','2020-02-17 01:45:02',0,0,32),(9,2,3,'츄러스 사고 싶어요','DC는 안될까요????','2020-02-17 08:30:30','2020-02-17 01:45:39',0,0,23),(10,2,3,'로고 제작 문의','로고 제작 문의 드려요 사고 싶습니다!!!','2020-02-17 08:30:11','2020-02-17 01:46:03',1,0,17),(11,3,2,'1','dasad','2020-02-17 08:36:54','2020-02-17 08:05:42',0,1,26),(12,3,2,'asdd','e','2020-02-17 12:28:59','2020-02-17 08:05:48',1,1,26),(13,3,2,'qweqwe','asdasd','2020-02-17 12:28:53','2020-02-17 08:05:54',0,1,26),(14,3,18,'asdasd','wqe1123rwefsdcfzczxczxn cbvnvzsfvgADFASDvfsfbhvxcvxbzcnfxcghszfSdgzdfgdfzg',NULL,'2020-02-17 08:06:15',0,0,30),(15,3,2,'안녕하세요 거래 원합니다','안녕하세요 거래 원합니다안녕하세요 거래 원합니다안녕하세요 거래 원합니다안녕하세요 거래 원합니다안녕하세요 거래 원합니다안녕하세요 거래 원합니다안녕하세요 거래 원합니다안녕하세요 거래 원합니다안녕하세요 거래 원합니다안녕하세요 거래 원합니다안녕하세요 거래 원합니다안녕하세요 거래 원합니다안녕하세요 거래 원합니다안녕하세요 거래 원합니다안녕하세요 거래 원합니다안녕하세요 거래 원합니다안녕하세요 거래 원합니다\n안녕하세요 거래 원합니다\n안녕하세요 거래 원합니다안녕하세요 거래 원합니다안녕하세요 거래 원합니다안녕하세요 거래 원합니다안녕하세요 거래 원합니다','2020-02-17 08:36:23','2020-02-17 08:07:42',1,0,26),(16,2,3,'1','11','2020-02-17 13:16:25','2020-02-17 13:09:17',1,0,32),(17,2,3,'2','22','2020-02-17 13:11:59','2020-02-17 13:09:27',0,0,32),(18,2,3,'3','33','2020-02-17 13:10:10','2020-02-17 13:09:36',0,0,24),(19,2,3,'4','44','2020-02-17 13:10:04','2020-02-17 13:09:44',0,0,17),(20,3,2,'asd','asdasd','2020-02-17 14:49:20','2020-02-17 13:16:43',1,1,26),(21,2,3,'asdas','asdasdasd','2020-02-17 15:03:17','2020-02-17 14:51:37',0,0,26),(22,2,3,'asdasda','asdasda','2020-02-17 15:03:17','2020-02-17 14:51:42',0,0,26),(23,2,3,'12123123','sdasdasdasd','2020-02-17 15:03:11','2020-02-17 14:51:47',0,0,26),(24,2,3,'qweqweqwe','asdasdasdasd','2020-02-17 14:52:19','2020-02-17 14:51:53',0,0,26),(25,2,3,'gsgqaeqwda','dasdasda','2020-02-17 14:52:13','2020-02-17 14:51:58',0,0,26),(26,3,2,'s','asdasd','2020-02-17 15:07:53','2020-02-17 15:03:55',0,1,26),(27,3,2,'aas','asdasdsa','2020-02-17 15:07:50','2020-02-17 15:04:01',0,0,26),(28,3,2,'sdfsdf','asdasdas','2020-02-17 15:04:53','2020-02-17 15:04:06',0,0,26),(29,3,2,'asadsa','asdasdsadsa','2020-02-17 15:04:41','2020-02-17 15:04:11',0,0,26),(30,3,2,'sfsdfd','asdasdasd','2020-02-17 15:04:41','2020-02-17 15:04:16',0,0,26),(31,3,2,'qweqweqw','qweqeqweqwe','2020-02-17 15:12:50','2020-02-17 15:08:17',0,0,26),(32,3,2,'qweqweqwe','qweqwwasdasdasd','2020-02-17 15:12:20','2020-02-17 15:08:23',0,0,26),(33,3,2,'s','s','2020-02-17 15:11:19','2020-02-17 15:08:27',0,0,26),(34,3,2,'d','d','2020-02-17 15:10:54','2020-02-17 15:08:31',0,0,26),(35,3,2,'f','f','2020-02-17 15:09:19','2020-02-17 15:08:36',1,0,26),(36,3,18,'1','1',NULL,'2020-02-17 15:14:04',0,0,30),(37,3,18,'2','2',NULL,'2020-02-17 15:14:09',0,0,30),(38,3,18,'3','4',NULL,'2020-02-17 15:14:14',0,0,30),(39,3,18,'5','5',NULL,'2020-02-17 15:14:19',0,0,30),(40,2,3,'1','1','2020-02-17 15:24:02','2020-02-17 15:15:12',0,0,4),(41,2,3,'2','2','2020-02-17 15:21:20','2020-02-17 15:15:15',0,0,4),(42,2,3,'3','3','2020-02-17 15:21:09','2020-02-17 15:15:21',0,0,4),(43,2,3,'4','4','2020-02-17 15:18:03','2020-02-17 15:15:25',0,0,4),(44,2,3,'5','5','2020-02-17 15:17:17','2020-02-17 15:15:30',0,0,4),(45,2,3,'6','6','2020-02-17 15:16:07','2020-02-17 15:15:35',0,0,4),(46,3,2,'s','asdddddddddddddddd','2020-02-17 15:28:17','2020-02-17 15:24:39',1,1,26),(47,3,2,'as','asd','2020-02-17 15:28:17','2020-02-17 15:24:44',1,0,26),(48,3,2,'d','asd','2020-02-17 15:28:17','2020-02-17 15:24:48',1,1,26),(49,3,2,'sd','asd','2020-02-18 00:15:42','2020-02-17 15:24:52',1,0,26),(50,2,3,'1','1',NULL,'2020-02-18 00:16:14',0,0,26),(51,2,3,'2','2','2020-02-18 04:42:19','2020-02-18 00:16:19',0,1,26),(52,2,3,'3','3','2020-02-18 02:30:29','2020-02-18 00:16:23',0,0,26),(53,2,3,'4','4','2020-02-18 04:42:11','2020-02-18 00:16:26',0,1,26),(54,2,3,'5','5','2020-02-18 02:29:56','2020-02-18 00:16:30',0,0,26),(55,2,3,'6','6','2020-02-18 02:29:40','2020-02-18 00:16:34',0,0,26),(56,2,3,'7','7','2020-02-18 00:17:50','2020-02-18 00:16:39',0,1,26),(57,2,3,'8','8','2020-02-18 00:17:50','2020-02-18 00:16:44',0,1,26),(58,3,2,'안녕 수연아','너는 잘되니? 우리 앞으로 연락할일 있으면 두근 마켁 쪽지로 하자','2020-02-18 04:58:06','2020-02-18 04:57:47',0,0,26),(59,3,2,'안녕','하나 더 보내','2020-02-18 04:58:17','2020-02-18 04:58:02',0,0,26),(60,3,2,'우리','쉬는 시간이야 쉬자\n',NULL,'2020-02-18 04:58:47',0,0,26),(61,3,2,'무시','무시해되된다능',NULL,'2020-02-18 04:58:59',0,0,26),(62,3,2,'음오아예','너에게 빠져버렸어',NULL,'2020-02-18 04:59:10',1,0,26),(63,3,2,'정말 취향저격','ㅁㄴㅇㅁㄴㅇ',NULL,'2020-02-18 04:59:23',1,0,26),(64,3,2,'1','1',NULL,'2020-02-18 05:00:26',0,0,26),(65,3,2,'2','2',NULL,'2020-02-18 05:00:29',0,0,26),(66,3,2,'3','3',NULL,'2020-02-18 05:00:33',0,0,26),(67,3,2,'4','4',NULL,'2020-02-18 05:00:37',0,0,26),(68,3,2,'5','5',NULL,'2020-02-18 05:00:41',0,0,26),(69,3,2,'6','6',NULL,'2020-02-18 05:00:50',0,0,26),(70,3,2,'7','7',NULL,'2020-02-18 05:00:54',0,0,26),(71,3,2,'8','8',NULL,'2020-02-18 05:00:59',0,0,26),(72,3,2,'ㅁㄴㅇㄴㅇ','ㅁㄴㅇㅁㄴㅇ',NULL,'2020-02-18 14:07:17',0,0,26),(73,3,2,'리눈스 하나도 모르는 민우오빠','저도 몰라여',NULL,'2020-02-18 05:07:49',0,0,26),(74,3,2,'111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111','ㅁㅇㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴ',NULL,'2020-02-18 05:09:21',1,0,26),(75,3,2,'ㅁㄴㅇㅇ','ㅁㄴㅇㅁㄴㅇ',NULL,'2020-02-18 14:28:13',0,0,26),(76,3,2,'ㅁㄴㅇㅇ','ㅁㄴㅇㅁㄴㅇ',NULL,'2020-02-18 14:28:14',0,0,26);
/*!40000 ALTER TABLE `mail` ENABLE KEYS */;
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
  `plus_gauge` float(5,2) DEFAULT '0.00',
  `normal_gauge` float(5,2) DEFAULT '0.00',
  `minus_gauge` float(5,2) DEFAULT '0.00',
  `heart_gauge` float(5,2) DEFAULT '50.00',
  PRIMARY KEY (`manner_no`),
  UNIQUE KEY `user_no_UNIQUE` (`user_no`),
  KEY `Manner.user_no_FK_idx` (`user_no`),
  CONSTRAINT `manner.user_no_FK` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manner`
--

LOCK TABLES `manner` WRITE;
/*!40000 ALTER TABLE `manner` DISABLE KEYS */;
INSERT INTO `manner` VALUES (1,1,19.00,0.00,0.00,80.23),(2,2,0.00,0.00,0.00,50.00),(3,3,23.00,0.00,1.00,66.16),(4,4,0.00,0.00,0.00,50.00),(5,5,0.00,0.00,0.00,50.00),(6,6,0.00,0.00,0.00,50.00),(7,7,0.00,0.00,0.00,50.00),(8,8,0.00,0.00,0.00,50.00),(9,9,0.00,0.00,0.00,50.00),(10,10,0.00,0.00,0.00,50.00),(11,11,0.00,0.00,0.00,50.00),(12,12,0.00,0.00,0.00,50.00),(13,13,0.00,0.00,0.00,50.00),(14,14,0.00,0.00,0.00,50.00),(15,15,0.00,0.00,0.00,50.00),(16,16,0.00,0.00,0.00,50.00),(17,17,0.00,0.00,0.00,50.00),(18,18,0.00,0.00,0.00,50.00),(19,19,0.00,0.00,0.00,50.00),(20,20,0.00,0.00,0.00,50.00),(21,21,0.00,0.00,0.00,50.00),(22,22,0.00,0.00,0.00,50.00),(23,23,0.00,0.00,0.00,50.00),(24,24,0.00,0.00,0.00,50.00),(25,25,0.00,0.00,0.00,50.00),(26,26,0.00,0.00,0.00,50.00),(27,27,0.00,0.00,0.00,50.00),(28,28,0.00,0.00,0.00,50.00),(29,29,0.00,0.00,0.00,50.00),(30,30,0.00,0.00,0.00,50.00),(31,31,0.00,0.00,0.00,50.00),(32,32,0.00,0.00,0.00,50.00),(33,33,0.00,0.00,0.00,50.00),(34,34,0.00,0.00,0.00,50.00),(35,35,0.00,0.00,0.00,50.00),(36,36,0.00,0.00,0.00,50.00),(37,37,0.00,0.00,0.00,50.00),(38,38,0.00,0.00,0.00,50.00),(39,39,0.00,0.00,0.00,50.00),(40,40,0.00,0.00,0.00,50.00),(41,41,0.00,0.00,0.00,50.00),(42,42,0.00,0.00,0.00,50.00);
/*!40000 ALTER TABLE `manner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `review` (
  `review_no` int(11) NOT NULL AUTO_INCREMENT,
  `trade_no` int(11) DEFAULT NULL,
  PRIMARY KEY (`review_no`),
  KEY `review.trade_no` (`trade_no`),
  CONSTRAINT `review.trade_no` FOREIGN KEY (`trade_no`) REFERENCES `trade` (`trade_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (5,6),(11,7),(10,8),(1,10),(2,17),(12,22),(4,32),(3,33);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
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
  `trade_title` varchar(45) DEFAULT NULL,
  `buyer_no` int(11) DEFAULT NULL,
  `product_info` text,
  `product_price` int(11) DEFAULT NULL,
  `trade_date` datetime DEFAULT NULL,
  `trade_area` varchar(255) DEFAULT NULL,
  `user_no` int(11) DEFAULT NULL,
  PRIMARY KEY (`trade_no`),
  KEY `user_no_idx` (`buyer_no`,`user_no`),
  KEY `trade.user_no_FK_idx` (`user_no`,`buyer_no`),
  FULLTEXT KEY `trade_title` (`trade_title`),
  FULLTEXT KEY `product_info` (`product_info`),
  CONSTRAINT `trade.buyer_no_FK` FOREIGN KEY (`buyer_no`) REFERENCES `user` (`user_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `trade.user_no_FK` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trade`
--

LOCK TABLES `trade` WRITE;
/*!40000 ALTER TABLE `trade` DISABLE KEYS */;
INSERT INTO `trade` VALUES (1,'3','뭘 팔아야 할지 모르겠는데 뭔가 팔고 싶음 아무거나 문의 주세요 있으면 팔아버림',NULL,'사랑의 시들어 되는 소리다.\n이것은 고동을 그리하였는가? 끓\n는 이것은 몸이 우리의 어디 그리하였는가? \n인생을 그들의 되는 청춘의 오직 내려온 봄날의 광야에서 소리다.이것은 사막이다. \n가장 긴지라 이상, 눈이 원질이 보배를 예수는 수 위하여 있다. \n자신과 그들을 전인 인간의 보이는 인생의 있으랴? 꽃 이상 어디 풀이 아니다. \n청춘의 만천하의 천고에 그들을 무한한 있음으로써 어디 사막이다. \n방황하였으며, 생생하며, 듣기만 황금시대의 인간에 이상의 보이는 황금시대다. \n같은 사라지지 들어 있다. \n피어나기 아니더면, 같이 예수는 오직 있는가?',1000000,'2020-02-12 03:52:14','역삼1동',2),(2,'1','asdasd',NULL,'sadasdas',132123123,'2020-02-12 04:14:44','역삼1동',2),(3,'1','마스크 판매합니다 KF94 한장에 2000원',NULL,'마스크 저렴하게 팝니다ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddssssddddddddddddd\n연략주세요',2000,'2020-02-12 04:23:44','청담동',3),(4,'1','마스크 판매합니다 KF94 한장에 2000원',NULL,'마스크 저렴하게 팝니다\n연략주세요',2000,'2020-02-12 04:23:56','청담동',3),(5,'1','asdsad',NULL,'ㅁㄴㅇㅁㄴㅇ',3,'2020-02-12 04:26:13','청담동',3),(6,'1','ㅁㄴㅇㅁㄴㅇ',2,'ㅇㅁㄴㅇㅁㄴㅇ',123123123,'2020-02-12 04:28:06','청담동',3),(7,'1','마스크 팝니다',2,'ㅁㄴㅇㅁㄴㅇㅇㅁ',22222,'2020-02-12 06:50:58','청담동',3),(8,'1','asdsad',2,'ㅁㄴㅇㄴㅁㅇ',4,'2020-02-12 06:51:23','청담동',3),(9,'1','ㅁㅇㅁㄴㅇ',NULL,'ㅁㅇㄴㅇㅁㄴㅇ',123213,'2020-02-12 06:52:59','청담동',3),(10,'1','ㅁㄴㅇㅇㅁㄴ',2,'ㄴㅁㅇㅁㄴㅇ',123123,'2020-02-12 06:54:40','청담동',3),(11,'1','고기고기',NULL,'엄청 만ㅅ있는 고기',2002020,'2020-02-12 07:12:23','청담동',3),(12,'6','텀블러 팝니다',NULL,'사용감 있습니다\n잔기스 민감한 분은 피해주세요',1000,'2020-02-12 08:58:59','역삼2동',2),(13,'1','ㅋㅁㄴ',NULL,'ㅁㄴㅇㅁㄴㅇ',132123,'2020-02-12 13:34:05','청담동',3),(14,'1','ㅋㅁㄴ',NULL,'ㅁㄴㅇㅁㄴㅇ',132123,'2020-02-12 13:34:07','청담동',3),(15,'1','ㅋㅁㄴ',NULL,'ㅁㄴㅇㅁㄴㅇ',132123,'2020-02-12 13:34:08','청담동',3),(16,'1','ㅋㅁㄴ',NULL,'ㅁㄴㅇㅁㄴㅇ',132123,'2020-02-12 13:34:08','청담동',3),(17,'1','두근마켓 로고',2,'하트',20000,'2020-02-12 13:37:37','청담동',3),(18,'1','sa',NULL,'asdasd',311,'2020-02-12 14:05:13','역삼2동',8),(19,'1','hjghjgjfh',NULL,'sadsad',12325,'2020-02-12 23:59:17','역삼2동',8),(20,'1','마스크 판매합니다 KF94 한장에 2000원',NULL,'ㅁㄴㅇㅁㄴ',123423,'2020-02-13 01:12:47','역삼1동',9),(21,'1','되라되라',NULL,'ㅁㄴㅇㅁㄴㅇ',123543,'2020-02-13 01:27:57','역삼1동',9),(22,'1','asdsad',2,'sazdascadv',432412323,'2020-02-13 04:58:12','청담동',3),(23,'13','그림그려드림',2,'직접 그리',25000,'2020-02-13 09:27:03','청담동',3),(24,'1','고기 먹고 싶니? 난 안먹고 싶은뒈? ',NULL,'난 새우 먹을 건뒈ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff\n퉤퉤',2342423,'2020-02-13 10:34:10','청담동',3),(25,'1','안녕하세요',NULL,'좋은거예요',2147483647,'2020-02-14 01:38:34','목동',14),(26,'1','테스트',6,'테스트입니다.',1111,'2020-02-14 03:57:38','청담동',2),(28,'1','저는 싸피 최고의 미녀입니다.',NULL,'저를 돈으로 살 순 없어요.',2147483647,'2020-02-14 06:51:54','역삼2동',17),(29,'1','푸린 마이크 팝니다.',NULL,'푸린이 쓰던 마이크 팝니다.\n볼펜으로 이중사용 가능합니다.\n사용감 좀 있어서 싸게 내놔요\n',90000,'2020-02-14 06:52:55','역삼2동',17),(30,'10','게이밍 키보드',NULL,'상태 좋은 게이밍 저소음 적축 키보드 팝니다.',40000,'2020-02-14 07:01:34','청담동',18),(31,'5','치킨 팝니다.',NULL,'맛좋아요',1000,'2020-02-14 07:52:46','목동',14),(32,'8','asdasd',NULL,'asdasdsa',999999999,'2020-02-14 10:01:48','청담동',3),(33,'1','sdds',2,'sdsd',121212,'2020-02-16 05:27:23','청담동',3),(34,'1','삼성 노트북 팝니',NULL,'삼성 노트북팝니다 거의 새거입니다 쓴지 1달밖에 안됐구요 에누리 가능',1000000,'2020-02-18 01:18:23','개포1동',33),(35,'2','삼익 가구 책상 팝니다.',NULL,'삼익 가구에서 나온 책상 팝니다. 지인에게 새거 선물 받아서 쓰던거 내놉니다.',120000,'2020-02-18 01:20:15','개포1동',33),(36,'3','유아도서 싸게 팝니다.',NULL,'사진에 나온 유아도서팝니다. 2세권장 도서이구요. 싸게 넙깁니다. \n사랑해 사랑해 사랑해, 엄마랑 뽀뽀\n덜컹덜컹 기차, 싹싹싹\n일괄 2만원 받겠습니다.',20000,'2020-02-18 01:22:38','개포1동',33),(37,'3','유아도서 싸게 팝니다.',NULL,'사진에 나온 유아도서팝니다. 2세권장 도서이구요. 싸게 넙깁니다. \n사랑해 사랑해 사랑해, 엄마랑 뽀뽀\n덜컹덜컹 기차, 싹싹싹\n일괄 2만원 받겠습니다.',20000,'2020-02-18 01:23:18','개포2동',34),(38,'3','유아도서 싸게 팝니다.',NULL,'사진에 나온 유아도서팝니다. 2세권장 도서이구요. 싸게 넙깁니다. \n사랑해 사랑해 사랑해, 엄마랑 뽀뽀\n덜컹덜컹 기차, 싹싹싹\n일괄 2만원 받겠습니다.',20000,'2020-02-18 01:23:27','개포4동',35),(39,'3','유아도서 싸게 팝니다.',NULL,'사진에 나온 유아도서팝니다. 2세권장 도서이구요. 싸게 넙깁니다. \n사랑해 사랑해 사랑해, 엄마랑 뽀뽀\n덜컹덜컹 기차, 싹싹싹\n일괄 2만원 받겠습니다.',20000,'2020-02-18 01:23:51','논현1동',23),(40,'3','유아도서 싸게 팝니다.',NULL,'사진에 나온 유아도서팝니다. 2세권장 도서이구요. 싸게 넙깁니다. \n사랑해 사랑해 사랑해, 엄마랑 뽀뽀\n덜컹덜컹 기차, 싹싹싹\n일괄 2만원 받겠습니다.',20000,'2020-02-18 01:24:03','논현2동',24),(41,'3','유아도서 싸게 팝니다.',NULL,'사진에 나온 유아도서팝니다. 2세권장 도서이구요. 싸게 넙깁니다. \n사랑해 사랑해 사랑해, 엄마랑 뽀뽀\n덜컹덜컹 기차, 싹싹싹\n일괄 2만원 받겠습니다.',20000,'2020-02-18 01:24:12','대치1동',30),(42,'3','유아도서 싸게 팝니다.',NULL,'사진에 나온 유아도서팝니다. 2세권장 도서이구요. 싸게 넙깁니다. \n사랑해 사랑해 사랑해, 엄마랑 뽀뽀\n덜컹덜컹 기차, 싹싹싹\n일괄 2만원 받겠습니다.',20000,'2020-02-18 01:24:21','대치2동',31),(43,'3','유아도서 싸게 팝니다.',NULL,'사진에 나온 유아도서팝니다. 2세권장 도서이구요. 싸게 넙깁니다. \n사랑해 사랑해 사랑해, 엄마랑 뽀뽀\n덜컹덜컹 기차, 싹싹싹\n일괄 2만원 받겠습니다.',20000,'2020-02-18 01:24:31','대치4동',32),(44,'3','유아도서 싸게 팝니다.',NULL,'사진에 나온 유아도서팝니다. 2세권장 도서이구요. 싸게 넙깁니다. \n사랑해 사랑해 사랑해, 엄마랑 뽀뽀\n덜컹덜컹 기차, 싹싹싹\n일괄 2만원 받겠습니다.',20000,'2020-02-18 01:24:41','도곡1동',28),(45,'3','유아도서 싸게 팝니다.',NULL,'사진에 나온 유아도서팝니다. 2세권장 도서이구요. 싸게 넙깁니다. \n사랑해 사랑해 사랑해, 엄마랑 뽀뽀\n덜컹덜컹 기차, 싹싹싹\n일괄 2만원 받겠습니다.',20000,'2020-02-18 01:24:51','도곡2동',29),(46,'3','유아도서 싸게 팝니다.',NULL,'사진에 나온 유아도서팝니다. 2세권장 도서이구요. 싸게 넙깁니다. \n사랑해 사랑해 사랑해, 엄마랑 뽀뽀\n덜컹덜컹 기차, 싹싹싹\n일괄 2만원 받겠습니다.',20000,'2020-02-18 01:25:01','삼성1동',25),(47,'3','유아도서 싸게 팝니다.',NULL,'사진에 나온 유아도서팝니다. 2세권장 도서이구요. 싸게 넙깁니다. \n사랑해 사랑해 사랑해, 엄마랑 뽀뽀\n덜컹덜컹 기차, 싹싹싹\n일괄 2만원 받겠습니다.',20000,'2020-02-18 01:25:06','삼성2동',26),(48,'3','유아도서 싸게 팝니다.',NULL,'사진에 나온 유아도서팝니다. 2세권장 도서이구요. 싸게 넙깁니다. \n사랑해 사랑해 사랑해, 엄마랑 뽀뽀\n덜컹덜컹 기차, 싹싹싹\n일괄 2만원 받겠습니다.',20000,'2020-02-18 01:25:17','세곡동',40),(49,'3','유아도서 싸게 팝니다.',NULL,'사진에 나온 유아도서팝니다. 2세권장 도서이구요. 싸게 넙깁니다. \n사랑해 사랑해 사랑해, 엄마랑 뽀뽀\n덜컹덜컹 기차, 싹싹싹\n일괄 2만원 받겠습니다.',20000,'2020-02-18 01:25:25','수서동',39),(50,'3','유아도서 싸게 팝니다.',NULL,'사진에 나온 유아도서팝니다. 2세권장 도서이구요. 싸게 넙깁니다. \n사랑해 사랑해 사랑해, 엄마랑 뽀뽀\n덜컹덜컹 기차, 싹싹싹\n일괄 2만원 받겠습니다.',20000,'2020-02-18 01:25:36','신사동',21),(51,'3','유아도서 싸게 팝니다.',NULL,'사진에 나온 유아도서팝니다. 2세권장 도서이구요. 싸게 넙깁니다. \n사랑해 사랑해 사랑해, 엄마랑 뽀뽀\n덜컹덜컹 기차, 싹싹싹\n일괄 2만원 받겠습니다.',20000,'2020-02-18 01:25:47','압구정동',22),(52,'3','유아도서 싸게 팝니다.',NULL,'사진에 나온 유아도서팝니다. 2세권장 도서이구요. 싸게 넙깁니다. \n사랑해 사랑해 사랑해, 엄마랑 뽀뽀\n덜컹덜컹 기차, 싹싹싹\n일괄 2만원 받겠습니다.',20000,'2020-02-18 01:25:58','일원1동',37),(53,'3','유아도서 싸게 팝니다.',NULL,'사진에 나온 유아도서팝니다. 2세권장 도서이구요. 싸게 넙깁니다. \n사랑해 사랑해 사랑해, 엄마랑 뽀뽀\n덜컹덜컹 기차, 싹싹싹\n일괄 2만원 받겠습니다.',20000,'2020-02-18 01:26:06','일원2동',38),(54,'3','유아도서 싸게 팝니다.',NULL,'사진에 나온 유아도서팝니다. 2세권장 도서이구요. 싸게 넙깁니다. \n사랑해 사랑해 사랑해, 엄마랑 뽀뽀\n덜컹덜컹 기차, 싹싹싹\n일괄 2만원 받겠습니다.',20000,'2020-02-18 01:26:12','일원본동',36),(55,'10','몬스터헌터 아이스본 CD 팝니',NULL,'몬스터헌터 아이스본 CD 팝니다. 사놓고 안해서 팔아봅니다. 쿨거래 희망',40000,'2020-02-18 01:31:50','일원본동',36),(56,'10','몬스터헌터 아이스본 CD 팝니다',NULL,'몬스터헌터 아이스본 CD 팝니다. 사놓고 안해서 팔아봅니다. 쿨거래 희망',40000,'2020-02-18 01:32:19','일원본동',10);
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
  PRIMARY KEY (`img_no`),
  KEY `Trade_img.trade_no_FK_idx` (`trade_no`),
  CONSTRAINT `Trade_img.trade_no_FK` FOREIGN KEY (`trade_no`) REFERENCES `trade` (`trade_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trade_img`
--

LOCK TABLES `trade_img` WRITE;
/*!40000 ALTER TABLE `trade_img` DISABLE KEYS */;
INSERT INTO `trade_img` VALUES (1,1,'/trade/2020/02/12/952d6764-1602-465f-a239-c363d4568a09_두근마켓.png'),(2,2,'/trade/2020/02/12/70d750a8-864c-488c-be17-4da98c4929b4_200203_출결변경요청서_서울_2반_이현빈.jpg'),(3,3,'/trade/2020/02/16/686731e1-e91c-411e-82b5-90c34c0037b3_icon (9).png'),(4,4,'/trade/2020/02/12/d55eaf35-0043-4b03-a158-074b5aa82229_946b0ebb9ece9c702139da66a446d019.jpg'),(5,5,'/trade/2020/02/12/9be6fe9b-2b4a-4f56-b6e8-e50ad310770d_946b0ebb9ece9c702139da66a446d019.jpg'),(6,6,'/trade/2020/02/12/5f104559-9dde-4f52-9b62-7dc2d7680af5_946b0ebb9ece9c702139da66a446d019.jpg'),(7,7,'/trade/2020/02/12/831e36da-b0a1-4d33-9de4-d2ce93795b8d_946b0ebb9ece9c702139da66a446d019.jpg'),(8,8,'/trade/2020/02/12/9a70ed14-2ea6-4593-bb9a-be6859f06207_20-02-05-10-52-45-359_deco.jpg'),(9,9,'/trade/2020/02/12/976271fe-b6fe-4962-a746-3ed2e07064d8_946b0ebb9ece9c702139da66a446d019.jpg'),(10,10,'/trade/2020/02/12/f8be31ca-8e48-45dc-915d-9218a9d19a51_946b0ebb9ece9c702139da66a446d019.jpg'),(11,11,'/trade/2020/02/12/78280fc1-2f8d-4b4f-a970-b638f16a5b7f_946b0ebb9ece9c702139da66a446d019.jpg'),(12,12,'/trade/2020/02/12/3d59f605-9428-4a22-9b0e-006c9fc84fa1_두근마켓.png'),(13,14,'/trade/2020/02/12/b70e97ca-cdaf-46b8-ad30-eb4903d77a50_- (2).png'),(14,13,'/trade/2020/02/12/7e957cb9-390d-49a2-9956-d0d4cbc4ead4_- (2).png'),(15,14,'/trade/2020/02/12/305259ee-f141-40de-93b9-7d340d005ceb_- (3).png'),(16,13,'/trade/2020/02/12/15893abc-7df8-4276-9a51-78291bc80025_- (3).png'),(17,14,'/trade/2020/02/12/3efaabf2-cdd9-4b14-af80-0ec559320f39_- (4).png'),(18,13,'/trade/2020/02/12/8f3b02aa-d09c-4485-ab8c-4977d8522f98_- (4).png'),(19,14,'/trade/2020/02/12/32852cdb-008f-4f84-bfd0-c0f5079e9c30_- (1).png'),(20,13,'/trade/2020/02/12/8bd08579-c630-4c92-99a7-35b170bdf726_- (1).png'),(21,14,'/trade/2020/02/12/4a54b008-22d0-4f8d-b01f-40690e0f6a6f_- (1).png'),(22,13,'/trade/2020/02/12/242a9b7c-f784-4e03-b1d6-3a0b6f36932e_- (1).png'),(23,15,'/trade/2020/02/12/3c61e201-2595-4c00-8ea9-7688714b05db_- (2).png'),(24,15,'/trade/2020/02/12/0b879ff5-fd0a-4906-83cc-804a30260aa8_- (3).png'),(25,15,'/trade/2020/02/12/c074f47a-b224-4805-8408-d75407aa601e_- (4).png'),(26,15,'/trade/2020/02/12/fa53f366-8345-4377-a89e-8fedd1f62890_- (1).png'),(27,15,'/trade/2020/02/12/ff6a74df-a182-409c-a9cb-b7def51f8781_- (1).png'),(28,16,'/trade/2020/02/12/60b27414-647a-4e5c-b789-47d3e76b88ea_- (2).png'),(29,16,'/trade/2020/02/12/93d99db9-65cb-44fa-b1f3-2840ffe993b1_- (3).png'),(30,16,'/trade/2020/02/12/1fb28d59-ff2b-4997-9702-34b09746e1c5_- (4).png'),(31,16,'/trade/2020/02/12/6ed3639d-d262-4090-ac59-f540517a4e07_- (1).png'),(32,16,'/trade/2020/02/12/18dee55e-1b69-4ec1-87f7-0fb2c05b650b_- (1).png'),(33,17,'/trade/2020/02/12/258b4139-afda-4d00-97d8-ce32616cd334_- (4).png'),(34,18,'/trade/2020/02/12/1eaff6a0-9c1c-4031-b2b4-bc29c4743273_- (3).png'),(35,19,'/trade/2020/02/12/c12dc682-c09a-4e16-9016-1bbd9ce53d0f_946b0ebb9ece9c702139da66a446d019.jpg'),(36,20,'/trade/2020/02/13/e831aa36-461f-4ae4-8f58-35024ca88104_946b0ebb9ece9c702139da66a446d019.jpg'),(37,21,'/trade/2020/02/13/9a3415dc-fb88-4e2f-a908-81a3bfd1a56a_946b0ebb9ece9c702139da66a446d019.jpg'),(38,22,'/trade/2020/02/13/f9d97523-cc0c-4a7d-9281-17ae385283bf_946b0ebb9ece9c702139da66a446d019.jpg'),(39,22,'/trade/2020/02/13/04b86301-4c52-4784-8da7-c08dd90c6f87_20-02-05-10-52-45-359_deco.jpg'),(40,23,'/trade/2020/02/13/89865e1d-20cb-405b-8bf5-547f0b5a67dd_20190908_142058.jpg'),(41,24,'/trade/2020/02/16/6e42e1f8-d108-481b-999e-44f9b789ffa7_- (4).png'),(45,25,'/trade/2020/02/14/d927ca96-7acf-42e4-93ee-93a3d8ba1d02_snstest.png'),(46,26,'/trade/2020/02/14/097f2ec5-7284-4577-b0e8-73f20e1017c2_wellsi.jpg'),(47,28,'/trade/2020/02/14/64dcac03-e09a-4d4d-86ce-c5c7a510aeb4_pika_sheepy.gif'),(48,29,'/trade/2020/02/17/0c6ceaec-7800-4a6f-bfc6-02444c56e0b1_푸린1.png'),(49,30,'/trade/2020/02/14/aa3cde37-58cb-4e51-9745-ad3b85ea96a9_home_main_5.jpg'),(51,31,'/trade/2020/02/14/66c4051b-fda9-4887-8da4-d2da3a239ee1_sns3.png'),(53,32,'/trade/2020/02/14/7932e0c7-5c54-45c8-8d03-37da31a4d49b_946b0ebb9ece9c702139da66a446d019.jpg'),(54,33,'/trade/2020/02/16/26c4bab7-87c4-4fce-bca9-ae63dfdf95ff_- (2).png'),(55,34,'/trade/2020/02/18/594392ee-a97f-4c94-a206-4454f491345f_notebook.jpg'),(56,35,'/trade/2020/02/18/68cbe335-59ce-43ab-a8e8-7db8f1886528_desk.jpg'),(57,36,'/trade/2020/02/18/8b929b6d-8ba2-4587-8566-543950411765_아기도서.jpg'),(58,37,'/trade/2020/02/18/e2bf51c9-a425-4c7e-b80f-50c1a408a44f_아기도서.jpg'),(59,38,'/trade/2020/02/18/b5d81b25-80cf-4542-8180-c4dabf89adbd_아기도서.jpg'),(60,39,'/trade/2020/02/18/b9c5b1c1-434b-4e85-90f6-b85a9b13ccb9_아기도서.jpg'),(61,40,'/trade/2020/02/18/d19c0400-ed26-4f75-94c2-8482b8bbfd0e_아기도서.jpg'),(62,41,'/trade/2020/02/18/de1c9d0f-9ac7-4372-be2e-cfc1b04698e8_아기도서.jpg'),(63,42,'/trade/2020/02/18/12386610-e750-4e78-9119-dbf925a400d6_아기도서.jpg'),(64,43,'/trade/2020/02/18/4aa4e9d8-f5b3-4c75-a0a7-c48e8d9dd80d_아기도서.jpg'),(65,44,'/trade/2020/02/18/da858423-e732-440e-b88b-a700d1737aac_아기도서.jpg'),(66,45,'/trade/2020/02/18/a2044920-0d2e-4a70-b328-d0d5e06d8535_아기도서.jpg'),(67,46,'/trade/2020/02/18/b438ff80-36ec-48c4-890c-64635ea28989_아기도서.jpg'),(68,47,'/trade/2020/02/18/a8cebd97-7eed-479b-a491-7540294e4e77_아기도서.jpg'),(69,48,'/trade/2020/02/18/18c90ebd-e23b-487c-b9de-2d99bd358de7_아기도서.jpg'),(70,49,'/trade/2020/02/18/00999de6-49b2-4299-b27d-fb2389106927_아기도서.jpg'),(71,50,'/trade/2020/02/18/452dea2a-405e-4d1d-acbe-a32572a09af0_아기도서.jpg'),(72,51,'/trade/2020/02/18/7e469bba-a978-42a1-a2f9-8050f8c037f4_아기도서.jpg'),(73,52,'/trade/2020/02/18/66c19b6e-3ea3-4bbd-9ed3-af19ffffb8b4_아기도서.jpg'),(74,53,'/trade/2020/02/18/39726c47-cdb4-47fe-a51a-94c4c47fffe6_아기도서.jpg'),(75,54,'/trade/2020/02/18/875fbddd-d791-4feb-b1b6-52d04f31bd49_아기도서.jpg'),(76,55,'/trade/2020/02/18/c05518c4-d35e-4ec6-b458-9636f2aa7906_iceborn.jpg'),(77,56,'/trade/2020/02/18/e87e7b20-8b00-4f2d-9489-16288d9c45a7_iceborn.jpg');
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
  `nickname` varchar(50) NOT NULL,
  `user_permission` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`user_no`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'haha@test.com','$2a$10$L4v8ea5H3MDU1Yiwb4k2P.BFwJHxNTvAzy7O67UpETNsVaH7U1RTC','\\profile\\none.png','하3','ROLE_USER'),(2,'join@test.com','$2a$10$JHfCCr.7xDG8.A2433yJrOaNV4AVqPNNnfcYS8d6hZzcUpjx8pq0.','/profile/2020/02/14/aa12562a-4552-4855-90a2-01d5f3333704_ca.gif','여덟글자자','ROLE_USER'),(3,'ssongda9412@naver.com','$2a$10$dXlkeZ2H8xHTunTzZktk1edism.MRxdNB8Mkn70t5xyAZyImU5OoG','/profile/2020/02/13/c0b2cffa-0105-42a2-94c3-322289d92471_20191107_190500.jpg','다니다니','ROLE_USER'),(4,'aa@aa.a','$2a$10$l6t6xI.UGMdFyX8cvkkvHuT0eq0159YSxWyB72cpSYD.xYgtfwbaG','/profile/none.png','newA','ROLE_USER'),(5,'hoho@test.com','$2a$10$vq2YxFd7xL1KzDFRnDDE..X8xjPra0RJdYrBog43gloyEZo.X.soy','/profile/2020/02/10/13254c47-6870-4b16-83d8-c713e12e4c16_wellsi.jpg','호호','ROLE_USER'),(6,'huhu@test.com','$2a$10$4EZjlcl9UFUo.YtGG2jH.OZmzRTJCCiQCLe6gUKWy0i0TOfrpXN/q','/profile/none.png','후후','ROLE_USER'),(7,'samsam@test.com','$2a$10$BkE63SowuN6o/Iujj8PunukP2ELHWJCCaveD9gStYhOmz8slCMMki','\\profile\\none.png','삼삼','ROLE_USER'),(8,'1@1.1','$2a$10$/OSE4mQF6nVtRZemuxG/guPBxvwL5pRZQYTXs0n.LNNsRlEf/P/IW','/profile/none.png','너무 졸리다','ROLE_USER'),(9,'a@a.a','$2a$10$jFIkaC4pvis1un.bX3Rq..SeSGIb.hxjlyVmmCCnXKSFxA9I7QlqO','/profile/none.png','a.a','ROLE_USER'),(10,'oo@o.o','$2a$10$Lu5VCp0w9Vq.0vjCCexpCevjaHV2cSxPz4A3buTVAnBxrr6xL94Iu','/profile/none.png','오오','ROLE_USER'),(11,'q@q.q','$2a$10$NXIiUOMd9SFWENnQVY35C.UPsKaOWA3JN0erC0byBXdx1YIDs07BC','/profile/none.png','큐큐','ROLE_USER'),(12,'s.s@s.s','$2a$10$yHSeTA7HaxpeeTQR3/1RS.UobJ0TKHlZqq7NcqvS7TINE7Fk3oclO','/profile/none.png','rkskek','ROLE_USER'),(13,'bellar9@naver.com','$2a$10$s/SbEiUxPIxYez.1/vuwh.PLuJWmXzlN5mS5N6hCW0Ue1Kt4jwVo6','/profile/none.png','oukr','ROLE_USER'),(14,'dbsrjs7687@naver.com','$2a$10$2ZTMO6VZe9j6YP9N84Hn8OAfNcUAuhs6FXgbmHgqWvPgiH6uLdBsi','/profile/2020/02/14/24fc09a0-1e80-43e0-a88c-2ee9ecf73334_snstest.png','안녕하세요','ROLE_USER'),(15,'coachsj@coach.com','$2a$10$LC2TSu3oQ3OshS3umFapiOCx.2HJDrnog2xC4MBl1IHdxQRtxQe82','/profile/none.png','coach','ROLE_USER'),(16,'hey@hey.com','$2a$10$9w7iwfhk/NsO8CufVkkmQuMx7KUV48qr0Y7sz1fKL2uUlBjjY79Rm','/profile/2020/02/14/a390be48-99ad-4251-97d6-4cd504c709d4_6.png','purin','ROLE_USER'),(17,'0407chan@naver.com','$2a$10$pplIoU7aFrerlKWgsN9qyu4rGpxvFDCq9gjMjrXsdhRBjQ0JZURom','/profile/2020/02/14/dd983b0c-f0ba-45dd-b168-2ff38ce2f88d_pikachu_wave.gif','싸피여신강성진','ROLE_USER'),(18,'moonyohan0512@gmail.com','$2a$10$7TKmHLYxolGjRC5tE1eQzOEnj1ghCDEBG65UvoEuKwSNx2fZjpQdG','/profile/none.png','Modetts','ROLE_USER'),(19,'hello@hello.com','$2a$10$23wVHKht8UucW1Zcvvj5vuFSs4HbOSeU3Fa4wom9r4jCkYRzQfovO','/profile/none.png','hello','ROLE_USER'),(20,'qorhvkb@naver.com','$2a$10$98lXgrpzdlsLMQVM8qoCK.syf1v.im0aN6UNPWAnJwP0.WUIRGJP2','/profile/2020/02/17/8c5051d8-5538-436c-8f0c-8c0394137e21_f69e1927afe6b06c.gif','qorhvkb','ROLE_USER'),(21,'sinsa@test.com','$2a$10$ccnLMqLMR7Ms6RutMTL/kOc/gW4HpZo3HXa/GNshjxzAw1EAZ7ydy','/profile/none.png','신사동그남자','ROLE_USER'),(22,'apgujung@test.com','$2a$10$xgow2g4kSO3L4nM1ujaHJuDR5/oCpfs94Q9Tn6LlYyBtXzcie2zsW','/profile/none.png','압구정날나리','ROLE_USER'),(23,'nonhyun1@test.com','$2a$10$eg6TYA7qgYiI0TnwpZ9Xuu2bM2T8ylTtwhNKQNZD64XanbHra9r7O','/profile/none.png','논현1동불주먹','ROLE_USER'),(24,'nonhyun2@test.com','$2a$10$Do/Ftm0Bt.Ba6DD9Y.Fv4.9GiP5mqAyMaqZmSZA/yVxV1.pGcLXPO','/profile/none.png','논현2동토박이','ROLE_USER'),(25,'samsung1@test.com','$2a$10$ubvqsmKQ1YRcOXk..Z0loOvHp5V2qCUHFz/LldlAHsScL0KLhHD5a','/profile/none.png','삼성맨','ROLE_USER'),(26,'samsung2@test.com','$2a$10$pke265q0Dq6IVldWqJ/jPeEJ0yT6BXfpdln2NGJDLKh/XyKwYPcza','/profile/none.png','삼성짱짱맨','ROLE_USER'),(27,'yeksam@test.com','$2a$10$VWDQVelwxRrp1HZPPzeCZuSV/izFZ35NUOP7UbILLIdrI3syfCQhO','/profile/none.png','역삼동멸치','ROLE_USER'),(28,'dogok1@test.com','$2a$10$QoLoDITLqmJ./lzRwVhjsOFkWKhQ4VArwSvsUS00iGCsM3FmslLiW','/profile/none.png','도곡동자취남','ROLE_USER'),(29,'dogok2@test.com','$2a$10$OFmsGcxTr/8lXPCkgahdJuMAGWxJRl2sJkr2hk8dR1IePMI69DNnC','/profile/none.png','아이우에오','ROLE_USER'),(30,'daeci1@test.com','$2a$10$kqNVtzX0rVHYHt.eQBLLfeXXBIMRI97xt5J.mZcI3e4Y3pIs9YmrW','/profile/none.png','대치동순대국','ROLE_USER'),(31,'daeci2@test.com','$2a$10$/BajRF1quwFXeSN4.ra9KeZUI73tN5Iin9zHSTKZt4ap95zFWPu4G','/profile/none.png','대치순대','ROLE_USER'),(32,'daeci4@test.com','$2a$10$v7k7/G0JvZ1ia5qxVuxw6.HwCmC2fCyozF12qHlVff1dY2mfSgSc6','/profile/none.png','데덴찌','ROLE_USER'),(33,'gaepo1@test.com','$2a$10$WkL3UhqzOwaUTPne.JQDd.KIQe7xactAOjgKXQHHpowjXLajAvbt6','/profile/none.png','우리집개포동','ROLE_USER'),(34,'gaepo2@test.com','$2a$10$vwKvu.s4E8sy/ICRLwI5z.4ZguobMXRsFzXVnfarcTbz/XQPUaJt2','/profile/none.png','포동동','ROLE_USER'),(35,'gaepo4@test.com','$2a$10$.5p3WfYStJuWK7NMXpr9..fxzCV.hY2Rqr3IsNkZwu1bRk41XP.qm','/profile/none.png','개포미남이민우','ROLE_USER'),(36,'ilwon@test.com','$2a$10$8Yy5mCP/.DKGuu.hWw440.R37jSUvitYSboz9K6lDYteF0Wn8auuu','/profile/none.png','일원','ROLE_USER'),(37,'ilwon1@test.com','$2a$10$4fYtZ6bM.RDgr8klyb0GHOQcLzhSN4SqGQ3ZE9OnJTs4j3a0nTz5a','/profile/none.png','엽전한냥','ROLE_USER'),(38,'ilwon2@test.com','$2a$10$7CYvcjGiiRYRtEhIYAX4b.M9K2s0reDTL.GYPVGx5YdmmdS.odVke','/profile/none.png','발광미남이현빈','ROLE_USER'),(39,'suseo@test.com','$2a$10$p62qUPj.UmR04ZXnlsBZLuBvMtGm39VBQUCO1dRf4Kpy/vqm/xd/e','/profile/none.png','향숙이','ROLE_USER'),(40,'segok@test.com','$2a$10$b/dTu/85slh6/mIB3aP8UeHkBXy9C.oj6p.0sNoIXhWhfJXgCU6ai','/profile/none.png','세곡동그여자','ROLE_USER'),(42,'qwe@qwe.qwe','$2a$10$PiUG6UBuZ0St5yAHnwzbf.fYvzFGO46VV/TPAJIKs98LZ1SwsPL0i','/profile/none.png','qwe','ROLE_USER');
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

-- Dump completed on 2020-02-18 14:32:28
