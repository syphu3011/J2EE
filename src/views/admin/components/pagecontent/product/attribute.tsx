import {
  Button,
  Col,
  Layout,
  Row,
  Select,
  SelectProps,
  Skeleton,
  Space,
} from "antd";
import "../../../style/product.css";
const { Header, Content } = Layout;
import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  editColor,
  getAllColor,
  removeColor,
} from "../../../../../controllers/modules/admin/color";
import {
  editSize,
  getAllSize,
  removeSize,
} from "../../../../../controllers/modules/admin/size";
import { getAllCate } from "../../../../../controllers/modules/admin/cate";
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
  id_att: string;
  name_att: string;
  type_att: string;
  describe: string;
}

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};
// for (let i = 0; i < 20; i++) {
//   originData.push({
//     key: i.toString(),
//     id_att: `${i}`,
//     name_att: `Đỏ ${i}`,
//     type_att: "Màu",
//     describe: `Đây là quần áo`,
//   });
// }
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
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
const Attribute = () => {
  const options: SelectProps["options"] = [];

  const originData: Item[] = [];

  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const [optionsData, setOptionsData] = useState(options);

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", numberphone: "", birthday: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };
  const [reload, setReload] = useState(true);

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (newData[index].name_att.trim() == "Màu") {
        editColor(
          parseInt(newData[index].id_att),
          newData[index].name_att
        ).then((rs) => {
          console.log(rs);
          alert(rs.data.suaMau.message);
          if (rs.data.suaMau.status === 201) {
            setReload(true);
          }
        });
      } else {
        editSize(parseInt(newData[index].id_att), newData[index].name_att).then(
          (rs) => {
            alert(rs.data.suaKichCo.message);
            if (rs.data.suaKichCo.status === 201) {
              setReload(true);
            }
          }
        );
      }
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
    const index = data.findIndex((item) => key === item.key);
    if (data[index].name_att == "Màu") {
      removeColor(parseInt(newData[index].id_att)).then((rs) => {
        console.log(rs);
        alert(rs.data.suaMau.message);
        if (rs.data.suaMau.status === 201) {
          setReload(true);
        }
      });
    } else {
      removeSize(parseInt(newData[index].id_att)).then((rs) => {
        console.log(rs);
        alert(rs.data.xoakichco.message);
        if (rs.data.xoakichco.status === 201) {
          setReload(true);
        }
      });
    }
    setData(newData);
  };

  const columns = [
    {
      title: "Mã",
      dataIndex: "id_att",
      width: "auto",
    },
    {
      title: "Tên thuộc tính",
      dataIndex: "name_att",
      width: "auto",
      editable: true,
    },
    {
      title: "Loại thuộc tính",
      dataIndex: "type_att",
      width: "auto",
    },
    {
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
    {
      dataIndex: "delete_att",
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
  options.push({
    value: `color`,
    label: `Màu`,
  });
  options.push({
    value: `size`,
    label: `Kích thước`,
  });
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
  useEffect(() => {
    async function fetchData() {
      const [dataColor, dataSize] = await Promise.all([
        getAllColor(),
        getAllSize(),
        // getAllCate(),
      ]);
      // datacate.data.loai.data.forEach((element, index) => {
      //   options.push({
      //     label: element.ten,
      //     value: element.ma,
      //   });
      // });
      setOptionsData(options);
      console.log(optionsData);
      const tempDataColor = dataColor.data.mau.data.map((mau, index) => {
        return {
          key: index,
          id_att: mau.ma,
          name_att: mau.ten,
          type_att: "Màu",
          describe: "",
        };
      });
      const tempDataSize = dataSize.data.kichco.data.map((kichco, index) => {
        return {
          key: index + dataColor.data.mau.data.length,
          id_att: kichco.ma,
          name_att: kichco.ten,
          type_att: "Kích cỡ",
          describe: "",
        };
      });
      const tempAllData = [...tempDataSize, ...tempDataColor];
      setData(tempAllData);
      setIsReady(true);
    }
    fetchData();
  }, [true]);
  const [isReady, setIsReady] = useState(false);

  const [nameAtt, setNameAtt] = useState("");
  return isReady ? (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <Header style={headerStyle}>
          <Row gutter={16}>
            <Col className="gutter-row" span={8}>
              <Form.Item label="Tên:" labelAlign="left" labelCol={{ span: 5 }}>
                <Input
                  onChange={(value) => {
                    setNameAtt(value.target.value);
                    console.log(value.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Loại"
                labelAlign="left"
                labelCol={{ span: 5 }}
                style={{ width: "100%", height: 30, minWidth: "100%" }}
              >
                <Select
                  placeholder="Hãy chọn"
                  onChange={handleChange}
                  options={optionsData}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  type="primary"
                  style={{ width: "30%", marginBottom: 30 }}
                >
                  Thêm
                </Button>
                <Button type="primary" style={{ width: "30%" }}>
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
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
    >
      <Skeleton.Input active={true} size={"large"} block={true} />
      <br />
      <Skeleton.Input active={true} size={"large"} block={true} />
      <br />
      <Skeleton.Input active={true} size={"large"} block={true} />
      <br />
      <Skeleton.Input active={true} size={"large"} block={true} />
      <br />
      <Skeleton.Input active={true} size={"large"} block={true} />
      <br />
      <Skeleton.Input active={true} size={"large"} block={true} />
      <br />
      <Skeleton.Input active={true} size={"large"} block={true} />
      <br />
      <Skeleton.Input active={true} size={"large"} block={true} />
      <br />
      <Skeleton.Input active={true} size={"large"} block={true} />
      <br />
      <Skeleton.Input active={true} size={"large"} block={true} />
      <br />
      <Skeleton.Input active={true} size={"large"} block={true} />
      <br />
      <Skeleton.Input active={true} size={"large"} block={true} />
      <br />
    </div>
  );
};
export default Attribute;
