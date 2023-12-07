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
import { Image, Skeleton } from "antd";
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
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload/interface";
import { getProducts } from "../../../../../controllers/modules/customer/products";
import {
  authenticationAdmin,
  convertB64ToImage,
  getBase64AndName,
} from "../../../../../../utils/util";
import {
  getAllCategory,
  getAllProduct,
  getAllUnit,
  addProduct,
  editProduct,
} from "../../../../../controllers/modules/admin/product";
import CONFIG_CALL from "../../../../../controllers/const";
import { useNavigate } from "react-router-dom";
// define style and interface
const headerStyle: React.CSSProperties = {
  color: "#000000",
  minHeight: 180,
  width: "100%",
  paddingInline: 20,
  marginBottom: 10,
  lineHeight: "180px",
  backgroundColor: "#ffffff",
};
const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  width: "100%",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#ffffff",
};
interface Loai {
  ma: string;
  ten: string;
}
interface Loai {
  ma: string;
  ten: string;
}
interface DonVi {
  ma: string;
  ten: string;
}
interface Item {
  key: string;
  ma: number;
  ten: string;
  loai: Loai[];
  mota: string;
  anhminhhoa: string;
  tenanhminhhoa: string;
  donvi: DonVi;
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

const Product = () => {
  const options: SelectProps["options"] = [];
  const [form] = Form.useForm();
  // define data, load, reload
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [cate, setCate] = useState(options);
  const [unit, setUnit] = useState([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [reload, setReload] = useState(true);
  const navigate = useNavigate();
  // add
  const [nameAdd, setNameAdd] = useState("");
  const [unitAdd, setUnitAdd] = useState("");
  const [cateAdd, setCateAdd] = useState([]);
  const [descriptAdd, setDescriptAdd] = useState("");
  const [b64Add, setB64Add] = useState("");
  const [nameImageAdd, setNameImageAdd] = useState("");
  // edit
  const [isEdit, setIsEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(0);
  const [nameEdit, setNameEdit] = useState("");
  const [unitEdit, setUnitEdit] = useState("");
  const [cateEdit, setCateEdit] = useState([]);
  const [descriptEdit, setDescriptEdit] = useState("");
  const [b64Edit, setB64Edit] = useState("");
  const [nameImageEdit, setNameImageEdit] = useState("");

  //file list image
  const [fileListAdd, setFileListAdd] = useState([]);
  const [fileListEdit, setFileListEdit] = useState([]);
  // define cell standard
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
  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", numberphone: "", birthday: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  // change add
  const handleChangeCate = (value: any[]) => {
    const data = value.map((e) => e.value);
    isEdit ? setCateEdit(data) : setCateAdd(data);
  };
  const handleChangeUnit = (value: string) => {
    isEdit ? setUnitEdit(value) : setUnitAdd(value);
  };
  const handleChangeName = (value) => {
    const valueChange = typeof value == "string" ? value : value.target.value;
    isEdit ? setNameEdit(valueChange) : setNameAdd(valueChange);
  };
  const handleChangeDescription = (value) => {
    const valueChange = typeof value == "string" ? value : value.target.value;
    isEdit ? setDescriptEdit(valueChange) : setDescriptAdd(valueChange);
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
  // add or edit product
  const productAction = () => {
    isEdit
      ? editProduct(
          idEdit,
          nameEdit,
          descriptEdit,
          cateEdit,
          unitEdit,
          b64Edit,
          nameImageEdit
        ).then((rs) => {
          alert(rs.data.suaSanPham.message);
          if (rs.data.suaSanPham.status === 201) {
            clearField();
            setIsEdit(false);
            setReload(true);
          }
        })
      : addProduct(
          nameAdd,
          descriptAdd,
          cateAdd,
          unitAdd,
          b64Add,
          nameImageAdd
        ).then((rs) => {
          alert(rs.data.taoSanPham.message);
          if (rs.data.taoSanPham.status === 201) {
            clearField();
            setReload(true);
          }
        });
  };
  const clearField = () => {
    handleChangeCate([]);
    handleChangeDescription("");
    isEdit ? setNameImageEdit("") : setNameImageAdd("");
    isEdit ? setB64Edit("") : setB64Add("");
    isEdit ? setFileListEdit([]) : setFileListAdd([]);
    handleChangeName("");
    handleChangeUnit("");
  };
  const save = async (key: React.Key) => {
    try {
      console.log(form.validateFields());
      const row = (await form.validateFields()) as Item;
      console.log(row);
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
  // init base columns
  const columns = [
    {
      title: "Mã",
      dataIndex: "ma",
      width: "10%",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "ten",
      width: "15%",
      editable: true,
    },
    {
      title: "Đơn vị tính",
      dataIndex: "donvi",
      width: "auto",
      editable: true,
    },
    {
      title: "Loại sản phẩm",
      dataIndex: "loai",
      width: "10%",
      render: (type_pro: Loai[]) => (
        <>
          {type_pro.map((tag) => (
            <Tag key={tag.ma}>{tag.ten.toUpperCase()}</Tag>
          ))}
        </>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "mota",
      editable: true,
    },
    {
      title: "Hình ảnh",
      dataIndex: "anhminhhoa",
      width: "15%",
      render: (anhminhhoa: string) => (
        <Image width={50} height={50} src={anhminhhoa} />
      ),
    },
    {
      title: "Sửa",
      dataIndex: "editcus",
      width: "8%",
      render: (_: any, record: Item) => {
        // const editable = isEditing(record);
        return (
          <Typography.Link
            // disabled={editingKey !== ""}
            onClick={() => {
              setIdEdit(record.ma);
              setCateEdit(record.loai.map((e) => e.ma));
              setNameEdit(record.ten);
              setUnitEdit(record.donvi.ma);
              setDescriptEdit(record.mota);
              setNameImageEdit(record.tenanhminhhoa);
              setFileListEdit([
                { url: record.anhminhhoa, name: record.tenanhminhhoa },
              ]);
              setB64Edit(record.anhminhhoa);
              setIsEdit(true);
            }}
          >
            Sửa
          </Typography.Link>
        );
      },
    },
  ];
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
    // if (Array.isArray(e)) {
    //   return e;
    // }
    return e;
  };
  //get data
  useEffect(() => {
    async function fetchProduct(rs?) {
      if (rs && rs.data.dangNhapAdminVoiToken.status != 200) {
        navigate("/LoginAdmin");
        return;
      }
      const tempData: Item[] = [];
      const tempCate: SelectProps["options"] = [];
      const tempUnit = [];
      const rsProduct = await getAllProduct();
      const rsCategory = await getAllCategory();
      const rsUnit = await getAllUnit();
      let keyIncrease = 0;
      // set up product data
      for (const prod of rsProduct.data.sanpham.data) {
        tempData.push({
          ma: parseInt(prod.ma),
          ten: prod.ten,
          key: `${keyIncrease++}`,
          loai: prod.loai,
          mota: prod.mota,
          anhminhhoa: convertB64ToImage(prod.anhminhhoa),
          donvi: prod.donvi.ten,
          tenanhminhhoa: prod.tenanhminhhoa,
        });
      }
      // set up unit data
      for (const cate of rsCategory.data.loai.data) {
        tempCate.push({
          value: cate.ma,
          label: cate.ten,
        });
      }
      // set up unit data
      for (const unit of rsUnit.data.donvi.data) {
        tempUnit.push({
          value: unit.ma,
          label: unit.ten,
        });
      }
      // set data
      setData(tempData);
      setCate(tempCate);
      setUnit(tempUnit);
      setIsReady(true);
    }
    if (reload) {
      isFirstLoad ? authenticationAdmin(fetchProduct) : fetchProduct();
      setIsFirstLoad(false);
      setReload(false);
    }
  }, [reload]);
  return isReady ? (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <Header style={headerStyle}>
          <Row gutter={16} style={{ marginBottom: "20px" }}>
            <Col className="gutter-row" span={7} style={{ flexFlow: "row" }}>
              <Form.Item
                label="Tên"
                labelAlign="left"
                labelCol={{ span: 5 }}
                style={{ width: "100%", minHeight: 30, minWidth: "100%" }}
              >
                <Input
                  value={isEdit ? nameEdit : nameAdd}
                  onChange={handleChangeName}
                />
              </Form.Item>
              <Form.Item
                label="Loại"
                labelAlign="left"
                labelCol={{ span: 5 }}
                style={{ width: "100%", minHeight: 30, minWidth: "100%" }}
              >
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="Please select"
                  onChange={handleChangeCate}
                  labelInValue={true}
                  value={isEdit ? cateEdit : cateAdd}
                  options={cate}
                />
              </Form.Item>
              <Form.Item
                label="Đơn vị"
                labelAlign="left"
                labelCol={{ span: 5 }}
                style={{ width: "100%", height: 30, minWidth: "100%" }}
              >
                <Select
                  placeholder="Please select"
                  onChange={handleChangeUnit}
                  value={isEdit ? unitEdit : unitAdd}
                  options={unit}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={7}>
              <div>
                <Form.Item label="Mô tả">
                  <TextArea
                    rows={4}
                    value={isEdit ? descriptEdit : descriptAdd}
                    onChange={handleChangeDescription}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={7}>
              <div>
                <Form.Item
                  label="Ảnh"
                  getValueFromEvent={normFile}
                  labelAlign="left"
                  labelCol={{ span: 4 }}
                >
                  <Upload
                    action="/upload.do"
                    listType="picture-card"
                    beforeUpload={beforeUpload}
                    onChange={handleChangeImage}
                    onRemove={onRemoveUpload}
                    fileList={isEdit ? fileListEdit : fileListAdd}
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
                  style={{ width: "70%", marginBottom: "5%" }}
                  onClick={productAction}
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
                <Button
                  type="primary"
                  style={{ width: "70%", marginTop: "5%" }}
                >
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
export default Product;
