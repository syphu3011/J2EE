import {Button, InputNumber, Table} from "antd"
import { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
const PageCart=()=>{
     const {items,removeItem,updateItem, } = useCart();
     const [cartItems, setCartItems] = useState([]);
    /* useEffect(() => {
          const dataSource = items.map((product) => ({
           // id: product.id,
            image: product.image[0],
            name: product.name,
            color: product.color,
            size: product.size,
            price: product.price,
            quantity: product.quantity,
            ...product,
            combinedData: `- Tên: ${product.name}\n- Màu :${product.color}\n- Kích cỡ: ${product.size}`,
            total: product.price * product.quantity,
          }));
      
          //setCartItems(dataSource);
          
     }, [items]);*/
        const renderImage = (image) => (
          <img src={image} alt="Product" style={{ width: "50px" }} />
        );
        const handleQuantityChange = (value, record) => {
          const updatedItems = cartItems.map((item) => {
            if (item.id === record.id) {
              return { ...item, quantity: value };
            }
            return item;
          });
          setCartItems(updatedItems);
          updateItem(record.id, { quantity: value });
        };
        const totalSummary = items.reduce((pre, current) => {
                 return pre + (current.price * current.quantity);
               }, 0);
     return (<div>
          
         <Table
          
               columns={
                    [
                         {
                              title:"Hình ảnh",
                              dataIndex:"image",
                              render:renderImage,
                         }
                         ,
                         {
                              title:"Sản phẩm",
                              dataIndex:"name",
                             // render:(text) => <div>{text.split("\n").map((line) => <p>{line}</p>)}</div>, // Split lines and render in separate paragraphs
                              render: (_, record) => (
                              <div style={{fontSize:'12px',textTransform:'lowercase'}}>
                                <p>-{record.name}</p>
                                <p>-{record.color}</p>
                                <p>-{record.size}</p>
                              </div>
                              ),
                              
                         },
                         
                         {
                              title:"Giá",
                              dataIndex:"price",
                              render:(value)=><span>{value.toLocaleString()}</span>
                              
                         },
                         {
                              title:"Số lượng",
                              dataIndex:"quantity",
                              render: (_, record) => (
                                   <InputNumber
                                   min={1}                                  
                                   value={record.quantity}
                                   onChange={(newValue) => handleQuantityChange(newValue, record)}
                                 />
                                 ),
                         },
                         {
                              title:"Tổng tiền",
                              dataIndex:"total",
                              render: (value, record) => {
                                   const cartItem = cartItems.find((cart) => cart.id === record.id);
                                   const totalPrice = cartItem ? cartItem.price * cartItem.quantity : record.price * record.quantity;
                                   return <span>{totalPrice.toLocaleString()}</span>;
                                 },
                             
                         },
                         {
                              title:"Thao tác",
                              dataIndex:"action",
                              render:(_,record) => (
                                   <div>
                                     <Button type="default" onClick={() => removeItem(record.id)}>Xóa</Button>
                                   </div>
                                 )
                         }
                    ]
               }
               dataSource={items}
               pagination={{
                    pageSize: 6, // Kích thước trang mặc định
                    //showSizeChanger: true, // Hiển thị chọn kích thước trang
                   // pageSizeOptions: ["10", "20", "50"], // Các lựa chọn kích thước trang
                  }}
               // summary={(data) => {
               //      const totalSummary = data.reduce((pre, current) => {
               //        return pre + (current.price * current.quantity);
               //      }, 0);
               //      return <span className="sumary-cart">Total: <p> {totalSummary.toLocaleString()}</p></span>;
               //    }}
               
         >
         </Table>
         <h2 className="sumary-cart">Thành tiền: <p> {totalSummary.toLocaleString()}</p></h2>
     </div>
     )
}
export default PageCart;