const {SanPham} = require("../../database/models/")
module.exports = {
    Mutation: {
        async taoSanPham(root, args, context) {
            const {ten, anhminhhoa, mota, giaban} = args.input
            return SanPham.create({ten, anhminhhoa, mota, giaban})
        }
    },
    Query: {
        sanpham: async() => {
            return SanPham.findAll();
        }
    },
    SanPham: {
        loai(sanpham) {
            return sanpham.getLoai()
        }
    }
}