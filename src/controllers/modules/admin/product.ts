import { request } from '../request';
export function getAllProduct() {
    const query = `query getProduct {
        sanpham {
            status
            message
            data {
                ma
                ten
                anhminhhoa
                tenanhminhhoa
                mota
                donvi {
                    ma
                    ten
                }
                loai {
                    ma
                    ten
                }
            }
        }
    }
    `
    return request(query)
}
export function addProduct(name: string, description: string, cate: string[], unit: string, base64Image: string, nameImage: string) {
    const cateInt = cate.map(value => parseInt(value))
    const unitInt = parseInt(unit)
    const query = 
    `mutation addProduct($name: String!, $description: String!, $cateInt: [Int!], $unitInt: Int!, $base64Image: String!, $nameImage: String!) {
        taoSanPham(input: {
            ten: $name,
            anhminhhoa: $nameImage,
            b64anhminhhoa: $base64Image,
            mota: $description,
            maloai: $cateInt,
            madonvi: $unitInt
        }) {
            status
            message
        }
    } `
    const variables = {
        name, description, cateInt, unitInt, base64Image, nameImage
    }
    return request(query, variables)
}
export function editProduct(id: number, name: string, description: string, cate: string[], unit: string, base64Image: string, nameImage: string) {
    const cateInt = cate.map(value => parseInt(value))
    const unitInt = parseInt(unit)
    const query = 
    `mutation editProduct($id: Int!, $name: String!, $description: String!, $cateInt: [Int!], $unitInt: Int!, $base64Image: String!, $nameImage: String!) {
        suaSanPham(input: {
            ma: $id
            ten: $name,
            anhminhhoa: $nameImage,
            b64anhminhhoa: $base64Image,
            mota: $description,
            maloai: $cateInt,
            madonvi: $unitInt
        }) {
            status
            message
        }
    } `
    const variables = {
        id, name, description, cateInt, unitInt, base64Image, nameImage
    }
    return request(query, variables)
}
export function removeProduct(id: number) {
    const query = 
    `mutation removeProduct($id: Int!) {
        xoaSanPham(ma: $id) {
            status
            message
        }
    } `
    const variables = {
        id
    }
    return request(query, variables)
}
export function getAllCategory() {
    const query = `query getCategory {
        loai {
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