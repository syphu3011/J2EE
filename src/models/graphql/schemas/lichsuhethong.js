const {gql} = require('apollo-server-express')

module.exports = gql`
type LichSuHeThong {
  ma: ID!
  noidung: String!
}
type LichSuHeThongQueryResponse {
  status: Int!
  message: String!
  data: [LichSuHeThong]
}
extend type Query {
  lichsuhethong: LichSuHeThongQueryResponse
}
`