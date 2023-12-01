
const {verifyToken} = require('../../utils/jwt_u')
const { AuthenticationError } = require('apollo-server-express');



module.exports = async ({ req, res }) => {
  const token = (req.cookies && req.cookies.token) || '';
  const rToken = (req.cookies && req.cookies.rToken) || '';
  let taikhoan = null
  for (const key in req.body.variables) {
    if (typeof req.body.variables[key] == "string"){
      if (req.body.variables[key].includes("khongduocdat@@@@@@@")){
        req.body.variables[key] = req.body.variables[key].replaceAll("khongduocdat@@@@@@@","");
        req.body.variables[key] = Number.parseInt(req.body.variables[key])
      }
    }
  }
  if ((token || rToken)) {
    taikhoan = await verifyToken(token, rToken, res)
  }
  res.setHeader('Access-Control-Allow-Origin', process.env.ORIGIN);
  return {taikhoan, res, req};
};
