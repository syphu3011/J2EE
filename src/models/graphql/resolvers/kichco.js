const { Op, literal } = require("sequelize")
const { KichCo, sequelize, SanPham, MatHang } = require("../../database/models")
const { STATUS_CODE, CHUCNANG } = require("../const")
const { fetchImageB64, addImage } = require("../../utils/util")
const { checkAndResolveWithOutData, checkAndResolveAdmin } = require("./checkToken")
module.exports = {
    Mutation: {
        async taoKichCo(root, args, context) {
            try {
                return await checkAndResolveWithOutData(context.taikhoan, async (nhanvien_data) => {
                    let transaction
                    try {
                        transaction = await sequelize.transaction()
                        const { ten } = args.input
                        const kichco = await KichCo.create({ ten})
                        await transaction.commit()
                        return {
                            status: STATUS_CODE.create_success,
                            message: "Thêm kích cỡ thành công!"
                        }
                    }
                    catch (e) {
                        await transaction.rollback()
                        return {
                            status: STATUS_CODE.create_fail,
                            message: "Bị lỗi! Thêm kích cỡ không thành công!"
                        }
                    }
                }, "đã thêm kích cỡ có mã là " + args.input.ma + "!", CHUCNANG.SUASANPHAM)
            }
            catch (e) {
                return {
                    status: STATUS_CODE.create_fail,
                    message: "Bị lỗi! Thêm kích cỡ không thành công!"
                }
            }
        },
        async suaKichCo(root, args, context) {
            try {
                return await checkAndResolveWithOutData(context.taikhoan, async (nhanvien_data) => {
                    let transaction
                    try {
                        transaction = await sequelize.transaction()
                        const { ma, ten} = args.input
                        const kichco = await KichCo.findByPk(ma)
                        await kichco.update({ ten })
                        await kichco.save()
                        await transaction.commit()
                        return {
                            status: STATUS_CODE.update_success,
                            message: "Sửa kích cỡ thành công!"
                        }
                    }
                    catch (e) {
                        await transaction.rollback()
                        return {
                            status: STATUS_CODE.update_fail,
                            message: "Bị lỗi! Sửa kích cỡ không thành công!"
                        }
                    }
                }, "đã sửa kích cỡ có mã là " + args.input.ma + "!", CHUCNANG.SUASANPHAM)
            }
            catch (e) {
                return {
                    status: STATUS_CODE.update_fail,
                    message: "Bị lỗi! Sửa kích cỡ không thành công!"
                }
            }
        },
        async xoaKichCo(root, args, context) {
            try {
                return await checkAndResolveWithOutData(context.taikhoan, async (nhanvien_data) => {
                    let transaction
                    try {
                        transaction = await sequelize.transaction()
                        const kichco = await KichCo.findByPk(args.ma)
                        await kichco.destroy()
                        await transaction.commit()
                        return {
                            status: STATUS_CODE.delete_success,
                            message: "Xóa kích cỡ thành công!"
                        }
                    }
                    catch (e) {
                        await transaction.rollback()
                        return {
                            status: STATUS_CODE.delete_fail,
                            message: "Bị lỗi! Xóa kích cỡ không thành công!"
                        }
                    }
                }, "đã xóa kích cỡ có mã là " + args.ma + "!", CHUCNANG.SUASANPHAM)
            }
            catch (e) {
                return {
                    status: STATUS_CODE.delete_fail,
                    message: "Bị lỗi! Xóa kích cỡ không thành công!"
                }
            }
        }
    },
    Query: {
        kichco: async (root, args,context) => {
            try {
                const rs = await checkAndResolveAdmin(context.taikhoan, async (nhanvien_data) => {
                    try {
                        context.dont_need_encrypt = true
                        const rs = {
                            status: STATUS_CODE.query_success,
                            message: "Lấy danh sách kích cỡ thành công!",
                            data: await KichCo.findAll()
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
                    message: "Lấy danh sách kích cỡ không thành công!",
                    data: []
                }
            }
        },
        
    },
    KichCo: {
        
    }
}