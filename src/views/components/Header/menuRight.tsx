import React from 'react';
import { useNavigate } from "react-router-dom";
import {Menu} from "antd";
import {SearchOutlined,ShoppingCartOutlined,UserOutlined,LoginOutlined,PlusCircleOutlined,EditOutlined,LogoutOutlined } from "@ant-design/icons";
import SearchItem from "../search/search";
import Login from "../login/login";
import SignUp from '../login/signup';
import UpdateInformation from '../../pages/editInformation/updateInformation';

const MenuRight =()=>{
     const [isLoggedIn,setIsLoggedIn] = React.useState(false);
     const [children, setChildren] = React.useState([]);
     const [visible, setVisible] = React.useState(false);    
     const [active, setActive] = React.useState(false);    
     const [activeSignUp,setActiveSignUp] = React.useState(false);
     const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);
     const handleSearchClick = () => {
          setVisible(!visible);
        };
     const handleLoginClick =() => {
          setActive(!active);
          setActiveSignUp(false)
     };
     const handleLoginFormClose = () => {
          setActive(false);
        };
     const handleSignUpClick = () =>{
          setActiveSignUp(!activeSignUp);
          setActive(false);
     }
     const handleSignUpFormClose = ()=>{
          setActiveSignUp(false);
     }
     const navigate = useNavigate();
     const handleUpdateClick=(item)=>{
          navigate(`/${item.key}`);
          //setIsFormSubmitted(true);
     }
     React.useEffect(() => {
          const childrenUpdate = isLoggedIn
            ? [
                {
                  icon: <EditOutlined className="large-icon" />,
                  label: "Cập nhật thông tin",
                  onClick:  handleUpdateClick,
                  key: "cap-nhat-thong-tin",
                  className: "groupIcons"
                },
                {
                  icon: <LogoutOutlined className="large-icon" />,
                  label: "Đăng xuất",
                  key: "logout",
                  // onClick: handleLogoutClick,
                  className: "groupIcons"
                }
              ]
            : [
                {
                  icon: <LoginOutlined className="large-icon" />,
                  label: "Đăng nhập",
                  onClick: handleLoginClick,
                  key: "login",
                  className: "groupIcons"
                },
                {
                  icon: <PlusCircleOutlined className="large-icon" />,
                  label: "Đăng ký",
                  key: "createAccount",
                  onClick: handleSignUpClick,
                  className: "groupIcons"
                }
              ];
      
          setChildren(childrenUpdate);
        }, [isLoggedIn]);
     return(
          <div className="MenuRight" >
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
                    
                    children:children,

               }
          ]
          } />
          <div className={visible?"input active":"input"}>
               <SearchItem/>
          </div>
          <div className={active?"login-form-container active" :"login-form-container"}>
          <Login onClose={handleLoginFormClose}  isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>          </div>
          <div className={activeSignUp?"signup-form-container active":"signup-form-container"}>
               <SignUp onCloseSignUp={handleSignUpFormClose} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
          </div>
          </div>
     )
}
export default MenuRight;