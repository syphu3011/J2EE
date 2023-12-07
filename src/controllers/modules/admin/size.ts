import { request } from '../request';
export function getAllSize() {
    const query = `query getSize {
        kichco {
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
export function addSize(name: String) {
    const query = 
    `mutation addSize($name: String!) {
        taoKichCo(input: {
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
export function editSize(id: number, name: string) {
    const query = 
    `mutation editSize($id: Int!) {
        suaKichCo(input: {
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
export async function removeSize(id: number) {
    const query = 
    `mutation xoakichco($id: Int!) {
        xoaKichCo(ma: $id) {
          status
          message
        }
    }`
    const variables = {
        id
    }
    return request(query, variables)
}
