import React from 'react';
import { Row,Col,Form,Input, Radio, Upload } from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import UpdateSuccess,{UpdatePassSuccess} from '../../components/alert/updateSuccess';
interface UserState {
     filelist: string;
     showSuccessMessage: boolean;
     showSuccessMessForPassword:boolean;
     userProfiles: Array<String>;
     userProfilesPass: UserProfile;
     shouldPreventDefault:boolean;
   }
   interface UserProfile {
     old_pass: string;
     newPass: string;
     comfirmNewPass: string;
   }
export default class UpdateInformation extends React.Component<{},UserState> {
     constructor(props){
          super(props);
          this.state={
               filelist:'',
               userProfiles:[],
               showSuccessMessage: false,
               showSuccessMessForPassword:false,
               userProfilesPass:  {
                    old_pass: '',
                    newPass: '',
                    comfirmNewPass: '',
                  },
               shouldPreventDefault:true,


          }
     }
     handleChange = (e) => {
          const { name, value } = e.target;
          this.setState((prevState) => ({
            userProfiles: {
              ...prevState.userProfiles,
              [name]: value,
            },
          }));
        };
     handlePreview = (file) => {
          const reader = new FileReader();
          reader.onload = () => {
            const previewUrl = reader.result;
            // Hiển thị ảnh trong modal, thẻ <Image />, hoặc nơi khác tùy theo yêu cầu của bạn
            console.log(previewUrl);
          };
          reader.readAsDataURL(file.originFileObj);
        };
     handleFileUpload=(filelist)=>{
          this.setState({filelist});
     }
     
     validateEmail=(rule,value,callback)=>{
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if(value && !emailRegex.test(value)){
               callback('Email của bạn không hợp lệ!');
          }else{
               callback();
          }
     };
     validatePhoneNumber=(rule,value,callback)=>{
          const regex=/^[0-9]{10}$/;
          if(!regex.test(value)){
               callback('Số điện thoại không hợp lệ!');
          }
          else{
               callback();
          }
     }
     handleSubmitUpdateInform=async({
          username,fullname,gender,birthdate,phoneNumber,Email,address,createDate
     })=>{
          const userProfiles=[username,fullname,gender,birthdate,phoneNumber,Email,address,createDate];
          console.log("Form values:", userProfiles);
          this.setState({userProfiles});
          //this.setState({active:true});
          this.setState({showSuccessMessage:true});
          console.log("Edit Success!");
          

     }
     handleSubmitPassword = async(values: any): Promise<void>=>{
        const { old_pass, newPass, comfirmNewPass } = values;
        console.log(values);
          const { userProfilesPass } = this.state;
         // console.log("Form values:", userProfilesPass);
          //this.setState({userProfilesPass});
         // this.setState({active:true});
          this.setState({showSuccessMessForPassword:true});
          console.log("Edit Pass Success!");
     }
     
