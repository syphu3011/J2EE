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
  id_import: string;
  imp_partner: string;
  name_staff_imp: string;
  date_imp: string;
  total_money: number;
}
const dateFormat = "DD/MM/YYYY";
const originData: Item[] = [];
for (let i = 0; i < 20; i++) {
  originData.push({
    key: i.toString(),
    id_import: `${i}`,
    imp_partner: `NCC ${i}`,
    name_staff_imp: `Nguyễn văn ${i}`,
    date_imp: "23/10/2023",
    total_money: 56300000,
  });
}

const Order = () => {
  const [form] = Form.useForm();
  const [data] = useState(originData);
  const columns = [
    {
      title: "Mã phiếu",
      dataIndex: "id_import",
      width: "8%",
    },
    {
      title: "Nhà cung cấp",
      dataIndex: "imp_partner",
      width: "auto",
    },
    {
      title: "Người nhập",
      dataIndex: "name_staff_imp",
      width: "auto",
    },
    {
      title: "Thời gian nhập",
      dataIndex: "date_imp",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total_money",
    },
  ];
  const expandedRowRender = () => {

    const columns: TableColumnsType<ExpandedDataType> = [
      { title: 'Tên sản phẩm', dataIndex: 'name_pro_order' },
      { title: 'Kích thước', dataIndex: 'size_order' },
      { title: 'Màu', dataIndex: 'color_order' },
      { title: 'Giá nhập', dataIndex: 'price_order' },
      { title: 'Số lượng', dataIndex: 'amount_order' }
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        name_pro_order: 'Áo',
        size_order: 'XL',
        color_order: 'Đen',
        price_order: 230000,
        amount_order: 40,
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };
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
              <DatePicker defaultValue={dayjs()} format={dateFormat} />
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
              rowClassName="His-import-row"
            />
          </Form>
        </Content>
      </Layout>
    </Space>
  );
};
export default Order;
