import Cookies from "js-cookie"
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
        loaicon {
          ma
          ten
        }
      }
    }
  }
  `


  const data_product = await request(rq)

  return data_product
}
// export async function getProductsWithAllCategoryT() {
//   const rq = `
//   query getproductwithcate {
//     loaiLon {
//       status
//       message
//       data {
//         ma
//         ten
//         mota
//         sanpham {
//           ma
//           ten
//           mota
//           gia
//           mathang {
//             mau {
//               ma
//               ten
//             }
//             kichco {
//               ma 
//               ten
//             }
//             giaban
//             soluong
//           }
//           donvi {
//             ten
//           }
//           loai {
//             ten
//             loaicon {
//               ten
//             }
//           }
//         }
//       }
//     }
//   }
//   `
//   // const data_cookies = Cookies.get('data_product')
//   let data_product
//   // if (data_cookies) {
//   //   data_product = JSON.parse(data_cookies)
//   // }
//   // if (data_product) {
//   //   return data_product
//   // }
//   // else {
//     data_product = await request(rq)
//     Cookies.set('data_product', JSON.stringify(data_product), {expires: 1})
//     return data_product
//   // }
// }