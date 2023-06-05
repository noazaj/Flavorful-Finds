-- MariaDB dump 10.19  Distrib 10.6.12-MariaDB, for Linux (x86_64)
--
-- Host: classmysql.engr.oregonstate.edu    Database: cs340_zajicekn
-- ------------------------------------------------------
-- Server version	10.6.12-MariaDB-log

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
-- Table structure for table `Equipment`
--

DROP TABLE IF EXISTS `Equipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Equipment` (
  `equipmentID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`equipmentID`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Equipment`
--

LOCK TABLES `Equipment` WRITE;
/*!40000 ALTER TABLE `Equipment` DISABLE KEYS */;
INSERT INTO `Equipment` VALUES (1,'Knife','A sharp kitchen knife for slicing and mincing. Make sure to be careful when using!'),(2,'Saucepan','A medium-sized saucepan for cooking'),(3,'Wok','A non-stick wok for all your stir fry and ramen'),(4,'Mixing Bowl','A large mixing bowl for combining ingredients'),(5,'Oven','A standard kitchen oven for baking and roasting');
/*!40000 ALTER TABLE `Equipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Ingredients`
--

DROP TABLE IF EXISTS `Ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Ingredients` (
  `ingredientID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  PRIMARY KEY (`ingredientID`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ingredients`
--

LOCK TABLES `Ingredients` WRITE;
/*!40000 ALTER TABLE `Ingredients` DISABLE KEYS */;
INSERT INTO `Ingredients` VALUES (1,'Spinich','Vegetable'),(2,'Ground Beef','Meat'),(3,'Tomato','Vegetable'),(4,'Onion','Vegetable'),(5,'Garlic','Vegetable'),(6,'Noodles','Pasta'),(7,'Bell Pepper','Vegetable'),(8,'Soy Sauce','Condiment'),(9,'Vegetable Oil','Oil'),(10,'Bread','Bakery'),(12,'Butter','Dairy'),(13,'Chicken','Meat'),(14,'Lettuce','Vegetable'),(15,'Caesar Dressing','Condiment'),(16,'Parmesan Cheese','Dairy'),(17,'Flour','Bakery'),(18,'Sugar','Baking'),(19,'Chocolate Chips','Baking'),(20,'Milk','Dairy'),(21,'Rice','Grain');
/*!40000 ALTER TABLE `Ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Ratings`
--

DROP TABLE IF EXISTS `Ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Ratings` (
  `ratingID` int(11) NOT NULL AUTO_INCREMENT,
  `rating` int(11) NOT NULL,
  `review` text DEFAULT NULL,
  `userID` int(11) NOT NULL,
  `recipeID` int(11) NOT NULL,
  PRIMARY KEY (`ratingID`),
  KEY `userID` (`userID`),
  KEY `recipeID` (`recipeID`),
  CONSTRAINT `Ratings_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `Users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Ratings_ibfk_2` FOREIGN KEY (`recipeID`) REFERENCES `Recipes` (`recipeID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ratings`
--

LOCK TABLES `Ratings` WRITE;
/*!40000 ALTER TABLE `Ratings` DISABLE KEYS */;
INSERT INTO `Ratings` VALUES (1,5,'Delicious and easy to make!',3,1),(3,3,'Good for a quick meal, but nothing special.',1,3),(4,5,'My new favorite salad recipe!',2,4);
/*!40000 ALTER TABLE `Ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Recipe_has_Equipment`
--

DROP TABLE IF EXISTS `Recipe_has_Equipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Recipe_has_Equipment` (
  `recipeEquipmentID` int(11) NOT NULL AUTO_INCREMENT,
  `recipeID` int(11) DEFAULT NULL,
  `equipmentID` int(11) DEFAULT NULL,
  PRIMARY KEY (`recipeEquipmentID`),
  UNIQUE KEY `recipeEquipmentID` (`recipeEquipmentID`),
  KEY `recipeID` (`recipeID`),
  KEY `equipmentID` (`equipmentID`),
  CONSTRAINT `Recipe_has_Equipment_ibfk_1` FOREIGN KEY (`recipeID`) REFERENCES `Recipes` (`recipeID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Recipe_has_Equipment_ibfk_2` FOREIGN KEY (`equipmentID`) REFERENCES `Equipment` (`equipmentID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Recipe_has_Equipment`
--

LOCK TABLES `Recipe_has_Equipment` WRITE;
/*!40000 ALTER TABLE `Recipe_has_Equipment` DISABLE KEYS */;
INSERT INTO `Recipe_has_Equipment` VALUES (1,1,1),(2,1,2),(3,1,5),(4,2,1),(5,2,3),(6,3,1),(7,3,4),(8,3,5),(9,4,1),(10,4,3),(11,NULL,1),(12,NULL,4),(13,NULL,5);
/*!40000 ALTER TABLE `Recipe_has_Equipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Recipe_has_Ingredients`
--

DROP TABLE IF EXISTS `Recipe_has_Ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Recipe_has_Ingredients` (
  `recipeIngredientID` int(11) NOT NULL AUTO_INCREMENT,
  `recipeID` int(11) DEFAULT NULL,
  `ingredientID` int(11) DEFAULT NULL,
  `quantity` float NOT NULL,
  PRIMARY KEY (`recipeIngredientID`),
  UNIQUE KEY `recipeIngredientID` (`recipeIngredientID`),
  KEY `recipeID` (`recipeID`),
  KEY `ingredientID` (`ingredientID`),
  CONSTRAINT `Recipe_has_Ingredients_ibfk_1` FOREIGN KEY (`recipeID`) REFERENCES `Recipes` (`recipeID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Recipe_has_Ingredients_ibfk_2` FOREIGN KEY (`ingredientID`) REFERENCES `Ingredients` (`ingredientID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Recipe_has_Ingredients`
--

LOCK TABLES `Recipe_has_Ingredients` WRITE;
/*!40000 ALTER TABLE `Recipe_has_Ingredients` DISABLE KEYS */;
INSERT INTO `Recipe_has_Ingredients` VALUES (1,1,1,200),(2,1,2,500),(3,1,3,150),(4,1,4,100),(5,1,5,50),(6,2,6,400),(7,2,7,200),(8,2,8,100),(9,2,9,50),(10,3,10,200),(11,3,NULL,100),(12,3,12,50),(13,4,13,500),(14,4,14,300),(15,4,15,200),(16,4,16,100),(17,NULL,17,300),(18,NULL,18,250),(19,NULL,12,50),(20,NULL,19,100);
/*!40000 ALTER TABLE `Recipe_has_Ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Recipes`
--

DROP TABLE IF EXISTS `Recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Recipes` (
  `recipeID` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `dietary_restriction` text DEFAULT NULL,
  `instruction` text NOT NULL,
  `prep_time` int(11) NOT NULL,
  `cook_time` int(11) NOT NULL,
  `serving` int(11) DEFAULT NULL,
  `userID` int(11) NOT NULL,
  PRIMARY KEY (`recipeID`),
  UNIQUE KEY `title` (`title`),
  KEY `userID` (`userID`),
  CONSTRAINT `Recipes_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `Users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Recipes`
--

LOCK TABLES `Recipes` WRITE;
/*!40000 ALTER TABLE `Recipes` DISABLE KEYS */;
INSERT INTO `Recipes` VALUES (1,'Spaghetti with Meat sauce','Classic spaghetti with spicy meat sauce',NULL,'Cook the spaghetti according to package instructions...',15,30,4,1),(2,'Homemade Ramen','Tasty, homemade ramen with a thai twist!','Gluten-free','Start by getting gluten-free flour...',20,20,4,2),(3,'Grilled Cheese Sandwich','Simple and quick grilled cheese sandwich',NULL,'Butter one side of each bread slice...',5,10,1,3),(4,'Chicken Caesar Salad','A healthy and tasty Caesar salad',NULL,'Wash greens before setting into bowl...',15,15,4,4);
/*!40000 ALTER TABLE `Recipes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'John Does','john.doe@email1113.com','password123!?'),(2,'Jane Doe','jane.doe@yahoo.com','Password123!@'),(3,'Mike Will','michaelw@gmail.com','VeryStrongPassword00$'),(4,'Peter Parker','peterpark@outlook.com','SpiderMan1!');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-05 16:10:01
