import React, { useEffect, useState } from "react";

import { Image, Carousel, Card,Skeleton } from "antd";
// const root_directory_source = CON"image/";
// const sale = `${root_directory_source}sale1.png`;
// const sale2  = `${root_directory_source}sale2.png`;
// const sale3  = `${root_directory_source}sale3.png`;
import sale from "../../components/Image/SaleProduct/sale1.png";
import sale2 from "../../components/Image/SaleProduct/Sale2.png";
import sale3 from "../../components/Image/SaleProduct/Sale3.png";

import {
  LeftOutlined,
  RightOutlined,
  CheckCircleOutlined,
  DeliveredProcedureOutlined,
  ThunderboltOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import CardMenu from "../../components/content/menuCard";
import AOS from "aos";
import "aos/dist/aos.css";
import AddToCartButton from "../../components/cart/addToCartButton";
import { Link } from "react-router-dom";
import {setProductData, getProductData} from "../../components/product/productData";
import { getProductsWithAllCategory } from "../../../controllers/modules/customer/products";
import { fetchImage } from "../../../../utils/readfile";
import { convertB64ToImage } from "../../../../utils/util";
import Cookies from "js-cookie";
export default function AllProduct() {
  let productWithCategory;
  //  let productData
  const [productWithCategoryComponent, setProductWithCategoryComponent] = useState([]);
  const [allProductComponent, setAllProductComponent] = useState();
  const [cardData, setCardData] = useState([]);
  const [productCategoryData, setProductCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  function setUpCarousel(productData, slidesToShow, rows, className, dataAos) {
    return <div className={className} data-aos={dataAos}>
      <Carousel
        slidesPerRow={productData.length < slidesToShow ? productData.length : slidesToShow}
        slidesToScroll={1}
        rows={Math.floor(productData.length / (slidesToShow+1)) + 1 > rows ? rows : (Math.floor(productData.length / (slidesToShow+1)) + 1)}
        arrows={productData.length > slidesToShow * rows}
        prevArrow={<LeftOutlined />}
        nextArrow={<RightOutlined />}
      >
        {renderUiProduct(productData)}
      </Carousel>
    </div>;
  }
  function renderUiProduct(productData) {
    return productData.map((product) => (
      <div>
        <Card key={product.ma + ""} className="card_1">
          <Link to={`/products/${product.ma}/${product.ten}`}>
            <Image
              src={convertB64ToImage(product.anhminhhoa)}
              className="image-card"
            ></Image>{" "}
            <br />
            <h4>{product.ten}</h4>
            <p>{product.gia.toLocaleString()} VND</p>
          </Link>
          <AddToCartButton
            item={product}
            selectedColor={product.mathang.length > 0 ? product.mathang[0].mau.ten : ""}
            selectedSize={
              product.mathang.length > 0 ? product.mathang[0].kichco.ten : ""
            }
            amount={1}
          />
        </Card>
      </div>
    ));
  }
  useEffect(() => {
    async function fetchProduct() {
      if (!productWithCategory) {
        const rs = await getProductsWithAllCategory();
        if (rs.data && rs.data.loaiLon && rs.data.loaiLon.data) {
          let productWithCategory = rs.data.loaiLon.data;
          let productWithCategoryComponentTemp = [];
          let allProductComponentTemp = [];
          let allProducts = []
          let allLoai = []
          for (const category of productWithCategory) {
            if (category.sanpham.length > 0) {
              let loai = {image:"",name:"", key:""}
              loai.image = convertB64ToImage(category.anhminhhoa)
              loai.name = category.ten
              loai.key = category.ten.replace(/[\u0300-\u036f]/g, '')
              allLoai.push(loai)
              let productData1 = category.sanpham;
              allProducts.push(...productData1)
              productWithCategoryComponentTemp.push(
                <>
                  <div className="allProduct" data-aos="fade-left">
                    <div>
                      <h3>{category.ten}</h3>
                    </div>
                  </div>
                  <div className="mainAllProduct">
                    <div className="bannerSale" data-aos="fade-up-right">
                      <Image src={sale}></Image>
                    </div>
                    <div className="slider_1">
                      {setUpCarousel(productData1, 3, 2, "sliderProduct", "fade-up")}
                    </div>
                  </div>
                </>
              );
            }
          }
          // setProductData('data',allProducts)
          setProductData(rs, allProducts)
          Cookies.set('isLoaded', 'true', {expires:1})
          setCardData(allLoai)
          setProductCategoryData(productWithCategory)
          setAllProductComponent(setUpCarousel(allProducts, 5, 1, "sliderProduct", "fade-up") as any)
          setProductWithCategoryComponent(productWithCategoryComponentTemp);
          setIsLoading(false)
        }
      }
    }
    fetchProduct();
    AOS.init({ duration: 1000 });
  }, []);

  return (
    isLoading ?(
      <div style={{display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: "center", width: '100%', height: '100%', paddingTop: '20px', paddingBottom: '20px'}}>
        <Skeleton.Image active={true}/><br/>
      <Skeleton.Input active={true} size={"large"} block={true} /><br/>
    <Skeleton.Input active={true} size={"large"} block={true}/><br/>
    <Skeleton.Input active={true} size={"large"} block={true}/><br/>
    <Skeleton.Input active={true} size={"large"} block={true}/><br/>
    <Skeleton.Input active={true} size={"large"} block={true}/><br/>
    <Skeleton.Input active={true} size={"large"} block={true}/><br/>
    <Skeleton.Input active={true} size={"large"} block={true}/><br/>
    <Skeleton.Input active={true} size={"large"} block={true}/><br/>
    <Skeleton.Input active={true} size={"large"} block={true}/><br/>
    <Skeleton.Input active={true} size={"large"} block={true}/><br/>
    <Skeleton.Input active={true} size={"large"} block={true}/><br/>
    <Skeleton.Input active={true} size={"large"} block={true}/><br/>
    </div>) :
    <div>
      <CardMenu cardData={cardData} productCategoryData={productCategoryData}/>
      {productWithCategoryComponent}

      <div id="sale_2" data-aos="fade-up">
        <Image src={sale2}></Image>
      </div>
      <div>
        <div className="allProduct_2" data-aos="fade-left">
          <div>
            <h3>TỔNG SẢN PHẨM</h3>
          </div>
        </div>
        {allProductComponent}
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
        
      </div>
      <div id="card_footer">
        <Card className="Card_footer">
          <CheckCircleOutlined className="icon-card-footer" />
          <p>Mẫu mã đa dạng</p>
        </Card>
        <Card className="Card_footer">
          <DeliveredProcedureOutlined className="icon-card-footer" />
          <p>Giao hàng tận nơi</p>
        </Card>
        <Card className="Card_footer">
          <ThunderboltOutlined className="icon-card-footer" />
          <p>Cam kết bảo hành</p>
        </Card>
        <Card className="Card_footer">
          <SyncOutlined className="icon-card-footer" />
          <p>Có thể đổi trả</p>
        </Card>
      </div>
    </div>
  );
}
