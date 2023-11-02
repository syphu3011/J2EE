import { DatePicker, Layout, Space } from "antd";
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
      title: "Mã phiếu nhập",
      dataIndex: "id_import",
      width: "auto",
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
    {
      title: "Chi tiết",
      key: "detail_imp",
      dataIndex: "detail",
      width: "auto",
      render: () => <a>chi tiết</a>,
    },
    {
      key: "operation",
      dataIndex: "delete",
      width: "8%",
      render: () => <a>Xóa</a>,
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
