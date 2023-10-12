import * as React from 'react';  
//import Test from '../components/test';
import axios from 'axios';
import {Layout} from "antd";
import Leftbar from '../components/leftbar';
import "../style/leftbar.css";
import { BrowserRouter } from 'react-router-dom';

export default class Admin extends React.Component<any, any>   
{  
    render() {  
        return (
                <BrowserRouter>
                    <><Leftbar /></>
                </BrowserRouter>

        
   ) }  
}  