const { Op, literal } = require("sequelize")
const { HangTrongKho,ChiTietPhieuNhap, sequelize } = require("../../database/models")
const {STATUS_CODE, CHUCNANG} = require("../const")
const { checkAndResolveAdmin } = require("./checkToken")
const hangtrongkho = require("../schemas/hangtrongkho")
module.exports = {
  Mutation: {
    async suaHangTrongKho(root, args, context) {
      const {masanpham, maphieunhap, mamau, makichco, giaban} = args.input
      async function callback(data) {
        let transaction
        try {
          transaction = await sequelize.transaction()
          const hangtrongkho = await HangTrongKho.findOne({
            where: {
              masanpham, maphieunhap, mamau, makichco
            }
          })
          await hangtrongkho.update({ giaban })
          await hangtrongkho.save()
          await transaction.commit()
          return {
            status: STATUS_CODE.update_success,
            message: "Sửa giá bán thành công!",
          }
        }
        catch (e) {
          await transaction.rollback()
          return {
            status: STATUS_CODE.update_fail,
            message: "Bị lỗi! Sửa giá bán không thành công!",
          }
        }
      }
      return await checkAndResolveAdmin(context.taikhoan, callback, `đã sửa sản phẩm trong kho có mã là ${masanpham} ${maphieunhap} ${mamau} ${makichco}. 
      Giá mới: ${giaban} `, CHUCNANG.SUAKHO)
    },
    async ngungbanhoacban(root, args, context) {
      const {masanpham, maphieunhap, mamau, makichco, matrangthai} = args.input
      async function callback(data) {
        let transaction
        try {
          transaction = await sequelize.transaction()
          const hangtrongkho = await HangTrongKho.findOne({
            where: {
              masanpham, maphieunhap, mamau, makichco
            }
          })
          await hangtrongkho.update({ matrangthai })
          await hangtrongkho.save()
          await transaction.commit()
          return {
            status: STATUS_CODE.update_success,
            message: matrangthai == 1 ? "Hàng này được bán lại!" : "Hàng này ngừng bán!"
          }
        }
        catch (e) {
          await transaction.rollback()
          return {
            status: STATUS_CODE.update_fail,
            message: "Bị lỗi! Sửa giá bán không thành công!",
          }
        }
      }
      return await checkAndResolveAdmin(context.taikhoan, callback, `đã sửa sản phẩm trong kho có mã là ${masanpham} ${maphieunhap} ${mamau} ${makichco}. 
      Mã tráng thái hàng: ${matrangthai} `, CHUCNANG.SUAKHO)
    }
  },
  Query: {
    hangtrongkho: async (root, args, context) => {
      async function callback(nhanvien_data) {
        try {
          const rs = {
            status: STATUS_CODE.query_success,
            message: "Lấy danh sách chức năng thành công!",
            data: await HangTrongKho.findAll()
          }
          return rs
        }
        catch (e) {
          return {
            status: STATUS_CODE.query_fail,
            message: "Lấy danh sách chức năng không thành công!",
            data: null
          }
        }
      }
      return await callback(null)
      // return await checkAndResolveAdmin(context.taikhoan, callback, "", CHUCNANG.XEMKHO)
    }
  },
  HangTrongKho: {
    tensanpham: async(hangtrongkho) => {
      const sanpham = await hangtrongkho.getSanPham()
      return sanpham.ten
    },
    phieunhap: async(hangtrongkho) => {
      return hangtrongkho.getPhieuNhap()
    },
    loai: async (hangtrongkho) => {
      const sanpham = await hangtrongkho.getSanPham()
      const loai = await sanpham.getLoai()
      return loai
    },
    mau: (hangtrongkho) => {
      return hangtrongkho.getMau()
    },
    kichthuoc: (hangtrongkho) => {
      return hangtrongkho.getKichCo()
    }, 
    kichco: (hangtrongkho) => {
      return hangtrongkho.getKichCo()
    }, 
    ncc: async (hangtrongkho) => {
      const phieunhap = await hangtrongkho.getPhieuNhap()
      return phieunhap.getNhaCungCap()
    }, 
    // gianhap: async (hangtrongkho) => {
      // const chitietphieunhap = await ChiTietPhieuNhap.findOne({
      //   where: {
      //     masanpham: hangtrongkho.masanpham,
      //     mamau: hangtrongkho.mamau,
      //     makichco: hangtrongkho.makichco,
      //     maphieunhap: hangtrongkho.maphieunhap
      //   }
      // })
    //   return hangtrongkho.gianhap
    // }
  }
}