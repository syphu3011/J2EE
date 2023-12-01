import JSEncrypt from "jsencrypt";
import axios_default from "../../../utils/axios";
import { getPrivateNew, getPublicNew, setIsFirst, setKey, setKeyNew, setPrivateNew, setPublicNew } from "../../../utils/constant";
import CONFIG_CALL from "../const";
import { request, requestTo } from "./request";
import crypto from 'crypto'
export async function postKeyToServer(){
    if (getPublicNew()) {
        console.log(getPublicNew())
        // setIsFirst(false)
        return ""
    }
    // console.log(require('crypto').webcrypto)
    // window.crypto= crypto.webcrypto;
    // generate 2 couple key
    const keyRsa = new JSEncrypt({default_key_size: '1024'})
    const keyRsa2 = new JSEncrypt({default_key_size: '1024'})
    // set key public and private at client 
    setPublicNew(keyRsa.getPublicKey())
    setPrivateNew(keyRsa2.getPrivateKey())
    // send to server
    return requestTo('/api', {variables: 
        {private: keyRsa.getPrivateKey(), 
        public: keyRsa2.getPublicKey(), 
        private_client: getPrivateNew()}})
}
