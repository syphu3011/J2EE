import * as React from 'react';
import axios from 'axios';

import LayoutPage from '../components/layout';
import "../style/leftbar.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../components/pagecontent/loginpage';



function Admin() {
    return (
        <BrowserRouter>
            {/* <Layout /> */}
            <Routes>
                <Route path="/" element={<Login />} ></Route>
                <Route path="/home" element={<LayoutPage />} >
                    
                </Route>
            </Routes>

        </BrowserRouter>
    )
}
export default Admin;
