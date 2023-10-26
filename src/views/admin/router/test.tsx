import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout";
import Login from "../components/pagecontent/loginpage";
import React from 'react';
import {Routes,Route} from 'react-router-dom';
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
import ContentAdmin from "../components/pagecontent/content";

const router = createBrowserRouter([
    {
      path:'/',
      element: <Login />,
      children: [
        {
          index: true,
          element: <Login />
        },
        {
          path: '/home',
          element: <Layout />
        },
      ]
    },
  
   {
      element: <ContentAdmin />,
      children: [
        {
          path: '/home',
          element: <HomeAdmin/>
        },
        {
            path: '/Customers',
            element: <Customer/>
          },

  ]}
])

export default router ;
