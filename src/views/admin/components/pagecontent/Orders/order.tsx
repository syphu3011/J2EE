import { DatePicker, Layout, Space, TableColumnsType } from "antd";
import "../../../style/product.css";
const { Header, Content } = Layout;
import React, { useState } from "react";
import { Form, Table } from "antd";
import dayjs from "dayjs";
const headerStyle: React.CSSProperties = {
    color: "#000000",
    minHeight: 60,
    paddingInline: 10,
    lineHeight: "60px",
    backgroundColor: "#ffffff",
};
const contentStyle: React.CSSProperties = {
    textAlign: "center",
    minHeight: 120,
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#ffffff",
};

interface ExpandedDataType {
    key: React.Key;
    name_pro_order: string;
    size_order: string;
    color_order: string;
    price_order: number;
    amount_order: number;
}
interface Item {
    key: string;
    id_order: string;
    id_cus: string;
    name_cus: string;
    dateinit: string;
    total_money: number;
    status: string;
}
const dateFormat = "DD/MM/YYYY";
const originData: Item[] = [];
for (let i = 0; i < 20; i++) {
    originData.push({
        key: i.toString(),
        id_order: `${i}`,
        id_cus: `kh ${i}`,
        name_cus: `Nguyễn văn ${i}`,
        dateinit: "23/10/2023",
        total_money: 56300000,
        status: "Chờ",
    });
}

const Order = () => {
    const [form] = Form.useForm();
    const [data] = useState(originData);
    const columns = [
        {
            title: "Mã",
            dataIndex: "id_order",
            width: "auto",
        },
        {
            title: "Mã khách hàng",
            dataIndex: "id_cus",
            width: "auto",
        },
        {
            title: "Tên khách hàng",
            dataIndex: "name_cus",
            width: "auto",
        },
        {
            title: "Ngày lập",
            dataIndex: "dateinit",
        },
        {
            title: "Tổng tiền",
            dataIndex: "total_money",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
        },
        {
            key: "confirm",
            dataIndex: "confirm",
            width: "auto",
            render: () => <a>Xác nhận</a>,
        },
        {
            key: "cancel",
            dataIndex: "cancel",
            width: "auto",
            render: () => <a>Hủy</a>,
        },
    ];

    const mergedColumns = columns.map((col) => {
        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                inputType: col.dataIndex === "numberphone" ? "number" : "text",
                dataIndex: col.dataIndex,
                title: col.title,
            }),
        };
    });
    const expandedRowRender = () => {
        const columns: TableColumnsType<ExpandedDataType> = [
            { title: "Tên sản phẩm", dataIndex: "name_pro_order" },
            { title: "Kích thước", dataIndex: "size_order" },
            { title: "Màu", dataIndex: "color_order" },
            { title: "Giá", dataIndex: "price_order" },
            { title: "Số lượng", dataIndex: "amount_order" },
        ];

        const data = [];
        for (let i = 0; i < 3; ++i) {
            data.push({
                key: i.toString(),
                name_pro_order: "Áo",
                size_order: "XL",
                color_order: "Đen",
                price_order: 230000,
                amount_order: 4,
            });
        }
        return <Table columns={columns} dataSource={data} pagination={false} />;
    };
    return (
        <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
            <Layout>
                <Header style={headerStyle}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    >
                        <Form.Item label="Từ ngày:">
                            <DatePicker
                                defaultValue={dayjs("01/01/2000", dateFormat)}
                                format={dateFormat}
                                style={{ marginRight: 10 }}
                            />
                        </Form.Item>
                        <Form.Item label="Đến ngày:">
                            <DatePicker
                                defaultValue={dayjs()}
                                format={dateFormat}
                            />
                        </Form.Item>
                    </div>
                </Header>
                <Content style={contentStyle}>
                    <Form form={form} component={false}>
                        <Table
                            bordered
                            expandable={{ expandedRowRender }}
                            dataSource={data}
                            columns={mergedColumns}
                            rowClassName="order-row"
                        />
                    </Form>
                </Content>
            </Layout>
        </Space>
    );
};
export default Order;
