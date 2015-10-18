-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 17, 2015 at 12:00 PM
-- Server version: 5.5.44-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `iips_app_dev`
--

-- --------------------------------------------------------

--
-- Table structure for table `Courses`
--

CREATE TABLE IF NOT EXISTS `Courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `courseName` varchar(255) DEFAULT NULL,
  `dept` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `courseName` (`courseName`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `Courses`
--

INSERT INTO `Courses` (`id`, `courseName`, `dept`) VALUES
(1, 'MTech', 'Tech'),
(2, 'MCA(UG)', 'Tech'),
(3, 'MCA(PG)', 'Tech'),
(4, 'MBA(MS 5Yrs UG)', 'Mgmt'),
(5, 'MBA(MS 5Yrs PG)', 'Mgmt'),
(6, 'MBA(MS 2Yrs)', 'Mgmt'),
(7, 'BCom', 'Mgmt'),
(8, 'MBA(APR)', 'Mgmt'),
(9, 'MBA(TA)', 'Mgmt');

-- --------------------------------------------------------

--
-- Table structure for table `Faculties`
--

CREATE TABLE IF NOT EXISTS `Faculties` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `facultyID` varchar(255) DEFAULT NULL,
  `facultyName` varchar(255) DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `qualification` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT ' ',
  PRIMARY KEY (`id`),
  UNIQUE KEY `facultyID` (`facultyID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=52 ;

--
-- Dumping data for table `Faculties`
--

