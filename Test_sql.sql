-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th12 09, 2023 lúc 08:05 AM
-- Phiên bản máy phục vụ: 10.4.27-MariaDB
-- Phiên bản PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `j2ee`
--
CREATE DATABASE IF NOT EXISTS `j2ee` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `j2ee`;
-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitietcungcap`
--

CREATE TABLE `chitietcungcap` (
  `masanpham` int(11) NOT NULL,
  `manhacungcap` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chitietcungcap`
--

INSERT INTO `chitietcungcap` (`masanpham`, `manhacungcap`) VALUES
(1, 1),
(1, 2),
(6, 1),
(6, 2),
(12, 1),
(12, 2),
(17, 1),
(18, 1),
(19, 1),
(20, 1),
(21, 1),
(24, 1),
(25, 1),
(26, 1),
(27, 1),
(28, 1),
(29, 1),
(30, 1),
(31, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitietgiohang`
--

CREATE TABLE `chitietgiohang` (
  `masanpham` int(11) NOT NULL,
  `makhachhang` int(11) NOT NULL,
  `soluong` int(11) NOT NULL,
  `mamau` int(11) NOT NULL,
  `makichco` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitiethoadon`
--

CREATE TABLE `chitiethoadon` (
  `masanpham` int(11) NOT NULL,
  `mahoadon` int(11) NOT NULL,
  `soluong` int(11) NOT NULL,
  `gia` int(11) NOT NULL,
  `mamau` int(11) NOT NULL,
  `makichco` int(11) NOT NULL,
  `maphieunhap` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chitiethoadon`
--

INSERT INTO `chitiethoadon` (`masanpham`, `mahoadon`, `soluong`, `gia`, `mamau`, `makichco`, `maphieunhap`) VALUES
(1, 65, 1, 540000, 2, 3, 46),
(6, 26, 20, 190000, 5, 1, 43),
(6, 30, 20, 180000, 5, 1, 44),
(6, 37, 20, 190000, 5, 1, 43),
(6, 44, 20, 190000, 5, 1, 43),
(6, 51, 20, 190000, 5, 1, 43),
(6, 56, 20, 190000, 5, 1, 43),
(12, 28, 20, 200000, 1, 1, 43),
(12, 30, 20, 200000, 1, 1, 43),
(12, 37, 20, 200000, 1, 1, 43),
(12, 44, 20, 200000, 1, 1, 43),
(12, 51, 20, 200000, 1, 1, 44),
(12, 56, 20, 200000, 1, 1, 44),
(12, 63, 1, 200000, 1, 1, 45),
(12, 64, 1, 200000, 1, 1, 45),
(17, 29, 5, 540000, 2, 1, 46),
(17, 31, 5, 540000, 2, 1, 46),
(17, 38, 5, 540000, 2, 1, 46),
(17, 39, 5, 540000, 2, 1, 46),
(17, 45, 5, 540000, 2, 1, 46),
(17, 45, 5, 540000, 2, 3, 46),
(17, 46, 5, 540000, 2, 1, 46),
(17, 46, 5, 540000, 2, 3, 46),
(17, 52, 5, 540000, 2, 1, 46),
(17, 53, 5, 540000, 2, 1, 46),
(17, 57, 5, 540000, 2, 1, 46),
(17, 58, 5, 540000, 2, 1, 46),
(18, 33, 5, 600000, 2, 1, 46),
(18, 33, 5, 600000, 2, 2, 46),
(18, 33, 5, 600000, 2, 3, 46),
(18, 34, 5, 600000, 2, 1, 46),
(18, 34, 5, 600000, 2, 2, 46),
(18, 34, 5, 600000, 2, 3, 46),
(18, 40, 5, 600000, 2, 1, 46),
(18, 40, 5, 600000, 2, 2, 46),
(18, 40, 5, 600000, 2, 3, 46),
(18, 41, 5, 600000, 2, 1, 46),
(18, 41, 5, 600000, 2, 2, 46),
(18, 41, 5, 600000, 2, 3, 46),
(18, 47, 5, 600000, 2, 1, 46),
(18, 47, 5, 600000, 2, 2, 46),
(18, 47, 5, 600000, 2, 3, 46),
(18, 48, 5, 600000, 2, 1, 46),
(18, 48, 5, 600000, 2, 2, 46),
(18, 48, 5, 600000, 2, 3, 46),
(18, 54, 5, 600000, 2, 1, 46),
(18, 54, 5, 600000, 2, 2, 46),
(18, 54, 5, 600000, 2, 3, 46),
(18, 55, 5, 600000, 2, 1, 46),
(18, 55, 5, 600000, 2, 2, 46),
(18, 59, 5, 600000, 2, 1, 46),
(18, 59, 5, 600000, 2, 2, 46),
(18, 59, 5, 600000, 2, 3, 46),
(18, 60, 5, 600000, 2, 1, 46),
(18, 60, 5, 600000, 2, 2, 46),
(18, 60, 5, 600000, 2, 3, 46),
(19, 35, 5, 650000, 2, 1, 46),
(19, 35, 5, 650000, 2, 2, 46),
(19, 35, 5, 650000, 2, 3, 46),
(19, 36, 5, 650000, 2, 1, 46),
(19, 36, 5, 650000, 2, 2, 46),
(19, 36, 5, 650000, 2, 3, 46),
(19, 42, 5, 650000, 2, 1, 46),
(19, 42, 5, 650000, 2, 2, 46),
(19, 42, 5, 650000, 2, 3, 46),
(19, 43, 5, 650000, 2, 1, 46),
(19, 43, 5, 650000, 2, 2, 46),
(19, 43, 5, 650000, 2, 3, 46),
(19, 49, 5, 650000, 2, 1, 46),
(19, 49, 5, 650000, 2, 2, 46),
(19, 49, 5, 650000, 2, 3, 46),
(19, 50, 5, 650000, 2, 1, 46),
(19, 50, 5, 650000, 2, 2, 46),
(19, 50, 5, 650000, 2, 3, 46),
(19, 61, 5, 650000, 2, 1, 46),
(19, 61, 5, 650000, 2, 2, 46),
(19, 61, 5, 650000, 2, 3, 46),
(19, 62, 5, 650000, 2, 1, 46),
(19, 62, 5, 650000, 2, 2, 46),
(19, 62, 5, 650000, 2, 3, 46);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitietloaisanpham`
--

CREATE TABLE `chitietloaisanpham` (
  `maloai` int(11) NOT NULL,
  `masanpham` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chitietloaisanpham`
--

INSERT INTO `chitietloaisanpham` (`maloai`, `masanpham`) VALUES
(1, 16),
(6, 1),
(6, 12),
(6, 18),
(6, 19),
(6, 20),
(7, 21),
(8, 6),
(8, 29),
(8, 30),
(8, 31),
(9, 17),
(9, 25),
(10, 26),
(10, 27),
(11, 24),
(11, 28),
(12, 32),
(12, 33),
(12, 34),
(12, 35),
(13, 36),
(13, 37),
(15, 38),
(15, 39),
(16, 40),
(16, 41);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitietphieunhap`
--

CREATE TABLE `chitietphieunhap` (
  `masanpham` int(11) NOT NULL,
  `maphieunhap` int(11) NOT NULL,
  `soluong` int(11) NOT NULL,
  `gianhap` int(11) NOT NULL,
  `mamau` int(11) NOT NULL,
  `makichco` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chitietphieunhap`
--

INSERT INTO `chitietphieunhap` (`masanpham`, `maphieunhap`, `soluong`, `gianhap`, `mamau`, `makichco`) VALUES
(1, 43, 40, 100000, 2, 1),
(1, 44, 40, 100000, 2, 1),
(1, 45, 40, 100000, 1, 1),
(1, 46, 10, 135000, 1, 2),
(1, 46, 40, 100000, 2, 1),
(1, 46, 10, 135000, 2, 2),
(1, 46, 10, 250000, 2, 3),
(1, 48, 398, 200000, 1, 1),
(1, 49, 398, 200000, 1, 1),
(1, 50, 897, 100000, 4, 1),
(1, 50, 299, 100000, 8, 1),
(6, 43, 40, 100000, 4, 1),
(6, 44, 40, 100000, 4, 1),
(6, 45, 40, 100000, 4, 1),
(6, 46, 40, 100000, 4, 1),
(6, 51, 10, 200000, 4, 3),
(6, 51, 10, 200000, 8, 3),
(12, 43, 40, 100000, 1, 1),
(12, 44, 40, 100000, 1, 1),
(12, 45, 40, 100000, 1, 1),
(12, 46, 40, 100000, 1, 1),
(17, 47, 10, 135000, 2, 1),
(17, 47, 10, 135000, 2, 2),
(18, 46, 10, 200000, 2, 1),
(18, 46, 10, 200000, 2, 2),
(19, 46, 10, 250000, 2, 1),
(19, 46, 10, 250000, 2, 2),
(19, 46, 10, 250000, 2, 3),
(20, 46, 10, 250000, 4, 1),
(20, 46, 10, 250000, 4, 2),
(20, 46, 10, 250000, 4, 3),
(21, 46, 10, 250000, 2, 4),
(21, 46, 10, 250000, 5, 4),
(21, 46, 10, 250000, 6, 4),
(24, 46, 5, 590000, 7, 1),
(24, 46, 5, 590000, 7, 2),
(25, 46, 5, 590000, 3, 4),
(25, 46, 5, 590000, 4, 4),
(26, 46, 5, 1000000, 8, 4),
(27, 46, 5, 590000, 9, 4),
(28, 46, 5, 590000, 5, 4),
(28, 46, 5, 590000, 8, 4),
(29, 46, 5, 400000, 1, 1),
(29, 46, 5, 400000, 1, 2),
(29, 46, 5, 400000, 1, 3),
(30, 46, 5, 400000, 4, 2),
(30, 46, 5, 400000, 4, 3),
(31, 46, 5, 800000, 4, 3),
(32, 46, 5, 400000, 1, 4),
(33, 46, 5, 800000, 1, 4),
(34, 46, 5, 800000, 1, 2),
(34, 46, 2, 800000, 1, 3),
(35, 46, 2, 900000, 1, 3),
(36, 46, 20, 500000, 1, 4),
(37, 46, 20, 200000, 1, 4),
(38, 46, 20, 200000, 2, 4),
(39, 46, 20, 200000, 2, 4),
(40, 46, 30, 12000, 4, 4),
(41, 46, 30, 12000, 1, 4);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitietquyen`
--

CREATE TABLE `chitietquyen` (
  `maquyen` int(11) NOT NULL,
  `machucnang` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chitietquyen`
--

INSERT INTO `chitietquyen` (`maquyen`, `machucnang`) VALUES
(2, 1),
(2, 3),
(2, 4),
(2, 5),
(2, 6),
(2, 7),
(2, 8),
(2, 9),
(2, 10),
(2, 11),
(2, 12),
(2, 13),
(2, 14),
(2, 15),
(2, 16),
(2, 18),
(2, 19),
(2, 20),
(2, 21),
(2, 22);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chucnang`
--

CREATE TABLE `chucnang` (
  `ma` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chucnang`
--

INSERT INTO `chucnang` (`ma`, `ten`) VALUES
(1, 'Thêm sản phẩm'),
(3, 'Sửa sản phẩm'),
(4, 'Xóa sản phẩm'),
(5, 'Sửa khách hàng'),
(6, 'Xóa khách hàng'),
(7, 'Thêm loại'),
(8, 'Sửa loại'),
(9, 'Xóa loại'),
(10, 'Xem kho'),
(11, 'Sửa kho'),
(12, 'Nhập hàng'),
(13, 'Thêm nhà cung cấp'),
(14, 'Xóa nhà cung cấp'),
(15, 'Sửa nhà cung cấp'),
(16, 'Xử lý hóa đơn'),
(18, 'Thống kê'),
(19, 'Thêm nhân viên'),
(20, 'Xóa nhân viên'),
(21, 'Sửa nhân viên'),
(22, 'Quản lý đơn hàng');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `donvi`
--

CREATE TABLE `donvi` (
  `ma` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `donvi`
--

INSERT INTO `donvi` (`ma`, `ten`) VALUES
(1, 'Cái'),
(2, 'Thùng');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hangtrongkho`
--

CREATE TABLE `hangtrongkho` (
  `masanpham` int(11) NOT NULL,
  `maphieunhap` int(11) NOT NULL,
  `soluong` int(11) NOT NULL,
  `mamau` int(11) NOT NULL,
  `makichco` int(11) NOT NULL,
  `giaban` int(11) NOT NULL,
  `gianhap` int(11) NOT NULL,
  `matrangthai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `hangtrongkho`
--

INSERT INTO `hangtrongkho` (`masanpham`, `maphieunhap`, `soluong`, `mamau`, `makichco`, `giaban`, `gianhap`, `matrangthai`) VALUES
(1, 43, 40, 1, 1, 180000, 100000, 2),
(1, 43, 40, 2, 1, 180000, 100000, 2),
(1, 44, 40, 1, 1, 200000, 100000, 2),
(1, 45, 40, 1, 1, 200000, 100000, 2),
(1, 46, 40, 1, 1, 200000, 100000, 2),
(1, 46, 0, 2, 1, 540000, 135000, 1),
(1, 46, 9, 2, 3, 540000, 135000, 1),
(1, 50, 897, 4, 1, 0, 100000, 1),
(1, 50, 299, 8, 1, 0, 100000, 1),
(6, 43, 0, 5, 1, 190000, 100000, 1),
(6, 44, 20, 5, 1, 180000, 100000, 1),
(6, 45, 40, 5, 1, 200000, 100000, 1),
(6, 46, 40, 5, 1, 200000, 100000, 1),
(6, 51, 10, 4, 3, 0, 200000, 1),
(6, 51, 10, 8, 3, 0, 200000, 1),
(12, 43, 0, 1, 1, 200000, 100000, 1),
(12, 44, 0, 1, 1, 200000, 100000, 1),
(12, 45, 38, 1, 1, 200000, 100000, 1),
(12, 46, 40, 1, 1, 200000, 100000, 1),
(17, 46, 0, 2, 1, 540000, 135000, 1),
(17, 46, 0, 2, 3, 540000, 135000, 1),
(18, 46, 0, 2, 1, 600000, 200000, 1),
(18, 46, 0, 2, 2, 600000, 200000, 1),
(18, 46, 15, 2, 3, 600000, 200000, 1),
(19, 46, 10, 2, 1, 650000, 250000, 1),
(19, 46, 10, 2, 2, 650000, 250000, 1),
(19, 46, 10, 2, 3, 650000, 250000, 1),
(20, 46, 10, 4, 1, 650000, 250000, 1),
(20, 46, 10, 4, 2, 650000, 250000, 1),
(20, 46, 10, 4, 3, 650000, 250000, 1),
(21, 46, 10, 2, 4, 650000, 250000, 1),
(21, 46, 10, 5, 4, 650000, 250000, 1),
(21, 46, 10, 6, 4, 650000, 250000, 1),
(24, 46, 5, 7, 1, 1200000, 590000, 1),
(24, 46, 5, 7, 2, 1200000, 590000, 1),
(25, 46, 5, 3, 4, 1200000, 590000, 1),
(25, 46, 5, 4, 4, 1200000, 590000, 1),
(26, 46, 5, 8, 4, 2500000, 1000000, 1),
(27, 46, 5, 9, 4, 2500000, 590000, 1),
(28, 46, 5, 5, 4, 620000, 590000, 1),
(28, 46, 5, 8, 4, 620000, 590000, 1),
(29, 46, 5, 1, 1, 890000, 400000, 1),
(29, 46, 5, 1, 2, 890000, 400000, 1),
(29, 46, 5, 1, 3, 890000, 400000, 1),
(30, 46, 5, 4, 2, 890000, 400000, 1),
(30, 46, 5, 4, 3, 890000, 400000, 1),
(31, 46, 5, 4, 3, 990000, 800000, 1),
(32, 46, 5, 1, 4, 890000, 400000, 1),
(33, 46, 5, 1, 4, 9500000, 8000000, 1),
(34, 46, 2, 1, 3, 15500000, 8000000, 1),
(34, 46, 2, 1, 4, 1550000, 800000, 1),
(35, 46, 2, 1, 3, 22200000, 9000000, 1),
(36, 46, 2, 1, 4, 700000, 500, 1),
(37, 46, 20, 1, 4, 400000, 200000, 1),
(38, 46, 20, 2, 4, 240000, 200000, 1),
(39, 46, 20, 2, 4, 240000, 200000, 1),
(40, 46, 30, 4, 4, 16000, 1200, 1),
(41, 46, 30, 1, 4, 30000, 1200, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hoadon`
--

CREATE TABLE `hoadon` (
  `ma` int(11) NOT NULL,
  `tenkhachhang` text NOT NULL,
  `ngaylap` datetime NOT NULL,
  `matrangthaihoadon` int(11) NOT NULL,
  `manhanvien` int(11) DEFAULT NULL,
  `makhachhang` int(11) NOT NULL,
  `diachi` text NOT NULL,
  `sodienthoai` text NOT NULL,
  `email` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `hoadon`
--

INSERT INTO `hoadon` (`ma`, `tenkhachhang`, `ngaylap`, `matrangthaihoadon`, `manhanvien`, `makhachhang`, `diachi`, `sodienthoai`, `email`) VALUES
(26, 'Nguyễn Văn Sỹ Phú', '2023-12-04 14:23:51', 2, 1, 1, '279 Lâm Văn Bền', '0334171858', 'syphu1995@gmail.com'),
(28, 'Nguyễn Văn Sỹ Phú', '2023-12-05 10:47:42', 2, 1, 1, '279 Lâm Văn Bền', '0389201238', 'sdfhk@gmail.com'),
(29, 'Nguyễn Văn Sỹ Phú', '2023-12-05 10:47:56', 2, 1, 2, '279 Lâm Văn Bền', '0389201238', 'sdfhk@gmail.com'),
(30, 'Nguyễn Văn Sỹ Phú', '2023-12-05 10:55:12', 2, 1, 1, '279 Lâm Văn Bền', '0389201238', 'sdfhk@gmail.com'),
(31, 'Nguyễn Văn Sỹ Phú', '2023-12-05 10:55:25', 2, 1, 2, '279 Lâm Văn Bền', '0389201238', 'sdfhk@gmail.com'),
(32, 'Nguyễn Văn Sỹ Phú', '2023-12-05 10:55:39', 2, 1, 2, '279 Lâm Văn Bền', '0389201238', 'sdfhk@gmail.com'),
(33, 'Nguyễn Văn Sỹ Phú', '2023-12-05 10:55:50', 2, 1, 3, '279 Lâm Văn Bền', '0389201238', 'sdfhk@gmail.com'),
(34, 'Nguyễn Văn Sỹ Phú', '2023-12-05 10:55:56', 2, 2, 3, '279 Lâm Văn Bền', '0389201238', 'sdfhk@gmail.com'),
(35, 'Nguyễn Văn Sỹ Phú', '2023-12-05 10:56:02', 2, 2, 4, '279 Lâm Văn Bền', '0389201238', 'sdfhk@gmail.com'),
(36, 'Nguyễn Văn Sỹ Phú', '2023-12-05 10:56:02', 2, 2, 4, '279 Lâm Văn Bền', '0389201238', 'sdfhk@gmail.com'),
(37, 'Nguyễn Văn Sỹ Phú', '2023-12-05 11:21:59', 2, 2, 1, '279 Lâm Văn Bền', '0389201238', 'sdfhk@gmail.com'),
(38, 'Nguyễn Văn Sỹ Phú', '2023-12-05 11:22:06', 2, 2, 2, '279 Lâm Văn Bền', '0389201238', 'sdfhk@gmail.com'),
(39, 'Nguyễn Văn Sỹ Phú', '2023-12-05 11:26:25', 2, 2, 2, '279 Lâm Văn Bền', '0389201238', 'sdfhk@gmail.com'),
(40, 'Nguyễn Văn Sỹ Phú', '2023-12-05 11:26:45', 2, 2, 3, '279 Lâm Văn Bền', '0389201238', 'sdfhk@gmail.com'),
(41, 'Nguyễn Văn Sỹ Phú', '2023-12-05 11:27:16', 2, 2, 3, '279 Lâm Văn Bền', '0389201238', 'sdfhk@gmail.com'),
(42, 'Nguyễn Văn Sỹ Phú', '2023-12-05 11:27:20', 2, 2, 4, '279 Lâm Văn Bền', '0389201238', 'sdfhk@gmail.com'),
(43, 'Nguyễn Văn Sỹ Phú', '2023-12-05 11:27:47', 2, 3, 4, '279 Lâm Văn Bền', '0389201238', 'sdfhk@gmail.com'),
(44, 'Nguyễn Văn Sỹ Phú', '2023-12-05 11:30:35', 2, 3, 1, '279 Lâm Văn Bền', '0389201238', 'sdfhk@gmail.com'),
(45, 'Nguyễn Văn Sỹ Phú', '2023-12-05 11:30:44', 2, 3, 2, '279 Lâm Văn Bền', '0389201238', 'sdfhk@gmail.com'),
(46, 'Nguyễn Văn Sỹ Phú', '2023-12-05 11:30:45', 2, 3, 2, '279 Lâm Văn Bền', '0389201238', 'sdfhk@gmail.com'),
(47, 'Nguyễn Văn Sỹ Phú', '2023-12-05 11:30:45', 2, 3, 3, '279 Lâm Văn Bền', '0389201238', 'sdfhk@gmail.com'),
(48, 'Nguyễn Văn Sỹ Phú', '2023-12-05 11:30:46', 2, 3, 3, '279 Lâm Văn Bền', '0389201238', 'sdfhk@gmail.com'),
(49, 'Nguyễn Văn Sỹ Phú', '2023-12-05 11:30:47', 2, 3, 4, '279 Lâm Văn Bền', '0389201238', 'sdfhk@gmail.com'),
(50, 'Nguyễn Văn Sỹ Phú', '2023-12-05 11:30:47', 2, 3, 4, '279 Lâm Văn Bền', '0389201238', 'sdfhk@gmail.com'),
(51, 'Nguyễn Văn Sỹ Phú', '2023-12-05 21:21:55', 1, NULL, 1, '279 Lâm Văn Bền', '0389201238', 'sdfhk@gmail.com'),
(52, 'Vòng Cỏng Mềnh', '2023-12-05 21:22:09', 1, NULL, 2, '279 Lâm Văn Bền', '0389201238', 'sdfhk@gmail.com'),
(53, 'Vòng Cỏng Mềnh', '2023-12-05 21:23:54', 1, NULL, 2, '279 Lâm Văn Bền', '0389201238', 'sdfhk@gmail.com'),
(54, 'Nguyễn Minh Thao', '2023-12-05 21:24:24', 1, NULL, 3, '279 Lâm Văn Bền', '0389201238', 'sdfhk@gmail.com'),
(55, 'Nguyễn Minh Thao', '2023-12-05 21:24:46', 1, NULL, 3, '279 Lâm Văn Bền', '0389201238', 'sdfhk@gmail.com'),
(56, 'Nguyễn Văn Sỹ Phú', '2023-12-05 21:28:15', 1, NULL, 1, '279 Lâm Văn Bền', '0389201238', 'sdfhk@gmail.com'),
(57, 'Vòng Cỏng Mềnh', '2023-12-05 21:28:21', 1, NULL, 2, '279 Lâm Văn Bền', '0389201238', 'sdfhk@gmail.com'),
(58, 'Vòng Cỏng Mềnh', '2023-12-05 21:28:22', 1, NULL, 2, '279 Lâm Văn Bền', '0389201238', 'sdfhk@gmail.com'),
(59, 'Nguyễn Minh Thao', '2023-12-05 21:28:22', 1, NULL, 3, '279 Lâm Văn Bền', '0389201238', 'sdfhk@gmail.com'),
(60, 'Nguyễn Minh Thao', '2023-12-05 21:28:23', 1, NULL, 3, '279 Lâm Văn Bền', '0389201238', 'sdfhk@gmail.com'),
(61, 'Trần Phương Vy', '2023-12-05 21:28:24', 1, NULL, 4, '279 Lâm Văn Bền', '0389201238', 'sdfhk@gmail.com'),
(62, 'Trần Phương Vy', '2023-12-05 21:28:24', 1, NULL, 4, '279 Lâm Văn Bền', '0389201238', 'sdfhk@gmail.com'),
(63, 'Nguyễn Văn Sỹ Phú', '2023-12-08 16:52:25', 2, 1, 0, '279LVB', '0334171858', 'syphu1995@gmail.com'),
(64, 'Nguyễn Văn Sỹ Phú', '2023-12-08 17:01:35', 1, NULL, 0, '279LVB', '0334171858', 'syphu1995@gmail.com'),
(65, 'Nguyễn Văn Sỹ Phú', '2023-12-09 08:22:16', 3, 1, 0, '279LVB', '0334171858', 'syphu1995@gmail.com');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khachhang`
--

CREATE TABLE `khachhang` (
  `ma` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL,
  `ngaysinh` datetime NOT NULL,
  `sodienthoai` int(11) NOT NULL,
  `tentaikhoan` varchar(255) DEFAULT NULL,
  `ngaythamgia` datetime NOT NULL,
  `matrangthai` int(11) NOT NULL,
  `diachi` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `khachhang`
--

INSERT INTO `khachhang` (`ma`, `ten`, `ngaysinh`, `sodienthoai`, `tentaikhoan`, `ngaythamgia`, `matrangthai`, `diachi`) VALUES
(0, 'Khách', '2023-12-04 05:47:14', 0, NULL, '2023-12-04 05:47:14', 1, '279LVB'),
(1, 'Nguyễn Văn Sỹ Phú', '2002-11-30 07:00:00', 334171859, 'vy002359@gmail.com', '2023-10-31 11:10:44', 1, '279LVB'),
(2, 'Vòng Cỏng Mềnh', '2002-11-30 00:00:00', 334171858, 'syphu1997@gmail.com', '2023-11-04 08:22:38', 1, '279LVB'),
(3, 'Nguyễn Minh Thao', '2002-11-30 00:00:00', 334153333, 'syphud@fgd.vd', '2023-10-31 11:30:39', 1, '279LVB'),
(4, 'Trần Phương Vy', '2002-11-30 00:00:00', 334171858, 'syphu1997@gmail.com', '2023-11-02 13:42:10', 1, '279LVB');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `kichco`
--

CREATE TABLE `kichco` (
  `ma` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `kichco`
--

INSERT INTO `kichco` (`ma`, `ten`) VALUES
(1, 'S'),
(2, 'M'),
(3, 'L'),
(4, 'FreeSize');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lichsuhethong`
--

CREATE TABLE `lichsuhethong` (
  `ma` int(11) NOT NULL,
  `noidung` text NOT NULL,
  `thoigian` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `lichsuhethong`
--

INSERT INTO `lichsuhethong` (`ma`, `noidung`, `thoigian`) VALUES
(1, 'undefined undefined đã thực hiện lấy dữ liệu khách hàng!', '2023-11-28 08:59:10'),
(2, '1 Nguyễn Văn Sỹ Phú đã thực hiện lấy dữ liệu khách hàng!', '2023-11-28 09:08:14'),
(3, '1 Nguyễn Văn Sỹ Phú đã thực hiện lấy dữ liệu khách hàng!', '2023-11-28 09:11:46'),
(4, '1 Nguyễn Văn Sỹ Phú đã thực hiện lấy dữ liệu khách hàng!', '2023-11-28 09:16:41'),
(5, '1 Nguyễn Văn Sỹ Phú đã thực hiện lấy dữ liệu khách hàng!', '2023-11-28 09:21:35'),
(6, '1 Nguyễn Văn Sỹ Phú đã thực hiện lấy dữ liệu khách hàng!', '2023-11-28 09:22:33'),
(7, '1 Nguyễn Văn Sỹ Phú đã thực hiện lấy dữ liệu khách hàng!', '2023-11-28 09:28:21'),
(8, '1 Nguyễn Văn Sỹ Phú đã thực hiện lấy dữ liệu khách hàng!', '2023-11-28 09:31:18'),
(9, '1 Nguyễn Văn Sỹ Phú đã thực hiện lấy dữ liệu khách hàng!', '2023-11-28 09:38:47'),
(10, 'undefined undefined đã lấy thông tin khách hàng!', '2023-11-28 10:10:11'),
(11, '1 Nguyễn Văn Sỹ Phú đã sửa thông tin khách hàng có mã là 1!', '2023-11-28 12:21:55'),
(12, '1 Nguyễn Văn Sỹ Phú undefined', '2023-11-28 12:50:27'),
(13, '1 Nguyễn Văn Sỹ Phú đã xóa thông tin khách hàng có mã là 2!', '2023-11-28 13:18:37'),
(14, '1 Nguyễn Văn Sỹ Phú đã thêm sản phẩm có mã là undefined!', '2023-11-28 15:05:17'),
(15, '1 Nguyễn Văn Sỹ Phú đã sửa sản phẩm có mã là 1!', '2023-11-28 15:06:39'),
(16, '1 Nguyễn Văn Sỹ Phú đã sửa sản phẩm có mã là 1!', '2023-11-29 03:01:34'),
(17, '1 Nguyễn Văn Sỹ Phú đã sửa thông tin khách hàng có mã là 1!', '2023-12-02 06:22:48'),
(18, '1 Nguyễn Văn Sỹ Phú đã sửa thông tin khách hàng có mã là 1!', '2023-12-02 14:09:46'),
(19, '1 Nguyễn Văn Sỹ Phú đã sửa thông tin khách hàng có mã là 1!', '2023-12-02 14:18:28'),
(20, '1 Nguyễn Văn Sỹ Phú đã lấy thông tin khách hàng!', '2023-12-04 18:10:57'),
(21, '1 Nguyễn Văn Sỹ Phú đã lấy thông tin khách hàng!', '2023-12-04 18:11:08'),
(22, '1 Nguyễn Văn Sỹ Phú đã xử lý đơn hàng có mã 26', '2023-12-04 18:20:26'),
(23, '1 Nguyễn Văn Sỹ Phú đã xử lý đơn hàng có mã 26', '2023-12-05 16:29:01'),
(24, '1 Nguyễn Văn Sỹ Phú đã xử lý đơn hàng có mã 26', '2023-12-05 16:30:39'),
(25, '1 Nguyễn Văn Sỹ Phú đã xử lý đơn hàng có mã 26', '2023-12-05 16:33:53'),
(26, '1 Nguyễn Văn Sỹ Phú đã xử lý đơn hàng có mã 26', '2023-12-05 16:35:19'),
(27, '1 Nguyễn Văn Sỹ Phú themNhaCungCap', '2023-12-08 09:11:20'),
(28, '1 Nguyễn Văn Sỹ Phú themNhaCungCap', '2023-12-08 09:16:37'),
(29, '1 Nguyễn Văn Sỹ Phú đã thêm sản phẩm có mã là undefined!', '2023-12-08 21:35:34'),
(30, '1 Nguyễn Văn Sỹ Phú đã sửa sản phẩm có mã là 42!', '2023-12-08 21:36:18'),
(31, '1 Nguyễn Văn Sỹ Phú đã xóa sản phẩm có mã là 42!', '2023-12-08 22:19:09'),
(32, '1 Nguyễn Văn Sỹ Phú đã thêm sản phẩm có mã là undefined!', '2023-12-08 22:21:56'),
(33, '1 Nguyễn Văn Sỹ Phú đã sửa sản phẩm có mã là 43!', '2023-12-08 22:22:23'),
(34, '1 Nguyễn Văn Sỹ Phú đã xóa sản phẩm có mã là 43!', '2023-12-08 22:22:33'),
(35, '1 Nguyễn Văn Sỹ Phú đã thêm sản phẩm có mã là undefined!', '2023-12-08 22:24:07'),
(36, '1 Nguyễn Văn Sỹ Phú đã xóa sản phẩm có mã là 44!', '2023-12-08 22:24:21'),
(37, '1 Nguyễn Văn Sỹ Phú đã nhập hàng', '2023-12-09 09:55:16'),
(38, '1 Nguyễn Văn Sỹ Phú đã sửa nhân viên có id là 1', '2023-12-09 10:41:30'),
(39, '1 Nguyễn Văn Sỹ Phú đã sửa sản phẩm trong kho có mã là 1 43 1 1. \n      Giá mới: 180000 ', '2023-12-09 10:50:03'),
(40, '1 Nguyễn Văn Sỹ Phú đã xử lý đơn hàng có mã 63', '2023-12-09 10:52:49'),
(41, '1 Nguyễn Văn Sỹ Phú đã xử lý hóa đơn mã: 63', '2023-12-09 10:52:49'),
(42, '1 Nguyễn Văn Sỹ Phú đã xử lý đơn hàng có mã 65', '2023-12-09 10:54:49'),
(43, '1 Nguyễn Văn Sỹ Phú đã xử lý hóa đơn mã: 65', '2023-12-09 10:54:49'),
(44, '1 Nguyễn Văn Sỹ Phú đã nhập hàng', '2023-12-09 10:56:13'),
(45, '1 Nguyễn Văn Sỹ Phú đã lấy thông tin khách hàng!', '2023-12-09 10:57:01'),
(46, '1 Nguyễn Văn Sỹ Phú đã sửa thông tin khách hàng có mã là 1!', '2023-12-09 10:57:18'),
(47, '1 Nguyễn Văn Sỹ Phú đã lấy thông tin khách hàng!', '2023-12-09 10:57:18'),
(48, '1 Nguyễn Văn Sỹ Phú đã lấy thông tin khách hàng!', '2023-12-09 10:57:25'),
(49, '1 Nguyễn Văn Sỹ Phú đã thêm loại có mã là undefined!', '2023-12-09 12:42:03'),
(50, '1 Nguyễn Văn Sỹ Phú đã sửa loại có mã là 1!', '2023-12-09 12:51:27'),
(51, '1 Nguyễn Văn Sỹ Phú đã sửa loại có mã là 1!', '2023-12-09 12:54:41'),
(52, '1 Nguyễn Văn Sỹ Phú đã sửa loại có mã là 1!', '2023-12-09 12:56:26'),
(53, '1 Nguyễn Văn Sỹ Phú đã xóa loại có mã là 17!', '2023-12-09 13:01:07'),
(54, '1 Nguyễn Văn Sỹ Phú đã thêm loại có mã là undefined!', '2023-12-09 13:30:20'),
(55, '1 Nguyễn Văn Sỹ Phú đã sửa loại có mã là 18!', '2023-12-09 13:30:31'),
(56, '1 Nguyễn Văn Sỹ Phú đã xóa loại có mã là 18!', '2023-12-09 13:30:35');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `loai`
--

CREATE TABLE `loai` (
  `ma` int(11) NOT NULL,
  `ten` varchar(50) NOT NULL,
  `anhminhhoa` varchar(255) NOT NULL,
  `mota` varchar(255) NOT NULL,
  `maloaicha` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `loai`
--

INSERT INTO `loai` (`ma`, `ten`, `anhminhhoa`, `mota`, `maloaicha`) VALUES
(1, 'Áo', 'Ao.png', 'Loại áo để', NULL),
(2, 'Quần', 'quan.png', 'Loại quần để mặc', NULL),
(3, 'Áo khoác', 'aokhoac.png', 'Vippro', NULL),
(5, 'Đầm và chân váy', 'dam.png', 'dam', NULL),
(6, 'Áo thun', '', '', 1),
(7, 'Áo polo', '', '', 1),
(8, 'Quần Jeans', '', '', 2),
(9, 'Áo chăn bông', '', '', 3),
(10, 'Áo Blazer', '', '', 3),
(11, 'Áo Parka', '', '', 3),
(12, 'Đầm và jumpsuit', '', '', 5),
(13, 'Chân váy', '', '', 5),
(14, 'Phụ kiện', 'phuKien.jpg', '', NULL),
(15, 'Nón', '', '', 14),
(16, 'Vớ', '', '', 14);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `mathang`
--

CREATE TABLE `mathang` (
  `masanpham` int(11) NOT NULL,
  `mamau` int(11) NOT NULL,
  `makichco` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `mathang`
--

INSERT INTO `mathang` (`masanpham`, `mamau`, `makichco`) VALUES
(1, 1, 1),
(1, 2, 1),
(1, 2, 3),
(1, 4, 1),
(1, 8, 1),
(6, 1, 1),
(6, 4, 3),
(6, 5, 1),
(6, 8, 3),
(12, 1, 1),
(17, 1, 1),
(17, 1, 3),
(17, 2, 1),
(17, 2, 3),
(18, 2, 1),
(18, 2, 2),
(18, 2, 3),
(19, 2, 1),
(19, 2, 2),
(19, 2, 3),
(20, 4, 1),
(20, 4, 2),
(20, 4, 3),
(21, 2, 4),
(21, 5, 4),
(21, 6, 4),
(24, 7, 1),
(24, 7, 2),
(25, 3, 4),
(25, 4, 4),
(26, 8, 4),
(27, 9, 4),
(28, 5, 4),
(28, 8, 4),
(29, 1, 1),
(29, 1, 2),
(29, 1, 3),
(30, 4, 2),
(30, 4, 3),
(31, 4, 3),
(32, 1, 4),
(33, 1, 2),
(33, 1, 4),
(34, 1, 3),
(34, 1, 4),
(35, 1, 3),
(36, 1, 4),
(37, 1, 4),
(38, 2, 4),
(39, 2, 4),
(40, 4, 4),
(41, 1, 4);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `mau`
--

CREATE TABLE `mau` (
  `ma` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `mau`
--

INSERT INTO `mau` (`ma`, `ten`) VALUES
(1, '000000'),
(4, '191970'),
(8, '808080'),
(9, '8B4513'),
(6, '9932CC'),
(7, 'FF4500'),
(5, 'FFB6C1'),
(3, 'FFD700'),
(2, 'ffffff');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhacungcap`
--

CREATE TABLE `nhacungcap` (
  `ma` int(11) NOT NULL,
  `matrangthaincc` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL,
  `diachi` varchar(255) NOT NULL,
  `dienthoai` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `nhacungcap`
--

INSERT INTO `nhacungcap` (`ma`, `matrangthaincc`, `ten`, `diachi`, `dienthoai`) VALUES
(1, 1, 'NCC1', 'LVB', '0334171858'),
(2, 1, 'NCC2', 'LVB', '0334171859');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhanvien`
--

CREATE TABLE `nhanvien` (
  `ma` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL,
  `ngaysinh` datetime NOT NULL,
  `sodienthoai` varchar(11) NOT NULL,
  `socccd` varchar(11) NOT NULL,
  `tentaikhoan` varchar(255) DEFAULT NULL,
  `matrangthai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `nhanvien`
--

INSERT INTO `nhanvien` (`ma`, `ten`, `ngaysinh`, `sodienthoai`, `socccd`, `tentaikhoan`, `matrangthai`) VALUES
(1, 'Nguyễn Văn Sỹ Phú', '2002-11-30 07:00:00', '0334171858', '32423422322', 'syphu1995@gmail.com', 1),
(2, 'Nguyễn Minh Thao', '2002-07-29 21:33:59', '0334171859', '32423422322', 'nguyenminhthao12b1@gmail.com', 1),
(3, 'Vòng Cỏng Mềnh', '2002-02-18 21:33:59', '0334171860', '32423422322', 'vongcongmenh2k2@gmail.com', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phieunhap`
--

CREATE TABLE `phieunhap` (
  `ma` int(11) NOT NULL,
  `ngaynhap` datetime NOT NULL,
  `manhacungcap` int(11) NOT NULL,
  `manhanvien` int(11) NOT NULL,
  `ghichu` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `phieunhap`
--

INSERT INTO `phieunhap` (`ma`, `ngaynhap`, `manhacungcap`, `manhanvien`, `ghichu`) VALUES
(43, '2023-11-30 11:41:16', 1, 1, 'ok'),
(44, '2023-11-30 11:41:16', 2, 2, 'ok'),
(45, '2023-11-30 11:41:44', 1, 1, 'ok'),
(46, '2023-11-30 11:41:45', 1, 2, 'ok'),
(47, '2023-12-03 16:34:10', 1, 2, ''),
(48, '2023-12-09 09:51:38', 1, 1, 'Phieu nhap tao boi admin'),
(49, '2023-12-09 09:52:20', 1, 1, 'Phieu nhap tao boi admin'),
(50, '2023-12-09 09:55:16', 1, 1, 'Phieu nhap tao boi admin'),
(51, '2023-12-09 10:56:12', 2, 1, 'Phieu nhap tao boi admin');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `quyen`
--

CREATE TABLE `quyen` (
  `ma` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `quyen`
--

INSERT INTO `quyen` (`ma`, `ten`) VALUES
(1, 'Khách hàng'),
(2, 'Thử nghiệm sửa quyền'),
(3, 'admin1'),
(4, 'admin2');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sanpham`
--

CREATE TABLE `sanpham` (
  `ma` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL,
  `anhminhhoa` varchar(255) NOT NULL,
  `mota` varchar(255) NOT NULL,
  `madonvi` int(11) NOT NULL,
  `matrangthai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `sanpham`
--

INSERT INTO `sanpham` (`ma`, `ten`, `anhminhhoa`, `mota`, `madonvi`, `matrangthai`) VALUES
(1, 'Áo thun Nữ Áo phông nữ đơn giản thoải mái vải êm bền đẹp', 'aoThun2.jpg', 'deplamnhaa', 1, 1),
(6, 'QUẦN JEAN NỮ ỐNG RỘNG WASH RÁCH - QJ084', 'quan1.jpg', 'Áo khoác không giúp chống lạnh', 1, 1),
(12, 'Áo thun nữ tay ngắn cổ tròn thời trang Eden thêu chữ - AT097', 'aoThun1.jpg', 'hehe', 1, 1),
(16, 'Thử nghiệm lần n', 'macbook_air_m2_1_1.jpeg', 'ok không', 1, 1),
(17, 'Áo khoác bomber da F426 form rộng ulzzang - Made by Fiin', 'aoKhoac1.jpg', 'hehe', 1, 1),
(18, 'Áo Thun Nữ Unisex Màu Trắng In Chữ CRUSH ON U - TA082', 'aoThun3.jpg', '', 1, 1),
(19, 'Áo thun nữ trơn nữ cổ tròn 100% cotton màu trắng - Atlan', 'aoThun4.jpg', '', 1, 1),
(20, 'Áo thun nữ màu xanh than form rộng cổ tròn trơn đẹp', 'aoThun5.jpg', '', 1, 1),
(21, 'Áo thun POLO nữ tay lỡ có cổ phông form rộng freesize unisex', 'aoThun6.jpg', '', 1, 1),
(24, 'Áo khoác nữ dáng biker phối zip FWJK22FH04C', 'aoKhoac2.jpg', '', 1, 1),
(25, 'Áo Khoác Nữ Shryct Áo Khoác Bông Hàn Quốc', 'aoKhoac3.jpg', '', 1, 1),
(26, 'Áo khoác nữ dáng dài nhẹ nhàng thanh lịch - Bravo', 'aoKhoac4.png', '', 1, 1),
(27, 'Áo khoác nữ blazer công sở cao cấp màu nâu tây', 'aoKhoac5.jpg', '', 1, 1),
(28, 'Áo khoác thể thao Nữ ôm Body tập Gym, Yoga', 'aoKhoac6.jpg', '', 1, 1),
(29, 'Quần jean nữ ống rộng lưng cao rách màu đen - TS026', 'quan2.jpg', '', 1, 1),
(30, 'QUẦN JEAN NGỐ LỬNG NỮ CAO CẤP HADI LƯNG SIÊU CAO MÀU XANH NHẠT', 'quan3.jpg', '', 1, 1),
(31, 'QUẦN JEAN NỮ LƯNG CAO RÁCH GỐI CÁ TÍNH', 'quan4.jpg', '', 1, 1),
(32, 'Đầm nữ body viền bèo cộc tay dáng ngắn', 'dam1.png', '', 1, 1),
(33, 'Váy Tommy Hilfiger Midi Short-Sleeved Dresses ', 'dam2.jpg', '', 1, 1),
(34, 'ĐẦM NHUNG DẠ HỘI CỔ PHỐI LƯỚI KẾT PHA LÊ - DNA244DH', 'dam3.png', '', 1, 1),
(35, 'Đầm vest xếp ly tà lệch 1 bên IVY moda MS 48M7983', 'dam4.png', '', 1, 1),
(36, 'Chân Váy Lưới Xòe Nhiều lớp có quần bảo hộ', 'dam5.png', '', 1, 1),
(37, 'Chân váy chữ A xòe xếp ly có túi 2 lớp', 'dam6.png', '', 1, 1),
(38, 'Mũ nón len nữ Hàn Quốc LAGU bucket lông cừu', 'non1.jpg', '', 1, 1),
(39, 'NÓN NỮ RỘNG VÀNH ĐI BIỂN MŨ RỘNG VÀNH NỮ ĐẸP', 'non2.jpg', '', 1, 1),
(40, 'Tất (Vớ) Cổ Cao Caro Xanh Đen DOLOMen PKT04', 'vo1.png', '', 1, 1),
(41, 'TẤT ( VỚ) DÀI NỮ SEXY MÀU ĐEN REN ĐÙI TAT1101', 'vo2.jpg', '', 1, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `taikhoan`
--

CREATE TABLE `taikhoan` (
  `tentaikhoan` varchar(255) NOT NULL,
  `matkhau` varchar(255) NOT NULL,
  `maquyen` int(11) NOT NULL,
  `private_key` text DEFAULT NULL,
  `public_key` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `taikhoan`
--

INSERT INTO `taikhoan` (`tentaikhoan`, `matkhau`, `maquyen`, `private_key`, `public_key`) VALUES
('hello1', '$2b$10$Rg1WndlG/HT.IuKfbFmSB.6QLJSgCwXfn9s02fWM8M8fVRYP8pWga', 1, NULL, NULL),
('hello2', '$2b$10$xICsLUYxLePpBfLMcNPUIeQi6hSHxnlrZo1.Q8ksPnbldTpuOeBbS', 1, NULL, NULL),
('hello4', '$2b$10$Ec2T.CidjAJ2/jWivDZB8OFfOmvOQM0IPutpHXhapV28zJFef0qjC', 1, NULL, NULL),
('nguyenminhthao12b1@gmail.com', '$2b$10$D9NKqcPV72i2Eu38OHZniObM6phKNFMaDpEA1mKORBDr6OpeDD.dy', 2, NULL, NULL),
('syphu1995@gmail.com', '$2b$10$D9NKqcPV72i2Eu38OHZniObM6phKNFMaDpEA1mKORBDr6OpeDD.dy', 2, NULL, NULL),
('syphu1997@gmail.com', '$2b$10$A7MQCrX400O0rgerltF5.OiI6I9ZRLHIzYBwEBC0WdEC0fiIcnaEW', 1, NULL, NULL),
('syphud@fgd.vd', '$2b$10$6PtKK8fZI9niKtbymfJQIuPUyol6Js7TOKLJlhZF3s6f0qw/dyrTq', 1, NULL, NULL),
('vongcongmenh2k2@gmail.com', '$2b$10$D9NKqcPV72i2Eu38OHZniObM6phKNFMaDpEA1mKORBDr6OpeDD.dy', 2, NULL, NULL),
('vy002359@gmail.com', '$2b$10$FBrZ3VR2JmoGyZ3/NNrBmuTleMvQTHF4QIYovu1one2c755zTqRpi', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tinnhan`
--

CREATE TABLE `tinnhan` (
  `ip` text DEFAULT NULL,
  `noidung` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `trangthaihoadon`
--

CREATE TABLE `trangthaihoadon` (
  `ma` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `trangthaihoadon`
--

INSERT INTO `trangthaihoadon` (`ma`, `ten`) VALUES
(1, 'Chờ xác nhận'),
(2, 'Đã xác nhận '),
(3, 'Đã hủy');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `trangthaikhachhang`
--

CREATE TABLE `trangthaikhachhang` (
  `ma` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `trangthaikhachhang`
--

INSERT INTO `trangthaikhachhang` (`ma`, `ten`) VALUES
(1, 'Đang hoạt động'),
(2, 'Bị chặn');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `trangthainhacungcap`
--

CREATE TABLE `trangthainhacungcap` (
  `ma` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `trangthainhacungcap`
--

INSERT INTO `trangthainhacungcap` (`ma`, `ten`) VALUES
(1, 'Đang hoạt động'),
(2, 'Không hoạt động');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `trangthainhanvien`
--

CREATE TABLE `trangthainhanvien` (
  `ma` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `trangthainhanvien`
--

INSERT INTO `trangthainhanvien` (`ma`, `ten`) VALUES
(1, 'Đang hoạt động'),
(2, 'Ngừng hoạt động');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `trangthaisanpham`
--

CREATE TABLE `trangthaisanpham` (
  `ma` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `trangthaisanpham`
--

INSERT INTO `trangthaisanpham` (`ma`, `ten`) VALUES
(1, 'Đang bán'),
(2, 'Ngừng bán'),
(3, 'Bị xóa');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `chitietcungcap`
--
ALTER TABLE `chitietcungcap`
  ADD PRIMARY KEY (`masanpham`,`manhacungcap`),
  ADD KEY `ChiTietCungCap_manhacungcap_NhaCungCap_ma` (`manhacungcap`);

--
-- Chỉ mục cho bảng `chitietgiohang`
--
ALTER TABLE `chitietgiohang`
  ADD PRIMARY KEY (`masanpham`,`makhachhang`,`mamau`,`makichco`),
  ADD KEY `ChiTietGioHang_makhachhang_KhachHang_ma` (`makhachhang`),
  ADD KEY `ChiTietGioHang_mamau_MatHang_mamau` (`mamau`),
  ADD KEY `ChiTietGioHang_makichco_MatHang_makichco` (`makichco`);

--
-- Chỉ mục cho bảng `chitiethoadon`
--
ALTER TABLE `chitiethoadon`
  ADD PRIMARY KEY (`masanpham`,`mahoadon`,`mamau`,`makichco`,`maphieunhap`),
  ADD KEY `ChiTietHoaDon_mahoadon_HoaDon_ma` (`mahoadon`),
  ADD KEY `ChiTietHoaDon_makichco_HangTrongKho_makichco` (`makichco`),
  ADD KEY `ChiTietHoaDon_mamau_HangTrongKho_mamau` (`mamau`),
  ADD KEY `ChiTietHoaDon_maphieunhap_HangTrongKho_maphieunhap` (`maphieunhap`),
  ADD KEY `ChiTietHoaDon_masanpham_HangTrongKho_masanpham` (`masanpham`);

--
-- Chỉ mục cho bảng `chitietloaisanpham`
--
ALTER TABLE `chitietloaisanpham`
  ADD PRIMARY KEY (`maloai`,`masanpham`),
  ADD KEY `ChiTietLoaiSanPham_masanpham_SanPham_ma` (`masanpham`);

--
-- Chỉ mục cho bảng `chitietphieunhap`
--
ALTER TABLE `chitietphieunhap`
  ADD PRIMARY KEY (`masanpham`,`maphieunhap`,`mamau`,`makichco`),
  ADD KEY `ChiTietPhieuNhap_maphieunhap_PhieuNhap_ma` (`maphieunhap`),
  ADD KEY `ChiTietPhieuNhap_makichco_HangTrongKho_makichco` (`makichco`),
  ADD KEY `ChiTietPhieuNhap_mamau_HangTrongKho_mamau` (`mamau`),
  ADD KEY `ChiTietPhieuNhap_masanpham_HangTrongKho_masanpham` (`masanpham`);

--
-- Chỉ mục cho bảng `chitietquyen`
--
ALTER TABLE `chitietquyen`
  ADD PRIMARY KEY (`maquyen`,`machucnang`),
  ADD KEY `ChiTietQuyen_machucnang_ChucNang_ma` (`machucnang`);

--
-- Chỉ mục cho bảng `chucnang`
--
ALTER TABLE `chucnang`
  ADD PRIMARY KEY (`ma`);

--
-- Chỉ mục cho bảng `donvi`
--
ALTER TABLE `donvi`
  ADD PRIMARY KEY (`ma`);

--
-- Chỉ mục cho bảng `hangtrongkho`
--
ALTER TABLE `hangtrongkho`
  ADD PRIMARY KEY (`masanpham`,`maphieunhap`,`mamau`,`makichco`),
  ADD KEY `HangTrongKho_maphieunhap_PhieuNhap_ma` (`maphieunhap`),
  ADD KEY `HangTrongKho_mamau_MatHang_mamau` (`mamau`),
  ADD KEY `HangTrongKho_makichco_MatHang_makichco` (`makichco`),
  ADD KEY `HangTrongKho_masanpham_MatHang_masanpham` (`masanpham`),
  ADD KEY `mtt` (`matrangthai`);

--
-- Chỉ mục cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  ADD PRIMARY KEY (`ma`),
  ADD KEY `HoaDon_makhachhang_KhachHang_ma` (`makhachhang`),
  ADD KEY `HoaDon_manhanvien_NhanVien_ma` (`manhanvien`),
  ADD KEY `HoaDon_matrangthaihoadon_TrangThaiHoaDon_ma` (`matrangthaihoadon`);

--
-- Chỉ mục cho bảng `khachhang`
--
ALTER TABLE `khachhang`
  ADD PRIMARY KEY (`ma`),
  ADD KEY `KhachHang_tentaikhoan_TaiKhoan_tentaikhoan` (`tentaikhoan`),
  ADD KEY `KH_matrangthai_TTKH_ma` (`matrangthai`);

--
-- Chỉ mục cho bảng `kichco`
--
ALTER TABLE `kichco`
  ADD PRIMARY KEY (`ma`);

--
-- Chỉ mục cho bảng `lichsuhethong`
--
ALTER TABLE `lichsuhethong`
  ADD PRIMARY KEY (`ma`);

--
-- Chỉ mục cho bảng `loai`
--
ALTER TABLE `loai`
  ADD PRIMARY KEY (`ma`),
  ADD UNIQUE KEY `ten` (`ten`),
  ADD KEY `maloaicha_maloai` (`maloaicha`);

--
-- Chỉ mục cho bảng `mathang`
--
ALTER TABLE `mathang`
  ADD PRIMARY KEY (`masanpham`,`mamau`,`makichco`),
  ADD KEY `MatHang_makichco_KichCo_ma` (`makichco`),
  ADD KEY `MatHang_mamau_Mau_ma` (`mamau`),
  ADD KEY `MatHang_masanpham_SanPham_ma` (`masanpham`);

--
-- Chỉ mục cho bảng `mau`
--
ALTER TABLE `mau`
  ADD PRIMARY KEY (`ma`),
  ADD UNIQUE KEY `ten` (`ten`);

--
-- Chỉ mục cho bảng `nhacungcap`
--
ALTER TABLE `nhacungcap`
  ADD PRIMARY KEY (`ma`) USING BTREE,
  ADD KEY `NhaCungCap_matrangthaincc_TrangThaiNhaTrungCap_ma` (`matrangthaincc`);

--
-- Chỉ mục cho bảng `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD PRIMARY KEY (`ma`),
  ADD KEY `NhanVien_tentaikhoan_TaiKhoan_tentaikhoan` (`tentaikhoan`),
  ADD KEY `NhanVien_matrangthainhanvien_TrangThaiNhanVien_ma` (`matrangthai`);

--
-- Chỉ mục cho bảng `phieunhap`
--
ALTER TABLE `phieunhap`
  ADD PRIMARY KEY (`ma`),
  ADD KEY `PhieuNhap_manhanvien_NhanVien_ma` (`manhanvien`),
  ADD KEY `PhieuNhap_manhacungcap_NhaCungCap_ma` (`manhacungcap`);

--
-- Chỉ mục cho bảng `quyen`
--
ALTER TABLE `quyen`
  ADD PRIMARY KEY (`ma`);

--
-- Chỉ mục cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`ma`),
  ADD UNIQUE KEY `ten` (`ten`),
  ADD KEY `SanPham_madonvi_DonVi_ma` (`madonvi`),
  ADD KEY `mttsp` (`matrangthai`);

--
-- Chỉ mục cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD PRIMARY KEY (`tentaikhoan`) USING BTREE,
  ADD KEY `TaiKhoan_maquyen_Quyen_ma` (`maquyen`);

--
-- Chỉ mục cho bảng `trangthaihoadon`
--
ALTER TABLE `trangthaihoadon`
  ADD PRIMARY KEY (`ma`);

--
-- Chỉ mục cho bảng `trangthaikhachhang`
--
ALTER TABLE `trangthaikhachhang`
  ADD PRIMARY KEY (`ma`);

--
-- Chỉ mục cho bảng `trangthainhacungcap`
--
ALTER TABLE `trangthainhacungcap`
  ADD PRIMARY KEY (`ma`);

--
-- Chỉ mục cho bảng `trangthainhanvien`
--
ALTER TABLE `trangthainhanvien`
  ADD PRIMARY KEY (`ma`);

--
-- Chỉ mục cho bảng `trangthaisanpham`
--
ALTER TABLE `trangthaisanpham`
  ADD PRIMARY KEY (`ma`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `chucnang`
--
ALTER TABLE `chucnang`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT cho bảng `donvi`
--
ALTER TABLE `donvi`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT cho bảng `khachhang`
--
ALTER TABLE `khachhang`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `kichco`
--
ALTER TABLE `kichco`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `lichsuhethong`
--
ALTER TABLE `lichsuhethong`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT cho bảng `loai`
--
ALTER TABLE `loai`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT cho bảng `mau`
--
ALTER TABLE `mau`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `nhacungcap`
--
ALTER TABLE `nhacungcap`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `nhanvien`
--
ALTER TABLE `nhanvien`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `phieunhap`
--
ALTER TABLE `phieunhap`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT cho bảng `quyen`
--
ALTER TABLE `quyen`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT cho bảng `trangthaihoadon`
--
ALTER TABLE `trangthaihoadon`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `trangthaikhachhang`
--
ALTER TABLE `trangthaikhachhang`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `trangthainhacungcap`
--
ALTER TABLE `trangthainhacungcap`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `trangthainhanvien`
--
ALTER TABLE `trangthainhanvien`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `trangthaisanpham`
--
ALTER TABLE `trangthaisanpham`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `chitietcungcap`
--
ALTER TABLE `chitietcungcap`
  ADD CONSTRAINT `ChiTietCungCap_manhacungcap_NhaCungCap_ma` FOREIGN KEY (`manhacungcap`) REFERENCES `nhacungcap` (`ma`),
  ADD CONSTRAINT `ChiTietCungCap_masanpham_SanPham_ma` FOREIGN KEY (`masanpham`) REFERENCES `sanpham` (`ma`);

--
-- Các ràng buộc cho bảng `chitietgiohang`
--
ALTER TABLE `chitietgiohang`
  ADD CONSTRAINT `ChiTietGioHang_makhachhang_KhachHang_ma` FOREIGN KEY (`makhachhang`) REFERENCES `khachhang` (`ma`),
  ADD CONSTRAINT `ChiTietGioHang_makichco_MatHang_makichco` FOREIGN KEY (`makichco`) REFERENCES `mathang` (`makichco`),
  ADD CONSTRAINT `ChiTietGioHang_mamau_MatHang_mamau` FOREIGN KEY (`mamau`) REFERENCES `mathang` (`mamau`),
  ADD CONSTRAINT `ChiTietGioHang_masanpham_MatHang_masanpham` FOREIGN KEY (`masanpham`) REFERENCES `mathang` (`masanpham`);

--
-- Các ràng buộc cho bảng `chitiethoadon`
--
ALTER TABLE `chitiethoadon`
  ADD CONSTRAINT `ChiTietHoaDon_mahoadon_HoaDon_ma` FOREIGN KEY (`mahoadon`) REFERENCES `hoadon` (`ma`),
  ADD CONSTRAINT `ChiTietHoaDon_makichco_HangTrongKho_makichco` FOREIGN KEY (`makichco`) REFERENCES `hangtrongkho` (`makichco`),
  ADD CONSTRAINT `ChiTietHoaDon_mamau_HangTrongKho_mamau` FOREIGN KEY (`mamau`) REFERENCES `hangtrongkho` (`mamau`),
  ADD CONSTRAINT `ChiTietHoaDon_maphieunhap_HangTrongKho_maphieunhap` FOREIGN KEY (`maphieunhap`) REFERENCES `hangtrongkho` (`maphieunhap`),
  ADD CONSTRAINT `ChiTietHoaDon_masanpham_HangTrongKho_masanpham` FOREIGN KEY (`masanpham`) REFERENCES `hangtrongkho` (`masanpham`);

--
-- Các ràng buộc cho bảng `chitietloaisanpham`
--
ALTER TABLE `chitietloaisanpham`
  ADD CONSTRAINT `ChiTietLoaiSanPham_maloai_Loai_ma` FOREIGN KEY (`maloai`) REFERENCES `loai` (`ma`),
  ADD CONSTRAINT `ChiTietLoaiSanPham_masanpham_SanPham_ma` FOREIGN KEY (`masanpham`) REFERENCES `sanpham` (`ma`);

--
-- Các ràng buộc cho bảng `chitietphieunhap`
--
ALTER TABLE `chitietphieunhap`
  ADD CONSTRAINT `ChiTietPhieuNhap_makichco_HangTrongKho_makichco` FOREIGN KEY (`makichco`) REFERENCES `kichco` (`ma`),
  ADD CONSTRAINT `ChiTietPhieuNhap_mamau_HangTrongKho_mamau` FOREIGN KEY (`mamau`) REFERENCES `mau` (`ma`),
  ADD CONSTRAINT `ChiTietPhieuNhap_maphieunhap_PhieuNhap_ma` FOREIGN KEY (`maphieunhap`) REFERENCES `phieunhap` (`ma`),
  ADD CONSTRAINT `ChiTietPhieuNhap_masanpham_HangTrongKho_masanpham` FOREIGN KEY (`masanpham`) REFERENCES `sanpham` (`ma`);

--
-- Các ràng buộc cho bảng `chitietquyen`
--
ALTER TABLE `chitietquyen`
  ADD CONSTRAINT `ChiTietQuyen_machucnang_ChucNang_ma` FOREIGN KEY (`machucnang`) REFERENCES `chucnang` (`ma`),
  ADD CONSTRAINT `ChiTietQuyen_maquyen_Quyen_ma` FOREIGN KEY (`maquyen`) REFERENCES `quyen` (`ma`);

--
-- Các ràng buộc cho bảng `hangtrongkho`
--
ALTER TABLE `hangtrongkho`
  ADD CONSTRAINT `HangTrongKho_makichco_MatHang_makichco` FOREIGN KEY (`makichco`) REFERENCES `kichco` (`ma`),
  ADD CONSTRAINT `HangTrongKho_mamau_MatHang_mamau` FOREIGN KEY (`mamau`) REFERENCES `mau` (`ma`),
  ADD CONSTRAINT `HangTrongKho_maphieunhap_PhieuNhap_ma` FOREIGN KEY (`maphieunhap`) REFERENCES `phieunhap` (`ma`),
  ADD CONSTRAINT `HangTrongKho_masanpham_MatHang_masanpham` FOREIGN KEY (`masanpham`) REFERENCES `sanpham` (`ma`),
  ADD CONSTRAINT `mtt` FOREIGN KEY (`matrangthai`) REFERENCES `trangthaisanpham` (`ma`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  ADD CONSTRAINT `HoaDon_makhachhang_KhachHang_ma` FOREIGN KEY (`makhachhang`) REFERENCES `khachhang` (`ma`),
  ADD CONSTRAINT `HoaDon_manhanvien_NhanVien_ma` FOREIGN KEY (`manhanvien`) REFERENCES `nhanvien` (`ma`),
  ADD CONSTRAINT `HoaDon_matrangthaihoadon_TrangThaiHoaDon_ma` FOREIGN KEY (`matrangthaihoadon`) REFERENCES `trangthaihoadon` (`ma`);

--
-- Các ràng buộc cho bảng `khachhang`
--
ALTER TABLE `khachhang`
  ADD CONSTRAINT `KhachHang_matrangthai_TrangThaiKhachHang_ma` FOREIGN KEY (`matrangthai`) REFERENCES `trangthaikhachhang` (`ma`),
  ADD CONSTRAINT `KhachHang_tentaikhoan_TaiKhoan_tentaikhoan` FOREIGN KEY (`tentaikhoan`) REFERENCES `taikhoan` (`tentaikhoan`);

--
-- Các ràng buộc cho bảng `loai`
--
ALTER TABLE `loai`
  ADD CONSTRAINT `maloaicha_maloai` FOREIGN KEY (`maloaicha`) REFERENCES `loai` (`ma`);

--
-- Các ràng buộc cho bảng `mathang`
--
ALTER TABLE `mathang`
  ADD CONSTRAINT `MatHang_makichco_KichCo_ma` FOREIGN KEY (`makichco`) REFERENCES `kichco` (`ma`),
  ADD CONSTRAINT `MatHang_mamau_Mau_ma` FOREIGN KEY (`mamau`) REFERENCES `mau` (`ma`),
  ADD CONSTRAINT `MatHang_masanpham_SanPham_ma` FOREIGN KEY (`masanpham`) REFERENCES `sanpham` (`ma`);

--
-- Các ràng buộc cho bảng `nhacungcap`
--
ALTER TABLE `nhacungcap`
  ADD CONSTRAINT `NhaCungCap_matrangthaincc_TrangThaiNhaTrungCap_ma` FOREIGN KEY (`matrangthaincc`) REFERENCES `trangthainhacungcap` (`ma`);

--
-- Các ràng buộc cho bảng `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD CONSTRAINT `NhanVien_matrangthainhanvien_TrangThaiNhanVien_ma` FOREIGN KEY (`matrangthai`) REFERENCES `trangthainhanvien` (`ma`),
  ADD CONSTRAINT `NhanVien_tentaikhoan_TaiKhoan_tentaikhoan` FOREIGN KEY (`tentaikhoan`) REFERENCES `taikhoan` (`tentaikhoan`);

--
-- Các ràng buộc cho bảng `phieunhap`
--
ALTER TABLE `phieunhap`
  ADD CONSTRAINT `PhieuNhap_manhacungcap_NhaCungCap_ma` FOREIGN KEY (`manhacungcap`) REFERENCES `nhacungcap` (`ma`),
  ADD CONSTRAINT `PhieuNhap_manhanvien_NhanVien_ma` FOREIGN KEY (`manhanvien`) REFERENCES `nhanvien` (`ma`);

--
-- Các ràng buộc cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD CONSTRAINT `SanPham_madonvi_DonVi_ma` FOREIGN KEY (`madonvi`) REFERENCES `donvi` (`ma`),
  ADD CONSTRAINT `mttsp` FOREIGN KEY (`matrangthai`) REFERENCES `trangthaisanpham` (`ma`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD CONSTRAINT `TaiKhoan_maquyen_Quyen_ma` FOREIGN KEY (`maquyen`) REFERENCES `quyen` (`ma`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
