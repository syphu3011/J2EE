const {gql} = require('apollo-server-express')

module.exports = gql`
type Loai {
    ma: ID!
    ten: String!
    anhminhhoa: String
    tenanhminhhoa: String
    mota: String
    loaicha: Loai
    loaicon: [Loai]
    sanpham: [SanPham]
}
input loaiInput {
    ma: Int
    ten: String!
    anhminhhoa: String
    b64anhminhhoa: String
    mota: String!
    maloaicha: Int
}
input loaiThuocTinhInput {
    ma: Int
    ten: String
    mota: String
}
type loaiResponse {
    status: Int!
    message: String!
}
type loaiQueryResponse {
    status: Int!
    message: String!
    data: [Loai!]
}
type loaiQueryVoiThuocTinhResponse {
    status: Int!
    message: String!
    data: Loai!
}
extend type Query {
    loai: loaiQueryResponse!
    loaiLon: loaiQueryResponse!
    loaivoithuoctinh(input: loaiInput!): loaiQueryResponse!
    timkiemloai(input: loaiInput!): loaiQueryResponse!
}
extend type Mutation {
    taoLoai(input: loaiInput!): loaiResponse
    suaLoai(input: loaiInput!): loaiResponse
    xoaLoai(ma: Int!): loaiResponse
}
`