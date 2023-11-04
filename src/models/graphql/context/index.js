
const {verifyToken} = require('../../utils/jwt_u')
const { AuthenticationError } = require('apollo-server-express');



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
