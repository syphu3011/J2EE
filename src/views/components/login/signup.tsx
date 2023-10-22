import React from 'react';
import {Form,Row,Col,Input,DatePicker, Checkbox} from 'antd';
import {CloseOutlined } from "@ant-design/icons";
import SocialNetWorks from './socailNetWorks';
import Login  from './login';

interface SignUpProps{
     onCloseSignUp:()=>void;
}
interface SignUpState{
     active:boolean;
     showFormLogin:boolean;
}
export default class SignUp extends React.Component<SignUpProps, SignUpState> {
     constructor(props:SignUpProps){
          super(props);
          this.state={
               active:true,
               showFormLogin:false,
          };
     }
     handleSignUpCloseClick=()=>{
          this.setState({
               active:false,
          });
          this.props.onCloseSignUp();
     }
     handleLoginForm=()=>{
          this.setState({
               showFormLogin:true,
          })
     }
     handleLoginClose=()=>{
          this.setState({
               active:false,
               showFormLogin:false,
          });
          this.props.onCloseSignUp();
     }
     render(){
          const onChange=(date,dateString)=>{
               console.log(date, dateString);
          }
          const{showFormLogin}= this.state;
          if(showFormLogin){
               return <Login onClose={this.handleLoginClose} />
          }
          return(
               <div>
                    <Form name="signup" initialValues={{}}
                    autoComplete='off' action=""
                    >
                    <div id="close-login-btn"><CloseOutlined onClick={this.handleSignUpCloseClick}  /></div>
                    <h3>ĐĂNG KÝ</h3>
                    <SocialNetWorks/><br/>
                    <p className="option-text">Hoặc đăng ký tạo một tài khoản</p>
                    <Row gutter={{xs:25,sm:30}}>
                         <Col className="gutter-row" xs={{span:24}} md={{span:12}}>
                              <Form.Item hasFeedback
                                   name="fullName"
                                   label="Họ và tên"
                                   labelCol={{span:24}}
                                   wrapperCol={{span:24}}
                                   rules={[
                                        {
                                             required:true,
                                             message:"Nhập họ và tên của bạn!"
                                        }
                                   ]}
                              >
                                   <Input placeholder="Full name" size="large"/>
                              </Form.Item>
                              
                         </Col>
                         <Col className="gutter-row" xs={{span:24}} md={{span:12}}>
                                   <Form.Item
                                        hasFeedback
                                        name="birthdate"
                                        label="Ngày sinh"
                                        labelCol={{span:24}}
                                        wrapperCol={{span:24}}
                                        rules={[
                                            {
                                             required:true,
                                             message:"Chọn ngày sinh của bạn!"
                                            }

                                        ]}
                                   >
                                        <DatePicker onChange={onChange} size="large"/>
                                   </Form.Item>
                         </Col>
                    </Row>
                    <Row gutter={{xs:25,sm:30}}>
                         <Col className="gutter-row" xs={{span:24}} md={{span:12}}>
                              <Form.Item 
                              hasFeedback
                              name="username"
                              label="Tên đăng nhập"
                              labelCol={{span:24}}
                              wrapperCol={{span:24}}
                              rules={[
                                   {
                                        required:true,
                                        message:"Tạo một tên đăng nhập."
                                   }
                              ]}
                              >
                                   <Input placeholder='Username' size="large"/> 
                              </Form.Item>
                         </Col>
                         <Col className="gutter-row" xs={{span:24}} md={{span:12}}>
                              <Form.Item
                              hasFeedback
                              name="Email"
                              label="Email"
                              labelCol={{span:24}}
                              wrapperCol={{span:24}}
                              rules={
                                   [
                                        {
                                             required:true,
                                             message:"Nhập email đăng ký tài khoản",
                                        },{
                                             type:"email",
                                             message:"Email của bạn không chính xác",
                                        }
                                   ]
                              }
                              >
                                   <Input placeholder="Email" size="large"/>
                              </Form.Item>

                         </Col>
                    </Row>
                    <Row gutter={{xs:25,sm:30}}>
                         <Col className="gutter-row" xs={{span:24}} md={{span:12}}>
                              <Form.Item
                              hasFeedback
                              name="password"
                              label="Mật khẩu"
                              labelCol={{span:24}}
                              wrapperCol={{span:24}}
                              rules={[
                                   {
                                        required:true,
                                        message :"Nhập mật khẩu"
                                   }
                              ]}
                              >
                                   <Input.Password placeholder="Password" size='large'/>
                              </Form.Item>

                         </Col>
                         <Col className="gutter-row" xs={{span:24}} md={{span:12}}>
                              <Form.Item
                              name="confirmPass"
                              label="Xác nhận lại mật khẩu"
                              labelCol={{span:24}}
                              wrapperCol={{span:24}}
                              rules={
                                   [
                                        {
                                             required:true,
                                             message :"Nhập lại mật khẩu",
                                        }
                                   ]
                              }
                              >
                                   <Input.Password placeholder='Confirm password' size="large"/>
                              </Form.Item>
                         </Col>
                    </Row>
                    <Row gutter={{xs:25,sm:30}}>
                         <Col className="gutter-row" xs={{span:24}} md={{span:12}}>
                              <Form.Item
                              hasFeedback
                              name="numberPhone"
                              label="Số điện thoại"
                              labelCol={{span:24}}
                              wrapperCol={{span:24}}
                              rules={
                                   [
                                        {
                                             required:true,
                                             message:"Nhập số điện thoại của bạn",
                                        },{
                                             type:"number",
                                             message:"Số điện thoại không đúng định dạng",
                                        }

                                   ]
                              }
                              >
                                   <Input placeholder='Phone number' size="large"/>
                              </Form.Item>
                         </Col>
                    </Row>
                    <Form.Item>
                         <Form.Item
                         name="agree"
                         valuePropName='checked'
                         noStyle
                         rules={
                              [
                                   {
                                        //validator:validation
                                   }
                              ]
                         }
                         >
                              <Checkbox >
                                   <p>Tôi đã đọc và đồng ý với Điều kiện sử dụng - thỏa thuận</p>
                              </Checkbox>
                         </Form.Item>
                    </Form.Item>
                    <Input type="submit" value="Đăng ký" className="btn-btnLogin"/>
                    <p onClick={this.handleLoginForm}>Hoặc bạn đã là thành viên ?<a className="create-account"> Đăng nhập</a> </p>
                    
                    </Form>
               </div>
          )
     }
}