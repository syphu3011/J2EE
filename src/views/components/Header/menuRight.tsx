import React, { Dispatch, SetStateAction, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {Badge, Button, Drawer, Menu, MenuProps, Modal, Space} from "antd";
import {SearchOutlined,ShoppingCartOutlined,UserOutlined,LoginOutlined,PlusCircleOutlined,EditOutlined,LogoutOutlined } from "@ant-design/icons";
import {SearchItem} from "../search/search";
import Login from "../login/login";
import SignUp from '../login/signup';
import UpdateInformation from '../../pages/editInformation/updateInformation';
import PageCart from '../cart/pageCart';
import { useCart } from 'react-use-cart';
import Search from 'antd/es/input/Search';
import { SearchResult } from '../search/searchList';

const MenuRight =(check:{isLogin: boolean})=>{
     const [results, setResults] = useState([]);
     const {emptyCart}=useCart()
     const [open, setOpen] = useState(false);
     const [isLoggedIn,setIsLoggedIn] = React.useState(check.isLogin);
     const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
    // const [children, setChildren] = React.useState([]);
     const [visible, setVisible] = React.useState(false);    
     const [active, setActive] = React.useState(false);    
     const [activeSignUp,setActiveSignUp] = React.useState(false);
    // const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);
     const {totalItems,isEmpty } = useCart();
     const showDrawer=()=>{
          setOpen(true);
     }
     const onClose = () => {
          setOpen(false);
        };
     const onMess = () => {
          Modal.info({
               content:"Giỏ hàng của bạn hiện tại đang trống!",
          })
        };
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
          setIsLoggedIn(check.isLogin)
        }, [check.isLogin]);
     const  handleLogoutClick=()=>{
          setIsLoggedIn(false);
     }
     const username = "SyPhu"
     const childrenLogin = (): MenuProps['items'] => {
          return isLoggedIn
          ? [
               {
                    icon:<UserOutlined className="large-icon" style={{fontSize:'18px'}} />,
                    label:username,
                    key:"Username",
                    children:[
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
                               onClick: handleLogoutClick,
                              className: "groupIcons"
                            }
                    ]
               }
              ]
            : [
               {
                    label:<UserOutlined className="large-icon" style={{fontWeight:'bolder',fontSize:'25px'}} />,
                    key:"User",
                    children:[
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
                    ] 
               }
                
              ];
     
     }
     const usermenu= childrenLogin()
     return(
          <div className="MenuRight" >
               <Menu className="RightMenu" mode="horizontal"  items={
          [
               {
                    label:<SearchOutlined onClick={handleSearchClick} className="large-icon" style={{fontWeight:'bolder',fontSize:'25px'}}/>,
                    key:"search",
                    
               },{
                    label:<Badge count={totalItems} className="soppingCartIcon" showZero><ShoppingCartOutlined className="large-icon" onClick={showDrawer} style={{fontWeight:'bolder',fontSize:'25px'}} /></Badge>,
                    key:"Cart",
               },{
                    // label:<UserOutlined className="large-icon" style={{fontWeight:'bolder',fontSize:'25px'}} />,
                    // key:"User",
                    
                    // children:childrenLogin(),
                   ...usermenu[0]
               }
          ]
          } />
          <div className={visible?"inputSearch active":"inputSearch"}>
               <SearchItem setResults={setResults}/>
               {
                    results && results.length > 0 && <SearchResult results={results}/>
               
               }
          </div>
          <div className={active?"login-form-container active" :"login-form-container"}>
               <Login onClose={handleLoginFormClose}  isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>          
          </div>
          <div className={activeSignUp?"signup-form-container active":"signup-form-container"}>
               <SignUp onCloseSignUp={handleSignUpFormClose} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
          </div>
          <div>
               <Drawer
                    size='large'
                    title="Giỏ hàng của bạn"
                    onClose={onClose}
                    open={open}
                    extra={
                         <Space>
                         <Button onClick={()=>emptyCart()} className="btn-delete-cart">
                              Xóa tất cả
                         </Button>
                         <Link to={!isEmpty?"/gio-hang/xac-nhan-thong-tin-giao-hang":"#"}>
                         <Button type="primary" onClick={!isEmpty?onClose:onMess}>
                              Thanh toán
                         </Button>
                         </Link>
                         </Space>
                         }
                    >
                         <PageCart/>
               </Drawer>
          </div>
          </div>
     )
}
export default MenuRight;