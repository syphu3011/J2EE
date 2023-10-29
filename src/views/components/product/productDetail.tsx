import { useParams } from "react-router-dom"
import productData from "./productData"
import { Col, Row, Image, Carousel} from "antd"
import { useState } from "react";

function ProductDetail() {
    const {categoryId,nameId} = useParams()
    const thisProduct = productData.find(prod => prod.category=== categoryId && prod.name=== nameId)
    const [activeImg, setActiveImage] = useState(thisProduct.image[0])
    //const [amount, setAmount] = useState(1);
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
                        <p>Price: ${thisProduct.price}</p>
                    </div>
                </Col>
             </Row>
         </div>
     )
 }
 export default ProductDetail