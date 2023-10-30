import axios from "axios";
import CONFIG_CALL from "../src/controllers/const";
import { decrypt, decrypt_all, decryptrsa, encrypt, encrypt_all, encryptrsa } from "./crypto";
import { generateKeyAndIV, uint8arrayToB64 } from "./util";
import jsencrypt from "jsencrypt";
const axios_default = axios.create({
    withCredentials: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },

})
axios_default.interceptors.response.use(async function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error)
    return Promise.reject(error);
  });
  axios_default.interceptors.request.use(async function(request) {
    const aeskey = generateKeyAndIV()
    const keyb64 = uint8arrayToB64(aeskey.key)
    const ivb64 = uint8arrayToB64(aeskey.iv)
    if (request.data.variables) {
      request.data.variables = await encrypt_all(request.data.variables, aeskey)
    }
    request.data.key = {key: await encryptrsa(keyb64), iv: await encryptrsa(ivb64)}
    return request  
  })
export default axios_default