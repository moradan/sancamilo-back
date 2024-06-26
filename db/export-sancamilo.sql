CREATE DATABASE  IF NOT EXISTS `moradandb_sancamilo` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `moradandb_sancamilo`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: mysql-moradandb.alwaysdata.net    Database: moradandb_sancamilo
-- ------------------------------------------------------
-- Server version	5.5.5-10.6.17-MariaDB

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
-- Table structure for table `especialidades`
--

DROP TABLE IF EXISTS `especialidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especialidades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialidades`
--

LOCK TABLES `especialidades` WRITE;
/*!40000 ALTER TABLE `especialidades` DISABLE KEYS */;
INSERT INTO `especialidades` VALUES (1,'Consulta General'),(2,'Imagenes'),(3,'Laboratorio'),(4,'Gastroenterologia'),(5,'Psiquiatria'),(6,'Pediatria'),(7,'Otorrinolaringologia'),(8,'Cardiologia'),(9,'Pneumonologia'),(10,'Obstetricia'),(11,'Odontologia'),(12,'Endodoncia');
/*!40000 ALTER TABLE `especialidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prepagas`
--

DROP TABLE IF EXISTS `prepagas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prepagas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prepagas`
--

LOCK TABLES `prepagas` WRITE;
/*!40000 ALTER TABLE `prepagas` DISABLE KEYS */;
INSERT INTO `prepagas` VALUES (1,'No'),(2,'OSDE'),(3,'Medicus'),(4,'Omit'),(5,'Otro');
/*!40000 ALTER TABLE `prepagas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turnos`
--

DROP TABLE IF EXISTS `turnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `turnos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `paciente` int(11) NOT NULL,
  `profesional` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  PRIMARY KEY (`id`),
  KEY `paciente` (`paciente`),
  KEY `profesional` (`profesional`),
  CONSTRAINT `turnos_ibfk_1` FOREIGN KEY (`paciente`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `turnos_ibfk_2` FOREIGN KEY (`profesional`) REFERENCES `usuarios` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turnos`
--

LOCK TABLES `turnos` WRITE;
/*!40000 ALTER TABLE `turnos` DISABLE KEYS */;
INSERT INTO `turnos` VALUES (1,3,5,'2024-06-24','20:30:00'),(5,3,1,'2024-06-05','12:30:00'),(6,5,1,'2024-06-25','11:00:00'),(8,5,1,'2024-06-26','12:00:00');
/*!40000 ALTER TABLE `turnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_completo` varchar(255) NOT NULL,
  `sexo` enum('masculino','femenino') NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `prepaga` int(11) NOT NULL,
  `especialidad` int(11) DEFAULT NULL,
  `password` varchar(64) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `prepaga` (`prepaga`),
  KEY `especialidad` (`especialidad`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`prepaga`) REFERENCES `prepagas` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`especialidad`) REFERENCES `especialidades` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Consulta General','masculino','2024-06-05','general@sancamilo.com',1,1,'1234'),(3,'Rodrigo Gimenez','masculino','1981-09-25','realmoradan@hotmail.com',1,NULL,'1234'),(4,'Jorge Ivan','masculino','1970-01-01','m.pescador1970@outlook.com',2,1,'password'),(5,'juan','masculino','2024-06-05','juansolari39@gmail.com',2,1,'123');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-26 12:17:58
