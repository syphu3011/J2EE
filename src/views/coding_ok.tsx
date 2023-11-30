import * as React from 'react';  
import { getProducts, getProductsWithAllCategory } from "../controllers/modules/customer/products";
import { getAllProduct } from '../controllers/modules/admin/product';
import { postKeyToServer } from '../controllers/modules/key';
import { addCate, getAllCate, removeCate } from '../controllers/modules/admin/cate';
import { blockCustomer, editCustomer, getCustomer, removeCustomer } from '../controllers/modules/admin/customer';
import { editProductInStock, getProductInStock } from '../controllers/modules/admin/productInStock';
import { importProduct, importProductHistory, removeImportProduct } from '../controllers/modules/admin/importProduct';

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
            getProductsWithAllCategory().then((rs) => {
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