INSERT INTO `Faculties` (`id`, `facultyID`, `facultyName`, `designation`, `qualification`, `role`, `contact`) VALUES
(1, NULL, 'Dr.  Anand K. Sapre', 'Professor', 'BE,MBA,Ph.D', 'Director', ' '),
(2, NULL, 'Dr. Ramkrishna Vyas', 'Professor', 'B.E, MBA,Ph.D,CAIIB', 'Dean Faculty of Management', ' '),
(3, NULL, 'Dr. B.K.Tripathi', 'Professor', 'M.Sc, PhD, MBA, Ph.D', 'Inc-Mgmt', ' '),
(4, NULL, 'Dr. Yamini Karmarkar', 'Reader', 'B.Sc, MMS, Ph.D, FDP(IIMA), CPET(ISB)', 'PI-MBA(MS 2Yrs)', ' '),
(5, NULL, 'Dr. Kirti Mathur', 'Reader', 'ME(CSE)', 'PI-MTech', ' '),
(6, NULL, 'Dr. Geeta Sharma', 'Reader', 'MBA, Ph.D', 'PI-MBA(MS 5Yrs UG)', ' '),
(7, NULL, 'Dr. Geeta Nema', 'Reader', 'B.Sc, M.Sc, MBA, Ph.D', 'PI-MBA(MS 5Yrs PG)', ' '),
(8, NULL, 'Dr. Jyoti Sharma', 'Reader', 'M.A(Psy), PGDCABM,Ph.D', 'PI-MBA(APR)', ' '),
(9, NULL, 'Mr. Ramesh Thakur', 'Reader', 'B.E(CS), ME, Ph.D(Pursuing)', 'PI-MCA(PG)', ' '),
(10, NULL, 'Mr. Jugendra Dongre', 'Reader', 'B.Tech(CSE), M.Tech(CS)', 'NULL', ' '),
(11, NULL, 'Ms. Manju Suchdeo', 'Reader', 'M.Tech(CS), M.Sc(IT)', 'PI-MCA(UG)', ' '),
(12, NULL, 'Mr. Shaligram Prajapat', 'Reader', 'B.Sc(Electronics),M.Tech(CS), M.Sc(CS), UGC-NET(Computer Science and Applications )', 'DC-Incharge', ' '),
(13, NULL, 'Dr. Manish Sitlani', 'Reader', 'Ph.D, ACS, LLB(H), M.Com', 'PI-MBA(TA)', ' '),
(14, NULL, 'Dr. Preeti Singh', 'Reader', 'MBA, B.ED(DE), B.Com,Ph.D', 'Co-ordinator-AntiRagging Committee, Co-ordinator Career Counselling Cell-DAVV, Academic Counsel Member', ' '),
(15, NULL, 'Dr. Ravindra Yadav', 'Senior Lecturer', 'B.Sc, DEE, MBA, FDP-IIMA,Ph.D(Management)', 'Incharge PMS', ' '),
(16, NULL, 'Dr.  Anshu Bhati', 'Lecturer', 'B.Sc(Electronics), MBA(APR),Ph.D', 'Batch Facilitator', ' '),
(17, NULL, 'Dr. Pooja Jain', 'Lecturer', ' Ph.D.,MBA(APR), B.Sc.', 'Batch Facilitator', ' '),
(18, NULL, 'Dr. Suresh Patidar', 'Reader', 'M.Com.(Management), LL.B. (Hons.), CS(Inter),UGC-NET, Ph.D.', 'PI-B.Com', ' '),
(19, NULL, 'Dr. Sujata Parwani', 'Lecturer', 'M.Phil Eco.,Ph.D', 'Batch Facilitator', ' '),
(20, NULL, 'Mr. Gaurav Purohit', 'Lecturer', 'MTA', 'Batch Facilitator', ' '),
(21, NULL, 'Mr. Anil Goray', 'Lecturer', 'B.Sc, PGDBA, MBA, LLB(Hons) R Scholar', 'Batch Facilitator', ' '),
(22, NULL, 'Ms. Muskan Karamchandani', 'Lecturer', 'B.Com, MBA', 'Batch Facilitator', ' '),
(23, NULL, 'Ms. Shailvi Verma', 'Lecturer', 'M.SC(IT)', 'Batch Facilitator', ' '),
(24, NULL, 'Mr. Surendra Malviya', 'Lecturer', 'MBA(e-commerce),PhD(pursuing)', 'Batch Facilitator', ' '),
(25, NULL, 'Ms. Yasmin Shaikh', 'Lecturer', 'M.Tech.(CS), M.Sc.(CS), UGC-NET (CS)', 'Batch Facilitator', ' '),
(26, NULL, 'Dr. Kapil Jain', 'Lecturer', 'Ph.D,M.Phil,M.Com., B.Com. With Computer Application', 'Batch Facilitator', ' '),
(27, NULL, 'Dr.  Manminder Singh Saluja', 'Senior Lecturer', 'Ph.D, M.Phil, M.A.(Economics)', 'Batch Facilitator', ' '),
(28, NULL, 'Dr. Nirmala Sawan', 'Lecturer', 'M.Sc(Statistics), Ph.D(Management)', 'Batch Facilitator', ' '),
(29, NULL, 'Mr. Rajesh Verma', 'Lecturer', 'B.Sc(Electronics), PGDCA, MCA', 'Batch Facilitator', ' '),
(30, NULL, 'Dr. Shilpa Bagdare', 'Lecturer', 'MBA(Marketing),Ph.D(Management)', 'Batch Facilitator', ' '),
(31, NULL, 'Mr. Vivek Shrivastava', 'Lecturer', 'B. Sc. (CS), DCA, PGDCA, APGDCA, MCA, UGC-NET Qualified, M.Tech.(Computer Science),PhD(pursuing)', 'Batch Facilitator', ' '),
(32, NULL, 'Mr. Arpit Nema', 'Lecturer', 'B.Sc.(Computer Maintenance), MCA ,Ph.D. Course Work, Pursing Ph.D.', 'Batch Facilitator', ' '),
(33, NULL, 'Ms. Vibha Gupta', 'Lecturer', 'MBA(APR),CDAC,D.O.R.,FCLI (Aligarh)', 'Batch Facilitator', ' '),
(34, NULL, 'Ms. Shikha Chaturvedi', 'Lecturer', 'MBA(TA)', 'Batch Facilitator', ' '),
(35, NULL, 'Ms. Navneet Bhatia', 'Lecturer', 'MBA', 'Batch Facilitator', ' '),
(36, NULL, 'Ms. Poonam Mangwani', 'Lecturer', 'ME', 'Batch Facilitator', ' '),
(37, NULL, 'Mr. Nitin Nagar', 'Lecturer', 'BCA,MCA,Ph.D(pursuing)', 'Batch Facilitator', ' '),
(38, NULL, 'Dr. Rahul Singhai', 'Lecturer', 'B.Sc,MCA,M.phil(CS),PhD(CS)', 'Batch Facilitator', ' '),
(39, NULL, 'Dr. Prerna Kumar', 'Lecturer', 'MBA,Ph.D', 'Batch Facilitator', ' '),
(40, NULL, 'Mr. Rupesh Sendre', 'Lecturer', 'B.Sc ,MCA', 'Batch Facilitator', ' '),
(41, NULL, 'Mr. Naresh Dembla', 'Lecturer', 'B.E, MBA, ME(comp. Eng) , Ph.D(Pursuing)', 'Batch Facilitator', ' '),
(42, NULL, 'Ms. Shraddha Soni', 'Lecturer', 'MCA', 'Batch Facilitator', ' '),
(43, NULL, 'Ms. Kirti Vijayvargiya', 'Lecturer', 'MCA,UGC-NET(CS)', 'Batch Facilitator', ' '),
(44, NULL, 'Mr. Pradeep K. Jatav', 'Lecturer', 'B.Sc(Statistics),	MCA', 'Batch Facilitator', ' '),
(45, NULL, 'Mr. Imroz Khan', 'Software Engineer, Placement Officer', 'B.E.(Electronics)', 'TPO', ' '),
(46, NULL, 'Mr. Yogendra Bawal', 'Network Administrator, Admin Officer', 'Administrative Officer', ' ', ' '),
(47, NULL, 'Mr. Basant Namdeo', 'Lecturer', 'MCA', 'Batch Facilitator', ' '),
(48, NULL, 'Mr. Almas Nabi', 'Programmer', 'M.Tech.(CS), M.Sc.(CS)', 'Programmer', ' '),
(49, NULL, 'Mr. Sanjay Narsinghani', 'Programmer', 'MCA', 'Programmer', ' '),
(50, NULL, 'Mr. Gaurav Chaitanya', '', '', '', ' '),
(51, NULL, 'Ms. Payal Dangi', '', '', '', ' ');

