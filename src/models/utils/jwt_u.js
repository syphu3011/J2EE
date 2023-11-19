const jwt = require('jsonwebtoken');
const { set_token } = require('../utils/token');
const {TaiKhoan} = require('../database/models')
// const decrypt = require('../../utils');
const { LIFE_AT, LIFE_RT, PRIVATE_CODE_AT, PRIVATE_CODE_RT } = require('../graphql/const');
function jwtVerify(token, secret) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        // if (err) return reject(err);
        resolve({err,decoded});
      });
    });
  }
const verifyToken = async (token, rtoken, res) => {
    try {
      const rs = (await jwtVerify(token, PRIVATE_CODE_AT))
      // console.log(rs.err)
      if (!rs.err) {
        const taikhoandangnhap = {
          tentaikhoan: rs.decoded.tentaikhoan,
          maquyen: rs.decoded.maquyen
        }
        await set_token(res, taikhoandangnhap)
        return await TaiKhoan.findByPk(rs.decoded.tentaikhoan);
      }
      else {
        const rf = (await jwtVerify(rtoken, PRIVATE_CODE_RT))
        if  (!rf.err) {
          const taikhoandangnhap = {
            tentaikhoan: rf.decoded.tentaikhoan,
            maquyen: rf.decoded.maquyen
          }
          await set_token(res, taikhoandangnhap)
          return await TaiKhoan.findByPk(rf.decoded.tentaikhoan);
        }
        return null
      }
    } catch (error) {
        console.log(error)
      return false
    }
  };
module.exports = {jwtVerify,verifyToken}