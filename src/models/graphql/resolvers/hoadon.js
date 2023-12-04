const { Op, literal } = require("sequelize")
const {HoaDon, sequelize, HangTrongKho, LichSuHeThong, Mau, KichCo, ChiTietHoaDon, NhanVien} = require("../../database/models")
const {STATUS_CODE, MAIL, CHUCNANG} = require("../const")
const nodemailer = require('nodemailer');
const { checkAdmin, checkAndResolveAdmin } = require("./checkToken");
module.exports = {
    Mutation: {
      async taoHoaDon(root, args, context) {
        let transaction
        try {
          transaction = await sequelize.transaction()
          const {makhachhang, diachi, sanpham, email, sodienthoai} = args.input
          const hoadon = await HoaDon.create({makhachhang, diachi, matrangthaihoadon: 1, email, sodienthoai})
          let hangtrongkho_list = []
          for (const sp of sanpham) {
            const hangtrongkho = await HangTrongKho.findOne({
              where: {
                masanpham: sp.masanpham,
                mamau: sp.mamau,
                makichco: sp.makichco,
              },
              order:[
                ["maphieunhap", "ASC"]
              ]
            })
            const mau = await Mau.findByPk(sp.mamau)
            const kichco = await KichCo.findByPk(sp.makichco)
            if (hangtrongkho.matrangthai == 2) {
              await transaction.rollback()
              return {
                status: 400,
                message: "Hàng có mã "+sp.masanpham+ ", màu " + mau.ten + ", size: "+kichco.ten+ " đã ngưng bán!"+"Quý khách vui lòng đặt lại!" 
              }
            }
            if (hangtrongkho.soluong < sp.soluong) {
              await transaction.rollback()
              return {
                status: 400,
                message: "Hàng có mã "+sp.masanpham+ ", màu " + mau.ten + ", size: "+kichco.ten+ " chỉ còn " + hangtrongkho.soluong + ". Quý khách vui lòng sửa số lượng và đặt lại!" 
              }
            }
            await ChiTietHoaDon.create({
              mahoadon: hoadon.ma,
              maphieunhap: hangtrongkho.maphieunhap, 
              masanpham: hangtrongkho.masanpham, 
              mamau: hangtrongkho.mamau, 
              makichco: hangtrongkho.makichco, 
              soluong: sp.soluong, 
              gia: hangtrongkho.giaban
            })

            await hangtrongkho.update({soluong: hangtrongkho.soluong - sp.soluong})
          }
          await transaction.commit()
          return {
            status: STATUS_CODE.create_success,
            message: "Thêm hóa đơn thành công!",
          }
        } 
        catch(e) {
          await transaction.rollback()
          return {
            status: STATUS_CODE.create_fail,
            message: "Bị lỗi! Thêm hóa đơn không thành công!",
          }
        }
      },
      // async suaHoaDon(root, args, context) {
      //   let transaction
      //   try {
      //     transaction = await sequelize.transaction()
      //     const {ma, ten} = args.input
      //     const hoadon = await HoaDon.findByPk(ma)
      //     await hoadon.update({ten})
      //     await hoadon.save()
      //     await transaction.commit()
      //     return {
      //       status: STATUS_CODE.update_success,
      //       message: "Sửa hóa đơn thành công!",
      //     }
      //   } 
      //   catch(e) {
      //     await transaction.rollback()
      //     return {
      //       status: STATUS_CODE.update_fail,
      //       message: "Bị lỗi! Sửa hóa đơn không thành công!"
      //     }
      //   }
      // },
      // async xoaHoaDon(root, args, context) {
      //   let transaction
      //   try {
      //     transaction = await sequelize.transaction()
      //     const {ma, ten} = args.input
      //     const hoadon = await HoaDon.findByPk(ma)
      //     await hoadon.setSanPham([])
      //     await hoadon.destroy()
      //     await hoadon.save()
      //     await transaction.commit()
      //     return {
      //       status: STATUS_CODE.update_success,
      //       message: "Xóa hóa đơn thành công!"
      //     }
      //   } 
      //   catch(e) {
      //     await transaction.rollback()
      //     return {
      //       status: STATUS_CODE.update_fail,
      //       message: "Bị lỗi! Xóa hóa đơn không thành công!"
      //     }
      //   }
      // }
      async xacnhanhoachuyhoadon(root, args, context) {
        let transaction
        try {
          transaction = await sequelize.transaction()
          let nhanvien 
          if (context.taikhoan) {
            nhanvien = await NhanVien.findOne({
              where: {
                tentaikhoan: context.taikhoan.tentaikhoan
              }
            })
          } 
          const {ma, matrangthai} = args.input
          const hoadon = await HoaDon.findByPk(ma)
          if (hoadon.matrangthaihoadon == 2 || hoadon.matrangthaihoadon == 3) {
            return {
              status: 400, 
              message: "Đơn hàng đã được xử lý! Không thể thay đổi!"
            }
          }
          
          let return_rs
          let return_rs_200 = {
            status: 200,
            message: "Đơn hàng đã được xử lý thành công!"
          }
          let return_rs_400 = {
            status: 400,
            message: "Đơn hàng xử lý không thành công!"
          }
          if (matrangthai == 2 || nhanvien) {
            return_rs = await checkAndResolveAdmin(context.taikhoan, async(e) => {
              await hoadon.update({matrangthaihoadon: matrangthai, manhanvien: nhanvien.ma})
              return return_rs_200
            }, "đã xử lý đơn hàng có mã "+ma, CHUCNANG.DONHANG)
          }
          else {
            await hoadon.update({matrangthaihoadon: matrangthai, manhanvien: null})
          }
          if (return_rs && return_rs.status == 404) {
            await transaction.rollback()
            return return_rs_400
          }
          //mail
          var transporter = nodemailer.createTransport({ // config mail server
            service: 'Gmail',
            auth: {
              user: MAIL.USERNAME,
              pass: MAIL.PASSWORD
            }
          });
          var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
            from: MAIL.USERNAME,
            to: hoadon.email,
            subject: matrangthai == 2 ? 'Đơn hàng được xác nhận!' : 'Đơn hàng bị hủy!',
            text: 'Đơn hàng có mã ' + hoadon.ma + (matrangthai == 2 ? " đã được cửa hàng xác nhận!" : " đã bị hủy!")
          }
          transporter.sendMail(mainOptions);
          await transaction.commit()
          return return_rs_200
        }
        catch(e) {
          await transaction.rollback()
          return {
            status: 400,
            message: "Đơn hàng xử lý không thành công!"
          }
        }
      }
    },
    Query: {
      hoadon: async () => {
        try {
          const rs = {
            status: STATUS_CODE.query_success,
            message: "Lấy danh sách hóa đơn thành công!",
            data: await HoaDon.findAll()
          }
          return rs
        }
        catch (e) {
          return {
            status: STATUS_CODE.query_fail,
            message: "Lấy danh sách hóa đơn không thành công!",
            data: null
          }
        }
      },
      hoadondaxuly: async (root, args, context) => {
        try {
          const rs = {
            status: STATUS_CODE.query_success,
            message: "Lấy danh sách hóa đơn thành công!",
            data: await HoaDon.findAll({
              where: {
                matrangthaihoadon: {
                  [Op.not]: 1
                }
              }
            })
          }
          return rs
        }
        catch (e) {
          return {
            status: STATUS_CODE.query_fail,
            message: "Lấy danh sách hóa đơn không thành công!",
            data: null
          }
        }
      },
      hoadonchuaxuly: async (root, args, context) => {
        try {
          const rs = {
            status: STATUS_CODE.query_success,
            message: "Lấy danh sách hóa đơn thành công!",
            data: await HoaDon.findAll({
              where: {
                matrangthaihoadon: 1
              }
            })
          }
          return rs
        }
        catch (e) {
          return {
            status: STATUS_CODE.query_fail,
            message: "Lấy danh sách hóa đơn không thành công!",
            data: null
          }
        }
      },
      hoadonvoithuoctinh: async (root, args, context) => {
        try {
          const {ma, ten} = args.input
          const rs = {
            status: STATUS_CODE.query_success,
            message: "Lấy danh sách hóa đơn thành công!",
            data: await HoaDon.findAll({
              where: {
                ten: {[Op.like]: '%' + ten + '%'},
                ma: {[Op.like]: '%' + ma + '%'}
              }
            })
          }
          return rs
        } catch (e) {
          return {
            status: STATUS_CODE.query_fail,
            message: "Lấy danh sách hóa đơn không thành công!",
            data: null
          }
        }
      },
      timkiemhoadon: async (root, args, context) => {
        try {
          const {ma, ten} = args.input
          const rs = {
            status: STATUS_CODE.query_success,
            message: "Lấy danh sách hóa đơn thành công!",
            data: await HoaDon.findAll({
              where: {
                [Op.or]: {
                  ten: {[Op.like]: '%' + ten + '%'},
                  ma: {[Op.like]: '%' + ma + '%'}
                }
              }
            })
          }
        } catch (e) {
          return {
            status: STATUS_CODE.query_fail,
            message: "Lấy danh sách hóa đơn không thành công!",
            data: null
          }
        }
      }
    },
    HoaDon: {
      sanpham: (hoadon) => {
        return ChiTietHoaDon.findAll({
          where: {
            mahoadon: hoadon.ma
          }
        })
      },
      khachhang: (hoadon) => {
        return hoadon.getKhachHang()
      },
      nhanvien: (hoadon) => {
        return hoadon.getNhanVien()
      }
    }
}