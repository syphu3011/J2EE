import React from 'react';
import { Row, Col, Form, Input, Radio, Upload, FormInstance, Modal, DatePicker } from 'antd';
import { changePassword, changeinformation } from '../../../controllers/modules/customer/changeinformation';
import dayjs from 'dayjs';
interface UserState {
     filelist: string;
     userProfiles: any[];
}
interface UserProp {
     userProfiles: UserProfile;
}
type UserProfile = {
     ma: number;
     ten: string;
     ngaysinh: any;
     sodienthoai: any;
     tentaikhoan: any;
     diachi: string;
     ngaythamgia: any;

};
export default class UpdateInformation extends React.Component<UserProp, UserState> {
     formRef = React.createRef<FormInstance>();
     constructor(props) {
          super(props);
          this.state = {
               filelist: '',
               userProfiles: props.userProfiles,

          }
     }
     componentDidUpdate(prevProps: UserProp) {
          if (prevProps.userProfiles !== this.props.userProfiles) {
               this.setState({
                    // userProfiles: this.props.userProfiles
               });
          }
     }
     handlePreview = (file) => {
          const reader = new FileReader();
          reader.onload = () => {
               const previewUrl = reader.result;
               // Hiển thị ảnh trong modal, thẻ <Image />, hoặc nơi khác tùy theo yêu cầu của bạn
               console.log(previewUrl);
          };
          reader.readAsDataURL(file.originFileObj);
     };
     handleFileUpload = (filelist) => {
          this.setState({ filelist });
     }

