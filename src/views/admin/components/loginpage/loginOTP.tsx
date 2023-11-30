import React, { useEffect } from "react";
import { Button, Form, Input, Space } from "antd";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs"
import Cookies from 'js-cookie';
import { getIsLogin, getIsOTP } from "../../../../../utils/constant";
import { otp } from "../../../../controllers/modules/admin/login";
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
  OTP?: string;
};
export default function LoginOTP() {
  const navigate = useNavigate();
  const checkOTP = async (value) => {
    const rsOTP = await otp(value.OTP)
    if (rsOTP.data && rsOTP.data.xacThucOTP && rsOTP.data.xacThucOTP.status == "200") {
      window.localStorage.setItem("chucnang", rsOTP.data.xacThucOTP.data.chucnang)
      navigate("/Admin")
    }
    else {
      //TODO: Làm cái thông báo ở đây
      if (rsOTP.data && rsOTP.data.xacThucOTP) {
        alert(rsOTP.data.xacThucOTP.message)
        if (rsOTP.data.xacThucOTP.status === "401") {
          navigate("/LoginAdmin")
        }
      }
      else {
        alert("Có lỗi xảy ra!")
      }
    }
  }
  useEffect(() => {
    if (!getIsLogin() && !Cookies.get("checkOTP")) {
      navigate("/LoginAdmin")
    }
    else if (getIsOTP()) {
      navigate("/Admin")
    }
    else if (!Cookies.get("checkOTP")) {

    }
  }, [])
  return (
    <>
      <Space
        direction="vertical"
        style={{ width: "100%" }}
        size={[0, 48]}
      ></Space>
      <Layout>
        <Header style={headerStyle}>Xác thực đăng nhập ADMIN</Header>
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
              onFinish={checkOTP}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                label="Nhập mã OTP"
                labelAlign="left"
                labelCol={{ span: 10 }}
                name="OTP"
                rules={[{ required: true, message: "Hãy nhập OTP" }]}
              >
                <Input />
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
                  Xác nhận
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    </>
  );
}
