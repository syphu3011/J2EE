const {TrangThaiNhaCungCap, sequelize} = require("../../database/models")
const {STATUS_CODE} = require("../const")
module.exports = {
    // Mutation: {
    //     async taoLoai(root, args, context) {
    //         const {ten, anhminhhoa, mota, giaban} = args.input
    //         return SanPham.create({ten, anhminhhoa, mota, giaban})
    //     }
    // },
    Query: {
        trangthainhacungcap: async() => {
            try {
                const rs = {
                    status: STATUS_CODE.query_success,
                    message: "Lấy trạng thái nhà cung cấp thành công!",
                    data: await TrangThaiNhaCungCap.findAll()
                }
                return rs
            }
            catch (e) {
                return {
                    status: STATUS_CODE.query_fail,
                    message: "Lấy trạng thái nhà cung cấp không thành công!",
                    data: []
                }
            }
            
        },
        async trangthainhacungcapvoima(root, args, context) {
            try {
                const rs = {
                    status: STATUS_CODE.query_success,
                    message: "Lấy trạng thái nhà cung cấp thành công!",
                    data: await TrangThaiNhaCungCap.findByPk(args.ma)
                }
                return rs
            }
            catch (e) {
                return {
                    status: STATUS_CODE.query_fail,
                    message: "Lấy trạng thái nhà cung cấp không thành công!",
                    data: []
                }
            }
        }
    },
    TrangThaiNhaCungCap: {
        nhacungcap(trangthainhacungcap) {return trangthainhacungcap.getNhaCungCap()},
    },
    Mutation: {
        async themTrangThaiNhaCungCap(root, args, context) {
            let transaction 
            try {
                transaction = await sequelize.transaction()
                const {ten} = args.input
                await TrangThaiNhaCungCap.create({ten})
                await transaction.commit()
                return {
                    status: STATUS_CODE.create_success,
                    message: "Thêm trạng thái nhà cung cấp thành công"
                }
            }
            catch(e) {
                await transaction.rollback()
                return {
                    status: STATUS_CODE.create_fail,
                    message: "Bị lỗi! Thêm trạng thái nhà cung cấp không thành công!"
                }
            }
        },
        async suaTrangThaiNhaCungCap(root, args, context) {
            let transaction
            try {
                transaction = await sequelize.transaction()
                const {ma, ten} = args.input
                const ttncc = await TrangThaiNhaCungCap.findByPk(ma) 
                await ttncc.update(ten)
                await ttncc.save()
                await transaction.commit()
                return {
                    status: STATUS_CODE.create_success,
                    message: "Sửa trạng thái nhà cung cấp thành công"
                }
            }
            catch(e) {
                await transaction.rollback()
                return {
                    status: STATUS_CODE.create_fail,
                    message: "Bị lỗi! Sửa trạng thái nhà cung cấp không thành công!"
                }
            }
        },
        async xoaTrangThaiNhaCungCap(root, args, context) {
            let transaction
            try {
                transaction = await sequelize.transaction()
                const ma = args.ma
                const ttncc = await TrangThaiNhaCungCap.findByPk(ma)
                await ttncc.setNhaCungCap([])
                await ttncc.destroy()
                await transaction.commit()
                return {
                    status: STATUS_CODE.delete_success,
                    message: "Xóa trạng thái nhà cung cấp thành công!"
                }
            }
            catch(e) {
                await transaction.rollback()
                return  {
                    status: STATUS_CODE.delete_fail,
                    message: "Bị lỗi!Xóa trạng thái nhà cung cấp không thành công!"
                }
            }
        }
    }
}