     validateEmail = (rule, value, callback) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (value && !emailRegex.test(value)) {
               callback('Email của bạn không hợp lệ!');
          } else {
               callback();
          }
     };
     validatePhoneNumber = (rule, value, callback) => {
          const regex = /^[0-9]{9}$/;
          if (!regex.test(value)) {
               callback('Số điện thoại không hợp lệ!');
          }
          else {
               callback();
          }
     }
     handleSubmitUpdateInform = async ({
          fullname, birthdate, phoneNumber, address
     }) => {

          const regis = await changeinformation(this.props.userProfiles.ma, fullname, birthdate, phoneNumber)
          if (regis.data && regis.data.suaThongTinCaNhan.status === 201) {
               Modal.success({
                    content: 'Cập nhật thông tin thành công!',
               });
          }
          else {
               Modal.error({
                    content: 'Hệ thống lỗi! Vui lòng thử lại sau!',
               });
          }


     }
     handleSubmitPassword = async ({ oldPass, newPass, comfirmNewPass}) => {
          const regis = await changePassword(oldPass, newPass, comfirmNewPass)

          if (regis.data.doimatkhau.status === 201) {
               // this.formRef.current?.setFields([
               // {
               //      name:'oldPass',
               //      errors:['Mật khẩu cũ của bạn không chính xác'],
               // }
               // ])
               Modal.success({
                    content: 'Đổi mật khẩu thành công!',
               });
          }
          else {
               ///this.formRef.current?.resetFields();
               /*this.setState({
                    showSuccessMessForPassword:true
               })*/
               Modal.info({
                    content: 'Mật khẩu cũ của bạn không đúng!Hãynhập lại',
               });
          }

     };

     render() {
          /* const onChange=(date,dateString)=>{
                console.log(date, dateString);
           }*/
          const { userProfiles } = this.props;
          //const defaultValue = moment.unix(userProfiles.ngaysinh).format("DD/MM/YYYY");
          const validatePassword = (password) => {
               const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?#&]{6,}$/;
               return passwordRegex.test(password);
          };
           //  Convert Timestamp to Date
           const dateInit = new Date(parseInt(userProfiles.ngaysinh));
           // Format to date time
           const rsDateInit = `${dateInit.getFullYear()}-${(
               dateInit.getMonth() + 1).toString()
               .padStart(2, "0")}-${dateInit
                    .getDate()
                    .toString()
                    .padStart(2, "0")} ${dateInit
                         .getHours()
                         .toString()
                         .padStart(2, "0")}:${dateInit
                              .getMinutes()
                              .toString()
                              .padStart(2, "0")}:${dateInit
                                   .getSeconds()
                                   .toString()
                                   .padStart(2, "0")}`;
          return (
               <div className="update-container">

                    <Row gutter={[24, 24]}>
                         <Col className="gutter-row" flex={3}>
                              <div className="form-update-information">
                                   <h3>CẬP NHẬT THÔNG TIN CÁ NHÂN</h3>
                                   <Form name="wrap" ref={this.formRef}
                                        labelCol={{ flex: '180px' }}
                                        labelAlign="left"
                                        labelWrap
                                        initialValues={
                                             {
                                                  fullname: userProfiles.ten,
                                                  birthdate : dayjs(dateInit),
                                                  phoneNumber: userProfiles.sodienthoai,
                                                  address: userProfiles.diachi,
                                             }

                                        }
                                        wrapperCol={{ flex: 1 }}
                                        colon={false}
                                        style={{ width: 600 }} onFinish={this.handleSubmitUpdateInform}
                                   >
                                        {/* <Form.Item 
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
                                   </Form.Item> */}
                                        {/* <Form.Item 
                                   hasFeedback
                                   name="username"
                                   label="Tên đăng nhập"
                                   labelAlign={'left'}
                                  // labelCol={{span:5}}                                 
                                  // wrapperCol={{span:12}}
                                   >
                                        <Input type="text" placeholder='phuongvy'disabled size="large" />
                                   </Form.Item> */}
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
                                                            required: true,
                                                            message: "Nhập họ và tên của bạn"
                                                       }
                                                  ]
                                             }
                                        >
                                             <Input type="text" placeholder="" size="large" defaultValue={userProfiles.ten} />
                                        </Form.Item>
                                        {/* <Form.Item 
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
                                   </Form.Item> */}
                                        <Form.Item
                                             hasFeedback
                                             name="birthdate"
                                             label="Ngày sinh"
                                             labelAlign='left'
                                             //  labelCol={{span:5}}
                                             // wrapperCol={{span:12}}
                                             rules={[
                                                  {
                                                       required: true,
                                                       message: "Chọn ngày sinh của bạn!"
                                                  }

                                             ]}
                                        >
                                             <DatePicker size="large" defaultValue={dayjs(rsDateInit)} />

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
                                                       required: true,
                                                       message: 'Nhập số điện thoại của bạn'
                                                  }, {
                                                       validator: this.validatePhoneNumber,
                                                  }
                                             ]}
                                        >
                                             <Input type="text" addonBefore="+84" size="large" defaultValue={userProfiles.sodienthoai} />

                                        </Form.Item>
                                        <Form.Item
                                             hasFeedback
                                             name="Email"
                                             label="Email"
                                             labelAlign='left'
                                        //labelCol={{span:24}}
                                        //wrapperCol={{span:24}}
                                        // rules={
                                        //      [
                                        //           {
                                        //                required:true,
                                        //                message:"Nhập email đăng ký tài khoản",
                                        //           },{
                                        //                validator:this.validateEmail,
                                        //           }
                                        //      ]
                                        // }
                                        >
                                             <Input type="text" size="large" defaultValue={userProfiles.tentaikhoan} disabled />
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
                                                            required: true,
                                                            message: "Nhập địa chỉ để giao hàng"
                                                       }
                                                  ]
                                             }
                                        >
                                             <Input type="text" placeholder="" size="large" defaultValue={userProfiles.diachi} />
                                        </Form.Item>
                                        <Form.Item
                                             hasFeedback
                                             name="createDate"
                                             label="Ngày tham gia"
                                             labelAlign={'left'}
                                        //  labelCol={{span:5}}
                                        // wrapperCol={{span:12}}
                                        >
                                             <Input size="large" defaultValue={new Intl.DateTimeFormat('en-GB').format(userProfiles.ngaythamgia)} disabled />
                                        </Form.Item>
                                        <Input type="submit" value="Cập nhật thông tin" className="btn-btnUpdateInformation" size="large" />

                                   </Form>
                              </div>
                         </Col>
                         <Col className="gutter-row" flex={2}>
                              <div className="form-update-password">
                                   <h3>ĐỔI MẬT KHẨU</h3>
                                   <Form name="wrap" ref={this.formRef}
                                        labelCol={{ flex: '180px' }}
                                        labelAlign="left"
                                        labelWrap
                                        wrapperCol={{ flex: 1 }}
                                        colon={false}
                                        style={{ maxWidth: 600 }}
                                        autoComplete='off' onFinish={this.handleSubmitPassword}
                                   >
                                        <Form.Item
                                             hasFeedback
                                             name="oldPass"
                                             label="Mật khẩu cũ"
                                             labelAlign='left'
                                             //labelCol={{span:6}}
                                             //wrapperCol={{span:12}}
                                             rules={
                                                  [
                                                       {
                                                            required: true,
                                                            message: "Nhập mật khẩu cũ",
                                                       },
                                                       {
                                                            validator: (_, value) => {
                                                                 if (validatePassword(value) && value.length >= 6) {
                                                                      return Promise.resolve();
                                                                 }
                                                                 return Promise.reject("Mật khẩu phải từ 6 kí tự trở lên, bao gồm chữ in hoa, chữ thường, ký tự đặc biệt và số");
                                                            },

                                                       }
                                                  ]
                                             }
                                        >
                                             <Input.Password placeholder="Nhập mật khẩu cũ" size="large" value="" />
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
                                                            required: true,
                                                            message: "Nhập mật khẩu mới",
                                                       }, {
                                                            validator: (_, value) => {
                                                                 if (validatePassword(value) && value.length >= 6) {
                                                                      return Promise.resolve();
                                                                 }
                                                                 return Promise.reject("Mật khẩu phải từ 6 kí tự trở lên, bao gồm chữ in hoa, chữ thường, ký tự đặc biệt và số");
                                                            },
                                                       },

                                                  ]
                                             }
                                        >
                                             <Input.Password placeholder="Nhập mật khẩu mới" size="large" value="" />
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
                                                            required: true,
                                                            message: "Nhập lại mật khẩu",
                                                       },
                                                       (
                                                            { getFieldValue }
                                                       ) => ({
                                                            validator(_, value) {
                                                                 if (!value || getFieldValue("newPass") === value) {
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
                                             <Input.Password placeholder="Nhập lại mật khẩu mới" size="large" value="" />
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