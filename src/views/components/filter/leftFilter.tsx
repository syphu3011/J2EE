import { Tree } from "antd";
import { DataNode } from "antd/es/tree";
import { useState } from "react";
import ColorGroups from "./filtercolor";

const treeData: DataNode[]=[
     {
          title: 'Loại',
          key:'types',
          children:[
               {
                    title:'Áo',
                    key :'shirt',
                    children:[
                         {
                              title:'Áo thun',
                              key:'T-shirt',
                         },{
                              title:'Áo sơ mi',
                              key:'dress-shirt',
                         },{
                              title:"Áo kiểu",
                              key:"modern-shirt",
                         }
                    ]
               },
               {
                    title:"Quần",
                    key : 'trousers',
                    children:[
                         {
                              title:"Quần Jeans",
                              key:"jeans-trouser",
                         },
                         {
                              title:"Quần tây",
                              key:"trouser-trouser",
                         },
                         {
                              title:"Quần Jogger",
                              key:"jogger-trouser",
                         },
                         {
                              title:"Quần dài vải",
                              key:"fabric-pants"
                         }
                    ]
               },{
                    title:"Đầm và chân váy",
                    key:"dress",
                    children:[
                         {
                              title:"Đầm và jumsuit",
                              key:'dress-and-jumsuit',
                         }
                         ,{
                              title:"Chân váy",
                              key:"dress-A",
                         }
                    ]
               },{
                    title:"Áo khoác",
                    key:"jackets",
                    children:[
                         {
                              title:"Áo hoodie",
                              key:"hoodie-fashion",
                         },{
                              title:"Áo Blazer",
                              key:"blazer-fashion",
                         },{
                              title:"Áo chăn bông",
                              key:"winter-fashion",
                         },{
                              title:"Áo Parka",
                              key:"parka-fashion",
                         }
                    ]
               },{
                    title:"Phụ kiện",
                    key:"phukien",
                    children:[
                         {
                              title:"Nón",
                              key:"non"
                         },{
                              title:"Nơ cài",
                              key:"nocai",
                         },
                         {
                              title:"Vớ",
                              key:"vo",
                         },
                         {
                              title:"Thắt lưng",
                              key:"thatlung",
                         }
                    ]
               },
          ]
     },
     
     {
          title:"Kích cỡ",
          key:"size",
          children:[
               {
                    title:"XS",
                    key:'xs-size',
               },
               {
                    title:"S",
                    key:'s-size',
               },
               {
                    title:"M",
                    key:"m-size",
               },
               {
                    title:"L",
                    key:"l-size",
               },
               {
                    title:"XL",
                    key:"xl-size",
               },
               {
                    title:"Free size",
                    key:"free-size",
               }
               ,
               {
                    title:"Over size",
                    key:"over-size",
               }
          ]
     },
     {
          title:"Giá",
          key:"price",
          children:[
               {
                    title:"Dưới 1.000.000",
                    key:"less-than-one-milions",
               },{
                    title:"Từ 1.000.000 đến 5.000.000",
                    key:"from-one-milions-to-five-milions",
               },
               {
                    title:" Trên 1.000.000",
                    key:"Bigger-than-five-milions",
               }
          ]
     },
]
export default function FilterProduct({ onColorSelect }){
     const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['types','shirt', 'trousers','size','phukien','price','dress','jackets']);//mo rong not dung trong cay
     const onExpand = (expandedKeysValue: React.Key[]) => {
          console.log('onExpand', expandedKeysValue);
          // if not set autoExpandParent to false, if children expanded, parent can not collapse.
          // or, you can remove all expanded children keys.
          setExpandedKeys(expandedKeysValue);
          //setAutoExpandParent(false);
        };
     return(
          <div className="filter">
               <Tree expandedKeys={expandedKeys}
       onExpand={onExpand} checkable treeData={treeData}> 
               </Tree>
               <div>
                    <span>Màu sắc</span>
                    <ColorGroups onColorSelect={onColorSelect}/>
               </div>
          </div>
     )
}
