import React from 'react';
import Home from '../pages/home/home';
import Category from '../pages/category/category';

import {Routes,Route} from 'react-router-dom';
import UpdateInformation from '../pages/editInformation/updateInformation';
import ProductDetail from '../components/product/productDetail';
import DeliveryInform from '../components/cart/deliveryInform';
import CategoryMediate from '../pages/category/CategoryMediate';
export default class AppRoutes extends React.Component {
     render(){
          return(
               <Routes>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path="/:categoryId" element={<CategoryMediate/>}></Route>
                    <Route path="/cap-nhat-thong-tin" element={<UpdateInformation/>}></Route>
                    <Route path="/products/:Id" element={<ProductDetail/>}></Route>
                    <Route path="/gio-hang/xac-nhan-thong-tin-giao-hang" element={<DeliveryInform />}></Route>
               </Routes>
          )
     }
}
