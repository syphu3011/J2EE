-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th10 19, 2023 lúc 11:45 AM
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
-- Cấu trúc bảng cho bảng `ChiTietCungCap`
--

CREATE TABLE `ChiTietCungCap` (
  `masanpham` int(11) NOT NULL,
  `manhacungcap` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ChiTietGioHang`
--

CREATE TABLE `ChiTietGioHang` (
  `masanpham` int(11) NOT NULL,
  `makhachhang` int(11) NOT NULL,
  `soluong` int(11) NOT NULL,
  `mamau` int(11) NOT NULL,
  `makichco` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ChiTietHoaDon`
--

CREATE TABLE `ChiTietHoaDon` (
  `masanpham` int(11) NOT NULL,
  `mahoadon` int(11) NOT NULL,
  `soluong` int(11) NOT NULL,
  `gia` int(11) NOT NULL,
  `mamau` int(11) NOT NULL,
  `makichco` int(11) NOT NULL,
  `maphieunhap` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ChiTietLoaiSanPham`
--

CREATE TABLE `ChiTietLoaiSanPham` (
  `maloai` int(11) NOT NULL,
  `masanpham` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `ChiTietLoaiSanPham`
--

INSERT INTO `ChiTietLoaiSanPham` (`maloai`, `masanpham`) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 4),
(2, 5),
(3, 6);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ChiTietPhieuNhap`
--

CREATE TABLE `ChiTietPhieuNhap` (
  `masanpham` int(11) NOT NULL,
  `maphieunhap` int(11) NOT NULL,
  `soluong` int(11) NOT NULL,
  `gianhap` int(11) NOT NULL,
  `mamau` int(11) NOT NULL,
  `makichco` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `ChiTietPhieuNhap`
--

INSERT INTO `ChiTietPhieuNhap` (`masanpham`, `maphieunhap`, `soluong`, `gianhap`, `mamau`, `makichco`) VALUES
(1, 1, 20, 1800000, 1, 1),
(1, 2, 34, 1800000, 1, 1),
(2, 1, 46, 1000000, 1, 1),
(6, 1, 46, 1000000, 1, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ChiTietQuyen`
--

CREATE TABLE `ChiTietQuyen` (
  `maquyen` int(11) NOT NULL,
  `machucnang` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `ChiTietQuyen`
--

INSERT INTO `ChiTietQuyen` (`maquyen`, `machucnang`) VALUES
(2, 1),
(2, 3),
(2, 4);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ChucNang`
--

CREATE TABLE `ChucNang` (
  `ma` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `ChucNang`
--

INSERT INTO `ChucNang` (`ma`, `ten`) VALUES
(1, 'themSanPham'),
(3, 'suaSanPham'),
(4, 'xoaSanPham');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `DonVi`
--

CREATE TABLE `DonVi` (
  `ma` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `DonVi`
--

INSERT INTO `DonVi` (`ma`, `ten`) VALUES
(1, 'Cái');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `HangTrongKho`
--

CREATE TABLE `HangTrongKho` (
  `masanpham` int(11) NOT NULL,
  `maphieunhap` int(11) NOT NULL,
  `soluong` int(11) NOT NULL,
  `mamau` int(11) NOT NULL,
  `makichco` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `HangTrongKho`
--

INSERT INTO `HangTrongKho` (`masanpham`, `maphieunhap`, `soluong`, `mamau`, `makichco`) VALUES
(1, 1, 20, 1, 1),
(1, 2, 34, 1, 1),
(2, 1, 46, 1, 1),
(6, 2, 46, 1, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `HoaDon`
--

CREATE TABLE `HoaDon` (
  `ma` int(11) NOT NULL,
  `ngaylap` datetime NOT NULL,
  `matrangthaihoadon` int(11) NOT NULL,
  `manhanvien` int(11) NOT NULL,
  `makhachhang` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `KhachHang`
--

CREATE TABLE `KhachHang` (
  `ma` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL,
  `ngaysinh` datetime NOT NULL,
  `sodienthoai` int(11) NOT NULL,
  `tentaikhoan` varchar(255) NOT NULL,
  `ngaythamgia` datetime NOT NULL,
  `matrangthai` int(11) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `KhachHang`
--

INSERT INTO `KhachHang` (`ma`, `ten`, `ngaysinh`, `sodienthoai`, `tentaikhoan`, `ngaythamgia`, `matrangthai`, `email`) VALUES
(1, 'NguyÅn Vn Sù Phú', '2002-11-30 00:00:00', 334171858, 'sdfds@gmail.com', '2023-10-31 11:10:44', 1, 'sdfds@gmail.com'),
(2, 'NguyÅn Vn Sù Phú', '2002-11-30 00:00:00', 344232443, 'sy@gmail.com', '2023-10-31 11:28:55', 1, 'sy@gmail.com'),
(3, 'NguyÅn Vn Sù Phú', '2002-11-30 00:00:00', 334153333, 'syphud@fgd.vd', '2023-10-31 11:30:39', 1, 'syphud@fgd.vd'),
(4, 'NguyÅn Vn Sù Phú', '2002-11-30 00:00:00', 334171858, 'syphu1997@gmail.com', '2023-11-02 13:42:10', 1, 'syphu1996@gmail.com'),
(5, 'NguyÅn Vn Sù Phú', '2002-11-30 00:00:00', 334171858, 'syphu1997@gmail.com', '2023-11-04 08:22:38', 1, 'syphu1997@gmail.com');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `KichCo`
--

CREATE TABLE `KichCo` (
  `ma` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `KichCo`
--

INSERT INTO `KichCo` (`ma`, `ten`) VALUES
(1, 'S'),
(2, 'M'),
(3, 'L');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `Loai`
--

CREATE TABLE `Loai` (
  `ma` int(11) NOT NULL,
  `ten` varchar(11) NOT NULL,
  `anhminhhoa` varchar(255) NOT NULL,
  `mota` varchar(255) NOT NULL,
  `maloaicha` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `Loai`
--

INSERT INTO `Loai` (`ma`, `ten`, `anhminhhoa`, `mota`, `maloaicha`) VALUES
(1, 'Áo', 'Ao.png', 'Loại áo để mặc', NULL),
(2, 'Quần', 'quan.png', 'Loại quần để mặc', NULL),
(3, 'Áo khoác', 'aokhoac.png', 'Vippro', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `MatHang`
--

CREATE TABLE `MatHang` (
  `masanpham` int(11) NOT NULL,
  `mamau` int(11) NOT NULL,
  `matrangthaisanpham` int(11) NOT NULL,
  `makichco` int(11) NOT NULL,
  `giaban` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `MatHang`
--

INSERT INTO `MatHang` (`masanpham`, `mamau`, `matrangthaisanpham`, `makichco`, `giaban`) VALUES
(1, 1, 1, 1, 2000000),
(1, 2, 1, 1, 3000000),
(2, 1, 1, 1, 1000000),
(2, 2, 1, 1, 3000000),
(6, 2, 1, 3, 2000000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `Mau`
--

CREATE TABLE `Mau` (
  `ma` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `Mau`
--

INSERT INTO `Mau` (`ma`, `ten`) VALUES
(1, '000000'),
(2, 'ffffff');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `NhaCungCap`
--

CREATE TABLE `NhaCungCap` (
  `ma` int(11) NOT NULL,
  `matrangthaincc` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL,
  `diachi` varchar(255) NOT NULL,
  `dienthoai` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `NhaCungCap`
--

INSERT INTO `NhaCungCap` (`ma`, `matrangthaincc`, `ten`, `diachi`, `dienthoai`) VALUES
(1, 1, 'NCC1', 'LVB', '0334171858');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `NhanVien`
--

CREATE TABLE `NhanVien` (
  `ma` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL,
  `ngaysinh` datetime NOT NULL,
  `sodienthoai` varchar(11) NOT NULL,
  `socccd` varchar(11) NOT NULL,
  `tentaikhoan` varchar(255) NOT NULL,
  `matrangthai` int(11) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `NhanVien`
--

INSERT INTO `NhanVien` (`ma`, `ten`, `ngaysinh`, `sodienthoai`, `socccd`, `tentaikhoan`, `matrangthai`, `email`) VALUES
(1, 'Nguyễn Văn Sỹ Phú', '2002-10-30 21:33:59', '0334171858', '32423422322', 'syphu1995@gmail.com', 1, 'syphu1995@gmail.com');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `PhieuNhap`
--

CREATE TABLE `PhieuNhap` (
  `ma` int(11) NOT NULL,
  `ngaynhap` datetime NOT NULL,
  `manhacungcap` int(11) NOT NULL,
  `manhanvien` int(11) NOT NULL,
  `ghichu` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `PhieuNhap`
--

INSERT INTO `PhieuNhap` (`ma`, `ngaynhap`, `manhacungcap`, `manhanvien`, `ghichu`) VALUES
(1, '2023-11-09 05:34:08', 1, 1, 'VIPPRO'),
(2, '2023-11-09 05:51:15', 1, 1, 'VIPLAM');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `Quyen`
--

CREATE TABLE `Quyen` (
  `ma` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `Quyen`
--

INSERT INTO `Quyen` (`ma`, `ten`) VALUES
(1, 'Khách hàng'),
(2, 'admin'),
(3, 'admin'),
(4, 'admin');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `SanPham`
--

CREATE TABLE `SanPham` (
  `ma` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL,
  `anhminhhoa` varchar(255) NOT NULL,
  `mota` varchar(255) NOT NULL,
  `madonvi` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `SanPham`
--

INSERT INTO `SanPham` (`ma`, `ten`, `anhminhhoa`, `mota`, `madonvi`) VALUES
(1, 'SanPham3', 'Ao.png', 'deplamnha', 1),
(2, 'SanPham3', 'aokhoac.png', 'deplamnha', 1),
(3, 'SanPham3', 'dam.png', 'deplamnha', 1),
(4, 'SanPham3', 'quan.png', 'deplamnha', 1),
(5, 'SanPham3', 'vo.png', 'deplamnha', 1),
(6, 'Áo khoác mỏng', 'Ao.png', 'Áo khoác không giúp chống lạnh', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `TaiKhoan`
--

CREATE TABLE `TaiKhoan` (
  `tentaikhoan` varchar(255) NOT NULL,
  `matkhau` varchar(255) NOT NULL,
  `maquyen` int(11) NOT NULL,
  `private_key` text DEFAULT NULL,
  `public_key` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `TaiKhoan`
--

INSERT INTO `TaiKhoan` (`tentaikhoan`, `matkhau`, `maquyen`, `private_key`, `public_key`) VALUES
('hello1', '$2b$10$Rg1WndlG/HT.IuKfbFmSB.6QLJSgCwXfn9s02fWM8M8fVRYP8pWga', 1, NULL, NULL),
('hello2', '$2b$10$xICsLUYxLePpBfLMcNPUIeQi6hSHxnlrZo1.Q8ksPnbldTpuOeBbS', 1, NULL, NULL),
('hello4', '$2b$10$Ec2T.CidjAJ2/jWivDZB8OFfOmvOQM0IPutpHXhapV28zJFef0qjC', 1, NULL, NULL),
('sdfds@gmail.com', '$2b$10$vteqgqW8LQxup.mrGXin0.qbhMLVQjKLXgW1ka7PnFkxivr3b3Zl.', 1, NULL, NULL),
('sy@gmail.com', '$2b$10$oPc4KRjllLZh7H9z6/E4n.jd9XvLwnBZ1I.JGv94sj4DEp1IguPp.', 1, NULL, NULL),
('syphu1995@gmail.com', '$2b$10$D9NKqcPV72i2Eu38OHZniObM6phKNFMaDpEA1mKORBDr6OpeDD.dy', 2, NULL, NULL),
('syphu1997@gmail.com', '$2b$10$A7MQCrX400O0rgerltF5.OiI6I9ZRLHIzYBwEBC0WdEC0fiIcnaEW', 1, NULL, NULL),
('syphud@fgd.vd', '$2b$10$6PtKK8fZI9niKtbymfJQIuPUyol6Js7TOKLJlhZF3s6f0qw/dyrTq', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `TrangThaiHoaDon`
--

CREATE TABLE `TrangThaiHoaDon` (
  `ma` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `TrangThaiKhachHang`
--

CREATE TABLE `TrangThaiKhachHang` (
  `ma` int(11) NOT NULL,
  `tentrangthai` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `TrangThaiKhachHang`
--

INSERT INTO `TrangThaiKhachHang` (`ma`, `tentrangthai`) VALUES
(1, 'Đang hoạt động');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `TrangThaiNhaCungCap`
--

CREATE TABLE `TrangThaiNhaCungCap` (
  `ma` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `TrangThaiNhaCungCap`
--

INSERT INTO `TrangThaiNhaCungCap` (`ma`, `ten`) VALUES
(1, 'Đang hoạt động'),
(2, 'Không hoạt động');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `TrangThaiNhanVien`
--

CREATE TABLE `TrangThaiNhanVien` (
  `ma` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `TrangThaiNhanVien`
--

INSERT INTO `TrangThaiNhanVien` (`ma`, `ten`) VALUES
(1, 'Đang hoạt động');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `TrangThaiSanPham`
--

CREATE TABLE `TrangThaiSanPham` (
  `ma` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `TrangThaiSanPham`
--

INSERT INTO `TrangThaiSanPham` (`ma`, `ten`) VALUES
(1, 'Đang bán');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `ChiTietCungCap`
--
ALTER TABLE `ChiTietCungCap`
  ADD PRIMARY KEY (`masanpham`,`manhacungcap`),
  ADD KEY `ChiTietCungCap_manhacungcap_NhaCungCap_ma` (`manhacungcap`);

--
-- Chỉ mục cho bảng `ChiTietGioHang`
--
ALTER TABLE `ChiTietGioHang`
  ADD PRIMARY KEY (`masanpham`,`makhachhang`,`mamau`,`makichco`),
  ADD KEY `ChiTietGioHang_makhachhang_KhachHang_ma` (`makhachhang`),
  ADD KEY `ChiTietGioHang_mamau_MatHang_mamau` (`mamau`),
  ADD KEY `ChiTietGioHang_makichco_MatHang_makichco` (`makichco`);

--
-- Chỉ mục cho bảng `ChiTietHoaDon`
--
ALTER TABLE `ChiTietHoaDon`
  ADD PRIMARY KEY (`masanpham`,`mahoadon`,`mamau`,`makichco`,`maphieunhap`),
  ADD KEY `ChiTietHoaDon_mahoadon_HoaDon_ma` (`mahoadon`),
  ADD KEY `ChiTietHoaDon_makichco_HangTrongKho_makichco` (`makichco`),
  ADD KEY `ChiTietHoaDon_mamau_HangTrongKho_mamau` (`mamau`),
  ADD KEY `ChiTietHoaDon_maphieunhap_HangTrongKho_maphieunhap` (`maphieunhap`);

--
-- Chỉ mục cho bảng `ChiTietLoaiSanPham`
--
ALTER TABLE `ChiTietLoaiSanPham`
  ADD PRIMARY KEY (`maloai`,`masanpham`),
  ADD KEY `ChiTietLoaiSanPham_masanpham_SanPham_ma` (`masanpham`);

--
-- Chỉ mục cho bảng `ChiTietPhieuNhap`
--
ALTER TABLE `ChiTietPhieuNhap`
  ADD PRIMARY KEY (`masanpham`,`maphieunhap`,`mamau`,`makichco`),
  ADD KEY `ChiTietPhieuNhap_maphieunhap_PhieuNhap_ma` (`maphieunhap`),
  ADD KEY `ChiTietPhieuNhap_makichco_HangTrongKho_makichco` (`makichco`),
  ADD KEY `ChiTietPhieuNhap_mamau_HangTrongKho_mamau` (`mamau`);

--
-- Chỉ mục cho bảng `ChiTietQuyen`
--
ALTER TABLE `ChiTietQuyen`
  ADD PRIMARY KEY (`maquyen`,`machucnang`),
  ADD KEY `ChiTietQuyen_machucnang_ChucNang_ma` (`machucnang`);

--
-- Chỉ mục cho bảng `ChucNang`
--
ALTER TABLE `ChucNang`
  ADD PRIMARY KEY (`ma`);

--
-- Chỉ mục cho bảng `DonVi`
--
ALTER TABLE `DonVi`
  ADD PRIMARY KEY (`ma`);

--
-- Chỉ mục cho bảng `HangTrongKho`
--
ALTER TABLE `HangTrongKho`
  ADD PRIMARY KEY (`masanpham`,`maphieunhap`,`mamau`,`makichco`),
  ADD KEY `HangTrongKho_maphieunhap_PhieuNhap_ma` (`maphieunhap`),
  ADD KEY `HangTrongKho_mamau_MatHang_mamau` (`mamau`),
  ADD KEY `HangTrongKho_makichco_MatHang_makichco` (`makichco`);

--
-- Chỉ mục cho bảng `HoaDon`
--
ALTER TABLE `HoaDon`
  ADD PRIMARY KEY (`ma`),
  ADD KEY `HoaDon_makhachhang_KhachHang_ma` (`makhachhang`),
  ADD KEY `HoaDon_manhanvien_NhanVien_ma` (`manhanvien`),
  ADD KEY `HoaDon_matrangthaihoadon_TrangThaiHoaDon_ma` (`matrangthaihoadon`);

--
-- Chỉ mục cho bảng `KhachHang`
--
ALTER TABLE `KhachHang`
  ADD PRIMARY KEY (`ma`),
  ADD KEY `KhachHang_tentaikhoan_TaiKhoan_tentaikhoan` (`tentaikhoan`),
  ADD KEY `KH_matrangthai_TTKH_ma` (`matrangthai`);

--
-- Chỉ mục cho bảng `KichCo`
--
ALTER TABLE `KichCo`
  ADD PRIMARY KEY (`ma`);

--
-- Chỉ mục cho bảng `Loai`
--
ALTER TABLE `Loai`
  ADD PRIMARY KEY (`ma`),
  ADD KEY `maloaicha_maloai` (`maloaicha`);

--
-- Chỉ mục cho bảng `MatHang`
--
ALTER TABLE `MatHang`
  ADD PRIMARY KEY (`masanpham`,`mamau`,`matrangthaisanpham`,`makichco`),
  ADD KEY `MatHang_makichco_KichCo_ma` (`makichco`),
  ADD KEY `MatHang_mamau_Mau_ma` (`mamau`),
  ADD KEY `MatHang_masanpham_SanPham_ma` (`masanpham`),
  ADD KEY `MatHang_matrangthaisanpham_TrangThaiSanPham_ma` (`matrangthaisanpham`);

--
-- Chỉ mục cho bảng `Mau`
--
ALTER TABLE `Mau`
  ADD PRIMARY KEY (`ma`);

--
-- Chỉ mục cho bảng `NhaCungCap`
--
ALTER TABLE `NhaCungCap`
  ADD PRIMARY KEY (`ma`) USING BTREE,
  ADD KEY `NhaCungCap_matrangthaincc_TrangThaiNhaTrungCap_ma` (`matrangthaincc`);

--
-- Chỉ mục cho bảng `NhanVien`
--
ALTER TABLE `NhanVien`
  ADD PRIMARY KEY (`ma`),
  ADD KEY `NhanVien_tentaikhoan_TaiKhoan_tentaikhoan` (`tentaikhoan`),
  ADD KEY `NhanVien_matrangthainhanvien_TrangThaiNhanVien_ma` (`matrangthai`);

--
-- Chỉ mục cho bảng `PhieuNhap`
--
ALTER TABLE `PhieuNhap`
  ADD PRIMARY KEY (`ma`),
  ADD KEY `PhieuNhap_manhanvien_NhanVien_ma` (`manhanvien`),
  ADD KEY `PhieuNhap_manhacungcap_NhaCungCap_ma` (`manhacungcap`);

--
-- Chỉ mục cho bảng `Quyen`
--
ALTER TABLE `Quyen`
  ADD PRIMARY KEY (`ma`);

--
-- Chỉ mục cho bảng `SanPham`
--
ALTER TABLE `SanPham`
  ADD PRIMARY KEY (`ma`),
  ADD KEY `SanPham_madonvi_DonVi_ma` (`madonvi`);

--
-- Chỉ mục cho bảng `TaiKhoan`
--
ALTER TABLE `TaiKhoan`
  ADD PRIMARY KEY (`tentaikhoan`) USING BTREE,
  ADD KEY `TaiKhoan_maquyen_Quyen_ma` (`maquyen`);

--
-- Chỉ mục cho bảng `TrangThaiHoaDon`
--
ALTER TABLE `TrangThaiHoaDon`
  ADD PRIMARY KEY (`ma`);

--
-- Chỉ mục cho bảng `TrangThaiKhachHang`
--
ALTER TABLE `TrangThaiKhachHang`
  ADD PRIMARY KEY (`ma`);

--
-- Chỉ mục cho bảng `TrangThaiNhaCungCap`
--
ALTER TABLE `TrangThaiNhaCungCap`
  ADD PRIMARY KEY (`ma`);

--
-- Chỉ mục cho bảng `TrangThaiNhanVien`
--
ALTER TABLE `TrangThaiNhanVien`
  ADD PRIMARY KEY (`ma`);

--
-- Chỉ mục cho bảng `TrangThaiSanPham`
--
ALTER TABLE `TrangThaiSanPham`
  ADD PRIMARY KEY (`ma`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `ChucNang`
--
ALTER TABLE `ChucNang`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `DonVi`
--
ALTER TABLE `DonVi`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `HoaDon`
--
ALTER TABLE `HoaDon`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `KhachHang`
--
ALTER TABLE `KhachHang`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `KichCo`
--
ALTER TABLE `KichCo`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `Loai`
--
ALTER TABLE `Loai`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `Mau`
--
ALTER TABLE `Mau`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `NhaCungCap`
--
ALTER TABLE `NhaCungCap`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `NhanVien`
--
ALTER TABLE `NhanVien`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `PhieuNhap`
--
ALTER TABLE `PhieuNhap`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `Quyen`
--
ALTER TABLE `Quyen`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `SanPham`
--
ALTER TABLE `SanPham`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `TrangThaiHoaDon`
--
ALTER TABLE `TrangThaiHoaDon`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `TrangThaiKhachHang`
--
ALTER TABLE `TrangThaiKhachHang`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `TrangThaiNhaCungCap`
--
ALTER TABLE `TrangThaiNhaCungCap`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `TrangThaiNhanVien`
--
ALTER TABLE `TrangThaiNhanVien`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `TrangThaiSanPham`
--
ALTER TABLE `TrangThaiSanPham`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `ChiTietCungCap`
--
ALTER TABLE `ChiTietCungCap`
  ADD CONSTRAINT `ChiTietCungCap_manhacungcap_NhaCungCap_ma` FOREIGN KEY (`manhacungcap`) REFERENCES `NhaCungCap` (`ma`),
  ADD CONSTRAINT `ChiTietCungCap_masanpham_SanPham_ma` FOREIGN KEY (`masanpham`) REFERENCES `SanPham` (`ma`);

--
-- Các ràng buộc cho bảng `ChiTietGioHang`
--
ALTER TABLE `ChiTietGioHang`
  ADD CONSTRAINT `ChiTietGioHang_makhachhang_KhachHang_ma` FOREIGN KEY (`makhachhang`) REFERENCES `KhachHang` (`ma`),
  ADD CONSTRAINT `ChiTietGioHang_makichco_MatHang_makichco` FOREIGN KEY (`makichco`) REFERENCES `MatHang` (`makichco`),
  ADD CONSTRAINT `ChiTietGioHang_mamau_MatHang_mamau` FOREIGN KEY (`mamau`) REFERENCES `MatHang` (`mamau`),
  ADD CONSTRAINT `ChiTietGioHang_masanpham_MatHang_masanpham` FOREIGN KEY (`masanpham`) REFERENCES `MatHang` (`masanpham`);

--
-- Các ràng buộc cho bảng `ChiTietHoaDon`
--
ALTER TABLE `ChiTietHoaDon`
  ADD CONSTRAINT `ChiTietHoaDon_mahoadon_HoaDon_ma` FOREIGN KEY (`mahoadon`) REFERENCES `HoaDon` (`ma`),
  ADD CONSTRAINT `ChiTietHoaDon_makichco_HangTrongKho_makichco` FOREIGN KEY (`makichco`) REFERENCES `HangTrongKho` (`makichco`),
  ADD CONSTRAINT `ChiTietHoaDon_mamau_HangTrongKho_mamau` FOREIGN KEY (`mamau`) REFERENCES `HangTrongKho` (`mamau`),
  ADD CONSTRAINT `ChiTietHoaDon_maphieunhap_HangTrongKho_maphieunhap` FOREIGN KEY (`maphieunhap`) REFERENCES `HangTrongKho` (`maphieunhap`),
  ADD CONSTRAINT `ChiTietHoaDon_masanpham_HangTrongKho_masanpham` FOREIGN KEY (`masanpham`) REFERENCES `HangTrongKho` (`masanpham`);

--
-- Các ràng buộc cho bảng `ChiTietLoaiSanPham`
--
ALTER TABLE `ChiTietLoaiSanPham`
  ADD CONSTRAINT `ChiTietLoaiSanPham_maloai_Loai_ma` FOREIGN KEY (`maloai`) REFERENCES `Loai` (`ma`),
  ADD CONSTRAINT `ChiTietLoaiSanPham_masanpham_SanPham_ma` FOREIGN KEY (`masanpham`) REFERENCES `SanPham` (`ma`);

--
-- Các ràng buộc cho bảng `ChiTietPhieuNhap`
--
ALTER TABLE `ChiTietPhieuNhap`
  ADD CONSTRAINT `ChiTietPhieuNhap_makichco_HangTrongKho_makichco` FOREIGN KEY (`makichco`) REFERENCES `HangTrongKho` (`makichco`),
  ADD CONSTRAINT `ChiTietPhieuNhap_mamau_HangTrongKho_mamau` FOREIGN KEY (`mamau`) REFERENCES `HangTrongKho` (`mamau`),
  ADD CONSTRAINT `ChiTietPhieuNhap_maphieunhap_HangTrongKho_ma` FOREIGN KEY (`maphieunhap`) REFERENCES `HangTrongKho` (`maphieunhap`),
  ADD CONSTRAINT `ChiTietPhieuNhap_maphieunhap_PhieuNhap_ma` FOREIGN KEY (`maphieunhap`) REFERENCES `PhieuNhap` (`ma`),
  ADD CONSTRAINT `ChiTietPhieuNhap_masanpham_HangTrongKho_masanpham` FOREIGN KEY (`masanpham`) REFERENCES `HangTrongKho` (`masanpham`);

--
-- Các ràng buộc cho bảng `ChiTietQuyen`
--
ALTER TABLE `ChiTietQuyen`
  ADD CONSTRAINT `ChiTietQuyen_machucnang_ChucNang_ma` FOREIGN KEY (`machucnang`) REFERENCES `ChucNang` (`ma`),
  ADD CONSTRAINT `ChiTietQuyen_maquyen_Quyen_ma` FOREIGN KEY (`maquyen`) REFERENCES `Quyen` (`ma`);

--
-- Các ràng buộc cho bảng `HangTrongKho`
--
ALTER TABLE `HangTrongKho`
  ADD CONSTRAINT `HangTrongKho_makichco_MatHang_makichco` FOREIGN KEY (`makichco`) REFERENCES `MatHang` (`makichco`),
  ADD CONSTRAINT `HangTrongKho_mamau_MatHang_mamau` FOREIGN KEY (`mamau`) REFERENCES `MatHang` (`mamau`),
  ADD CONSTRAINT `HangTrongKho_maphieunhap_PhieuNhap_ma` FOREIGN KEY (`maphieunhap`) REFERENCES `PhieuNhap` (`ma`),
  ADD CONSTRAINT `HangTrongKho_masanpham_MatHang_masanpham` FOREIGN KEY (`masanpham`) REFERENCES `MatHang` (`masanpham`);

--
-- Các ràng buộc cho bảng `HoaDon`
--
ALTER TABLE `HoaDon`
  ADD CONSTRAINT `HoaDon_makhachhang_KhachHang_ma` FOREIGN KEY (`makhachhang`) REFERENCES `KhachHang` (`ma`),
  ADD CONSTRAINT `HoaDon_manhanvien_NhanVien_ma` FOREIGN KEY (`manhanvien`) REFERENCES `NhanVien` (`ma`),
  ADD CONSTRAINT `HoaDon_matrangthaihoadon_TrangThaiHoaDon_ma` FOREIGN KEY (`matrangthaihoadon`) REFERENCES `TrangThaiHoaDon` (`ma`);

--
-- Các ràng buộc cho bảng `KhachHang`
--
ALTER TABLE `KhachHang`
  ADD CONSTRAINT `KhachHang_matrangthai_TrangThaiKhachHang_ma` FOREIGN KEY (`matrangthai`) REFERENCES `TrangThaiKhachHang` (`ma`),
  ADD CONSTRAINT `KhachHang_tentaikhoan_TaiKhoan_tentaikhoan` FOREIGN KEY (`tentaikhoan`) REFERENCES `TaiKhoan` (`tentaikhoan`);

--
-- Các ràng buộc cho bảng `Loai`
--
ALTER TABLE `Loai`
  ADD CONSTRAINT `maloaicha_maloai` FOREIGN KEY (`maloaicha`) REFERENCES `Loai` (`ma`);

--
-- Các ràng buộc cho bảng `MatHang`
--
ALTER TABLE `MatHang`
  ADD CONSTRAINT `MatHang_makichco_KichCo_ma` FOREIGN KEY (`makichco`) REFERENCES `KichCo` (`ma`),
  ADD CONSTRAINT `MatHang_mamau_Mau_ma` FOREIGN KEY (`mamau`) REFERENCES `Mau` (`ma`),
  ADD CONSTRAINT `MatHang_masanpham_SanPham_ma` FOREIGN KEY (`masanpham`) REFERENCES `SanPham` (`ma`),
  ADD CONSTRAINT `MatHang_matrangthaisanpham_TrangThaiSanPham_ma` FOREIGN KEY (`matrangthaisanpham`) REFERENCES `TrangThaiSanPham` (`ma`);

--
-- Các ràng buộc cho bảng `NhaCungCap`
--
ALTER TABLE `NhaCungCap`
  ADD CONSTRAINT `NhaCungCap_matrangthaincc_TrangThaiNhaTrungCap_ma` FOREIGN KEY (`matrangthaincc`) REFERENCES `TrangThaiNhaCungCap` (`ma`);

--
-- Các ràng buộc cho bảng `NhanVien`
--
ALTER TABLE `NhanVien`
  ADD CONSTRAINT `NhanVien_matrangthainhanvien_TrangThaiNhanVien_ma` FOREIGN KEY (`matrangthai`) REFERENCES `TrangThaiNhanVien` (`ma`),
  ADD CONSTRAINT `NhanVien_tentaikhoan_TaiKhoan_tentaikhoan` FOREIGN KEY (`tentaikhoan`) REFERENCES `TaiKhoan` (`tentaikhoan`);

--
-- Các ràng buộc cho bảng `PhieuNhap`
--
ALTER TABLE `PhieuNhap`
  ADD CONSTRAINT `PhieuNhap_manhacungcap_NhaCungCap_ma` FOREIGN KEY (`manhacungcap`) REFERENCES `NhaCungCap` (`ma`),
  ADD CONSTRAINT `PhieuNhap_manhanvien_NhanVien_ma` FOREIGN KEY (`manhanvien`) REFERENCES `NhanVien` (`ma`);

--
-- Các ràng buộc cho bảng `SanPham`
--
ALTER TABLE `SanPham`
  ADD CONSTRAINT `SanPham_madonvi_DonVi_ma` FOREIGN KEY (`madonvi`) REFERENCES `DonVi` (`ma`);

--
-- Các ràng buộc cho bảng `TaiKhoan`
--
ALTER TABLE `TaiKhoan`
  ADD CONSTRAINT `TaiKhoan_maquyen_Quyen_ma` FOREIGN KEY (`maquyen`) REFERENCES `Quyen` (`ma`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
