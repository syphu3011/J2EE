import React from 'react';
import {Menu} from "antd";
import {SearchOutlined,ShoppingCartOutlined,UserOutlined,LoginOutlined,PlusCircleOutlined} from "@ant-design/icons";
 class MenuRight extends React.Component{
     render(){
     return(
          <div className="MenuRight">
               <Menu className="RightMenu" mode="horizontal" style={{height:'80px'}} items={
          [
               {
                    label:<SearchOutlined className="large-icon" style={{fontWeight:'bolder',fontSize:'40px'}}/>,
                    key:"search",
               },{
                    label:<ShoppingCartOutlined className="large-icon" style={{fontWeight:'bolder',fontSize:'40px'}} />,
                    key:"Cart",
               },{
                    label:<UserOutlined className="large-icon" style={{fontWeight:'bolder',fontSize:'40px'}} />,
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
          </div>
     )
}
 }
export default MenuRight;