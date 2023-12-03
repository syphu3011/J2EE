import * as React from 'react';  
import { getProducts, getProductsWithAllCategory} from "../controllers/modules/customer/products";
import { getAllProduct } from '../controllers/modules/admin/product';
import { postKeyToServer } from '../controllers/modules/key';
import { addCate, getAllCate, removeCate } from '../controllers/modules/admin/cate';
import { blockCustomer, editCustomer, getCustomer, removeCustomer } from '../controllers/modules/admin/customer';
import { editProductInStock, getProductInStock } from '../controllers/modules/admin/productInStock';
import { importProduct, importProductHistory, removeImportProduct } from '../controllers/modules/admin/importProduct';
import { addProvider, editProvider, getProvider, removeProvider } from '../controllers/modules/admin/provider';
import { addPrivileges, editPrivileges, getPrivileges, removePrivileges } from '../controllers/modules/admin/privileges';

export default class Coding_ok extends React.Component<any, any>   
{   
    constructor(props) {
        super(props);
        this.state = {
            test: ""
        }
    }   
    componentDidMount () {
        const self = this
        async function removeImport () {
            const ar = [41,42]
            for (const i of ar) {
                try {
                    const rs = await removeImportProduct(i)
                    console.log(rs)
                    self.setState({
                        test: self.state.test + JSON.stringify(rs) + '\n'
                    })
                }
                catch(e) {
                    console.log(e)
                    self.setState({
                        test: self.state.test +JSON.stringify(e) + '\n'
                    })
                }
            }
        }
        async function testProvider(number) {
            let rs = await addProvider("Thử nghiệm thêm nhà cung cấp", "Quận 7", "0334171858", 1)
            self.setState({
                test: self.state.test + JSON.stringify(rs) + '\n'
            })
            rs = await editProvider(number, "Thử nghiệm sửa nhà cung cấp", "Quận 7", "0334171858", 1)
            self.setState({
                test: self.state.test + JSON.stringify(rs) + '\n'
            })
            rs = await removeProvider(number)
            self.setState({
                test: self.state.test + JSON.stringify(rs) + '\n'
            })
        }
        async function testPrivileges(number) {
            // let rs = await getPrivileges()
            // self.setState({
            //     test: self.state.test + JSON.stringify(rs) + '\n'
            // })
            // let rs = await addPrivileges("Thử nghiệm thêm quyền", [{ma: 1},{ma: 3},{ma:4},{ma: 6},{ma: 7},{ma: 8}])
            // self.setState({
            //     test: self.state.test + JSON.stringify(rs) + '\n'
            // })
            // let rs = await editPrivileges(number, "Thử nghiệm sửa quyền", [{ma: 1},{ma: 3},{ma:4},{ma: 6},{ma: 7},{ma: 8},{ma: 9},{ma: 10},{ma: 11},{ma:12}])
            // self.setState({
            //     test: self.state.test + JSON.stringify(rs) + '\n'
            // })
            let rs = await removePrivileges(number)
            self.setState({
                test: self.state.test + JSON.stringify(rs) + '\n'
            })
        }
        postKeyToServer().then(rsk => {
            // importProduct(1,1,[{masanpham: 1, makichco: 1, mamau: 1,soluong: 40,gianhap: 100000, giaban: 200000},
            //     {masanpham: 6, makichco: 1, mamau: 1,soluong: 40,gianhap: 100000, giaban: 200000},
            //     {masanpham: 12, makichco: 1, mamau: 1,soluong: 40,gianhap: 100000, giaban: 200000}], "ok").then(rs => {
            //         this.setState({
            //             test: JSON.stringify(rs)
            //         })
            //         importProduct(2,2,[{masanpham: 1, makichco: 1, mamau: 1,soluong: 40,gianhap: 100000, giaban: 200000},
            //             {masanpham: 6, makichco: 1, mamau: 1,soluong: 40,gianhap: 100000, giaban: 200000},
            //             {masanpham: 12, makichco: 1, mamau: 1,soluong: 40,gianhap: 100000, giaban: 200000}], "ok").then(rs => {
            //                 this.setState({
            //                     test: JSON.stringify(rs)
            //                 })
            //             })
            //     })
            // removeImport()
            // getProductsWithAllCategory().then((rs) => {
            //     this.setState({
            //         test: JSON.stringify(rs)
            //     })
            // })

            // getProvider().then(rs => {
            //     this.setState({
            //         test: JSON.stringify(rs)
            //     })
            // })
            // testProvider(5)
            // testPrivileges(5)
            // editCustomer(1, 'Nguyễn Văn Sỹ Phú', '2002-11-30', '0334171858').then(rs => {
            //     this.setState({
            //         test: JSON.stringify(rs)
            //     })
            // })
            getProductsWithAllCategory().then(rs => {
                this.setState({
                    test: JSON.stringify(rs)
                })
            })
        })
    }
    render() {  
        
        return (
            <div >
               {JSON.stringify(this.state.test)} 
          </div>
        
   ) }  
}  