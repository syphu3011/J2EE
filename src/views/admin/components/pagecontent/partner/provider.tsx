import { Layout, Select, SelectProps, Skeleton, Space } from "antd";
import "../../../style/product.css";
const { Header, Content } = Layout;
import React, { useEffect, useState } from "react";
import { Form, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { authenticationAdmin } from "../../../../../../utils/util";
import { getProvider } from "../../../../../controllers/modules/admin/provider";
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
let id_partner = "";
interface Item {
  key: string;
  id_partner: string;
  name_partner: string;
  id_product_partner: string;
  name_product_partner: string;
  type_partner: string;
  donvi_partner: string;
  // price_partner: number;
}
const optionspartner: SelectProps["options"] = [];

const Provider = () => {
  const ProviderData: Item[] = [];
  const [form] = Form.useForm();
  const [metaData, setMetaData] = useState(ProviderData);
  const [data, setData] = useState(ProviderData);
  const [reload, setReload] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();
  function compare(str, str0) {
    return str.trim().toLowerCase() == str0.trim().toLowerCase();
  }
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
      title: "Loại sản phẩm",
      dataIndex: "type_partner",
    },
    {
      title: "Đơn vị",
      dataIndex: "donvi_partner",
    },
    // {
    //   title: "Giá nhà cung cấp",
    //   dataIndex: "price_partner",
    // },
  ];

  useEffect(() => {
    async function fetchMetaData(rs?) {
      optionspartner.splice(0, optionspartner.length);
      if (rs && rs.data.dangNhapAdminVoiToken.status != 200) {
        navigate("/LoginAdmin");
        return;
      }
      const rsFetchData = await getProvider();

      // var fetchData = rsFetchData.data.nhacungcap.data;
      for (const element of rsFetchData.data.nhacungcap.data) {
        optionspartner.push({
          value: element.ma.toString(),
          label: element.ten.toString(),
        });
        for (const prod of element.sanpham) {
          ProviderData.push({
            key: element.ma,
            id_partner: element.ma,
            name_partner: element.ten,
            id_product_partner: prod.ma,
            name_product_partner: prod.ten,
            type_partner: prod.loai.reduce((pre, current) => {
              return pre + current.ten;
            }, ""),
            donvi_partner: prod.donvi.ten,
            // price_partner: 4000000,
          });
        }
      }
      setMetaData(ProviderData);
      setIsReady(true);
    }
    if (reload) {
      isFirstLoad ? authenticationAdmin(fetchMetaData) : fetchMetaData();
      setIsFirstLoad(false);
      setReload(false);
    }
  }, [reload]);
  const handleChange = (value: string) => {
    // console.log(value);
    // id_partner = value;
    // const newData = metaData.filter((item) => item.id_partner === id_partner);
    // setData(newData);
  };
  return isReady ? (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <Header style={headerStyle}>
          <Form.Item label="Đối tác:" labelAlign="left" labelCol={{ span: 2 }}>
            <Select
              allowClear
              style={{ width: "40%" }}
              placeholder="Please select"
              onChange={handleChange}
              options={optionspartner}
            />
          </Form.Item>
        </Header>
        <Content style={contentStyle}>
          <Form form={form} component={false}>
            <Table
              bordered
              dataSource={data}
              columns={columns}
              rowClassName="table-row-provider"
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
export default Provider;
