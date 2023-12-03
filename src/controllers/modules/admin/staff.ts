import { request } from '../request';
export function getProvider() {
    const query = `query getProvider {
        nhacungcap {
            status
            message
            data {
                ma
                ten
                diachi
                dienthoai
                sanpham {
                    ma
                    ten
                    anhminhhoa
                    tenanhminhhoa
                    donvi {
                        ma
                        ten
                    }
                    loai {
                        ma
                        ten
                    }
                }
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
export function addProvider(name: String, address: String, phone_number: String, id_provider_status: number) {
    const query = `mutation addProvider($name: String!, $address: String!, $phone_number: String!, $id_provider_status: Int!) {
        taoNhaCungCap (input: {
            ten: $name,
            diachi: $address,
            dienthoai: $phone_number,
            matrangthaincc: $id_provider_status
        }){
            status
            message
        }
    }
    `
    const variables = {
        name, address, phone_number, id_provider_status
    }
    return request(query,variables)
}
export function editProvider(id: number,name: String, address: String, phone_number: String, id_provider_status: number) {
    const query = `mutation editProvider($id: Int!, $name: String!, $address: String!, $phone_number: String!, $id_provider_status: Int!) {
        suaNhaCungCap (input: {
            ma: $id,
            ten: $name,
            diachi: $address,
            dienthoai: $phone_number,
            matrangthaincc: $id_provider_status
        }){
            status
            message
        }
    }
    `
    const variables = {
        id, name, address, phone_number, id_provider_status
    }
    return request(query, variables)
}
export function removeProvider(id: number) {
    const query = `mutation removeProvider($id: Int!) {
        xoaNhaCungCap(input:{ma: $id}){
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