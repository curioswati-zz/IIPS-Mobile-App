-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 12, 2015 at 02:29 PM
-- Server version: 5.5.43-0ubuntu0.14.04.1
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
  UNIQUE KEY `roomNo` (`roomNo`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=25 ;

--
-- Dumping data for table `Batches`
--

INSERT INTO `Batches` (`id`, `batchID`, `batchName`, `roomNo`, `CourseId`, `FacultyId`) VALUES
(1, 'IT', 'IT-2K10', NULL, 1, 0),
(2, 'IT', 'IT-2K11', NULL, 1, 0),
(3, 'IT', 'IT-2K12', 201, 1, 29),
(4, 'IT', 'IT-2K13', NULL, 1, 0),
(5, 'IT', 'IT-2K14', NULL, 1, 0),
(6, 'IT', 'IT-2K15', NULL, 1, 0),
(7, 'IC', 'IC-2K10', NULL, 2, 0),
(8, 'IC', 'IC-2K11', NULL, 2, 0),
(9, 'IC', 'IC-2K12', NULL, 2, 25),
(10, 'IC', 'IC-2K13', NULL, 2, 0),
(11, 'IC', 'IC-2K14', NULL, 2, 0),
(12, 'IC', 'IC-2K15', NULL, 2, 0),
(13, 'IM', 'IM-2K11', NULL, 3, 0),
(14, 'IM', 'IM-2K12', NULL, 3, 0),
(15, 'IM', 'IM-2K13', NULL, 3, 0),
(16, 'IM', 'IM-2K14', NULL, 3, 0),
(17, 'IM', 'IM-2K15', NULL, 3, 0),
(18, 'IB', 'IB-2K13', NULL, 5, 0),
(19, 'IB', 'IB-2K14', NULL, 5, 0),
(20, 'IB', 'IB-2K15', NULL, 5, 0),
(21, 'AP', 'AP-2K14', NULL, 6, 0),
(22, 'AP', 'AP-2K15', NULL, 6, 0),
(23, 'TA', 'TA-2K14', NULL, 7, 0),
(24, 'TA', 'TA-2K15', NULL, 7, 0);

-- --------------------------------------------------------

--
-- Table structure for table `Courses`
--

CREATE TABLE IF NOT EXISTS `Courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `courseName` varchar(255) DEFAULT NULL,
  `sem` int(11) DEFAULT NULL,
  `dept` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `Courses`
--

INSERT INTO `Courses` (`id`, `courseName`, `sem`, `dept`) VALUES
(1, 'MTech', 11, 'Tech'),
(2, 'MCA(UG)', 12, 'Tech'),
(3, 'MCA(PG)', 12, 'Tech'),
(4, 'MBA(MS 5Yrs UG)', 10, 'Mgmt'),
(5, 'MBA(MS 5Yrs PG)', 10, 'Mgmt'),
(6, 'MBA(MS 2Yrs)', 4, 'Mgmt'),
(7, 'B.Com', 6, 'Mgmt'),
(8, 'MBA(APR)', 4, 'Mgmt'),
(9, 'MBA(TA)', 4, 'Mgmt');

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
-- Table structure for table `Shifts`
--

CREATE TABLE IF NOT EXISTS `Shifts` (
  `shiftNo` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`shiftNo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Slots`
--

CREATE TABLE IF NOT EXISTS `Slots` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Day` varchar(255) DEFAULT NULL,
  `BatchId` int(11) DEFAULT NULL,
  `TimeIntervalId` int(11) DEFAULT NULL,
  `SubjectId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=49 ;

--
-- Dumping data for table `Slots`
--

INSERT INTO `Slots` (`id`, `Day`, `BatchId`, `TimeIntervalId`, `SubjectId`) VALUES
(1, 'Monday', 3, 4, 2),
(2, 'Monday', 3, 5, 3),
(3, 'Monday', 3, 7, 4),
(4, 'Tuesday', 3, 4, 2),
(5, 'Tuesday', 3, 5, 3),
(6, 'Tuesday', 3, 7, 4),
(7, 'Wednesday', 3, 4, 4),
(8, 'Wednesday', 3, 5, 3),
(9, 'Thursday', 3, 1, 1),
(10, 'Thursday', 3, 4, 4),
(11, 'Thursday', 3, 5, 3),
(12, 'Friday', 3, 4, 2),
(13, 'Friday', 3, 6, 5),
(14, 'Saturday', 3, 1, 1),
(15, 'Saturday', 3, 4, 2),
(16, 'Saturday', 3, 6, 5),
(17, 'Monday', 9, 4, 8),
(18, 'Monday', 9, 5, 9),
(19, 'Monday', 9, 7, 10),
(20, 'Tuesday', 9, 4, 8),
(21, 'Tuesday', 9, 5, 9),
(22, 'Tuesday', 9, 7, 10),
(23, 'Wednesday', 9, 4, 10),
(24, 'Wednesday', 9, 5, 9),
(25, 'Thursday', 9, 1, 7),
(26, 'Thursday', 9, 4, 10),
(27, 'Thursday', 9, 5, 9),
(28, 'Friday', 9, 4, 8),
(29, 'Friday', 9, 6, 6),
(30, 'Saturday', 9, 1, 7),
(31, 'Saturday', 9, 4, 8),
(32, 'Saturday', 9, 6, 6),
(33, 'Monday', 13, 4, 12),
(34, 'Monday', 13, 5, 13),
(35, 'Monday', 13, 6, 14),
(36, 'Tuesday', 13, 4, 12),
(37, 'Tuesday', 13, 5, 13),
(38, 'Tuesday', 13, 6, 14),
(39, 'Wednesday', 13, 4, 14),
(40, 'Wednesday', 13, 5, 13),
(41, 'Thursday', 13, 1, 11),
(42, 'Thursday', 13, 4, 14),
(43, 'Thursday', 13, 5, 13),
(44, 'Friday', 13, 4, 12),
(45, 'Friday', 13, 7, 15),
(46, 'Saturday', 13, 1, 11),
(47, 'Saturday', 13, 4, 12),
(48, 'Saturday', 13, 7, 15);

-- --------------------------------------------------------

--
-- Table structure for table `Students`
--

CREATE TABLE IF NOT EXISTS `Students` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fullname` varchar(50) DEFAULT NULL,
  `course` varchar(255) DEFAULT NULL,
  `sem` varchar(255) DEFAULT NULL,
  `rollno` varchar(255) DEFAULT NULL,
  `BatchId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `rollno` (`rollno`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `Students`
--

INSERT INTO `Students` (`id`, `fullname`, `course`, `sem`, `rollno`, `BatchId`) VALUES
(1, 'Swati Jaiswal', 'MTech', 'VII', 'IT-2K12-35', 3);

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

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
(7, 'IC-101', 'LS', 'Linear Systems', 50),
(8, 'IC-102', 'DS', 'Discrete Structure', 12),
(9, 'IC-103', 'CA', 'Computer Architecture', 31),
(10, 'IC-104', 'BI', 'Bio Informatics', 42),
(11, 'IM-101', 'LS', 'Linear Systems', 12),
(12, 'IM-102', 'DS', 'Discrete Structure', 3812),
(13, 'IM-103', 'CA', 'Computer Architecture', 531),
(14, 'IC-104', 'BI', 'Bio Informatics', 31),
(15, 'IM-105', 'OS', 'Operating Systems', 44);

-- --------------------------------------------------------

--
-- Table structure for table `TimeIntervals`
--

CREATE TABLE IF NOT EXISTS `TimeIntervals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `beginTime` datetime DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  `SubjectId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `TimeIntervals`
--

INSERT INTO `TimeIntervals` (`id`, `beginTime`, `endTime`, `SubjectId`) VALUES
(1, '2015-09-13 08:00:00', '2015-09-13 10:00:00', NULL),
(2, '2015-09-13 08:30:00', '2015-09-13 10:30:00', NULL),
(3, '2015-09-13 09:00:00', '2015-09-13 10:00:00', NULL),
(4, '2015-09-13 10:00:00', '2015-09-13 11:00:00', NULL),
(5, '2015-09-13 11:00:00', '2015-09-13 12:00:00', NULL),
(6, '2015-09-13 11:00:00', '2015-09-13 01:00:00', NULL),
(7, '2015-09-13 12:00:00', '2015-09-13 01:00:00', NULL),
(8, '2015-09-13 01:00:00', '0000-00-00 02:00:00', NULL),
(9, '2015-09-13 02:00:00', '2015-09-13 03:00:00', NULL),
(10, '2015-09-13 03:30:00', '2015-09-13 04:30:00', NULL),
(11, '2015-09-13 04:30:00', '2015-09-13 05:30:00', NULL);

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
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `email`, `password`, `StudentId`) VALUES
(1, 'swatijaiswal29@yahoo.in', 'd8578edf8458ce06fbc5bb76a58c5ca4', 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
