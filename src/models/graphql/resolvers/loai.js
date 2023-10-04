const {Loai} = require("../../database/models")
module.exports = {
    Mutation: {
        async taoLoai(root, args, context) {
            const {ten, anhminhhoa, mota, giaban} = args.input
            return SanPham.create({ten, anhminhhoa, mota, giaban})
        }
    },
    Query: {
        loai: async() => {
            return Loai.findAll();
        }
    },
    Loai: {
        sanpham(loai) {return loai.getSanPhams()},
        loaicha(loai) {return loai.getLoaicha()},
        loaicon(loai) {return loai.getLoaicon()}
    }
}