import { request } from '../request';
export function getAllUnit() {
    const query = `query getUnit {
        donvi {
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
export function addUnit(name: String) {
    const query = 
    `mutation addUnit($name: String!) {
        taoDonVi(input: {
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
export function editUnit(id: number, name: string) {
    const query = 
    `mutation editUnit($id: Int!) {
        suaDonVi(input: {
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
export async function removeUnit(id: number) {
    const query = 
    `mutation xoadonvi($id: Int!) {
        xoaDonVi(ma: $id) {
          status
          message
        }
    }`
    const variables = {
        id
    }
    return request(query, variables)
}
