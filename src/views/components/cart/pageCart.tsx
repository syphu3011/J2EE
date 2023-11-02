import { Button, Drawer, InputNumber, Space, Table} from "antd"
import { useEffect, useState } from "react";
import productData from "../product/productData";
import { render } from "node-sass";
import Product from "../product/productList";
const PageCart=()=>{
     const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
     const [cartItems, setCartItems] = useState([]);
     useEffect(() => {
         /* const dataSource = productData.map((product) => ({
            id: product.id,
            image: product.image[0],
            name: product.name,
            color: product.color,
            size: product.size,
            price: product.price,
            quantity: product.quantity,
            combinedData: `- Tên: ${product.name}\n- Màu :${product.color}\n- Kích cỡ: ${product.size}`,
            total: product.price * product.quantity,
          }));
      
          setCartItems(dataSource);*/
        }, []);
        const renderImage = (image) => (
          <img src={image} alt="Product" style={{ width: "50px" }} />
        );
        const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
          console.log('selectedRowKeys changed: ', newSelectedRowKeys);
          setSelectedRowKeys(newSelectedRowKeys);
        };
        const rowSelection = {
          selectedRowKeys,
          onChange: onSelectChange,
        };
      
     
     return (<div>
         <Table
         rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
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
                              dataIndex:"combinedData",
                              render:(text) => <div>{text.split("\n").map((line) => <p>{line}</p>)}</div>, // Split lines and render in separate paragraphs
                              
                         },{
                              title:"Giá",
                              dataIndex:"price",
                              render:(value)=><span>{value.toLocaleString()}</span>
                              
                         },
                         {
                              title:"Số lượng",
                              dataIndex:"quantity",
                              render:(value,record)=>{
                                   return(
                                        <InputNumber
                                             min={0}
                                             defaultValue={value}
                                             onChange={(newValue) => {
                                             setCartItems((pre) =>
                                             pre.map((cart) => {
                                             if (record.id === cart.id) {
                                             cart.quantity = newValue;   
                                             cart.total = (cart.price * newValue).toLocaleString(); // Update the total price based on the new quantity
                                        }
                                        return cart;
                                   })
                                   );
                                   }}
                                   ></InputNumber>
                                   )
                              }
                         },
                         {
                              title:"Tổng tiền",
                              dataIndex:"total",
                              render: (value, record) => {
                                   const cartItem = cartItems.find((cart) => cart.id === record.id);
                                   const totalPrice = cartItem ? cartItem.price * cartItem.quantity : record.price * record.quantity;
                                   return <span>{totalPrice.toLocaleString()}</span>;
                                 },
                             
                         }
                    ]
               }
               dataSource={cartItems}
               summary={(data) => {
                    const totalSummary = data.reduce((pre, current) => {
                      return pre + (current.price * current.quantity);
                    }, 0);
                    return <span className="sumary-cart">Total: <p> {totalSummary.toLocaleString()}</p></span>;
                  }}
         >
          
         </Table>
     </div>
     )
}
export default PageCart;