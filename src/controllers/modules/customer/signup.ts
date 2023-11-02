import axios from 'axios';
import CONFIG_CALL from '../../const';
import axios_default from '../../../../utils/axios';
import { encrypt } from '../../../../utils/crypto';

export async function signup(name, birthday, username, password, confirm_password, phone_number) {
    let rq = `mutation dangKyKhachHang($name: String!, $birthday: String!,$username:String!,$password:String!, $confirm_password:String!, $phone_number: String!){
        dangKyKhachHang(input:{
            tentaikhoan: $username, matkhau: $password, ten: $name, ngaysinh: $birthday, xacnhanmatkhau: $confirm_password, sodienthoai: $phone_number})
            {status
            message
        }}`
    try {
        const rsRegis = axios_default.post(CONFIG_CALL.DEFAULT_URL,
            {
                query: rq, variables: {
                    name, birthday, confirm_password, phone_number,
                    username: username,
                    password: password,
                }
            })
        let rs = rsRegis.then(response => {
            return response.data
        }
        ).catch(e => {
            console.log(e)
            return {
                status: 400,
                message: "Có lỗi xảy ra!",
                data: e
            }
        })
        console.log(rs)
        return rs
    }
    catch (e) {
        console.log(e)
        return {
            status: 400,
            message: "Có lỗi xảy ra!",
            data: null
        }
    }
}