import React from 'react';
import {Menu} from "antd";
import {SearchOutlined,ShoppingCartOutlined,UserOutlined,LoginOutlined,PlusCircleOutlined} from "@ant-design/icons";
import SearchItem from "../search/search";
import Login from "../login/login";
import SignUp from '../login/signup';

const MenuRight =()=>{
     const [visible, setVisible] = React.useState(false);    
     const [active, setActive] = React.useState(false);    
     const [activeSignUp,setActiveSignUp] = React.useState(false);
     const handleSearchClick = () => {
          setVisible(!visible);
        };
     const handleLoginClick =() => {
          setActive(!active);
     };
     const handleLoginFormClose = () => {
          setActive(false);
        };
     const handleSignUpClick = () =>{
          setActiveSignUp(!activeSignUp);
     }
     const handleSignUpFormClose = ()=>{
          setActiveSignUp(false);
     }
     return(
          <div className="MenuRight">
               <Menu className="RightMenu" mode="horizontal"  items={
          [
               {
                    label:<SearchOutlined onClick={handleSearchClick} className="large-icon" style={{fontWeight:'bolder',fontSize:'25px'}}/>,
                    key:"search",
                    
               },{
                    label:<ShoppingCartOutlined className="large-icon" style={{fontWeight:'bolder',fontSize:'25px'}} />,
                    key:"Cart",
               },{
                    label:<UserOutlined className="large-icon" style={{fontWeight:'bolder',fontSize:'25px'}} />,
                    key:"User",
                    
                    children:[
                         {
                              icon:<LoginOutlined className="large-icon"  />,
                              label:"Đăng nhập",
                              onClick:handleLoginClick,
                              key:"login",
                              className:"groupIcons"

                         },
                         {
                              icon:<PlusCircleOutlined className="large-icon" />,
                              label:"Đăng ký",
                              key:"createAccount",
                              onClick:handleSignUpClick,
                             className:"groupIcons"
                         }
                    ]

               }
          ]
          } />
          <div className={visible?"input active":"input"}>
               <SearchItem/>
          </div>
          <div className={active?"login-form-container active" :"login-form-container"}>
               <Login onClose={handleLoginFormClose}/>
          </div>
          <div className={activeSignUp?"signup-form-container active":"signup-form-container"}>
               <SignUp onCloseSignUp={handleSignUpFormClose}/>
          </div>
          </div>
     )
}
export default MenuRight;