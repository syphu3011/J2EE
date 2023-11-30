import { Col, Row,Image} from 'antd';
import React from 'react';
import  FilterProduct from '../../components/filter/leftFilter';
import Product from '../../components/product/productList';

export default function Category({productData}) {
          return(
               <div className="pageProduct">
                    <Row>
                         <Col flex="1">
                              <div>
                                   <FilterProduct/>
                              </div>

                         </Col>
                         <Col flex="4" >
                              <div className="banner-product-category">
                              <Image src="/src/views/components/Image/bannerHeader/Banner6.png" id="product-banner"/>
                              <Image src="/src/views/components/Image/bannerHeader/Banner7.png" id="product-banner"/>
                              </div>
                              <div className="product">
                                   <Product productData={productData}/>
                              </div>
                         </Col>
                    </Row>
               </div>
          )
     }
