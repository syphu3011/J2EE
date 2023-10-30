const { Op, literal } = require("sequelize")
const {Quyen, ChucNang, sequelize} = require("../../database/models")
const {STATUS_CODE} = require("../const")
module.exports = {
    Mutation: {
      async taoQuyen(root, args, context) {
        let transaction
        try {
          transaction = await sequelize.transaction()
          const {ten, chucnang} = args.input
          const quyen = await Quyen.create({ten})
          let list_chucnang = []
          for (const _chucnang of chucnang) {
            const chucnangget = await ChucNang.findByPk(_chucnang.ma)
            list_chucnang.push(chucnangget)
          }
          quyen.addChucNang(list_chucnang)
          quyen.save()
          transaction.commit()
          return {
            status: STATUS_CODE.create_success,
            message: "Thêm quyền thành công!",
            data: quyen
          }
        } 
        catch(e) {
          transaction.rollback()
          return {
            status: STATUS_CODE.create_fail,
            message: "Bị lỗi! Thêm quyền không thành công!",
            data: []
          }
        }
      },
      async suaQuyen(root, args, context) {
        let transaction
        try {
          transaction = await sequelize.transaction()
          const {ma, ten} = args.input
          const quyen = await Quyen.findByPk(ma)
          await quyen.update({ten})
          await quyen.save()
          transaction.commit()
          return {
            status: STATUS_CODE.update_success,
            message: "Sửa quyền thành công!",
            data: quyen
          }
        } 
        catch(e) {
          transaction.rollback()
          return {
            status: STATUS_CODE.update_fail,
            message: "Bị lỗi! Sửa quyền không thành công!",
            data: []
          }
        }
      },
      async xoaQuyen(root, args, context) {
        let transaction
        try {
          transaction = await sequelize.transaction()
          const {ma, ten} = args.input
          const quyen = await Quyen.findByPk(ma)
          await quyen.setSanPham([])
          await quyen.destroy()
          await quyen.save()
          transaction.commit()
          return {
            status: STATUS_CODE.update_success,
            message: "Xóa quyền thành công!",
            data: quyen
          }
        } 
        catch(e) {
          transaction.rollback()
          return {
            status: STATUS_CODE.update_fail,
            message: "Bị lỗi! Xóa quyền không thành công!",
            data: []
          }
        }
      }
    },
    Query: {
      async quyen() {
        try {
          const sanpham = await Quyen.findAll();
          return {
              status: STATUS_CODE.query_success,
              message: "Lấy danh sách sản phẩm thành công!",
              data: sanpham
          }
        }
        catch (e) {
            return {
                status: STATUS_CODE.query_fail,
                message: "Sản phẩm không tồn tại!",
                data: []
            }
        }
      }
    },
    Quyen: {
      chucnang(quyen) {
        return quyen.getChucNang()
      }
    }
}