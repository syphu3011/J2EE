const {gql} = require('apollo-server-express')

module.exports = gql`
type KhachHang {
  ma: ID
  ten: String
  ngaysinh: String
  sodienthoai: String
  tentaikhoan: String
  ngaythamgia: String
  trangthai: TrangThaiKhachHang!
}
input KhachHangInput {
  ma: ID
  ten: String!
  ngaysinh: String!
  sodienthoai: String!
  matrangthai: Int
}
input ChuyenTrangThaiInput {
  ma: ID
  matrangthai: Int!
}
type KhachHangQueryResponse {
  status: Int!
  message: String!
  data: [KhachHang!]!
}
type KhachHangResponse {
  status: Int!
  message: String!
}
extend type Query {
  khachhang: KhachHangQueryResponse
  khachhangvoithuoctinh(input: KhachHangInput): KhachHangQueryResponse
  timkiemkhachhang(input: KhachHangInput): KhachHangQueryResponse
  thongtinkhachhang: KhachHangQueryResponse
}
extend type Mutation {
  taoKhachHang(input: KhachHangInput): KhachHangResponse
  suaKhachHang(input: KhachHangInput): KhachHangResponse
  suaThongTinCaNhan(input: KhachHangInput): KhachHangResponse
  chuyenTrangThaiKhachHang(input: ChuyenTrangThaiInput): KhachHangResponse
  xoaKhachHang(ma: Int!): KhachHangResponse
}
`