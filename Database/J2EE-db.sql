-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th10 02, 2023 lúc 03:40 PM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `J2EE`
--

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
  `mamathang` int(11) NOT NULL,
  `makhachhang` int(11) NOT NULL,
  `soluong` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ChiTietHoaDon`
--

CREATE TABLE `ChiTietHoaDon` (
  `mamathang` int(11) NOT NULL,
  `maphieunhap` int(11) NOT NULL,
  `soluong` int(11) NOT NULL,
  `gia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ChiTietLoaiSanPham`
--

CREATE TABLE `ChiTietLoaiSanPham` (
  `maloai` int(11) NOT NULL,
  `masanpham` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ChiTietPhieuNhap`
--

CREATE TABLE `ChiTietPhieuNhap` (
  `mamathang` int(11) NOT NULL,
  `maphieunhap` int(11) NOT NULL,
  `soluong` int(11) NOT NULL,
  `gianhap` int(11) NOT NULL,
  `ghichu` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ChiTietQuyen`
--

CREATE TABLE `ChiTietQuyen` (
  `maquyen` int(11) NOT NULL,
  `machucnang` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ChucNang`
--

CREATE TABLE `ChucNang` (
  `ma` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `DonVi`
--

CREATE TABLE `DonVi` (
  `ma` int(11) NOT NULL,
  `ten` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `HangTrongKho`
--

CREATE TABLE `HangTrongKho` (
  `mamathang` int(11) NOT NULL,
  `maphieunhap` int(11) NOT NULL,
  `soluong` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `matrangthai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `KichCo`
--

CREATE TABLE `KichCo` (
  `ma` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `MatHang`
--

CREATE TABLE `MatHang` (
  `ma` int(11) NOT NULL,
  `masanpham` int(11) NOT NULL,
  `mamau` int(11) NOT NULL,
  `matrangthaisanpham` int(11) NOT NULL,
  `madonvi` int(11) NOT NULL,
  `makichco` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `Mau`
--

CREATE TABLE `Mau` (
  `ma` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `matrangthai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `PhieuNhap`
--

CREATE TABLE `PhieuNhap` (
  `ma` int(11) NOT NULL,
  `ngaynhap` datetime NOT NULL,
  `manhacungcap` int(11) NOT NULL,
  `manhanvien` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `Quyen`
--

CREATE TABLE `Quyen` (
  `ma` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `SanPham`
--

CREATE TABLE `SanPham` (
  `ma` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL,
  `anhminhhoa` varchar(255) NOT NULL,
  `mota` varchar(255) NOT NULL,
  `giaban` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `TaiKhoan`
--

CREATE TABLE `TaiKhoan` (
  `tentaikhoan` varchar(255) NOT NULL,
  `matkhau` varchar(255) NOT NULL,
  `maquyen` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Cấu trúc bảng cho bảng `TrangThaiNhaCungCap`
--

CREATE TABLE `TrangThaiNhaCungCap` (
  `ma` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `TrangThaiNhanVien`
--

CREATE TABLE `TrangThaiNhanVien` (
  `ma` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `TrangThaiSanPham`
--

CREATE TABLE `TrangThaiSanPham` (
  `ma` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  ADD PRIMARY KEY (`mamathang`,`makhachhang`),
  ADD KEY `ChiTietGioHang_makhachhang_KhachHang_ma` (`makhachhang`);

--
-- Chỉ mục cho bảng `ChiTietHoaDon`
--
ALTER TABLE `ChiTietHoaDon`
  ADD PRIMARY KEY (`mamathang`,`maphieunhap`),
  ADD KEY `ChiTietHoaDon_maphieunhap_PhieuNhap_ma` (`maphieunhap`);

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
  ADD PRIMARY KEY (`mamathang`,`maphieunhap`),
  ADD KEY `ChiTietPhieuNhap_maphieunhap_PhieuNhap_ma` (`maphieunhap`);

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
  ADD PRIMARY KEY (`mamathang`,`maphieunhap`),
  ADD KEY `HangTrongKho_maphieunhap_PhieuNhap_ma` (`maphieunhap`);

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
  ADD PRIMARY KEY (`ma`,`masanpham`,`mamau`,`matrangthaisanpham`,`madonvi`,`makichco`),
  ADD KEY `MatHang_makichco_KichCo_ma` (`makichco`),
  ADD KEY `MatHang_mamau_Mau_ma` (`mamau`),
  ADD KEY `MatHang_masanpham_SanPham_ma` (`masanpham`),
  ADD KEY `MatHang_matrangthaisanpham_TrangThaiSanPham_ma` (`matrangthaisanpham`),
  ADD KEY `MatHang_madonvi_DonVi_ma` (`madonvi`);

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
  ADD PRIMARY KEY (`ma`);

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
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `DonVi`
--
ALTER TABLE `DonVi`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `HoaDon`
--
ALTER TABLE `HoaDon`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `KhachHang`
--
ALTER TABLE `KhachHang`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `KichCo`
--
ALTER TABLE `KichCo`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `MatHang`
--
ALTER TABLE `MatHang`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `Mau`
--
ALTER TABLE `Mau`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `NhaCungCap`
--
ALTER TABLE `NhaCungCap`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `PhieuNhap`
--
ALTER TABLE `PhieuNhap`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `Quyen`
--
ALTER TABLE `Quyen`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `SanPham`
--
ALTER TABLE `SanPham`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `TrangThaiHoaDon`
--
ALTER TABLE `TrangThaiHoaDon`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `TrangThaiNhaCungCap`
--
ALTER TABLE `TrangThaiNhaCungCap`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `TrangThaiNhanVien`
--
ALTER TABLE `TrangThaiNhanVien`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `TrangThaiSanPham`
--
ALTER TABLE `TrangThaiSanPham`
  MODIFY `ma` int(11) NOT NULL AUTO_INCREMENT;

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
  ADD CONSTRAINT `ChiTietGioHang_mamathang_MatHang_ma` FOREIGN KEY (`mamathang`) REFERENCES `MatHang` (`ma`);

--
-- Các ràng buộc cho bảng `ChiTietHoaDon`
--
ALTER TABLE `ChiTietHoaDon`
  ADD CONSTRAINT `ChiTietHoaDon_mamathang_MatHang_ma` FOREIGN KEY (`mamathang`) REFERENCES `MatHang` (`ma`),
  ADD CONSTRAINT `ChiTietHoaDon_maphieunhap_PhieuNhap_ma` FOREIGN KEY (`maphieunhap`) REFERENCES `PhieuNhap` (`ma`);

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
  ADD CONSTRAINT `ChiTietPhieuNhap_mamathang_MatHang_ma` FOREIGN KEY (`mamathang`) REFERENCES `MatHang` (`ma`),
  ADD CONSTRAINT `ChiTietPhieuNhap_maphieunhap_PhieuNhap_ma` FOREIGN KEY (`maphieunhap`) REFERENCES `PhieuNhap` (`ma`);

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
  ADD CONSTRAINT `HangTrongKho_mamathang_MatHang_ma` FOREIGN KEY (`mamathang`) REFERENCES `MatHang` (`ma`),
  ADD CONSTRAINT `HangTrongKho_maphieunhap_PhieuNhap_ma` FOREIGN KEY (`maphieunhap`) REFERENCES `PhieuNhap` (`ma`);

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
  ADD CONSTRAINT `KH_matrangthai_TTKH_ma` FOREIGN KEY (`matrangthai`) REFERENCES `TrangThaiKhachHang` (`ma`),
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
  ADD CONSTRAINT `MatHang_madonvi_DonVi_ma` FOREIGN KEY (`madonvi`) REFERENCES `DonVi` (`ma`),
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
-- Các ràng buộc cho bảng `TaiKhoan`
--
ALTER TABLE `TaiKhoan`
  ADD CONSTRAINT `TaiKhoan_maquyen_Quyen_ma` FOREIGN KEY (`maquyen`) REFERENCES `Quyen` (`ma`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
