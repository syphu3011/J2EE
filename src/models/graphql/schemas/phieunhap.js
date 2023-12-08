const {gql} = require('apollo-server-express')

module.exports = gql`
type PhieuNhap {
  ma: ID!
  ngaynhap: String
  # nhanvien: NhanVien
  nhacungcap: NhaCungCap
  mathang: [ChiTietPhieuNhap]
  nhanvien: NhanVien
  ghichu: String
}
input NhapMatHangInput {
  masanpham: Int!
  mamau: Int!
  makichco: Int!
  soluong: Int!
  gianhap: Int!
  giaban: Int!
}
input PhieuNhapInput {
  ma: ID
  ngaynhap: String
  manhanvien: Int
  manhacungcap: Int!
  ghichu: String
  mathang: [NhapMatHangInput]!  
}
type PhieuNhapQueryResponse {
  status: Int!
  message: String!
  data: [PhieuNhap!]!
}
type PhieuNhapResponse {
  status: Int!
  message: String!
}
extend type Query {
  phieunhap: PhieuNhapQueryResponse
  phieunhapvoithuoctinh(input: PhieuNhapInput): PhieuNhapQueryResponse
  timkiemphieunhap(input: PhieuNhapInput): PhieuNhapQueryResponse
}
extend type Mutation {
  taoPhieuNhap(input: PhieuNhapInput): PhieuNhapResponse
  suaPhieuNhap(input: PhieuNhapInput): PhieuNhapResponse
  xoaPhieuNhap(ma: Int!): PhieuNhapResponse
}
`