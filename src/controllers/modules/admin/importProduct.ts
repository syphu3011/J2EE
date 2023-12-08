import { request } from '../request';
export function importProduct(
    id_provider: number, 
    id_staff: number, 
    arr_prod: {
        masanpham: number,
        mamau: number,
        makichco: number,
        soluong: number,
        gianhap: number,
        giaban: number}[],
    note: String) {
    const query = `
    mutation importProduct(
        $id_provider: Int!,
        $id_staff: Int!,
        $arr_prod: [NhapMatHangInput]!,
        $note: String) {
        taoPhieuNhap (
            input: {
                manhanvien: $id_staff,
                manhacungcap: $id_provider,
                ghichu: $note,
                mathang: $arr_prod
            }
        ){
            status
            message
        }
    }
    `
    const variables = {
        id_provider, id_staff, arr_prod, note
    }
    return request(query, variables)
}
export function importProductHistory() {
    const query = `
    query importProductHistory {
        phieunhap{
            status
            message
            data {
                ma
                ngaynhap
                nhacungcap {
                    ma
                    ten
                }
                mathang {
                    sanpham {
                        ma
                        ten
                    }
                    mau {
                        ma
                        ten
                    }
                    kichco {
                        ma 
                        ten
                    }
                    soluong
                    gianhap
                }
                nhanvien {
                    ma
                    ten
                }
            }
        }
    }
    `
    return request(query)
}
export function removeImportProduct(id: number) {
    const query = `
    mutation importProductHistory ($id: Int!){
        xoaPhieuNhap(ma: $id){
            status
            message
        }
    }
    `
    const variables = {id}
    return request(query, variables)
}
export function getProviderProductColorSize() {
    const query = `
    query getProviderProductColorSize {
        sanpham {
            status
            message
            data{
                ma
                ten
            }
        }
        nhacungcap {
            status
            message
            data{
                ma
                ten
            }
        }
        mau {
            status
            message
            data{
                ma
                ten
            }
        }
        kichco{
            status
            message
            data{
                ma
                ten
            }
        }
    }
    `
    return request(query)
}