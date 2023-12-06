import axios from 'axios';
import CONFIG_CALL from '../../const';
import axios_default from '../../../../utils/axios';
import { encrypt } from '../../../../utils/crypto';
import { request } from '../request';

export async function login(username, password) {
    const rq = `mutation dangNhap($username:String!,$password:String!){dangNhap(input:{tentaikhoan: $username, matkhau: $password}){
        status
        message
        data {
            tenkhachhang
        }
}}` 
    const variables = {
        username: username,
        password: password
    }
    return request(rq, variables)
}
export async function authentication() {
    let rq = `mutation{dangNhapVoiToken{status
    message
    data {
        tenkhachhang
    }}}`
    return request(rq)
}