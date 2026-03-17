-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: loan
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `language` varchar(255) DEFAULT NULL,
  `bio` text,
  `avatar` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loanapplications`
--

DROP TABLE IF EXISTS `loanapplications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loanapplications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `loan_id` varchar(255) DEFAULT NULL,
  `aadhar` varchar(255) DEFAULT NULL,
  `pan` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `occupation` varchar(255) DEFAULT NULL,
  `address` text,
  `pincode` varchar(255) DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `tenure` int DEFAULT NULL,
  `loanType` varchar(255) DEFAULT NULL,
  `emi` float DEFAULT NULL,
  `total` float DEFAULT NULL,
  `accountHolder` varchar(255) DEFAULT NULL,
  `accountNumber` varchar(255) DEFAULT NULL,
  `ifsc` varchar(255) DEFAULT NULL,
  `bankName` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `step_completed` int DEFAULT '1',
  `payment_status` varchar(255) DEFAULT 'pending',
  `rejection_reason` text,
  `status` varchar(255) DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loanapplications`
--

LOCK TABLES `loanapplications` WRITE;
/*!40000 ALTER TABLE `loanapplications` DISABLE KEYS */;
INSERT INTO `loanapplications` VALUES (1,NULL,NULL,NULL,'Aaradhya Thakur','43755865946767676','coolaaradhyathakur2019@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'pending',NULL,'pending','2026-03-17 05:27:15','2026-03-17 05:27:15'),(2,'LN-2026-00002','837117687972','AWLPY0008R','Aaradhya Thakur','43755865946767676','coolaaradhyathakur2019@gmail.com','self-employed','axd',NULL,520000,24,'personal',24721.8,593322,'Aaradhya Thakur','78946783247','KKBK0000753','Kotak Mahindra Bank',NULL,5,'paid',NULL,'approved','2026-03-17 06:16:37','2026-03-17 06:18:01'),(3,'LN-2026-00003','837117687972','AWLPY0008R','Aaradhya Thakur','43755865946767676','coolaaradhyathakur2019@gmail.com','self-employed','thrsb',NULL,200000,24,'personal',9508.36,228201,'Aaradhya Thakur','78946783247','KKBK0000753','Kotak Mahindra Bank',NULL,5,'paid',NULL,'approved','2026-03-17 08:20:42','2026-03-17 08:21:39'),(4,'LN-2026-00004','837117687972','AWLPY0008R','Vikash','78978676567465','coolaaradhyathakur2019@gmail.com','self-employed','hgvcgh',NULL,280000,24,'personal',13311.7,319481,'Aaradhya Thakur','78946783247','KKBK0000753','Kotak Mahindra Bank',NULL,5,'paid',NULL,'approved','2026-03-17 08:27:31','2026-03-17 08:31:29'),(5,NULL,'837117687972','AWLPY0008R','Aaradhya Thakur','43755865946767676','coolaaradhyathakur2019@gmail.com','self-employed','rtgsdgs5',NULL,200000,24,'personal',9508.36,228201,'Aaradhya Thakur','78946783247','KKBK0000753','Kotak Mahindra Bank',NULL,4,'pending',NULL,'pending','2026-03-17 08:35:49','2026-03-17 08:36:03'),(6,NULL,'837117687972','AWLPY0008R','Aaradhya Thakur','43755865946767676','coolaaradhyathakur2019@gmail.com','self-employed','srthbb',NULL,200000,24,'personal',9508.36,228201,'Aaradhya Thakur','78946783247','KKBK0000753','Kotak Mahindra Bank',NULL,4,'pending',NULL,'pending','2026-03-17 08:42:20','2026-03-17 08:45:57');
/*!40000 ALTER TABLE `loanapplications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loanrecoveries`
--

DROP TABLE IF EXISTS `loanrecoveries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loanrecoveries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `loan_id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `pending_amount` float DEFAULT NULL,
  `total_loan_amount` float DEFAULT NULL,
  `status` varchar(255) DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loanrecoveries`
--

LOCK TABLES `loanrecoveries` WRITE;
/*!40000 ALTER TABLE `loanrecoveries` DISABLE KEYS */;
INSERT INTO `loanrecoveries` VALUES (1,'LN-2026-00002','Aaradhya Thakur','43755865946767676',265,676,'pending','2026-03-17 06:26:38','2026-03-17 06:26:38');
/*!40000 ALTER TABLE `loanrecoveries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paymentconfigs`
--

DROP TABLE IF EXISTS `paymentconfigs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paymentconfigs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `processing_fee` int NOT NULL DEFAULT '500',
  `razorpay_secret` varchar(255) DEFAULT NULL,
  `qr_image` varchar(255) DEFAULT NULL,
  `account_name` varchar(255) DEFAULT NULL,
  `account_number` varchar(255) DEFAULT NULL,
  `ifsc` varchar(255) DEFAULT NULL,
  `bank_name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `razorpay_key_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentconfigs`
--

LOCK TABLES `paymentconfigs` WRITE;
/*!40000 ALTER TABLE `paymentconfigs` DISABLE KEYS */;
INSERT INTO `paymentconfigs` VALUES (1,67,'jhvjhvjhn','https://res.cloudinary.com/dewaq0lnu/image/upload/v1773736226/loan_payment_qrs/cxxgfoex2snqkdihia0k.png','Baiju','7987698','Baijujjlkjl','Kotal','2026-03-17 07:09:10','2026-03-17 08:50:18','hjkjk');
/*!40000 ALTER TABLE `paymentconfigs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `site_settings`
--

DROP TABLE IF EXISTS `site_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `site_settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `site_title` varchar(255) DEFAULT NULL,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_description` text,
  `meta_keywords` text,
  `copyright` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `favicon` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `site_settings`
--

LOCK TABLES `site_settings` WRITE;
/*!40000 ALTER TABLE `site_settings` DISABLE KEYS */;
INSERT INTO `site_settings` VALUES (1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-03-17 05:27:03','2026-03-17 05:27:03');
/*!40000 ALTER TABLE `site_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(255) DEFAULT NULL,
  `tag_code` longtext,
  `location` enum('head','body') DEFAULT 'head',
  `is_active` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-17 14:21:45
