const { Op, literal } = require("sequelize")
const { KhachHang, NhanVien, TaiKhoan, sequelize, Quyen } = require("../../database/models")
const bcrypt = require("bcrypt");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { STATUS_CODE, PRIVATE_CODE_AT, PRIVATE_CODE_RT, LIFE_AT, LIFE_RT, MAIL } = require("../const");
const { set_token } = require("../../utils/token");
var nodemailer = require('nodemailer');
const { pushToArrayHaveNotOTP, getArrayHaveNotOTP } = require("../../utils/constant");
module.exports = {
  Mutation: {
    async quenMatKhauKhachHang(root, args, context) {
      let transaction
      try {
        transaction = await sequelize.transaction()
        const { tentaikhoan } = args.input
        const new_password = Math.random().toString(36).slice(-8);
        const taikhoan = await TaiKhoan.findByPk(tentaikhoan)
        if (taikhoan) {
          taikhoan.matkhau = bcrypt.hashSync(new_password, bcrypt.genSaltSync(10))
          taikhoan.save()
          var transporter = nodemailer.createTransport({ // config mail server
            service: 'Gmail',
            auth: {
              user: MAIL.USERNAME,
              pass: MAIL.PASSWORD
            }
          });
          var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
            from: MAIL.USERNAME,
            to: tentaikhoan,
            subject: 'CẤP LẠI MẬT KHẨU',
            text: 'Đây là mật khẩu mới của bạn. Đừng cung cấp cho bất kỳ ai. Mật khẩu: ' + new_password
          }
          transporter.sendMail(mainOptions, async function (err, info) {
            if (err) {
              await transaction.rollback()
              return {
                status: 400,
                message: "Cấp lại mật khẩu không thành công!"
              }
            } else {
              await transaction.commit()
              return {
                status: 200,
                message: "Cấp lại mật khẩu thành công!"
              }
            }
          });
        }
        else {
          await transaction.rollback()
          return {
            status: 400,
            message: "Cấp lại mật khẩu không thành công!"
          }
        }
      }
      catch (e) {
        await transaction.rollback()
        return {
          status: 400,
          message: "Cấp lại mật khẩu không thành công!"
        }
      }
    },
    async dangKyKhachHang(root, args, context) {
      let transaction
      try {
        transaction = await sequelize.transaction()
        const { tentaikhoan, matkhau, ten, ngaysinh, xacnhanmatkhau, sodienthoai, maquyen } = args.input
        if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(tentaikhoan))) {
          return {
            status: STATUS_CODE.create_fail,
            message: "Email không hợp lệ!"
          }
        }
        if (matkhau !== xacnhanmatkhau) {
          return {
            status: STATUS_CODE.create_fail,
            message: "Mật khẩu xác nhận không hợp lệ!"
          }
        }
        const matkhaubam = bcrypt.hashSync(matkhau, bcrypt.genSaltSync(10))
        const taikhoan = await TaiKhoan.create({ tentaikhoan, matkhau: matkhaubam, maquyen: maquyen ? maquyen : 1 })
        const khachhang = await KhachHang.create({ ten, ngaysinh, sodienthoai, tentaikhoan: taikhoan.tentaikhoan, matrangthai: 1, email: tentaikhoan })
        await transaction.commit()

        const taikhoandadangky = {
          tentaikhoan: tentaikhoan,
          maquyen: taikhoan.maquyen
        }
        await set_token(context.res, taikhoandadangky)
        return {
          status: STATUS_CODE.create_success,
          message: "Đăng ký tài khoản thành công!",
        }
      }
      catch (e) {
        await transaction.rollback()
        return {
          status: STATUS_CODE.create_fail,
          message: "Bị lỗi! Đăng ký tài khoản không thành công!",
        }
      }
    },
    async dangNhap(root, args, context) {
      try {
        const { tentaikhoan, matkhau } = args.input
        const taikhoan = await TaiKhoan.findByPk(tentaikhoan)
        if (taikhoan) {
          const checkPassword = bcrypt.compareSync(matkhau, taikhoan.matkhau)
          if (checkPassword) {
            const taikhoandangnhap = {
              tentaikhoan: tentaikhoan,
              maquyen: taikhoan.maquyen
            }
            await set_token(context.res, taikhoandangnhap)
            const rs = {
              status: 200,
              message: "Đăng nhập thành công!"
            }
            return rs
          }
        }
        return {
          status: 400,
          message: "Tên tài khoản hoặc mật khẩu không chính xác!",
        }
      }
      catch (e) {
        console.log(e);
      }
    },
    async dangNhapVoiToken(root, args, context) {
      if (context.taikhoan) {
        return {
          status: 200,
          message: "Xác thực thành công!"
        }
      }

      return {
        status: 400,
        message: "Xác thực không thành công!"
      }
    },
    async dangNhapAdmin(root, args, context) {
      try {
        const { tentaikhoan, matkhau } = args.input
        const taikhoan = await TaiKhoan.findByPk(tentaikhoan)
        if (taikhoan) {
          const checkPassword = bcrypt.compareSync(matkhau, taikhoan.matkhau)
          if (checkPassword) {
            if (taikhoan.maquyen == 1) {
              returnContent = {
                status: 400,
                message: "Bạn không có quyền vào trang quản trị!",
              }
              return returnContent
            }
            else {
              const nhanvien = await NhanVien.findAll({
                where: {
                  tentaikhoan: tentaikhoan
                }
              })
              if (nhanvien.length > 0 && nhanvien.matrangthai != 2) {
                const otp = Math.random().toString(36).slice(-8)
                const otphash = bcryptjs.hashSync(otp, bcryptjs.genSaltSync(10))
                // context.res.cookie("otp", otphash, {maxAge: 60 * 1000, sameSite: "none"})
                // gửi mail
                var transporter = nodemailer.createTransport({ // config mail server
                  service: 'Gmail',
                  auth: {
                    user: MAIL.USERNAME,
                    pass: MAIL.PASSWORD
                  }
                });
                var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
                  from: MAIL.USERNAME,
                  to: tentaikhoan,
                  subject: 'OTP đăng nhập admin',
                  text: 'Đây là OTP của bạn. Có giá trị trong vòng 60s: ' + otp
                }
                transporter.sendMail(mainOptions);
                const taikhoandangnhap = {
                  tentaikhoan: tentaikhoan,
                  maquyen: taikhoan.maquyen,
                  daxacthuc: "false",
                  otp: otphash,
                  timestamp: Date.now()+""
                }
                await set_token(context.res, taikhoandangnhap)
                return {
                  status: 200,
                  message: "Đăng nhập thành công",
                  data: {
                    chucnang: ""
                  }
                }
              }
              else {
                return {
                  status: 400,
                  message: "Đăng nhập không thành công",
                  data: {
                    chucnang: "",
                    otp: ""
                  }
                }
              }
            }
          }
        }
        else {
          return {
            status: 400,
            message: "Tên tài khoản hoặc mật khẩu không chính xác!",
            data: {
              chucnang: "",
              otp: ""
            }
          }
        }
      } catch (error) {
        return {
          status: 400,
          message: "Có lỗi xảy ra!",
          data: {
            chucnang: "",
            otp: ""
          }
        }
      }
    },
    async dangNhapAdminVoiToken(root, args, context) {
      try {
        const taikhoan = context.taikhoan
        if (!taikhoan.daxacthuc) {
          return {
            status: 400,
            message: "Bạn chưa đăng nhập!",
            data: {
              chucnang: ""
            }
          }
        }
        if (taikhoan.daxacthuc == "false") {
          return {
            status: 400,
            message: "Bạn chưa xác thực OTP",
            data: {
              chucnang: ""
            }
          }
        }
        if (taikhoan) {
          // xác thực quyền
          if (taikhoan.maquyen == 1) {
            return {
              status: 400,
              message: "Bạn không có quyền vào trang quản trị!",
              data: {
                chucnang: ""
              }
            }
          }
          // kiểm tra nhân viên
          const nhanvien = await NhanVien.findAll({
            where: {
              tentaikhoan: taikhoan.tentaikhoan
            }
          })
          if (nhanvien[0].matrangthai == 2) {
            return {
              status: 400,
              message: "Tài khoản đã bị khóa",
              data: {
                chucnang: ""
              }
            }
          }
          else {
            // xác thực thành công
            const taikhoandangnhap = {
              tentaikhoan: taikhoan.tentaikhoan,
              maquyen: taikhoan.maquyen,
              daxacthuc: "true",
              otp: null
            }
            const quyen = await Quyen.findByPk(taikhoan.maquyen)
            const chucnang = await quyen.getChucNang()
            const chucnangreturn = chucnang.reduce((acc, cur) => cur.ten + "," + acc, "")
            await set_token(context.res, taikhoandangnhap)
            return {
              status: 200,
              message: "Đăng nhập thành công!",
              data: {
                chucnang: chucnangreturn
              }
            }
          }
        }
        else {
          return {
            status: 400,
            message: "Phiên đăng nhập đã hết!",
            data: {
              chucnang: ""
            }
          }
        }
      }
      catch(e) {
        return {
          status: 400,
          message: "Có lỗi xảy ra!",
          data: {
            chucnang: ""
          }
        }
      }
    }
  ,
  async xacThucOTP (root, args, context) {
    const taikhoan = context.taikhoan
    const {otp} = args.input
    const timestamp = Date.now()+""
    if (taikhoan) { 
      if (taikhoan.otp) {
        if (timestamp - taikhoan.timestamp > 60000) {
          return {
            status: 401,
            message: "OTP đã quá thời hạn!",
            data: {
              chucnang: ""
            }
          }
        }
        if (bcrypt.compareSync(otp, taikhoan.otp)) {
          const taikhoandangnhap = {
            tentaikhoan: taikhoan.tentaikhoan,
            maquyen: taikhoan.maquyen,
            daxacthuc: "true",
            otp: null
          }
          await set_token(context.res, taikhoandangnhap)
          const quyen = await Quyen.findByPk(taikhoan.maquyen)
          const chucnang = await quyen.getChucNang()
          const chucnangreturn = chucnang.reduce((acc, cur) => cur.ten + "," + acc, "")
          return {
            status: 200,
            message: "Đăng nhập thành công!",
            data: {
              chucnang: chucnangreturn
            }
          }
        }
        else {
          return {
            status: 400,
            message: "OTP không hợp lệ!",
            data: {
              chucnang: ""
            }
          }
        }
      }
      else {
        return {
          status: 400,
          message: "Bạn không cần xác thực OTP!",
          data: {
            chucnang: ""
          }
        }
      }
    }
    else {
      return {
        status: 400,
        message: "Bạn phải đăng nhập trước!",
        data: {
          chucnang: ""
        }
      }
    }
  },
  async suaTaiKhoan(root, args, context) {
    let transaction
    try {
      transaction = await sequelize.transaction()
      const { ma, ten } = args.input
      const taikhoan = await TaiKhoan.findByPk(ma)
      await taikhoan.update({ ten })
      await taikhoan.save()
      await transaction.commit()
      return {
        status: STATUS_CODE.update_success,
        message: "Sửa tài khoản thành công!",
      }
    }
    catch (e) {
      await transaction.rollback()
      return {
        status: STATUS_CODE.update_fail,
        message: "Bị lỗi! Sửa tài khoản không thành công!",
      }
    }
  },
  async xoaTaiKhoan(root, args, context) {
    let transaction
    try {
      transaction = await sequelize.transaction()
      const { ma, ten } = args.input
      const taikhoan = await TaiKhoan.findByPk(ma)
      await taikhoan.setSanPham([])
      await taikhoan.destroy()
      await taikhoan.save()
      await transaction.commit()
      return {
        status: STATUS_CODE.update_success,
        message: "Xóa tài khoản thành công!",
      }
    }
    catch (e) {
      await transaction.rollback()
      return {
        status: STATUS_CODE.update_fail,
        message: "Bị lỗi! Xóa tài khoản không thành công!",
      }
    }
  },
  dangxuat(root, args, context) {
    try {
      context.res.clearCookie("haizz")
      context.res.clearCookie("getout")
      context.res.clearCookie("token")
      context.res.clearCookie("rToken")
      context.res.clearCookie("chucnang")
      return {
        status: 200,
        message: "Đăng xuất thành công!"
      }
    }
    catch(e) {
      return {
        status: 400,
        message: "Đăng xuất không thành công!"
      }
    }
  }
},
  Query: {
},
TaiKhoan: {
  quyen(taikhoan) {
    return taikhoan.getQuyen()
  }
}
}