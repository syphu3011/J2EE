import jsencrypt from "jsencrypt";
import aes from 'js-crypto-aes'
import { b64ToUint8array, b64ToUtf8, stringToUint8array, uint8arrayToB64, uint8arrayToString, utf8ToB64 } from "./util";
import { readFile } from "./readfile";
import {getPrivateKey, getPublicKey} from "./constant";
let publicKeyForServer
let privateKeyForClient
export async function encrypt(data, aeskey) {
    if (typeof data == "number") {
        data = data + "khongduocdat@@@@@@@"
    }
    data = data.replace(/  /g," ")
    //aes
    const key = aeskey.key
    const iv = aeskey.iv
    var encrypted_aes = await aes.encrypt(stringToUint8array(data),key, {name: 'AES-CTR',iv,tagLength: 16})
    const b64_encrypted_aes = uint8arrayToB64(encrypted_aes)
    return b64_encrypted_aes
}
export async function encrypt_all(data, aeskey) {
    for (let key in data) {
        if (typeof data[key] === 'object') {
            data[key] = await encrypt_all(data[key], aeskey)
        }
        else {
            data[key] = await encrypt(data[key], aeskey); 
        }
    }
    return data
}
export async function decrypt(data, aeskey) {
    //aes
    const key = aeskey.key
    const iv = aeskey.iv
    const uint8_aes = b64ToUint8array(data)
    const data_d = await aes.decrypt(uint8_aes, key, {name: 'AES-CTR',iv,tagLength: 16})
    const decrypted = uint8arrayToString(data_d)
    return decrypted ? decrypted : ""
}
export async function decrypt_all(data, aeskey) {
    if (data) {
        for (const key in data) {
            if (key == "key") {
                continue
            }
            if (typeof data[key] === 'object') {
                data[key] = await decrypt_all(data[key], aeskey)
            }
            else {
                data[key] = (await decrypt(data[key], aeskey)).replace(/\\n/g, '\n');
            }
        }
    }
    return data
}
export async function encryptrsa(data, pkey=null) {
    const key = pkey ? pkey : await getPublicKey()
    const rsa = new jsencrypt()
    rsa.setPublicKey(key)
    return rsa.encrypt(data)
}
export async function decryptrsa(data ,pkey=null) {
    const key = pkey ? pkey : (await generateKeyRSA()).private
    const rsa = new jsencrypt()
    rsa.setPrivateKey(key)
    return rsa.decrypt(data)
}
export async function generateKeyRSA() {
    const rsa = new jsencrypt({default_key_size: '1024'})
    if (!publicKeyForServer || !privateKeyForClient) {
        publicKeyForServer = rsa.getPublicKey()
        privateKeyForClient = rsa.getPrivateKey()
    }
    return {public: publicKeyForServer, private: privateKeyForClient}
}
