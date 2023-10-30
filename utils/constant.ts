import { readFile } from "./readfile"

let PUBLIC_KEY
let PRIVATE_KEY
export async function getPrivateKey() {
    return PRIVATE_KEY ? PRIVATE_KEY : await readFile("../privatekey.pem")
}
export async function getPublicKey() {
    return PUBLIC_KEY ? PUBLIC_KEY : await readFile("../publickey.pem")
}