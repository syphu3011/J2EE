const { Op, literal } = require("sequelize")
const {Loai, sequelize} = require("../../database/models")
const {STATUS_CODE} = require("../const")
module.exports = {
    Mutation: {
        async taoLoai(root, args, context) {
            let transaction
            try {
                transaction = await sequelize.transaction()
                const {ten, mota, anhminhhoa, maloaicha} = args.input
                const loai = await Loai.create({ten, anhminhhoa, mota, maloaicha})
                transaction.commit()
                return {
                    status: STATUS_CODE.create_success,
                    message: "Thêm loại thành công!"
                }
            }
            catch (e) {
                transaction.rollback()
                return {
                    status: STATUS_CODE.create_fail,
                    message: "Bị lỗi! Thêm loại không thành công!"
                }
            }
        },
        async suaLoai(root, args, context) {
            let transaction
            try {
                transaction = await sequelize.transaction()
                const {ma, ten, mota, anhminhhoa, maloaicha} = args.input
                const loai = await Loai.findByPk(ma)
                await loai.update({ten, mota, anhminhhoa, maloaicha})
                await loai.save()
                transaction.commit()
                return {
                    status: STATUS_CODE.update_success,
                    message: "Sửa loại thành công!"
                }
            }
            catch (e) {
                transaction.rollback()
                return {
                    status: STATUS_CODE.update_fail,
                    message: "Bị lỗi! Sửa loại không thành công!"
                }
            }
        },
        async xoaLoai(root, args, context) {
            let transaction
            try {
                transaction = await sequelize.transaction() 
                const loai = await Loai.findByPk(args.ma)
                await loai.destroy()
                transaction.commit()
                return {
                    status: STATUS_CODE.delete_success,
                    message: "Xóa loại thành công!"
                }
            }
            catch(e) {
                transaction.rollback()
                return {
                    status: STATUS_CODE.delete_fail,
                    message: "Bị lỗi! Xóa loại không thành công!"
                }
            }
        }
    },
    Query: {
        loai: async() => {
            try {
                const rs = {
                    status: STATUS_CODE.query_success,
                    message: "Lấy danh sách loại thành công!",
                    data: await Loai.findAll()
                }
                return rs;
            }
            catch(e) {
                return {
                    status: STATUS_CODE.query_fail,
                    message: "Loại không tồn tại!" 
                }
            }
        },
        async loaivoithuoctinh(root, args, context) {
            try {
                const {ma = "", ten = "", mota} = args.input
                const rs = {
                    status: STATUS_CODE.query_success,
                    message: "Lấy danh sách loại thành công!",
                    data: await Loai.findAll({
                        where: {
                            [Op.and]: [
                                // literal('CAST("ma" AS TEXT) LIKE ' + '%' + ma + '%'),
                                {ma: {[Op.like]: '%' + ma + '%'}},
                                {ten: {[Op.like]: '%' + ten + '%'}}
                            ]
                        }
                    })
                }
                return rs
            }
            catch(e) {
                return {
                    status: STATUS_CODE.query_fail,
                    message: "Lấy danh sách loại không thành công!",
                    data: []
                }
            }
        },
        async timkiemloai(root, args, context) {
            try {
                const {ma="", ten="", mota} = args.input
                const rs = {
                    status: STATUS_CODE.query_success,
                    message: "Lấy danh sách loại thành công!",
                    data: await Loai.findAll({
                        where: {
                            [Op.or]: [
                                { ma: {[Op.like]: '%' + ma + '%'}},
                                { ten: {[Op.like]: '%' + ten + '%'}}
                            ]
                        }
                    })
                }
                return rs
            }
            catch(e) {
                return {
                    status: STATUS_CODE.query_fail,
                    message: "Lấy danh sách loại không thành công!",
                    data: []
                }
            }
        }
    },
    Loai: {
        sanpham(loai) {return loai.getSanPham()},
        loaicha(loai) {return loai.getLoaicha()},
        loaicon(loai) {return loai.getLoaicon()}
    }
}