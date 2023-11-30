const {gql} = require('apollo-server-express')

module.exports = gql`
type TrangThaiKhachHang {
  ma: ID!
  ten: String!
}
input TrangThaiKhachHangInput {
  ma: Int,
  ten: String!
}
type TrangThaiKhachHangQueryResponse {
  status: Int!
  message: String!
  data: [TrangThaiKhachHang!]!
}
type TrangThaiKhachHangResponse {
  status: Int!
  message: String!
}
extend type Query {
  trangthaikhachhang: TrangThaiKhachHangQueryResponse
  timkiemtrangthaikhachhang(input: TrangThaiKhachHangInput): TrangThaiKhachHangQueryResponse
}
extend type Mutation {
  taoTrangThaiKhachHang(input: TrangThaiKhachHangInput): TrangThaiKhachHangResponse
  suaTrangThaiKhachHang(input: TrangThaiKhachHangInput): TrangThaiKhachHangResponse
  xoaTrangThaiKhachHang(ma: Int!): TrangThaiKhachHangResponse
}
`