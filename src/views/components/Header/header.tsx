import MenuRight from "./menuRight";
import MenuLeft from "./menuLeft";
import React from "react";
class Header extends React.Component{
     state = {
          prevScrollPos: window.screenY,
          isVisible: true
        };
      
        componentDidMount() {
          window.addEventListener("scroll", this.handleScroll);
        }
      
        componentWillUnmount() {
          window.removeEventListener("scroll", this.handleScroll);
        }
      
        handleScroll = () => {
          const { prevScrollPos } = this.state;
          const currentScrollPos = window.scrollY;
          const isVisible = prevScrollPos > currentScrollPos || currentScrollPos === 0;
          this.setState({
            prevScrollPos: currentScrollPos,
            isVisible
          });
        };
     render(){
          const { isVisible } = this.state;
          return(
               <div className="appHeader">
                    <div className="promotionHeader">
                         <p>Giảm giá lên đến <h3>57%</h3> cho khách hàng VIP</p>
                    </div>
                    <div className={`menuHeader ${isVisible ? "visible" : "hidden"}`}>
                         <div className ="menu" >
                              <MenuLeft />
                              <MenuRight/>
                         </div>
                         
                    </div>
                    
               </div>
               
               
          )
     }
}
export default Header;