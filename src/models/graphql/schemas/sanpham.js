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
    ma: Int
    ten: String!
    anhminhhoa: String!
    mota: String!
    giaban: Int!
    maloai: [Int!]
    manhacungcap: [Int!]
}
type SanPhamResponse {
    status: Int!,
    message: String!
}
type SanPhamQueryResponse {
    status: Int!,
    message: String!,
    data: [SanPham!]
}
type SanPhamQueryVoiMaResponse {
    status: Int!,
    message: String!,
    data: SanPham!
}
extend type Query {
    sanpham: SanPhamQueryResponse
    sanphamvoima(ma: Int!): SanPhamQueryVoiMaResponse
}
extend type Mutation {
    taoSanPham(input: SanPhamInput!): SanPhamResponse
    suaSanPham(input: SanPhamInput!): SanPhamResponse
    xoaSanPham(ma: Int!): SanPhamResponse
}
`