import { request } from '../request';
export function buy(id_customer: number, address: string, phone_number: string, email: string, products: {
    masanpham: number,
    mamau: number,
    makichco: number, 
    soluong: number
}[]) {
    const query = `
    mutation buy ($id_customer: ID!, $address: String!, $phone_number: String!, $email: String!, $products: [ChiTietHoaDonInput]) {
        taoHoaDon(input: {
            makhachhang: $id_customer,
            diachi: $address,
            email: $email,
            sodienthoai: $phone_number,
            sanpham: $products
        }) {
            status
            message
        }
    }
    `
    const variables = {
        id_customer, address, products
    }
    return request(query, variables)
}
export async function cancelOrder(id: number) {
    const query = `
    mutation cancelOrder($id: ID!) {
        xacnhanhoachuyhoadon(input:{
            ma: $id
            matrangthai: 3
        }) {
            status
            message
        } 
    }`
    const variables = {
        id
    }
    return request(query, variables)
}