import React from 'react';
import {Routes,Route, createBrowserRouter} from 'react-router-dom';
import HomeAdmin from '../components/pagecontent/home';
import Customer from '../components/pagecontent/customer/customer';
import Product from '../components/pagecontent/product/product';
import Order from '../components/pagecontent/Orders/order';
import History from '../components/pagecontent/Orders/historyorder';
import AccountCus from '../components/pagecontent/customer/accountCus';
import Message from '../components/pagecontent/message';
import Typeproduct from '../components/pagecontent/product/typeproduct';
import Inventory from '../components/pagecontent/product/inventory';
import Attribute from '../components/pagecontent/product/attribute';
import Import from '../components/pagecontent/import/importcoupon';
import HisImp from '../components/pagecontent/import/historyImp'
import Login from '../components/pagecontent/loginpage';
import Staff from '../components/pagecontent/staff/staffs';
import AccStaff from '../components/pagecontent/staff/accountStaff';
import Partner from '../components/pagecontent/partner/partnerInfo';
import Provider from '../components/pagecontent/partner/provider';
import StatNumber from '../components/pagecontent/Statistics/StatNumber';
export default function AppRoutesAdmin(){
          
          return( 
                    <Routes>
                    <Route path="/trangchu" element={<HomeAdmin/>}  ></Route>
                    <Route path="/Customers" element={<Customer/>}></Route>
                    <Route path="/AccountCus" element={<AccountCus/>} ></Route>              
                    <Route path="/Products" element={<Product/>} ></Route>
                    <Route path="/TypePro" element={<Typeproduct/>} ></Route>
                    <Route path="/ProInStock" element={<Inventory/>} ></Route>
                    <Route path="/Attribute" element={<Attribute/>} ></Route>
                    <Route path="/Message" element={<Message/>} ></Route>
                    <Route path="/Orders" element={<Order/>} ></Route>
                    <Route path="/HistoryOr" element={<History/>} ></Route>
                    <Route path="/ImportNew" element={<Import/>} ></Route>
                    <Route path="/HistoryImp" element={<HisImp/>} ></Route>
                    <Route path="/InforStaff" element={<Staff/>} ></Route>
                    <Route path="/AccountStaff" element={<AccStaff/>} ></Route>
                    <Route path="/InforPart" element={<Partner/>} ></Route>
                    <Route path="/Provider" element={<Provider/>} ></Route>
                    <Route path="/Number" element={<StatNumber/>} ></Route>
                    </Routes>
              
          )
     }
