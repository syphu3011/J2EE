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
input SanPhamInput {
    ten: String!
    anhminhhoa: String!
    mota: String!
    giaban: Int!
    maloai: [Int!]
    manhacungcap: [Int!]
}
type SanPhamResponseData {
    ma: Int!
    ten: String!
    mota: String!
    giaban: Int!
    maloai: [Int!]
    manhacungcap: [Int!]
}
type SanPhamResponse {
    status: Int!,
    message: String!
    data: SanPhamResponseData
}
extend type Query {
    sanpham: [SanPham!]
}
extend type Mutation {
    taoSanPham(input: SanPhamInput!): SanPhamResponse
    suaSanPham(input: SanPhamInput!): SanPhamResponse
}
`