import {Menu} from "antd";
//import React from "react";
import {CaretDownOutlined} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
function MenuLeft(){
     //render(){
     const navigate = useNavigate();
     const onMenuClick = (item)=>{
          navigate(`/${item.key}`);
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
                                        key:"ao",
                                        className:"groupAo",
                                        children:[
                                             {
                                                  label:"Áo thun",
                                                  key:"Aothun",
                                                  className:"groupAo",
                                             },{
                                                  label:"Áo sơ mi",
                                                  key:"Aosomi",
                                                  className:"groupAo",
                                             },{
                                                  label:"Áo kiểu",
                                                  key:"Aokieu",
                                                  className:"groupAo",
                                             },{
                                                  label:"Áo polo",
                                                  key:"Aokieupolo",
                                                  className:"groupAo",
                                             }
                                             
                                        
                                        ]
                                   },{
                                        label:"Quần",
                                        key:"quan",
                                        className:"groupAo",
                                        children:[
                                             {
                                                  label:"Quần Jeans",
                                                  key:"jeans",
                                                  className:"groupAo",
                                             },{
                                                  label:"Quần tây",
                                                  key:"tay",
                                                  className:"groupAo",
                                             },{
                                                  label:"Quần Jogger",
                                                  key:"jogger",
                                                  className:"groupAo",
                                             },{
                                                  label:"Quần dài vải",
                                                  key:"vai",
                                                  className:"groupAo",
                                             }
                                        ]
                                   },{
                                        label:"Đầm và chân váy",
                                        key:"dam",
                                        className:"groupAo",
                                        children:[
                                             {
                                                  label:"Đầm và jumpsuit",
                                                  key:"jump&dress",
                                                  className:"groupAo",
                                             },{
                                                  label:"Chân váy",
                                                  key:"Chanvay",
                                                  className:"groupAo",
                                             }
                                        ]
                                   },{
                                        label:"Áo khoác",
                                        key:"khoac",
                                        className:"groupAo",
                                        children:[
                                             {
                                                  label:"Áo hoodie",
                                                  key:"hoodie",
                                                  className:"groupAo",
                                             },
                                             {
                                                  label:"Áo Blazer",
                                                  key:"blazer",
                                                  className:"groupAo",
                                             },{
                                                  label:"Áo chăn bông",
                                                  key:"bong",
                                                  className:"groupAo",
                                             },{
                                                  label:"Áo Parka",
                                                  key:"parka",
                                                  className:"groupAo",
                                             }
                                        ]
                                        
                                   }
                              ],
               
                         },{
                              label:labelPhuKien,
                              key :"phukien",
                              style:{marginTop:'5px'},
                              children:[
                                   {
                                        label:"Nón",
                                        key:"non",
                                        className:"groupAo",
                                   },{
                                        label:"Nơ cài",
                                        key:"no",
                                        className:"groupAo",

                                   },{
                                        label:"Vớ",
                                        key:"vo",
                                        className:"groupAo",
                                   },{
                                        label:"Thắt lưng",
                                        key:"thatlung",
                                        className:"groupAo",
                                   }
                              ]
                         },{
                              label:"Giới thiệu",
                              key:"Introduce",
                              style:{marginTop:'5px'},
                         }
                         ]}/>
     </div>)
     }

//}
export default MenuLeft;
