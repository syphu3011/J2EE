const { Op, literal } = require("sequelize")
const { KhachHang, TaiKhoan, sequelize, LichSuHeThong } = require("../../database/models")
const { STATUS_CODE, CHUCNANG } = require("../const")
const { checkPrivileges, checkAdmin, checkAndResolveAdmin } = require("./checkToken")
module.exports = {
  Mutation: {
    // async taokhachhang(root, args, context) {
    //   let transaction
    //   try {
    //     transaction = await sequelize.transaction()
    //     const {ma, ten} = args.input
    //     const khachhang = await khachhang.create({ma, ten})
    //     transaction.commit()
    //     return {
    //       status: STATUS_CODE.create_success,
    //       message: "Thêm đơn vị thành công!",
    //       data: khachhang
    //     }
    //   } 
    //   catch(e) {
    //     transaction.rollback()
    //     return {
    //       status: STATUS_CODE.create_fail,
    //       message: "Bị lỗi! Thêm đơn vị không thành công!",
    //       data: []
    //     }
    //   }
    // },
    async suaKhachHang(root, args, context) {
      try {
        return await checkAndResolveAdmin(context.taikhoan, async (nhanvien_data) => {
          let transaction
          try {
            transaction = await sequelize.transaction()
            const { ma, ten, ngaysinh, sodienthoai} = args.input
            const khachhang = await KhachHang.findByPk(ma)
            await khachhang.update({ ten, ngaysinh, sodienthoai})
            await khachhang.save()
            transaction.commit()
            return {
              status: STATUS_CODE.update_success,
              message: "Sửa thông tin khách hàng thành công!",
            }
          }
          catch (e) {
            transaction.rollback()
            return {
              status: STATUS_CODE.update_fail,
              message: "Bị lỗi! Sửa thông tin khách hàng không thành công!",
            }
          }
        }, "đã sửa thông tin khách hàng có mã là "+args.input.ma+"!", CHUCNANG.SUAKHACHHANG)
      }
      catch (e) {
        return {
          status: STATUS_CODE.update_fail,
          message: "Bị lỗi! Sửa thông tin khách hàng không thành công!",
        }
      }
    },
    async suaThongTinCaNhan(root, args, context) {
      let transaction
      try {
        transaction = await sequelize.transaction()
        const { ma, ten, ngaysinh, sodienthoai} = args.input
        const khachhang = await KhachHang.findByPk(ma)
        await khachhang.update({ ten, ngaysinh, sodienthoai})
        await khachhang.save()
        transaction.commit()
        return {
          status: STATUS_CODE.update_success,
          message: "Sửa thông tin khách hàng thành công!",
        }
      }
      catch (e) {
        transaction.rollback()
        return {
          status: STATUS_CODE.update_fail,
          message: "Bị lỗi! Sửa thông tin khách hàng không thành công!",
        }
      }
    },
    async chuyenTrangThaiKhachHang(root, args, context) {
      try {
        return await checkAndResolveAdmin(context.taikhoan, async (nhanvien_data) => {
          let transaction
          try {
            transaction = await sequelize.transaction()
            const { ma, matrangthai} = args.input
            const khachhang = await KhachHang.findByPk(ma)
            await khachhang.update({ matrangthai})
            await khachhang.save()
            transaction.commit()
            return {
              status: STATUS_CODE.update_success,
              message: "Sửa thông tin khách hàng thành công!",
            }
          }
          catch(e) {
            return {
              status: STATUS_CODE.update_fail,
              message: "Bị lỗi! Sửa thông tin khách hàng không thành công!",
            }
          }
        }, "đã xóa thông tin khách hàng có mã là "+args.ma+"!", CHUCNANG.SUAKHACHHANG)
      }
      catch (e) {
        return {
          status: STATUS_CODE.update_fail,
          message: "Bị lỗi! Sửa thông tin khách hàng không thành công!",
        }
      }
    },
    async xoaKhachHang(root, args, context) {
      let transaction
      try {
        return await checkAndResolveAdmin(context.taikhoan, async (nhanvien_data) => {
          try {
            transaction = await sequelize.transaction()
            const { ma } = args
            const khachhang = await KhachHang.findByPk(ma)
            const taikhoan = await TaiKhoan.findByPk(khachhang.tentaikhoan)
            await khachhang.destroy()
            await taikhoan.destroy()
            transaction.commit()
            return {
              status: STATUS_CODE.update_success,
              message: "Xóa thông tin khách hàng thành công!",
            }
          }
          catch (e) {
            transaction.rollback()
            return {
              status: STATUS_CODE.update_fail,
              message: "Bị lỗi! Xóa thông tin khách hàng không thành công!",
            }
          }
        }, "đã xóa thông tin khách hàng có mã là "+args.ma+"!", CHUCNANG.XOAKHACHHANG)
      }
      catch (e) {
        if (transaction) {
          transaction.rollback()
        }
        return {
          status: STATUS_CODE.update_fail,
          message: "Bị lỗi! Xóa thông tin khách hàng không thành công!",
        }
      }
    }
  },
  Query: {
    khachhang: async (root, args, context) => {
      try {
        const rs = await checkAndResolveAdmin(context.taikhoan, async (nhanvien_data) => {
          try {
            return {
              status: STATUS_CODE.query_success,
              message: "Lấy thông tin khách hàng thành công!",
              data: await KhachHang.findAll()
            }
          }
          catch (e) {
            return {
              status: STATUS_CODE.query_fail,
              message: "Lấy thông tin khách hàng không thành công!",
              data: []
            }
          }
        }, "đã lấy thông tin khách hàng!")
        return rs
      }
      catch (e) {
        return {
          status: STATUS_CODE.query_fail,
          message: "Lấy thông tin khách hàng không thành công!",
          data: []
        }
      }
    }
  },
  KhachHang: {
    trangthai(khachhang) {
      return khachhang.getTrangThaiKhachHang()
    }
  }
}