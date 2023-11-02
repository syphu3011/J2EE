
import {  DatePicker, Layout, Select, Space } from 'antd';
import "../../../style/product.css"
const { Header, Content } = Layout;
import React, { useState } from 'react';
import { Form, Table } from 'antd';
import dayjs from 'dayjs';
const headerStyle: React.CSSProperties = {
    color: '#000000',
    minHeight: 60,
    paddingInline: 10,
    lineHeight: '60px',
    backgroundColor: '#ffffff',
};
const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#ffffff',
};

interface Item {
    key: string;
    id_order: string;
    id_cus: string;
    name_cus: string;
    dateconfirm: string;
    staffconfirm: string;
    total_money: number;
    status: string;
}
const dateFormat = 'DD/MM/YYYY';
const originData: Item[] = [];
for (let i = 0; i < 20; i++) {
    originData.push({
        key: i.toString(),
        id_order: `${i}`,
        id_cus: `kh ${i}`,
        name_cus: `Nguyễn văn ${i}`,
        dateconfirm: '23/10/2023',
        staffconfirm: 'NV0001',
        total_money: 56300000,
        status: 'Chờ'
    });
}

const History = () => {
    const [form] = Form.useForm();
    const [data] = useState(originData);
    const columns = [
        {
            title: 'Mã',
            dataIndex: 'id_order',
            width: 'auto',
        },
        {
            title: 'Mã khách hàng',
            dataIndex: 'id_cus',
            width: 'auto',
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'name_cus',
            width: 'auto',
        },
        {
            title: 'Ngày xác nhận',
            dataIndex: 'dateconfirm',
        },
        {
            title: 'Người xác nhận',
            dataIndex: 'staffconfirm',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'total_money',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
        },
        {
            title: 'chi tiết',
            key: 'detail',
            dataIndex: 'detail',
            width: 'auto',
            render: () => <a>chi tiết</a>,
        },
    ];
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    const mergedColumns = columns.map((col) => {
        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                inputType: col.dataIndex === 'numberphone' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
            }),
        };
    });
    return (
        <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
            <Layout>
                <Header style={headerStyle} >
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <Form.Item label="Từ ngày:">
                            <DatePicker
                                defaultValue={dayjs('01/01/2000')}
                                format={dateFormat}
                                style={{ marginRight: 10 }}
                            />
                        </Form.Item>
                        <Form.Item label="Đến ngày:">
                            <DatePicker defaultValue={dayjs()} 
                            format={dateFormat}  
                            style={{ marginRight: 10 }} />
                        </Form.Item>
                        <Form.Item label="Trạng thái">
                            <Select
                                defaultValue="Tất cả"
                                style={{ width: 120 }}
                                onChange={handleChange}
                                options={[
                                    { value: 'all', label: 'Tất cả' },
                                    { value: 'confirm', label: 'Xác nhận' },
                                    { value: 'cancel', label: 'Đã hủy' },
                                ]}
                            />
                        </Form.Item>
                    </div>
                </Header>
                <Content style={contentStyle} >
                    <Form form={form} component={false}>
                        <Table
                            bordered
                            dataSource={data}
                            columns={mergedColumns}
                            rowClassName="order-row"
                        />
                    </Form>
                </Content>
            </Layout>
        </Space>
    )
}
export default History;