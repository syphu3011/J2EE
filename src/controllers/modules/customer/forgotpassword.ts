import axios_default from "../../../../utils/axios"
import CONFIG_CALL from "../../const"
import { request } from "../request"

export async function forgotpassword(username) {
    let rq = `mutation quenMatKhauKhachHang($username:String!){quenMatKhauKhachHang(input:{tentaikhoan: $username}){status
message
}}`
    const variables = {
        username: username
    }
    return request(rq, variables)
}
