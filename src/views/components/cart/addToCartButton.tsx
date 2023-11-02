import { Button, Col, Row, message } from "antd";
import { ShoppingCartOutlined} from '@ant-design/icons';
import React from "react";
function AddToCartButton({ item }) {
     const [loading, setLoading] = React.useState(false);
     const addProductToCart = () => {
       setLoading(true);
       /*addToCart(item.id).then((res) => {
         message.success(`${item.title} has been added to cart!`);
         setLoading(false);
       });*/
       message.success("has been added to cart!");
       setLoading(false);
     };
     return (
       <Row gutter={[6,6]} className="action-cart-btn">
       <Col >
           <Button onClick={() => {
           addProductToCart();
         }} loading={loading} className="add-to-cart-button btn-1">
           <span><ShoppingCartOutlined />Thêm vào giỏ</span>
           </Button>
       </Col>
       <Col>
           <Button className="add-to-cart-button btn-2">
             <span>Mua ngay</span>
           </Button>
       </Col>
   </Row>
     );
   }
export default AddToCartButton;