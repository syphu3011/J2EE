const {gql} = require('apollo-server-express')

module.exports = gql`
type SanPham {
    ma: ID!
    ten: String!
    anhminhhoa: String!
    mota: String!
    gia: Int!
    mathang: [MatHang!]
    donvi: DonVi
    loai: [Loai!]
}
input SanPhamInput {
    ma: Int
    ten: String!
    anhminhhoa: String!
    mota: String!
    maloai: [Int!]
    madonvi: Int!
    manhacungcap: [Int!]
}
input SanPhamQuery {
    ma: Int
    ten: String
}
input SanPhamTimKiemQuery {
    ma: Int
    ten: String
    gia_tu: Int
    gia_den: Int
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
extend type Query {
    sanpham: SanPhamQueryResponse
    sanphamvoithuoctinh(input: SanPhamQuery): SanPhamQueryResponse
    timkiemsanpham(input: SanPhamTimKiemQuery): SanPhamQueryResponse
}
extend type Mutation {
    taoSanPham(input: SanPhamInput!): SanPhamResponse
    suaSanPham(input: SanPhamInput!): SanPhamResponse
    xoaSanPham(ma: Int!): SanPhamResponse
}
`