-- --------------------------------------------------------

--
-- Table structure for table `Batches`
--

CREATE TABLE IF NOT EXISTS `Batches` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `batchID` varchar(255) DEFAULT NULL,
  `batchName` varchar(255) DEFAULT NULL,
  `roomNo` int(11) DEFAULT NULL,
  `CourseId` int(11) DEFAULT NULL,
  `FacultyId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `batchName` (`batchName`),
  KEY `CourseId` (`CourseId`),
  KEY `FacultyId` (`FacultyId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=25 ;

--
-- Dumping data for table `Batches`
--

INSERT INTO `Batches` (`id`, `batchID`, `batchName`, `roomNo`, `CourseId`, `FacultyId`) VALUES
(1, 'IT', 'IT-2K10', NULL, 1, 1),
(2, 'IT', 'IT-2K11', NULL, 1, 2),
(3, 'IT', 'IT-2K12', NULL, 1, 29),
(4, 'IT', 'IT-2K13', NULL, 1, 3),
(5, 'IT', 'IT-2K14', NULL, 1, 4),
(6, 'IT', 'IT-2K15', NULL, 1, 5),
(7, 'IC', 'IC-2K10', NULL, 3, 6),
(8, 'IC', 'IC-2K11', NULL, 3, 7),
(9, 'IC', 'IC-2K12', NULL, 3, 8),
(10, 'IC', 'IC-2K13', NULL, 2, 9),
(11, 'IC', 'IC-2K14', NULL, 2, 10),
(12, 'IC', 'IC-2K15', NULL, 2, 11),
(13, 'IM', 'IM-2K11', NULL, 5, 12),
(14, 'IM', 'IM-2K12', NULL, 5, 13),
(15, 'IM', 'IM-2K13', NULL, 4, 14),
(16, 'IM', 'IM-2K14', NULL, 4, 15),
(17, 'IM', 'IM-2K15', NULL, 4, 16),
(18, 'IB', 'IB-2K13', NULL, 7, 17),
(19, 'IB', 'IB-2K14', NULL, 7, 18),
(20, 'IB', 'IB-2K15', NULL, 7, 19),
(21, 'AP', 'AP-2K14', NULL, 8, 20),
(22, 'AP', 'AP-2K15', NULL, 8, 21),
(23, 'TA', 'TA-2K14', NULL, 9, 22),
(24, 'TA', 'TA-2K15', NULL, 9, 23);

-- --------------------------------------------------------

--
-- Table structure for table `Semesters`
--

