import { request } from '../request';
export function getProductInStock() {
    const query = `query getProductInStock {
        hangtrongkho {
            status
            message
            data {
                masanpham
                phieunhap {
                    ma
                    ngaynhap
                }
                tensanpham
                loai {
                    ma
                    ten
                }
                mau {
                    ma
                    ten
                }
                kichthuoc {
                    ma
                    ten
                }
                ncc {
                    ma
                    ten
                }
                gianhap
                giaban
            }
        }
    }
    `
    return request(query)
}
export function editProductInStock(id_prod: number, id_import: number, id_color: number, id_size: number, price: number) {
    const query = `
    mutation getProductInStock($id_prod: Int, $id_import: Int, $id_color: Int, $id_size: Int, $price: Int) {
        suaHangTrongKho(input: {masanpham: $id_prod, maphieunhap: $id_import, mamau: $id_color, makichco: $id_size, giaban: $price}) {
            status
            message
        }
    }
    `
    const variables = {
        id_prod, id_import, id_color, id_size, price
    }
    return request(query, variables)
}