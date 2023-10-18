import * as React from 'react';  
import axios from 'axios';

import Layout from '../components/layout';
import "../style/leftbar.css";
import { BrowserRouter } from 'react-router-dom';

export default class Admin extends React.Component<any, any>   
{  
    render() {  
        return (
                <BrowserRouter>
                    <><Layout /></>
                </BrowserRouter>
   ) }  
}  