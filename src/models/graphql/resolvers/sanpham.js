const { Op } = require("sequelize")
const { SanPham, sequelize, Loai, NhaCungCap, MatHang, HangTrongKho, PhieuNhap } = require("../../database/models/")
const { STATUS_CODE, CHUCNANG } = require("../const")
const { checkAdmin, checkPrivileges, checkAndResolveWithOutData, checkAndResolveAdmin } = require("./checkToken")
const { fetchImageB64, addImage } = require("../../utils/util")
const path = require("path")
const fs = require("fs")

module.exports = {
    Mutation: {
        async taoSanPham(root, args, context) {
            try {
                return await checkAndResolveWithOutData(context.taikhoan, async (nhanvien_data) => {
                    let transaction
                    try {
                        transaction = await sequelize.transaction()
                        const { ten, anhminhhoa, mota, maloai, madonvi, manhacungcap = 0, b64anhminhhoa } = args.input
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
                        const rs_addimage = addImage(anhminhhoa, b64anhminhhoa)
                        const count = rs_addimage.repeat
                        // tạo sản phẩm
                        const rs = await SanPham.create({ ten, anhminhhoa: rs_addimage.name_image + (count == 0 ? "" : "_" + count)+"."+rs_addimage.ext, madonvi, mota, matrangthai: 1 })
                        await rs.addLoai(loais)
                        await rs.addNhaCungCap(nhacungcaps)
                        await transaction.commit()
                        const response = {
                            status: STATUS_CODE.create_success,
                            message: "Thêm sản phẩm thành công!",
                        }
                        return response
                    }
                    catch (e) {
                        await transaction.rollback()
                        return {
                            status: STATUS_CODE.create_fail,
                            message: "Bị lỗi! Thêm sản phẩm không thành công!"
                        }
                    }
                }, "đã thêm sản phẩm có mã là " + args.input.ma + "!", CHUCNANG.THEMSANPHAM)
            }
            catch (e) {
                return {
                    status: STATUS_CODE.create_fail,
                    message: "Bị lỗi! Thêm sản phẩm không thành công!"
                }
            }
        },
        async suaSanPham(root, args, context) {
            try {
                return await checkAndResolveWithOutData(context.taikhoan, async (nhanvien_data) => {
                    let transaction
                    try {
                        transaction = await sequelize.transaction()
                        const { ma, ten, anhminhhoa, mota, maloai, madonvi, manhacungcap = 0, b64anhminhhoa } = args.input
                        const rs_addimage = addImage(anhminhhoa, b64anhminhhoa)
                        const count = rs_addimage.repeat
                        // sửa sản phẩm
                        const sanpham = await SanPham.findByPk(ma)
                        await sanpham.update({
                            ten, anhminhhoa: rs_addimage.name_image + (count == 0 ? "" : "_" + count)+"."+rs_addimage.ext, mota, madonvi
                        })
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
                            if (nhacungcaps.length > 0) {
                                await sanpham.setNhaCungCap(nhacungcaps)
                            }
                            else {
                                await sanpham.setNhaCungCap([])
                            }
                        }
                        await sanpham.save()
                        await transaction.commit()
                        return {
                            status: STATUS_CODE.update_success,
                            message: "Sửa sản phẩm thành công!"
                        }
                    }
                    catch (e) {
                        await transaction.rollback()
                        return {
                            status: STATUS_CODE.update_fail,
                            message: "Bị lỗi! Sửa sản phẩm không thành công!"
                        }
                    }
                }, "đã sửa sản phẩm có mã là " + args.input.ma + "!", CHUCNANG.SUASANPHAM)
            }
            catch (e) {
                return {
                    status: STATUS_CODE.update_fail,
                    message: "Bị lỗi! Sửa sản phẩm không thành công!"
                }
            }
        },
        async xoaSanPham(root, args, context) {
            try {
                return await checkAndResolveWithOutData(context.taikhoan, async (nhanvien_data) => {
                    let transaction
                    try {
                        transaction = await sequelize.transaction()
                        const ma = args.ma
                        const sanpham = await SanPham.findByPk(ma)
                        try {
                            await sanpham.setLoai([])
                            await sanpham.setNhaCungCap([])
                            await sanpham.destroy()
                        }
                        catch (e) {
                            await transaction.rollback()
                            transaction = await sequelize.transaction()
                            await sanpham.update({matrangthai: 2})
                        }
                        await transaction.commit()
                        return {
                            status: STATUS_CODE.delete_success,
                            message: "Xóa sản phẩm thành công!"
                        }
                    }
                    catch (e) {
                        await transaction.rollback()
                        return {
                            status: STATUS_CODE.delete_fail,
                            message: "Bị lỗi! Xóa sản phẩm không thành công!"
                        }
                    }
                }, "đã xóa sản phẩm có mã là " + args.ma + "!", CHUCNANG.XOASANPHAM)
            }
            catch (e) {
                return {
                    status: STATUS_CODE.delete_fail,
                    message: "Bị lỗi! Xóa sản phẩm không thành công!"
                }
            }
        }
    },
    Query: {
        sanpham: async (root, args, context) => {
            try {
                const rs = await checkAndResolveAdmin(context.taikhoan, async (nhanvien_data) => {
                    context.dont_need_encrypt = true
                    try {
                        const sanpham = await SanPham.findAll({
                            where: {
                                matrangthai: 1
                            }
                        });
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
                })
                return rs
            }
            catch (e) {
                return {
                    status: STATUS_CODE.query_fail,
                    message: "Lấy danh sách sản phẩm không thành công!",
                    data: []
                }
            }
        },
        async sanphamvoithuoctinh(root, args, context) {
            try {
                const rs = await checkAndResolveAdmin(context.taikhoan, async (nhanvien_data) => {
                    try {
                        const { ma = "", ten = "" } = args.input
                        const sanpham = await SanPham.findAll({
                            where: [
                                { ma: { [Op.like]: '%' + ma + '%' } },
                                { ten: { [Op.like]: '%' + ten + '%' } }
                            ],
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
                })
                return rs
            }
            catch (e) {
                return {
                    status: STATUS_CODE.query_fail,
                    message: "Lấy danh sách sản phẩm không thành công!",
                    data: []
                }
            }
        },
        async timkiemsanpham(root, args, context) {
            try {
                const rs = await checkAndResolveAdmin(context.taikhoan, async (nhanvien_data) => {
                    try {
                        let { ma = null, ten = "", gia_tu = -1, gia_den = -1 } = args.input
                        gia_tu = gia_tu == -1 ? 0 : gia_tu
                        gia_den = gia_den == -1 ? 9999999999 : gia_den
                        let sanpham = await SanPham.findAll({
                            where: {
                                [Op.or]: [
                                    { ma: { [Op.between]: [ma == -1 ? ma : 0, ma ? ma == -1 : 9999999999] } },
                                    { ten: { [Op.like]: '%' + ten + '%' } },
                                ]
                            },

                            include: [{
                                model: MatHang,
                                as: "MatHang",
                                where: {
                                    giaban: { [Op.between]: [gia_tu, gia_den] }
                                }
                            }]
                        });
                        sanpham = sanpham.filter(sp => sp.getMatHang().length !== 0)
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
                })
                return rs
            }
            catch (e) {
                return {
                    status: STATUS_CODE.query_fail,
                    message: "Lấy danh sách sản phẩm không thành công!",
                    data: []
                }
            }
        }
    },
    SanPham: {
        async gia(sanpham) {
            // const mathang = await sanpham.getMatHang()
            // if (mathang.length == 0) return 0
            // const giabanlist = mathang.map(mh => mh.giaban)
            // return Math.min(...giabanlist)
            const hangtrongkho_min = await sequelize.query(`
            select min(giaban) giaban from HangTrongKho, PhieuNhap where masanpham = ${sanpham.ma} AND matrangthai = 1 AND maphieunhap = PhieuNhap.ma GROUP BY PhieuNhap.ma, masanpham ORDER BY PhieuNhap.ngaynhap  ASC LIMIT 1
            `)
            return hangtrongkho_min[0][0] ? hangtrongkho_min[0][0].giaban : 0
        },
        async mathang(sanpham) {
            const mathang_list = await sanpham.getHangTrongKho()
            
            return mathang_list.filter(mathang => mathang.matrangthai == 1 && mathang.soluong > 0)
        },
        async loai(sanpham) {
            try {
                const loai = await sanpham.getLoai()
                return loai
            }
            catch (e) {
                return e
            }
        },
        async donvi(sanpham) {
            try {
                const donvi = await sanpham.getDonVi()
                return donvi
            }
            catch (e) {
                return e
            }
        },
        async tenanhminhhoa(sanpham) {
            const tenanhminhhoa = sanpham.anhminhhoa
            return tenanhminhhoa
        },
        async anhminhhoa(sanpham) {
            const name = sanpham.anhminhhoa
            const b64 = fetchImageB64(name)
            return b64
        }
    }
}