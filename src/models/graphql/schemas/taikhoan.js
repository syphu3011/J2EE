const {gql} = require('apollo-server-express')

module.exports = gql`
type TaiKhoan {
  tentaikhoan: String!
  matkhau: String!
  maquyen: Int!
  quyen: Quyen!
}
input TaiKhoanKhachHangInput {
  ten: String!
  ngaysinh: String!
  tentaikhoan: String!
  matkhau: String!
  xacnhanmatkhau: String!
  sodienthoai: String!
  maquyen: Int
}
input TaiKhoanInput {
  tentaikhoan: String!
  matkhau: String!
  maquyen: Int
}
input TaiKhoanTokenInput {
  tentaikhoan: String
  token: String!
  rToken: String!
  maquyen: Int
}
input ForgotPasswordInput {
  tentaikhoan: String!
}
type TaiKhoanQueryResponse {
  status: Int!
  message: String!
  data: [TaiKhoan!]!
}
type TaiKhoanResponse {
  status: Int!
  message: String!
}
type DangNhapResponse {
  status: Int!
  message: String!
}
type DangNhapTokenResponse {
  status: Int!
  message: String!
}

extend type Query {
  taikhoan: TaiKhoanQueryResponse
  taikhoanvoithuoctinh(input: TaiKhoanInput): TaiKhoanQueryResponse
  timkiemtaikhoan(input: TaiKhoanInput): TaiKhoanQueryResponse
}
extend type Mutation {
  quenMatKhauKhachHang(input: ForgotPasswordInput): TaiKhoanResponse
  dangKyKhachHang(input: TaiKhoanKhachHangInput): TaiKhoanResponse
  dangNhap(input: TaiKhoanInput):DangNhapResponse
  dangNhapVoiToken: DangNhapTokenResponse
  dangNhapAdminVoiToken(input: TaiKhoanTokenInput):DangNhapResponse
  suaTaiKhoan(input: TaiKhoanInput): TaiKhoanResponse
  xoaTaiKhoan(ma: Int!): TaiKhoanResponse
}
`