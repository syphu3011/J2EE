const { Op, literal } = require("sequelize")
const {PhieuNhap, ChiTietPhieuNhap, sequelize, ChiTietHoaDon, HangTrongKho, MatHang} = require("../../database/models")
const {STATUS_CODE} = require("../const")
module.exports = {
    Mutation: {
      async taoPhieuNhap(root, args, context) {
        let transaction
        try {
          transaction = await sequelize.transaction()
          const {
          manhacungcap,
          mathang,
          manhanvien, ghichu} = args.input
          const phieunhap = await PhieuNhap.create({manhacungcap, manhanvien, ghichu})
          let checknew = false
          for (e of mathang) {
            const {masanpham, mamau, makichco, soluong, gianhap} = e
            let mathangfind = await MatHang.findOne({
              where: {
                masanpham: masanpham,
                mamau: mamau,
                makichco: makichco
              }
            })
            if (!mathangfind) {
              mathangfind = await MatHang.create({masanpham, mamau, makichco, matrangthaisanpham: 2, giaban: 0})
              checknew = true
            }
            await phieunhap.addMatHang(mathangfind, {through: {masanpham, makichco, mamau, soluong, gianhap}})
            // const ma = phieunhap.ma
          // await HangTrongKho.create({maphieunhap: ma, masanpham, mamau, makichco, soluong})
            await phieunhap.save()
          }
          transaction.commit()
          return {
            status: STATUS_CODE.create_success,
            message: "Thêm phiếu nhập thành công!" + (checknew ? "Có 1 vài mặt hàng mới, hãy định giá bán!" : ""),
            data: phieunhap
          }
        } 
        catch(e) {
          transaction.rollback()
          return {
            status: STATUS_CODE.create_fail,
            message: "Bị lỗi! Thêm phiếu nhập không thành công!",
            data: []
          }
        }
      },
      async suaPhieuNhap(root, args, context) {
        let transaction
        try {
          transaction = await sequelize.transaction()
          const {
          ma,
          manhacungcap,
          mathang,
          manhanvien, ghichu} = args.input
          // kiểm tra ràng buộc xem nó dính hóa đơn nào chưa
          // chưa thì cho sửa
          // const chitiethoadon = await ChiTietHoaDon.findOne({
          //   where: {
          //     maphieunhap: ma
          //   }
          // })
          // if (!chitiethoadon) {
            // cập nhật các thông tin ở phiếu nhập
            const phieunhap = await PhieuNhap.findByPk(ma)
            await phieunhap.update({manhacungcap, manhanvien, ghichu})
            await phieunhap.setMatHang([])
            let checknew = false
            // xóa mặt hàng thừa thải nếu xóa phiếu nhập
            // await xoaHangTrongKho(ma)
            await xoaMatHangDu(ma)
            for (e of mathang) {
              const {masanpham, mamau, makichco, soluong, gianhap} = e
              let mathangfind = await MatHang.findOne({
                where: {
                  masanpham: masanpham,
                  mamau: mamau,
                  makichco: makichco
                }
              })
              if (!mathangfind) {
                mathangfind = await MatHang.create({masanpham, mamau, makichco, matrangthaisanpham: 1, giaban: 0})
                checknew = true
              }
              await phieunhap.addMatHang(mathangfind, {through: {masanpham, makichco, mamau, soluong, gianhap}})
              // const ma = phieunhap.ma
            // await HangTrongKho.create({maphieunhap: ma, masanpham, mamau, makichco, soluong})
              await phieunhap.save()
            }
            transaction.commit()
            return {
              status: STATUS_CODE.update_success,
              message: "Sửa phiếu nhập thành công!" + (checknew ? "Có 1 vài mặt hàng mới, hãy định giá bán!" : ""),
              data: phieunhap
            }
          // }
          // return 
        } 
        catch(e) {
          transaction.rollback()
          return {
            status: STATUS_CODE.update_fail,
            message: "Bị lỗi! Sửa phiếu nhập không thành công!",
            data: []
          }
        }
      },
      async xoaPhieuNhap(root, args, context) {
        let transaction
        try {
          transaction = await sequelize.transaction()
          const {ma} = args
          const phieunhap = await PhieuNhap.findByPk(ma)
          await phieunhap.setMatHang([])
          // xóa hàng trong kho và phiếu nhập
          // const chitiethoadon = await ChiTietHoaDon.findOne({
          //   where: {
          //     maphieunhap: ma
          //   }
          // })
          
          // if (!chitiethoadon) {
            // await xoaHangTrongKho(ma)
            await xoaMatHangDu(ma)
            await phieunhap.destroy()
            await phieunhap.save()
          // }
          // else {
          //   return {
          //     status: STATUS_CODE.update_fail,
          //     message: "Không thể xóa phiếu nhập! Lô nhập này đã được sử dụng!",
          //     data: []
          //   }
          // }
          transaction.commit()
          return {
            status: STATUS_CODE.update_success,
            message: "Xóa phiếu nhập thành công!",
            data: phieunhap
          }
        } 
        catch(e) {
          transaction.rollback()
          return {
            status: STATUS_CODE.update_fail,
            message: "Bị lỗi! Xóa phiếu nhập không thành công!",
            data: []
          }
        }
      }
    },
    Query: {
        
    }
}
async function xoaMatHangDu(ma) {
  //ma là mã phiếu nhập
  const chitietphieunhap = await ChiTietPhieuNhap.findAll({
    where: {
      maphieunhap: ma
    }
  })
  for (chitiet of chitietphieunhap) {
    const {masanpham, mamau, makichco} = chitiet
    // Kiểm tra mặt hàng có tồn tại ở phiếu khác không, không thì xóa cái chưa cài giá
    anotherchitiet = await ChiTietPhieuNhap.findOne(
      {
        where: {
          maphieunhap: {
            [Op.not]: ma
          },
          masanpham,
          mamau,
          makichco
        }
      }
    )
    if (!anotherchitiet) {
      await MatHang.destroy({
        where: {
          masanpham,
          mamau,
          makichco,
          giaban: 0,
          matrangthaisanpham: 2
        }
      })
    }
  }
}
async function xoaHangTrongKho(ma) {
  const hangtrongkho = await HangTrongKho.findAll({
    where: {
      maphieunhap: ma
    }
  })
  hangtrongkho.forEach(e => {
    e.destroy()
  })
}