import {Menu} from "antd";
//import React from "react";
import {CaretDownOutlined} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Test from "../test";
import Thaotest from "../thaotest";
import { useState } from "react";
function MenuLeft(){
     //render(){
     const navigate = useNavigate();
     const [savePath, setSavePath] = useState(decodeURIComponent(window.location.hash.replace("#/","")))
     const onMenuClick = (item)=>{
          if (savePath != item.key) {
               setSavePath(item.key)
               navigate(`/${item.key}`);
          }
          else {
               navigate(`/${item.key}`,{state: {isSame: true}});
          }
     }
     const labelAo=(
          <span>
               Thời trang
               <CaretDownOutlined/>
          </span>
     )
     const labelPhuKien=(
          <span>
               Phụ kiện
               <CaretDownOutlined/>
          </span>
     )
     
     return (
     <div className="menuLeft">
     <Menu onClick={onMenuClick} className="Leftmenu"mode="horizontal" 
                         items={[
                         {
                              label:"Trang chủ",
                              key:"",
                              style:{marginLeft:'50px',marginTop:'5px'},
                         },{
                              label:labelAo,
                              key:"fashion",
                              style:{marginTop:'5px'},
                              children:[
                                   
                                   {
                                        label:"Áo",
                                        key:"Áo",
                                        className:"groupAo",
                                        children:[
                                             {
                                                  label:"Áo thun",
                                                  key:"Áo thun",
                                                  className:"groupAo",
                                             },{
                                                  label:"Áo sơ mi",
                                                  key:"Áo sơ mi",
                                                  className:"groupAo",
                                             },{
                                                  label:"Áo kiểu",
                                                  key:"Áo kiểu",
                                                  className:"groupAo",
                                             },{
                                                  label:"Áo polo",
                                                  key:"Áo polo",
                                                  className:"groupAo",
                                             }
                                             
                                        
                                        ]
                                   },{
                                        label:"Quần",
                                        key:"Quần",
                                        className:"groupAo",
                                        children:[
                                             {
                                                  label:"Quần Jeans",
                                                  key:"Quần Jeans",
                                                  className:"groupAo",
                                             },{
                                                  label:"Quần tây",
                                                  key:"Quần tây",
                                                  className:"groupAo",
                                             },{
                                                  label:"Quần Jogger",
                                                  key:"Quần Jogger",
                                                  className:"groupAo",
                                             },{
                                                  label:"Quần dài vải",
                                                  key:"Quần dài vải",
                                                  className:"groupAo",
                                             }
                                        ]
                                   },{
                                        label:"Đầm và chân váy",
                                        key:"Đầm và chân váy",
                                        className:"groupAo",
                                        children:[
                                             {
                                                  label:"Đầm và jumpsuit",
                                                  key:"Đầm và jumpsuit",
                                                  className:"groupAo",
                                             },{
                                                  label:"Chân váy",
                                                  key:"Chân váy",
                                                  className:"groupAo",
                                             }
                                        ]
                                   },{
                                        label:"Áo khoác",
                                        key:"Áo khoác",
                                        className:"groupAo",
                                        children:[
                                             {
                                                  label:"Áo hoodie",
                                                  key:"Áo hoodie",
                                                  className:"groupAo",
                                             },
                                             {
                                                  label:"Áo Blazer",
                                                  key:"Áo Blazer",
                                                  className:"groupAo",
                                             },{
                                                  label:"Áo chăn bông",
                                                  key:"Áo chăn bông",
                                                  className:"groupAo",
                                             },{
                                                  label:"Áo Parka",
                                                  key:"Áo Parka",
                                                  className:"groupAo",
                                             }
                                        ]
                                        
                                   }
                              ],
               
                         },{
                              label:labelPhuKien,
                              key :"Phụ kiện",
                              style:{marginTop:'5px'},
                              children:[
                                   {
                                        label:"Nón",
                                        key:"Nón",
                                        className:"groupAo",
                                   },{
                                        label:"Nơ cài",
                                        key:"Nơ cài",
                                        className:"groupAo",

                                   },{
                                        label:"Vớ",
                                        key:"Vớ",
                                        className:"groupAo",
                                   },{
                                        label:"Thắt lưng",
                                        key:"Thắt lưng",
                                        className:"groupAo",
                                   }
                              ]
                         },{
                              label:"Giới thiệu",
                              key:"",
                              style:{marginTop:'5px'},
                         }
                         ]}/>
     </div>
     
     )
     }

//}
export default MenuLeft;
