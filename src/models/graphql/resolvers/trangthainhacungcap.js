const {TrangThaiNhaCungCap} = require("../../database/models")
module.exports = {
    // Mutation: {
    //     async taoLoai(root, args, context) {
    //         const {ten, anhminhhoa, mota, giaban} = args.input
    //         return SanPham.create({ten, anhminhhoa, mota, giaban})
    //     }
    // },
    Query: {
        trangthainhacungcap: async() => {
            return TrangThaiNhaCungCap.findAll();
        }
    },
    TrangThaiNhaCungCap: {
        nhacungcap(trangthainhacungcap) {return trangthainhacungcap.getTrangThai()},
    }
}