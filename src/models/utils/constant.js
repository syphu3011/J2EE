const {generateKeyAndIV} = require("./util")
const {readFile} = require("./readfile")

let PRIVATE_KEY
let PUBLIC_KEY
let aeskey
async function getPrivateKey() {
    return PRIVATE_KEY ? PRIVATE_KEY : await readFile("server_pem/pem/7N3KJx+lkV09B/8OGvOPBmAqZXLQ.pem")
}
async function getPublicKey() {
    return PUBLIC_KEY ? PUBLIC_KEY : await readFile("server_pem/pem/7N3KJx+lkV09B/ye78d9sHHs839ss.pem")
}
async function  getAesKey() {
    return aeskey
}
async function  createAesKey() {
    aeskey = generateKeyAndIV()
    return aeskey
}
module.exports = {
    getPublicKey,getPrivateKey, getAesKey, createAesKey
}