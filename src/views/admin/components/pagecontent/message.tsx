import React from 'react';
import { Layout, Space } from 'antd';

const { Header, Footer, Sider, Content } = Layout;
const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: '#7dbcea',
  };
  
  const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 470,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#108ee9',
  };
  
  const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#3ba0e9',
  };
  
  const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#7dbcea',
  };
export default class message extends React.Component{
    render(){
        return(
            <div>
                <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
                <Layout>
                    <Sider style={siderStyle}>Chọn người nhắn</Sider>
                    <Layout>
                        <Header style={headerStyle}>Tên người đang nhắn</Header>
                        <Content style={contentStyle}>Tin nhắn</Content>
                        <Footer style={footerStyle}>Nhập tin nhắn</Footer>
                    </Layout>
                    </Layout>
                </Space>
            </div>
        )
    }
}