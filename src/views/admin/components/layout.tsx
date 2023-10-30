import React, { useState } from 'react';

import { GiClothes} from 'react-icons/gi';
import { IoReceiptSharp} from 'react-icons/io5';
import {TbPackageImport} from 'react-icons/tb';
import {HiUserGroup} from 'react-icons/hi';
import {PiHandshakeBold, PiChartBarFill, PiUserSquareDuotone} from 'react-icons/pi';
import {
  TeamOutlined,
  HomeOutlined,
  MailOutlined,
  MessageOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Badge, Breadcrumb, Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import ContentAdmin from './pagecontent/content';
import Search from 'antd/es/input/Search';
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
  getItem('Trang chủ','home', <HomeOutlined />),
  getItem('Khách hàng', 'Customer', <TeamOutlined />, [getItem('Thông tin khách hàng', 'Customers'), getItem('Tài khoản khách hàng', 'AccountCus')]),
  getItem('Sản phẩm', 'Product', <GiClothes />,[getItem('Sản Phẩm','Products'),getItem('Loại sản phẩm','TypePro'),
                                                getItem('Sản phẩm trong kho','ProInStock'),getItem('Thuộc tính sản phẩm','Attribute')] ),
  getItem('Đơn hàng', 'Bill', <IoReceiptSharp />,[getItem('Các đơn hàng','Orders'), getItem('Lịch sử đơn hàng','HistoryOr')] ),
  getItem('Nhập hàng', 'ImportPro', <TbPackageImport />,[getItem('Nhập hàng mới','ImportNew'),getItem('Lịch sử nhập','HistoryImp')] ),
  getItem('Nhân viên', 'Staff', <HiUserGroup />,[getItem('Thông tin nhân viên','InforStaff'),getItem('Tài khoản nhân viên','AccountStaff')] ),
  getItem('Đối tác', 'Partner',<PiHandshakeBold />,[getItem('Thông tin đối tác','InforPart'),getItem('Sản phẩm cung cấp','Provider')] ),
  getItem('Thống kê', '19', <PiChartBarFill />,[getItem('Số liệu','number'),getItem('Biểu đồ','chart')] ),
  getItem('Tin nhắn hỗ trợ', 'message', <MessageOutlined /> )
];

export default function layout() {
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
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent :'space-between' }} className='header'>
        <Menu theme="dark" mode="horizontal"  items={items1} />
        <Search placeholder="input search text" 
         style={{ width: '50%' }} />
        <div />
        <Badge dot>
            <Avatar  icon={<MailOutlined />} />
        </Badge>
      </Header>
      <Layout>
        <Sider width={250} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <Menu theme="dark" defaultSelectedKeys={['']} mode="inline" items={items} onClick={onMenuClick}/>
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

