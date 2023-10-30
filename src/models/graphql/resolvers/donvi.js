const { Op, literal } = require("sequelize")
const {DonVi, sequelize} = require("../../database/models")
const {STATUS_CODE} = require("../const")
module.exports = {
    Mutation: {
      async taoDonVi(root, args, context) {
        let transaction
        try {
          transaction = await sequelize.transaction()
          const {ma, ten} = args.input
          const donvi = await DonVi.create({ma, ten})
          transaction.commit()
          return {
            status: STATUS_CODE.create_success,
            message: "Thêm đơn vị thành công!",
          }
        } 
        catch(e) {
          transaction.rollback()
          return {
            status: STATUS_CODE.create_fail,
            message: "Bị lỗi! Thêm đơn vị không thành công!",
          }
        }
      },
      async suaDonVi(root, args, context) {
        let transaction
        try {
          transaction = await sequelize.transaction()
          const {ma, ten} = args.input
          const donvi = await DonVi.findByPk(ma)
          await donvi.update({ten})
          await donvi.save()
          transaction.commit()
          return {
            status: STATUS_CODE.update_success,
            message: "Sửa đơn vị thành công!",
          }
        } 
        catch(e) {
          transaction.rollback()
          return {
            status: STATUS_CODE.update_fail,
            message: "Bị lỗi! Sửa đơn vị không thành công!",
          }
        }
      },
      async xoaDonVi(root, args, context) {
        let transaction
        try {
          transaction = await sequelize.transaction()
          const {ma, ten} = args.input
          const donvi = await DonVi.findByPk(ma)
          await donvi.setSanPham([])
          await donvi.destroy()
          await donvi.save()
          transaction.commit()
          return {
            status: STATUS_CODE.update_success,
            message: "Xóa đơn vị thành công!",
          }
        } 
        catch(e) {
          transaction.rollback()
          return {
            status: STATUS_CODE.update_fail,
            message: "Bị lỗi! Xóa đơn vị không thành công!",
          }
        }
      }
    },
    Query: {
      donvi: async () => {
        try {
          const rs = {
            status: STATUS_CODE.query_success,
            message: "Lấy danh sách đơn vị thành công!",
            data: await DonVi.findAll()
          }
          return rs
        }
        catch (e) {
          return {
            status: STATUS_CODE.query_fail,
            message: "Lấy danh sách đơn vị không thành công!",
            data: null
          }
        }
      },
      donvivoithuoctinh: async (root, args, context) => {
        try {
          const {ma, ten} = args.input
          const rs = {
            status: STATUS_CODE.query_success,
            message: "Lấy danh sách đơn vị thành công!",
            data: await DonVi.findAll({
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
            message: "Lấy danh sách đơn vị không thành công!",
            data: null
          }
        }
      },
      timkiemdonvi: async (root, args, context) => {
        try {
          const {ma, ten} = args.input
          const rs = {
            status: STATUS_CODE.query_success,
            message: "Lấy danh sách đơn vị thành công!",
            data: await DonVi.findAll({
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
            message: "Lấy danh sách đơn vị không thành công!",
            data: null
          }
        }
      }
    }
}