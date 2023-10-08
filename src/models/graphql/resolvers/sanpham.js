const {SanPham, sequelize, Loai, NhaCungCap} = require("../../database/models/")
const STATUS_CODE = require("../const")
module.exports = {
    Mutation: {
        async taoSanPham(root, args, context) {
            let transaction
            try {
                transaction = await sequelize.transaction()
                const {ten, anhminhhoa, mota, giaban, maloai, manhacungcap} = args.input
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
                const rs = await SanPham.create({ten, anhminhhoa, mota, giaban})
                await rs.addLoai(loais)
                await rs.addNhaCungCap(nhacungcaps)
                rs.maloai = maloai
                rs.manhacungcap = manhacungcap
                transaction.commit()
                const response =  {
                    status: STATUS_CODE.create_success,
                    message: "Thêm sản phẩm thành công!"
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
                await sanpham.save()
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
        async sanphamvoima(root, args, context) {
            try {
                const sanpham = await SanPham.findByPk(args.ma);
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
        }
    }
}