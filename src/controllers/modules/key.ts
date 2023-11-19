import JSEncrypt from "jsencrypt";
import axios_default from "../../../utils/axios";
import { getPrivateNew, getPublicNew, setKey, setKeyNew, setPrivateNew, setPublicNew } from "../../../utils/constant";
import CONFIG_CALL from "../const";
import { request, requestTo } from "./request";
export async function postKeyToServer(){
    // generate 2 couple key
    const keyRsa = new JSEncrypt({default_key_size: '2048'})
    const keyRsa2 = new JSEncrypt({default_key_size: '2048'})
    // set key public and private at client 
    setPublicNew(keyRsa.getPublicKey())
    setPrivateNew(keyRsa2.getPrivateKey())
    // send to server
    return requestTo('/api', {variables: 
        {private: keyRsa.getPrivateKey(), 
        public: keyRsa2.getPublicKey(), 
        private_client: getPrivateNew()}})
}
