const {gql} = require('apollo-server-express')

module.exports = gql`
type HangTrongKho {
  masanpham: Int
  tensanpham: String
  phieunhap: PhieuNhap
  loai: [Loai]
  mau: Mau
  kichthuoc: KichCo
  ncc: NhaCungCap
  gianhap: Int
  giaban: Int
  soluong: Int
}
input HangTrongKhoInput {
  masanpham: Int
  tensanpham: String
  maphieunhap: Int
  maloai: Int
  mamau: Int
  makichco: Int
  mancc: Int
  gianhap: Int
  giaban: Int
  matrangthai: Int
}
type HangTrongKhoQueryResponse {
  status: Int!
  message: String!
  data: [HangTrongKho!]!
}
type HangTrongKhoResponse {
  status: Int!
  message: String!
}
extend type Query {
  hangtrongkho: HangTrongKhoQueryResponse
  timkiemhangtrongkho(input: HangTrongKhoInput): HangTrongKhoQueryResponse
}
extend type Mutation {
  suaHangTrongKho(input: HangTrongKhoInput): HangTrongKhoResponse,
  ngungbanhoacban(input: HangTrongKhoInput): HangTrongKhoResponse
}
`