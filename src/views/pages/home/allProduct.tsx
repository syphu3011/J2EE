import React,{useEffect} from 'react';
const root_directory_source = '/src/views/components/Image';
const sale = `${root_directory_source}/SaleProduct/sale1.png`;
const sale2  = `${root_directory_source}/SaleProduct/sale2.png`;
const sale3  = `${root_directory_source}/SaleProduct/sale3.png`;
import {Image,Carousel,Card, Row, Col, Button} from "antd";
const testImage = `${root_directory_source}/CardsMenu/Rectangle 56.png`;
import { LeftOutlined, RightOutlined,CheckCircleOutlined,DeliveredProcedureOutlined,ThunderboltOutlined,SyncOutlined,ShoppingCartOutlined} from '@ant-design/icons';
import CardMenu from "../../components/content/menuCard";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AllProduct(){
          useEffect(() => {
               AOS.init({ duration: 1000 });
             }, []);
          const productData =[
          {
               id: 1,
               image:testImage,
               name: 'Áo sơ mi tay lỡ phối ren',
               Giá : '1.999.000 VND',
          },{
               id: 2,
               image:testImage,
               name: 'Áo sơ mi tay lỡ phối ren',
               Giá : '1.999.000 VND',
          },{
               id: 3,
               image:testImage,
               name: 'Áo sơ mi tay lỡ phối ren',
               Giá : '1.999.000 VND',
          },
          {
               id: 4,
               image:testImage,
               name: 'Áo sơ mi tay lỡ phối ren',
               Giá : '1.999.000 VND',
          },
          {
               id: 5,
               image:testImage,
               name: 'Áo sơ mi tay lỡ phối ren',
               Giá : '1.999.000 VND',
          },
          {
               id: 6,
               image:testImage,
               name: 'Áo sơ mi tay lỡ phối ren',
               Giá : '1.999.000 VND',
          },
          {
               id: 7,
               image:testImage,
               name: 'Áo sơ mi tay lỡ phối ren',
               Giá : '1.999.000 VND',
          },{
               id: 8,
               image:testImage,
               name: 'Áo sơ mi tay lỡ phối ren',
               Giá : '1.999.000 VND',
          },{
               id: 9,
               image:testImage,
               name: 'Áo sơ mi tay lỡ phối ren',
               Giá : '1.999.000 VND',
          },{
               id: 10,
               image:testImage,
               name: 'Áo sơ mi tay lỡ phối ren',
               Giá : '1.999.000 VND',
          }
          ]
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
                                        <Card key={product.id} id="card_1">
                                                  <Image src={product.image} id="image-card"></Image> <br/>
                                                  <h4>{product.name}</h4>
                                                  <p>{product.Giá}</p>
                                                  <Row gutter={[6,6]} className="action-cart-btn">
                                                      <Col >
                                                          <Button className="add-to-cart-button btn-1">
                                                          <span><ShoppingCartOutlined />Thêm vào giỏ</span>
                                                          </Button>
                                                      </Col>
                                                      <Col>
                                                          <Button className="add-to-cart-button btn-2">
                                                            <span>Mua ngay</span>
                                                          </Button>
                                                      </Col>
                                                  </Row>
                                             
                                                  
                                             
               
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
                                        <Card key={product.id} id="card_1">
                                                  <Image src={product.image} id="image-card"></Image> <br/>
                                                  <h4>{product.name}</h4>
                                                  <p>{product.Giá}</p>
                                                  <Row gutter={[6,6]} className="action-cart-btn">
                                                      <Col >
                                                          <Button className="add-to-cart-button btn-1">
                                                          <span><ShoppingCartOutlined />Thêm vào giỏ</span>
                                                          </Button>
                                                      </Col>
                                                      <Col>
                                                          <Button className="add-to-cart-button btn-2">
                                                            <span>Mua ngay</span>
                                                          </Button>
                                                      </Col>
                                                  </Row>
                                             
                                                  
                                             
               
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
                                        <Card key={product.id} id="card_1">
                                                  <Image src={product.image} id="image-card"></Image> <br/>
                                                  <h4>{product.name}</h4>
                                                  <p>{product.Giá}</p>
                                                  <Row gutter={[6,6]} className="action-cart-btn">
                                                      <Col >
                                                          <Button className="add-to-cart-button btn-1">
                                                          <span><ShoppingCartOutlined />Thêm vào giỏ</span>
                                                          </Button>
                                                      </Col>
                                                      <Col>
                                                          <Button className="add-to-cart-button btn-2">
                                                            <span>Mua ngay</span>
                                                          </Button>
                                                      </Col>
                                                  </Row>
                                             
                                                  
                                             
               
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
