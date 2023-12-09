import {
  Button,
  Checkbox,
  Col,
  Divider,
  Layout,
  Row,
  SelectProps,
  Space,
  Tag,
} from "antd";
import "../../../style/product.css";
import React, { useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { CheckboxValueType } from "antd/es/checkbox/Group";
const { Header, Content } = Layout;
const headerStyle: React.CSSProperties = {
  color: "#000000",
  minHeight: 140,
  paddingInline: 10,
  lineHeight: "140px",
  backgroundColor: "#ffffff",
  maxHeight: "100%",
  height: "unset",
};
const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#ffffff",
};
const plainOptions = ["Xem", "Thêm", "Xóa", "Sửa", "Tìm kiếm"];
const defaultCheckedList = ["Xem"];
interface Item {
  key: string;
  id_permission: string;
  name_permission: string;
  detail_permission: string[];
}

const originData: Item[] = [];
const optionsst: SelectProps["options"] = [];
const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};
for (let i = 0; i < 20; i++) {
  originData.push({
    key: i.toString(),
    id_permission: `${i}`,
    name_permission: `trạng thái ${i}`,
    detail_permission: ["Thêm", "Xóa"],
  });
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Item;
  index: number;
  children: React.ReactNode;
}
const CheckboxGroup = Checkbox.Group;
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
const Status = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");

  const cancel = () => {
    setEditingKey("");
  };
  const handleDelete = (key: React.Key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
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
      dataIndex: "id_permission",
      width: "auto",
    },
    {
      title: "Tên quyền",
      dataIndex: "name_permission",
      width: "auto",
    },
    {
      title: "Chi tiết quyền",
      dataIndex: "detail_permission",
      width: "auto",
      render: (detail_permission: String[]) => (
        <>
          {detail_permission.map((tag) => (
            <Tag>{tag.toUpperCase()}</Tag>
          ))}
        </>
      ),
    },
    {
      dataIndex: "delete_permiss",
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
  const [checkedList, setCheckedList] =
    useState<CheckboxValueType[]>(defaultCheckedList);

  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length;
  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };
  return (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <Header style={headerStyle}>
          <Row gutter={16}>
            <Col className="gutter-row" span={8}>
              <Form.Item
                label="Tên:"
                labelAlign="left"
                labelCol={{ span: 6 }}
                style={{
                  width: "100%",
                  minHeight: "100%",
                }}
              >
                <Input style={{ width: "80%" }} />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={10}>
              <Form.Item
                label="Quyền"
                labelAlign="left"
                labelCol={{ span: 3 }}
                style={{ minHeight: 30, minWidth: "100%" }}
              >
                <>
                  <Checkbox
                    indeterminate={indeterminate}
                    onChange={onCheckAllChange}
                    checked={checkAll}
                  >
                    Chọn hết
                  </Checkbox>
                  <Divider />
                  <CheckboxGroup
                    options={plainOptions}
                    value={checkedList}
                    onChange={onChange}
                  />
                </>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={6}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  minHeight: 120,
                }}
              >
                <Button
                  type="primary"
                  style={{ width: "60%", marginBottom: 10 }}
                >
                  Thêm
                </Button>
                <Button type="primary" style={{ width: "60%" }}>
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
              columns={columns}
              rowClassName="editable-permission"
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
export default Status;
