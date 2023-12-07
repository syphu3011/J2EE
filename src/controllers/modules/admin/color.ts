import { request } from '../request';
export function getAllColor() {
    const query = `query getColor {
        mau {
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
export function addColor(name: String) {
    const query = 
    `mutation addColor($name: String!) {
        taoMau(input: {
            ten: $name
        }) {
            status
            message
        }
    } `
    const variables = {
        name
    }
    return request(query, variables)
}
export function editColor(id: number, name: string) {
    const query = 
    `mutation editColor($id: Int!) {
        suaMau(input: {
            ma: $id,
            ten: $name
        }) {
            status
            message
        }
    } `
    const variables = {
        id, name
    }
    return request(query, variables)
}
export async function removeColor(id: number) {
    const query = 
    `mutation xoamau($id: Int!) {
        xoaMau(ma: $id) {
          status
          message
        }
    }`
    const variables = {
        id
    }
    return request(query, variables)
}
