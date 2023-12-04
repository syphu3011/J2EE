import { request } from '../request';
export function buy(id_customer: number, address: string, products: {
    masanpham: number,
    mamau: number,
    makichco: number, 
    soluong: number
}[]) {
    const query = `
    mutation buy ($id_customer: Int!, $address: String!, $products: [ChiTietHoaDonInput]) {
        taoHoaDon(input: {
            makhachhang: $id_customer,
            diachi: $address,
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