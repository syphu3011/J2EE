import { request } from '../request';

export async function login(username, password) {
    const rq = `mutation dangNhap($username:String!,$password:String!){dangNhap(input:{tentaikhoan: $username, matkhau: $password}){status
message
}}` 
    const variables = {
        username: username,
        password: password
    }
    return request(rq, variables)
}
export async function authentication() {
    let rq = `mutation{dangNhapAdmin{status
message}}`
return request(rq)
}