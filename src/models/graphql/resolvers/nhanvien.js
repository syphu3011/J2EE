const { Op } = require("sequelize");
const {
    NhanVien,
    sequelize,
    HoaDon,
    PhieuNhap,
} = require("../../database/models/");
const {STATUS_CODE} = require("../const");

module.exports = {
    Mutation: {
        async themNhanVien(root, args, context) {
            let transaction;
            try {
                transaction = await sequelize.transaction();
                const {
                    ten,
                    ngaysinh,
                    sodienthoai,
                    socccd,
                    tentaikhoan,
                    email,
                    matrangthai,
                } = args.input;
                const rs = await NhanVien.create({
                    ten,
                    ngaysinh,
                    sodienthoai,
                    socccd,
                    tentaikhoan,
                    email,
                    matrangthai,
                });
                transaction.commit();
                const response = {
                    status: STATUS_CODE.create_success,
                    message: "Thêm nhân viên thành công!",
                };
                return response;
            } catch (e) {
                transaction.rollback();
                return {
                    status: STATUS_CODE.create_fail,
                    message: "Bị lỗi! Thêm nhân viên không thành công!",
                };
            }
        },
        async suaNhanVien(root, args, context) {
            let transaction;
            try {
                transaction = await sequelize.transaction();
                const {
                    ma,
                    ten,
                    ngaysinh,
                    sodienthoai,
                    socccd,
                    tentaikhoan,
                    email,
                    matrangthai,
                } = args.input;

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
                    tentaikhoan,
                    email,
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
        },
    },
    Query: {
        nhanvien: async () => {
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
    Query: {
    
    }
};