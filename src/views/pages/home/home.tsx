import React from 'react';
import BannerHeader from '../../components/banner/Banerheader';
import MenuCard     from '../../components/content/menuCard';
import AllProduct from './allProduct';
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
                         <AllProduct/>
                    </div>
               </div>
          )
     }
}