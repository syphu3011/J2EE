import axios_default from "../../../../utils/axios"
import CONFIG_CALL from "../../const"

export async function forgotpassword(username) {
    let rq = `mutation quenMatKhauKhachHang($username:String!){quenMatKhauKhachHang(input:{tentaikhoan: $username}){status
message
}}`
    try {
        const rsGetpassword = axios_default.post(CONFIG_CALL.DEFAULT_URL,
            { query: rq, variables: {
                username: username
            }})
        let rs = rsGetpassword.then(response => {
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
