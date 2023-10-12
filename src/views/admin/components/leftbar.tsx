import React, { useState } from 'react';

import { GiClothes} from 'react-icons/gi';
import { IoReceiptSharp} from 'react-icons/io5';
import {TbPackageImport} from 'react-icons/tb';
import {HiUserGroup} from 'react-icons/hi';
import {PiHandshakeBold, PiChartBarFill, PiUserSquareDuotone} from 'react-icons/pi';
import {
  TeamOutlined,
  HomeOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import ContentAdmin from './content';
const { Header, Content, Sider } = Layout;
const items1:MenuItem[]=[ getItem('Admin', 'user', <PiUserSquareDuotone />, [getItem('Đăng xuất', 'log_out')])];

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
  getItem('Trang chủ', '', <HomeOutlined />),
  getItem('Khách hàng', '', <TeamOutlined />, [getItem('Thông tin KH', 'Customer'), getItem('Tài khoản KH', 'AccountCus')]),
  getItem('Sản phẩm', 'Pro', <GiClothes />,[getItem('Sản Phẩm','Product'),getItem('kích thước','Size'),getItem('Máu sắc','color')] ),
  getItem('Đơn hàng', '11', <IoReceiptSharp />,[getItem('option1','Receipt')] ),
  getItem('Nhập hàng', '13', <TbPackageImport />,[getItem('option1','14')] ),
  getItem('Nhân viên', '15', <HiUserGroup />,[getItem('option1','16')] ),
  getItem('Đối tác', '17',<PiHandshakeBold />,[getItem('Sản phẩm cung cấp','18')] ),
  getItem('Thống kê', '19', <PiChartBarFill />,[getItem('option1','20')] )
];

export default function Leftbar() {
  const navigate = useNavigate();
  const onMenuClick = (item)=>{
    navigate(`/${item.key}`);
  }
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }} className='header'>
        <div  />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
      </Header>
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={onMenuClick}/>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <ContentAdmin/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

