const { Op, literal } = require("sequelize")
const { KhachHang, NhanVien, TaiKhoan, sequelize } = require("../../database/models")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { STATUS_CODE, PRIVATE_CODE_AT, PRIVATE_CODE_RT, LIFE_AT, LIFE_RT, MAIL } = require("../const");
const { set_token } = require("../../utils/token");
var nodemailer = require('nodemailer')
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
          transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
              transaction.rollback()
              return {
                status: 400,
                message: "Cấp lại mật khẩu không thành công!"
              }
            } else {
              transaction.commit()
              return {
                status: 200,
                message: "Cấp lại mật khẩu thành công!"
              }
            }
          });
        }
        else {
          transaction.rollback()
          return {
            status: 400,
            message: "Cấp lại mật khẩu không thành công!"
          }
        }
      }
      catch (e) {
        transaction.rollback()
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
        transaction.commit()

        const taikhoandadangky = {
          tentaikhoan: tentaikhoan,
          maquyen: taikhoan.maquyen
        }
        set_token(context.res, taikhoandadangky)
        return {
          status: STATUS_CODE.create_success,
          message: "Đăng ký tài khoản thành công!",
        }
      }
      catch (e) {
        transaction.rollback()
        return {
          status: STATUS_CODE.create_fail,
          message: "Bị lỗi! Đăng ký tài khoản không thành công!",
        }
      }
    },
    async dangNhap(root, args, context) {
      try {
        console.log(args.input)
        const { tentaikhoan, matkhau } = args.input
        const taikhoan = await TaiKhoan.findByPk(tentaikhoan)
        console.log(taikhoan)
        if (taikhoan) {
          const checkPassword = bcrypt.compareSync(matkhau, taikhoan.matkhau)
          if (checkPassword) {
            const taikhoandangnhap = {
              tentaikhoan: tentaikhoan,
              maquyen: taikhoan.maquyen
            }
            const accessToken = jwt.sign(taikhoandangnhap, PRIVATE_CODE_AT, { expiresIn: LIFE_AT })
            const refreshToken = jwt.sign(taikhoandangnhap, PRIVATE_CODE_RT, { expiresIn: LIFE_RT })
            context.res.cookie("token", accessToken, { secure: true, httpOnly: true, maxAge: LIFE_AT * 1000, sameSite: "none" })
            context.res.cookie("rToken", refreshToken, { secure: true, httpOnly: true, maxAge: LIFE_RT * 1000, sameSite: "none" })
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
    async dangNhapAdminVoiToken(root, args, context) {
      const { token, rToken } = args.input
      let returnContent = ""
      jwt.verify(token, PRIVATE_CODE_AT, async function (err, decoded) {
        if (!err) {
          const taikhoan = await TaiKhoan.findByPk(decoded.tentaikhoan)

          if (taikhoan.maquyen == 1) {
            returnContent = {
              status: 400,
              message: "Bạn không có quyền vào trang quản trị!",
            }
            return
          }
          const accessToken = jwt.sign(taikhoandangnhap, PRIVATE_CODE_AT, { expiresIn: LIFE_AT })
          const refreshToken = jwt.sign(taikhoandangnhap, PRIVATE_CODE_RT, { expiresIn: LIFE_RT })
          returnContent = {
            status: 200,
            message: "Đăng nhập thành công!"
          }
          return
        }
        else {
          jwt.verify(rToken, PRIVATE_CODE_RT, async function (err, decoded) {
            if (!err) {
              const taikhoan = await TaiKhoan.findByPk(decoded.tentaikhoan)
              if (taikhoan) {
                if (taikhoan.maquyen == 1) {
                  returnContent = {
                    status: 400,
                    message: "Bạn không có quyền vào trang quản trị!",
                  }
                  return
                }
                const nhanvien = await NhanVien.findAll({
                  where: {
                    tentaikhoan: decoded.tentaikhoan
                  }
                })
                if (nhanvien.maquyen == 2) {
                  returnContent = {
                    status: 400,
                    message: "Tài khoản đã bị khóa",
                  }
                  return
                }
                else {
                  const taikhoandangnhap = {
                    tentaikhoan: decoded.tentaikhoan,
                    maquyen: decoded.maquyen
                  }
                  const accessToken = jwt.sign(taikhoandangnhap, PRIVATE_CODE_AT, { expiresIn: LIFE_AT })
                  const refreshToken = jwt.sign(taikhoandangnhap, PRIVATE_CODE_RT, { expiresIn: LIFE_RT })
                  context.res.cookie("token", accessToken, { secure: true, httpOnly: true, maxAge: LIFE_AT * 1000, sameSite: "none" })
                  context.res.cookie("rToken", refreshToken, { secure: true, httpOnly: true, maxAge: LIFE_RT * 1000, sameSite: "none" })
                  returnContent = {
                    status: 200,
                    message: "Đăng nhập thành công!",
                  }
                  return
                }
              }
            }
            else {
              returnContent = {
                status: 400,
                message: "Phiên đăng nhập đã hết!",
              }
              return
            }
          })
        }
      })
      return returnContent
    },
    async suaTaiKhoan(root, args, context) {
      let transaction
      try {
        transaction = await sequelize.transaction()
        const { ma, ten } = args.input
        const taikhoan = await TaiKhoan.findByPk(ma)
        await taikhoan.update({ ten })
        await taikhoan.save()
        transaction.commit()
        return {
          status: STATUS_CODE.update_success,
          message: "Sửa tài khoản thành công!",
        }
      }
      catch (e) {
        transaction.rollback()
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
        transaction.commit()
        return {
          status: STATUS_CODE.update_success,
          message: "Xóa tài khoản thành công!",
        }
      }
      catch (e) {
        transaction.rollback()
        return {
          status: STATUS_CODE.update_fail,
          message: "Bị lỗi! Xóa tài khoản không thành công!",
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