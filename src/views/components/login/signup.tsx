import React from 'react';
import {Form,Row,Col,Input, Checkbox, FormInstance, Modal} from 'antd';
import {CloseOutlined } from "@ant-design/icons";
import SocialNetWorks from './socailNetWorks';
import Login  from './login';
import SuccessSignUp from '../alert/signUpSuccess';
import SuccessLogin from '../alert/LoginSuccess';
import { signup } from '../../../controllers/modules/customer/signup';

interface SignUpProps{
     onCloseSignUp:()=>void;
     isLoggedIn:boolean;
     setIsLoggedIn:(isLoggedIn:boolean)=>void;
}
interface SignUpState{
     active:boolean;
     showFormLogin:boolean;
     checked: boolean;
     isLoggedIn: boolean;
     showSuccessMessage: boolean;
     formValues: string[],
}
export default class SignUp extends React.Component<SignUpProps, SignUpState> {
     formRef = React.createRef<FormInstance>();
     constructor(props:SignUpProps){
          super(props);
          this.state={
               active:true,
               showFormLogin:false,
               checked:false,
               showSuccessMessage: false,
               formValues: [],
               isLoggedIn:false,
               
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
               active:false,
               showFormLogin:true,
          })
     }
     handleLoginClose=()=>{
          this.setState({
               //active:false,
               showFormLogin:false,
          });
          this.props.onCloseSignUp();
     }
     onCheckBoxChange = (e) => {
          this.setState({
               checked: e.target.checked
          });
     }
     validatePhoneNumber=(rule,value,callback)=>{
          const regex=/^[0-9]{10}$/;
          if(!regex.test(value)){
               callback('Số điện thoại không hợp lệ!');
          }
          else{
               callback();
          }
     }
      validation=(rule,value,callback) =>{
          if(this.state.checked){
               return callback();
          }
          return callback("Hãy nhấn đồng ý thỏa thuận về điều khoản ");
     }
     
     handleSubmit = async({ fullName, birthdate, username, Email, password, confirmPass, numberPhone }) =>{
          const regis = await signup(fullName, birthdate, Email, password, confirmPass, numberPhone)
          if (regis.data && regis.data.dangKyKhachHang.status === 201) {
               //console.log("Form values:", value); // Log the form values to the console
               const formValues = [fullName, birthdate, username, Email, password, confirmPass, numberPhone];
               console.log("Form values:", formValues);
               this.setState({formValues});
               // Display success message
               this.setState({showSuccessMessage:true});

               // Reset the form fields after successful submission
               this.formRef.current?.resetFields();
               this.setState({ active: true,showFormLogin:true});
               this.props.onCloseSignUp();
               console.log('Registration successful');
          }
          else {
               Modal.error({
                    content:"Hệ thống lỗi ! Hãy thử lại vào lần sau"
               })
          }
     }
     render(){
          /*const onChange=(date,dateString)=>{
               console.log(date, dateString);
          }*/
          const validatePassword = (password) => {
               const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
               return passwordRegex.test(password);
             };
          const{showFormLogin,showSuccessMessage,isLoggedIn}= this.state;
          /*if(showFormLogin){
               return <Login onClose={this.handleLoginClose} isLoggedIn={true} setIsLoggedIn={this.handleLoginForm}/>
          }*/
          if(showSuccessMessage) {
               return <SuccessSignUp/>
               
          }
          return(
               <div>
                    {
                         this.state.showFormLogin ? (
                              <Login onClose={this.handleLoginClose} isLoggedIn={isLoggedIn} setIsLoggedIn={this.props.setIsLoggedIn}/>
                              
                         ):(
                    
                    <Form name="signup" initialValues={{}}
                     autoComplete='off' onFinish={this.handleSubmit} ref={this.formRef}
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
                                        <Input type="date" placeholder="" size="large"/>

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
                                   ,{
                                        validator: (_, value) => {
                                             if (validatePassword(value) && value.length >=6) {
                                               return Promise.resolve();
                                             }
                                             return Promise.reject("Mật khẩu phải từ 6 kí tự trở lên, bao gồm chữ in hoa, chữ thường, ký tự đặc biệt và số");
                                   }
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
                                        },

                                        (
                                             {getFieldValue}
                                        ) =>({
                                             validator(_,value){
                                                  if(!value||getFieldValue("password")===value){
                                                       return Promise.resolve();
                                                  }
                                                  return Promise.reject(
                                                       new Error(
                                                            "Mật khẩu xác nhận không đúng!"
                                                  )
                                                  )
                                             }
                                        })
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
                                             validator:this.validatePhoneNumber,
                                        }
                                   

                                   ]
                              }
                              >
                                   
                                   <Input addonBefore="+84" type="text" placeholder="Phone number" size="large"/>

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
                                        validator:this.validation
                                   }
                              ]
                         }
                         >
                              <Checkbox checked={this.state.checked} onChange={this.onCheckBoxChange}>
                                   <p>Tôi đã đọc và đồng ý với Điều kiện sử dụng - thỏa thuận</p>
                              </Checkbox>
                         </Form.Item>
                    </Form.Item>
                    <Input type="submit" value="Đăng ký" className="btn-btnLogin"/>
                    <p onClick={this.handleLoginForm}>Hoặc bạn đã là thành viên ?<a className="create-account"> Đăng nhập</a> </p>
                    
                    </Form>
                    )}
               </div>
          )
     }
}