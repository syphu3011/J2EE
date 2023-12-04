const { Op, literal } = require("sequelize")
const { ChucNang, sequelize } = require("../../database/models")
const {checkAndResolveAdmin} = require("./checkToken")
const {STATUS_CODE, CHUCNANG} = require("../const")
module.exports = {
  Mutation: {
    async taoChucNang(root, args, context) {
      let transaction
      try {
        transaction = await sequelize.transaction()
        const { ma, ten } = args.input
        const chucnang = await ChucNang.create({ ma, ten })
        await transaction.commit()
        return {
          status: STATUS_CODE.create_success,
          message: "Thêm chức năng thành công!",
        }
      }
      catch (e) {
        await transaction.rollback()
        return {
          status: STATUS_CODE.create_fail,
          message: "Bị lỗi! Thêm chức năng không thành công!",
        }
      }
    },
    async suaChucNang(root, args, context) {
      let transaction
      try {
        transaction = await sequelize.transaction()
        const { ma, ten } = args.input
        const chucnang = await ChucNang.findByPk(ma)
        await chucnang.update({ ten })
        await chucnang.save()
        await transaction.commit()
        return {
          status: STATUS_CODE.update_success,
          message: "Sửa chức năng thành công!",
        }
      }
      catch (e) {
        await transaction.rollback()
        return {
          status: STATUS_CODE.update_fail,
          message: "Bị lỗi! Sửa chức năng không thành công!",
        }
      }
    },
    async xoaChucNang(root, args, context) {
      let transaction
      try {
        transaction = await sequelize.transaction()
        const {ma} = args
        const chucnang = await ChucNang.findByPk(ma)
        await chucnang.destroy()
        await chucnang.save()
        await transaction.commit()
        return {
          status: STATUS_CODE.update_success,
          message: "Xóa chức năng thành công!",
        }
      }
      catch (e) {
        await transaction.rollback()
        return {
          status: STATUS_CODE.update_fail,
          message: "Bị lỗi! Xóa chức năng không thành công!",
          data: []
        }
      }
    }
  },
  Query: {
    chucnang: async () => {
      async function callback(e) {
        try { 
          const rs = {
            status: STATUS_CODE.query_success,
            message: "Lấy danh sách chức năng thành công!",
            data: await ChucNang.findAll()
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
      return await checkAndResolveAdmin(context.taikhoan, callback, "", CHUCNANG.THEMQUYEN)
    },
    chucnangvoithuoctinh: async (root, args, context) => {
      try {
        const {ma, ten} = args.input
        const rs = {
          status: STATUS_CODE.query_success,
          message: "Lấy danh sách chức năng thành công!",
          data: await ChucNang.findAll({
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
          message: "Lấy danh sách chức năng không thành công!",
          data: null
        }
      }
    },
    timkiemchucnang: async (root, args, context) => {
      try {
        const {ma, ten} = args.input
        const rs = {
          status: STATUS_CODE.query_success,
          message: "Lấy danh sách chức năng thành công!",
          data: await ChucNang.findAll({
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
          message: "Lấy danh sách chức năng không thành công!",
          data: null
        }
      }
    }
    
  }
}