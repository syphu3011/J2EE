import { Button, Col, Row, message } from "antd";
import { ShoppingCartOutlined} from '@ant-design/icons';
import { useCart } from 'react-use-cart';
import React, { useState } from "react";
function AddToCartButton({ item,selectedColor, selectedSize,amount }) {
     const [loading, setLoading] = React.useState(false);
     const { addItem} = useCart();
  //   const [selectedColor] = useState(item.color[0]);
   //  const [selectedSize] = React.useState(item.size[0]);
    // const [quantity] = useState(1);
     const addProductToCart = () => {
       setLoading(true);
       /*addToCart(item.id).then((res) => {
         message.success(`${item.title} has been added to cart!`);
         setLoading(false);
       });*/
       if (selectedColor && selectedSize) {
        // Only add to cart if color and size are selected
        setLoading(true);
        const itemToAdd = {
          id: item.id,
          image:item.image,
          name: item.name,
          color: selectedColor,
          size: selectedSize,
          quantity:amount,
          price: item.price,
        };
       addItem(itemToAdd);
        message.success(`${item.name} đã được thêm vào giỏ hàng!`);
      }
       setLoading(false);
     };
     return (
       <Row gutter={[6,6]} className="action-cart-btn">
       <Col >
           <Button onClick={addProductToCart} loading={loading} className="add-to-cart-button btn-1">
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