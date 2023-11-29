const {generateKeyAndIV} = require("./util")
const {readFile} = require("./readfile")
const nodersa = require("node-rsa")

let PRIVATE_KEY
let PUBLIC_KEY
let aeskey
let keyUser = {}
let ARRAY_HAVE_NOT_OTP = []
async function getPrivateKey() {
    PRIVATE_KEY = PRIVATE_KEY ? PRIVATE_KEY : await readFile("server_pem/pem/7N3KJx+lkV09B/8OGvOPBmAqZXLQ.pem")
    return PRIVATE_KEY 
}
async function getPublicKey() {
    PUBLIC_KEY = PUBLIC_KEY ? PUBLIC_KEY : await readFile("server_pem/pem/7N3KJx+lkV09B/ye78d9sHHs839ss.pem")
    return PUBLIC_KEY
}
async function  getAesKey() {
    return aeskey
}
function  createAesKey() {
    aeskey = generateKeyAndIV()
    return aeskey
}
function generateKeyRSAUser(ip) {
    const rsa = new nodersa()
    rsa.generateKeyPair()

    keyUser[ip] = {}
    keyUser[ip].public = rsa.exportKey(['public'])
    keyUser[ip].private = rsa.exportKey(['private'])
    keyUser[ip].private = keyUser[ip].private.replace('-----BEGIN RSA PRIVATE KEY-----','')
    keyUser[ip].private = keyUser[ip].private.replace('-----END RSA PRIVATE KEY-----','')
    keyUser[ip].public = keyUser[ip].public.replace('-----BEGIN PUBLIC KEY-----','')
    keyUser[ip].public = keyUser[ip].public.replace('-----END PUBLIC KEY-----','')
    return keyUser[ip]
}
function pushToKeyUser(data) {
    if (keyUser[data.ip] && keyUser[data.ip].private_client) {
        keyUser[data.ip].old_private_client = keyUser[data.ip].private_client
    }
    if (keyUser[data.ip]) {
        keyUser[data.ip].public = null
        keyUser[data.ip].private = null
        keyUser[data.ip].private_client = null
    }
    else {
        keyUser[data.ip] = {}
    }
    if (data.public && data.private && data.private_client) {
        keyUser[data.ip].public = data.public
        keyUser[data.ip].private = data.private
        keyUser[data.ip].private_client = data.private_client
    }
    else {
        keyUser[data.ip] = null
    }
}
function getKeyUser(user) {
    return keyUser[user]
}
function pushToArrayHaveNotOTP(e) {
    ARRAY_HAVE_NOT_OTP.push(e)
}
function removeFromArrayHaveNotOTP(e) {
    ARRAY_HAVE_NOT_OTP.reduce((ele) => {
        ele != e
    })
}
function getArrayHaveNotOTP() {
    return ARRAY_HAVE_NOT_OTP
}
module.exports = {
    getPublicKey,getPrivateKey, getAesKey, createAesKey, generateKeyRSAUser, pushToKeyUser, getKeyUser, pushToArrayHaveNotOTP, removeFromArrayHaveNotOTP, getArrayHaveNotOTP
}