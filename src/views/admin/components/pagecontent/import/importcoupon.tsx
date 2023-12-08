import {
  Button,
  Col,
  Layout,
  Row,
  Select,
  SelectProps,
  Skeleton,
  Space,
  Tag,
} from "antd";
import "../../../style/product.css";
const { Header, Content } = Layout;
import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import "../../../style/product.css";
import { Footer } from "antd/es/layout/layout";
import dayjs from "dayjs";
import { authenticationAdmin } from "../../../../../../utils/util";
import {
  getProviderProductColorSize,
  importProduct,
  importProductHistory,
} from "../../../../../controllers/modules/admin/importProduct";
import { useNavigate } from "react-router-dom";
import { elements } from "chart.js";
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
const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#ffffff",
};
interface Item {
  dateinit: any;
  key: string;
  id_pro_imp: string;
  name_imp: string;
  color_imp: string;
  size_imp: string;
  provider: string;
  provider_id: string;
  amount_imp: number;
  price_imp: number;
  total_imp: number;
}

interface StructOption {
  value: string;
  label: string;
}
// const originData: Item[] = [];
// const options: SelectProps["options"] = [];
// const handleChange = (value: string[]) => {
//   console.log(`selected ${value}`);
// };
// for (let i = 0; i < 11; i++) {
//   originData.push({
//     key: i.toString(),
//     id_pro_imp: `${i}`,
//     name_imp: `Áo quần ${i}`,
//     color_imp: "000000",
//     size_imp: "L",
//     provider: `Đây là quần áo`,
//     amount_imp: 15,
//     price_imp: 3200000,
//     total_imp: 3200000 * 15,
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
let productItem: StructOption = { label: "", value: "" };
let providerItem: StructOption = { label: "", value: "" };
let colorItem: StructOption = { label: "", value: "" };
let sizeItem: StructOption = { label: "", value: "" };
let amountProduct = "";
let amountPrice = "";
let priceProduct = "";

