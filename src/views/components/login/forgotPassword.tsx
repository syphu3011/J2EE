import React from 'react';
import {Form,Input} from 'antd';
import {ArrowLeftOutlined} from "@ant-design/icons";

interface ForgotPasswordProps{
     onBackToLogin: () => void;
}
interface ForgotPasswordState{

     //activeForgotPasswordForm:boolean;
}
export default class ForgotPaswords extends React.Component<ForgotPasswordProps, ForgotPasswordState> {
     constructor(props:ForgotPasswordProps) {
          super(props);
          this.state={
              // activeForgotPasswordForm: false,
          }
     }
     
     handleComeBackFormLogin = () =>{
         /* this.setState((prevState) => ({
               activeForgotPasswordForm: !prevState.activeForgotPasswordForm,
               activeLogin:true
             }));
             this.props.onClose();*/
             this.props.onBackToLogin(); // Call the onBackToLogin callback

     }
     
     render(){
          return(
               <div className="formForgot">
                    
                    <Form>
                         <p>Bạn quên mật khẩu ?</p>
                         <Form.Item 
                         name="enterEmail" hasFeedback
                         label="Vui lòng nhập địa chỉ Email mà bạn đăng ký"
                         labelCol={{span:24}}
                         wrapperCol={{span:24}}
                         rules={
                              [
                                   {required:true,
                                   message : "Vui lòng nhập địa chỉ Email mà bạn đăng ký",
                                   },
                                   {
                                        type:"email",
                                        message:"Địa chỉ Email của bạn không đúng",
                                   }
                              ]
                         }
                         >
                              <Input placeholder="Email" type="email" size="large" required/>
                              
                         </Form.Item>
                         <Form.Item>
                              <div  onClick={this.handleComeBackFormLogin}><p className="login-form-forgot-text"><ArrowLeftOutlined /> Quay lại đăng nhập</p></div>
                              <Input type="submit" value="Gửi" className="btn-btnSendEmail"/>

                         </Form.Item>

                    </Form>
               </div>
          )
     }
}