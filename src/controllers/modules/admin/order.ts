import { request } from "../request";
export async function confirmOrder(id: number) {
  const query = `
    mutation confirmOrder ($id: ID!) {
        xacnhanhoachuyhoadon(input:{
            ma: $id
            matrangthai: 2
        }) {
            status
            message
        } 
    }`;
  const variables = {
    id,
  };
  return request(query, variables);
}
export async function cancelOrder(id: number) {
  const query = `
    mutation cancelOrder ($id: ID!) {
        xacnhanhoachuyhoadon(input:{
            ma: $id
            matrangthai: 3
        }) {
            status
            message
        } 
    }`;
  const variables = {
    id,
  };
  return request(query, variables);
}
export async function getOrders() {
  const query = `
    query getOrders {
        hoadonchuaxuly {
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
                diachi
            }
        } 
    }`;
  return request(query);
}
export async function getHistoryOrders() {
  const query = `
    query getHistoryOrders {
        hoadondaxuly {
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
                diachi
                tongtien
            }
        } 
    }`;
  return request(query);
}