const Import = () => {
  const [totalBorrow, setTotalBorrow] = useState(0);

  // let totalBorrow = 0;
  // const options: SelectProps["options"] = [];
  const dataStruct: StructOption[] = [];
  const [productData, setProductData] = useState(dataStruct);
  const [sizeData, setSizeData] = useState(dataStruct);
  const [colorData, setColorData] = useState(dataStruct);
  const [providerData, setProviderData] = useState(dataStruct);

  // const colorItem: StructOption[] = [];

  // define
  const originData: Item[] = [];
  // const exData = [];
  // const [metaData, setMetaData] = useState(originData);

  const [isReady, setIsReady] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState(originData);
  const [reload, setReload] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  // const [expanderData, setExpanderData] = useState(exData);

  const [form] = Form.useForm();

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
    let tmp = totalBorrow - data.find((item) => item.key !== key).total_imp;
    setData(newData);
    setTotalBorrow(tmp);
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
      render: (color_imp: string) => (
        <Tag
          color={color_imp}
          key={color_imp}
          style={{ border: "1px solid black" }}
        >
          {color_imp.toUpperCase()}
        </Tag>
      ),
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
      dataIndex: "delete_import",
      width: "8%",
      render: (_: any, record: { key: React.Key }) =>
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

  const handleChange = () => {};

  useEffect(() => {
    async function fetchMetaData(rs?: {
      data: { dangNhapAdminVoiToken: { status: number } };
    }) {
      if (rs && rs.data.dangNhapAdminVoiToken.status != 200) {
        navigate("/LoginAdmin");
        return;
      }

      const rsFetchData = await getProviderProductColorSize();

      var fetchData = rsFetchData.data;
      //
      //
      const tempSanpham: StructOption[] = [];
      const tempMau: StructOption[] = [];
      const tempKichco: StructOption[] = [];
      const tempNhacungcap: StructOption[] = [];
      fetchData.sanpham.data.forEach((element: { ma: any; ten: any }) => {
        tempSanpham.push({
          value: element.ma,
          label: element.ten,
        });
      });
      fetchData.nhacungcap.data.forEach((element: { ma: any; ten: any }) => {
        tempNhacungcap.push({
          value: element.ma,
          label: element.ten,
        });
      });
      fetchData.mau.data.forEach((element: { ma: any; ten: any }) => {
        tempMau.push({
          value: element.ma,
          label: element.ten,
        });
      });
      fetchData.kichco.data.forEach((element: { ma: any; ten: any }) => {
        tempKichco.push({
          value: element.ma,
          label: element.ten,
        });
      });

      setProductData(tempSanpham);
      setColorData(tempMau);
      setProviderData(tempNhacungcap);
      setSizeData(tempKichco);

      setIsReady(true);
      setData(data);
      setEditingKey("");

      // setExpanderData(exData);
    }

    if (reload) {
      isFirstLoad ? authenticationAdmin(fetchMetaData) : fetchMetaData();
      setIsFirstLoad(false);
      setReload(false);
      setEditingKey("");
    }
  }, [reload]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [price, setPrice] = useState("");
  const [count, setCount] = useState("");
  const handleChangeProvider = (value: string, label: { label: string }) => {
    console.log(value, label);
    providerItem.label = label.label;
    providerItem.value = value;
    console.log(providerItem);
  };
  const handleChangeProduct = (value: string, label: { label: string }) => {
    console.log(value, label);
    productItem.label = label.label;
    productItem.value = value;
    console.log(productItem);
  };
  const handleChangeSize = (value: string, label: { label: string }) => {
    console.log(value, label);
    sizeItem.label = label.label;
    sizeItem.value = value;
    console.log(sizeItem);
  };
  const handleChangeColor = (value: string, label: { label: string }) => {
    console.log(value, label);
    colorItem.label = label.label;
    colorItem.value = value;
    console.log(colorItem);
  };

  const handleChangeCount = (value) => {
    // setCount(value)
    console.log(value.target.value);
    amountProduct = value.target.value;
  };
  const handleChangePrice = (value) => {
    // setPrice(value)
    console.log(value.target.value);

    priceProduct = value.target.value;
  };
  const importNewProduct = () => {
    console.log(
      productItem.label,
      " ",
      providerItem.label,
      " ",
      sizeItem.label,
      " ",
      colorItem.label,
      " ",
      priceProduct,
      " ",
      amountProduct
    );
    if (
      productItem.label == "" ||
      providerItem.label == "" ||
      sizeItem.label == "" ||
      colorItem.label == "" ||
      priceProduct == "" ||
      amountProduct == ""
    ) {
      alert("Hãy chọn các giá trị hợp lệ!");
    } else {
      const newData = [...data];
      let key = (newData.length + 1).toString();
      newData.push({
        dateinit: dayjs(),
        key: key,
        id_pro_imp: productItem.value,
        name_imp: productItem.label,
        color_imp: colorItem.label,
        size_imp: sizeItem.label,
        provider: providerItem.label,
        amount_imp: parseInt(amountProduct),
        price_imp: parseInt(priceProduct),
        total_imp: parseInt(amountProduct) * parseInt(priceProduct),
        provider_id: providerItem.value,
      });

      let tmp = totalBorrow + parseInt(amountProduct) * parseInt(priceProduct);
      setTotalBorrow(tmp);
      // setData(newData);
      // setReload(true);
      // Reset values after importing
      // setSelectedProvider(null);
      // setSelectedProduct(null);
      // setSelectedColor(null);
      // setSelectedSize(null);
      // setPrice("");
      // setCount("");

      setData(newData);
      // setReload(true);
    }
    // setEditingKey("");
    // console.log(editingKey);
  };
  const handleClickImportProduct = () => {
    data.forEach((element) => {
      // importProduct(element.provider_id,).then((rs) => {
      //   alert(rs.data.xacnhanhoachuyhoadon.message);
      //   if (rs.data.xacnhanhoachuyhoadon.status === 200) {
      //     console.log("Dung vay ma huhu");
      //     const newData = data.filter((item) => item.key !== key);
      //     console.log(newData);
      //     setData(newData);
      //     // setReload(true);
      //   }
      // });
    });
  };
  return isReady ? (
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
                  onChange={handleChangeProvider}
                  showSearch
                  options={providerData}
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
                  onChange={handleChangeProduct}
                  options={productData}
                  showSearch
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
                    // mode="multiple"

                    style={{ width: "80%" }}
                    placeholder="Please select"
                    onChange={handleChangeColor}
                    showSearch
                    options={colorData}
                  />
                </Form.Item>
                <Form.Item
                  label="Kích thước:"
                  labelAlign="left"
                  labelCol={{ span: 6 }}
                  style={{ width: "100%", height: 30, minWidth: "100%" }}
                >
                  <Select
                    // mode="multiple"
                    style={{ width: "80%" }}
                    placeholder="Please select"
                    onChange={handleChangeSize}
                    showSearch
                    options={sizeData}
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
                <Input
                  type="number"
                  style={{ width: "80%" }}
                  onChange={handleChangePrice}
                />
              </Form.Item>
              <Form.Item
                label="Số lượng:"
                labelAlign="left"
                labelCol={{ span: 5 }}
                style={{ height: 30, minWidth: "90%" }}
              >
                <Input
                  type="number"
                  style={{ width: "80%" }}
                  onChange={handleChangeCount}
                />
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
                  onClick={importNewProduct}
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
                // pageData.forEach(({ total_imp }) => {
                //   totalBorrow += total_imp;
                // });
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
        <Footer style={footerStyle}>
          <Button type="primary" style={{ width: "40%" }}>
            Xác nhận nhập hàng
          </Button>
        </Footer>
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
export default Import;
