const { Op, literal } = require("sequelize")
const { Loai, sequelize, SanPham, MatHang } = require("../../database/models")
const { STATUS_CODE, CHUCNANG } = require("../const")
const { fetchImageB64, addImage } = require("../../utils/util")
const { checkAndResolveWithOutData, checkAndResolveAdmin } = require("./checkToken")
module.exports = {
    Mutation: {
        async taoLoai(root, args, context) {
            try {
                return await checkAndResolveWithOutData(context.taikhoan, async (nhanvien_data) => {
                    let transaction
                    try {
                        transaction = await sequelize.transaction()
                        const { ten, mota, anhminhhoa, b64anhminhhoa, maloaicha } = args.input
                        //thêm ảnh
                        const rs_addimage = addImage(anhminhhoa, b64anhminhhoa)
                        const count = rs_addimage.repeat
                        // thêm loại
                        const loai = await Loai.create({ ten, anhminhhoa: rs_addimage.name_image + (count == 0 ? "" : "_" + count) + "." + rs_addimage.ext, mota, maloaicha })
                        await transaction.commit()
                        return {
                            status: STATUS_CODE.create_success,
                            message: "Thêm loại thành công!"
                        }
                    }
                    catch (e) {
                        await transaction.rollback()
                        return {
                            status: STATUS_CODE.create_fail,
                            message: "Bị lỗi! Thêm loại không thành công!"
                        }
                    }
                }, "đã thêm loại có mã là " + args.input.ma + "!", CHUCNANG.THEMLOAI)
            }
            catch (e) {
                return {
                    status: STATUS_CODE.create_fail,
                    message: "Bị lỗi! Thêm loại không thành công!"
                }
            }
        },
        async suaLoai(root, args, context) {
            try {
                return await checkAndResolveWithOutData(context.taikhoan, async (nhanvien_data) => {
                    let transaction
                    try {
                        transaction = await sequelize.transaction()
                        const { ma, ten, mota, anhminhhoa, b64anhminhhoa, maloaicha } = args.input
                        //thêm ảnh
                        const rs_addimage = addImage(anhminhhoa, b64anhminhhoa)
                        const count = rs_addimage.repeat
                        // sửa loại
                        const loai = await Loai.findByPk(ma)
                        await loai.update({ ten, mota, anhminhhoa: rs_addimage.name_image + (count == 0 ? "" : "_" + count) + "." + rs_addimage.ext, maloaicha })
                        await loai.save()
                        await transaction.commit()
                        return {
                            status: STATUS_CODE.update_success,
                            message: "Sửa loại thành công!"
                        }
                    }
                    catch (e) {
                        await transaction.rollback()
                        return {
                            status: STATUS_CODE.update_fail,
                            message: "Bị lỗi! Sửa loại không thành công!"
                        }
                    }
                }, "đã sửa loại có mã là " + args.input.ma + "!", CHUCNANG.SUALOAI)
            }
            catch (e) {
                return {
                    status: STATUS_CODE.update_fail,
                    message: "Bị lỗi! Sửa loại không thành công!"
                }
            }
        },
        async xoaLoai(root, args, context) {
            try {
                return await checkAndResolveWithOutData(context.taikhoan, async (nhanvien_data) => {
                    let transaction
                    try {
                        transaction = await sequelize.transaction()
                        const loai = await Loai.findByPk(args.ma)
                        await loai.destroy()
                        await transaction.commit()
                        return {
                            status: STATUS_CODE.delete_success,
                            message: "Xóa loại thành công!"
                        }
                    }
                    catch (e) {
                        await transaction.rollback()
                        return {
                            status: STATUS_CODE.delete_fail,
                            message: "Bị lỗi! Xóa loại không thành công!"
                        }
                    }
                }, "đã xóa loại có mã là " + args.ma + "!", CHUCNANG.XOASANPHAM)
            }
            catch (e) {
                return {
                    status: STATUS_CODE.delete_fail,
                    message: "Bị lỗi! Xóa loại không thành công!"
                }
            }
        }
    },
    Query: {
        loai: async (root, args,context) => {
            try {
                const rs = await checkAndResolveAdmin(context.taikhoan, async (nhanvien_data) => {
                    try {
                        context.dont_need_encrypt = true
                        const rs = {
                            status: STATUS_CODE.query_success,
                            message: "Lấy danh sách loại thành công!",
                            data: await Loai.findAll()
                        }
                        return rs;
                    }
                    catch (e) {
                        return {
                            status: STATUS_CODE.query_fail,
                            message: "Loại không tồn tại!",
                            data: []
                        }
                    }
                })
                return rs
            }
            catch (e) {
                return {
                    status: STATUS_CODE.query_fail,
                    message: "Lấy danh sách loại không thành công!",
                    data: []
                }
            }
        },
        async loaiLon(root, args, context) {
            try {
                context.dont_need_encrypt = true
                const rs = {
                    status: STATUS_CODE.query_success,
                    message: "Lấy danh sách loại thành công!",
                    data: await Loai.findAll({
                        where: {
                            maloaicha: null
                        }
                    })
                }
                return rs;
            }
            catch (e) {
                return {
                    status: STATUS_CODE.query_fail,
                    message: "Loại không tồn tại!",
                    data: []
                }
            }
        },
        async loaivoithuoctinh(root, args, context) {
            async function callback(nhanvien_data) {
                try {
                    const { ma = "", ten = "", mota } = args.input
                    const rs = {
                        status: STATUS_CODE.query_success,
                        message: "Lấy danh sách loại thành công!",
                        data: await Loai.findAll({
                            where: {
                                [Op.and]: [
                                    // literal('CAST("ma" AS TEXT) LIKE ' + '%' + ma + '%'),
                                    { ma: { [Op.like]: '%' + ma + '%' } },
                                    { ten: { [Op.like]: '%' + ten + '%' } }
                                ]
                            }
                        })
                    }
                    return rs
                }
                catch (e) {
                    return {
                        status: STATUS_CODE.query_fail,
                        message: "Lấy danh sách loại không thành công!",
                        data: []
                    }
                }
            }
            try {
                const rs = await checkAndResolveAdmin(context.taikhoan, callback)
                return rs
            }
            catch (e) {
                return {
                    status: STATUS_CODE.query_fail,
                    message: "Lấy danh sách loại không thành công!",
                    data: []
                }
            }
        },
        async timkiemloai(root, args, context) {
            async function callback(nhanvien_data) {
                try {
                    const { ma = "", ten = "", mota } = args.input
                    const rs = {
                        status: STATUS_CODE.query_success,
                        message: "Lấy danh sách loại thành công!",
                        data: await Loai.findAll({
                            where: {
                                [Op.or]: [
                                    { ma: { [Op.like]: '%' + ma + '%' } },
                                    { ten: { [Op.like]: '%' + ten + '%' } }
                                ]
                            }
                        })
                    }
                    return rs
                }
                catch (e) {
                    return {
                        status: STATUS_CODE.query_fail,
                        message: "Lấy danh sách loại không thành công!",
                        data: []
                    }
                }
            }
            try {
                const rs = await checkAndResolveAdmin(context.taikhoan, callback)
                return rs
            }
            catch (e) {
                return {
                    status: STATUS_CODE.query_fail,
                    message: "Lấy danh sách loại không thành công!",
                    data: []
                }
            }
        }
    },
    Loai: {
        async sanpham(loai) {
            let loaicon = await loai.getLoaicon()
            let danhsachsanpham = []
            let sanphamloai = await loai.getSanPham()
            danhsachsanpham.push(...sanphamloai)
            for (const lc of loaicon) {
                let sanphamloaicon = await lc.getSanPham()
                danhsachsanpham.push(...sanphamloaicon)
            }
            for (let i = 0; i < danhsachsanpham.length; i++) {
                const sanpham = danhsachsanpham[i]
                const mh = await sanpham.getMatHang()
                if (mh.length == 0) {
                    danhsachsanpham.splice(i, 1)
                    i -= 1
                }
            }
            return danhsachsanpham
        },
        async loaicha(loai) { return await loai.getLoaicha() },
        async loaicon(loai) { return await loai.getLoaicon() },
        async tenanhminhhoa(loai) { return loai.anhminhhoa },
        anhminhhoa(loai) {
            const name = loai.anhminhhoa
            let rs
            try {
                rs = fetchImageB64(name)
            }
            catch (e) {
                rs = name
            }
            return rs
        }

    }
}