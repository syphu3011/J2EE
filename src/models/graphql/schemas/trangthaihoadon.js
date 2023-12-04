const {gql} = require('apollo-server-express')

module.exports = gql`
type TrangThaiHoaDon {
  ma: ID!
  ten: String!
}
input TrangThaiHoaDonInput {
  ma: ID
  ten: String!
}
type TrangThaiHoaDonQueryResponse {
  status: Int!
  message: String!
  data: [TrangThaiHoaDon!]!
}
type TrangThaiHoaDonResponse {
  status: Int!
  message: String!
}
extend type Query {
  trangthaihoadon: TrangThaiHoaDonQueryResponse
  trangthaihoadonvoithuoctinh(input: TrangThaiHoaDonInput): TrangThaiHoaDonQueryResponse
  timkiemtrangthaihoadon(input: TrangThaiHoaDonInput): TrangThaiHoaDonQueryResponse
}
extend type Mutation {
  taoTrangThaiHoaDon(input: TrangThaiHoaDonInput): TrangThaiHoaDonResponse
  suaTrangThaiHoaDon(input: TrangThaiHoaDonInput): TrangThaiHoaDonResponse
  xoaTrangThaiHoaDon(ma: Int!): TrangThaiHoaDonResponse
}
`