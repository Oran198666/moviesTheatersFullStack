CREATE DATABASE  IF NOT EXISTS `movies_theaters` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `movies_theaters`;
-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: movies_theaters
-- ------------------------------------------------------
-- Server version	8.0.46

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
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies` (
  `movieId` int NOT NULL AUTO_INCREMENT,
  `theaterId` int NOT NULL,
  `movieName` varchar(100) NOT NULL,
  `screeningTime` datetime NOT NULL,
  `durationMinutes` int NOT NULL,
  PRIMARY KEY (`movieId`),
  KEY `FK_movies_theaters` (`theaterId`),
  CONSTRAINT `FK_movies_theaters` FOREIGN KEY (`theaterId`) REFERENCES `theaters` (`theaterId`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies`
--

LOCK TABLES `movies` WRITE;
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
INSERT INTO `movies` VALUES (1,1,'The Quiet Harbour','2026-08-20 19:30:00',118),(2,1,'Northbound','2026-08-20 22:00:00',134),(3,1,'Paper Lanterns','2026-08-21 17:15:00',96),(4,2,'Signal Lost','2026-08-20 20:00:00',142),(5,2,'The Long Afternoon','2026-08-21 18:45:00',108),(6,2,'Gravel Road','2026-08-22 21:30:00',127),(7,3,'Winter Light','2026-08-20 18:00:00',88),(8,3,'The Cartographer','2026-08-21 20:30:00',115),(9,4,'Eight Minutes','2026-08-20 21:00:00',101),(10,4,'Salt and Iron','2026-08-22 19:15:00',139),(11,5,'Archive Footage','2026-08-21 16:00:00',74),(12,5,'The Understudy','2026-08-21 19:00:00',112),(13,6,'Crosswind','2026-08-20 20:45:00',124),(14,6,'Low Tide','2026-08-23 17:30:00',93),(15,7,'The Night Shift','2026-08-20 22:15:00',106),(16,7,'Ember','2026-08-22 18:00:00',131),(17,8,'Static','2026-08-21 21:45:00',119),(18,8,'The Last Ferry','2026-08-23 19:30:00',97);
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `theaters`
--

DROP TABLE IF EXISTS `theaters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `theaters` (
  `theaterId` int NOT NULL AUTO_INCREMENT,
  `theaterName` varchar(100) NOT NULL,
  PRIMARY KEY (`theaterId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `theaters`
--

LOCK TABLES `theaters` WRITE;
/*!40000 ALTER TABLE `theaters` DISABLE KEYS */;
INSERT INTO `theaters` VALUES (1,'Cinema City Glilot'),(2,'Yes Planet Rishon'),(3,'Lev Tel Aviv'),(4,'Rav Chen Dizengoff'),(5,'Cinematheque Jerusalem'),(6,'Hot Cinema Haifa'),(7,'Cinema City Netanya'),(8,'Yes Planet Beer Sheva');
/*!40000 ALTER TABLE `theaters` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-18 10:14:38
