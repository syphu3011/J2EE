import React,{useEffect} from 'react';
/*const root_directory_source = '/src/views/components/Image';
const sale = `${root_directory_source}/SaleProduct/sale1.png`;
const sale2  = `${root_directory_source}/SaleProduct/sale2.png`;
const sale3  = `${root_directory_source}/SaleProduct/sale3.png`;*/
import sale from "../../components/Image/SaleProduct/sale1.png";
import sale2 from "../../components/Image/SaleProduct/sale2.png";
import sale3 from "../../components/Image/SaleProduct/sale3.png";

import {Image,Carousel,Card} from "antd";
import { LeftOutlined, RightOutlined,CheckCircleOutlined,DeliveredProcedureOutlined,ThunderboltOutlined,SyncOutlined} from '@ant-design/icons';
import CardMenu from "../../components/content/menuCard";
import AOS from "aos";
import "aos/dist/aos.css";
import AddToCartButton from '../../components/cart/addToCartButton';
import { Link } from 'react-router-dom';
import productData from '../../components/product/productData';
export default function AllProduct(){
          useEffect(() => {
               AOS.init({ duration: 1000 });
             }, []);
          
         return(
          <div>
               <CardMenu/>
               <div className="allProduct" data-aos="fade-left">
                         <div>
                              <h3>PHỤ KIỆN</h3>
                         </div>
               </div>
               <div className='mainAllProduct'>
                    <div className="bannerSale" data-aos="fade-up-right">
                         <Image src={sale} ></Image>
                    </div>
                    <div className="slider_1">
                    <div className="sliderProduct" data-aos="fade-up">
                         <Carousel slidesToShow={3} slidesToScroll={2} rows={2} arrows={true} prevArrow={<LeftOutlined />} nextArrow={<RightOutlined />}>
                              
                              {
                                   productData.map((product)=>(
                                        <div>
                                        <Card key={product.id} className="card_1">
                                             <Link to={`/products/${product.id}/${product.name}`}>
                                                  <Image src={product.image[0]} id="image-card"></Image> <br/>
                                                  <h4>{product.name}</h4>
                                                  <p>{product.price} VND</p>
                                             </Link>
                                                  <AddToCartButton item={undefined}/>
                                             
                                                  
                                             
               
                                        </Card>
                                        </div>
                                   ))
                              }
                              
                              
                         </Carousel>
     
                    </div>
                    </div>
               </div>
               <div id="sale_2" data-aos="fade-up">
                    <Image src={sale2}></Image>
               </div>
               <div>
               <div className="allProduct_2" data-aos="fade-left">
                         <div>
                              <h3>TỔNG SẢN PHẨM</h3>
                         </div>
               </div>
               <div className="sliderProduct" data-aos="fade-up">
               <Carousel slidesToShow={5} slidesToScroll={5} rows={2} arrows={true} prevArrow={<LeftOutlined />} nextArrow={<RightOutlined />}>
                              
                              {
                                   productData.map((product)=>(
                                        <div>
                                        <Card key={product.id} className="card_1">
                                             <Link to={`/products/${product.id}/${product.name}`}>

                                                  <Image src={product.image[0]} id="image-card"></Image> <br/>
                                                  <h4>{product.name}</h4>
                                                  <p>{product.price} VND</p>
                                             </Link>
                                                  <AddToCartButton item={undefined}/>
                                             
                                                  
                                             
               
                                        </Card>
                                        </div>
                                   ))
                              }
                              
                              
                         </Carousel> 
               </div>
               </div>
               <div>
               <div id="sale_2" data-aos="fade-up">
                    <Image src={sale3}></Image>
               </div>
               <div className="allProduct_2" data-aos="fade-left">
                         <div>
                              <h3>MỘT VÀI SẢN PHẨM KHÁC</h3>
                         </div>
               </div>
               <div className="sliderProduct-3" data-aos="fade-up">
               <Carousel slidesToShow={5} slidesToScroll={5} rows={1} arrows ={true} prevArrow={<LeftOutlined/>} nextArrow={<RightOutlined/>}>
                              
                              {
                                   productData.map((product)=>(
                                        <div>
                                        <Card key={product.id} className="card_1">
                                             <Link to={`/products/${product.id}/${product.name}`}>

                                                  <Image src={product.image[0]} id="image-card"></Image> <br/>
                                                  <h4>{product.name}</h4>
                                                  <p>{product.price} VND</p>
                                             </Link>
                                                  <AddToCartButton item={undefined}/>
                                             
                                                  
                                             
               
                                        </Card>
                                        </div>
                                   ))
                              }
                              
                              
                         </Carousel> 
               </div>
               </div>
          <div id="card_footer">
               <Card className="Card_footer">
                    <CheckCircleOutlined className="icon-card-footer"/>
                    <p>Mẫu mã đa dạng</p>
               </Card>
               <Card className="Card_footer">
                    <DeliveredProcedureOutlined className="icon-card-footer"/>
                    <p>Giao hàng tận nơi</p>
               </Card>
               <Card className="Card_footer">
                    <ThunderboltOutlined className="icon-card-footer"/>
                    <p>Cam kết bảo hành</p>
               </Card>
               <Card className="Card_footer">
                    <SyncOutlined className="icon-card-footer"/>
                    <p>Có thể đổi trả</p>
               </Card>
               
               
               
          </div>
          </div>
         )
     }
