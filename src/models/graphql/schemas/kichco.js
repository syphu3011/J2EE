const {gql} = require('apollo-server-express')

module.exports = gql`
type KichCo {
  ma: ID!
  ten: String!
  sanpham: [SanPham]
}
input KichCoInput {
  ma: ID
  ten: String!
}
type KichCoQueryResponse {
  status: Int!
  message: String!
  data: [KichCo!]!
}
type KichCoResponse {
  status: Int!
  message: String!
}
extend type Query {
  kichco: KichCoQueryResponse
  kichcovoithuoctinh(input: KichCoInput): KichCoQueryResponse
  timkiemkichco(input: KichCoInput): KichCoQueryResponse
}
extend type Mutation {
  taoKichCo(input: KichCoInput): KichCoResponse
  suaKichCo(input: KichCoInput): KichCoResponse
  xoaKichCo(ma: Int!): KichCoResponse
}
`