const {gql} = require('apollo-server-express')
module.exports = gql`
  type TrangThaiNhaCungCap {
    ma: ID!
    ten: String!
    nhacungcap: [NhaCungCap]
  }
  extend type Query {
    trangthainhacungcap: [TrangThaiNhaCungCap]
  }
`