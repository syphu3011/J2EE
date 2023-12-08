import { Avatar, Breadcrumb, Col, Empty, Form, FormInstance, Input, List, Modal, Pagination, Row } from "antd";
import Login from "../login/login";
import React, { useEffect, useRef, useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useCart } from "react-use-cart";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import { buy } from "../../../controllers/modules/customer/buy";
import { getProductData } from "../product/productData";
interface DeliveryProps {
     setIsLoggedIn: (isLoggedIn: boolean) => void;
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
     const formRef = React.createRef<FormInstance>();
     const [showFormLogin, setActive] = React.useState(false);
     const [isLoggedIn, setIsLoggedIn] = React.useState(false);
     const { items, emptyCart } = useCart();
     const [minValue, setMin] = useState(0);
     const [maxValue, setMax] = useState(5);
     const [form] = Form.useForm();
     const [formValues, setFormValues] = React.useState(null);

     const handleLoginForm = () => {
          setActive(!showFormLogin);
     }
     const handleLoginClose = () => {
          setActive(false)
     }
     const validatePhoneNumber = (rule, value, callback) => {
          const regex = /^[0-9]{10}$/;
          if (!regex.test(value)) {
               callback('Số điện thoại không hợp lệ!');
          }
          else {
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
     const convertToNonAccentVietnamese = (string) => {
          var accentVietnamese = 'àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴĐ';
          var nonAccentVietnamese = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyydAAAAAAAAAAAAAAAAAEEEEEEEEEEEIIIIIOOOOOOOOOOOOOOOOOUUUUUUUUUUUYYYYYYD';

          let result = '';
          for (let i = 0; i < string.length; i++) {
               const char = string[i];
               const index = accentVietnamese.indexOf(char);
               if (index !== -1) {
                    result += nonAccentVietnamese[index];
               } else {
                    result += char;
               }
          }

          return result;
     };

     const generateAndDownloadPDF = async (invoiceDetails, productList) => {
          const doc = new jsPDF();
          //const { autoTable } = require('jspdf-autotable').default;

          const centerText = (text, y) => {
               const textWidth = doc.getTextWidth(text);
               const pageWidth = doc.internal.pageSize.getWidth();
               const x = (pageWidth - textWidth) / 2;
               doc.text(text, x, y);
               doc.setFont('Arial', 'bold');
          };

          centerText('BILL', 10);
          doc.text('Recipient\'s Name: ' + convertToNonAccentVietnamese(invoiceDetails.fullname), 10, 20);
          doc.text('Phone: ' + invoiceDetails.phone, 10, 30);
          doc.text('Email: ' + invoiceDetails.email, 10, 40);
          doc.text('Delivery Address: ' + convertToNonAccentVietnamese(invoiceDetails.address), 10, 50);

          const tableData = productList.map(product => [
               convertToNonAccentVietnamese(product.name),
               product.quantity,
               product.price
          ]);

          const startY = 60;
          const rowHeight = 15;
          const columns = [
               { header: 'Product', dataKey: 'product' },
               { header: 'Quantity', dataKey: 'quantity' },
               { header: 'Price', dataKey: 'price' }
          ];

          doc.setFont('Arial', 'bold');
          doc.setFillColor(200, 200, 200);
          doc.setTextColor(0, 0, 0);

          autoTable(doc, {
               startY: startY,
               head: [columns.map(column => column.header)],
               body: tableData.map(rowData => ({
                    product: rowData[0],
                    quantity: rowData[1],
                    price: rowData[2]
               })),
               columns: columns,
               margin: { top: 10, left: 10, right: 10, bottom: 10 },
               styles: { fontSize: 12 },
               columnStyles: {
                    product: { cellWidth: 80, fontStyle: 'bold' },
                    quantity: { cellWidth: 40 },
                    price: { cellWidth: 40 }
               }
          });

          const totalText = 'Total: ';
          const totalAmount = totalItemTotal.toLocaleString();

          const totalTextWidth = doc.getTextWidth(totalText);
          const totalAmountWidth = doc.getTextWidth(totalAmount);
          const pageHeight = doc.internal.pageSize.getHeight();

          const tableBottomY = startY + (tableData.length + 1) * rowHeight; // +1 for the header row
          const totalY = tableBottomY + 15;

          const totalTextX = doc.internal.pageSize.getWidth() - totalTextWidth - totalAmountWidth - 15;
          const totalAmountX = doc.internal.pageSize.getWidth() - totalAmountWidth - 15;

          doc.text(totalText, totalTextX, totalY);
          doc.text(totalAmount, totalAmountX, totalY);

          const pdfPath = 'invoice.pdf';
          doc.save(pdfPath);
          // const nodemailer = require('nodemailer')
          const fs = require('fs');

          // Đọc nội dung tệp PDF
          //const pdfContent = fs.readFileSync('invoice.pdf');

          // const transporter = nodemailer.createTransport({
          //      service: 'Gmail',
          //      auth: {
          //        user: 'vmtpshop@gmail.com',
          //        pass: 'mgca fhab qtst weev',
          //      }
          //    });

          // // Cấu hình thông tin email
          // const mailOptions = {
          // from: 'vmtpshop@gmail.com',
          // to: invoiceDetails.email,
          // subject: 'HÓA ĐƠN BẠN VỪA ĐẶT HÀNG',
          // text: 'Cám ơn bạn đã trao niềm tin cho chúng tôi!',
          // attachments: [
          // {
          // filename: pdfPath,
          // content: pdfContent
          // }
          // ]
          // };
          // try {
          //      // Gửi email sau khi đã lưu tệp PDF
          //      await transporter.sendMail(mailOptions);
          //      console.log('Email sent successfully');
          //    } catch (error) {
          //      console.log('Error occurred while sending email:', error);
          // }       
     };
     const handleSubmitDeliver = async (invoiceDetails) => {
          const getData = await getProductData("data");
          async function getIdFromName(name, colorname, sizename) {
               const data = getData.find(item => item.ten === name);
               if (data) {
                    const matchingMathang = data.mathang.find(e => e.mau.ten === colorname && e.kichco.ten === sizename);
                    if (matchingMathang) {
                         return {
                              tenId: parseInt(data.ma),
                              mauId: parseInt(matchingMathang.mau.ma),
                              kichcoID: parseInt(matchingMathang.kichco.ma),
                              soluong: parseInt(matchingMathang.soluong),
                         };
                    }
               }
          }

          const productPromises = items.map(async item => {
               const sanpham = await getIdFromName(item.name, item.color, item.size);
               const soluong = item.quantity;
               // if(sanpham.soluong===0){
               //      Modal.error({
               //           content:"Sản phẩm "+item.name+ ", màu " + item.color + ", size: "+item.size+ " đã hết hoặc không tồn tại!"+"Quý khách vui lòng đặt lại!"
               //      })
               // }
               // else if(sanpham.trangthai===2){
               //      Modal.error({
               //           content:"Sản phẩm "+item.name+ ", màu " + item.color + ", size: "+item.size+ " đã ngưng bán!"+"Quý khách vui lòng đặt hàng khác!"
               //      })
               // }
               if (soluong > sanpham.soluong) {
                    Modal.error({
                         content: "Sản phẩm " + item.name + ", màu " + item.color + ", size: " + item.size + " chỉ còn " + sanpham.soluong + ". Quý khách vui lòng sửa số lượng và đặt lại!"
                    })
               }
               return {
                    masanpham: sanpham.tenId,
                    mamau: sanpham.mauId,
                    makichco: sanpham.kichcoID,
                    soluong,
               };
          });

          // Đợi tất cả các promise hoàn thành và nhận kết quả
          const products = await Promise.all(productPromises);
          const { fullname, phone, email, address } = invoiceDetails;
          const regis = await buy(0, fullname, address, phone, email, products)
          if (regis && regis.data && regis.data.taoHoaDon) {
               if (regis.data.taoHoaDon.status === 201) {
                    // Create the PDF content using the InvoicePDF component
                    generateAndDownloadPDF(invoiceDetails, items);
                    form.resetFields();
                    emptyCart();
                    Modal.success({
                         content: 'Đơn hàng đã được gửi đến cho người bán!',
                    });
               }
          }
          else {
               Modal.error({
                    content: "Hệ thống lỗi ! Hãy thử lại vào lần sau"
               })
          }
     }
     //const{isLoggedIn,showFormLogin}=this.state;
     return (
          <>
               <div className="checkout-containter">
                    <Row>
                         <Col flex="3" style={{ borderRight: '1px solid #7a7979' }}>
                              <div className="checkout-contain">
                                   <h1>Thông tin giao hàng</h1>
                                   {/* <p>Bạn đã có tài khoản ?<h3 onClick={handleLoginForm}> Đăng nhập</h3></p> */}
                                   <div className="box-delivery">
                                        <Form form={form} name="wrap" labelCol={{ flex: '180px' }}
                                             labelAlign="left"
                                             labelWrap
                                             wrapperCol={{ flex: 1 }}
                                             colon={false}
                                             style={{ width: 700 }}
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
                                                                 required: true,
                                                                 message: "Nhập tên người nhận hàng",
                                                            }
                                                       ]
                                                  }
                                             >
                                                  <Input placeholder="Tên người nhận hàng" size="large" value="" />
                                             </Form.Item>
                                             <Form.Item
                                                  name="phone" hasFeedback
                                                  label="Số điện thoại"
                                                  // labelCol={{span:24}}
                                                  // wrapperCol={{span:24}}
                                                  rules={
                                                       [
                                                            {
                                                                 required: true,
                                                                 message: "Nhập số điện thoại giao hàng",
                                                            }, {
                                                                 validator: validatePhoneNumber,
                                                            }
                                                       ]
                                                  }
                                             >
                                                  <Input addonBefore="+84" placeholder="Số điện thoại" value="" size="large" />
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
                                                                 required: true,
                                                                 message: "Nhập Email đặt hàng",
                                                            },
                                                            {
                                                                 type: "email",
                                                                 message: "Email của bạn không chính xác"
                                                            }
                                                       ]
                                                  }
                                             >
                                                  <Input placeholder="Nhập Email" size="large" value={isLoggedIn ? users[0].email : ""} />
                                             </Form.Item>
                                             <Form.Item name="address" hasFeedback
                                                  label="Địa chỉ"
                                                  // labelCol={{span:24}}
                                                  // wrapperCol={{span:24}}
                                                  rules={
                                                       [
                                                            {
                                                                 required: true,
                                                                 message: "Nhập địa chỉ giao hàng",
                                                            }
                                                       ]
                                                  }
                                             >
                                                  <Input placeholder="Nhập địa chỉ giao hàng" value="" size="large" />
                                             </Form.Item>
                                             <Form.Item>
                                                  <Input type="submit" value="Xác nhận" className="btn-btnUpdateInformation" size="large" />
                                             </Form.Item>
                                        </Form>
                                        <a href="/">
                                             <p style={{ color: '#F25181', padding: '1rem', marginLeft: '-10px' }}><ArrowLeftOutlined />Tiếp tục mua sắm</p>
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
                                                       avatar={<img src={item.image} style={{ width: "50px" }} />}
                                                       title={item.name}
                                                       description={<div>
                                                            Màu: {item.color} -
                                                            Kích thước: {item.size}  <br />
                                                            Số lượng: {item.quantity} <p style={{ float: 'right' }}>Tổng cộng: {item.itemTotal.toLocaleString()}</p> <br />
                                                            Giá: {item.price.toLocaleString()}
                                                       </div>}
                                                  />
                                             </List.Item>
                                        ))}
                                        <p style={{ fontSize: "20px", padding: "1rem", float: "right", color: "#F25181" }}>Thành tiền : {totalItemTotal.toLocaleString()} VND</p>
                                   </List>
                                   <Pagination
                                        defaultCurrent={1}
                                        total={items.length}
                                        defaultPageSize={pageSize}
                                        onChange={handlePageChange} style={{ padding: "1rem" }}
                                   />
                              </div>

                         </Col>
                    </Row>

               </div>
               <div className={`login-form ${showFormLogin ? 'active' : ''}`}>
                    <Login onClose={handleLoginClose} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
               </div>
               <div>
               </div>
          </>

     )
}
export default DeliveryInform;