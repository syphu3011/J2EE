import * as React from 'react';  
//import Test from '../components/test';
import axios from 'axios';
import {Layout} from "antd";
import Header from'./../components/Header/header';
import BannerHeader from "../components/banner/Banerheader";
import "../Styles/style.css";
import "../Styles/Responsive.css";
export default class Main extends React.Component<any, any>   
{  
    so() {
        axios.post 
    }
    render() {  
        return (
            <div>
                <Layout>
                    <Header/>
                    <div className="banner">
                        <BannerHeader/>
                    </div>
                </Layout>
                
          </div>
        
   ) }  
}  