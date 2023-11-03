import axios from 'axios';
import CONFIG_CALL from '../../const';
import axios_default from '../../../../utils/axios';
import { encrypt } from '../../../../utils/crypto';
import { request } from '../request';

export async function signup(name, birthday, username, password, confirm_password, phone_number) {
    let rq = `mutation dangKyKhachHang($name: String!, $birthday: String!,$username:String!,$password:String!, $confirm_password:String!, $phone_number: String!){
        dangKyKhachHang(input:{
            tentaikhoan: $username, matkhau: $password, ten: $name, ngaysinh: $birthday, xacnhanmatkhau: $confirm_password, sodienthoai: $phone_number})
            {status
            message
        }}`
    const variables = {
                    name, birthday, confirm_password, phone_number,
                    username: username,
                    password: password,
                }
    return request(rq, variables)
}