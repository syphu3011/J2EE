const {gql} = require('apollo-server-express')

module.exports = gql`
type ChiTietPhieuNhap {
  sanpham: SanPham
  mau: Mau
  kichco: KichCo
  soluong: Int
  gianhap: Int
}
`