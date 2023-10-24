import axios from 'axios';
import CONFIG_CALL from '../const';
import axios_default from '../../../utils/axios';

export async function login(username, password) {
    // let rq = `mutation{dangNhap(input:{
    //     tentaikhoan: "${username}", 
    //     matkhau: "${password}"}) {
    //     status
    //     message
    //     data {
    //     accessToken
    //     refreshToken
    //     }}
    // }`
    let rq = `
    mutation {
        taoSanPham(input:{
          ten: "SanPham3"
          anhminhhoa: "okok"
          mota:"deplamnha"
          maloai: [1,2,3]
          madonvi: 1
          manhacungcap: [1,2,3]
        }) {
          status
          message
              
        }
        
      }
      `
    try {
    let rs = await axios_default.post("http://127.0.0.1:3301/api", 
        {query: rq,isLoginCus: true}
    ).then(
        result => {
            console.log(result);
            return result.data
        }
    )
    return rs
    }
    catch(e) {
        console.log(e)
    }
}