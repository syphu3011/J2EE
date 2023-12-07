import { request } from "../request"

export async function getinformation(){
    const query =  `
    query getinformation {
        thongtinkhachhang{
            status
            message
            data {
                ma
                ten
                ngaysinh
                sodienthoai
                tentaikhoan
            }
        }
    }
    `
    return request(query)
}
export async function changeinformation(id: number, name: String, birth: String, phone_number: String){
    // chuyển ngày sinh về String trước
    // dạng ngày sinh "yyyy-mm-dd"
    const query =  `
    mutation changeinformation ($id: ID, $name: String!, $birth: String!, $phone_number: String!) {
        suaThongTinCaNhan(input:{ma: $id, ten: $name, ngaysinh: $birth, sodienthoai: $phone_number}) {
            status
            message
        }
    }
    `
    const variables = {
        id, name, birth, phone_number
    }
    return request(query, variables)
}