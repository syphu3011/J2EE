import {
  Button,
  Col,
  Layout,
  Row,
  Select,
  SelectProps,
  Skeleton,
  Space,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "../../../style/product.css";
import { Image } from "antd";
const { Header, Content } = Layout;
import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { getProductInStock } from "../../../../../controllers/modules/admin/productInStock";
import {
  editCate,
  getAllCate,
} from "../../../../../controllers/modules/admin/cate";
import {
  authenticationAdmin,
  convertB64ToImage,
} from "../../../../../../utils/util";
const headerStyle: React.CSSProperties = {
  color: "#000000",
  minHeight: 120,
  paddingInline: 10,
  lineHeight: "120px",
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
  id_type: string;
  name_type: string;
  oftype: string[];
  describe: string;
  image: string[];
}

// const originData: Item[] = [];
const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};
// for (let i = 0; i < 20; i++) {
//   originData.push({
//     key: i.toString(),
//     id_type: `${i}`,
//     name_type: `Áo quần ${i}`,
//     oftype: ["áo", "quần"],
//     describe: `Đây là quần áo`,
//     image: [
//       "https://bizweb.dktcdn.net/100/415/697/products/nta126-xpj0wgjv-1-ko0v-hinh-mat-truoc-0.jpg",
//       "https://bizweb.dktcdn.net/100/415/697/products/ahu2keci-1-iirh-hinh-mat-truoc-01.jpg",
//     ],
//   });
// }
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
const Typeproduct = () => {
  // Define
  const originData: Item[] = [];
const options: SelectProps["options"] = [];

  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();
  const [reload, setReload] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [base64String, setBase64String] = useState("");

  // ##################################################

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
        // Write to database
        // editCate(
        //   parseInt(newData[index].id_type),
        //   newData[index].name_type,
        //   newData[index].describe,
        //   parseInt(newData[index].oftype[0]),
        //   setBase64String(newData[index].image[0]),
        // ).then((rs) => {
        //   //TODO: Thêm thông báo ở đây
        //   console.log(rs);
        //   alert(rs.data.suaHangTrongKho.message);
        //   if (rs.data.suaHangTrongKho.status === 201) {
        //     // clearField();
        //     //setIsEdit(false);
        //     setReload(true);
        //   }
        // });
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
      dataIndex: "id_type",
      width: "10%",
    },
    {
      title: "Tên loại",
      dataIndex: "name_type",
      width: "15%",
      editable: true,
    },
    {
      title: "Thuộc loại",
      dataIndex: "oftype",
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
      dataIndex: "delete_type",
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
  // for (let i = 10; i < 36; i++) {
  //   options.push({
  //     value: `ao` + i,
  //     label: `ao` + i,
  //   });
  // }
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

  useEffect(() => {
    async function fetchMetaData(rs?) {
      if (rs && rs.data.dangNhapAdminVoiToken.status != 200) {
        navigate("/LoginAdmin");
        return;
      }
      // const rsFectchCate = await getca
      const rsFetchData = await getAllCate();

      var fetchData = rsFetchData.data.loai.data;
      //
      //

      fetchData.forEach((element, index) => {
        console.log("chiu luon a");
        // console.log(convertB64ToImage(element.anhminhhoa));
        // if (element.loaicha) console.log(element.loaicha.ten);
        originData.push({
          key: index,
          id_type: element.ma,
          name_type: element.ten,
          oftype: [element.loaicha ? element.loaicha.ten : "Không"],

          describe: element.mota,
          image: [convertB64ToImage(element.anhminhhoa)],
        });
      });
      // console.log("originData " + originData.length);
      setData(originData);
      // console.log("Data " + data.length);
      setIsReady(true);
    }
    // console.log(data)

    if (reload) {
      isFirstLoad ? authenticationAdmin(fetchMetaData) : fetchMetaData();
      setIsFirstLoad(false);
      setReload(false);
    }
  }, [reload]);
  // ##################################################

  return isReady ? (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <Header style={headerStyle}>
          <Row gutter={16}>
            <Col className="gutter-row" span={7}>
              <Form.Item
                label="Tên loại:"
                labelAlign="left"
                labelCol={{ span: 6 }} 
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Thuộc loại"
                labelAlign="left"
                labelCol={{ span: 6 }}
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
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item label="Mô tả">
                  <TextArea rows={4} />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={7}>
              <div>
                <Form.Item
                  label="Ảnh"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload
                    action="/upload.do"
                    listType="picture-card"
                    maxCount={1}
                  >
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={4}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Button
                  type="primary"
                  style={{ width: "50%", marginBottom: 30 }}
                >
                  Thêm
                </Button>
                <Button type="primary" style={{ width: "50%" }}>
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
                pageSize: 10, // Số hàng hiển thị trên mỗi trang
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`, // Hiển thị thông tin tổng số hàng
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
export default Typeproduct;
