const { Op, literal } = require("sequelize")
const { ChucNang, sequelize } = require("../../database/models")
const {STATUS_CODE} = require("../const")
module.exports = {
  ChiTietPhieuNhap: {
    sanpham(chitietsanpham) {
      return chitietsanpham.getSanPham()
    },
    mau(chitietsanpham) {
      return chitietsanpham.getMau()
    },
    kichco(chitietsanpham) {
      return chitietsanpham.getKichCo()
    }

  }
}