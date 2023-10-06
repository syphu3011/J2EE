import MenuRight from "./menuRight";
import MenuLeft from "./menuLeft";
import React from "react";
class Header extends React.Component{
     render(){
          return(
               <div className="appHeader">
                    <div className="promotionHeader">
                         <p>Giảm giá lên đến <h3>57%</h3> cho khách hàng VIP</p>
                    </div>
                    <div className="menuHeader">
                         <div className ="menu" >
                              <MenuLeft/>
                              <MenuRight/>
                         </div>
                         
                    </div>
                    
               </div>
               
               
          )
     }
}
export default Header;