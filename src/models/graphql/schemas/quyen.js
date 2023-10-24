const {gql} = require('apollo-server-express')

module.exports = gql`
type Quyen {
  ma: ID!
  ten: String!
  chucnang: [ChucNang]
}
input QuyenChucNang {
  ma: Int!
}
input QuyenInput {
  ma: ID
  ten: String!
  chucnang:[QuyenChucNang]
}
type QuyenQueryResponse {
  status: Int!
  message: String!
  data: [Quyen!]!
}
type QuyenResponse {
  status: Int!
  message: String!
}
extend type Query {
  quyen: QuyenQueryResponse
  quyenvoithuoctinh(input: QuyenInput): QuyenQueryResponse
  timkiemquyen(input: QuyenInput): QuyenQueryResponse
}
extend type Mutation {
  taoQuyen(input: QuyenInput): QuyenResponse
  suaQuyen(input: QuyenInput): QuyenResponse
  xoaQuyen(ma: Int!): QuyenResponse
}
`