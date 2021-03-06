-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: doantttn1
-- ------------------------------------------------------
-- Server version	8.0.25

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
-- Table structure for table `ct_dondathang`
--

DROP TABLE IF EXISTS `ct_dondathang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ct_dondathang` (
  `MADONG` char(10) NOT NULL,
  `MADDH` char(10) NOT NULL,
  `SOLUONG` int DEFAULT NULL,
  `GIA` float DEFAULT NULL,
  PRIMARY KEY (`MADONG`,`MADDH`),
  KEY `MADDH_idx` (`MADDH`),
  CONSTRAINT `MADONG` FOREIGN KEY (`MADONG`) REFERENCES `dongruou` (`MADONG`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ct_dondathang`
--

LOCK TABLES `ct_dondathang` WRITE;
/*!40000 ALTER TABLE `ct_dondathang` DISABLE KEYS */;
/*!40000 ALTER TABLE `ct_dondathang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ct_khuyenmai`
--

DROP TABLE IF EXISTS `ct_khuyenmai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ct_khuyenmai` (
  `MAKM` char(10) NOT NULL,
  `MADONG` char(10) NOT NULL,
  `PHANTRAMGIAM` int DEFAULT NULL,
  PRIMARY KEY (`MAKM`,`MADONG`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ct_khuyenmai`
--

LOCK TABLES `ct_khuyenmai` WRITE;
/*!40000 ALTER TABLE `ct_khuyenmai` DISABLE KEYS */;
INSERT INTO `ct_khuyenmai` VALUES ('002','004',20),('003','007',50),('003','009',50),('003','011',50),('003','012',50),('003','015',55),('004','002',15),('004','005',15),('004','010',15),('004','013',15);
/*!40000 ALTER TABLE `ct_khuyenmai` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ct_phieudat`
--

DROP TABLE IF EXISTS `ct_phieudat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ct_phieudat` (
  `IDCTPD` int NOT NULL AUTO_INCREMENT,
  `MAPD` char(20) NOT NULL,
  `MADONG` char(10) NOT NULL,
  `SOLUONG` int DEFAULT NULL,
  `GIA` float DEFAULT NULL,
  `TRANGTHAI` varchar(45) DEFAULT NULL,
  `MANVDH` char(10) DEFAULT NULL,
  `MANVGH` char(10) DEFAULT NULL,
  PRIMARY KEY (`IDCTPD`,`MAPD`,`MADONG`),
  KEY `MADONG_idx` (`MADONG`),
  KEY `MAPD_idx` (`MAPD`),
  CONSTRAINT `FK_MADONG` FOREIGN KEY (`MADONG`) REFERENCES `dongruou` (`MADONG`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_MAPD` FOREIGN KEY (`MAPD`) REFERENCES `phieudat` (`MAPD`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=148 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ct_phieudat`
--

LOCK TABLES `ct_phieudat` WRITE;
/*!40000 ALTER TABLE `ct_phieudat` DISABLE KEYS */;
INSERT INTO `ct_phieudat` VALUES (121,'9dgsO5pE3U','007',1,13.495,'???? giao','001','003'),(122,'9dgsO5pE3U','009',1,57,'???? giao','001','003'),(123,'9dgsO5pE3U','011',1,12.495,'???? giao','001','003'),(124,'X9K5vMjJSo','009',1,57,'???? giao','001','003'),(125,'X9K5vMjJSo','015',2,16.6455,'???? giao','001','003'),(126,'u8qpi6CEfi','007',4,13.495,'???? giao','001','003'),(127,'u8qpi6CEfi','017',3,13.99,'???? giao','001','003'),(128,'u8qpi6CEfi','018',3,236,'???? giao','001','003'),(129,'u8qpi6CEfi','019',3,59.99,'???? giao','001','003'),(130,'X2jJCuQm1T','020',1,63.99,'???? giao','001','003'),(131,'X2jJCuQm1T','021',1,28.99,'???? giao','001','003'),(132,'X2jJCuQm1T','022',1,35.99,'???? giao','001','003'),(133,'X2jJCuQm1T','023',4,21.99,'???? giao','001','003'),(134,'X2jJCuQm1T','025',3,50.99,'???? giao','001','003'),(135,'X2jJCuQm1T','026',3,46.99,'???? giao','001','003'),(136,'X2jJCuQm1T','027',2,16.99,'???? giao','001','003'),(137,'zOKT9PWVzs','017',1,13.99,'???? giao','001','003'),(138,'mADOojURxz','023',1,21.99,'???? giao','001','003'),(139,'mADOojURxz','007',1,13.495,'???? giao','001','003'),(140,'duWmipKsBV','007',1,13.495,'???? giao','001','003'),(141,'dThCf7e2cO','021',3,28.99,'???? giao','001','003'),(142,'dThCf7e2cO','022',1,35.99,'???? giao','001','003'),(143,'23dHqEtK2d','007',2,13.495,'Ch??a duy???t',NULL,NULL),(144,'23dHqEtK2d','023',1,21.99,'Ch??a duy???t',NULL,NULL),(145,'23dHqEtK2d','017',1,13.99,'Ch??a duy???t',NULL,NULL),(146,'WP69Nqq1jp','017',1,13.99,'Ch??a duy???t',NULL,NULL),(147,'WP69Nqq1jp','007',2,13.495,'Ch??a duy???t',NULL,NULL);
/*!40000 ALTER TABLE `ct_phieudat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ct_phieunhap`
--

DROP TABLE IF EXISTS `ct_phieunhap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ct_phieunhap` (
  `MAPN` char(10) NOT NULL,
  `MADONG` char(10) NOT NULL,
  `SOLUONG` int DEFAULT NULL,
  `GIA` float DEFAULT NULL,
  PRIMARY KEY (`MAPN`,`MADONG`),
  KEY `MADONG_idx` (`MADONG`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ct_phieunhap`
--

LOCK TABLES `ct_phieunhap` WRITE;
/*!40000 ALTER TABLE `ct_phieunhap` DISABLE KEYS */;
/*!40000 ALTER TABLE `ct_phieunhap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ct_phieutra`
--

DROP TABLE IF EXISTS `ct_phieutra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ct_phieutra` (
  `MAPT` char(10) NOT NULL,
  `IDCTPD` char(10) NOT NULL,
  `SOLUONG` int DEFAULT NULL,
  PRIMARY KEY (`MAPT`,`IDCTPD`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ct_phieutra`
--

LOCK TABLES `ct_phieutra` WRITE;
/*!40000 ALTER TABLE `ct_phieutra` DISABLE KEYS */;
/*!40000 ALTER TABLE `ct_phieutra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cungcap`
--

DROP TABLE IF EXISTS `cungcap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cungcap` (
  `MANCC` char(10) NOT NULL,
  `MADONG` char(10) NOT NULL,
  `GIA` float DEFAULT NULL,
  PRIMARY KEY (`MANCC`,`MADONG`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cungcap`
--

LOCK TABLES `cungcap` WRITE;
/*!40000 ALTER TABLE `cungcap` DISABLE KEYS */;
/*!40000 ALTER TABLE `cungcap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `danhgia`
--

DROP TABLE IF EXISTS `danhgia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `danhgia` (
  `idComment` int NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `ten` varchar(50) NOT NULL,
  `email` varchar(45) NOT NULL,
  `date` datetime NOT NULL,
  `rating` int NOT NULL,
  `idProduct` char(20) NOT NULL,
  PRIMARY KEY (`idComment`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danhgia`
--

LOCK TABLES `danhgia` WRITE;
/*!40000 ALTER TABLE `danhgia` DISABLE KEYS */;
INSERT INTO `danhgia` VALUES (1,'R?????u r???t ngon, u???ng l???nh tuy???t v???i!!!','Khang','HoangKhang1999ag@gmail.com','2021-09-01 13:28:39',5,'002'),(3,'T???m ???????c!!!','Tu???n','tuan@gmail.com','2021-09-01 13:32:56',3,'002'),(4,'R???t h???p u???ng l???nh, m???i ng?????i n??n mua!!!','Ho??ng Nga','NgaHoang@gmail.com','2021-09-01 13:35:48',4,'002'),(5,'R?????u n??y u???ng c???c ????!','Ph?? H??ng','HN@gmail.com','2021-09-01 13:36:58',5,'017'),(6,'U???ng h???p. V???a t??i ti???n','??n','ntf@gmail.com','2021-09-01 13:40:16',5,'013'),(7,'Tuy???t. Ngon!!!','Khang','HoangKhang1999ag@gmail.com','2021-09-04 21:54:41',5,'009'),(8,'R?????u ngon. R???t ????ng ?????ng ti???n.','Ph??c','ntf@gmail.com','2021-09-06 12:08:14',5,'007');
/*!40000 ALTER TABLE `danhgia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dondathang`
--

DROP TABLE IF EXISTS `dondathang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dondathang` (
  `MADDH` char(10) NOT NULL,
  `NGAYDAT` date DEFAULT NULL,
  `MANV` char(10) NOT NULL,
  `MANCC` char(10) NOT NULL,
  PRIMARY KEY (`MADDH`),
  KEY `MANCC_idx` (`MANCC`),
  KEY `MANV_idx` (`MANV`),
  CONSTRAINT `MANCC` FOREIGN KEY (`MANCC`) REFERENCES `nhacungcap` (`MANCC`),
  CONSTRAINT `MANV` FOREIGN KEY (`MANV`) REFERENCES `nhanvien` (`MANV`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dondathang`
--

LOCK TABLES `dondathang` WRITE;
/*!40000 ALTER TABLE `dondathang` DISABLE KEYS */;
/*!40000 ALTER TABLE `dondathang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dongruou`
--

DROP TABLE IF EXISTS `dongruou`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dongruou` (
  `MADONG` char(10) NOT NULL,
  `TENDONG` varchar(100) DEFAULT NULL,
  `GIA` float DEFAULT NULL,
  `TRANGTHAI` varchar(45) DEFAULT NULL,
  `HINHANH` varchar(45) DEFAULT NULL,
  `MOTA` varchar(45) DEFAULT NULL,
  `CHITIET` varchar(500) DEFAULT NULL,
  `SOLUONGTON` int DEFAULT NULL,
  `MALOAI` char(10) DEFAULT NULL,
  `MATH` char(10) DEFAULT NULL,
  `MANCC` char(10) DEFAULT NULL,
  PRIMARY KEY (`MADONG`),
  KEY `MATH_idx` (`MATH`),
  KEY `MALOAI_idx` (`MALOAI`),
  CONSTRAINT `MALOAI` FOREIGN KEY (`MALOAI`) REFERENCES `loairuou` (`MALOAI`),
  CONSTRAINT `MATH` FOREIGN KEY (`MATH`) REFERENCES `thuonghieu` (`MATH`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dongruou`
--

LOCK TABLES `dongruou` WRITE;
/*!40000 ALTER TABLE `dongruou` DISABLE KEYS */;
INSERT INTO `dongruou` VALUES ('001','R??my Martin',23,'Ch??a c?? h??ng','img/ruou1.png','700 ml / 41%','R?????u Remy Martin VSOP l?? d??ng cognac c??? ??i???n v?? nh?? Cognac b??n ch???y nh???t to??n c???u, ?????c bi???t l?? t???i th??? tr?????ng M???. Chai Remy Martin VSOP 2014 v???n ki???u chai c??? ??i???n, ????ng chai 70cl, 40%, nh??n chai c?? v??i bi???n t???u tr??ng hi???n ?????i h??n. Tuy nhi??n c??ng ngh??? ch???ng gi??? cho nh???ng th??? tr?????ng Vietnam th?? ch??a th???y h??ng ??p d???ng ri??ng. ???????c nh???p ch??nh ng???ch b???i Remy VietNam v?? ch???t l?????ng s???n ph???m n??y ???n ?????nh l?? ??i???m c???ng ????? gi??? ch??n nh???ng kh??ch h??ng trung th??nh d??ng cognac thanh tao v?? ?????m m?????t n??y.',NULL,'006','007',NULL),('002','Hennessy V.S Cognac',219,NULL,'img/ruou2.png','700 ml / 40%',NULL,90,'006','005','002'),('003','Camus Cognac Borderies XO',175,NULL,'img/ruou3.png','700 ml / 40%',NULL,50,'006','003','001'),('004','Belasco Llma Cognac',241,NULL,'img/ruou4.png','700 ml / 40%',NULL,30,'006','008','003'),('005','Belasco Llma Cognac X',149,NULL,'img/ruou5.png','700 ml / 40%',NULL,40,'006','008','002'),('006','Vodka Ciroc 6 l??t',400,'','img/ruou-vodka-ciroc-6-lit.png','6000 ml / 41%','R?????u Vodka C??roc ???????c coi l?? lo???i vodka \"c???c k??? cao c???p\" c???a Ph??p ???????c l??m t??? nh???ng qu??? nh?? ngon nh???t c???a Ph??p, ???????c s???n xu???t t???i nh?? m??y Distillerie de Chevanceaux, mi???n Nam n?????c Ph??p,thay v?? nh???ng nguy??n li???u truy???n th???ng nh?? ng??, cao l????ng, l??a m???ch, l??a m??? hay khoai t??y.',NULL,'008','004',NULL),('007','Chivas Extra',26.99,NULL,'img/ruou7.jpg','700 ml / 40%',NULL,50,'001','006','001'),('008','Chivas Extra 13 n??m Sherry Cask',30.99,'','img/ruou8.jpg','700 ml / 41%','R?????u Chivas Extra 13 n??m Oloroso Sherry Cask, con s??? 13 l???y c???m h???ng t??? 13 King Street Emporium ??? Aberdeen c???a anh em nh?? Chivas. Chivas 13 Oloroso Sherry Cask ???????c ??? trong th??ng Oloroso sherry cask, l?? lo???i th??ng cho ra r?????u whisky ngon nh???t c??ng l?? lo???i th??ng ??? whisky m???c nh???t.',150,'001','006','001'),('009','Chivas 21 n??m MALTS BLEND',115,'','img/ruou9.jpg','700 ml / 40%','',80,'001','006','001'),('010','DOMAINE DES GRAVES D???ARDONNEAU CUVEE PRESTIGE BLAYE',29.99,'','img/ruou10.jpg','700 ml / 42%','',100,'002','009','003'),('011','CHATEAU LA GAMAYE',24.99,'','img/ruou11.jpg','700 ml / 45%','',200,'002','009','003'),('012','HEINRICH ZWEIGELT',38.99,'','img/ruou12.jpg','750 ml / 13%','',150,'002','009','003'),('013','FLEUR DU CAP SHIRAZ',26.99,'','img/ruou13.jpg','750 ml / 14%','',200,'002','009','003'),('014','CHATEAU HAUT SELVE GRAVES WHITE',46.99,'','img/ruou14.jpg','750 ml / 13%','',100,'003','009','003'),('015','CHATEAU DE CHANTEGRIVE GRAVES WHITE',36.99,'','img/ruou15.jpg','750 ml / 13%','',120,'003','009','003'),('016','BARON PHILIPPE DE ROTHSCHILD BORDEAUX WHITE',18.99,'','img/ruou16.jpg','750 ml / 13%','',80,'003','009','003'),('017','MALIBU',13.99,'','img/ruou17.jpg','700 ml / 21%','',200,'004','010','001'),('018','APPLETON ESTATE 30 N??M',236,NULL,'img/ruou18.jpg','700 ml / 43%',NULL,100,'004','011','001'),('019','APPLETON ESTATE 12 N??M',59.99,NULL,'img/ruou19.jpg','700 ml / 43%',NULL,120,'004','011','001'),('020','BACARDI 10 N??M - GRAN RESERVA DIEZ',63.99,NULL,'img/ruou20.jpg','700 ml / 40%',NULL,130,'005','002','001'),('021','BACARDI CARTA NEGRA BLACK',28.99,NULL,'img/ruou21.jpg','700 ml / 40%',NULL,20,'005','002','001'),('022','BACARDI ANEJO CUATRO 4 N??M',35.99,NULL,'img/ruou22.jpg','700 ml / 40%',NULL,60,'005','002','001'),('023','Vodka Smirnoff Red',21.99,'','img/VodkaSmirnoffRed.jpg','700ml / 45%',NULL,NULL,'008','013',NULL),('024','Chivas 18 n??m',50.99,'Ch??a c?? h??ng','img/chivas-18.jpg','700ml / 40%','R?????u Chivas 18 n??m l?? d??ng Whisky ph???i tr???n xu???t s???c v?? n???i ti???ng nh???t hi???n nay.Trong t???ng gi???t r?????u ???????c ??? ??t nh???t 18 n??m trong th??ng g??? s???i s??? cho ra nhi???u t???ng l???p h????ng v??? kh??c nhau khi th?????ng th???c.',NULL,'001','006',NULL),('025','Vodka Ciroc',50.99,'Ch??a c?? h??ng','img/ruou-vodka-ciroc.jpg','750ml /40%',NULL,NULL,'008','004',NULL),('026','Vodka Ciroc Peach',46.99,'Ch??a c?? h??ng','img/ruou-vodka-ciroc-peach.jpg','750ml / 37,5%',NULL,NULL,'008','004',NULL),('027','Vodka Absolut Kurant',16.99,'Ch??a c?? h??ng','img/ruou-vodka-absolut-kurant.jpg','750ml /40%',NULL,NULL,'008','014',NULL),('028','Royal Salute 21 Beach POLO Edition',153,'Ch??a c?? h??ng','img/ruou6.jpg','700ml / 40%','Royal Salute 21 n??m Beach Polo Edition, trong seri Polo Edition ph??t h??nh n??m 2018.',NULL,'001','006',NULL),('029','ARMAGNAC LARRESSINGLE VSOP',83.99,'Ch??a c?? h??ng','img/Armagnac-Larressingle-VSOP.jpg','700ml / 40%',NULL,NULL,'011','015',NULL),('030','CHATEAU LAUBADE BAS ARMAGNAC 1986',274,'Ch??a c?? h??ng','img/Chateau-Laubade-Bas-Armagnac-1986.jpg','700ml / 40%',NULL,NULL,'011','016',NULL),('031','CHATEAU LAUBADE BAS ARMAGNAC 1962',876,'Ch??a c?? h??ng','img/Chateau-Laubade-Bas-Armagnac-1962.jpg','500 ml / 40%',NULL,NULL,'011','016',NULL),('032','CHATEAU LAUBADE BAS ARMAGNAC 1950',2411,'Ch??a c?? h??ng','img/Chateau-Laubade-Bas-Armagnac-1950.jpg','500 ml / 40%',NULL,NULL,'011','016',NULL),('033','Vodka Absolut Raspberri',18,NULL,'img/ruou-vodka-absolut-raspberri-dau.png','750 ml / 40%',NULL,NULL,'008','014',NULL);
/*!40000 ALTER TABLE `dongruou` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hoadon`
--

DROP TABLE IF EXISTS `hoadon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hoadon` (
  `MAHD` char(20) NOT NULL,
  `NGAY` date DEFAULT NULL,
  `THANHTIEN` float DEFAULT NULL,
  `MASOTHUE` varchar(45) DEFAULT NULL,
  `MANV` char(10) DEFAULT NULL,
  `MAPD` char(20) NOT NULL,
  PRIMARY KEY (`MAHD`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoadon`
--

LOCK TABLES `hoadon` WRITE;
/*!40000 ALTER TABLE `hoadon` DISABLE KEYS */;
INSERT INTO `hoadon` VALUES ('39fa24f64a',NULL,68.97,NULL,NULL,'23dHqEtK2d'),('50a9e68467','2021-08-31',544.85,'209699211','001','X2jJCuQm1T'),('5876d15157','2021-09-01',15.49,'2603402280','001','duWmipKsBV'),('98b740924c','2021-08-31',88.99,'3859027312','001','9dgsO5pE3U'),('c052b6883a','2021-08-31',983.92,'9258502174','001','u8qpi6CEfi'),('dd13704b39',NULL,44.98,NULL,NULL,'WP69Nqq1jp'),('e42345d6f3','2021-09-04',126.96,'8698021699','001','dThCf7e2cO'),('e71fd58853','2021-08-31',94.29,'6632945714','001','X9K5vMjJSo'),('ea27d1d686','2021-08-31',15.99,'3726525201','001','zOKT9PWVzs'),('fa687eca64','2021-09-01',39.48,'1691177134','001','mADOojURxz');
/*!40000 ALTER TABLE `hoadon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khachhang`
--

DROP TABLE IF EXISTS `khachhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `khachhang` (
  `MAKH` char(10) NOT NULL,
  `HO` varchar(45) DEFAULT NULL,
  `TEN` varchar(15) DEFAULT NULL,
  `GIOITINH` varchar(5) DEFAULT NULL,
  `NGAYSINH` datetime DEFAULT NULL,
  `DIACHI` varchar(200) DEFAULT NULL,
  `SDT` varchar(20) DEFAULT NULL,
  `EMAIL` varchar(45) DEFAULT NULL,
  `USERNAME` varchar(20) DEFAULT NULL,
  `PASSWORD` varchar(255) DEFAULT NULL,
  `MANQ` char(10) DEFAULT NULL,
  PRIMARY KEY (`MAKH`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khachhang`
--

LOCK TABLES `khachhang` WRITE;
/*!40000 ALTER TABLE `khachhang` DISABLE KEYS */;
INSERT INTO `khachhang` VALUES ('004','Phan Th??nh','Kh??ng','Nam','1995-09-09 00:00:00','47/8E ???????ng 104 Ph?????ng T??ng Nh??n Ph?? A, qu???n 9, th??nh Ph??? Th??? ?????c','0344788654','ThanhKhang1232@gmail.com','khang1','$2b$10$9GHMhSlMAbRxRHLVG3hRTefJ/pslsnzSB3bgh8NQ7hrQ3n7/k80aC','1'),('005','Nguy???n Ho??ng','Khang','Nam','1999-09-09 00:00:00','s??? 45 ???p Ph?? An A, x?? Ph?? V??nh, th??? x?? T??n Ch??u t???nh An Giang','0338744192','HoangKhang1999ag@gmail.com','khang123','$2b$10$JU9p3/m86YusoT0EVlwGrOUm6JPmH75H.c5XWZTQjTX26psKrdioO','1'),('006','Nguy???n Ho??ng Thi???n','??n','Nam','1995-09-09 00:00:00','30/12 Qu???n B??nh Th???nh, th??nh ph??? H??? Ch?? Minh','0999877333','ntf@gmail.com','an123','$2b$10$dSPPxX4hIBXyWISAnK.DdeNPihn5NkDmsuodcyEwai5NzwVX.5Aki','1'),('007','Tr????ng',' Phong','Nam','1999-08-06 00:00:00','35 B??nh Th???nh H??? Ch?? Minh','0989776545','Tphong@gmail.com','phong1','$2b$10$TwB7JdYYXTSNa2p74OjdFuVxQ9g6FTenvv4Ma3GPkUBUO4ZSJAQSy','1');
/*!40000 ALTER TABLE `khachhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khuyenmai`
--

DROP TABLE IF EXISTS `khuyenmai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `khuyenmai` (
  `MAKM` char(10) NOT NULL,
  `TENKM` varchar(45) DEFAULT NULL,
  `NGAYBATDAU` date DEFAULT NULL,
  `NGAYKETTHUC` date DEFAULT NULL,
  `LIDO` varchar(200) DEFAULT NULL,
  `MANV` char(10) DEFAULT NULL,
  PRIMARY KEY (`MAKM`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khuyenmai`
--

LOCK TABLES `khuyenmai` WRITE;
/*!40000 ALTER TABLE `khuyenmai` DISABLE KEYS */;
INSERT INTO `khuyenmai` VALUES ('001','Sale up Summer','2021-07-29','2021-09-01','Covid khuy???n m??i','001'),('002','Sale up Winter','2021-12-01','2022-01-01','Khuy???n m??i cho Noel','001'),('003','Sale up bonus 50%','2021-08-10','2021-09-30','Gi???m gi?? si??u kh???ng','001'),('004','Sale New Year','2022-01-01','2022-02-28','Khuy???n m??i ?????u n??m','001');
/*!40000 ALTER TABLE `khuyenmai` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loairuou`
--

DROP TABLE IF EXISTS `loairuou`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loairuou` (
  `MALOAI` char(10) NOT NULL,
  `TENLOAI` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`MALOAI`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loairuou`
--

LOCK TABLES `loairuou` WRITE;
/*!40000 ALTER TABLE `loairuou` DISABLE KEYS */;
INSERT INTO `loairuou` VALUES ('001','Whisky'),('002','Vang ?????'),('003','Vang tr???ng'),('004','Rum'),('005','Tequilla'),('006','Cognag'),('007','Champagne'),('008','Vodka'),('009','Grappa'),('010','Scotch'),('011','Armagnac');
/*!40000 ALTER TABLE `loairuou` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nhacungcap`
--

DROP TABLE IF EXISTS `nhacungcap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nhacungcap` (
  `MANCC` char(10) NOT NULL,
  `TENNCC` varchar(45) DEFAULT NULL,
  `DIACHI` varchar(200) DEFAULT NULL,
  `EMAIL` varchar(45) DEFAULT NULL,
  `SDT` char(20) DEFAULT NULL,
  PRIMARY KEY (`MANCC`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='			\n';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nhacungcap`
--

LOCK TABLES `nhacungcap` WRITE;
/*!40000 ALTER TABLE `nhacungcap` DISABLE KEYS */;
INSERT INTO `nhacungcap` VALUES ('001','Bia S??i G??n','Qu???n  7, th??nh ph??? HCM','BiaSG@gmail.com','0222897665'),('002','Phong Ph??','23 T??ng Nh??n Ph?? A, qu???n 9','HN@gmail.com','0922335555'),('003','An Giang1','Long Xuy??n, An Giang','AG122@gmail.com','0338766521'),('004','T??n Th??nh','65 T??n Ph??, TP HCM','NgaHoang@gmail.com','0934778654'),('005','Ph?? H??ng','H?? N???i','PH@gmail.com','0934324324'),('006','Bia Ph?? Qu???c','Ph?? Qu???c, Ki??n Giang','PQ122@gmail.com','0333722899');
/*!40000 ALTER TABLE `nhacungcap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nhanvien`
--

DROP TABLE IF EXISTS `nhanvien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nhanvien` (
  `MANV` char(10) NOT NULL,
  `HO` varchar(45) DEFAULT NULL,
  `TEN` varchar(15) DEFAULT NULL,
  `GIOITINH` varchar(5) DEFAULT NULL,
  `NGAYSINH` datetime DEFAULT NULL,
  `DIACHI` varchar(200) DEFAULT NULL,
  `SDT` varchar(10) DEFAULT NULL,
  `EMAIL` varchar(45) DEFAULT NULL,
  `USERNAME` varchar(20) DEFAULT NULL,
  `PASSWORD` varchar(200) DEFAULT NULL,
  `MANQ` char(10) DEFAULT NULL,
  PRIMARY KEY (`MANV`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='		';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nhanvien`
--

LOCK TABLES `nhanvien` WRITE;
/*!40000 ALTER TABLE `nhanvien` DISABLE KEYS */;
INSERT INTO `nhanvien` VALUES ('001','Nguy???n ','H??ng','Nam','1999-09-09 00:00:00','qu???n 7 H??? Ch?? Minh','021399222','NH@gmail.com','hung123','$2b$10$oKtXatoymFV2vGG9SvDhVOnkDlZ4aRTyJnzW/lvvuq6XMXLAM/D4u','2'),('002','Nguy???n Ho??ng','Tu???n','Nam','1997-08-09 00:00:00','Ph?? T??n An Giang 45','0338744193','ntf@gmail.com','admin1','$2b$10$oKtXatoymFV2vGG9SvDhVOnkDlZ4aRTyJnzW/lvvuq6XMXLAM/D4u','2'),('003','Nguy???n Ho??ng ','Minh','Nam','1999-03-12 00:00:00','qu???n 10,Th??nh Ph??? H??? Ch?? Minh','0389978655','HM@gmail.com','nvgh1','$2b$10$oKtXatoymFV2vGG9SvDhVOnkDlZ4aRTyJnzW/lvvuq6XMXLAM/D4u','3'),('004','Nguy???n ','Ph??c','Nam','1998-02-13 00:00:00','qu???n 9,Th??? ?????c','0346789233','NP@gmail.com','nvgh2','$2b$10$oKtXatoymFV2vGG9SvDhVOnkDlZ4aRTyJnzW/lvvuq6XMXLAM/D4u','3'),('005','Nguy???n ','??n','Nam','1999-09-07 00:00:00','qu???n 9,Th??? ?????c','0987655432','NA@gmail.com','nvgh3','$2b$10$oKtXatoymFV2vGG9SvDhVOnkDlZ4aRTyJnzW/lvvuq6XMXLAM/D4u','3');
/*!40000 ALTER TABLE `nhanvien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nhomquyen`
--

DROP TABLE IF EXISTS `nhomquyen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nhomquyen` (
  `MANQ` char(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `TENNQ` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`MANQ`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nhomquyen`
--

LOCK TABLES `nhomquyen` WRITE;
/*!40000 ALTER TABLE `nhomquyen` DISABLE KEYS */;
INSERT INTO `nhomquyen` VALUES ('1','KHACHHANG'),('2','ADMIN'),('3','NVGH');
/*!40000 ALTER TABLE `nhomquyen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phieudat`
--

DROP TABLE IF EXISTS `phieudat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phieudat` (
  `MAPD` char(20) NOT NULL,
  `NGAYDAT` date NOT NULL,
  `HONN` varchar(45) DEFAULT NULL,
  `TENNN` varchar(15) DEFAULT NULL,
  `DIACHINN` varchar(200) DEFAULT NULL,
  `SDTNN` char(20) DEFAULT NULL,
  `GHICHU` varchar(255) DEFAULT NULL,
  `TRANGTHAI` varchar(45) DEFAULT NULL,
  `MANVD` char(10) DEFAULT NULL,
  `MANVGH` char(10) DEFAULT NULL,
  `MAKH` char(10) DEFAULT NULL,
  `MAHD` char(20) DEFAULT NULL,
  PRIMARY KEY (`MAPD`),
  KEY `MAHD_idx` (`MAHD`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phieudat`
--

LOCK TABLES `phieudat` WRITE;
/*!40000 ALTER TABLE `phieudat` DISABLE KEYS */;
INSERT INTO `phieudat` VALUES ('23dHqEtK2d','2021-09-05','Phan Th??nh','Kh??ng','47/8E ???????ng 104 Ph?????ng T??ng Nh??n Ph?? A, qu???n 9, th??nh Ph??? Th??? ?????c','0344788654','','Ch??a duy???t',NULL,NULL,'004',NULL),('9dgsO5pE3U','2021-08-31','Phan Th??nh','Kh??ng','47/8E ???????ng 104 Ph?????ng T??ng Nh??n Ph?? A, qu???n 9, th??nh Ph??? Th??? ?????c','0345667893','','???? giao','001','003','004','17ecc17abc'),('dThCf7e2cO','2021-09-04','Nguy???n Ho??ng Thi???n','??n','s??? 56 qu???n T??n B??nh, th??nh ph??? HCM','0987656455','giao t??? 9h30-10h30 s??ng ng??y 28/08.','???? giao','001','003','004','98c4223651'),('duWmipKsBV','2021-09-01','Phan Th??nh','Kh??ng','47/8E ???????ng 104 Ph?????ng T??ng Nh??n Ph?? A, qu???n 9, th??nh Ph??? Th??? ?????c','0344788654','','???? giao','001','003','004','0370c24657'),('mADOojURxz','2021-09-01','Phan Th??nh','Kh??ng','47/8E ???????ng 104 Ph?????ng T??ng Nh??n Ph?? A, qu???n 9, th??nh Ph??? Th??? ?????c','0344788654','','???? giao','001','003','004','fe53bec098'),('u8qpi6CEfi','2021-08-31','Nguy???n Ho??ng','Khang','s??? 45 ???p Ph?? An A, x?? Ph?? V??nh, th??? x?? T??n Ch??u t???nh An Giang','0338744192','','???? giao','001','003','005','5b7f295aa7'),('WP69Nqq1jp','2021-09-06','Phan Th??nh','Kh??ng','47/8E ???????ng 104 Ph?????ng T??ng Nh??n Ph?? A, qu???n 9, th??nh Ph??? Th??? ?????c','0344788654','','Ch??a duy???t',NULL,NULL,'004',NULL),('X2jJCuQm1T','2021-08-31','Nguy???n Ho??ng','Khang','s??? 45 ???p Ph?? An A, x?? Ph?? V??nh, th??? x?? T??n Ch??u t???nh An Giang','0338744192','','???? giao','001','003','005','11038c09fb'),('X9K5vMjJSo','2021-08-31','Nguy???n Ho??ng','Khang','s??? 45 ???p Ph?? An A, x?? Ph?? V??nh, th??? x?? T??n Ch??u t???nh An Giang','0338744192','','???? giao','001','003','005','71861ea42e'),('zOKT9PWVzs','2021-08-31','Phan Th??nh','Kh??ng','47/8E ???????ng 104 Ph?????ng T??ng Nh??n Ph?? A, qu???n 9, th??nh Ph??? Th??? ?????c','0345667893','','???? giao','001','003','004','0cf2fdf9f2');
/*!40000 ALTER TABLE `phieudat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phieunhap`
--

DROP TABLE IF EXISTS `phieunhap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phieunhap` (
  `MAPN` char(10) NOT NULL,
  `NGAYLAP` date DEFAULT NULL,
  `MANV` char(10) NOT NULL,
  `MADDH` char(10) NOT NULL,
  PRIMARY KEY (`MAPN`),
  KEY `MANV_idx` (`MANV`),
  KEY `MADDH_idx` (`MADDH`),
  CONSTRAINT `MADDH` FOREIGN KEY (`MADDH`) REFERENCES `dondathang` (`MADDH`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phieunhap`
--

LOCK TABLES `phieunhap` WRITE;
/*!40000 ALTER TABLE `phieunhap` DISABLE KEYS */;
/*!40000 ALTER TABLE `phieunhap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phieutra`
--

DROP TABLE IF EXISTS `phieutra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phieutra` (
  `MAPT` char(10) NOT NULL,
  `NGAYTRA` date DEFAULT NULL,
  `MAHD` char(10) NOT NULL,
  `MANV` char(10) NOT NULL,
  PRIMARY KEY (`MAPT`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phieutra`
--

LOCK TABLES `phieutra` WRITE;
/*!40000 ALTER TABLE `phieutra` DISABLE KEYS */;
/*!40000 ALTER TABLE `phieutra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thaydoigia`
--

DROP TABLE IF EXISTS `thaydoigia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thaydoigia` (
  `MADONG` char(10) NOT NULL,
  `NGAYTHAYDOI` date NOT NULL,
  `BIENDONGGIA` float DEFAULT NULL,
  PRIMARY KEY (`MADONG`,`NGAYTHAYDOI`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thaydoigia`
--

LOCK TABLES `thaydoigia` WRITE;
/*!40000 ALTER TABLE `thaydoigia` DISABLE KEYS */;
INSERT INTO `thaydoigia` VALUES ('001','2021-09-20',580000),('002','2021-08-16',5100000),('007','2021-08-17',650000);
/*!40000 ALTER TABLE `thaydoigia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thuonghieu`
--

DROP TABLE IF EXISTS `thuonghieu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thuonghieu` (
  `MATH` char(10) NOT NULL,
  `TENTH` varchar(45) DEFAULT NULL,
  `HINHANH` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`MATH`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='	';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thuonghieu`
--

LOCK TABLES `thuonghieu` WRITE;
/*!40000 ALTER TABLE `thuonghieu` DISABLE KEYS */;
INSERT INTO `thuonghieu` VALUES ('001','Raynal',NULL),('002','Bacardi',NULL),('003','Camus',NULL),('004','Ciroc',NULL),('005','Hennessy',NULL),('006','Chivas',NULL),('007','Resmy Martin',NULL),('008','Belasco ',NULL),('009','Vang Ph??p',NULL),('010','Malibu',NULL),('011','Appleton',NULL),('012','G?? C??ng 1',NULL),('013','Smirnoff',NULL),('014','Absolut',NULL),('015','LARRESSINGLE',NULL),('016','LAUBADE',NULL);
/*!40000 ALTER TABLE `thuonghieu` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-07 10:27:44
