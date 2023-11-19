import {nfc, nfd, nfkc} from 'unorm'
export function utf8ToB64(str) {
    return window.btoa(str);
}

export function b64ToUtf8(str) {
    return window.atob(str);
}

export function uint8arrayToB64(u8) {
    return Buffer.from(u8).toString('base64')
}
export function b64ToUint8array(b64) {
    return Uint8Array.from(atob(b64), c => c.charCodeAt(0))
}
export function uint8arrayToString(buf) {
    const decoder = new TextDecoder('utf-8')
    const str = decoder.decode(buf)
    return str
}

export function stringToUint8array(str) {
    var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    var bufView = new Uint8Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return bufView;
}
export function generateKeyAndIV() {
    // generate key with 16 byte length == 128 bit
    const key = new Uint8Array(Array.from({ length: 16 }, () => Math.floor(Math.random() * 254)))
    // generate iv with 12 byte length == 96 bit
    const iv = new Uint8Array(Array.from({ length: 12 }, () => Math.floor(Math.random() * 254)))
    return { key, iv }
}
export function convertB64ToImage(b64) {
    return 'data:image/png;base64,' + b64
}