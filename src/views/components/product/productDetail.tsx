import { useParams } from "react-router-dom"
import productData from "./productData"
import { Col, Row, Image, InputNumber} from "antd"
import { useEffect, useState } from "react";
import AddToCartButton from "../cart/addToCartButton";
import { useCart } from "react-use-cart";

function ProductDetail() {
    const {updateItem}=useCart();
    const {nameId,Id} = useParams()
    const thisProduct = productData.find(prod =>prod.id===Id && prod.name=== nameId)
    const [activeImg, setActiveImage] = useState(thisProduct.image[0])
    const [amount, setAmount] = useState(1);
    const handleQuantityChange = (value) => {
        console.log('changed', value);
        setAmount(value);
    //    updateItem(thisProduct.id, { quantity: amount });
      };
    
    
      const [selectedColor, setSelectedColor] = useState(thisProduct.color[0]);
      const [selectedSize, setSelectedSize] = useState(thisProduct.size[0]);
      const handleColorChange = (color) => {
        setSelectedColor(color);
        console.log('changed', color);
      };
    
      const handleSizeChange = (size) => {
        setSelectedSize(size);
        console.log('changed', size);
      };
      let imageCount = 0
     return (
        
         <div className="product-detail-container">
             <Row>
                <Col flex="2">
                    <div className="card-image-active">
                        <Image src={activeImg} id="card-detail-image" style={{borderRadius:'20px',border:'1px solid gray'}}></Image>
                    </div>
                    <div className="card-detail-image-silder">
                        {thisProduct.image.map((image, index) => {
                            if (imageCount < 3) {
                                imageCount++;
                                return (
                                    <Image src={image} id="card-slider-image" preview={false} onClick={()=>setActiveImage(image)} style={{borderRadius:'10px',border:'1px solid gray'}}/>
                                );
                            }
                             return null;
                        })}
                    </div>
                </Col>
                <Col flex="3">
                    <div className="inform-product-detail-container">
                        <h1>{thisProduct.name}</h1>
                        <div className="category-productId">
                            <span>Loại : {thisProduct.category}</span>
                            <span>Mã SP :{thisProduct.id}</span>
                        </div>
                        <div className="price-detail-product">
                            Giá: <p>{thisProduct.price.toLocaleString()}</p>
                        </div>
                        <div className="color-groups">
                            Màu sắc: {thisProduct.color.map((color, index) => (
                                <p className={`color-1 color color-${color}  ${
                                    selectedColor === color ? 'selected' : ''
                                  }`} key={index} style={{marginTop:'-2px'}} onClick={() => handleColorChange(color)}></p>
                                ))}
                        </div>
                        <div className="size-detail-product">
                            Kích thước : {
                                thisProduct.size.map((size, index) =>(
                                    <p className={`size-product  ${selectedSize === size ? 'selected' : ''
                                }`} key={index}  onClick={() => handleSizeChange(size)}>{size}</p>
                                ))
                            }

                        </div>
                        <div className="state-product-detail">
                            Trạng thái :{
                                thisProduct.state === 1 ? <p>Còn hàng</p>  :<p>Hết hàng</p>
                            }
                        </div>
                        <div className="quantity-product">
                            Số lượng : <InputNumber min={1} max={10} value={amount} onChange={handleQuantityChange}/>
                            <p>Còn {
                                thisProduct.quantity
                            } sản phẩm</p>
                        </div>
                        <div className="btn-detail-product">
                            <AddToCartButton item={thisProduct} selectedColor={selectedColor} selectedSize={selectedSize} amount={handleQuantityChange}/>
                        </div>
                        <div className="decription-product">
                            Mô tả sản phẩm : <p>
                                {thisProduct.decription}
                            </p>
                        </div>
                    </div>
                </Col>
             </Row>
         </div>
     )
 }
 export default ProductDetail