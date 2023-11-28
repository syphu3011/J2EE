const fs = require('fs') 
const path = require("path")
const {resolve} = require('path') 
function utf8ToB64(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode(parseInt(p1, 16))
    }))
}

function b64ToUtf8(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
}

function uint8arrayToB64(u8) {
    return Buffer.from(u8).toString('base64')
}
function b64ToUint8array(b64) {
    return Uint8Array.from(atob(b64), c => c.charCodeAt(0))
}
function uint8arrayToString(buf) {
    const decoder = new TextDecoder('utf-8')
    const str = decoder.decode(buf)
    return str
}

function stringToUint8array(str) {
    // var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    // var bufView = new Uint8Array(buf);
    // for (var i=0, strLen=str.length; i < strLen; i++) {
    // bufView[i] = str.charCodeAt(i);
    // }
    const encoder = new TextEncoder()
    const bufView = encoder.encode(str)
    return bufView;
}
function generateKeyAndIV() {
    const key = new Uint8Array(Array.from({length: 16}, () => Math.floor(Math.random() * 254)))
    const iv = new Uint8Array(Array.from({length: 14}, () => Math.floor(Math.random() * 254)))
    return {key, iv}
}
function fetchImageB64(imageName) {
    try {
        const image = fs.readFileSync("image/" + imageName) 
        const imageBase64 = new Buffer(image).toString('base64') 
        return imageBase64
    }
    catch {
        return ""
    }
}
function addImage(anhminhhoa, b64anhminhhoa) {
    // kiểm tra ảnh có tồn tại chưa
    let count = 0
    let check_existed = false
    const ext = path.extname(anhminhhoa).replace('.', '')
    const name_image = anhminhhoa.replace(ext, "")
    var base64Data = b64anhminhhoa.replace(`data:image\/${ext};base64,`, "");
    if (fs.existsSync('image' + '/' + anhminhhoa)) {
        const b64Exist = fs.readFileSync('image' + '/' + anhminhhoa, { encoding: 'base64' })
        if (base64Data !== b64Exist) {
            while (fs.existsSync('image' + '/' + name_image + (count == 0 ? "" : "_" + count) + "." + ext)) {
                count++
            }
        }
        else {
            check_existed = true
        }
    }
    // thêm ảnh nếu chưa tồn tại
    if (!check_existed) {
        fs.writeFileSync('image' + '/' + name_image + (count == 0 ? "" : "_" + count) + "." + ext, base64Data, 'base64');
    }
    return {
        repeat: count,
        ext,
        name_image
    }
}
module.exports = {b64ToUint8array, utf8ToB64, b64ToUtf8, stringToUint8array, uint8arrayToB64, uint8arrayToString, generateKeyAndIV, fetchImageB64, addImage}