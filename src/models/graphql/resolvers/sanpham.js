const {SanPham, sequelize} = require("../../database/models/")
module.exports = {
    Mutation: {
        async taoSanPham(root, args, context) {
            let transaction
            try {
                transaction = await sequelize.transaction()
                const {ten, anhminhhoa, mota, giaban, maloai, manhacungcap} = args.input
                let ar_loai = []
                let ar_ncc = []
                maloai.forEach(e => {
                    ar_loai.push({ma: e})
                })
                manhacungcap.forEach(e => {
                    ar_ncc.push({ma: e})
                })
                const rs = await SanPham.create({ten, anhminhhoa, mota, giaban, loai: ar_loai, nhacungcap: ar_ncc})
                rs.maloai = maloai
                rs.manhacungcap = manhacungcap
                transaction.commit()
                const response =  {
                    status: 201,
                    message: "Thêm sản phẩm thành công!",
                    data: rs
                }
                return response
            }
            catch(e) {
                transaction.rollBack()
                return {
                    status: 500,
                    message: "Thêm sản phẩm không thành công!",
                    data: {e}
                }
            }
        },
        async suaSanPham(root, args, context) { 

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