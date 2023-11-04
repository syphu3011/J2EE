import React from 'react';
import {CloseOutlined } from "@ant-design/icons";
import SocailNetworks from "./socailNetWorks";
import { Checkbox, Form,FormInstance,Input} from 'antd';
import ForgotPaswords from './forgotPassword';
import SignUp from './signup';
import SuccessLogin from '../alert/LoginSuccess';
import { login } from '../../../controllers/modules/customer/login';
interface LoginProps{
     onClose:()=>void;
     isLoggedIn:boolean;
     setIsLoggedIn:(isLoggedIn:boolean)=>void;
}
interface LoginState{
     active: boolean;
     showForgotPasswordForm:boolean;
     showFormSignUp:boolean;
     showSuccessMessage: boolean;
     isLoggedIn: boolean;
}
export default class Login extends React.Component<LoginProps,LoginState>{
     formRef = React.createRef<FormInstance>();
     constructor(props: LoginProps) {
          super(props);
          this.state = {
               active:true,
               showForgotPasswordForm:false,
               showFormSignUp:false,
               showSuccessMessage: false,
               isLoggedIn:false,
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
               active:false,
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
     handleSubmit = async (values: any) => {
          const { EmailorUsername, password } = values;
          console.log("Form values:", values); // Log the form values to the console
          let rsLogin = (await login(EmailorUsername, password))
          if (rsLogin && rsLogin.data && rsLogin.data.dangNhap && rsLogin.data.dangNhap.status == 200) {
                 // Authentication successful
                 console.log('User authenticated');
                 this.props.setIsLoggedIn(true);
                 // Reset the form fields after successful submission
                 this.formRef.current?.resetFields();
                 this.setState({showSuccessMessage:true});
                 // Close the login form
                 this.setState({ active: false,showFormSignUp:false });
                 this.props.onClose();
                 
               } 
          
          else {
               // Handle invalid username
               this.formRef.current?.setFields([
               {
                    name: 'EmailorUsername',
                    errors: ['Tên tài khoản hoặc mật khẩu không chính xác!'],
               },
               ]);
               console.log('Authentication failed');

               // Handle error (e.g., display error message)
             }  
          
        }
     render(){
          const { showSuccessMessage,showForgotPasswordForm,showFormSignUp } = this.state;          
          if(showForgotPasswordForm){
               return <ForgotPaswords  onBackToLogin={this.hanldeComback} />;
          }
         /* if (showFormSignUp) {
               return <SignUp onCloseSignUp={this.handleSignUpClose} />;
             }*/
          if(showSuccessMessage){
               
               return <SuccessLogin />
          }
          return(
               
               
                   <div className='login'>
                    {this.state.showFormSignUp?(
                         <SignUp onCloseSignUp={this.handleSignUpClose} isLoggedIn={false} setIsLoggedIn={this.props.setIsLoggedIn}/>
                    ):(
                   <Form style={{width:400}}onFinish={this.handleSubmit} ref={this.formRef}>
                         <div id="close-login-btn"><CloseOutlined onClick={this.handleLoginCloseClick} /></div>
                         <h3>ĐĂNG NHẬP</h3>
                         <SocailNetworks/><br/>
                         <p className="option-text">hoặc sử dụng tài khoản của bạn</p>
                         <Form.Item
                              name="EmailorUsername" hasFeedback
                              label="Email"
                              labelCol= {{span:24}}
                              wrapperCol={{span:24}}
                              rules ={
                                   [
                                        {
                                             required:true,
                                             message:"Nhập Email",
                                        },
                                        {
                                             type:"email",
                                             message:"Email của bạn không đúng",
                                        }
                                        
                                   ]
                              }
                         >
                              <Input placeholder="Nhập Email của bạn" size='large'></Input>
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
                         <Input type="submit" value="Đăng nhập" onSubmitCapture={e=>e.preventDefault()}  className="btn-btnLogin"/>
                         <p onClick={this.handleSignUpform}>Hoặc<a href="#" className="create-account" onClick={this.handleSignUpform}>Tạo tài khoản?</a></p>
                   </Form>
                         
                    )}
                   
                    </div> 
               
          );
     }
}