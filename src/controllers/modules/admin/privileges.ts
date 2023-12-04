import { request } from '../request';
export function getPrivileges() {
    const query = `query getPrivileges {
        quyen {
            status
            message
            data {
                ma
                ten
                chucnang {
                    ma
                    ten
                }
            }
        }
    }
    `
    return request(query)
}
export function getFeatures() {
    const query = `query getFeatures {
        chucnang {
            status
            message
            data {
                ma
                ten
            }
        }
    }
    `
    return request(query)
}
export function addPrivileges(name: String, features: {ma: number}[]) {
    // features is list id of ChucNang
    const query = `mutation addProvider($name: String!, $features: [QuyenChucNang]) {
        taoQuyen (input: {
            ten: $name,
            chucnang: $features
        }){
            status
            message
        }
    }
    `
    const variables = {
        name, features
    }
    return request(query,variables)
}
export function editPrivileges(id: number, name: String, features: {ma: number}[]) {
    const query = `mutation editProvider($id: ID,$name: String!, $features: [QuyenChucNang]) {
        suaQuyen (input: {
            ma: $id,
            ten: $name,
            chucnang: $features
        }){
            status
            message
        }
    }
    `
    const variables = {
        id, name, features
    }
    return request(query,variables)
}
export function removePrivileges(id: number) {
    const query = `mutation removeProvider($id: Int!) {
        xoaQuyen (ma: $id){
            status
            message
        }
    }
    `
    const variables = {
        id
    }
    return request(query,variables)
}