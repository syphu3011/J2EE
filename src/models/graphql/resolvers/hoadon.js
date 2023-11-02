const { Op, literal } = require("sequelize")
const {HoaDon, sequelize} = require("../../database/models")
const {STATUS_CODE} = require("../const")
module.exports = {
    Mutation: {
      async taoHoaDon(root, args, context) {
        let transaction
        try {
          transaction = await sequelize.transaction()
          const {ma, ten} = args.input
          const hoadon = await HoaDon.create({ma, ten})
          transaction.commit()
          return {
            status: STATUS_CODE.create_success,
            message: "Thêm hóa đơn thành công!",
          }
        } 
        catch(e) {
          transaction.rollback()
          return {
            status: STATUS_CODE.create_fail,
            message: "Bị lỗi! Thêm hóa đơn không thành công!",
          }
        }
      },
      async suaHoaDon(root, args, context) {
        let transaction
        try {
          transaction = await sequelize.transaction()
          const {ma, ten} = args.input
          const hoadon = await HoaDon.findByPk(ma)
          await hoadon.update({ten})
          await hoadon.save()
          transaction.commit()
          return {
            status: STATUS_CODE.update_success,
            message: "Sửa hóa đơn thành công!",
          }
        } 
        catch(e) {
          transaction.rollback()
          return {
            status: STATUS_CODE.update_fail,
            message: "Bị lỗi! Sửa hóa đơn không thành công!"
          }
        }
      },
      async xoaHoaDon(root, args, context) {
        let transaction
        try {
          transaction = await sequelize.transaction()
          const {ma, ten} = args.input
          const hoadon = await HoaDon.findByPk(ma)
          await hoadon.setSanPham([])
          await hoadon.destroy()
          await hoadon.save()
          transaction.commit()
          return {
            status: STATUS_CODE.update_success,
            message: "Xóa hóa đơn thành công!"
          }
        } 
        catch(e) {
          transaction.rollback()
          return {
            status: STATUS_CODE.update_fail,
            message: "Bị lỗi! Xóa hóa đơn không thành công!"
          }
        }
      }
    },
    Query: {
      hoadon: async () => {
        try {
          const rs = {
            status: STATUS_CODE.query_success,
            message: "Lấy danh sách hóa đơn thành công!",
            data: await HoaDon.findAll()
          }
          return rs
        }
        catch (e) {
          return {
            status: STATUS_CODE.query_fail,
            message: "Lấy danh sách hóa đơn không thành công!",
            data: null
          }
        }
      },
      hoadonvoithuoctinh: async (root, args, context) => {
        try {
          const {ma, ten} = args.input
          const rs = {
            status: STATUS_CODE.query_success,
            message: "Lấy danh sách hóa đơn thành công!",
            data: await HoaDon.findAll({
              where: {
                ten: {[Op.like]: '%' + ten + '%'},
                ma: {[Op.like]: '%' + ma + '%'}
              }
            })
          }
          return rs
        } catch (e) {
          return {
            status: STATUS_CODE.query_fail,
            message: "Lấy danh sách hóa đơn không thành công!",
            data: null
          }
        }
      },
      timkiemhoadon: async (root, args, context) => {
        try {
          const {ma, ten} = args.input
          const rs = {
            status: STATUS_CODE.query_success,
            message: "Lấy danh sách hóa đơn thành công!",
            data: await HoaDon.findAll({
              where: {
                [Op.or]: {
                  ten: {[Op.like]: '%' + ten + '%'},
                  ma: {[Op.like]: '%' + ma + '%'}
                }
              }
            })
          }
        } catch (e) {
          return {
            status: STATUS_CODE.query_fail,
            message: "Lấy danh sách hóa đơn không thành công!",
            data: null
          }
        }
      }
    }
}