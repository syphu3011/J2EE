import { Col, DatePicker, Layout, Row, Select, SelectProps, Space } from "antd";
import "../../../style/product.css";
const { Header, Content } = Layout;
import React, { useState } from "react";
import { Form, Table } from "antd";
import dayjs from "dayjs";
import TableType from "./Table/TableType";
import TableProduct from "./Table/TableProduct";
import TableCustomer from "./Table/TableCustomer";
import TableStaff from "./Table/TableStaff";
import TableDate from "./Table/TableDate";
import TableMonth from "./Table/TableMonth";
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

const options: SelectProps["options"] = [];
const options2: SelectProps["options"] = [];
options2.push({
  value: "Days",
  label: "Thứ",
});
options2.push({
  value: "Months",
  label: "Tháng",
});

options.push({
  value: "KH",
  label: `Khách hàng`,
});
options.push({
  value: "SP",
  label: "Sản phẩm",
});
options.push({
  value: "NV",
  label: "Nhân viên",
});
options.push({
  value: "TG",
  label: "Thời gian",
});
options.push({
  value: "LSP",
  label: "Loại sản phẩm",
});

const StatNumber = () => {
  const [form] = Form.useForm();
  const [table, setTable] = useState(TableProduct);
  const [display, setDisplay] = useState("none");
  const ChangeStatDate = (value: string) => {
    if (value == "Days") {
      setTable(TableDate);
    } else {
      setTable(TableMonth);
    }
  };
  const ChangeStat = (value: string) => {
    console.log(`selected ${value}`);
    if (value == "SP") {
      setTable(TableProduct);
      setDisplay("none");
    } else if (value == "KH") {
      setTable(TableCustomer);
      setDisplay("none");
    } else if (value == "NV") {
      setTable(TableStaff);
      setDisplay("none");
    } else if (value == "TG") {
      setTable(TableDate);
      setDisplay("inline-block");
    } else {
      setTable(TableType);
      setDisplay("none");
    }
  };
  const dateFormat = "DD/MM/YYYY";
  return (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <Header style={headerStyle}>
          <Row gutter={16}>
            <Col className="gutter-row" span={8}>
              <Form.Item
                label="Lọc theo:"
                labelAlign="left"
                labelCol={{ span: "2%" }}
              >
                <Select
                  allowClear
                  style={{ width: "60%" }}
                  placeholder="Chọn mục muốn thống kê"
                  onChange={ChangeStat}
                  options={options}
                  defaultValue="SP"
                />
                <Select
                  id="Select-date"
                  allowClear
                  style={{ width: "30%", display: `${display}` }}
                  onChange={ChangeStatDate}
                  options={options2}
                  defaultValue="Days"
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={2}></Col>
            <Col className="gutter-row" span={14}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Form.Item
                  label="Từ ngày"
                  labelAlign="left"
                  labelCol={{ span: "5%" }}
                >
                  <DatePicker
                    defaultValue={dayjs("01/01/2000", dateFormat)}
                    format={dateFormat}
                    style={{ marginRight: "2%" }}
                  />
                </Form.Item>
                <Form.Item
                  label="Đến ngày"
                  labelAlign="left"
                  labelCol={{ span: "5%" }}
                >
                  <DatePicker defaultValue={dayjs()} format={dateFormat} />
                </Form.Item>
              </div>
            </Col>
          </Row>
        </Header>
        <Content style={contentStyle}>
          <Form form={form} component={false}>
            {table}
          </Form>
        </Content>
      </Layout>
    </Space>
  );
};
export default StatNumber;
