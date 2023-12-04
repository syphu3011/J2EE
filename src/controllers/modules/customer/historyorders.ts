import { request } from '../request';

export async function getHistoryOrders() {
    const query = `
    query getHistoryOrders {
        lichsudonhang {
            status
            message
            data {
                ma
                ngaylap
                sanpham {
                    mahoadon
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
                    phieunhap {
                        ma
                        ngaynhap
                    }
                    soluong
                    gia
                }
                nhanvien {
                    ma
                    ten
                }
                khachhang {
                    ma
                    ten
                }
                trangthaihoadon {
                    ma
                    ten
                }
                email
                sodienthoai
            }
        } 
    }`
    return request(query)
}