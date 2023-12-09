import { request } from '../request';
export function getAllCate() {
    const query = `query getCate {
        loai {
            status
            message
            data {
                ma
                ten
                anhminhhoa
                tenanhminhhoa
                mota
                loaicha {
                    ma
                    ten
                }
            }
        }
    }
    `
    return request(query)
}
export function addCate(name: string, description: string, cate: string, base64Image: string, nameImage: string) {
    const cateInt = parseInt(cate)
    const query = 
    `mutation addCate($name: String!, $description: String!, $cateInt: Int!, $base64Image: String!, $nameImage: String!) {
        taoLoai(input: {
            ten: $name,
            anhminhhoa: $nameImage,
            b64anhminhhoa: $base64Image,
            mota: $description,
            maloaicha: $cateInt
        }) {
            status
            message
        }
    } `
    const variables = {
        name, description, cateInt, base64Image, nameImage
    }
    return request(query, variables)
}
export function editCate(id: number, name: string, description: string, cate: string, base64Image: string, nameImage: string) {
    const cateInt = parseInt(cate)
    const query = 
    `mutation editCate($id: Int!, $name: String!, $description: String!, $cateInt: Int, $base64Image: String!, $nameImage: String!) {
        suaLoai(input: {
            ma: $id
            ten: $name,
            anhminhhoa: $nameImage,
            b64anhminhhoa: $base64Image,
            mota: $description,
            maloaicha: $cateInt
        }) {
            status
            message
        }
    } `
    const variables = {
        id, name, description, cateInt, base64Image, nameImage
    }
    return request(query, variables)
}
export async function removeCate(id: number) {
    const query = 
    `mutation xoaloai($id: Int!) {
        xoaLoai(ma: $id) {
          status
          message
        }
    }`
    const variables = {
        id
    }
    return request(query, variables)
}
