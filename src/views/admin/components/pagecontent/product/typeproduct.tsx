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
  UploadFile,
  UploadProps,
  message,
  notification,
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
  addCate,
  addCate,
  editCate,
  getAllCate,
  removeCate,
} from "../../../../../controllers/modules/admin/cate";
import {
  authenticationAdmin,
  convertB64ToImage,
  getBase64AndName,
  getBase64AndName,
} from "../../../../../../utils/util";
import { RcFile, UploadChangeParam } from "antd/es/upload";
import { NotificationPlacement } from "antd/es/notification/interface";
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
  id_type: number;
  name_type: string;
  oftype: string;
  describe: string;
  image: string;
  name_image: string
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
  const [api2, NotiSP] = notification.useNotification();
  // Define
  const originData: Item[] = [];
  const options: SelectProps["options"] = [];
  const [optionsData, setOptionsData] = useState(options);
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();
  const [reload, setReload] = useState(true);
  //add
  const [nameAdd, setNameAdd] = useState(null);
  const [parentAdd, setParent] = useState(null);
  const [describe, setDescribe] = useState(null);
  const [b64Add, setB64Add] = useState(null);
  const [nameImageAdd, setNameImageAdd] = useState(null);
  //edit
  const [nameEdit, setNameEdit] = useState(null);
  const [idEdit, setIdEdit] = useState(0);
  const [parentEdit, setParentEdit] = useState(null);
  const [describeEdit, setDescribeEdit] = useState(null);
  const [b64Edit, setB64Edit] = useState("");
  const [nameImageEdit, setNameImageEdit] = useState("");
  const [isEdit, setIsEdit] = useState(null)
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [base64String, setBase64String] = useState("");
  //file list image
  const [fileListAdd, setFileListAdd] = useState([]);
  const [fileListEdit, setFileListEdit] = useState([]);
  // ##################################################
  const NotiProduct = (placement: NotificationPlacement, s: String) => {
    api2.info({
      message: `THÔNG BÁO`,
      description: s,
      placement,
    });
  };
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
  // add or edit cate
  const cateAction = () => {
    isEdit
      ? editCate(
          parseInt(idEdit+""),
          nameEdit,
          describeEdit,
          parentEdit.value,
          b64Edit,
          nameImageEdit
        ).then((rs) => {
          NotiProduct("top", rs.data.suaLoai.message);
          if (rs.data.suaLoai.status === 201) {
            clearField();
            setIsEdit(false);
            setReload(true);
          }
        })
      : addCate(
          nameAdd,
          describe,
          parentAdd.value,
          b64Add,
          nameImageAdd
        ).then((rs) => {
          NotiProduct("top", rs.data.taoLoai.message);
          if (rs.data.taoLoai.status === 201) {
            clearField();
            setReload(true);
          }
        });
  };
  const clearField = () => {
    handleChangeDescribe("");
    isEdit ? setNameImageEdit("") : setNameImageAdd("");
    isEdit ? setB64Edit("") : setB64Add("");
    isEdit ? setFileListEdit([]) : setFileListAdd([]);
    handleChangeName("");
    handleChangeParent("");
  }
  const handleDelete = (key) => {
    removeCate(parseInt(key.id_type)).then((rs) => {
      NotiProduct("top", rs.data.xoaLoai.message);
      if (rs.data.xoaLoai.status === 201) {
        clearField();
        setReload(true);
      }
    });
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
      render: (type_pro: string) => (
        <>
            <Tag key={type_pro}>{type_pro.toUpperCase()}</Tag>
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
      render: (image: string) => (
        <>
          {
            <Image width={50} height={50} src={image} />
          }
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
            onClick={() => {
              setIdEdit(record.id_type)
              setNameEdit(record.name_type)
              setNameImageEdit(record.name_image)
              setDescribeEdit(record.describe)
              setParentEdit(record.oftype)
              setFileListEdit([
                { url: record.image, name: record.name_image },
              ])
              setB64Edit(record.image)
              setIsEdit(true)
            }}
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
            onConfirm={() => handleDelete(record)}
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
// upload image
const handleChangeImage: UploadProps["onChange"] = (
  info: UploadChangeParam<UploadFile>
) => {
  console.log("ok");
  console.log(info.file);
  if (info.file.percent === 100) {
    console.log(info.file);
    // Get this url from response in real world.
    getBase64AndName(info.file.originFileObj as RcFile, (url, name) => {
      isEdit ? setB64Edit(url) : setB64Add(url);
      isEdit ? setNameImageEdit(name) : setNameImageAdd(name);
      console.log(url);
      console.log(name);
      isEdit
        ? setFileListEdit([{ url: url, name: name }])
        : setFileListAdd([{ url: url, name: name }]);
    });
  }
};
const beforeUpload = (file: UploadFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("Bạn chỉ có thể up file ảnh JPG/PNG!");
  }
  const isLt2M = file.size / 10240 / 10240 < 20;
  if (!isLt2M) {
    message.error("Dung lượng ảnh lớn hơn 10MB!");
  }
  if (isJpgOrPng) {
    isEdit ? setFileListEdit([file]) : setFileListAdd([file]);
  }
  return isJpgOrPng && isLt2M;
};
const onRemoveUpload = () => {
  if (isEdit) {
    setB64Edit("");
    setFileListEdit([]);
    setNameImageEdit("");
  } else {
    setB64Add("");
    setFileListAdd([]);
    setNameImageAdd("");
  }
};
const handleChangeDescribe = (value) => {
  const valueChange = typeof value == "string" ? value : value.target.value;
  isEdit ? setDescribeEdit(valueChange) : setDescribe(valueChange);
};
const handleChangeName = (value) => {
  const valueChange = typeof value == "string" ? value : value.target.value;
  isEdit ? setNameEdit(valueChange) : setNameAdd(valueChange);
};
const handleChangeParent = (value) => {
  // const valueChange = typeof value == "string" ? value : value.target.value;
  isEdit ? setParentEdit(value) : setParent(value);
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
      const newOptions: SelectProps["options"] = [];

      fetchData.forEach((element, index) => {
        newOptions.push({
          label: element.ten,
          value: element.ma,
        });
        console.log("chiu luon a");
        console.log(newOptions[index].label, newOptions[index].value);
        // console.log(convertB64ToImage(element.anhminhhoa));
        // if (element.loaicha) console.log(element.loaicha.ten);
        originData.push({
          key: index,
          id_type: element.ma,
          name_type: element.ten,
          oftype: element.loaicha ? element.loaicha.ten : "Không",

          describe: element.mota,
          image: convertB64ToImage(element.anhminhhoa),
          name_image: element.tenanhminhhoa
        });
      });
      // console.log("originData " + originData.length);
      setData(originData);
      setOptionsData(newOptions);
      console.log("Data " + options);
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
  const value = "";
  const [valueType, setValueType] = useState(value);
  const handleChangeNameType = (value) => {
    setValueType(value);
  };
  const [valueNote, setValueNote] = useState(value);
  const handleChangeNote = (value) => {
    setValueNote(value);
  };
  const valueSelect = { label: "", value: "" };
  const [rsVlueSelect, setValueSelect] = useState(valueSelect);
  const handleChangeSelect = (value) => {
    setValueSelect(value);
  };
  const handleAddCate = (value) => {
    // setValueType(value);
    console.log(valueType, valueNote, rsVlueSelect.value, b64Add, nameImageAdd);
    addCate(
      valueType,
      valueNote,
      rsVlueSelect.value,
      b64Add,
      nameImageAdd
    ).then((rs) => {
      console.log(rs);
      alert(rs.data.taoLoai.message);
      if (rs.data.taoLoai.status === 201) {
        // clearField();
        // setIsEdit(false);
        setReload(true);
      }
    });
  };
  // upload image
  const handleChangeImage: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    console.log("ok");
    console.log(info.file);
    if (info.file.percent === 100) {
      console.log(info.file);
      // Get this url from response in real world.
      getBase64AndName(info.file.originFileObj as RcFile, (url, name) => {
        isEdit ? setB64Edit(url) : setB64Add(url);
        isEdit ? setNameImageEdit(name) : setNameImageAdd(name);
        console.log(url);
        console.log(name);
        isEdit
          ? setFileListEdit([{ url: url, name: name }])
          : setFileListAdd([{ url: url, name: name }]);
      });
    }
  };
  // edit
  const [isEdit, setIsEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(0);
  const [nameEdit, setNameEdit] = useState("");
  const [unitEdit, setUnitEdit] = useState("");
  const [cateEdit, setCateEdit] = useState([]);
  const [descriptEdit, setDescriptEdit] = useState("");
  const [b64Edit, setB64Edit] = useState("");
  const [nameImageEdit, setNameImageEdit] = useState("");
  // add
  const [nameAdd, setNameAdd] = useState("");
  const [unitAdd, setUnitAdd] = useState("");
  const [cateAdd, setCateAdd] = useState([]);
  const [descriptAdd, setDescriptAdd] = useState("");
  const [b64Add, setB64Add] = useState("");
  const [nameImageAdd, setNameImageAdd] = useState("");

  //file list image
  const [fileListAdd, setFileListAdd] = useState([]);
  const [fileListEdit, setFileListEdit] = useState([]);
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
                <Input value={isEdit ? nameEdit : nameAdd} onChange={handleChangeName}/>
              </Form.Item>
              <Form.Item
                label="Thuộc loại"
                labelAlign="left"
                labelCol={{ span: 6 }}
                style={{ width: "100%", height: 30, minWidth: "100%" }}
              >
                <Select
                  allowClear
                  placeholder="Please select"
                  onChange={handleChangeParent}
                  labelInValue={true}
                  value={isEdit ? parentEdit : parentAdd}
                  options={optionsData}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={6}>
              <div>
                <Form.Item label="Mô tả">
                  <TextArea rows={4} value={isEdit ? describeEdit : describe} onChange={handleChangeDescribe} />
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
                    beforeUpload={beforeUpload}
                    onChange={handleChangeImage}
                    onRemove={onRemoveUpload}
                    fileList={isEdit ? fileListEdit : fileListAdd}
                    maxCount={1}
                    onChange={handleChangeImage}
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
                  onClick={cateAction}
                >
                  {isEdit ? "Sửa" : "Thêm"}
                </Button>
                {isEdit ? (
                  <Button
                    type="primary"
                    style={{
                      width: "70%",
                      marginBottom: "5%",
                      marginTop: "5%",
                    }}
                    onClick={() => {
                      setIsEdit(false);
                    }}
                  >
                    Hủy
                  </Button>
                ) : (
                  <></>
                )}
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
