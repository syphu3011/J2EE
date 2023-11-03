const {TaiKhoan} = require('../../database/models')
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
const { LIFE_AT, LIFE_RT, PRIVATE_CODE_AT, PRIVATE_CODE_RT } = require('../const');
const decrypt = require('../../utils/crypto');
const { set_token } = require('../../utils/token');
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
    throw new AuthenticationError(error.message);
  }
};

module.exports = async ({ req, res }) => {
  const token = (req.cookies && req.cookies.token) || '';
  const rToken = (req.cookies && req.cookies.rToken) || '';
  let taikhoan = null
  if ((token || rToken)) {
    taikhoan = await verifyToken(token, rToken, res)
  }
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  return {taikhoan, res, req};
};
