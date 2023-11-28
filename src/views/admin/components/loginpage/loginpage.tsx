import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Space} from "antd";
import {authentication, login as loginAdmin} from '../../../../controllers/modules/admin/login'
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import LoadingPage from "../../../loadingPage";
import { postKeyToServer } from "../../../../controllers/modules/key";
import { getIsLogin, setIsLogin, setIsOTP } from "../../../../../utils/constant";
import { authenticationAdmin } from "../../../../../utils/util";
const { Header, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#000000",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#ffffff",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  paddingInline: 50,
  minHeight: 120,
  lineHeight: "120px",
  color: "#000000",
  backgroundColor: "#ffffff",
};

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};


type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};
export default function Login() {
  const navigate = useNavigate();
  const [isNotLoggedIn, setIsNotLoggedIn] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const login = async (value) => {
    const rsLogin = await loginAdmin(value.username, value.password)
    if (rsLogin && rsLogin.data && rsLogin.data.dangNhapAdmin && rsLogin.data.dangNhapAdmin.status == 200) {
      setIsLogin(true)
      const dateExpires = new Date()
      dateExpires.setTime(dateExpires.getTime() + 60000)
      Cookies.set("checkOTP", "true", {expires: dateExpires})
      navigate("/AccessOTP")
    }
    else {
      //TODO: làm thông báo lỗi
      alert("Tên tài khoản hoặc mật khẩu không chính xác!")
    }
  }
  useEffect(() => {
    if (!isReady) {
      if (!getIsLogin())
        authenticationAdmin((rs) => {
          setIsReady (true)
          if (rs.data && rs.data.dangNhapAdminVoiToken && rs.data.dangNhapAdminVoiToken.status == '200') {
            // Cookies.set("chucnang", rs.data.dangNhapAdminVoiToken.data.chucnang)
            setIsLogin(true)
            setIsOTP(true)
            navigate("/Admin")
          }
          else {
            setIsNotLoggedIn(true)
          }
      })
    }
  })
  return (
    isReady ? 
    <>
      <Space
        direction="vertical"
        style={{ width: "100%" }}
        size={[0, 48]}
      ></Space>
      <Layout>
        <Header style={headerStyle}>Đăng Nhập</Header>
        <Content style={contentStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={login}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                label="Tài khoản"
                name="username"
                rules={[{ required: true, message: "Hãy nhập tài khoản" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: "Hãy nhập mật khẩu" }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item<FieldType>
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 0, span: 16 }}
              >
                <Checkbox>Ghi nhớ đăng nhập</Checkbox>
              </Form.Item>

              <Form.Item
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button type="primary" htmlType="submit">
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    </>:<LoadingPage/>
  );
}
