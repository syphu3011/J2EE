import * as React from 'react';  
//import Test from '../components/test';
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
        postKeyToServer().then(rsKey => {
            authentication().then(rs => {
                console.log(rs)
                this.setState({
                isAuth: rs.data.dangNhapVoiToken.status==200,
                isReady: true
            })})
            
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
                <BrowserRouter>
               
                <Layout>
                    <Header isLogin={this.state.isAuth}/>
                    {this.state.isReady ? <PageContent/> : <></>}
                   <ChatApp/>
                    <Footer/>
                    
                </Layout>
            </BrowserRouter>
          </div>
        
   ) }  
}  