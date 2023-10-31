const jwt = require("jsonwebtoken");
const {STATUS_CODE, PRIVATE_CODE_AT, PRIVATE_CODE_RT, LIFE_AT, LIFE_RT} = require("../graphql/const");
function set_token(res, taikhoan) {
    const accessToken = jwt.sign(taikhoan, PRIVATE_CODE_AT, {expiresIn: LIFE_AT})
    const refreshToken = jwt.sign(taikhoan, PRIVATE_CODE_RT, {expiresIn: LIFE_RT})
    res.cookie("token", accessToken, {secure: true, httpOnly: true, maxAge: LIFE_AT * 1000, sameSite: "none"})
    res.cookie("rToken", refreshToken, {secure: true, httpOnly: true, maxAge: LIFE_RT * 1000, sameSite: "none"})
}
module.exports = {set_token}