const {gql} = require('apollo-server-express')

module.exports = gql`
type Mau {
  ma: ID!
  ten: String!
  sanpham: [SanPham]
}
input MauInput {
  ma: ID
  ten: String!
}
type MauQueryResponse {
  status: Int!
  message: String!
  data: [Mau!]!
}
type MauResponse {
  status: Int!
  message: String!
}
extend type Query {
  mau: MauQueryResponse
  mauvoithuoctinh(input: MauInput): MauQueryResponse
  timkiemmau(input: MauInput): MauQueryResponse
}
extend type Mutation {
  taoMau(input: MauInput): MauResponse
  suaMau(input: MauInput): MauResponse
  xoaMau(ma: Int!): MauResponse
}
`