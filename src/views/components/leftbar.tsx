import React, { useState } from 'react';

// import partner from "./Image/partner.png";
import {
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { PiHandshakeThin} from 'react-icons/pi';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Trang chủ', 'sub1', <HomeOutlined />),
  getItem('Khách hàng', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Sản phẩm', '9', <FileOutlined />,[getItem('option1','10')] ),
  getItem('Đơn hàng', '11', <FileOutlined />,[getItem('option1','12')] ),
  getItem('Nhập hàng', '13', <FileOutlined />,[getItem('option1','14')] ),
  getItem('Nhân viên', '15', <FileOutlined />,[getItem('option1','16')] ),
  getItem('Đối tác', '17', <PiHandshakeThin />,[getItem('option1','18')] ),
  getItem('Thống kê', '19', <FileOutlined />,[getItem('option1','20')] )
];

export default function Leftbar() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            Đây là trang chủ
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

