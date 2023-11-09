import { useParams } from "react-router-dom"
import {getProductData} from "./productData"
import { Col, Row, Image, InputNumber} from "antd"
import { useEffect, useState } from "react";
import AddToCartButton from "../cart/addToCartButton";
import { useCart } from "react-use-cart";
import { convertB64ToImage } from "../../../../utils/util";

function ProductDetail() {
    const {updateItem}=useCart();
    const {nameId,Id} = useParams()
    const thisProduct = getProductData().find(prod =>prod.ma===Id && prod.ten=== nameId)
    const [activeImg, setActiveImage] = useState(convertB64ToImage(thisProduct.anhminhhoa))
    const [amount, setAmount] = useState(1);
    const [isFirst, setIsFirst] = useState(true);
    const handleQuantityChange = (value) => {
        console.log('changed', value);
        setAmount(value);
    //    updateItem(thisProduct.id, { quantity: amount });
      };
    
    
      const [selectedColor, setSelectedColor] = useState(thisProduct.mathang[0].mau.ten);
      const [selectedSize, setSelectedSize] = useState(thisProduct.mathang[0].kichco.ten);
      const [selectedMH, setSelectedMH] = useState(thisProduct.mathang[0]);
      const [listColor, setListColor] = useState([]);
      const [listSize, setListSize] = useState([]);
      const handleColorChange = (color) => {
        setSelectedColor(color);
        const mh = thisProduct.mathang.find(mh => 
            mh.mau.ten == color && mh.kichco.ten == selectedSize
        )
        setSelectedMH(mh)
        if (mh.soluong < amount) {
            setAmount(mh.soluong)
        }
        if (mh.soluong > 0 && amount == 0) {
            setAmount(1)
        }
      };
    
      const handleSizeChange = (size) => {
        setSelectedSize(size);
        const mh = thisProduct.mathang.find(mh => 
            mh.mau.ten == selectedColor && mh.kichco.ten == size
        )
        setSelectedMH(mh)
        if (mh.soluong < amount) {
            setAmount(mh.soluong)
        }
        if (mh.soluong > 0 && amount == 0) {
            setAmount(1)
        }
      };
      let imageCount = 0
      useEffect(() => {
        if (isFirst) {
            const colors = thisProduct.mathang.map(prod => prod.mau.ten).reduce((unique, mau) => {
                if (!unique.includes(mau)) {
                unique.push(mau);
                }
                return unique;
            }, []);
            const sizes = thisProduct.mathang.map(prod => prod.kichco.ten).reduce((unique, kichco) => {
                if (!unique.includes(kichco)) {
                unique.push(kichco);
                }
                return unique;
            }, []);
            setListColor(colors)
            setListSize(sizes)
            setAmount(selectedMH.soluong > 0 ? 1 : 0)
            setIsFirst(false)
        }
      })
     return (
        
         <div className="product-detail-container">
             <Row>
                <Col flex="2">
                    <div className="card-image-active">
                        <Image src={activeImg} id="card-detail-image" style={{borderRadius:'20px',border:'1px solid gray'}}></Image>
                    </div>
                </Col>
                <Col flex="3">
                    <div className="inform-product-detail-container">
                        <h1>{thisProduct.ten}</h1>
                        <div className="category-productId">
                            <span>Loại : {thisProduct.loai.ten}</span>
                            <span>Mã SP :{thisProduct.ma}</span>
                        </div>
                        <div className="price-detail-product">
                            Giá: <p>{selectedMH.giaban.toLocaleString()}</p>
                        </div>
                        <div className="color-groups">
                            Màu sắc: {listColor.map((mau, index) => (
                                <p className={`color-1 color  ${
                                    selectedColor === mau ? 'selected' : ''
                                  }`} key={index} style={{marginTop:'-2px',backgroundColor: "#"+mau}} onClick={() => handleColorChange(mau)}></p>
                                ))}
                        </div>
                        <div className="size-detail-product">
                            Kích thước : {
                                listSize.map((kichco, index) =>(
                                    <p className={`size-product  ${selectedSize === kichco ? 'selected' : ''
                                }`} key={index}  onClick={() => handleSizeChange(kichco)}>{kichco}</p>
                                ))
                            }

                        </div>
                        <div className="state-product-detail">
                            Trạng thái :{
                                1 === 1 ? <p>Còn hàng</p>  :<p>Hết hàng</p>
                            }
                        </div>
                        <div className="quantity-product">
                            Số lượng : <InputNumber min={selectedMH.soluong > 0 ? 1 : 0} max={selectedMH.soluong} value={amount} onChange={handleQuantityChange}/>
                            <p>Còn {
                                selectedMH.soluong
                            } sản phẩm</p>
                        </div>
                        <div className="btn-detail-product">
                            <AddToCartButton item={thisProduct} selectedColor={selectedColor} selectedSize={selectedSize} amount={amount}/>
                        </div>
                        <div className="decription-product">
                            Mô tả sản phẩm : <p>
                                {thisProduct.mota}
                            </p>
                        </div>
                    </div>
                </Col>
             </Row>
         </div>
     )
 }
 export default ProductDetail