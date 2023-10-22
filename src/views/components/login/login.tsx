import React from 'react';
import {CloseOutlined } from "@ant-design/icons";
import SocailNetworks from "./socailNetWorks";
import { Checkbox, Form,Input} from 'antd';
import ForgotPaswords from './forgotPassword';
import SignUp from './signup';
interface LoginProps{
     onClose:()=>void;
}
interface LoginState{
     active: boolean;
     showForgotPasswordForm:boolean;
     showFormSignUp:boolean;
}
export default class Login extends React.Component<LoginProps,LoginState>{
     constructor(props: LoginProps) {
          super(props);
          this.state = {
               active:true,
               showForgotPasswordForm:false,
               showFormSignUp:false,
          };
               
     }
     handleLoginCloseClick = () => {//close form Login
          this.setState((prevState) => ({
            active: !prevState.active,
          }));
          this.props.onClose();
          
        };
     handleForgotPasswordClick = () => {
          this.setState({ showForgotPasswordForm: true });//display form ForgetPassword
     };
     hanldeComback = () => {
          this.setState({ showForgotPasswordForm: false});//hiddent form ForgotPassword

     };
     handleSignUpform=()=>{
          this.setState({
               showFormSignUp:true
          })
          
     };
     handleSignUpClose=()=>{
          
          this.setState((prevState) => ({
               active: !prevState.active,
               showFormSignUp:false
             }));
             this.props.onClose();
     }
     render(){
          const {showForgotPasswordForm,showFormSignUp } = this.state;
          if(showForgotPasswordForm){
               return <ForgotPaswords  onBackToLogin={this.hanldeComback} />;
          }
          if (showFormSignUp) {
               return <SignUp onCloseSignUp={this.handleSignUpClose} />;
             }
          return(
               
               
                   <div className='login'> 
                   <Form action="">
                         <div id="close-login-btn"><CloseOutlined onClick={this.handleLoginCloseClick} /></div>
                         <h3>ĐĂNG NHẬP</h3>
                         <SocailNetworks/><br/>
                         <p className="option-text">hoặc sử dụng tài khoản của bạn</p>
                         <Form.Item
                              name="Email hoặc tên đăng nhập" hasFeedback
                              label="Email hoặc tên đăng nhập"
                              labelCol= {{span:24}}
                              wrapperCol={{span:24}}
                              rules ={
                                   [
                                        {
                                             required:true,
                                             message:"Nhập Email hoặc tên đăng nhập",
                                        },
                                        
                                   ]
                              }
                         >
                              <Input placeholder="Nhập Email hoặc tên đăng nhập" size='large'></Input>
                         </Form.Item>
                         <Form.Item
                              name="password" hasFeedback
                              label ="Mật khẩu"
                              labelCol={{span:24}}
                              wrapperCol={{span:24}}
                              rules ={[
                                   {
                                        required :true,
                                        message :"Nhập mật khẩu ",
                                   },{
                                        min:6,
                                        message:"Mật khẩu phải từ 6 ki tự trở lên",
                                   }
                              ]}
                         >
                              <Input.Password placeholder="Mật khẩu" size="large"/>

                         </Form.Item>
                         <Form.Item>
                              <Form.Item name="remember" valuePropName="checked" noStyle>
                                   <Checkbox>Nhớ mật khẩu</Checkbox>
                              </Form.Item>
                              <div className="login-form-forgot" onClick={this.handleForgotPasswordClick}>
                                   Quên mật khẩu ?
                              </div>
                         </Form.Item>
                         <Input type="submit" value="Đăng nhập" className="btn-btnLogin"/>
                         <p onClick={this.handleSignUpform}>Hoặc<a href="#" className="create-account" onClick={this.handleSignUpform}>Tạo tài khoản?</a></p>
                   </Form>
                         
                   
                   
                    </div> 
               
          )
     }
}