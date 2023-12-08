const { Op, literal } = require("sequelize")
const {SanPham, NhaCungCap, PhieuNhap, ChiTietPhieuNhap, sequelize, ChiTietHoaDon, HangTrongKho, MatHang} = require("../../database/models")
const {STATUS_CODE, CHUCNANG} = require("../const")
const { checkAndResolveAdmin } = require("./checkToken")

module.exports = {
    Mutation: {
      async taoPhieuNhap(root, args, context) {
        async function callback(nhanvien_data) {
          let transaction
          try {
            transaction = await sequelize.transaction()
            const {
            manhacungcap,
            mathang, ghichu} = args.input
            const manhanvien = nhanvien_data.ma
            const phieunhap = await PhieuNhap.create({manhacungcap, manhanvien, ghichu})
            const ncc = await NhaCungCap.findByPk(manhacungcap)
            if (!ncc) {
              return {
                status: STATUS_CODE.create_success,
                message: "Thêm phiếu nhập không thành công! Nhà cung cấp không tồn tại!",
                data: null
              }
            }
            let checknew = false
            for (e of mathang) {
              const {masanpham, mamau, makichco, soluong, gianhap, giaban} = e
              let mathangfind = await MatHang.findOne({
                where: {
                  masanpham: masanpham,
                  mamau: mamau,
                  makichco: makichco
                }
              })

              if (!mathangfind) {
                mathangfind = await MatHang.create({masanpham, mamau, makichco})
                checknew = true
              }
              await ChiTietPhieuNhap.create({maphieunhap: phieunhap.ma, masanpham, makichco, mamau, soluong, gianhap})
              await HangTrongKho.create({maphieunhap: phieunhap.ma,masanpham, makichco, mamau, soluong, giaban, gianhap})
              try {
                const sanpham = await SanPham.findByPk(masanpham)
                await ncc.addSanPham(sanpham)
              }
              catch (e) {
                
              }
              await phieunhap.save()
            }
            await transaction.commit()
            return {
              status: STATUS_CODE.create_success,
              message: "Thêm phiếu nhập thành công!",
              data: phieunhap
            }
          } 
          catch(e) {
            await transaction.rollback()
            return {
              status: STATUS_CODE.create_fail,
              message: "Bị lỗi! Thêm phiếu nhập không thành công!",
              data: []
            }
          }
        }
        // return await callback(null)
        return await checkAndResolveAdmin(context.taikhoan, callback, "đã nhập hàng", CHUCNANG.NHAPHANG)
      },
      async suaPhieuNhap(root, args, context) {
        // async function callback(nhanvien_data) {
        //   let transaction
        //   try {
        //     transaction = await sequelize.transaction()
        //     const {
        //     ma,
        //     manhacungcap,
        //     mathang,
        //     manhanvien, ghichu} = args.input
        //     // kiểm tra ràng buộc xem nó dính hóa đơn nào chưa
        //     // chưa thì cho sửa
        //     // const chitiethoadon = await ChiTietHoaDon.findOne({
        //     //   where: {
        //     //     maphieunhap: ma
        //     //   }
        //     // })
        //     // if (!chitiethoadon) {
        //       // cập nhật các thông tin ở phiếu nhập
        //       const phieunhap = await PhieuNhap.findByPk(ma)
        //       await phieunhap.update({manhacungcap, manhanvien, ghichu})
        //       await phieunhap.setMatHang([])
        //       let checknew = false
        //       // xóa mặt hàng thừa thải nếu xóa phiếu nhập
        //       // await xoaHangTrongKho(ma)
        //       await xoaMatHangDu(ma, phieunhap.mannhacungcap)
        //       for (e of mathang) {
        //         const {masanpham, mamau, makichco, soluong, gianhap} = e
        //         let mathangfind = await MatHang.findOne({
        //           where: {
        //             masanpham: masanpham,
        //             mamau: mamau,
        //             makichco: makichco
        //           }
        //         })
        //         if (!mathangfind) {
        //           mathangfind = await MatHang.create({masanpham, mamau, makichco, matrangthaisanpham: 1})
        //           checknew = true
        //         }
        //         await phieunhap.addMatHang(mathangfind, {through: {masanpham, makichco, mamau, soluong, gianhap}})
        //         // const ma = phieunhap.ma
        //       // await HangTrongKho.create({maphieunhap: ma, masanpham, mamau, makichco, soluong})
        //         await phieunhap.save()
        //       }
        //       await transaction.commit()
        //       return {
        //         status: STATUS_CODE.update_success,
        //         message: "Sửa phiếu nhập thành công!" + (checknew ? "Có 1 vài mặt hàng mới, hãy định giá bán!" : ""),
        //         data: phieunhap
        //       }
        //     // }
        //     // return 
        //   } 
        //   catch(e) {
        //     await transaction.rollback()
        //     return {
        //       status: STATUS_CODE.update_fail,
        //       message: "Bị lỗi! Sửa phiếu nhập không thành công!",
        //       data: []
        //     }
        //   }
        // }
        // return await checkAndResolveAdmin(context.taikhoan, callback, "đã nhập hàng", CHUCNANG.NHAPHANG)
      },
      async xoaPhieuNhap(root, args, context) {
        const {ma} = args
        async function callback(nhanvien_data) {
          let transaction
          try {
            transaction = await sequelize.transaction()
            const phieunhap = await PhieuNhap.findByPk(ma)
            // await phieunhap.setMatHang([])
            // xóa hàng trong kho và phiếu nhập
            // const chitiethoadon = await ChiTietHoaDon.findOne({
            //   where: {
            //     maphieunhap: ma
            //   }
            // })
            
            // if (!chitiethoadon) {
              // await xoaHangTrongKho(ma)
              await xoaMatHangDu(ma, phieunhap.manhacungcap)
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
            await transaction.commit()
            return {
              status: STATUS_CODE.update_success,
              message: "Xóa phiếu nhập thành công!",
              data: phieunhap
            }
          } 
          catch(e) {
            await transaction.rollback()
            return {
              status: STATUS_CODE.update_fail,
              message: "Bị lỗi! Xóa phiếu nhập không thành công!",
              data: []
            }
          }
        }
        // return await callback(null)
        return await checkAndResolveAdmin(context.taikhoan, callback, "đã xóa phiếu nhập hàng mã: "+ma, CHUCNANG.NHAPHANG)
      }
    },
    Query: {
      phieunhap: async (root, args, context) => {
        async function callback(nhanvien_data) {
          try {
            return {
              status: STATUS_CODE.query_success,
              message: "Lấy danh sách phiếu nhập thành công!",
              data: await PhieuNhap.findAll()
            }
          }
          catch(e) {
            return {
              status: STATUS_CODE.query_fail,
              message: "Lấy danh sách phiếu nhập không thành công!",
              data: []
            }
          }
        }
        return await checkAndResolveAdmin(context.taikhoan, callback, "", CHUCNANG.NHAPHANG)
      }
    },
    PhieuNhap: {
      nhacungcap(phieunhap) {
        return phieunhap.getNhaCungCap()
      },
      mathang(phieunhap) {
        return phieunhap.getChiTietPhieuNhap()
      },
      nhanvien(phieunhap) {
        return phieunhap.getNhanVien()
      }
    }
}
async function xoaMatHangDu(ma, manhacungcap) {
  //ma là mã phiếu nhập
  const chitietphieunhap = await ChiTietPhieuNhap.findAll({
    where: {
      maphieunhap: ma
    }
  })
  const mangmasanpham = chitietphieunhap.map(e => e.masanpham).filter((value, index, array) => {
    return array.indexOf(value) === index;
  })
  for (const masanpham of mangmasanpham) {
    const anotherphieunhap = await PhieuNhap.findAll({
      where: {
        ma: {
          [Op.not]: ma
        },
        manhacungcap
      },
      include: [{
        model: MatHang,
        as: "MatHang",
        where: {
          masanpham: masanpham
        }
      }]
    })
    if (anotherphieunhap.length == 0) {
      const ncc = await NhaCungCap.findByPk(manhacungcap)
      if (ncc) {
        const sanpham = await SanPham.findByPk(masanpham)
        if (sanpham) {
          await ncc.removeSanPham(sanpham)
        }
      }
    }
  }
  for (chitiet of chitietphieunhap) {
    const {masanpham, mamau, makichco} = chitiet
    const hangtrongkho = await HangTrongKho.findOne({
      where: {
        masanpham,
        mamau,
        makichco,
        maphieunhap: ma,
        // giaban: 0,
        // matrangthaisanpham: 2
      }
    })
    if (hangtrongkho) {
      await hangtrongkho.destroy()
      await hangtrongkho.save()
    }
    await chitiet.destroy()
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
          // giaban: 0,
          // matrangthaisanpham: 2
        }
      })
    }
  }
  // await xoaHangTrongKho(ma)
}