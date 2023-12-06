const { gql } = require("apollo-server-express");

module.exports = gql`
  type HoaDon {
    ma: ID!
    ngaylap: String!
    sanpham: [ChiTietHoaDon]
    nhanvien: NhanVien
    khachhang: KhachHang
    trangthaihoadon: TrangThaiHoaDon
    email: String
    sodienthoai: String
    tongtien: Int
  }
  input ChiTietHoaDonInput {
    masanpham: Int
    mamau: Int
    makichco: Int
    maphieunhap: Int
    soluong: Int
    gia: Int
  }
  input HoaDonInput {
    ma: ID
    sanpham: [ChiTietHoaDonInput]
    manhanvien: Int
    makhachhang: Int
    matrangthai: Int
    diachi: String
    sodienthoai: String
    email: String
  }
  type HoaDonQueryResponse {
    status: Int!
    message: String!
    data: [HoaDon!]!
  }
  type HoaDonResponse {
    status: Int!
    message: String!
  }
  extend type Query {
    hoadon: HoaDonQueryResponse
    hoadondaxuly: HoaDonQueryResponse
    hoadonchuaxuly: HoaDonQueryResponse
    lichsudonhang: HoaDonQueryResponse
    hoadonvoithuoctinh(input: HoaDonInput): HoaDonQueryResponse
    timkiemhoadon(input: HoaDonInput): HoaDonQueryResponse
  }
  extend type Mutation {
    taoHoaDon(input: HoaDonInput): HoaDonResponse
    xacnhanhoachuyhoadon(input: HoaDonInput): HoaDonResponse
  }
`;
