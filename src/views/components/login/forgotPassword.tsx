import React from 'react';
import {Form,Input, Modal} from 'antd';
import {ArrowLeftOutlined} from "@ant-design/icons";
import { forgotpassword } from '../../../controllers/modules/customer/forgotpassword';

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
     handleGetPassword = async (username) =>{
          /* this.setState((prevState) => ({
                activeForgotPasswordForm: !prevState.activeForgotPasswordForm,
                activeLogin:true
              }));
              this.props.onClose();*/
          const rs = await forgotpassword(username.enterEmail)
          if (rs.data && rs.data.quenMatKhauKhachHang) {
               if (rs.data.quenMatKhauKhachHang.status == 200) {
                    //TODO: Thêm thông báo thành công rồi mới back về
                    Modal.info({
                         content:"Mật khẩu mới đã được gửi đến email của bạn! Vui lòng kiểm tra và đăng nhập lại!"
                    })
                    //alert("Vui lòng kiểm tra email!")
                    this.props.onBackToLogin(); // Call the onBackToLogin callback
               }
               else {
                    //TODO: Thêm thông báo không thành công 
                    Modal.error({
                         content:"Vui lòng kiểm tra lại email đăng ký của bạn!"
                    })
                    alert(rs.data.quenMatKhauKhachHang.message)
               }
          }
          else {
               //TODO: Thêm thông báo không thành công từ 
               Modal.error({
                    content:"Hệ thống bị lỗi! Hãy thử lại vào lần sau!"
               })
               //alert("Có lỗi xảy ra!");
          }
 
      }
     render(){
          return(
               <div className="formForgot">
                    
                    <Form onFinish={this.handleGetPassword}>
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
                              <Input placeholder="Email" type="email" size="large" />
                              
                         </Form.Item>
                         <Form.Item>
                              <div  onClick={this.handleComeBackFormLogin}><p className="login-form-forgot-text"><ArrowLeftOutlined /> Quay lại đăng nhập</p></div>
                              <Input type="submit" value="Gửi" className="btn-btnSendEmail" />

                         </Form.Item>

                    </Form>
               </div>
          )
     }
}