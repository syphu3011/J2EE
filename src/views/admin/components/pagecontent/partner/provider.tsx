import {
  Button,
  Col,
  DatePicker,
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
  const optionspartner: SelectProps["options"] = [];
  const ProviderData: Item[] = [];
  const [form] = Form.useForm();
  const [data, setData] = useState(ProviderData);
  const [reload, setReload] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

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
        ProviderData.push({
          key: element.ma,
          id_partner: element.ma,
          name_partner: element.ten,
          id_product_partner: element.sanpham.ma,
          name_product_partner: element.sanpham.ten,
          type_partner: element.sanpham.loai,
          donvi_partner: element.sanpham.donvi,
          // price_partner: 4000000,
        });
        optionspartner.push({
          value: element.ma,
          label: element.ten,
        });
      }

      setIsReady(true);
    }
    if (reload) {
      isFirstLoad ? authenticationAdmin(fetchMetaData) : fetchMetaData();
      setIsFirstLoad(false);
      setReload(false);
    }
  }, [reload]);
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
              columns={mergedColumns}
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
