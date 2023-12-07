import * as React from 'react';  
//import Test from '../components/test';
import LoadingPage  from '../loadingPage';
import axios from 'axios';
import {Layout} from "antd";
import Header from'../components/Header/header';
import "../Styles/style.css";
import "../Styles/Responsive.css";
import "../components/content/menuCard"
import PageContent from '../components/content/content';
import { BrowserRouter, Outlet } from 'react-router-dom';
//import ChatApp from '../components/chat/app';
import Footer from "../components/footer/footer";
import ChatApp from '../components/chat/app';
import { authentication } from '../../controllers/modules/customer/login';
import Login from '../components/login/login';
import { postKeyToServer } from '../../controllers/modules/key';
import { requestTo } from '../../controllers/modules/request';
import { authenticationAdmin, authenticationCustomer } from '../../../utils/util';
import { getProductsWithAllCategory } from '../../controllers/modules/customer/products';
import { setProductData } from '../components/product/productData';
import Cookies from 'js-cookie';
export default class Main extends React.Component<any, any>   
{   
    constructor(props) {
        super(props);
        this.state = {
            isAuth: false,
            isReady: false
        }
    }   
    componentDidMount () {
        authenticationCustomer((rs) => {
            if (!Cookies.get('isLoaded')) {
                getProductsWithAllCategory().then(rsp => {
                    let productWithCategory = rsp.data.loaiLon.data;
                    let allProducts = []
                    for (const category of productWithCategory) {
                        let productData1 = category.sanpham;
                        allProducts.push(...productData1)
                    }
                    setProductData(rsp, allProducts).then (rsss => {
                        Cookies.set('isLoaded', 'true', {expires:1})
                        this.setState({
                            isAuth: rs.data.dangNhapVoiToken.status==200,
                            isReady: true
                        })
                    })
                })
            }
            else {
                this.setState({
                    isAuth: rs.data.dangNhapVoiToken.status==200,
                    isReady: true
                })
            }
        })
        let isProcessedClose = false
        window.addEventListener('onbeforeunload', function (e) {  
            e.preventDefault()
            requestTo('/close').then(rs => {
                window.close();
            }).catch(e => {
                window.close()
            })
        }); 
    }
    render() {  
        
        return (
            <div >
                <Layout style={!this.state.isReady ? {display: 'none'} : {}}>
                    <Header isLogin={this.state.isAuth}/>
                    {this.state.isReady?<Outlet/>:<></>}
                    <ChatApp isReady={this.state.isReady}/>
                    <Footer/>
                    
                </Layout>
                {!this.state.isReady?<LoadingPage />:<></>}
          </div>
        
   ) }  
}  