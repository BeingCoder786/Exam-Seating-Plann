-- MySQL dump 10.11
--
-- Host: localhost    Database: examhallarrangement
-- ------------------------------------------------------
-- Server version	5.0.45-community-nt

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `examdetails`
--

DROP TABLE IF EXISTS `examdetails`;
CREATE TABLE `examdetails` (
  `username` varchar(255) default NULL,
  `examname` varchar(255) default NULL,
  `date` varchar(100) default NULL,
  `time` varchar(50) default NULL,
  `clgname` varchar(255) default NULL,
  `address` varchar(100) default NULL,
  `city` varchar(100) default NULL,
  `pincode` varchar(50) default NULL,
  `state` varchar(50) default NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `examdetails`
--

LOCK TABLES `examdetails` WRITE;
/*!40000 ALTER TABLE `examdetails` DISABLE KEYS */;
INSERT INTO `examdetails` VALUES ('deen','mid sem (aug-sep 2019)','2019-11-04','14:00','MNNIT','64 PG Hostel','Allahabad','211004','UP'),('deen','NIMCET','2018-11-05','15:03','MNNIT','44','Allahabad','211004','up'),('deen','end sem (nov-dec 2019)','2019-11-07','09:00','mnnit','64 PG Hostel','Allahabad','21344','UP'),('deen','a','2019-11-04','01:10','hhhh','dff','kjkjjkk','jhjjhj','ikjj');
/*!40000 ALTER TABLE `examdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roomdetails`
--

DROP TABLE IF EXISTS `roomdetails`;
CREATE TABLE `roomdetails` (
  `username` varchar(255) default NULL,
  `floor` int(255) default NULL,
  `roomname` varchar(255) default NULL,
  `row` int(100) default NULL,
  `length` int(100) default NULL,
  `capacity` int(255) default NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `roomdetails`
--

LOCK TABLES `roomdetails` WRITE;
/*!40000 ALTER TABLE `roomdetails` DISABLE KEYS */;
INSERT INTO `roomdetails` VALUES ('deen',4,'ff2',5,10,50);
/*!40000 ALTER TABLE `roomdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `sid` int(100) NOT NULL auto_increment,
  `regno` varchar(255) NOT NULL,
  `name` varchar(255) default NULL,
  `class` varchar(255) default NULL,
  `semester` int(10) default NULL,
  `branch` varchar(100) default NULL,
  PRIMARY KEY  (`regno`),
  UNIQUE KEY `sid` (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
  `sid` int(100) NOT NULL auto_increment,
  `regno` varchar(255) default NULL,
  `name` varchar(255) default NULL,
  `class` varchar(255) default NULL,
  `semester` int(10) default NULL,
  `branch` varchar(100) default NULL,
  PRIMARY KEY  (`sid`),
  UNIQUE KEY `regno` (`regno`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'2018CA61','JAY KUMAR SUTRAKAR','MCA',3,'ZZ'),(2,'2018CA45','TRILOKI NATH','MCA',3,'ZZ'),(3,'2018CA41','DEENDAYAL  GOUR','MCA',3,'ZZ'),(4,'2018CA07','Kaustubh Buley','MCA',3,'ZZ'),(5,'2018CA08','YASH YADAV','MCA',3,'ZZ'),(6,'2018CA09','Rajat Borde','MCA',3,'ZZ'),(7,'2018CA11','Alka Rani Tigga','MCA',3,'ZZ'),(8,'2018CA12','Saurabh Negi','MCA',3,'ZZ'),(9,'2018CA13','Uddeshya Kumar','MCA',3,'ZZ'),(10,'2018CA15','YASHVANT PATIDAR','MCA',3,'ZZ'),(11,'2018ca16','Abhishek Joshi','MCA',3,'ZZ'),(12,'2018CA17','YASH  MEHTA','MCA',3,'ZZ'),(13,'2018CA18','DEEPAK ANJANA','MCA',3,'ZZ'),(14,'2018CA19','RAHUL SINGH','MCA',3,'ZZ'),(15,'2018CA20','PAWAN KUMAR','MCA',3,'ZZ'),(16,'2018ca21','Dheeraj Kashyap','MCA',3,'ZZ'),(17,'2018ca22','SIMARPREET KAUR','MCA',3,'ZZ'),(18,'2018CA23','Prince Rawat','MCA',3,'ZZ'),(19,'2018CA24','PRADEEP KUMAR NAYAK','MCA',3,'ZZ'),(20,'2018CA25','Saroj  Kumari','MCA',3,'ZZ'),(21,'2018ca26','ABHISHEK  KEER','MCA',3,'ZZ'),(22,'2018CA27','DWARKESH KUMBHAKAR','MCA',3,'ZZ'),(23,'2018msc03','RICHA SINGH','MSc',3,'MSCOMP'),(24,'2018msc04','NAVEEN DIXIT','MSc',3,'MSCOMP'),(25,'2018msc05','ISHANI CHOUDHARY','MSc',3,'MSCOMP'),(26,'2018MSC06','APOORVA','MSc',3,'MSCOMP'),(27,'2018msc07','TANYA RASTOGI','MSc',3,'MSCOMP'),(28,'2018msc08','RADHIKA CHOWDHARY','MSc',3,'MSCOMP'),(29,'2018msc09','ROHIT KUSHWAHA','MSc',3,'MSCOMP'),(30,'2018msc10','SHRUTI','MSc',3,'MSCOMP'),(31,'2018msc11','SHRISHTI CHAMOLI','MSc',3,'MSCOMP'),(32,'2018msc12','KOMAL VERMA','MSc',3,'MSCOMP'),(33,'2018msc14','PRAVEEN','MSc',3,'MSCOMP'),(34,'2018msc15','SUSHANT YADAV','MSc',3,'MSCOMP'),(35,'2018msc16','PRIYANKA','MSc',3,'MSCOMP'),(36,'2018MSC17','VAMIKA RATHI','MSc',3,'MSCOMP'),(37,'2018MSC18','RAMSINGH Yadav','MSc',3,'MSCOMP'),(38,'2018msc19','UJJWAL VERMA','MSc',3,'MSCOMP'),(39,'2018MSC21','NAINA SHARMA','MSc',3,'MSCOMP'),(40,'2018mb17','ROHIT KUMAR SINGH','MBA',3,'ZZ'),(41,'2018mb19','JEEVAN KUMAR SINGH','MBA',3,'ZZ'),(42,'2018mb21','AVATANSH MALAVIYA','MBA',3,'ZZ'),(43,'2018mb22','PRAKHAR AGRAWAL','MBA',3,'ZZ'),(44,'2018mb23','ANILABH AGRAWAL','MBA',3,'ZZ'),(45,'2018mb24','Mayank Tripathi','MBA',3,'ZZ'),(46,'2018mb25','NITESH KUMAR','MBA',3,'ZZ'),(47,'2018mb26','RAJEEV NAYAN TRIPATHI','MBA',3,'ZZ'),(48,'2018mb27','SHILPA DOGRA','MBA',3,'ZZ'),(49,'2018mb28','ANURAG','MBA',3,'ZZ'),(50,'2018mb29','AKASH SINGH','MBA',3,'ZZ'),(51,'2018mb30','MONIKA SINHA','MBA',3,'ZZ'),(52,'2018MB31','KAUSTUBH TRIPATHI','MBA',3,'ZZ'),(53,'2018mb32','SRISHTY TRIPATHI','MBA',3,'ZZ'),(54,'2018mb33','AKANKSHA SHUKLA','MBA',3,'ZZ'),(55,'2018mb34','MOHINI GUPTA','MBA',3,'ZZ'),(56,'2018mb35','MUDITA SINGH','MBA',3,'ZZ'),(57,'2018MB42','AKANKSHA BHARATI','MBA',3,'ZZ'),(58,'2019CA01','PRIYANSHU BAJPAI','MCA',1,'ZZ'),(59,'2019CA02','NIKITA KUSHWAH','MCA',1,'ZZ'),(60,'2019CA03','SHIVANI PATIDAR','MCA',1,'ZZ'),(61,'2019CA04','VRINDA DHINGRA','MCA',1,'ZZ'),(62,'2019CA05','PRATEEK KATIYAR','MCA',1,'ZZ'),(63,'2019CA06','PRANJAL AWASTHI','MCA',1,'ZZ'),(64,'2019CA07','AAYUSHI BARFA','MCA',1,'ZZ'),(65,'2019CA08','RISHABH RATAN','MCA',1,'ZZ'),(66,'2019CA09','VISHWANATH ORAON','MCA',1,'ZZ'),(67,'2019CA10','SHAIFALI GUPTA','MCA',1,'ZZ'),(68,'2019CA11','MADHUBALA BIRLA','MCA',1,'ZZ'),(69,'2019CA12','HARMAN SINGH','MCA',1,'ZZ'),(70,'2019CA13','KRISHNA SINGH','MCA',1,'ZZ'),(71,'2019MSC01','Disha Varshney','MSc',1,'MSCOMP'),(72,'2019MSC02','NEHA','MSc',1,'MSCOMP'),(73,'2019MSC03','YASHIKA AGARWAL','MSc',1,'MSCOMP'),(74,'2019MSC04','ANUP SINGH','MSc',1,'MSCOMP'),(75,'2019MSC05','VIRENDRA SAGAR','MSc',1,'MSCOMP'),(76,'2019MSC06','CHHATRA PAL SINGH','MSc',1,'MSCOMP'),(77,'2019MSC07','ANSHIKA YADAV','MSc',1,'MSCOMP'),(78,'2019MSC08','MOHD AHSAN','MSc',1,'MSCOMP'),(79,'2019MSC09','PULKIT VARSHNEY','MSc',1,'MSCOMP'),(80,'2019MSC11','VIPINESH KUMAR GIRI','MSc',1,'MSCOMP'),(81,'2019MSC12','RINKI SHARMA','MSc',1,'MSCOMP'),(82,'2019MSC13','URVASHI MAURYA','MSc',1,'MSCOMP'),(83,'2019MSC14','SUBHASH JANGID','MSc',1,'MSCOMP'),(84,'2019MB21','RUPESH RANJAN','MBA',1,'ZZ'),(85,'2019MB22','SALONI SINGH','MBA',1,'ZZ'),(86,'2019MB23','DHEERAJ KUMAR','MBA',1,'ZZ'),(87,'2019MB24','NIRJHAR MALIK','MBA',1,'ZZ'),(88,'2019MB25','SAURABH BANGABASH','MBA',1,'ZZ'),(89,'2019MB26','Anil Kumar Poddar','MBA',1,'ZZ'),(90,'2019MB29','RUPA KUMARI','MBA',1,'ZZ'),(91,'2019MB30','PREETI KUMARI','MBA',1,'ZZ'),(92,'2019MB31','SHIKHAR AGARWAL','MBA',1,'ZZ'),(93,'2019MB32','AYUSH PANDEY','MBA',1,'ZZ'),(94,'2019MB33','PRACHI NARAYAN','MBA',1,'ZZ'),(95,'2019MB34','NAMAN SHUKLA','MBA',1,'ZZ'),(96,'2019MB35','SATYA BROT SEN','MBA',1,'ZZ'),(97,'2019MB36','ROHIT GUPTA','MBA',1,'ZZ');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `uid` varchar(255) default NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) default NULL,
  `fullname` varchar(100) default NULL,
  `email` varchar(100) default NULL,
  `mobile` varchar(15) default NULL,
  `city` varchar(100) default NULL,
  PRIMARY KEY  (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('5ff72f','dd','dd','dd gour','dd@gmail.com','75675757575','shr'),('8f5559','deen','deen','deen gour','deen@gmail.com','9893385748','bpl'),('75ae58','ram','ram','ram singh','ram@gmail.com','76864467','UK');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-02 16:01:46
