const jwt = require("jsonwebtoken");
const decrypt = require("./crypto")
const {STATUS_CODE, PRIVATE_CODE_AT, PRIVATE_CODE_RT, LIFE_AT, LIFE_RT} = require("../graphql/const");
async function set_token(res, taikhoan) {
    let data = {
        token: jwt.sign(taikhoan, PRIVATE_CODE_AT, {expiresIn: LIFE_AT}),
        rToken:jwt.sign(taikhoan, PRIVATE_CODE_RT, {expiresIn: LIFE_RT})
    }
    data = await decrypt.encrypt_all_with_key(data)
    res.cookie("token", data.token, {secure: true, httpOnly: true, maxAge: LIFE_AT * 1000, sameSite: "none"})
    res.cookie("rToken", data.rToken, {secure: true, httpOnly: true, maxAge: LIFE_RT * 1000, sameSite: "none"})
    res.cookie("key", data.key.key, {secure: true, httpOnly: true, maxAge: LIFE_RT * 1000, sameSite: "none"})
    res.cookie("iv", data.key.iv, {secure: true, httpOnly: true, maxAge: LIFE_RT * 1000, sameSite: "none"})
    return data
}

module.exports = {set_token}