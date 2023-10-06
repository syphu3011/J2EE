import {Menu} from "antd";
import React from "react";
import {CaretDownOutlined} from "@ant-design/icons";
class MenuLeft extends React.Component{
     render(){
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
     return (<div className="menuLeft">
     <Menu className="Leftmenu"mode="horizontal" style={{height:'80px'}}
                         items={[
                         {
                              label:"Trang chủ",
                              key:"home",
                              style:{marginLeft:'50px',marginTop:'13px'},
                         },{
                              label:labelAo,
                              key:"fashion",
                              style:{marginTop:'13px'},
                              children:[
                                   
                                   {
                                        label:"Áo",
                                        key:"ao",
                                        className:"groupAo",
                                        children:[
                                             {
                                                  label:"Áo thun",
                                                  key:"thun",
                                                  className:"groupAo",
                                             },{
                                                  label:"Áo sơ mi",
                                                  key:"somi",
                                                  className:"groupAo",
                                             },{
                                                  label:"Áo kiểu",
                                                  key:"aokieu",
                                                  className:"groupAo",
                                             },{
                                                  label:"Áo polo",
                                                  key:"polo",
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
                                                  key:"jump",
                                                  className:"groupAo",
                                             },{
                                                  label:"Chân váy",
                                                  key:"vay",
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
                              style:{marginTop:'13px'},
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
                              style:{marginTop:'13px'},
                         }
                         ]}/>
     </div>)
     }
}
export default MenuLeft;