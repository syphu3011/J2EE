const { Op, literal } = require("sequelize")
const {DonVi, sequelize} = require("../../database/models")
const STATUS_CODE = require("../const")
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
            data: donvi
          }
        } 
        catch(e) {
          transaction.rollback()
          return {
            status: STATUS_CODE.create_fail,
            message: "Bị lỗi! Thêm đơn vị không thành công!",
            data: []
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
            data: donvi
          }
        } 
        catch(e) {
          transaction.rollback()
          return {
            status: STATUS_CODE.update_fail,
            message: "Bị lỗi! Sửa đơn vị không thành công!",
            data: []
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
            data: donvi
          }
        } 
        catch(e) {
          transaction.rollback()
          return {
            status: STATUS_CODE.update_fail,
            message: "Bị lỗi! Xóa đơn vị không thành công!",
            data: []
          }
        }
      }
    },
    Query: {
        
    }
}