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
import { BrowserRouter } from 'react-router-dom';
//import ChatApp from '../components/chat/app';
import Footer from "../components/footer/footer";
import ChatApp from '../components/chat/app';
import { authentication } from '../../controllers/modules/customer/login';
import Login from '../components/login/login';
import { postKeyToServer } from '../../controllers/modules/key';
import { requestTo } from '../../controllers/modules/request';
import { authenticationAdmin, authenticationCustomer } from '../../../utils/util';
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
            this.setState({
                isAuth: rs.data.dangNhapVoiToken.status==200,
                isReady: true
            })
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
            this.state.isReady ?(
            <div >
                <Layout>
                    <Header isLogin={this.state.isAuth}/>
                    <PageContent/> 
                   <ChatApp/>
                    <Footer/>
                    
                </Layout>
          </div>): <LoadingPage />
        
   ) }  
}  