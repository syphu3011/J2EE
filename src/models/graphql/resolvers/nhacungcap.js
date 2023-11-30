const { Op } = require("sequelize");
const { NhaCungCap, SanPham, sequelize } = require("../../database/models");
const {STATUS_CODE} = require("../const")
module.exports = {
  Mutation: {
    async taoNhaCungCap(root, args, context) {
      let transaction;
      try {
        transaction = await sequelize.transaction()
        const { ten, diachi, dienthoai, matrangthaincc, masanpham } = args.input;
        const ncc = await NhaCungCap.create({
          ten,
          diachi,
          dienthoai,
          matrangthaincc
        });
        if (masanpham) {
          const sanphams = await SanPham.findAll({
            where: {
              ma: masanpham
            }
          })
          await ncc.addSanPham(sanphams)
        }
        ncc.masanpham = masanpham;
        transaction.commit()
        return {
          status: STATUS_CODE.create_success,
          message: "Thêm nhà cung cấp thành công!"
        }
      }
      catch(err) {
        transaction.rollback()
        return {
          status: STATUS_CODE.create_fail,
          message: "Bị lỗi! Thêm nhà cung cấp không thành công"
        }
      }
    },
    async suaNhaCungCap(root, args, context) {
      let transaction;
      try {
        transaction = await sequelize.transaction()
        const {ma, ten, diachi, dienthoai, matrangthaincc, masanpham } = args.input;
        const ncc = await NhaCungCap.findByPk(ma)
        if (masanpham) {
          const sanphams = await SanPham.findAll({
            where: {
              ma: masanpham
            }
          })
          await ncc.setSanPham(sanphams)
        }
        await ncc.update({ten: ten, diachi: diachi, dienthoai: dienthoai, matrangthaincc})
        return {
          status: STATUS_CODE.update_success,
          message: "Sửa nhà cung cấp thành công!"
        }
      }
      catch(err) {
        transaction.rollback()
        return {
          status: STATUS_CODE.update_fail,
          message: "Bị lỗi! Sửa nhà cung cấp không thành công!"
        }
      }
    },
    async xoaNhaCungCap(root, args,context) {
      let transaction;
      try {
        transaction = await sequelize.transaction()
        const {ma} = args.input;
        const ncc = await NhaCungCap.findByPk(ma)
        await ncc.setSanPham([])
        await ncc.destroy()
        transaction.commit()
        return {
          status: STATUS_CODE.delete_success,
          message: "Xóa nhà cung cấp thành công!"
        }
      }
      catch(err) {
        transaction.rollback()
        return {
          status: STATUS_CODE.delete_fail,
          message: "Bị lỗi!"
        }
      }
    }
  },
  Query: {
    nhacungcap: async () => {
      try {
        const rs = {
          status: STATUS_CODE.query_success,
          message: "Lấy nhà cung cấp thành công!",
          data: await NhaCungCap.findAll()
        }
        return rs
      }
      catch (e) {
        return {
          status: STATUS_CODE.query_fail,
          message: "Nhà cung cấp không tồn tại!"
        }
      }
    },
    async nhacungcapvoithuoctinh(root, args, context) {
      try {
        const {ma = "", ten = "", diachi = "", dienthoai = "", matrangthaincc = "", tensanpham = ""} = args.input
        const rs =  {
          status: STATUS_CODE.query_success,
          message: "Lấy nhà cung cấp thành công!",
          data: await NhaCungCap.findAll({
            where: [
              {ma: {[Op.like]: "%" + ma + "%"}},
              {ten: {[Op.like]: "%" + ten + "%"}},
              {diachi: {[Op.like]: "%" + diachi + "%"}},
              {dienthoai: {[Op.like]: "%" + dienthoai + "%"}},
              {matrangthaincc: {[Op.like]: "%" + matrangthaincc + "%"}}
            ],
            include: [{
              model: SanPham,
              as: "SanPham",
              where: {
                ten: {[Op.like]: "%" + tensanpham + "%"}
              }
            }]
          })
        }
        return rs
      }
      catch (e) {
        return {
          status: STATUS_CODE.query_fail,
          message: "Nhà cung cấp không tồn tại!",
          data: []
        }
      }
    },
    async timkiemnhacungcap(root, args, context) {
      try {
        const {ma = "", ten = "", diachi = "", dienthoai = "", matrangthaincc = "", tensanpham = ""} = args.input
        const rs =  {
          status: STATUS_CODE.query_success,
          message: "Lấy nhà cung cấp thành công!",
          data: await NhaCungCap.findAll({
            where: {
              [Op.or]: {
                ma: {[Op.like]: "%" + ma + "%"},
                ten: {[Op.like]: "%" + ten + "%"},
                diachi: {[Op.like]: "%" + diachi + "%"},
                dienthoai: {[Op.like]: "%" + dienthoai + "%"},
                matrangthaincc: {[Op.like]: "%" + matrangthaincc + "%"},
                include: [{
                  model: SanPham,
                  as: "SanPham",
                  where: {
                    ten: {[Op.like]: "%" + tensanpham + "%"}
                  }
                }]
              }
            },
          })
        }
        return rs
      }
      catch (e) {
        return {
          status: STATUS_CODE.query_fail,
          message: "Nhà cung cấp không tồn tại!",
          data: []
        }
      }
    }
  },
  NhaCungCap: {
    trangthai(nhacungcap) {
      return nhacungcap.getTrangThai();
    },
    sanpham(nhacungcap) {
      return nhacungcap.getSanPham();
    },
  },
};
