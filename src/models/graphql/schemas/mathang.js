const {gql} = require('apollo-server-express')

module.exports = gql`
type MatHang {
  masanpham: Int!
  mau: Mau!
  kichco: KichCo!
  giaban: Int
  soluong: Int!
  trangthaisanpham: TrangThaiSanPham
}
input MatHangInput {
  masanpham: Int!
  mamau: Int!
  makichco: Int!
}
# type MatHangQueryResponse {
#   status: Int!
#   message: String!
#   data: [MatHang!]!
# }
# type MatHangResponse {
#   status: Int!
#   message: String!
# }
# extend type Query {
#   phieunhap: MatHangQueryResponse
#   phieunhapvoithuoctinh(input: MatHangInput): MatHangQueryResponse
#   timkiemphieunhap(input: MatHangInput): MatHangQueryResponse
# }
# extend type Mutation {
#   taoMatHang(input: MatHangInput): MatHangResponse
#   suaMatHang(input: MatHangInput): MatHangResponse
#   xoaMatHang(ma: Int!): MatHangResponse
# }
`