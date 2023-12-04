const {gql} = require('apollo-server-express')

module.exports = gql`
type HoaDon {
  ma: ID!
  ngaylap: String!
  sanpham: [HangTrongKho]
  nhanvien: NhanVien
  khachhang: KhachHang
  trangthaihoadon: TrangThaiHoaDon
}
input ChiTietHoaDonInput {
  masanpham: Int
  mamau: Int
  makichco: Int
  maphieunhap: Int
  soluong: Int
  gia: Int
}
input HoaDonInput {
  ma: ID
  sanpham: [ChiTietHoaDonInput]
  manhanvien: Int
  makhachhang: Int
  matrangthai: Int  
  diachi: String
}
type HoaDonQueryResponse {
  status: Int!
  message: String!
  data: [HoaDon!]!
}
type HoaDonResponse {
  status: Int!
  message: String!
}
extend type Query {
  hoadon: HoaDonQueryResponse
  hoadonvoithuoctinh(input: HoaDonInput): HoaDonQueryResponse
  timkiemhoadon(input: HoaDonInput): HoaDonQueryResponse
}
extend type Mutation {
  taoHoaDon(input: HoaDonInput): HoaDonResponse
  xacNhanHoacHuyHoaDon(input: HoaDonInput): HoaDonResponse
}
`