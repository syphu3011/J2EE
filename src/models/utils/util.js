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
    return String.fromCharCode.apply(null, new Uint8Array(buf));
}

function stringToUint8array(str) {
    var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    var bufView = new Uint8Array(buf);
    for (var i=0, strLen=str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
    }
    return bufView;
}
function generateKeyAndIV() {
    const key = new Uint8Array(Array.from({length: 16}, () => Math.floor(Math.random() * 254)))
    const iv = new Uint8Array(Array.from({length: 14}, () => Math.floor(Math.random() * 254)))
    return {key, iv}
}
module.exports = {b64ToUint8array, utf8ToB64, b64ToUtf8, stringToUint8array, uint8arrayToB64, uint8arrayToString, generateKeyAndIV}