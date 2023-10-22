import * as React from 'react';  
//import Test from '../components/test';
import axios from 'axios';
import {Layout} from "antd";
import Header from'./../components/Header/header';
import "../Styles/style.css";
import "../Styles/Responsive.css";
import "../components/content/menuCard"
import PageContent from '../components/content/content';
import { BrowserRouter } from 'react-router-dom';
import ChatApp from '../components/chat/app';
import Footer from "../components/footer/footer";
export default class Main extends React.Component<any, any>   
{  
    so() {
        axios.post 
    }
    render() {  
        return (
            <div >
                <BrowserRouter>
                <Layout>
                    <Header/>
                    <PageContent/>
                    <ChatApp />
                    <Footer/>
                    
                </Layout>
                </BrowserRouter>
                
          </div>
        
   ) }  
}  