const {gql} = require('apollo-server-express')

module.exports = gql`
type KhachHang {
  ma: ID!
  ten: String!
  sanpham: [SanPham]
}
input KhachHangInput {
  ma: ID
  ten: String!
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
}
extend type Mutation {
  taoKhachHang(input: KhachHangInput): KhachHangResponse
  suaKhachHang(input: KhachHangInput): KhachHangResponse
  xoaKhachHang(ma: Int!): KhachHangResponse
}
`