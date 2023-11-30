const {gql} = require('apollo-server-express')
module.exports = gql`
type NhaCungCap {
  ma: ID!
  ten: String!
  diachi: String!
  dienthoai: String!
  trangthai: TrangThaiNhaCungCap!
  sanpham: [SanPham]
}
type NhaCungCapQueryResponse {
  status: Int!
  message: String!
  data: [NhaCungCap]
}
extend type Query {
  nhacungcap: NhaCungCapQueryResponse!
  nhacungcapvoithuoctinh(input: NhaCungCapQueryInput): NhaCungCapQueryResponse!
  timkiemnhacungcap(input: NhaCungCapQueryInput): NhaCungCapQueryResponse!
}
input NhaCungCapUpdateInput {
  ma: Int!
  ten: String!
  diachi: String!
  dienthoai: String!
  matrangthaincc: Int!
  masanpham: [Int!]
}
input NhaCungCapInput {
  ten: String!
  diachi: String!
  dienthoai: String!
  matrangthaincc: Int!
  masanpham: [Int!]
}
input NhaCungCapQueryInput {
  ma: Int
  ten: String
  diachi: String
  dienthoai: String
  matrangthaincc: Int
  tensanpham: String
}
type NhaCungCapData {
  ten: String!
  diachi: String!
  dienthoai: String!
  matrangthaincc: Int!
  masanpham: [Int!]
}
type NhaCungCapResponse {
  status: Int!
  message: String!
}
input XoaNhaCungCapInput {
  ma: Int!
}
extend type Mutation {
  taoNhaCungCap(input: NhaCungCapInput!): NhaCungCapResponse
  suaNhaCungCap(input: NhaCungCapUpdateInput!): NhaCungCapResponse
  xoaNhaCungCap(input: XoaNhaCungCapInput!): NhaCungCapResponse
}
`