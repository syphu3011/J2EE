import React from 'react';
import { Button, Checkbox, Form, Input, Space } from 'antd';
import { Layout} from 'antd';
import { Link } from 'react-router-dom';
const { Header, Footer, Content } = Layout;

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#000000',
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: '#ffffff',
    
  };
  
  const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    paddingInline: 50,
    minHeight: 120,
    lineHeight: '120px',
    color: '#000000',
    backgroundColor: '#ffffff',
  };  

const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  
const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  
  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };
export default class Login extends React.Component{
    
    render(){
        
        return(
        <><Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}></Space>
        <Layout>
                <Header style={headerStyle}>Đăng Nhập</Header>
                <Content style={contentStyle}> 
                <div 
                style={{ display: 'flex', alignItems: 'center' , justifyContent: 'center'}}
                >
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item<FieldType>
                            label="Tài khoản"
                            name="username"
                            rules={[{ required: true, message: 'Hãy nhập tài khoản' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Mật khẩu"
                            name="password"
                            rules={[{ required: true, message: 'Hãy nhập mật khẩu' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item<FieldType>
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{ offset: 8, span: 16 }}
                        >
                            <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Đăng nhập
                            </Button>  
                        </Form.Item>
                    </Form>
                </div>
                </Content>
            </Layout>
        </>
        )
    }
}