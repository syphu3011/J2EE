const { Op, literal } = require("sequelize")
const {KhachHang, NhanVien, TaiKhoan, sequelize} = require("../../database/models")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {STATUS_CODE, PRIVATE_CODE_AT, PRIVATE_CODE_RT, LIFE_AT, LIFE_RT} = require("../const");

module.exports = {
    Mutation: {
      async taoTaiKhoan(root, args, context) {
        let transaction
        try {
          transaction = await sequelize.transaction()
          const {tentaikhoan, matkhau, maquyen} = args.input
          if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(tentaikhoan))) {
            return {
              status: STATUS_CODE.create_fail,
              message: "Email không hợp lệ!"
            }
          }
          const matkhaubam = bcrypt.hashSync(matkhau, bcrypt.genSaltSync(10))
          const taikhoan = await TaiKhoan.create({tentaikhoan, matkhau: matkhaubam, maquyen})
          transaction.commit()

          const taikhoandadangky = {
            tentaikhoan: tentaikhoan,
            maquyen: maquyen
          }
          return {
            status: STATUS_CODE.create_success,
            message: "Thêm tài khoản thành công!",
          }
        } 
        catch(e) {
          transaction.rollback()
          return {
            status: STATUS_CODE.create_fail,
            message: "Bị lỗi! Thêm tài khoản không thành công!",
          }
        }
      },
      async dangNhap(root, args, context) {
        const {tentaikhoan, matkhau} = args.input
        const taikhoan = await TaiKhoan.findByPk(tentaikhoan)
        if (taikhoan) {
          const checkPassword = bcrypt.compareSync(matkhau, taikhoan.matkhau)
          if (checkPassword) {
            const taikhoandangnhap = {
              tentaikhoan: tentaikhoan,
              maquyen: taikhoan.maquyen
            }
            const accessToken = jwt.sign(taikhoandangnhap, PRIVATE_CODE_AT, {expiresIn: LIFE_AT})
            const refreshToken = jwt.sign(taikhoandangnhap, PRIVATE_CODE_RT, {expiresIn: LIFE_RT})
            context.res.cookie("token", accessToken, {secure: true, httpOnly: true, maxAge: LIFE_AT * 1000, sameSite: "none"})
            context.res.cookie("rToken", refreshToken, {secure: true, httpOnly: true, maxAge: LIFE_RT * 1000, sameSite: "none"})
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
        const {token, rToken} = args.input
        let returnContent = ""
          jwt.verify(token, PRIVATE_CODE_AT, async function(err, decoded) {
            if (!err) {
              const taikhoan = await TaiKhoan.findByPk(decoded.tentaikhoan)
              
              if (taikhoan.maquyen == 1) {
                returnContent = {
                  status: 400,
                  message: "Bạn không có quyền vào trang quản trị!",
                }
                return
              }
              const accessToken = jwt.sign(taikhoandangnhap, PRIVATE_CODE_AT, {expiresIn: LIFE_AT})
              const refreshToken = jwt.sign(taikhoandangnhap, PRIVATE_CODE_RT, {expiresIn: LIFE_RT})
              returnContent = {
                status: 200,
                message: "Đăng nhập thành công!"
              }
              return
            }
            else {
              jwt.verify(rToken, PRIVATE_CODE_RT,async function(err, decoded) {
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
                      const accessToken = jwt.sign(taikhoandangnhap, PRIVATE_CODE_AT, {expiresIn: LIFE_AT})
                      const refreshToken = jwt.sign(taikhoandangnhap, PRIVATE_CODE_RT, {expiresIn: LIFE_RT})
                      context.res.cookie("token", accessToken, {secure: true, httpOnly: true, maxAge: LIFE_AT * 1000, sameSite: "none"})
                      context.res.cookie("rToken", refreshToken, {secure: true, httpOnly: true, maxAge: LIFE_RT * 1000, sameSite: "none"})
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
          const {ma, ten} = args.input
          const taikhoan = await TaiKhoan.findByPk(ma)
          await taikhoan.update({ten})
          await taikhoan.save()
          transaction.commit()
          return {
            status: STATUS_CODE.update_success,
            message: "Sửa tài khoản thành công!",
          }
        } 
        catch(e) {
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
          const {ma, ten} = args.input
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
        catch(e) {
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