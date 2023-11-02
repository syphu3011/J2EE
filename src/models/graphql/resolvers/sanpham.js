const { Op } = require("sequelize")
const {SanPham, sequelize, Loai, NhaCungCap} = require("../../database/models/")
const {STATUS_CODE, CHUCNANG} = require("../const")
const {checkAdmin, checkPrivileges} = require("./checkToken")

module.exports = {
    Mutation: {
        async taoSanPham(root, args, {taikhoan}) {
            const admin = await checkPrivileges(taikhoan, CHUCNANG.THEMSANPHAM)
            if (!admin) {
                return {
                    status: 400,
                    message: "Bạn không có quyền!",
                    data: null
                }
            }
            let transaction
            try {
                transaction = await sequelize.transaction()
                const {ten, anhminhhoa, mota, maloai, madonvi, manhacungcap} = args.input
                const loais = await Loai.findAll({
                    where: {
                        ma: maloai
                    }
                })
                const nhacungcaps = await NhaCungCap.findAll({
                    where: { 
                        ma: manhacungcap
                    }
                })
                const rs = await SanPham.create({ten, anhminhhoa, madonvi, mota})
                await rs.addLoai(loais)
                await rs.addNhaCungCap(nhacungcaps)
                rs.maloai = maloai
                rs.manhacungcap = manhacungcap
                transaction.commit()
                const response =  {
                    status: STATUS_CODE.create_success,
                    message: "Thêm sản phẩm thành công!",
                }
                return response
            }
            catch(e) {
                transaction.rollback()
                return {
                    status: STATUS_CODE.create_fail,
                    message: "Bị lỗi! Thêm sản phẩm không thành công!"
                }
            }
        },
        async suaSanPham(root, args, context) { 
            let transaction
            try {
                transaction = await sequelize.transaction()
                const {ma, ten, anhminhhoa, mota, giaban, maloai, manhacungcap} = args.input
                if (maloai) { 
                    const loais = await Loai.findAll({
                        where: {
                            ma: maloai
                        }
                    })
                    await sanpham.setLoai(loais)
                }
                if (manhacungcap) {
                    const nhacungcaps = await NhaCungCap.findAll({
                        where: { 
                            ma: manhacungcap
                        }
                    })
                    await sanpham.setNhaCungCap(nhacungcaps)
                }
                const sanpham = await SanPham.findByPk(ma)
                await sanpham.update({
                    ten, anhminhhoa, mota, giaban
                })
                await sanpham.save()
                transaction.commit()
                return {
                    status: STATUS_CODE.update_success,
                    message: "Sửa sản phẩm thành công!"
                }
            }
            catch (e) {
                transaction.rollback()
                return {
                    status: STATUS_CODE.update_fail,
                    message: "Bị lỗi! Sửa sản phẩm không thành công!"
                }
            }
        },
        async xoaSanPham(root, args, context) { 
            let transaction
            try {
                transaction = await sequelize.transaction()
                const ma = args.ma
                const sanpham = await SanPham.findByPk(ma)
                await sanpham.setLoai([])
                await sanpham.setNhaCungCap([])
                await sanpham.destroy()
                transaction.commit
                return {
                    status: STATUS_CODE.delete_success,
                    message: "Xóa sản phẩm thành công!"
                }
            }
            catch (e) {
                transaction.rollback()
                return {
                    status: STATUS_CODE.delete_fail,
                    message: "Bị lỗi! Xóa sản phẩm không thành công!"
                }
            }
        }
    },
    Query: {
        sanpham: async() => {
            try {
                const sanpham = await SanPham.findAll();
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
        },
        async sanphamvoithuoctinh(root, args, context) {
            try {
                const {ma = "", ten = ""} = args.input
                const sanpham = await SanPham.findAll({
                    where: {
                        ma: {[Op.like]: '%' + ma + '%'},
                        ten: {[Op.like]: '%' + ten + '%'}
                    }
                });
                return {
                    status: STATUS_CODE.query_success,
                    message: "Lấy sản phẩm thành công!",
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
        },
        async timkiemsanpham(root, args, context) {
            try {
                const {ma = "", ten = ""} = args.input
                const sanpham = await SanPham.findAll({
                    where: {
                        [Op.or]: {
                            ma: {[Op.like]: '%' + ma + '%'},
                            ten: {[Op.like]: '%' + ten + '%'}
                        }
                    }
                });
                return {
                    status: STATUS_CODE.query_success,
                    message: "Lấy sản phẩm thành công!",
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
    SanPham: {
        loai(sanpham) {
            return sanpham.getLoai()
        },
        donvi(sanpham) {
            return sanpham.getDonVi()
        }
    }
}