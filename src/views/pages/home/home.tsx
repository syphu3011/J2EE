import React from 'react';
import BannerHeader from '../../components/banner/Banerheader';
import MenuCard     from '../../components/content/menuCard';
export default class Home extends React.Component{
     render(){
          return(
               <div>
                    <div className="banner">
                        <BannerHeader/>
                    </div>
                    <div className="cards-grid">
                        <MenuCard/>
                    </div>
                    <div className="main">
                    <div className="allProduct">
                         <div>
                              <h3>TỔNG SẢN PHẨM</h3>
                         </div>
                    </div>
                    <div className="main">
                         
                    </div>
                    </div>
               </div>
          )
     }
}