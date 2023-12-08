const { Op, literal } = require("sequelize")
const { Quyen, ChucNang, sequelize } = require("../../database/models")
const { checkAndResolveAdmin} = require("./checkToken")
const { STATUS_CODE, CHUCNANG } = require("../const")
module.exports = {
  Mutation: {
    async taoQuyen(root, args, context) {
      async function callback(e) {
        let transaction
        try {
          transaction = await sequelize.transaction()
          const { ten, chucnang } = args.input
          const quyen = await Quyen.create({ ten })
          let list_chucnang = []
          for (const _chucnang of chucnang) {
            const chucnangget = await ChucNang.findByPk(_chucnang.ma)
            if (chucnangget) {
              list_chucnang.push(chucnangget)
            }
          }
          quyen.addChucNang(list_chucnang)
          quyen.save()
          await transaction.commit()
          return {
            status: STATUS_CODE.create_success,
            message: "Thêm quyền thành công!",
            data: quyen
          }
        }
        catch (e) {
          await transaction.rollback()
          return {
            status: STATUS_CODE.create_fail,
            message: "Bị lỗi! Thêm quyền không thành công!",
            data: []
          }
        }
      }
      return await checkAndResolveAdmin(context.taikhoan, callback, "đã thêm quyền", CHUCNANG.SUANHANVIEN)
    },
    async suaQuyen(root, args, context) {
      const { ma, ten, chucnang } = args.input
      async function callback(e) {
        let transaction
        try {
          transaction = await sequelize.transaction()
          if (ma == 2) {
            return {
              status: 400,
              message: 'Bạn không thể sửa quyền quản trị!',
              data: []
            }
          }
          if (ma == 1) {
            return {
              status: 400,
              message: 'Bạn không thể sửa quyền khách hàng!',
              data: []
            }
          }
          const quyen = await Quyen.findByPk(ma)
          let list_chucnang = []
          for (const _chucnang of chucnang) {
            const chucnangget = await ChucNang.findByPk(_chucnang.ma)
            if (chucnangget) {
              list_chucnang.push(chucnangget)
            }
          }
          await quyen.update({ ten })
          await quyen.setChucNang(list_chucnang)
          await quyen.save()
          await transaction.commit()
          return {
            status: STATUS_CODE.update_success,
            message: "Sửa quyền thành công!",
            data: quyen
          }
        }
        catch (e) {
          await transaction.rollback()
          return {
            status: STATUS_CODE.update_fail,
            message: "Bị lỗi! Sửa quyền không thành công!",
            data: []
          }
        }
      }
      return await checkAndResolveAdmin(context.taikhoan, callback, "đã sửa quyền có id là " + ma, CHUCNANG.SUANHANVIEN)
    },
    async xoaQuyen(root, args, context) {
      const { ma, ten } = args
      async function callback(e) {
        let transaction
        try {
          transaction = await sequelize.transaction()
          if (ma == 2) {
            return {
              status: 400,
              message: 'Bạn không thể xóa quyền quản trị!',
              data: []
            }
          }
          if (ma == 1) {
            return {
              status: 400,
              message: 'Bạn không thể xóa quyền khách hàng!',
              data: []
            }
          }
          const quyen = await Quyen.findByPk(ma)
          await quyen.setChucNang([])
          await quyen.destroy()
          await quyen.save()
          await transaction.commit()
          return {
            status: STATUS_CODE.update_success,
            message: "Xóa quyền thành công!",
            data: quyen
          }
        }
        catch (e) {
          await transaction.rollback()
          return {
            status: STATUS_CODE.update_fail,
            message: "Bị lỗi! Xóa quyền không thành công!",
            data: []
          }
        }
      }
      return await checkAndResolveAdmin(context.taikhoan, callback, "đã xóa quyền có id là " + ma, CHUCNANG.SUANHANVIEN)
    }
  },
  Query: {
    async quyen(root, args, context) {
      async function callback(e) {
        try {
          const sanpham = await Quyen.findAll({
            where: {
              ma: {
                [Op.not]: 1
              }
            }
          });
          return {
            status: STATUS_CODE.query_success,
            message: "Lấy danh sách quyền thành công!",
            data: sanpham
          }
        }
        catch (e) {
          return {
            status: STATUS_CODE.query_fail,
            message: "Quyền không tồn tại!",
            data: []
          }
        }
      }
      return await checkAndResolveAdmin(context.taikhoan, callback, "đã xóa quyền có id là " + ma, CHUCNANG.SUANHANVIEN)
    }
  },
  Quyen: {
    chucnang(quyen) {
      return quyen.getChucNang()
    }
  }
}