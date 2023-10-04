const {gql} = require('apollo-server-express')

module.exports = gql`
type SanPham {
    ma: ID!
    ten: String!
    anhminhhoa: String!
    mota: String!
    giaban: Int!
    loai: [Loai!]
}
input taoSanPhamInput {
    ten: String!
    anhminhhoa: String!
    mota: String!
    giaban: Int!
}
type taoSanPhamResponse {
    id: Int!
    mota: String!
    giaban: Int!
}
extend type Query {
    sanpham: [SanPham!]
}
extend type Mutation {
    taoSanPham(input: taoSanPhamInput!): taoSanPhamResponse
}
`