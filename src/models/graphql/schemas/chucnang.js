const {gql} = require('apollo-server-express')

module.exports = gql`
type ChucNang {
  ma: ID!
  ten: String!
}
input ChucNangInput {
  ma: ID
  ten: String!
}
type ChucNangQueryResponse {
  status: Int!
  message: String!
  data: [ChucNang!]!
}
type ChucNangResponse {
  status: Int!
  message: String!
}
extend type Query {
  chucnang: ChucNangQueryResponse
  chucnangvoithuoctinh(input: ChucNangInput): ChucNangQueryResponse
  timkiemchucnang(input: ChucNangInput): ChucNangQueryResponse
}
extend type Mutation {
  taoChucNang(input: ChucNangInput): ChucNangResponse
  suaChucNang(input: ChucNangInput): ChucNangResponse
  xoaChucNang(ma: Int!): ChucNangResponse
}
`