     render(){
         /* const onChange=(date,dateString)=>{
               console.log(date, dateString);
          }*/
          
          const{showSuccessMessage,showSuccessMessForPassword,userProfilesPass,shouldPreventDefault}=this.state;
          const validatePassword = (password) => {
               const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?#&]{6,}$/;
               return passwordRegex.test(password);
             };
             if(showSuccessMessage) {
               return <UpdateSuccess/>
               
          }
          if(showSuccessMessForPassword){
               return <UpdatePassSuccess/>
          }
          return(
               <div className="update-container">
                    <Row gutter={[24, 24]}>
                         <Col className="gutter-row"flex={3}>
                         <div className="form-update-information">
                              <h3>CẬP NHẬT THÔNG TIN CÁ NHÂN</h3>
                              
                              <Form  name="wrap"
                                   labelCol={{ flex: '180px' }}
                                   labelAlign="left"
                                   labelWrap
                                   wrapperCol={{ flex: 1 }}
                                   colon={false}
                                   style={{width:600}} onFinish={this.handleSubmitUpdateInform}
                                  >
                                   <Form.Item 
                                   label="Tải ảnh"
                                   labelAlign='left'
                                    valuePropName="fileList" getValueFromEvent={(e)=>Array.isArray(e)?e:e&&e.filelist}>
                                        <Upload action="/upload.do" listType="picture-card"
                                             onChange={this.handleFileUpload}
                                             onPreview={this.handlePreview}>
                                              <div>
                                                  <PlusOutlined />
                                                  <div style={{ marginTop: 8 }}>Upload</div>
                                             </div>
                                        </Upload>
                                   </Form.Item>
                                   <Form.Item 
                                   hasFeedback
                                   name="username"
                                   label="Tên đăng nhập"
                                   labelAlign={'left'}
                                  // labelCol={{span:5}}                                 
                                  // wrapperCol={{span:12}}
                                   >
                                        <Input type="text" placeholder='phuongvy'disabled size="large" />
                                   </Form.Item>
                                   <Form.Item 
                                   hasFeedback 
                                   name="fullname"
                                   label="Họ và tên"
                                   labelAlign={'left'}
                                  // labelCol={{span:5}}
                                  // wrapperCol={{span:12}}
                                   rules={
                                        [
                                             {
                                                  required:true,
                                                  message:"Nhập họ và tên của bạn"
                                             }
                                        ]
                                   }
                                   >
                                        <Input   type="text" placeholder="" size="large"/>
                                   </Form.Item>
                                   <Form.Item 
                                   hasFeedback
                                   name="gender"
                                   label="Giới tính"
                                   labelAlign={'left'}
                                  // labelCol={{span:5}}
                                  // wrapperCol={{span:12}}
                                   rules={
                                        [
                                             {
                                                  required:true,
                                                  message:"Chọn giới tính"
                                             },
                                        ]
                                   }
                                   >
                                        <Radio.Group >
                                             <Radio value="male"> Nam</Radio>
                                             <Radio value="female"> Nữ </Radio>
                                        </Radio.Group>
                                   </Form.Item>
                                   <Form.Item
                                        hasFeedback
                                        name="birthdate"
                                        label="Ngày sinh"
                                        labelAlign='left'
                                      //  labelCol={{span:5}}
                                       // wrapperCol={{span:12}}
                                        rules={[
                                            {
                                             required:true,
                                             message:"Chọn ngày sinh của bạn!"
                                            }

                                        ]}
                                   >
                                        <Input  type="date" placeholder="" size="large"/>

                                   </Form.Item>
                                   <Form.Item
                                   hasFeedback
                                   name="phoneNumber"
                                   label="Số điện thoại"
                                   labelAlign='left'
                                   //labelCol={{span:4}}
                                  // wrapperCol={{span:12}}
                                   rules={[
                                        {
                                             required:true,
                                             message:'Nhập số điện thoại của bạn'
                                        },{
                                            validator:this.validatePhoneNumber,
                                        }
                                   ]}
                                   >
                                        <Row wrap={false}>
                                        <Col flex="none">
                                             <Input placeholder='+84' disabled size="large" style={{width:'70px'}}/>
                                             </Col>
                                             <Col flex="auto">
                                             <Input  type="text" placeholder="" size="large" width={40}/>
                                             </Col>
                                        </Row>
                                   </Form.Item>
                                   <Form.Item
                              hasFeedback
                              name="Email"
                              label="Email"
                              labelAlign='left'
                              //labelCol={{span:24}}
                              //wrapperCol={{span:24}}
                              rules={
                                   [
                                        {
                                             required:true,
                                             message:"Nhập email đăng ký tài khoản",
                                        },{
                                             validator:this.validateEmail,
                                        }
                                   ]
                              }
                              >
                                   <Input  placeholder="example@gmail.com" size="large"/>
                              </Form.Item>
                                   <Form.Item 
                                   hasFeedback
                                   name="address"
                                   label="Địa chỉ"
                                   labelAlign={'left'}
                                  // labelCol={{span:5}}
                                   //wrapperCol={{span:12}}
                                   rules={
                                        [
                                             {
                                                  required:true,
                                                  message:"Nhập địa chỉ để giao hàng"
                                             }
                                        ]
                                   }
                                   >
                                        <Input type="text" placeholder="" size="large"/>
                                   </Form.Item>
                                   <Form.Item 
                                   hasFeedback
                                   name="createDate"
                                   label="Ngày tham gia"
                                   labelAlign={'left'}
                                 //  labelCol={{span:5}}
                                  // wrapperCol={{span:12}}
                                   >
                                        <Input type="date" placeholder="" size="large" disabled/>
                                   </Form.Item>
                                   <Input type="submit" value="Cập nhật thông tin" className="btn-btnUpdateInformation" size="large"/>

                              </Form>
                              </div>
                         </Col>
                         <Col className="gutter-row" flex={2}>
                              <div className="form-update-password">
                              <h3>ĐỔI MẬT KHẨU</h3>
                              <Form name="wrap" 
                                   labelCol={{ flex: '180px' }}
                                   labelAlign="left"
                                   labelWrap
                                   wrapperCol={{ flex: 1 }}
                                   colon={false}
                                   style={{ maxWidth:600}}
                                   autoComplete='off'  onFinish={this.handleSubmitPassword}
                                  >
                                   <Form.Item
                                   hasFeedback
                                   name="old_pass"
                                   label="Mật khẩu cũ"
                                   labelAlign='left'
                                   //labelCol={{span:6}}
                                   //wrapperCol={{span:12}}
                                   rules={
                                        [
                                             {
                                                  required:true,
                                                  message:"Nhập mật khẩu cũ",
                                             },{
                                                  validator: (_, value) => {
                                                       if (validatePassword(value) && value.length >=6) {
                                                         return Promise.resolve();
                                                       }
                                                       return Promise.reject("Mật khẩu phải từ 6 kí tự trở lên, bao gồm chữ in hoa, chữ thường, ký tự đặc biệt và số");
                                             }
                                        }
                                        ]
                                   }
                                   >
                                        <Input.Password placeholder="Nhập mật khẩu cũ" size="large" value={userProfilesPass.old_pass}/>
                                   </Form.Item>
                                   <Form.Item
                                   hasFeedback
                                   name="newPass"
                                   label="Mật khẩu mới"
                                   labelAlign='left'
                                   //labelCol={{span:6}}
                                   //wrapperCol={{span:12}}
                                   rules={
                                        [
                                             {
                                                  required:true,
                                                  message:"Nhập mật khẩu mới",
                                             },{
                                                  validator: (_, value) => {
                                                       if (validatePassword(value) && value.length >=6) {
                                                         return Promise.resolve();
                                                       }
                                                       return Promise.reject("Mật khẩu phải từ 6 kí tự trở lên, bao gồm chữ in hoa, chữ thường, ký tự đặc biệt và số");
                                             }
                                        }
                                        ]
                                   }
                                   >
                                        <Input.Password placeholder="Nhập mật khẩu mới"size="large" value={userProfilesPass.newPass}/>
                                   </Form.Item>
                                   <Form.Item
                                   hasFeedback
                                   name="comfirmNewPass"
                                   label="Nhập lại mật khẩu mới"
                                   labelAlign='left'
                                   //labelCol={{span:6}}
                                   //wrapperCol={{span:12}}
                                   rules={
                                        [
                                             {
                                                  required:true,
                                                  message:"Nhập lại mật khẩu",
                                             },
                                             (
                                                  {getFieldValue}
                                             )=>({
                                                  validator(_,value){
                                                       if(!value||getFieldValue("newPass")===value){
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
                                        <Input.Password  placeholder="Nhập lại mật khẩu mới" size="large" value={userProfilesPass.comfirmNewPass}/>
                                   </Form.Item>
                                   <Input type="submit" value="Đổi mật khẩu" className="btn-btnUpdatePassword" size="large" />

                              </Form>
                              </div>
                         </Col>
                    </Row>
               </div>
          )
     }

}