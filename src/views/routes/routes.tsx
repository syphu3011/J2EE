import React from 'react';
import Home from '../pages/home/home';
import Category from '../pages/category/category';
import HomeAdmin from '../admin/components/pagecontent/home';
import Customer from '../admin/components/pagecontent/customer';
import {Routes,Route} from 'react-router-dom';
export default class AppRoutes extends React.Component {
     render(){
          return(
               <Routes>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path="/:categoryId" element={<Category/>}></Route>
               </Routes>
          )
     }
}