CREATE TABLE IF NOT EXISTS `Semesters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `semNo` varchar(255) DEFAULT NULL,
  `syllabusUrl` varchar(255) DEFAULT NULL,
  `CourseId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `CourseId` (`CourseId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=52 ;

--
-- Dumping data for table `Semesters`
--

INSERT INTO `Semesters` (`id`, `semNo`, `syllabusUrl`, `CourseId`) VALUES
(1, '1', NULL, 1),
(2, '2', NULL, 1),
(3, '3', NULL, 1),
(4, '4', NULL, 1),
(5, '5', NULL, 1),
(6, '6', NULL, 1),
(7, '7', NULL, 1),
(8, '8', NULL, 1),
(9, '9', NULL, 1),
(10, '10', NULL, 1),
(11, '11', NULL, 1),
(12, '1', NULL, 2),
(13, '2', NULL, 2),
(14, '3', NULL, 2),
(15, '4', NULL, 2),
(16, '5', NULL, 2),
(17, '6', NULL, 2),
(18, '7', NULL, 3),
(19, '8', NULL, 3),
(20, '9', NULL, 3),
(21, '10', NULL, 3),
(22, '11', NULL, 3),
(23, '12', NULL, 3),
(24, '1', NULL, 4),
(25, '2', NULL, 4),
(26, '3', NULL, 4),
(27, '4', NULL, 4),
(28, '5', NULL, 4),
(29, '6', NULL, 5),
(30, '7', NULL, 5),
(31, '8', NULL, 5),
(32, '9', NULL, 5),
(33, '10', NULL, 5),
(34, '1', NULL, 6),
(35, '2', NULL, 6),
(36, '3', NULL, 6),
(37, '4', NULL, 6),
(38, '1', NULL, 7),
(39, '2', NULL, 7),
(40, '3', NULL, 7),
(41, '4', NULL, 7),
(42, '1', NULL, 8),
(43, '2', NULL, 8),
(44, '3', NULL, 8),
(45, '4', NULL, 8),
(46, '1', NULL, 9),
(47, '2', NULL, 9),
(48, '3', NULL, 9),
(49, '4', NULL, 9),
(50, '5', NULL, 9),
(51, '6', NULL, 9);

-- --------------------------------------------------------

--
-- Table structure for table `Subjects`
--

CREATE TABLE IF NOT EXISTS `Subjects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subjectID` varchar(255) DEFAULT NULL,
  `subjectCode` varchar(255) DEFAULT NULL,
  `subjectName` varchar(255) DEFAULT NULL,
  `FacultyId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FacultyId` (`FacultyId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `Subjects`
--

INSERT INTO `Subjects` (`id`, `subjectID`, `subjectCode`, `subjectName`, `FacultyId`) VALUES
(1, 'IT-101', 'LS', 'Linear Systems', 50),
(2, 'IT-102', 'DS', 'Discrete Structure', 51),
(3, 'IT-103', 'CA', 'Computer Architecture', 42),
(4, 'IT-104', 'BI', 'Bio Informatics', 44),
(5, 'IT-105', 'OS', 'Operating Systems', 5),
(6, 'IC-105', 'OS', 'Operating Systems', 38),
(7, 'IC-104', 'BI', 'Bio Informatics', 42),
(8, 'IC-103', 'CA', 'Computer Architecture', 31),
(9, 'IC-102', 'DS', 'Discrete Structure', 12),
(10, 'IC-101', 'LS', 'Linear Systems', 50);

-- --------------------------------------------------------

--
-- Table structure for table `TimeIntervals`
--

CREATE TABLE IF NOT EXISTS `TimeIntervals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `beginTime` datetime DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `TimeIntervals`
--

INSERT INTO `TimeIntervals` (`id`, `beginTime`, `endTime`) VALUES
(1, '2015-09-13 08:00:00', '2015-09-13 10:00:00'),
(2, '2015-09-13 08:30:00', '2015-09-13 10:30:00'),
(3, '2015-09-13 09:00:00', '2015-09-13 10:00:00'),
(4, '2015-09-13 10:00:00', '2015-09-13 11:00:00'),
(5, '2015-09-13 11:00:00', '2015-09-13 12:00:00'),
(6, '2015-09-13 11:00:00', '2015-09-13 01:00:00'),
(7, '2015-09-13 12:00:00', '2015-09-13 01:00:00'),
(8, '2015-09-13 01:00:00', '0000-00-00 02:00:00'),
(9, '2015-09-13 02:00:00', '2015-09-13 03:00:00'),
(10, '2015-09-13 03:30:00', '2015-09-13 04:30:00'),
(11, '2015-09-13 04:30:00', '2015-09-13 05:30:00'),
(12, '2015-09-13 01:00:00', '2015-09-13 03:00:00');
-- --------------------------------------------------------

--
-- Table structure for table `Slots`
--

CREATE TABLE IF NOT EXISTS `Slots` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Day` varchar(255) DEFAULT NULL,
  `SemesterId` int(11) DEFAULT NULL,
  `TimeIntervalId` int(11) DEFAULT NULL,
  `SubjectId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `SemesterId` (`SemesterId`),
  KEY `TimeIntervalId` (`TimeIntervalId`),
  KEY `SubjectId` (`SubjectId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=66 ;

--
-- Dumping data for table `Slots`
--

INSERT INTO `Slots` (`id`, `Day`, `SemesterId`, `TimeIntervalId`, `SubjectId`) VALUES
(34, 'Monday', 7, 4, 2),
(35, 'Monday', 7, 5, 3),
(36, 'Monday', 7, 7, 4),
(37, 'Tuesday', 7, 4, 2),
(38, 'Tuesday', 7, 5, 3),
(39, 'Tuesday', 7, 7, 4),
(40, 'Wednesday', 7, 4, 4),
(41, 'Wednesday', 7, 5, 3),
(42, 'Thursday', 7, 1, 1),
(43, 'Thursday', 7, 4, 4),
(44, 'Thursday', 7, 5, 3),
(45, 'Friday', 7, 4, 2),
(46, 'Friday', 7, 6, 5),
(47, 'Saturday', 7, 1, 1),
(48, 'Saturday', 7, 4, 2),
(49, 'Saturday', 7, 6, 5),
(50, 'Monday', 18, 4, 9),
(51, 'Monday', 18, 5, 8),
(52, 'Monday', 18, 7, 7),
(53, 'Tuesday', 18, 4, 9),
(54, 'Tuesday', 18, 5, 8),
(55, 'Tuesday', 18, 7, 7),
(56, 'Wednesday', 18, 4, 7),
(57, 'Wednesday', 18, 5, 8),
(58, 'Thursday', 18, 1, 10),
(59, 'Thursday', 18, 4, 7),
(60, 'Thursday', 18, 5, 8),
(61, 'Friday', 18, 4, 9),
(62, 'Friday', 18, 6, 6),
(63, 'Saturday', 18, 1, 10),
(64, 'Saturday', 18, 4, 9),
(65, 'Saturday', 18, 6, 6);

-- --------------------------------------------------------

--
-- Table structure for table `Students`
--

CREATE TABLE IF NOT EXISTS `Students` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fullname` varchar(50) DEFAULT NULL,
  `rollno` varchar(255) DEFAULT NULL,
  `BatchId` int(11) DEFAULT NULL,
  `CourseId` int(11) DEFAULT NULL,
  `SemesterId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `rollno` (`rollno`),
  KEY `BatchId` (`BatchId`),
  KEY `CourseId` (`CourseId`),
  KEY `SemesterId` (`SemesterId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;


-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE IF NOT EXISTS `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `StudentId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `StudentId` (`StudentId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Batches`
--
ALTER TABLE `Batches`
  ADD CONSTRAINT `Batches_ibfk_1` FOREIGN KEY (`CourseId`) REFERENCES `Courses` (`id`),
  ADD CONSTRAINT `Batches_ibfk_2` FOREIGN KEY (`FacultyId`) REFERENCES `Faculties` (`id`);

--
-- Constraints for table `Semesters`
--
ALTER TABLE `Semesters`
  ADD CONSTRAINT `Semesters_ibfk_1` FOREIGN KEY (`CourseId`) REFERENCES `Courses` (`id`);

--
-- Constraints for table `Slots`
--
ALTER TABLE `Slots`
  ADD CONSTRAINT `Slots_ibfk_1` FOREIGN KEY (`SemesterId`) REFERENCES `Semesters` (`id`),
  ADD CONSTRAINT `Slots_ibfk_2` FOREIGN KEY (`TimeIntervalId`) REFERENCES `TimeIntervals` (`id`),
  ADD CONSTRAINT `Slots_ibfk_3` FOREIGN KEY (`SubjectId`) REFERENCES `Subjects` (`id`);

--
-- Constraints for table `Students`
--
ALTER TABLE `Students`
  ADD CONSTRAINT `Students_ibfk_1` FOREIGN KEY (`BatchId`) REFERENCES `Batches` (`id`),
  ADD CONSTRAINT `Students_ibfk_2` FOREIGN KEY (`CourseId`) REFERENCES `Courses` (`id`),
  ADD CONSTRAINT `Students_ibfk_3` FOREIGN KEY (`SemesterId`) REFERENCES `Semesters` (`id`);

--
-- Constraints for table `Subjects`
--
ALTER TABLE `Subjects`
  ADD CONSTRAINT `Subjects_ibfk_1` FOREIGN KEY (`FacultyId`) REFERENCES `Faculties` (`id`);

--
-- Constraints for table `Users`
--
ALTER TABLE `Users`
  ADD CONSTRAINT `Users_ibfk_1` FOREIGN KEY (`StudentId`) REFERENCES `Students` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
