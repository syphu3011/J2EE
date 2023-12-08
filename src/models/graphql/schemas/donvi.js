const {gql} = require('apollo-server-express')

module.exports = gql`
type DonVi {
  ma: ID!
  ten: String!
}
input DonViInput {
  ma: ID
  ten: String!
}
type DonViQueryResponse {
  status: Int!
  message: String!
  data: [DonVi!]!
}
type DonViResponse {
  status: Int!
  message: String!
}
extend type Query {
  donvi: DonViQueryResponse
  donvivoithuoctinh(input: DonViInput): DonViQueryResponse
  timkiemdonvi(input: DonViInput): DonViQueryResponse
}
extend type Mutation {
  taoDonVi(input: DonViInput): DonViResponse
  suaDonVi(input: DonViInput): DonViResponse
  xoaDonVi(ma: Int!): DonViResponse
}
`