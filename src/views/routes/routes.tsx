import React from 'react';
import Home from '../pages/home/home';
import Category from '../pages/category/category';
import HomeAdmin from '../admin/components/pagecontent/home';
import Customer from '../admin/components/pagecontent/customer';
import {Routes,Route} from 'react-router-dom';
import UpdateInformation from '../pages/editInformation/updateInformation';
import ProductDetail from '../components/product/productDetail';
export default class AppRoutes extends React.Component {
     render(){
          return(
               <Routes>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path="/:categoryId" element={<Category/>}></Route>
                    <Route path="/cap-nhat-thong-tin" element={<UpdateInformation/>}></Route>
                    <Route path="/products/:Id/:nameId" element={<ProductDetail/>}></Route>
               </Routes>
          )
     }
}
