import { request } from '../request';

export async function login(username, password) {
    const rq = `mutation dangNhapAdmin($username:String!,$password:String!){dangNhapAdmin(input:{tentaikhoan: $username, matkhau: $password}){status
message
data {
    chucnang
    otp
}
}}` 
    const variables = {
        username: username,
        password: password
    }
    return request(rq, variables)
}
export async function authentication() {
    let rq = `mutation{dangNhapAdminVoiToken{status
        message
        data {
            chucnang
            otp
        }
    }}`
    return request(rq)
}