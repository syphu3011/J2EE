import { Col, DatePicker, Layout, Row, Select, SelectProps, Space } from "antd";
import "../../../style/product.css";
const { Header, Content } = Layout;
import React, { useState } from "react";
import { Form, Table } from "antd";
import dayjs from "dayjs";
const headerStyle: React.CSSProperties = {
  color: "#000000",
  minHeight: 60,
  paddingInline: 10,
  lineHeight: "100px",
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
  id_type_stat: string;
  name_type_stat: string;
  provider_type_stat: string;
  amount_sell_type: number;
  income_type: number;
  expenses_type: number;
  profits_type: number;
}

const originData: Item[] = [];
const options: SelectProps["options"] = [];
options.push({
  value: "KH",
  label: `Khách hàng`,
});
options.push({
  value: "SP",
  label: "Sản phẩm",
});
const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};
for (let i = 0; i < 7; i++) {
  originData.push({
    key: i.toString(),
    id_type_stat: `${i}`,
    name_type_stat: `Áo quần ${i}`,
    provider_type_stat: "000000",
    amount_sell_type: 12,
    income_type: 15000000,
    expenses_type: 3200000,
    profits_type: 15000000 - 3200000,
  });
}

const StatNumber = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const columns = [
    {
      title: "Mã loại",
      dataIndex: "id_type_stat",
      width: "5%",
    },
    {
      title: "Loại sản phẩm",
      dataIndex: "name_type_stat",
      width: "auto",
      editable: true,
    },
    {
      title: "Nhà cung cấp",
      dataIndex: "provider_type_stat",
      width: "auto",
    },
    {
      title: "Số lượng bán",
      dataIndex: "amount_sell_type",
      width: "auto",
    },
    {
      title: "Thu",
      dataIndex: "income_type",
      width: "auto",
      editable: true,
    },
    {
      title: "Chi",
      dataIndex: "expenses_type",
      width: "auto",
      editable: true,
    },
    {
      title: "Lợi nhuận",
      dataIndex: "profits_type",
      width: "auto",
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
  const dateFormat = "DD/MM/YYYY";
  return (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <Header style={headerStyle}>
          <Row gutter={16}>
            <Col className="gutter-row" span={7}>
              <Form.Item
                label="Lọc theo:"
                labelAlign="left"
                labelCol={{ span: 5 }}
              >
                <Select
                  allowClear
                  style={{ width: "90%" }}
                  placeholder="Please select"
                  onChange={handleChange}
                  options={options}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={7}></Col>
            <Col className="gutter-row" span={7}>
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
            </Col>
          </Row>
        </Header>
        <Content style={contentStyle}>
          <Form form={form} component={false}>
            <Table
              bordered
              dataSource={data}
              columns={mergedColumns}
              pagination={false}
              scroll={{ x: 800, y: 600 }}
              summary={(pageData) => {
                let total_profits = 0;
                let total_amount_sell_type = 0;
                let total_income_type = 0;
                let total_expenses_type = 0;
                pageData.forEach(
                  ({
                    profits_type,
                    amount_sell_type,
                    income_type,
                    expenses_type,
                  }) => {
                    total_profits += profits_type;
                    total_amount_sell_type += amount_sell_type;
                    total_income_type += income_type;
                    total_expenses_type += expenses_type;
                  }
                );
                return (
                  <Table.Summary fixed>
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0}></Table.Summary.Cell>
                      <Table.Summary.Cell index={1}>Tổng</Table.Summary.Cell>
                      <Table.Summary.Cell index={2}></Table.Summary.Cell>
                      <Table.Summary.Cell index={3}>
                        {total_amount_sell_type}
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={4}>
                        {total_income_type}
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={5}>
                        {total_expenses_type}
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={6}>
                        {total_profits}
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  </Table.Summary>
                );
              }}
            />
          </Form>
        </Content>
      </Layout>
    </Space>
  );
};
export default StatNumber;
