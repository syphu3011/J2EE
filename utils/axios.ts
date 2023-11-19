import axios from "axios";
import CONFIG_CALL from "../src/controllers/const";
import { decrypt, decrypt_all, decryptrsa, encrypt, encrypt_all, encryptrsa, generateKeyRSA } from "./crypto";
import { b64ToUint8array, generateKeyAndIV, uint8arrayToB64 } from "./util";
import jsencrypt from "jsencrypt";
import { getIsFirst, getPrivateNew, getPublicNew, setIsFirst, setKeyNew } from "./constant";
const axios_default = axios.create({
    withCredentials: true,
    headers: {
      'Content-Type': 'text/plain',
      "Access-Control-Allow-Origin": "http://localhost:8080",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": 'Origin, X-Requested-With, Content-Type, Accept, hello, wait'
    },

})
axios_default.interceptors.response.use(async function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.data) {
      const privateKey = getPrivateNew()
      const keyaes = b64ToUint8array(await decryptrsa(response.headers.hello, privateKey))
      const ivaes = b64ToUint8array(await decryptrsa(response.headers.wait, privateKey))
      const aeskey = {key: keyaes, iv: ivaes}
      // decrypt and parse to json
      let data_decrypted = await decrypt(response.data.data, aeskey)
      const closing_brace_index = data_decrypted.lastIndexOf('}') + 1;
      data_decrypted = data_decrypted.slice(0, closing_brace_index);
      response.data = JSON.parse(data_decrypted)
      console.log(response.data)
    }
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error)
    return Promise.reject(error);
  });
  axios_default.interceptors.request.use(async function(request) {
    // get key
    const aeskey = generateKeyAndIV()
    const keyb64 = uint8arrayToB64(aeskey.key)
    const ivb64 = uint8arrayToB64(aeskey.iv)
    
    // encrypt all data send to server in body
    const pkey = getIsFirst() ? null : getPublicNew()
    console.log(keyb64+"keyb64");
    
    request.headers.custom1 = await encryptrsa(keyb64, pkey)
    request.headers.custom2 = await encryptrsa(ivb64, pkey)
    request.headers.custom3 = await encrypt((await generateKeyRSA()).public, aeskey)
    if (request.data) {
      if (request.data.variables && request.data.variables.private && request.data.variables.public) {
        setIsFirst(false)
        request.headers.what_this =  await encryptrsa('truee', null)
        // setKeyNew(request.data.variables.public,request.data.variables.private)
      }
      else {
        request.headers.what_this =  await encryptrsa('false', null)
      }
      console.log(JSON.stringify(request.data));
      request.data = await encrypt(JSON.stringify(request.data), aeskey)
      console.log(request.data)
      
      // request.data = await encrypt_all(request.data, aeskey)
    }
    // add misleading headers
    request.headers.i_dont_know = Math.random().toString(36).slice(-8)
    request.headers.how =  Math.random().toString(36).slice(-8)
    request.headers.who_are_you = Math.random().toString(36).slice(-8)
    return request  
  })
export default axios_default