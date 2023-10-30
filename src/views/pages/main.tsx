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
import { authentication } from '../../controllers/modules/login';
import Login from '../components/login/login';
import { encrypt } from '../../../utils/crypto';
export default class Main extends React.Component<any, any>   
{   
    constructor(props) {
        super(props);
        this.state = {
            isAuth: false
        }
    }   
    componentDidMount () {
        authentication().then(rs => this.setState({
            isAuth: rs
        }))
    }
    render() {  
        
        return (
            <div >
                <BrowserRouter>
               
                <Layout>
                    <Header isLogin={this.state.isAuth}/>
                    <PageContent/>
                   <ChatApp/>
                    <Footer/>

                </Layout>
            </BrowserRouter>
          </div>
        
   ) }  
}  