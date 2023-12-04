const {gql} = require('apollo-server-express')

module.exports = gql`
type ChiTietHoaDon {
  mahoadon: Int
  sanpham: SanPham
  mau: Mau
  kichco: KichCo
  phieunhap: PhieuNhap
  soluong: Int
  gia: Int
}
`