import axios from "axios";
import CONFIG_CALL from "../src/controllers/const";
import { decrypt, decrypt_all, decryptrsa, encrypt, encrypt_all, encryptrsa } from "./crypto";
import { generateKeyAndIV, uint8arrayToB64 } from "./util";
import jsencrypt from "jsencrypt";
const axios_default = axios.create({
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "http://localhost:8080",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": 'Origin, X-Requested-With, Content-Type, Accept'
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
    request.headers.custom1 = await encryptrsa(keyb64)
    request.headers.custom2 = await encryptrsa(ivb64)
    request.headers.what_this =  Math.random().toString(36).slice(-8)
    request.headers.i_dont_know = Math.random().toString(36).slice(-8)
    request.headers.how =  Math.random().toString(36).slice(-8)
    request.headers.who_are_you = Math.random().toString(36).slice(-8)
    return request  
  })
export default axios_default