import { readFile } from "./readfile"
import publickey from "../publickey.pem"
// import privatekey from "../privatekey.pem"

let PUBLIC_KEY
let PRIVATE_KEY
export async function getPrivateKey() {
    // console.log(privatekey)
    // PRIVATE_KEY = PRIVATE_KEY ? PRIVATE_KEY : await readFile(privatekey)
    return PRIVATE_KEY
}
export async function getPublicKey() {
    PUBLIC_KEY = PUBLIC_KEY ? PUBLIC_KEY : await readFile(publickey)
    return PUBLIC_KEY
}