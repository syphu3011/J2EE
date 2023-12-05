import { request } from '../request';
export async function getAllCategories() {
    const query = `
    query getAllCategories {
        loaikhachhang {
            status
            message
            data {
                ma
                ten
                mota
                tenanhminhhoa
                anhminhhoa
                loaicha {
                    ma
                }
                sanpham {
                    ma
                    ten
                    anhminhhoa
                    mota
                    gia
                    mathang {
                      mau {
                        ma
                        ten
                      }
                      kichco {
                        ma 
                        ten
                      }
                      giaban
                      soluong
                    }
                    donvi {
                      ten
                    }
                    loai {
                      ma
                      ten
                      loaicon {
                        ma
                        ten
                      }
                    }
                }
            }
        }
    }
    `
    const categories = await request(query)
    for (const cate of categories.data.loaikhachhang.data) {
        if (cate.loaicha) {
            const loaicha = categories.data.loaikhachhang.data.find(e => e.ma == cate.loaicha.ma)
            if (loaicha) {
                cate.capbac = loaicha.capbac + 1
            }
            else {
                cate.capbac = 1
            }
        }
        else {
            cate.capbac = 1
        }
    }
    return categories
}