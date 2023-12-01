const {HangTrongKho, PhieuNhap} = require("../../database/models")
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
    },
    async giaban(mathang) {
      const hangtrongkho = await HangTrongKho.findAll({
        where: {
          masanpham: mathang.masanpham,
          mamau: mathang.mamau,
          makichco: mathang.makichco
        }
      })
      let phieunhap_min
      for (const e of hangtrongkho) {
        const phieunhap_new = await PhieuNhap.findByPk(e.maphieunhap)
        if (phieunhap_min) {
          if (phieunhap_new.ngaynhap < phieunhap_min.ngaynhap) {
            phieunhap_min = phieunhap_new
          }
        }
        else {
          phieunhap_min = phieunhap_new
        }
      }
      if (!phieunhap_min) {
        return 0
      }
      return hangtrongkho.filter(e => {
        return e.maphieunhap == phieunhap_min.ma
      })[0].giaban
    }
  }
};