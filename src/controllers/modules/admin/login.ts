import { setIsLogin, setIsOTP } from '../../../../utils/constant';
import { request } from '../request';

export async function login(username, password) {
    const rq = `mutation dangNhapAdmin($username:String!,$password:String!){dangNhapAdmin(input:{tentaikhoan: $username, matkhau: $password}){status
message
data {
    chucnang
}
}}` 
    const variables = {
        username: username,
        password: password
    }
    return request(rq, variables)
}
export async function otp(otp) {
    const rq = `mutation otp($otp:String!){xacThucOTP(input:{otp: $otp}){status
message
data {
    tentaikhoan
    chucnang
}
}}` 
    const variables = {
        otp: otp
    }
    return request(rq, variables)
}
export async function authentication() {
    let rq = `mutation{dangNhapAdminVoiToken{status
        message
        data {
            tentaikhoan
            chucnang
        }
    }}`
    const rs = await request(rq)
    if (rs.data.dangNhapAdminVoiToken.status == 200) {
        setIsLogin(true)
        setIsOTP(true)
    }
    return rs
}