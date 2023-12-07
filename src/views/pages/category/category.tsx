import { Col, Row, Image, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import FilterProduct from '../../components/filter/leftFilter';
import Product from '../../components/product/productList';
import banner1 from "../../components/Image/bannerHeader/Banner6.png";
import banner2 from "../../components/Image/bannerHeader/Banner7.png";
import { getProductData } from '../../components/product/productData';
import ProductItem from '../../components/product/productItem';
import { getProductsWithAllCategory } from '../../../controllers/modules/customer/products';
import axios from '../../../../utils/axios';
import { getAllCategories } from '../../../controllers/modules/customer/categories';
import ProductFilter from '../../components/product/productFilter';
import LoadingPage from '../../loadingPage';
// Inside the Product component file (productList.tsx)
interface ProductProps {
     productData: any[]; // Update the type of productData to accept any array
     // Other props...
}
export default function Category({ productData, allCategories, productDataCate, isAccess = true }) {
     const [selectedColor, setSelectedColor] = useState(null);
     const [thisProduct, setProductData] = useState([]);
     const [filteredProductData, setFilteredProductData] = useState([]);
     const [selectedTree, setSelectedTree] = useState(null);
     const [currentOption, setCurrentOption] = useState(null);
     const [isAccessState, setIsAccessState] = useState(isAccess);
     const [filteredData, setFilteredProductBySize] = useState(null);
     const [filteredPrice, setFilteredProductByPrice] = useState(null);

     // Hàm callback để xử lý khi màu được chọn
     const handleFilterByColor = (color) => {
          setIsAccessState(true)
          setSelectedColor(color); // Cập nhật màu đã chọn
          const fetchProductByColor = (color) => {
               const thisProduct = productDataCate.filter(
                    (item) => { 
                         return item.mathang.some((product) => product.mau.ten === color); 
                    }); // Thay thế 'color' bằng thông tin để lấy sản phẩm theo màu từ API
               setProductData(thisProduct);
          };

          fetchProductByColor(color);
          setSelectedTree(null); // Hủy chọn tree
          setCurrentOption('color'); // Đặt trạng thái hiện tại là 'color'
          setIsAccessState(false)
     };
     const filterProductData = (tree) => {
          // Lấy dữ liệu sản phẩm từ API hoặc bất kỳ nguồn dữ liệu nào khác
          setIsAccessState(true)
          const response = allCategories;
          const filteredProductData = response.data.loaikhachhang.data.find(product => { return product.ten === tree });
          setFilteredProductData(filteredProductData);
          //setProductData(filteredProductData);

          if (filteredProductData) {
               const productList = filteredProductData.sanpham.map((product) => ({
                    ma: product.ma,
                    ten: product.ten,
                    anhminhhoa: product.anhminhhoa,
                    mota: product.mota,
                    gia: parseInt(product.gia),
                    mau: product.mathang[0].mau.ten,
                    kichco: product.mathang[0].kichco.ten,
               }));
               setFilteredProductData(productList)
          };
          setIsAccessState(false)

     }
     const fetchProductBySize = (tree) => {
          try {
               setIsAccessState(true)
               const filteredProductDatasize = productDataCate.filter(
                    (item) => item.mathang.some(mh => mh.kichco.ten.includes(tree))
               );
               setIsAccessState(false)
               setFilteredProductData(filteredProductDatasize);
          } catch (error) {
               console.error(error);
          }
     };
     const fetchProductByPrice = (tree) => {
          try {
            let filteredProductDataPrice
            setIsAccessState(true)
            const productData = productDataCate;
            if (tree.includes('less-than-one-milions')) {
              filteredProductDataPrice = productData.filter((item) => {
                return item.mathang.some((product) => parseInt(product.giaban) < 1000000);
              });
            } else if (tree.includes('from-one-milions-to-five-milions')) {
              filteredProductDataPrice = productData.filter((item) => {
                return item.mathang.some((product) => parseInt(product.giaban) >= 1000000 && parseInt(product.giaban) < 5000000);
              });
            } else if (tree.includes('Bigger-than-five-milions')) {
              filteredProductDataPrice = productData.filter((item) => {
                return item.mathang.some((product) => parseInt(product.giaban) >= 5000000);
              });
            }
            setIsAccessState(false)
            setFilteredProductData(filteredProductDataPrice);
          } catch (error) {
            console.error(error);
          }
        };
     const handleFilterTree = (tree) => {
          setIsAccessState(true)
          setSelectedTree(tree); // Cập nhật màu đã chọn
          setSelectedColor(null); // Hủy chọn màu
          if (['less-than-one-milions', 'from-one-milions-to-five-milions', 'Bigger-than-five-milions'].includes(tree)) {
               fetchProductByPrice(tree);
               setCurrentOption('tree'); // Đặt trạng thái hiện tại là 'tree'
               setFilteredProductBySize(null)
          } else if (['S', 'XL', 'Free size', 'M', 'L'].includes(tree)) {
               fetchProductBySize(tree);
               setCurrentOption('tree'); // Đặt trạng thái hiện tại là 'tree'
               setFilteredProductBySize(null); // Reset giá trị filteredProductBySize
          } else {
               filterProductData(tree);
               setCurrentOption('tree'); // Đặt trạng thái hiện tại là 'tree'
               setFilteredProductBySize(null); // Reset giá trị filteredProductBySize
          }
          setIsAccessState(false)
     };
     useEffect(() => {
          async function prepare() {
               if (isAccess) {
                    setIsAccessState(true)
                    setSelectedColor(null)
                    setSelectedTree(null)
                    setFilteredProductData(productData)
                    setCurrentOption(null)
                    setFilteredProductBySize(null)
                    isAccess = false
                    setIsAccessState(false)
               }
          }
          prepare()
     },[productData, allCategories, productDataCate, isAccess])
     return (
          <div className="pageProduct">
               <Row>
                    <Col flex="1">
                         <div>
                              <FilterProduct onColorSelect={handleFilterByColor} onDataChange={handleFilterTree} dataCate={productDataCate}/>
                         </div>

                    </Col>
                    <Col flex="4" >
                         <div className="banner-product-category">
                              <Image src={banner1} id="product-banner" />
                              <Image src={banner2} id="product-banner" />
                         </div>
                         {isAccessState ? <LoadingPage/>:
                         <><div className="product">
                              {currentOption === 'color' && (
                                   <ProductItem productData={productData} selectedColor={selectedColor} />
                              )}
                              {currentOption === 'tree' && (
                                   <ProductFilter productData={filteredProductData} selectedTree={selectedTree} />
                              )}
                              {currentOption !== 'color' && currentOption !== 'tree' && (
                                   <Product productData={productData} />
                              )}
                         </div></>}
                    </Col>
               </Row>
          </div>
     )
}
