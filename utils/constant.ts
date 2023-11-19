import { readFile } from "./readfile"
import publickey from "../publickey.pem"
// import privatekey from "../privatekey.pem"

let PUBLIC_KEY
let PRIVATE_KEY
let PUBLIC_KEY_NEW
let PRIVATE_KEY_NEW
let IS_FIRST = true
export async function getPrivateKey() {
    // console.log(privatekey)
    // PRIVATE_KEY = PRIVATE_KEY ? PRIVATE_KEY : await readFile(privatekey)
    return PRIVATE_KEY
}
export async function getPublicKey() {
    PUBLIC_KEY = PUBLIC_KEY ? PUBLIC_KEY : readFile('/publickey.pem')
    return PUBLIC_KEY 
}
export function setKey(publicK, privateK)  {
    PUBLIC_KEY = publicK
    PRIVATE_KEY = privateK
}
export function setKeyNew(publicN, privateN) {
    PUBLIC_KEY_NEW = publicN
    PRIVATE_KEY_NEW = privateN
}
export function setPublicNew(publicN){
    PUBLIC_KEY_NEW = publicN
}
export function setPrivateNew(privateN){
    PRIVATE_KEY_NEW = privateN
}
export function getPublicNew(){
    return PUBLIC_KEY_NEW
}
export function getPrivateNew(){
    return PRIVATE_KEY_NEW
}
export function getIsFirst() {
    return IS_FIRST
}
export function setIsFirst(isFirst) {
    IS_FIRST = isFirst
}