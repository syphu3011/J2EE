const {gql} = require('apollo-server-express')

module.exports = gql`
type ThongKeKhachHang {
  hang: Int
  ma: Int
  ten: String
  soluonghoadon: Int
  tongtien: Int
}
type ThongKeNhanVien {
  hang: Int
  ma: Int
  ten: String
  soluongxacnhan: Int
  tongtien: Int
}
type ThongKeSanPham {
  hang: Int
  ma: Int
  ten: String
  soluongban: Int
  tiennhap: Int
  tienban: Int
  loinhuan: Int
}
type ThongKeDoanhThu {
  thoigian: String
  thu: Int
  chi: Int
  loinhuan: Int
}
input ThongKeInput {
  tu: String!
  den: String!
  kieuthongke: Int
}
type ThongKeKhachHangResponse {
  status: Int!
  message: String!
  data: [ThongKeKhachHang]
}
type ThongKeNhanVienResponse {
  status: Int!
  message: String!
  data: [ThongKeNhanVien]
}
type ThongKeSanPhamResponse {
  status: Int!
  message: String!
  data: [ThongKeSanPham]
}
type ThongKeDoanhThuResponse {
  status: Int!
  message: String!
  data: [ThongKeDoanhThu]
}

extend type Query {
  thongketop5khachhang(input: ThongKeInput): ThongKeKhachHangResponse
  thongketop5nhanvien(input: ThongKeInput): ThongKeNhanVienResponse
  thongketop10sanpham(input: ThongKeInput): ThongKeSanPhamResponse
  thongkedoanhthutheongay(input: ThongKeInput): ThongKeDoanhThuResponse
  thongkedoanhthutheothang(input: ThongKeInput): ThongKeDoanhThuResponse
}
`