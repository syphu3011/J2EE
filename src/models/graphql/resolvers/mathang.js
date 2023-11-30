const {HangTrongKho} = require("../../database/models")
module.exports =  {
  MatHang: {
    async soluong(mathang) {
      const hangtrongkho = await HangTrongKho.findAll({
        where: {
          masanpham: mathang.masanpham,
          mamau: mathang.mamau,
          makichco: mathang.makichco,
        }
      })
      const rs = hangtrongkho.map((product) => product.soluong).reduce((acc, current) => acc + current, 0);
      return rs
    },
    mau(mathang) {
      return mathang.getMau()
    },
    kichco(mathang) {
      return mathang.getKichCo()
    },
    trangthaisanpham(mathang) {
      return mathang.getTrangThaiSanPham()
    }
  }
};