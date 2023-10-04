const {gql} = require('apollo-server-express')

module.exports = gql`
type Loai {
    ma: ID!
    ten: String!
    anhminhhoa: String!
    mota: String!
    loaicha: Loai
    loaicon: [Loai]
    sanpham: [SanPham]
}
input taoLoaiInput {
    ten: String!
    anhminhhoa: String!
    mota: String!
}
type taoLoaiResponse {
    id: Int!
    mota: String!
}
extend type Query {
    loai: [Loai!]
}
extend type Mutation {
    taoLoai(input: taoLoaiInput!): taoLoaiResponse
}
`