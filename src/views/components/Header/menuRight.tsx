import React from 'react';
import {Menu} from "antd";
import {SearchOutlined,ShoppingCartOutlined,UserOutlined,LoginOutlined,PlusCircleOutlined} from "@ant-design/icons";
import SearchItem from "../search/search";

const MenuRight =()=>{
     const [visible, setVisible] = React.useState(false);    
     const handleSearchClick = () => {
          setVisible(!visible);
        };
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
                    style:{marginRight:'70px'},
                    children:[
                         {
                              icon:<LoginOutlined className="large-icon" />,
                              label:"Đăng nhập",
                              key:"login",
                              className:"groupAo"

                         },
                         {
                              icon:<PlusCircleOutlined className="large-icon" />,
                              label:"Tạo tài khoản",
                              key:"createAccount",
                              className:"groupAo"
                         }
                    ],

               }
          ]
          } />
          <div className={visible?"input active":"input"}>
               <SearchItem/>
          </div>
          </div>
     )
}
export default MenuRight;