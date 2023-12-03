import {
  Button,
  Col,
  DatePicker,
  Layout,
  Row,
  Select,
  SelectProps,
  Space,
} from "antd";
import "../../../style/product.css";
const { Header, Content } = Layout;
import React, { useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
const headerStyle: React.CSSProperties = {
  color: "#000000",
  minHeight: 40,
  paddingInline: 10,
  lineHeight: "40px",
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
  id_partner: string;
  name_partner: string;
  id_product_partner: string;
  name_product_partner: string;
  price_partner: number;
}

const originData: Item[] = [];
const options: SelectProps["options"] = [];
for (let i = 0; i < 20; i++) {
  originData.push({
    key: i.toString(),
    id_partner: `${i}`,
    name_partner: `Nguyễn Văn ${i}`,
    id_product_partner: `233321312321`,
    name_product_partner: "18/02/2002",
    price_partner: 4000000,
  });
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text" | "Date";
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Hãy nhập ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};
const Provider = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);



  const columns = [
    {
      title: "Mã",
      dataIndex: "id_partner",
      width: "10%",
    },
    {
      title: "Tên đối tác",
      dataIndex: "name_partner",
      width: "15%",
    },
    {
      title: "Mã sản phẩm",
      dataIndex: "id_product_partner",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name_product_partner",

    },
    {
      title: "Giá nhà cung cấp",
      dataIndex: "price_partner",
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
          <Form.Item
            label="Đối tác:"
            labelAlign="left"
            labelCol={{ span: 2 }}
          >
            <Select
              allowClear
              style={{ width: "40%" }}
              placeholder="Please select"
              onChange={handleChange}
              options={options}
            />
          </Form.Item>
        </Header>
        <Content style={contentStyle}>
          <Form form={form} component={false}>
            <Table
              bordered
              dataSource={data}
              columns={mergedColumns}
              rowClassName="table-row-provider"
            />
          </Form>
        </Content>
      </Layout>
    </Space>
  );
};
export default Provider;
