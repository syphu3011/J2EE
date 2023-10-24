const {gql} = require('apollo-server-express')

module.exports = gql`
type HoaDon {
  ma: ID!
  ten: String!
  sanpham: [SanPham]
}
input HoaDonInput {
  ma: ID
  ten: String!
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
  suaHoaDon(input: HoaDonInput): HoaDonResponse
  xoaHoaDon(ma: Int!): HoaDonResponse
}
`