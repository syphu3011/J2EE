const { HoaDon, sequelize, HangTrongKho, LichSuHeThong, KhachHang, Mau, KichCo, ChiTietHoaDon, NhanVien } = require("../../database/models")
module.exports = {
    Query: {
        async thongketop5khachhang(root, args, context) {
            const { tu, den, kieuthongke } = args.input
            // kieu thong ke == 1: soluonghoadon
            // kieu thong ke == 2: tongtien
            try {
                // await HoaDon.
                let kieu
                switch (kieuthongke) {
                    case 1:
                        kieu = 'soluonghoadon'
                        break;
                    case 2:
                        kieu = 'tongtien'
                        break;
                    default:
                        break;
                }
                const rs = await sequelize.query(
                    `select xephang.ma, xephang.ten, xephang.tongtien, xephang.soluonghoadon, customer_rank as hang
                    from (
                        SELECT tongtien.ma, tongtien.ten, tongtien.tongtien, soluonghoadon.soluonghoadon,DENSE_RANK() OVER (ORDER BY ${kieu} DESC) AS customer_rank
                        FROM (
                            SELECT khachhang.ma, khachhang.ten, sum(chitiethoadon.soluong * chitiethoadon.gia) tongtien
                            from khachhang, hoadon, chitiethoadon 
                            where khachhang.ma = hoadon.makhachhang and hoadon.ma = chitiethoadon.mahoadon and hoadon.matrangthaihoadon = 2 and khachhang.matrangthai = 1 and hoadon.ngaylap > '${tu}' and hoadon.ngaylap < '${den}'
                            GROUP by khachhang.ma
                        ) tongtien, (
                            SELECT khachhang.ma, COUNT(hoadon.ma) soluonghoadon
                            FROM khachhang, hoadon
                            WHERE khachhang.ma = hoadon.makhachhang and hoadon.matrangthaihoadon = 2 and hoadon.ngaylap > '${tu}' and hoadon.ngaylap < '${den}'
                            GROUP BY khachhang.ma
                        ) soluonghoadon
                        WHERE tongtien.ma = soluonghoadon.ma 
                    ) xephang
                    where xephang.customer_rank <= 5
                    ORDER BY hang ASC`)
                return {
                    status: 200,
                    message: "Lấy dữ liệu thống kê thành công!",
                    data: rs[0]
                }
            }
            catch (e) {
                return {
                    status: 400,
                    message: "Lấy dữ liệu thống kê không thành công!",
                    data: []
                }
            }
        },
        async thongketop5nhanvien(root, args, context) {
            const { tu, den, kieuthongke } = args.input
            // kieu thong ke == 1: soluonghoadon
            // kieu thong ke == 2: tongtien
            try {
                // await HoaDon.
                let kieu
                switch (kieuthongke) {
                    case 1:
                        kieu = 'soluongxacnhan'
                        break;
                    case 2:
                        kieu = 'tongtien'
                        break;
                    default:
                        break;
                }
                const rs = await sequelize.query(
                    `select xephang.ma, xephang.ten, xephang.tongtien, xephang.soluongxacnhan, staff_rank as hang
                    from (
                        SELECT tongtien.ma, tongtien.ten, tongtien.tongtien, soluonghoadon.soluongxacnhan,DENSE_RANK() OVER (ORDER BY ${kieu} DESC) AS staff_rank
                        FROM (
                            SELECT nhanvien.ma, nhanvien.ten, sum(chitiethoadon.soluong * chitiethoadon.gia) tongtien
                            from nhanvien, hoadon, chitiethoadon 
                            where nhanvien.ma = hoadon.manhanvien and hoadon.ma = chitiethoadon.mahoadon and (hoadon.matrangthaihoadon = 2 or hoadon.matrangthaihoadon = 3) and nhanvien.matrangthai = 1 and hoadon.ngaylap > '${tu}' and hoadon.ngaylap < '${den}' and nhanvien.ma > 0
                            GROUP by nhanvien.ma
                        ) tongtien, (
                            SELECT nhanvien.ma, COUNT(hoadon.ma) soluongxacnhan
                            FROM nhanvien, hoadon
                            WHERE nhanvien.ma = hoadon.manhanvien and (hoadon.matrangthaihoadon = 2 or hoadon.matrangthaihoadon = 3) and hoadon.ngaylap > '${tu}' and hoadon.ngaylap < '${den}' and nhanvien.ma > 0 and nhanvien.matrangthai = 1
                            GROUP BY nhanvien.ma
                        ) soluonghoadon
                        WHERE tongtien.ma = soluonghoadon.ma 
                    ) xephang
                    where xephang.staff_rank <= 5
                    ORDER BY hang ASC`)
                return {
                    status: 200,
                    message: "Lấy dữ liệu thống kê thành công!",
                    data: rs[0]
                }
            }
            catch (e) {
                return {
                    status: 400,
                    message: "Lấy dữ liệu thống kê không thành công!",
                    data: []
                }
            }
        },
        async thongketop10sanpham(root, args, context) {
            const { tu, den, kieuthongke } = args.input
            // kieu thong ke == 1: tienban
            // kieu thong ke == 2: loinhuan
            try {
                // await HoaDon.
                let kieu
                switch (kieuthongke) {
                    case 1:
                        kieu = 'tienban'
                        break;
                    case 2:
                        kieu = 'tiennhap'
                        break;
                    case 3:
                        kieu = 'loinhuan'
                        break;
                    default:
                        break;
                }
                const rs = await sequelize.query(`
                SELECT *
                FROM
                (SELECT nhap.ma,
                        IFNULL(ban.soluongban, 0) soluongban,
                        nhap.tiennhap,
                        IFNULL(ban.tienban, 0) tienban,
                        (IFNULL(ban.tienban, 0) - nhap.tiennhap) loinhuan,
                        DENSE_RANK() OVER (
                                            ORDER BY ${kieu} DESC) AS hang
                FROM
                    (SELECT sanpham.ma,
                            sum(chitietphieunhap.gianhap * chitietphieunhap.soluong) tiennhap
                    FROM sanpham,
                        chitietphieunhap,
                        phieunhap
                    WHERE sanpham.ma = chitietphieunhap.masanpham
                        AND sanpham.matrangthai = 1
                        AND chitietphieunhap.maphieunhap = phieunhap.ma
                        AND phieunhap.ngaynhap > '${tu}'
                        AND phieunhap.ngaynhap < '${den}'
                    GROUP BY sanpham.ma) nhap
                LEFT JOIN
                    (SELECT sanpham.ma,
                            sum(chitiethoadon.gia * chitiethoadon.soluong) tienban,
                            sum(chitiethoadon.soluong) soluongban
                    FROM sanpham,
                        chitiethoadon,
                        hoadon
                    WHERE sanpham.ma = chitiethoadon.masanpham
                        AND chitiethoadon.mahoadon = hoadon.ma
                        AND hoadon.matrangthaihoadon = 2
                        AND sanpham.matrangthai = 1
                        AND hoadon.ngaylap > '${tu}'
                        AND hoadon.ngaylap < '${den}'
                    GROUP BY sanpham.ma) ban ON nhap.ma = ban.ma) xephang
                WHERE xephang.hang <= 10`)
                return {
                    status: 200,
                    message: "Lấy dữ liệu thống kê thành công!",
                    data: rs[0]
                }
            }
            catch (e) {
                return {
                    status: 400,
                    message: "Lấy dữ liệu thống kê không thành công!",
                    data: []
                }
            }
        },
        async thongkedoanhthutheongay(root, args, context) {
            const { tu, den, kieuthongke } = args.input
            try {
                let kieu
                switch (kieuthongke) {
                    case 1:
                        kieu = 'thu'
                        break;
                    case 2:
                        kieu = 'chi'
                        break;
                    case 3:
                        kieu = 'loinhuan'
                        break;
                    default:
                        break;
                }
                const rs = await sequelize.query(`
                SELECT bangthoigian.thoigian,
                    COALESCE(sum(chitiethoadon.gia * chitiethoadon.soluong), 0) thu,
                    COALESCE(sum(chitietphieunhap.gianhap * chitietphieunhap.soluong), 0) chi,
                    (COALESCE(sum(chitietphieunhap.gianhap * chitietphieunhap.soluong), 0) - COALESCE(sum(chitiethoadon.gia * chitiethoadon.soluong), 0)) loinhuan
                FROM
                (SELECT thoigian
                FROM
                    (SELECT DATE(ngaylap) AS thoigian
                    FROM hoadon
                    WHERE ngaylap IS NOT NULL
                        AND hoadon.matrangthaihoadon = 2
                    GROUP BY thoigian
                    UNION SELECT DATE(ngaynhap) AS thoigian
                    FROM phieunhap) AS bangthoigian) bangthoigian
                LEFT JOIN hoadon ON bangthoigian.thoigian = DATE(hoadon.ngaylap)
                LEFT JOIN chitiethoadon ON hoadon.ma = chitiethoadon.mahoadon
                LEFT JOIN phieunhap ON bangthoigian.thoigian = DATE(phieunhap.ngaynhap)
                LEFT JOIN chitietphieunhap ON phieunhap.ma = chitietphieunhap.maphieunhap
                WHERE bangthoigian.thoigian > '${tu}'
                AND bangthoigian.thoigian < '${den}'
                GROUP BY thoigian
                ORDER BY thoigian desc`)
                return {
                    status: 200,
                    message: "Lấy dữ liệu thống kê thành công!",
                    data: rs[0]
                }
            }
            catch (e) {
                return {
                    status: 400,
                    message: "Lấy dữ liệu thống kê không thành công!",
                    data: []
                }
            }
        },
        async thongkedoanhthutheongay(root, args, context) {
            const { tu, den, kieuthongke } = args.input
            // kieu thong ke == 1: thoigian
            // kieu thong ke == 2: thu
            // kieu thong ke == 3: chi
            // kieu thong ke == 4: loinhuan
            try {
                // await HoaDon.
                let kieu
                switch (kieuthongke) {
                    case 1:
                        kieu = 'thu.thoigian'
                        break;
                    case 2:
                        kieu = 'thu'
                        break;
                    case 3:
                        kieu = 'chi'
                        break;
                    case 4:
                        kieu = 'loinhuan'
                        break;
                    default:
                        break;
                }
                const rs = await sequelize.query(`
                SELECT thu.thoigian,
                    thu,
                    chi,
                    (thu - chi) loinhuan
                FROM
                (SELECT bangthoigian.thoigian,
                        COALESCE(sum(chitiethoadon.gia * chitiethoadon.soluong), 0) thu
                FROM
                    (SELECT thoigian
                    FROM
                        (SELECT DATE(ngaylap) AS thoigian
                        FROM hoadon
                        WHERE ngaylap IS NOT NULL
                        AND hoadon.matrangthaihoadon = 2
                        AND hoadon.ngaylap > '${tu}'
                        AND hoadon.ngaylap < '${den}'
                        GROUP BY thoigian
                        UNION SELECT DATE(ngaynhap) AS thoigian
                        FROM phieunhap
                        WHERE phieunhap.ngaynhap > '${tu}'
                        AND phieunhap.ngaynhap < '${den}'
                        GROUP BY thoigian) AS bangthoigian) bangthoigian
                LEFT JOIN hoadon ON bangthoigian.thoigian = DATE(hoadon.ngaylap)
                LEFT JOIN chitiethoadon ON hoadon.ma = chitiethoadon.mahoadon
                GROUP BY thoigian) thu
                LEFT JOIN
                (SELECT bangthoigian.thoigian,
                        COALESCE(sum(chitietphieunhap.gianhap * chitietphieunhap.soluong), 0) chi
                FROM
                    (SELECT thoigian
                    FROM
                        (SELECT DATE(ngaylap) AS thoigian
                        FROM hoadon
                        WHERE ngaylap IS NOT NULL
                        AND hoadon.matrangthaihoadon = 2
                        AND hoadon.ngaylap > '${tu}'
                        AND hoadon.ngaylap < '${den}'
                        GROUP BY thoigian
                        UNION SELECT DATE(ngaynhap) AS thoigian
                        FROM phieunhap
                        WHERE phieunhap.ngaynhap > '${tu}'
                        AND phieunhap.ngaynhap < '${den}'
                        GROUP BY thoigian) AS bangthoigian) bangthoigian
                LEFT JOIN phieunhap ON bangthoigian.thoigian = DATE(phieunhap.ngaynhap)
                LEFT JOIN chitietphieunhap ON phieunhap.ma = chitietphieunhap.maphieunhap
                GROUP BY thoigian) chi ON thu.thoigian = chi.thoigian
                ORDER BY ${kieu} desc`)
                return {
                    status: 200,
                    message: "Lấy dữ liệu thống kê thành công!",
                    data: rs[0]
                }
            }
            catch (e) {
                return {
                    status: 400,
                    message: "Lấy dữ liệu thống kê không thành công!",
                    data: []
                }
            }
        },
        async thongkedoanhthutheothang(root, args, context) {
            const { tu, den, kieuthongke } = args.input
            // kieu thong ke == 1: thoigian
            // kieu thong ke == 2: thu
            // kieu thong ke == 3: chi
            // kieu thong ke == 4: loinhuan
            try {
                // await HoaDon.
                let kieu
                switch (kieuthongke) {
                    case 1:
                        kieu = 'thu.thoigian'
                        break;
                    case 2:
                        kieu = 'thu'
                        break;
                    case 3:
                        kieu = 'chi'
                        break;
                    case 4:
                        kieu = 'loinhuan'
                        break;
                    default:
                        break;
                }
                const rs = await sequelize.query(`
                SELECT thu.thoigian,
                    thu,
                    chi,
                    (thu - chi) loinhuan
                FROM
                (SELECT bangthoigian.thoigian,
                        COALESCE(sum(chitiethoadon.gia * chitiethoadon.soluong), 0) thu
                FROM
                    (SELECT thoigian
                    FROM
                        (SELECT CONCAT(MONTH(ngaylap), '-', YEAR(ngaylap)) AS thoigian
                        FROM hoadon
                        WHERE ngaylap IS NOT NULL
                        AND hoadon.matrangthaihoadon = 2
                        AND hoadon.ngaylap > '${tu}'
                        AND hoadon.ngaylap < '${den}'
                        GROUP BY thoigian
                        UNION SELECT CONCAT(MONTH(ngaynhap), '-', YEAR(ngaynhap)) AS thoigian
                        FROM phieunhap
                        WHERE phieunhap.ngaynhap > '${tu}'
                        AND phieunhap.ngaynhap < '${den}'
                        GROUP BY thoigian) AS bangthoigian) bangthoigian
                LEFT JOIN hoadon ON bangthoigian.thoigian = CONCAT(MONTH(hoadon.ngaylap), '-', YEAR(hoadon.ngaylap))
                LEFT JOIN chitiethoadon ON hoadon.ma = chitiethoadon.mahoadon
                GROUP BY thoigian) thu
                LEFT JOIN
                (SELECT bangthoigian.thoigian,
                        COALESCE(sum(chitietphieunhap.gianhap * chitietphieunhap.soluong), 0) chi
                FROM
                    (SELECT thoigian
                    FROM
                        (SELECT CONCAT(MONTH(ngaylap), '-', YEAR(ngaylap)) AS thoigian
                        FROM hoadon
                        WHERE ngaylap IS NOT NULL
                        AND hoadon.matrangthaihoadon = 2
                        AND hoadon.ngaylap > '${tu}'
                        AND hoadon.ngaylap < '${den}'
                        GROUP BY thoigian
                        UNION SELECT CONCAT(MONTH(ngaynhap), '-', YEAR(ngaynhap)) AS thoigian
                        FROM phieunhap
                        WHERE phieunhap.ngaynhap > '${tu}'
                        AND phieunhap.ngaynhap < '${den}'
                        GROUP BY thoigian) AS bangthoigian) bangthoigian
                LEFT JOIN phieunhap ON bangthoigian.thoigian = CONCAT(MONTH(phieunhap.ngaynhap), '-', YEAR(phieunhap.ngaynhap))
                LEFT JOIN chitietphieunhap ON phieunhap.ma = chitietphieunhap.maphieunhap
                GROUP BY thoigian) chi ON thu.thoigian = chi.thoigian
                ORDER BY ${kieu} DESC
                `)
                return {
                    status: 200,
                    message: "Lấy dữ liệu thống kê thành công!",
                    data: rs[0]
                }
            }
            catch (e) {
                return {
                    status: 400,
                    message: "Lấy dữ liệu thống kê không thành công!",
                    data: []
                }
            }
        },
    }
}
