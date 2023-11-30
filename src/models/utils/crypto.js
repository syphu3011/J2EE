const node_rsa = require("node-rsa")
const aes = require('js-crypto-aes')
const {b64ToUint8array, uint8arrayToString, stringToUint8array, uint8arrayToB64} = require("./util")
const {readFile} = require('./readfile')
const { getPrivateKey, getPublicKey, createAesKey } = require("./constant")
const { LIFE_AT, LIFE_RT, PRIVATE_CODE_AT, PRIVATE_CODE_RT } = require('../graphql/const');
// const decrypt = require('../../utils/');
async function decrypt(data, aeskey) {
    //aes
    const key = aeskey.key
    const iv = aeskey.iv
    const uint8_aes = b64ToUint8array(data)
    const uint8_decrypted = await aes.decrypt(uint8_aes, key, {name: 'AES-CTR',iv,tagLength: 16})
    const decrypted = uint8arrayToString(uint8_decrypted)
    return decrypted ?   decrypted : ""
}

async function decrypt_all(data, aeskey) {
    if (data) {
        for (const key in data) {
            if (typeof data[key] === 'object') {
                data[key] = await decrypt_all(data[key], aeskey)
            }
            else {
                if(data[key]) {
                    data[key] = (await decrypt(data[key], aeskey)).replaceAll('\\n', '\n').replaceAll("\0","");
                }
            }
        }
    }
    return data
}
async function encrypt(data, aeskey) {
    //aes
    const key = aeskey.key
    const iv = aeskey.iv
    var encrypted_aes = await aes.encrypt(stringToUint8array(data),key, {name: 'AES-CTR',iv,tagLength: 16})
    const b64_encrypted_aes = uint8arrayToB64(encrypted_aes)
    return b64_encrypted_aes
}
async function encrypt_all(data,aeskey) {
    for (let key in data) {
        if (typeof data[key] === 'object') {
            data[key] = await encrypt_all(data[key],aeskey)
        }
        else {
            data[key] =  await encrypt(data[key],aeskey); 
        }
    }
    
    return data
}
async function encrypt_all_with_key(data, key_rsa, res) {
    const key = createAesKey()
    data = await encrypt_all(data, key)
    data.key = {key:await encryptrsa(uint8arrayToB64(key.key), key_rsa), iv: await encryptrsa(uint8arrayToB64(key.iv), key_rsa)}
    res.setHeader('hello', data.key.key)
    res.setHeader('wait',data.key.iv)
    return data
}
async function encrypt_with_key(data, key_rsa, res) {
    const key = createAesKey()
    data = await encrypt(data, key)
    res.setHeader('hello', await encryptrsa(uint8arrayToB64(key.key), key_rsa))
    res.setHeader('wait',await encryptrsa(uint8arrayToB64(key.iv), key_rsa))
    return data
}
async function decryptrsa(data, key = null) {
    try {
        const private_key = !key ? await getPrivateKey():key
        const rsa = new node_rsa(private_key)
        rsa.setOptions({ encryptionScheme: 'pkcs1' });
        const decrypted_rsa = rsa.decrypt(data, 'utf8')
        return decrypted_rsa
    }
    catch(e) {
        console.log(e)
        return ""
    }
}
async function encryptrsa(data, key) {
    const rsa = new node_rsa(key)
    rsa.setOptions({ encryptionScheme: 'pkcs1' });
    const encrypted_rsa = rsa.encrypt(data, 'base64', 'utf8')
    return encrypted_rsa
}
async function encrypt_token(taikhoandangnhap) {
    let data = {
        token: jwt.sign(taikhoandangnhap, PRIVATE_CODE_AT, {expiresIn: LIFE_AT}),
        rToken:jwt.sign(taikhoandangnhap, PRIVATE_CODE_RT, {expiresIn: LIFE_RT})
    }
    data = await decrypt.encrypt_all_with_key(data)
    return data
}
module.exports = { encrypt_all_with_key,decrypt_all, encrypt_all, decryptrsa, decrypt, encrypt,encrypt_with_key}
