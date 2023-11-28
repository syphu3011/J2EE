const { Op, literal } = require("sequelize")
const {KhachHang, TaiKhoan, LichSuHeThong, sequelize} = require("../../database/models")
const {STATUS_CODE, CHUCNANG} = require("../const")
const { checkPrivileges, checkAdmin, checkAndResolveAdmin } = require("./checkToken")
module.exports = {
    Query: {
        lichsuhethong: async (root,args,context) => {
          const rs = checkAndResolveAdmin(context.taikhoan, async (nhanvien_data) => {
            const data = await LichSuHeThong.findAll()
            try {
              return {
                status : STATUS_CODE.query_success,
                message: "Lấy thông tin hệ thống thành công!",
                data
              }
            }
            catch(e) {
              return {
                status: STATUS_CODE.query_fail,
                message: "Lấy thông tin lịch sử hệ thống thất bại!",
                data: []
              }
            } 
          })
          return rs
        }
    }
}