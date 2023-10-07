const { NhaCungCap, SanPham, sequelize } = require("../../database/models");
const { ChiTietCungCap } = require("../../database/models");

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
        const sanphams = await SanPham.findAll({
          where: {
            ma: masanpham
          }
        })
        await ncc.addSanPham(sanphams)
        ncc.masanpham = masanpham;
        transaction.commit()
        return {
          status: 201,
          message: "Thêm nhà cung cấp thành công!"
        }
      }
      catch(err) {
        transaction.rollback()
        return {
          status: 400,
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
        await ncc.update({ten: ten, diachi: diachi, dienthoai: dienthoai, matrangthaincc})
        return {
          status: 200,
          message: "Sửa nhà cung cấp thành công!"
        }
      }
      catch(err) {
        transaction.rollback()
        return {
          status: 409,
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
        ncc.destroy()
        transaction.commit()
        return {
          status: 202,
          message: "Xóa nhà cung cấp thành công!"
        }
      }
      catch(err) {
        transaction.rollback()
        return {
          status: 409,
          message: "Bị lỗi!"
        }
      }
    }
  },
  Query: {
    nhacungcap: async () => {
      try {
        const rs = {
          status: 200,
          message: "Lấy nhà cung cấp thành công!",
          data: await NhaCungCap.findAll()
        }
        return rs
      }
      catch (e) {
        return {
          status: 404,
          message: "Nhà cung cấp không tồn tại!"
        }
      }
    },
    async nhacungcapvoima(root, args, context) {
      try {
        const ma = args.ma
        const rs =  {
          status: 200,
          message: "Lấy nhà cung cấp thành công!",
          data: await NhaCungCap.findByPk(ma)
        }
        return rs
      }
      catch (e) {
        return {
          status: 404,
          message: "Nhà cung cấp không tồn tại!",
          data: []
        }
      }
    }
  },
  NhaCungCap: {
    trangthai(loai) {
      return loai.getTrangThai();
    },
    sanpham(loai) {
      return loai.getSanPham();
    },
  },
};
