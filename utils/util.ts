import { RcFile } from "antd/es/upload";
import { postKeyToServer } from "../src/controllers/modules/key";
import { authentication } from "../src/controllers/modules/admin/login";
import { authentication as authenticationC } from "../src/controllers/modules/customer/login";

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
    const encoder = new TextEncoder()
    const bufView = encoder.encode(str)
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
export const getBase64AndName = (img: RcFile, callback: (url: string, name: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        console.log(reader.result as string)
        callback(reader.result as string, img.name)
    });
    reader.readAsDataURL(img);
    console.log(img)

  };
export const authenticationAdmin = (callback?) => {
    postKeyToServer().then(rsk => {
        authentication().then(rs => {
            callback(rs)
        })
    })
}
export const authenticationCustomer = (callback?) => {
    postKeyToServer().then(rsk => {
        authenticationC().then(rs => {
            callback(rs)
        })
    })
}