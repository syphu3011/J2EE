import { Col, Row,Image} from 'antd';
import React, { useState } from 'react';
import  FilterProduct from '../../components/filter/leftFilter';
import Product from '../../components/product/productList';
import banner1 from "../../components/Image/bannerHeader/Banner6.png";
import banner2 from "../../components/Image/bannerHeader/Banner7.png";
import { getProductData } from '../../components/product/productData';
import ProductItem from '../../components/product/productItem';
// Inside the Product component file (productList.tsx)
interface ProductProps {
     productData: any[]; // Update the type of productData to accept any array
     // Other props...
   }
export default function Category({ productData }) {
     const [selectedColor, setSelectedColor] = useState(null);
     const [thisProduct, setProductData] = useState([]);
     // Hàm callback để xử lý khi màu được chọn
     const handleFilterByColor = (color) => {
       setSelectedColor(color); // Cập nhật màu đã chọn
       // Cập nhật danh sách sản phẩm theo màu đã chọn (ví dụ: gọi API hoặc xử lý dữ liệu ở đây)
       // ...
       // Ví dụ: gửi request để lấy danh sách sản phẩm theo màu đã chọn từ API
       const fetchProductByColor = async (color) => {
         const thisProduct = (await getProductData("data")).filter((item)=> {return item.mathang[0].mau.ten === color;}); // Thay thế 'color' bằng thông tin để lấy sản phẩm theo màu từ API
         setProductData(thisProduct);
       };
   
       fetchProductByColor(color);
     };
   
          return(
               <div className="pageProduct">
                    <Row>
                         <Col flex="1">
                              <div>
                                   <FilterProduct onColorSelect={handleFilterByColor}/>
                              </div>

                         </Col>
                         <Col flex="4" >
                              <div className="banner-product-category">
                              <Image src={banner1} id="product-banner"/>
                              <Image src={banner2} id="product-banner"/>
                              </div>
                              <div className="product">
                                   {/* <Product productData={productData}/> */}
                                   {selectedColor ?
                                   <ProductItem productData={productData} selectedColor={selectedColor}/>:<Product productData={productData} />  }
                              </div>
                         </Col>
                    </Row>
               </div>
          )
     }
