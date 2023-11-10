import {
  Button,
  Col,
  Layout,
  Row,
  Select,
  SelectProps,
  Space,
  Upload,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "../../../style/product.css";
import { Image } from "antd";
const { Header, Content } = Layout;
import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  Tag,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { RcFile } from "antd/es/upload/interface";
const headerStyle: React.CSSProperties = {
  color: "#000000",
  minHeight: 120,
  paddingInline: 10,
  lineHeight: "180px",
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
  id_pro: string;
  name_pro: string;
  type_pro: string[];
  color: string[];
  size_pro: string[];
  describe: string;
  image: string[];
}

const originData: Item[] = [];
const options: SelectProps["options"] = [];
const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};
for (let i = 0; i < 20; i++) {
  originData.push({
    key: i.toString(),
    id_pro: `${i}`,
    name_pro: `Áo quần ${i}`,
    type_pro: ["áo", "quần"],
    color: ["FF0000", "000000"],
    size_pro: ["S", "M", "L"],
    describe: `Đây là quần áo`,
    image: [
      "https://bizweb.dktcdn.net/100/415/697/products/nta126-xpj0wgjv-1-ko0v-hinh-mat-truoc-0.jpg",
      "https://bizweb.dktcdn.net/100/415/697/products/ahu2keci-1-iirh-hinh-mat-truoc-01.jpg",
    ],
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
const Product = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", numberphone: "", birthday: "", ...record });
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

  const columns = [
    {
      title: "Mã",
      dataIndex: "id_pro",
      width: "10%",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name_pro",
      width: "15%",
      editable: true,
    },
    {
      title: "Loại sản phẩm",
      dataIndex: "type_pro",
      width: "10%",
      render: (type_pro: string[]) => (
        <>
          {type_pro.map((tag) => (
            <Tag key={tag}>{tag.toUpperCase()}</Tag>
          ))}
        </>
      ),
    },
    {
      title: "Màu",
      dataIndex: "color",
      width: "15%",
      render: (color: string[]) => (
        <>
          {color.map((tag) => (
            <Tag color={tag} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Kích thước",
      dataIndex: "size_pro",
      width: "10%",
      render: (size_pro: string[]) => (
        <>
          {size_pro.map((tag) => (
            <Tag key={tag}>{tag.toUpperCase()}</Tag>
          ))}
        </>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "describe",
      editable: true,
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      width: "15%",
      render: (image: string[]) => (
        <>
          {image.map((pic) => (
            <Image width={50} height={50} src={pic} />
          ))}
        </>
      ),
    },
    {
      title: "Sửa",
      dataIndex: "editcus",
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
  ];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: `ao` + i,
      label: `ao` + i,
    });
  }
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Bạn chỉ có thể up file ảnh JPG/PNG!");
    }
    const isLt2M = file.size / 10240 / 10240 < 20;
    if (!isLt2M) {
      message.error("Dung lượng ảnh lớn hơn 10MB!");
    }
    return isJpgOrPng && isLt2M;
  };
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
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <Header style={headerStyle}>
          <Row gutter={16} >
            <Col className="gutter-row" span={5} style={{ flexFlow: 'row'}}>
              <Form.Item label="Tên" labelAlign="left" labelCol={{ span: 4 }}
              >
                <Input/>
              </Form.Item>
              <Form.Item
                label="Loại"
                labelAlign="left"
                labelCol={{ span: 4 }}
                style={{ width: "100%", height: 30, minWidth: "100%" }}
              >
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="Please select"
                  onChange={handleChange}
                  options={options}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={5}>
              <div>
                <Form.Item
                  label="Màu:"
                  labelAlign="left"
                  labelCol={{ span: 8 }}
                  style={{ width: "100%", height: 30, minWidth: "100%" }}
                >
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    onChange={handleChange}
                    options={options}
                  />
                </Form.Item>
                <Form.Item
                  label="Kích thước:"
                  labelAlign="left"
                  labelCol={{ span: 8 }}
                  style={{ width: "100%", height: 30, minWidth: "100%" }}
                >
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    onChange={handleChange}
                    options={options}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={5}>
              <div>
                <Form.Item label="Mô tả">
                  <TextArea rows={4} />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item
                  label="Ảnh"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  labelAlign="left"
                  labelCol={{ span: 4 }}
                >
                  <Upload
                    action="/upload.do"
                    listType="picture-card"
                    beforeUpload={beforeUpload}
                  >
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={3}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Button
                  type="primary"
                  style={{ width: "70%", marginBottom: 30 }}
                >
                  Thêm
                </Button>
                <Button type="primary" style={{ width: "70%" }}>
                  Làm mới
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
              rowClassName="editable-row"
              pagination={{
                onChange: cancel,
              }}
            />
          </Form>
        </Content>
              
      </Layout>
    </Space>
  );
};
export default Product;
