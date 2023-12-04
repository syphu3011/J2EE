const { gql } = require("apollo-server-express");

module.exports = gql`
    type NhanVien {
        ma: ID!
        ten: String!
        ngaysinh: String
        sodienthoai: String
        socccd: String
        tentaikhoan: String
        matkhau: String
        trangthai: TrangThaiNhanVien
        quyen: Quyen
        email: String
    }

    input NhanVienInput {
        ma: Int
        ten: String!
        ngaysinh: String!
        sodienthoai: String!
        socccd: String!
        tentaikhoan: String
        maquyen: Int
        matrangthai: Int!
        email: String
    }
    input TaiKhoanNhanVienInput {
        manhanvien: Int
        tentaikhoan: String
        matkhau: String
        maquyen: Int
    }
    input NhanVienQuery {
        ma: Int
        ten: String
        email: String
        sodienthoai: String
    }

    type NhanVienResponse {
        status: Int!
        message: String!
    }

    type NhanVienQueryResponse {
        status: Int!
        message: String!
        data: [NhanVien!]
    }

    extend type Query {
        nhanvien: NhanVienQueryResponse
        nhanvienvoithuoctinh(input: NhanVienQuery): NhanVienQueryResponse
        timkiemnhanvien(input: NhanVienQuery): NhanVienQueryResponse
    }

    extend type Mutation {
        themNhanVien(input: NhanVienInput!): NhanVienResponse
        suaNhanVien(input: NhanVienInput!): NhanVienResponse
        xoaNhanVien(ma: Int!): NhanVienResponse
        captaikhoan(input: TaiKhoanNhanVienInput): NhanVienResponse
        xoataikhoan(input: TaiKhoanNhanVienInput): NhanVienResponse
    }
`;
