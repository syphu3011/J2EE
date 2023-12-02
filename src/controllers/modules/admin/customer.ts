import { request } from "../request"

export async function getCustomer() {
    const query =  `
    query getCustomer {
        khachhang {
            status
            message
            data {
                ma
                ten
                ngaysinh
                sodienthoai
                tentaikhoan
                ngaythamgia
                trangthai {
                    ma
                    ten
                }
            }
        }
    }
    `
    return request(query)
}
export async function editCustomer(id: number, name: String, birth: String, phone_number: String){
    // chuyển ngày sinh về String trước, có thể tham khảo đăng ký bên Vy
    // dạng ngày sinh "yyyy-mm-dd"
    const query =  `
    mutation editCustomer ($id: ID, $name: String!, $birth: String!, $phone_number: String!) {
        suaKhachHang(input:{ma: $id, ten: $name, ngaysinh: $birth, sodienthoai: $phone_number}) {
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
export async function blockCustomer(id: number ){
    const query =  `
    mutation blockCustomer ($id: ID, $id_status: Int!) {
        chuyenTrangThaiKhachHang(input:{ma: $id, matrangthai: $id_status}) {
            status
            message
        }
    }
    `
    const variables = {
        id, id_status: 2
    }
    return request(query, variables)
}
export async function openCustomer(id: number ){
    const query =  `
    mutation openCustomer ($id: ID, $id_status: Int!) {
        chuyenTrangThaiKhachHang(input:{ma: $id, matrangthai: $id_status}) {
            status
            message
        }
    }
    `
    const variables = {
        id, id_status: 1
    }
    return request(query, variables)
}
export async function removeCustomer(id: number) {
    const query =  `
    mutation removeCustomer ($id: Int!) {
        xoaKhachHang(ma: $id) {
            status
            message
        }
    }
    `
    const variables = {
        id
    }
    return request(query, variables)
}