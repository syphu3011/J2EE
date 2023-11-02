import axios from 'axios';
import CONFIG_CALL from '../../const';
import axios_default from '../../../../utils/axios';
import { encrypt } from '../../../../utils/crypto';

export async function login(username, password) {
    let rq = `mutation dangNhap($username:String!,$password:String!){dangNhap(input:{tentaikhoan: $username, matkhau: $password}){status
message
}}`
    try {
        const rsLogin = axios_default.post(CONFIG_CALL.DEFAULT_URL,
            { query: rq, variables: {
                username: username,
                password: password
            }})
        let rs = rsLogin.then(response => {
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
export async function authentication() {
    let rq = `mutation{dangNhapVoiToken{status
message}}`
    try {
        const rsLogin = await axios_default.post(CONFIG_CALL.DEFAULT_URL,
            { query: rq})
        let rs = rsLogin.data.data.dangNhapVoiToken
        if (rs.status == 200) {
            return true
        }
        else {
            return false
        }
    }
    catch (e) {
        console.log(e)
        return false
    }
}