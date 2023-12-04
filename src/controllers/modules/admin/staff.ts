import { request } from '../request';
export function getStaff() {
    const query = `query getStaff {
        nhanvien {
            status
            message
            data {
                ma
                ten
                ngaysinh
                sodienthoai
                socccd
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

export function addStaff(name: String, birth: String, phone_number: String, id_staff: String) {
    const query = `mutation addStaff($name: String!, $birth: String!, $phone_number: String!, $id_staff: String!) {
        themNhanVien (input: {
            ten: $name
            ngaysinh: $birth
            sodienthoai: $phone_number
            socccd: $id_staff
            matrangthai: 1
        }){
            status
            message
        }
    }
    `
    const variables = {
        name, birth, id_staff, phone_number
    }
    return request(query,variables)
}
export function editStaff(id: number, name: String, birth: String, phone_number: String, id_staff: String, id_staff_status: number) {
    const query = `mutation editStaff($id: Int!,$name: String!, $birth: String!, $phone_number: String!, $id_staff: String!, $id_staff_status: Int!) {
        suaNhanVien (input: {
            ma: $id,
            ten: $name
            ngaysinh: $birth
            sodienthoai: $phone_number
            socccd: $id_staff
            matrangthai: $id_staff_status
        }){
            status
            message
        }
    }
    `
    const variables = {
        id, name, birth, id_staff, phone_number, id_staff_status
    }
    return request(query, variables)
}
export function removeStaff(id: number) {
    const query = `mutation removeStaff($id: Int!) {
        xoaNhanVien(ma: $id){
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
export function grantAccount(id_staff: number, username: String, password: String, id_privileges: number) {
    const query = `mutation grantAccount($id_staff: Int!, $username: String!, $password: String!,$id_privileges: Int!) {
        captaikhoan(input:{
            manhanvien: $id_staff,
            tentaikhoan: $username,
            matkhau: $password,
            maquyen: $id_privileges
        }){
            status
            message
        }
    }
    `
    const variables = {
        id_staff, username, password, id_privileges
    }
    return request(query, variables)
}
export function removeAccount(username: String) {
    const query = `mutation removeAccount($username: String!) {
        xoataikhoan(input:{
            tentaikhoan: $username,
        }){
            status
            message
        }
    }
    `
    const variables = {
        username
    }
    return request(query, variables)
}