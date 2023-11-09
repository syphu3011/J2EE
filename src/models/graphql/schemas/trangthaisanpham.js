const {gql} = require('apollo-server-express')

module.exports = gql`
type TrangThaiSanPham {
  ma: Int!
  ten: String!
}

`