const { Op } = require("sequelize");
const {checkAndResolveAdmin} = require("./checkToken")
const {
    NhanVien,
    sequelize,
    HoaDon,
    PhieuNhap,
    TaiKhoan
} = require("../../database/models/");
const {STATUS_CODE, CHUCNANG} = require("../const");
const bcrypt = require("bcrypt")

module.exports = {
    Mutation: {
        async themNhanVien(root, args, context) {
            async function callback(e) { 
                let transaction;
                try {
                    transaction = await sequelize.transaction();
                    const {
                        ten,
                        ngaysinh,
                        sodienthoai,
                        socccd,
                        matrangthai,
                    } = args.input;
                    const rs = await NhanVien.create({
                        ten,
                        ngaysinh,
                        sodienthoai,
                        socccd,
                        matrangthai,
                    });
                    await transaction.commit();
                    const response = {
                        status: STATUS_CODE.create_success,
                        message: "Thêm nhân viên thành công!",
                    };
                    return response;
                } catch (e) {
                    await transaction.rollback();
                    return {
                        status: STATUS_CODE.create_fail,
                        message: "Bị lỗi! Thêm nhân viên không thành công!",
                    };
                }
            }
            return await checkAndResolveAdmin(context.taikhoan, callback, "đã thêm nhân viên", CHUCNANG.THEMNHANVIEN)
        },
        async suaNhanVien(root, args, context) {
            const {
                ma,
                ten,
                ngaysinh,
                sodienthoai,
                socccd,
                matrangthai,
            } = args.input;
            async function callback(e) { 
                let transaction;
                try {
                    transaction = await sequelize.transaction();
                    const nhanvien = await NhanVien.findByPk(ma);

                    if (!nhanvien) {
                        return {
                            status: STATUS_CODE.update_fail,
                            message: "Không tìm thấy nhân viên!",
                        };
                    }

                    await nhanvien.update({
                        ten,
                        ngaysinh,
                        sodienthoai,
                        socccd,
                        matrangthai,
                    });

                    await transaction.commit();

                    return {
                        status: STATUS_CODE.update_success,
                        message: "Sửa nhân viên thành công!",
                    };
                } catch (e) {
                    if (transaction) {
                        await transaction.rollback();
                    }
                    return {
                        status: STATUS_CODE.update_fail,
                        message: "Bị lỗi! Sửa nhân viên không thành công!",
                    };
                }
            }
            return await checkAndResolveAdmin(context.taikhoan, callback, "đã sửa nhân viên có id là " + ma, CHUCNANG.SUANHANVIEN)
        },
        async xoaNhanVien(root, args, context) {
            const {ma} = args
            async function callback(e) { 
                let transaction
                try {
                    transaction = await sequelize.transaction()
                    const nhanvien = await NhanVien.findByPk(ma) 
                    try {
                        await nhanvien.destroy()
                    }
                    catch (e) {
                        await nhanvien.update({matrangthai: 2}) 
                    }
                    await transaction.commit()
                    return {
                        status: 200,
                        message: "Xóa nhân viên thành công!"
                    }
                }   
                catch(e) {
                    await transaction.rollback()
                    return {
                        status: 400,
                        message: "Xóa nhân viên không thành công!"
                    }
                }
            }
            return await checkAndResolveAdmin(context.taikhoan, callback, "đã xóa nhân viên có id là " + ma, CHUCNANG.XOANHANVIEN)
        },
        async captaikhoan(root, args, context) {
            const {tentaikhoan, matkhau, maquyen, manhanvien} = args.input 
            async function callback(e) { 
                let transaction
                try {
                    transaction = await sequelize.transaction()
                    if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(tentaikhoan))) {
                        return {
                        status: STATUS_CODE.create_fail,
                        message: "Email không hợp lệ!"
                        }
                    }
                    const nhanvien = await NhanVien.findByPk(manhanvien)
                    if (nhanvien.tentaikhoan) {
                        const taikhoan = await TaiKhoan.findByPk(nhanvien.tentaikhoan)
                        await nhanvien.update({tentaikhoan: null})
                        await taikhoan.destroy()
                    }
                    const matkhaubam = bcrypt.hashSync(matkhau, bcrypt.genSaltSync(10))
                    const them_tai_khoan = await TaiKhoan.create({
                        tentaikhoan, matkhau:matkhaubam, maquyen
                    })
                    await nhanvien.update({tentaikhoan})
                    await transaction.commit()
                    return {
                        status: 201,
                        message: "Cấp tài khoản cho nhân viên thành công!"
                    }
                }
                catch(e) {
                    await transaction.rollback()
                    return {
                        status: 400,
                        message: "Cấp tài khoản cho nhân viên không thành công!"
                    }
                }
            }
            return await checkAndResolveAdmin(context.taikhoan, callback, "đã cấp tài khoản nhân viên có id là " + manhanvien + ". Tên tài khoản: "+tentaikhoan, CHUCNANG.THEMNHANVIEN)
        },
        async xoataikhoan(root, args, context) {
            const {tentaikhoan} = args.input 
            async function callback(e) { 
                let transaction
                try {
                    transaction = await sequelize.transaction()
                    const nhanvien = await NhanVien.findOne({
                        where: {
                            tentaikhoan
                        }
                    })
                    await nhanvien.update({tentaikhoan: null})
                    const taikhoan = await TaiKhoan.findByPk(tentaikhoan)
                    await taikhoan.destroy()
                    await transaction.commit()
                    return {
                        status: 200,
                        message: "Xóa tài khoản thành công!"
                    }
                }
                catch(e) {
                    await transaction.rollback()
                    return {
                        status: 400,
                        message: "Xóa tài khoản không thành công!"
                    }
                }
            }
            return await checkAndResolveAdmin(context.taikhoan, callback, "đã xóa tài khoản nhân viên. Tên tài khoản: "+tentaikhoan, CHUCNANG.THEMNHANVIEN)
        }
    },
    Query: {
        nhanvien: async (root, args, context) => {
            async function callback(e) {
                try {
                    const nhanvien = await NhanVien.findAll();
                    return {
                        status: STATUS_CODE.query_success,
                        message: "Lấy danh sách nhân viên thành công!",
                        data: nhanvien,
                    };
                } catch (e) {
                    return {
                        status: STATUS_CODE.query_fail,
                        message: "Nhân viên không tồn tại!",
                        data: [],
                    };
                }
            }
            return await checkAndResolveAdmin(context.taikhoan, callback)
        },
        async nhanvienvoithuoctinh(root, args, context) {
            try {
                const { ma = "", ten = "" } = args.input;
                const nhanvien = await NhanVien.findAll({
                    where: {
                        ma: { [Op.like]: "%" + ma + "%" },
                        ten: { [Op.like]: "%" + ten + "%" },
                    },
                });
                return {
                    status: STATUS_CODE.query_success,
                    message: "Lấy nhân viên thành công!",
                    data: nhanvien,
                };
            } catch (e) {
                return {
                    status: STATUS_CODE.query_fail,
                    message: "Nhân viên không tồn tại!",
                    data: [],
                };
            }
        },
        async timkiemnhanvien(root, args, context) {
            try {
                const { ma = "", ten = "" } = args.input;
                const nhanvien = await NhanVien.findAll({
                    where: {
                        [Op.or]: {
                            ma: { [Op.like]: "%" + ma + "%" },
                            ten: { [Op.like]: "%" + ten + "%" },
                        },
                    },
                });
                return {
                    status: STATUS_CODE.query_success,
                    message: "Lấy nhân viên thành công!",
                    data: nhanvien,
                };
            } catch (e) {
                return {
                    status: STATUS_CODE.query_fail,
                    message: "Nhân viên không tồn tại!",
                    data: [],
                };
            }
        },
    },
    NhanVien: {
        trangthai: (nhanvien) => {
            return nhanvien.getTrangThaiNhanVien()
        },
        quyen: async(nhanvien) => {
            return (await nhanvien.getTaiKhoan()).getQuyen()
        }
    }
};