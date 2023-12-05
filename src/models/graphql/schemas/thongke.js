const {gql} = require('apollo-server-express')

module.exports = gql`
type ThongKe {
  tentaikhoan: String!
  matkhau: String!
  maquyen: Int!
  quyen: Quyen!
}
input ThongKeKhachHangInput {
  ten: String!
  ngaysinh: String!
  tentaikhoan: String!
  matkhau: String!
  xacnhanmatkhau: String!
  sodienthoai: String!
  maquyen: Int
}
input ThongKeInput {
  tentaikhoan: String!
  matkhau: String!
  maquyen: Int
}
input ThongKeTokenInput {
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
}
type ThongKeQueryResponse {
  status: Int!
  message: String!
  data: [ThongKe!]!
}
type ThongKeResponse {
  status: Int!
  message: String!
}
type DangNhapResponse {
  status: Int!
  message: String!
}
type DangNhapAdminResponse {
  status: Int!
  message: String!
  data: ChucNangAdminResponse
}
type DangNhapTokenResponse {
  status: Int!
  message: String!
}

extend type Query {
  
}
extend type Mutation {
  
}
`