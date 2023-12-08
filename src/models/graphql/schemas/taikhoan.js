const {gql} = require('apollo-server-express')

module.exports = gql`
type TaiKhoan {
  tentaikhoan: String
  matkhau: String
  maquyen: Int
  quyen: Quyen
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
input OTPInput {
  otp: String!
}
type ChucNangAdminResponse {
  chucnang: String
  tentaikhoan: String
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
  data: ChucNangAdminResponse
}
type DangNhapAdminResponse {
  status: Int!
  message: String!
  data: ChucNangAdminResponse
}
type DangNhapTokenKhachHang {
  tenkhachhang: String
}
type DangNhapTokenKhachHangResponse {
  status: Int!
  message: String!
  data: DangNhapTokenKhachHang
}

extend type Query {
  taikhoan: TaiKhoanQueryResponse
  taikhoanvoithuoctinh(input: TaiKhoanInput): TaiKhoanQueryResponse
  timkiemtaikhoan(input: TaiKhoanInput): TaiKhoanQueryResponse
}
extend type Mutation {
  quenMatKhauKhachHang(input: ForgotPasswordInput): TaiKhoanResponse
  dangKyKhachHang(input: TaiKhoanKhachHangInput): TaiKhoanResponse
  dangNhap(input: TaiKhoanInput):DangNhapTokenKhachHangResponse
  dangNhapVoiToken: DangNhapTokenKhachHangResponse
  dangNhapAdminVoiToken:DangNhapAdminResponse
  dangxuat: DangNhapResponse
  xacThucOTP(input: OTPInput):DangNhapAdminResponse
  dangNhapAdmin(input: TaiKhoanInput):DangNhapAdminResponse
  suaTaiKhoan(input: TaiKhoanInput): TaiKhoanResponse
  xoaTaiKhoan(ma: Int!): TaiKhoanResponse
  doimatkhau(matkhaucu: String!, matkhaumoi: String!, matkhauxacnhan: String!): TaiKhoanResponse
}
`