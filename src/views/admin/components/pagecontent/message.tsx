import React, { useState } from 'react';
import { Button, Form, Input, Layout, Menu, MenuProps, Space } from 'antd';
import { SendOutlined } from '@ant-design/icons';

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
    color: '#000000',
    backgroundColor: '#ffffff',
    border: '1px solid'
  };

  
  const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#000000',
    backgroundColor: '#ffffff',
    minHeight: 64
  };
  type MenuItem = Required<MenuProps>['items'][number];
  function getItem(
    label: React.ReactNode,
    key: React.Key,
  ): MenuItem {
    return {
      key,
      label,  
    } as MenuItem;
  }
  
  let arr=[]
      for (let i = 0; i < 7; i++) {
        arr.push(getItem(`Khách ${i}`,`${i}`))
      };
  console.log(arr)    
  const items: MenuItem[] = arr;

export default class message extends React.Component{
  
    render(){
      const send = () => {
        console.log("đã nhấn gửi")
      };
        return(

            <div>
                <Space direction="vertical" style={{ width: '100%', border: '2px solid' }} size={[0, 48] }>
                <Layout>
                <Sider theme="light" style={{  border: '1px solid', minWidth: 150 }} >
                  <Menu theme="light" defaultSelectedKeys={['']} mode="inline" items={items}/>
                </Sider>
                    <Layout>
                        <Header style={headerStyle}>Tên người đang nhắn {}</Header>
                        <Content style={contentStyle}>Tin nhắn</Content>
                        <Footer style={footerStyle}>
                        <Form.Item >
                          <div style={{display: 'flex', flexDirection: 'row'}}>
                            <Input placeholder="Nhập câu trả lời" />
                            <Button style={{marginLeft:10}} 
                            type="primary" 
                            shape="circle" 
                            icon={<SendOutlined />}
                            onClick={send}
                            />
                          </div>
                        </Form.Item>
                        </Footer>
                    </Layout>
                    </Layout>
                </Space>
            </div>
        )
    }
}