const {HangTrongKho, PhieuNhap, sequelize} = require("../../database/models")
module.exports =  {
  MatHang: {
    async soluong(mathang) {
      // const hangtrongkho = await HangTrongKho.findAll({
      //   where: {
      //     masanpham: mathang.masanpham,
      //     mamau: mathang.mamau,
      //     makichco: mathang.makichco,
      //     matrangthai: 1
      //   }
      // })
      // const rs = hangtrongkho.map((product) => product.soluong).reduce((acc, current) => acc + current, 0);
      const hangtrongkho_min = await sequelize.query(`
      select sum(soluong) soluong
      from HangTrongKho, PhieuNhap 
      where masanpham = ${mathang.masanpham} AND mamau = ${mathang.mamau} AND makichco = ${mathang.makichco} AND matrangthai = 1 AND maphieunhap = PhieuNhap.ma 
      GROUP BY PhieuNhap.ma, masanpham 
      ORDER BY PhieuNhap.ngaynhap  ASC LIMIT 1
      `)
      return hangtrongkho_min[0][0] ? hangtrongkho_min[0][0].soluong : 0
    },
    mau(mathang) {
      return mathang.getMau()
    },
    kichco(mathang) {
      return mathang.getKichCo()
    },
    // trangthaisanpham(mathang) {
    //   return mathang.getTrangThaiSanPham()
    // },
    async giaban(mathang) {
      const hangtrongkho_min = await sequelize.query(`
      select min(giaban) giaban 
      from HangTrongKho, PhieuNhap 
      where masanpham = ${mathang.masanpham} AND mamau = ${mathang.mamau} AND makichco = ${mathang.makichco} AND matrangthai = 1 AND maphieunhap = PhieuNhap.ma 
      GROUP BY PhieuNhap.ma, masanpham 
      ORDER BY PhieuNhap.ngaynhap  ASC LIMIT 1
      `)
      return hangtrongkho_min[0][0] ? hangtrongkho_min[0][0].giaban : 0
    }
  }
};