const { Op } = require("sequelize");
const { NhaCungCap, SanPham, sequelize } = require("../../database/models");
const {STATUS_CODE, CHUCNANG} = require("../const");
const { checkAndResolveAdmin } = require("./checkToken");
module.exports = {
  Mutation: {
    async taoNhaCungCap(root, args, context) {
      async function callback(e) {
        let transaction;
        try {
          transaction = await sequelize.transaction()
          const { ten, diachi, dienthoai, matrangthaincc } = args.input;
          const ncc = await NhaCungCap.create({
            ten,
            diachi,
            dienthoai,
            matrangthaincc
          });
          await transaction.commit()
          return {
            status: STATUS_CODE.create_success,
            message: "Thêm nhà cung cấp thành công!"
          }
        }
        catch(err) {
          await transaction.rollback()
          return {
            status: STATUS_CODE.create_fail,
            message: "Bị lỗi! Thêm nhà cung cấp không thành công"
          }
        }
      }
      return await checkAndResolveAdmin(context.taikhoan, callback, "đã thêm nhà cung cấp!", CHUCNANG.THEMNHACUNGCAP)
    },
    async suaNhaCungCap(root, args, context) {
      const {ma, ten, diachi, dienthoai, matrangthaincc} = args.input;
      async function callback(e) {
        let transaction;
        try {
          transaction = await sequelize.transaction()
          const ncc = await NhaCungCap.findByPk(ma)
          await ncc.update({ten: ten, diachi: diachi, dienthoai: dienthoai, matrangthaincc})
          return {
            status: STATUS_CODE.update_success,
            message: "Sửa nhà cung cấp thành công!"
          }
        }
        catch(err) {
          await transaction.rollback()
          return {
            status: STATUS_CODE.update_fail,
            message: "Bị lỗi! Sửa nhà cung cấp không thành công!"
          }
        }
      }
      return await checkAndResolveAdmin(context.taikhoan, callback, "đã sửa nhà cung cấp có mã: +"+ma+"!", CHUCNANG.SUANHACUNGCAP)
    },
    async xoaNhaCungCap(root, args,context) {
      const {ma} = args.input;
      async function callback(e) {
        let transaction;
        try {
          transaction = await sequelize.transaction()
          const ncc = await NhaCungCap.findByPk(ma)
          try {
            await ncc.setSanPham([])
            await ncc.destroy()
          }
          catch (e) {
            await transaction.rollback()
            transaction = await sequelize.transaction()
            await ncc.update({matrangthaincc: 2})
          }
          await transaction.commit()
          return {
            status: STATUS_CODE.delete_success,
            message: "Xóa nhà cung cấp thành công!"
          }
        }
        catch(err) {
          await transaction.rollback()
          return {
            status: STATUS_CODE.delete_fail,
            message: "Bị lỗi!"
          }
        }
      }
      return await checkAndResolveAdmin(context.taikhoan, callback, "đã xóa nhà cung cấp có mã: +"+ma+"!", CHUCNANG.XOANHACUNGCAP)
    }
  },
  Query: {
    nhacungcap: async (root, args, context) => {
      async function callback(e) {
        try {
          const rs = {
            status: STATUS_CODE.query_success,
            message: "Lấy nhà cung cấp thành công!",
            data: await NhaCungCap.findAll({
              where: {
                matrangthaincc: 1
              }
            })
          }
          return rs
        }
        catch (e) {
          return {
            status: STATUS_CODE.query_fail,
            message: "Nhà cung cấp không tồn tại!"
          }
        }
      }
      return await checkAndResolveAdmin(context.taikhoan, callback,  CHUCNANG.THEMNHACUNGCAP)
    },
    // async nhacungcapvoithuoctinh(root, args, context) {
    //   try {
    //     const {ma = "", ten = "", diachi = "", dienthoai = "", matrangthaincc = "", tensanpham = ""} = args.input
    //     const rs =  {
    //       status: STATUS_CODE.query_success,
    //       message: "Lấy nhà cung cấp thành công!",
    //       data: await NhaCungCap.findAll({
    //         where: [
    //           {ma: {[Op.like]: "%" + ma + "%"}},
    //           {ten: {[Op.like]: "%" + ten + "%"}},
    //           {diachi: {[Op.like]: "%" + diachi + "%"}},
    //           {dienthoai: {[Op.like]: "%" + dienthoai + "%"}},
    //           {matrangthaincc: {[Op.like]: "%" + matrangthaincc + "%"}}
    //         ],
    //         include: [{
    //           model: SanPham,
    //           as: "SanPham",
    //           where: {
    //             ten: {[Op.like]: "%" + tensanpham + "%"}
    //           }
    //         }]
    //       })
    //     }
    //     return rs
    //   }
    //   catch (e) {
    //     return {
    //       status: STATUS_CODE.query_fail,
    //       message: "Nhà cung cấp không tồn tại!",
    //       data: []
    //     }
    //   }
    // },
    // async timkiemnhacungcap(root, args, context) {
    //   try {
    //     const {ma = "", ten = "", diachi = "", dienthoai = "", matrangthaincc = "", tensanpham = ""} = args.input
    //     const rs =  {
    //       status: STATUS_CODE.query_success,
    //       message: "Lấy nhà cung cấp thành công!",
    //       data: await NhaCungCap.findAll({
    //         where: {
    //           [Op.or]: {
    //             ma: {[Op.like]: "%" + ma + "%"},
    //             ten: {[Op.like]: "%" + ten + "%"},
    //             diachi: {[Op.like]: "%" + diachi + "%"},
    //             dienthoai: {[Op.like]: "%" + dienthoai + "%"},
    //             matrangthaincc: {[Op.like]: "%" + matrangthaincc + "%"},
    //             include: [{
    //               model: SanPham,
    //               as: "SanPham",
    //               where: {
    //                 ten: {[Op.like]: "%" + tensanpham + "%"}
    //               }
    //             }]
    //           }
    //         },
    //       })
    //     }
    //     return rs
    //   }
    //   catch (e) {
    //     return {
    //       status: STATUS_CODE.query_fail,
    //       message: "Nhà cung cấp không tồn tại!",
    //       data: []
    //     }
    //   }
    // }
  },
  NhaCungCap: {
    trangthai(nhacungcap) {
      return nhacungcap.getTrangThai();
    },
    async sanpham(nhacungcap) {
      let sanpham =  await nhacungcap.getSanPham();
      sanpham = sanpham.filter(sp => sp.matrangthai == 1)
      return sanpham
    },
  },
};
