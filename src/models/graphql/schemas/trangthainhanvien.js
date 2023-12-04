const {gql} = require('apollo-server-express')

module.exports = gql`
type TrangThaiNhanVien {
  ma: ID!
  ten: String!
  sanpham: [SanPham]
}
type TrangThaiNhanVienQueryResponse {
  status: Int!
  message: String!
  data: [TrangThaiNhanVien!]!
}
type TrangThaiNhanVienResponse {
  status: Int!
  message: String!
}
extend type Query {
  trangthainhanvien: TrangThaiNhanVienQueryResponse
}
`