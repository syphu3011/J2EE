const { Op, literal } = require("sequelize")
const {KhachHang, NhanVien, TaiKhoan, sequelize} = require("../../database/models")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {STATUS_CODE, PRIVATE_CODE_AT, PRIVATE_CODE_RT, LIFE_AT, LIFE_RT} = require("../const")

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
            data: {
              tentaikhoan: tentaikhoan,
              maquyen: maquyen,
              accessToken: jwt.sign(taikhoandangnhap, PRIVATE_CODE_AT, {expiresIn: LIFE_AT}),
              refreshToken: jwt.sign(taikhoandangnhap, PRIVATE_CODE_RT, {expiresIn: LIFE_RT})
            }
          }
        } 
        catch(e) {
          transaction.rollback()
          return {
            status: STATUS_CODE.create_fail,
            message: "Bị lỗi! Thêm tài khoản không thành công!",
            data: {
              accessToken: null,
              refreshToken: null
            }
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
            context.res.cookie("token", jwt.sign(taikhoandangnhap, PRIVATE_CODE_AT, {expiresIn: LIFE_AT}), {secure: true, httpOnly: true, maxAge: LIFE_AT * 1000, sameSite: "none"})
            context.res.cookie("rToken", jwt.sign(taikhoandangnhap, PRIVATE_CODE_RT, {expiresIn: LIFE_RT}), {secure: true, httpOnly: true, maxAge: LIFE_RT * 1000, sameSite: "none"})
            return {
              status: 200,
              message: "Đăng nhập thành công!",
              data: {
                accessToken: accessToken,
                refreshToken: refreshToken
              }
            }
          }
        }
        return {
          status: 400,
          message: "Tên tài khoản hoặc mật khẩu không chính xác!",
          data: {
            accessToken: null,
            refreshToken: null
          }
        }
      },
      async dangNhapVoiToken(root, args, context) {
        const {token, rToken} = args.input
        let returnContent = ""
          jwt.verify(token, PRIVATE_CODE_AT, async function(err, decoded) {
            if (!err) {
              const taikhoan = await TaiKhoan.findByPk(decoded.tentaikhoan)
              if (taikhoan) {
                returnContent = {
                  status: 200,
                  message: "Đăng nhập thành công!",
                  data: {
                    accessToken: token,
                    refreshToken: rToken
                  }
                }
                return
              }
            }
            else {
              jwt.verify(rToken, PRIVATE_CODE_RT,async function(err, decoded) {
                if (!err) {
                  const taikhoandangnhap = {
                    tentaikhoan: decoded.tentaikhoan,
                    maquyen: decoded.maquyen
                  }
                  const taikhoan = await TaiKhoan.findByPk(decoded.tentaikhoan)
                  if (taikhoan) {
                    returnContent = {
                      status: 200,
                      message: "Đăng nhập thành công!",
                      data: {
                        accessToken: jwt.sign(taikhoandangnhap, PRIVATE_CODE_AT, {expiresIn: LIFE_AT}),
                        refreshToken: jwt.sign(taikhoandangnhap, PRIVATE_CODE_RT, {expiresIn: LIFE_RT})
                      }
                    }
                    return
                  }
                }
                else {
                  returnContent = {
                    status: 400,
                    message: "Phiên đăng nhập đã hết!",
                    data: {
                      accessToken: null,
                      refreshToken: null
                    }
                  }
                  return
                }
              })
            }
          })
        return returnContent
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
                  data: null
                }
                return
              }
              returnContent = {
                status: 200,
                message: "Đăng nhập thành công!",
                data: {
                  accessToken: token,
                  refreshToken: rToken
                }
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
                        data: null
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
                        data: null
                      }
                      return
                    }
                    else {
                      const taikhoandangnhap = {
                        tentaikhoan: decoded.tentaikhoan,
                        maquyen: decoded.maquyen
                      }
                      returnContent = {
                        status: 200,
                        message: "Đăng nhập thành công!",
                        data: {
                          maquyen: decoded.maquyen,
                          accessToken: jwt.sign(taikhoandangnhap, PRIVATE_CODE_AT, {expiresIn: LIFE_AT}),
                          refreshToken: jwt.sign(taikhoandangnhap, PRIVATE_CODE_RT, {expiresIn: LIFE_RT})
                        }
                      }
                      return
                    }
                  }
                }
                else {
                  returnContent = {
                    status: 400,
                    message: "Phiên đăng nhập đã hết!",
                    data: {
                      accessToken: null,
                      refreshToken: null
                    }
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
            data: taikhoan
          }
        } 
        catch(e) {
          transaction.rollback()
          return {
            status: STATUS_CODE.update_fail,
            message: "Bị lỗi! Sửa tài khoản không thành công!",
            data: []
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
            data: taikhoan
          }
        } 
        catch(e) {
          transaction.rollback()
          return {
            status: STATUS_CODE.update_fail,
            message: "Bị lỗi! Xóa tài khoản không thành công!",
            data: []
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