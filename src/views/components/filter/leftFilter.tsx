import { Tree } from "antd";
import { DataNode } from "antd/es/tree";
import { useEffect, useState } from "react";
import ColorGroups from "./filtercolor";
import { getProductsWithAllCategory } from "../../../controllers/modules/customer/products";
import { getAllCategories } from "../../../controllers/modules/customer/categories";
import DirectoryTree from "antd/es/tree/DirectoryTree";

const treeData: DataNode[]=[
     {
          title: 'Loại',
          key:'types',
          children:[
               {
                    title:'Áo',
                    key :'Áo',
                    children:[
                         {
                              title:'Áo thun',
                              key:'Áo thun',
                         },{
                              title:'Áo sơ mi',
                              key:'Áo sơ mi',
                         },{
                              title:"Áo kiểu",
                              key:"Áo kiểu",
                         },{
                              title:"Áo polo",
                              key:"Áo polo",
                         }
                    ]
               },
               {
                    title:"Quần",
                    key : 'Quần',
                    children:[
                         {
                              title:"Quần Jeans",
                              key:"Quần Jeans",
                         },
                         {
                              title:"Quần tây",
                              key:"Quần tây",
                         },
                         {
                              title:"Quần Jogger",
                              key:"Quần Jogger",
                         },
                         {
                              title:"Quần dài vải",
                              key:"Quần dài vải"
                         }
                    ]
               },{
                    title:"Đầm và chân váy",
                    key:"Đầm và chân váy",
                    children:[
                         {
                              title:"Đầm và jumpsuit",
                              key:'Đầm và jumpsuit',
                         }
                         ,{
                              title:"Chân váy",
                              key:"Chân váy",
                         }
                    ]
               },{
                    title:"Áo khoác",
                    key:"Áo khoác",
                    children:[
                         {
                              title:"Áo hoodie",
                              key:"Áo hoodie",
                         },{
                              title:"Áo Blazer",
                              key:"Áo Blazer",
                         },{
                              title:"Áo chăn bông",
                              key:"Áo chăn bông",
                         },{
                              title:"Áo Parka",
                              key:"Áo Parka",
                         }
                    ]
               },{
                    title:"Phụ kiện",
                    key:"Phụ kiện",
                    children:[
                         {
                              title:"Nón",
                              key:"Nón"
                         },{
                              title:"Nơ cài",
                              key:"Nơ cài",
                         },
                         {
                              title:"Vớ",
                              key:"Vớ",
                         },
                         {
                              title:"Thắt lưng",
                              key:"Thắt lưng",
                         }
                    ]
               },
          ]
     },
     
     {
          title:"Kích cỡ",
          key:"Kích cỡ",
          children:[
               {
                    title:"XS",
                    key:'XS',
               },
               {
                    title:"S",
                    key:'S',
               },
               {
                    title:"M",
                    key:"M",
               },
               {
                    title:"L",
                    key:"L",
               },
               {
                    title:"XL",
                    key:"XL",
               },
               {
                    title:"Free size",
                    key:"Free size",
               }
              
          ]
     },
     {
          title:"Giá",
          key:"Giá",
          children:[
               {
                    title:"Dưới 1.000.000",
                    key:"less-than-one-milions",
               },{
                    title:"Từ 1.000.000 đến 5.000.000",
                    key:"from-one-milions-to-five-milions",
               },
               {
                    title:" Trên 5.000.000",
                    key:"Bigger-than-five-milions",
               }
          ]
     },
]
export default function FilterProduct({ onColorSelect,onDataChange}){
     const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['types','Áo', 'Quần','Kích cỡ','Phụ kiện','Giá','Đầm và chân váy','Áo khoác']);//mo rong not dung trong cay
     const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
     const [productData,setProductData]=useState([])
     const [filteredProductData, setFilteredProductData] = useState(null);

     const onExpand = (expandedKeysValue: React.Key[]) => {
          console.log('onExpand', expandedKeysValue);
          // if not set autoExpandParent to false, if children expanded, parent can not collapse.
          // or, you can remove all expanded children keys.
          setExpandedKeys(expandedKeysValue);
          //setAutoExpandParent(false);
     };
          const onSelect = (selectedKeysValue: React.Key[], info: any) => {
               console.log('onSelect', selectedKeysValue, info);
               setSelectedKeys(selectedKeysValue);
               onDataChange(info.node.title);
               // Kiểm tra xem tiêu đề của nút được chọn thuộc vào giá hay kích thước
               if (info.node.key === 'Giá' || info.node.key === 'Kích cỡ'||info.node.key === 'types') {
                    const childKeys = [];
                    const traverseTree = (node) => {
                     if (node.children) {
                         node.children.forEach((child) => {
                         childKeys.push(child.key);
                         traverseTree(child);
                     });
                    }
               };
               traverseTree(info.node);
               setSelectedKeys([...selectedKeysValue, ...childKeys]);
   }
             };
     return(
          <div className="filter">
               <DirectoryTree expandedKeys={expandedKeys} defaultExpandAll
       onExpand={onExpand} treeData={treeData} onSelect={onSelect}> 
               </DirectoryTree>
               <div>
                    <span>Màu sắc</span>
                    <ColorGroups onColorSelect={onColorSelect}/>
               </div>
          </div>
     )
}
