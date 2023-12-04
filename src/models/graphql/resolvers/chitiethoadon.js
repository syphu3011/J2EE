const { Op, literal } = require("sequelize")
const { ChucNang, sequelize } = require("../../database/models")
const {STATUS_CODE} = require("../const")
module.exports = {
  ChiTietHoaDon: {
    sanpham(chitiethoadon) {
      return chitiethoadon.getSanPham()
    },
    mau(chitiethoadon) {
      return chitiethoadon.getMau()
    },
    kichco(chitiethoadon) {
      return chitiethoadon.getKichCo()
    },
    phieunhap(chitiethoadon) {
      return chitiethoadon.getPhieuNhap()
    }
  }
}