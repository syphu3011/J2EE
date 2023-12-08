import { request } from '../request';
export function top5customer(from: String, to: String, type: number) {
    // type == 1 is soluonghoadon
    // type == 2 is tongtienn
    // from and to must be yyyy-mm-dd
    const query = `query top5customer($from: String!, $to: String!, $type: Int!){
        thongketop5khachhang (input: {
            tu: $from,
            den: $to,
            kieuthongke: $type
        }) {
            status 
            message
            data {
                hang
                ma
                ten
                tongtien
                soluonghoadon
            }
        }
    }`
    const variables = {
        from, to, type
    }
    return request(query, variables)
}
export function top5staff(from: String, to: String, type: number) {
    // type == 1 is soluonghoadon
    // type == 2 is tongtienn
    // from and to must be yyyy-mm-dd
    const query = `query top5staff($from: String!, $to: String!, $type: Int!){
        thongketop5nhanvien (input: {
            tu: $from,
            den: $to,
            kieuthongke: $type
        }) {
            status 
            message
            data {
                hang
                ma
                ten
                tongtien
                soluongxacnhan
            }
        }
    }`
    const variables = {
        from, to, type
    }
    return request(query, variables)
}
export function top10product(from: String, to: String, type: number) {
    // type == 1 is soluonghoadon
    // type == 2 is tongtienn
    // from and to must be yyyy-mm-dd
    const query = `query top10product($from: String!, $to: String!, $type: Int!){
        thongketop10sanpham (input: {
            tu: $from,
            den: $to,
            kieuthongke: $type
        }) {
            status 
            message
            data {
                hang
                ma
                ten
                soluongban
                tiennhap
                tienban
                loinhuan
            }
        }
    }`
    const variables = {
        from, to, type
    }
    return request(query, variables)
}
export function statistics_revenue_month(from: String, to: String, type: number) {
    // type == 1 is thoigian
    // type == 2 is thu
    // type == 3 is chi
    // type == 4 is loinhuan
    // from and to must be yyyy-mm-dd
    const query = `query statistics_revenue_month($from: String!, $to: String!, $type: Int!){
        thongkedoanhthutheothang (input: {
            tu: $from,
            den: $to,
            kieuthongke: $type
        }) {
            status 
            message
            data {
                thoigian
                thu
                chi
                loinhuan
            }
        }
    }`
    const variables = {
        from, to, type
    }
    return request(query, variables)
}
export function statistics_revenue_days(from: String, to: String, type: number) {
    // type == 1 is thoigian
    // type == 2 is thu
    // type == 3 is chi
    // type == 4 is loinhuan
    // from and to must be yyyy-mm-dd
    const query = `query statistics_revenue_month($from: String!, $to: String!, $type: Int!){
        thongkedoanhthutheongay (input: {
            tu: $from,
            den: $to,
            kieuthongke: $type
        }) {
            status 
            message
            data {
                thoigian
                thu
                chi
                loinhuan
            }
        }
    }`
    const variables = {
        from, to, type
    }
    return request(query, variables)
}