import { request } from "../request"

export async function getProducts(id=-1, name="", from=-1, to=-1) {
    const rq = `
    query timkiemsanpham($id: Int, $name: String, $from: Int, $to: Int) {
        timkiemsanpham(input: { ma: $id, ten: $name, gia_tu: $from, gia_den: $to }) {
          status 
          message
          data {
            ma
            ten
            anhminhhoa
            mota
            gia
            mathang {
              mamau
              makichco
              matrangthaisanpham
            }
            donvi {
              ten
            }
            loai {
              ten
              loaicon {
                ten
              }
            }
          }
        }
      }
    `
    const variables = {
        id,
        name, from,to
    }
    return request(rq, variables)
}
export async function getProductsWithAllCategory() {
  const rq = `
  query getproductwithcate {
    loaiLon {
      status
      message
      data {
        ma
        ten
        anhminhhoa
        mota
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
            trangthaisanpham {
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
            ten
            loaicon {
              ten
            }
          }
        }
      }
    }
  }
  `
  return request(rq)
}