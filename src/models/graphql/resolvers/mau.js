const { Op, literal } = require("sequelize")
const { Mau, sequelize, SanPham, MatHang } = require("../../database/models")
const { STATUS_CODE, CHUCNANG } = require("../const")
const { fetchImageB64, addImage } = require("../../utils/util")
const { checkAndResolveWithOutData, checkAndResolveAdmin } = require("./checkToken")
module.exports = {
    Mutation: {
        async taoMau(root, args, context) {
            try {
                return await checkAndResolveWithOutData(context.taikhoan, async (nhanvien_data) => {
                    let transaction
                    try {
                        transaction = await sequelize.transaction()
                        const { ten } = args.input
                        const mau = await Mau.create({ ten})
                        await transaction.commit()
                        return {
                            status: STATUS_CODE.create_success,
                            message: "Thêm màu thành công!"
                        }
                    }
                    catch (e) {
                        await transaction.rollback()
                        return {
                            status: STATUS_CODE.create_fail,
                            message: "Bị lỗi! Thêm màu không thành công!"
                        }
                    }
                }, "đã thêm màu có mã là " + args.input.ma + "!", CHUCNANG.THEMLOAI)
            }
            catch (e) {
                return {
                    status: STATUS_CODE.create_fail,
                    message: "Bị lỗi! Thêm màu không thành công!"
                }
            }
        },
        async suaMau(root, args, context) {
            try {
                return await checkAndResolveWithOutData(context.taikhoan, async (nhanvien_data) => {
                    let transaction
                    try {
                        transaction = await sequelize.transaction()
                        const { ma, ten} = args.input
                        const mau = await Mau.findByPk(ma)
                        await mau.update({ ten })
                        await mau.save()
                        await transaction.commit()
                        return {
                            status: STATUS_CODE.update_success,
                            message: "Sửa màu thành công!"
                        }
                    }
                    catch (e) {
                        await transaction.rollback()
                        return {
                            status: STATUS_CODE.update_fail,
                            message: "Bị lỗi! Sửa màu không thành công!"
                        }
                    }
                }, "đã sửa màu có mã là " + args.input.ma + "!", CHUCNANG.SUALOAI)
            }
            catch (e) {
                return {
                    status: STATUS_CODE.update_fail,
                    message: "Bị lỗi! Sửa màu không thành công!"
                }
            }
        },
        async xoaMau(root, args, context) {
            try {
                return await checkAndResolveWithOutData(context.taikhoan, async (nhanvien_data) => {
                    let transaction
                    try {
                        transaction = await sequelize.transaction()
                        const mau = await Mau.findByPk(args.ma)
                        await mau.destroy()
                        await transaction.commit()
                        return {
                            status: STATUS_CODE.delete_success,
                            message: "Xóa màu thành công!"
                        }
                    }
                    catch (e) {
                        await transaction.rollback()
                        return {
                            status: STATUS_CODE.delete_fail,
                            message: "Bị lỗi! Xóa màu không thành công!"
                        }
                    }
                }, "đã xóa màu có mã là " + args.ma + "!", CHUCNANG.XOASANPHAM)
            }
            catch (e) {
                return {
                    status: STATUS_CODE.delete_fail,
                    message: "Bị lỗi! Xóa màu không thành công!"
                }
            }
        }
    },
    Query: {
        mau: async (root, args,context) => {
            try {
                const rs = await checkAndResolveAdmin(context.taikhoan, async (nhanvien_data) => {
                    try {
                        context.dont_need_encrypt = true
                        const rs = {
                            status: STATUS_CODE.query_success,
                            message: "Lấy danh sách màu thành công!",
                            data: await Mau.findAll()
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
                    message: "Lấy danh sách màu không thành công!",
                    data: []
                }
            }
        },
        
    },
    Mau: {
        
    }
}