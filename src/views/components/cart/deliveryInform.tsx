import { Avatar, Breadcrumb, Col, Empty, Form, FormInstance, Input, List, Modal, Pagination, Row } from "antd";
import Login from "../login/login";
import React, { useState } from "react";
import {ArrowLeftOutlined} from "@ant-design/icons";
import { useCart } from "react-use-cart";


interface DeliveryProps{
     setIsLoggedIn:(isLoggedIn:boolean)=>void;
}
const users = [
     {
       id: 1,
       name: "John Doe",
       age: 25,
       email: "john.doe@example.com",
       address: "123 Main Street",
     },
     {
       id: 2,
       name: "Jane Smith",
       age: 30,
       email: "jane.smith@example.com",
       address: "456 Park Avenue",
     },
     {
       id: 3,
       name: "Bob Johnson",
       age: 35,
       email: "bob.johnson@example.com",
       address: "789 Elm Street",
     },
     // Thêm người dùng khác nếu cần
   ];
   
const DeliveryInform = () => {
     const formRef=React.createRef<FormInstance>();
     const [ showFormLogin,setActive]=React.useState(false);
     const [isLoggedIn,setIsLoggedIn] =React.useState(false);
     const{items,emptyCart}=useCart();
     const[minValue,setMin]=useState(0);
     const[maxValue,setMax]=useState(5);
     const [form] = Form.useForm(); 
     const [formValues, setFormValues] = React.useState(null);

    const handleLoginForm=()=>{
          setActive(!showFormLogin);
     }
     const handleLoginClose=()=>{
          setActive(false)
     }
     const validatePhoneNumber=(rule,value,callback)=>{
          const regex=/^[0-9]{10}$/;
          if(!regex.test(value)){
               callback('Số điện thoại không hợp lệ!');
          }
          else{
               callback();
          }
     }
     // Tính tổng itemTotal
     const totalItemTotal = items.reduce((accumulator, item) => accumulator + item.itemTotal, 0);
     const pageSize = 5; // Số sản phẩm hiển thị trên mỗi trang

     const handlePageChange = (page) => {
          const newMinValue = (page - 1) * pageSize;
          const newMaxValue = page * pageSize;
          setMin(newMinValue);
          setMax(newMaxValue);
        };
     const handleSubmitDeliver=async({fullname,phone,email,address})=>{
          const formValues=[fullname,phone,email,address]
          console.log("Form values:", formValues);
          setFormValues(formValues);
          form.resetFields();
          emptyCart();
          Modal.success({
               content:"Đơn hàng đã được gửi đến cho người bán!"
          })
     }  
          
          //const{isLoggedIn,showFormLogin}=this.state;
          return(
               <>
          <div className="checkout-containter">
               <Row>
                    <Col flex="3" style={{borderRight:'1px solid #7a7979'}}>
                    <div className="checkout-contain">
                    <h1>Thông tin giao hàng</h1>
                    <p>Bạn đã có tài khoản ?<h3 onClick={handleLoginForm}> Đăng nhập</h3></p>
                    <div className="box-delivery">
                    <Form form={form} name="wrap" labelCol={{flex:'180px'}}
                    labelAlign="left"
                    labelWrap
                    wrapperCol={{flex:1}}
                    colon={false}
                    style={{width:700}}
                    initialValues={{}} ref={formRef}
                    autoComplete="off" onFinish={handleSubmitDeliver}
                    >
                         <Form.Item
                         name="fullname" hasFeedback
                         label="Tên người nhận"
                         // labelCol={{span:24}}
                         // wrapperCol={{span:24}}
                         rules={
                              [
                                   {
                                        required:true,
                                        message:"Nhập tên người nhận hàng",
                                   }
                              ]
                         }
                         >
                              <Input placeholder="Tên người nhận hàng" size="large" value=""/>
                         </Form.Item>
                         <Form.Item 
                         name="phone" hasFeedback
                         label="Số điện thoại"
                         // labelCol={{span:24}}
                         // wrapperCol={{span:24}}
                         rules={
                              [
                                   {
                                        required:true,
                                        message:"Nhập số điện thoại giao hàng",
                                   },{
                                        validator:validatePhoneNumber,
                                   }
                              ]
                         }
                         >
                              <Input addonBefore="+84" placeholder="Số điện thoại" value={isLoggedIn ? users[0].email : ""} size="large"/>
                         </Form.Item>
                         <Form.Item 
                         name="email"
                         hasFeedback
                         label="Email"
                         // labelCol={{span:24}}
                         // wrapperCol={{span:24}}
                         rules={
                              [
                                   {
                                        required:true,
                                        message:"Nhập Email đặt hàng",
                                   },
                                   {
                                        type:"email",
                                        message:"Email của bạn không chính xác"
                                   }
                              ]
                         }
                         >
                              <Input placeholder="Nhập Email" size="large" value=""/>
                         </Form.Item>
                         <Form.Item name="address" hasFeedback 
                         label="Địa chỉ"
                         // labelCol={{span:24}}
                         // wrapperCol={{span:24}}
                         rules={
                              [
                                   {
                                        required:true,
                                        message:"Nhập địa chỉ giao hàng",
                                   }
                              ]
                         }
                         >
                              <Input placeholder="Nhập địa chỉ giao hàng" value="" size="large"/>
                         </Form.Item>
                         <Form.Item>
                         <Input type="submit" value="Xác nhận" className="btn-btnUpdateInformation" size="large"/>
                         </Form.Item>
                    </Form>
                    <a href="/">                 
                         <p style={{color:'#F25181',padding:'1rem',marginLeft: '-10px'}}><ArrowLeftOutlined />Tiếp tục mua sắm</p>
                    </a>
                    </div>
                    </div>
                    </Col>
                    <Col flex="2">
                        <div className="list-product-checkout">
                        <List>
                        {items.slice(minValue, maxValue).map((item) => (
                              <List.Item key={item.id}>
                              <List.Item.Meta
                              avatar={<img src={item.image} style={{width:"50px"}} />}
                              title={item.name}
                              description={<div>
                                   Màu: {item.color} - 
                                   Kích thước: {item.size}  <br />
                                   Số lượng: {item.quantity} <p style={{float:'right'}}>Tổng cộng: {item.itemTotal.toLocaleString()}</p> <br/>
                                   Giá: {item.price.toLocaleString()}
                                 </div>}
                               />
                              </List.Item>
                         ))}
                         <p style={{fontSize:"20px",padding:"1rem"}}>Thành tiền : {totalItemTotal.toLocaleString()}</p>
                        </List>
                        <Pagination
                          defaultCurrent={1}
                              total={items.length}
                         defaultPageSize={pageSize}
                         onChange={handlePageChange}
                         />
                        </div>
                              
                    </Col>
               </Row>
               
          </div>
          <div className={`login-form ${showFormLogin ? 'active' : ''}`}>
          <Login onClose={handleLoginClose} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
          </div>
          </>
          
     )
}
export default DeliveryInform;