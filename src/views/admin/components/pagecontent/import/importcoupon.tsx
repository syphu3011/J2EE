import { Button, Col, Layout, Row, Select, SelectProps, Space } from "antd";
import "../../../style/product.css";
const { Header, Content } = Layout;
import React, { useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import "../../../style/product.css";
const headerStyle: React.CSSProperties = {
  color: "#000000",
  minHeight: 100,
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
  id_pro_imp: string;
  name_imp: string;
  color_imp: string;
  size_imp: string;
  provider: string;
  amount_imp: number;
  price_imp: number;
  total_imp: number;
}

const originData: Item[] = [];
const options: SelectProps["options"] = [];
const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};
for (let i = 0; i < 11; i++) {
  originData.push({
    key: i.toString(),
    id_pro_imp: `${i}`,
    name_imp: `Áo quần ${i}`,
    color_imp: "000000",
    size_imp: "L",
    provider: `Đây là quần áo`,
    amount_imp: 15,
    price_imp: 3200000,
    total_imp: 3200000 * 15,
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
const Import = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record: Item) => record.key === editingKey;
  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({
      name_imp: "",
      provider: "",
      amount_imp: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const handleDelete = (key: React.Key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };
  const columns = [
    {
      title: "Mã",
      dataIndex: "id_pro_imp",
      width: "5%",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name_imp",
      width: "auto",
      editable: true,
    },
    {
      title: "Màu",
      dataIndex: "color_imp",
      width: "auto",
    },
    {
      title: "Kích thước",
      dataIndex: "size_imp",
      width: "auto",
    },
    {
      title: "Nhà cung cấp",
      dataIndex: "provider",
      width: "auto",
      editable: true,
    },
    {
      title: "Số lượng",
      dataIndex: "amount_imp",
      width: "auto",
      editable: true,
    },
    {
      title: "Giá",
      dataIndex: "price_imp",
      width: "auto",
      editable: true,
    },
    {
      title: "Tổng tiền",
      dataIndex: "total_imp",
      width: "auto",
    },
    {
      dataIndex: "edit_imp",
      width: "8%",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Lưu
            </Typography.Link>
            <Popconfirm title="Bạn muốn hủy??" onConfirm={cancel}>
              <a>Hủy</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Sửa
          </Typography.Link>
        );
      },
    },
    {
      dataIndex: "delete_import",
      width: "8%",
      render: (_, record: { key: React.Key }) =>
        data.length >= 1 ? (
          <Popconfirm
            title="Bạn thật sự muốn xóa?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Xóa</a>
          </Popconfirm>
        ) : null,
    },
  ];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: `ao` + i,
      label: `ao` + i,
    });
  }
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "numberphone" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <Header style={headerStyle}>
          <Row gutter={16}>
            <Col className="gutter-row" span={7}>
              <Form.Item
                label="Nhà cung cấp"
                labelAlign="left"
                labelCol={{ span: 7 }}
                style={{ width: "100%", height: 30, minWidth: "100%" }}
              >
                <Select
                  placeholder="Please select"
                  onChange={handleChange}
                  options={options}
                />
              </Form.Item>
              <Form.Item
                label="Sản phẩm"
                labelAlign="left"
                labelCol={{ span: 7 }}
                style={{ width: "100%", height: 30, minWidth: "100%" }}
              >
                <Select
                  placeholder="Please select"
                  onChange={handleChange}
                  options={options}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={7}>
              <div>
                <Form.Item
                  label="Màu:"
                  labelAlign="left"
                  labelCol={{ span: 6 }}
                  style={{ width: "100%", height: 30, minWidth: "100%" }}
                >
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "80%" }}
                    placeholder="Please select"
                    onChange={handleChange}
                    options={options}
                  />
                </Form.Item>
                <Form.Item
                  label="Kích thước:"
                  labelAlign="left"
                  labelCol={{ span: 6 }}
                  style={{ width: "100%", height: 30, minWidth: "100%" }}
                >
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "80%" }}
                    placeholder="Please select"
                    onChange={handleChange}
                    options={options}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={7}>
              <Form.Item
                label="Giá:"
                labelAlign="left"
                labelCol={{ span: 5 }}
                style={{ height: 30, minWidth: "90%" }}
              >
                <Input style={{ width: "80%" }} />
              </Form.Item>
              <Form.Item
                label="Số lượng:"
                labelAlign="left"
                labelCol={{ span: 5 }}
                style={{ height: 30, minWidth: "90%" }}
              >
                <Input style={{ width: "80%" }} />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={3}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: 100,
                }}
              >
                <Button
                  type="primary"
                  style={{ width: "70%", marginBottom: 30 }}
                >
                  Thêm
                </Button>
              </div>
            </Col>
          </Row>
        </Header>
        <Content style={contentStyle}>
          <Form form={form} component={false}>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              dataSource={data}
              columns={mergedColumns}
              rowClassName="editable-import"
              pagination={false}
              scroll={{ x: 800, y: 500 }}
              summary={(pageData) => {
                let totalBorrow = 0;
                pageData.forEach(({ total_imp }) => {
                  totalBorrow += total_imp;
                });
                return (
                  <Table.Summary fixed>
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0}></Table.Summary.Cell>
                      <Table.Summary.Cell index={1}>
                        Tổng tiền
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={2}></Table.Summary.Cell>
                      <Table.Summary.Cell index={3}></Table.Summary.Cell>
                      <Table.Summary.Cell index={4}></Table.Summary.Cell>
                      <Table.Summary.Cell index={5}></Table.Summary.Cell>
                      <Table.Summary.Cell index={6}></Table.Summary.Cell>
                      <Table.Summary.Cell index={7}>
                        {totalBorrow}
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
export default Import;
