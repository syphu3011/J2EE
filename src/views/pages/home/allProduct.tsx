import React from 'react';
import sale from '../../../views/components/Image/SaleProduct/sale1.png';
import {Image } from "antd";
export default class AllProduct extends React.Component{
     render(){
         return(
          <div>
               <div className='mainAllProduct'>
                    <div className="bannerSale">
                         <Image src={sale}></Image>
                    </div>
                    <div className="sliderProduct">

                    </div>
               </div>
          </div>
         )
     }
}