import {
  DatePicker,
  Layout,
  Select,
  Skeleton,
  Space,
  TableColumnsType,
} from "antd";
import "../../../style/product.css";
const { Header, Content } = Layout;
import React, { useEffect, useState } from "react";
import { Form, Table } from "antd";
import dayjs from "dayjs";
import {
  convertB64ToImage,
  authenticationAdmin,
} from "../../../../../../utils/util";
import { getAllCate } from "../../../../../controllers/modules/admin/cate";
import { useNavigate } from "react-router-dom";
import { getHistoryOrders } from "../../../../../controllers/modules/admin/order";
import { elements } from "chart.js";
const headerStyle: React.CSSProperties = {
  color: "#000000",
  minHeight: 60,
  paddingInline: 10,
  lineHeight: "60px",
  backgroundColor: "#ffffff",
};
const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#ffffff",
};
interface ExpandedDataType {
  key: React.Key;
  name_pro_order: string;
  size_order: string;
  color_order: string;
  price_order: number;
  amount_order: number;
}
interface Item {
  key: string;
  id_order: string;
  id_cus: string;
  name_cus: string;
  dateInit: string;
  staffconfirm: string;
  total_money: number;
  status: string;
}
const dateFormat = "DD/MM/YYYY";
// const originData: Item[] = [];
// for (let i = 0; i < 20; i++) {
//     originData.push({
//         key: i.toString(),
//         id_order: `${i}`,
//         id_cus: `kh ${i}`,
//         name_cus: `Nguyễn văn ${i}`,
//         dateInit: '23/10/2023',
//         staffconfirm: 'NV0001',
//         total_money: 56300000,
//         status: 'Chờ'
//     });
// }

const History = () => {
  // Define
  const originData: Item[] = [];
  const exData = [];

  const [isReady, setIsReady] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState(originData);
  const [reload, setReload] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [expanderData, setExpanderData] = useState(exData);

  //

  useEffect(() => {
    async function fetchMetaData(rs?) {
      if (rs && rs.data.dangNhapAdminVoiToken.status != 200) {
        navigate("/LoginAdmin");
        return;
      }
      const rsFetchData = await getHistoryOrders();

      var fetchData = rsFetchData.data.hoadondaxuly.data;
      //
      //
      fetchData.forEach((element, index) => {
        exData.push({ key: index, sanpham: element.sanpham });
        // console.log(expanderData);
        //  Convert Timestamp to Date
        const dateInit = new Date(parseInt(element.ngaylap));
        // Format to date time
        const rsDateInit = `${dateInit.getFullYear()}-${(
          dateInit.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${dateInit
          .getDate()
          .toString()
          .padStart(2, "0")} ${dateInit
          .getHours()
          .toString()
          .padStart(2, "0")}:${dateInit
          .getMinutes()
          .toString()
          .padStart(2, "0")}:${dateInit
          .getSeconds()
          .toString()
          .padStart(2, "0")}`;
        // console.log(convertB64ToImage(element.anhminhhoa));
        console.log(element.tongtien);
        originData.push({
          key: index,
          id_order: element.ma,
          id_cus: element.khachhang.ma,
          name_cus: element.khachhang.ten,
          dateInit: rsDateInit,
          staffconfirm: element.nhanvien.ten,
          total_money: element.tongtien,
          status: element.trangthaihoadon ? element.trangthaihoadon.ten : "",
        });
      });
      // console.log("originData " + originData.length);
      setData(originData);
      // console.log("Data " + data.length);
      setIsReady(true);
      setExpanderData(exData);
    }
    // console.log(data)

    if (reload) {
      isFirstLoad ? authenticationAdmin(fetchMetaData) : fetchMetaData();
      setIsFirstLoad(false);
      setReload(false);
    }
  }, [reload]);
  const [form] = Form.useForm();
  //   const [data] = useState(originData);
  const columns = [
    {
      title: "Mã",
      dataIndex: "id_order",
      width: "auto",
    },
    {
      title: "Mã khách hàng",
      dataIndex: "id_cus",
      width: "auto",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "name_cus",
      width: "auto",
    },
    {
      title: "Ngày xác nhận",
      dataIndex: "dateInit",
    },
    {
      title: "Người xác nhận",
      dataIndex: "staffconfirm",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total_money",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
  ];
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const expandedRowRender = (record) => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: "Tên sản phẩm", dataIndex: "name_pro_order" },
      { title: "Kích thước", dataIndex: "size_order" },
      { title: "Màu", dataIndex: "color_order" },
      { title: "Giá", dataIndex: "price_order" },
      { title: "Số lượng", dataIndex: "amount_order" },
    ];
    const expanderItem = expanderData.find((item) => item.key === record.key);
    console.log(expanderItem);
    const data: ExpandedDataType[] = [];

    expanderItem.sanpham.forEach((element, index) => {
      data.push({
        key: index,
        name_pro_order: element.sanpham.ten,
        size_order: element.kichco.ten,
        color_order: element.mau.ten,
        price_order: element.gia,
        amount_order: element.soluong,
      });
    });
    // for (let i = 0; i < expanderData.length; ++i) {
    //   data.push({
    //     key: i.toString(),
    //     name_pro_order: expanderData[i].ten,
    //     size_order: "XL",
    //     color_order: "Đen",
    //     price_order: 230000,
    //     amount_order: 4,
    //   });
    // }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };
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

  const cancel = () => {
    setEditingKey("");
  };

  return isReady ? (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <Header style={headerStyle}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Form.Item label="Từ ngày:">
              <DatePicker
                defaultValue={dayjs("01/01/2000")}
                format={dateFormat}
                style={{ marginRight: 10 }}
              />
            </Form.Item>
            <Form.Item label="Đến ngày:">
              <DatePicker
                defaultValue={dayjs()}
                format={dateFormat}
                style={{ marginRight: 10 }}
              />
            </Form.Item>
            <Form.Item label="Trạng thái">
              <Select
                defaultValue="Tất cả"
                style={{ width: 120 }}
                onChange={handleChange}
                options={[
                  { value: "all", label: "Tất cả" },
                  { value: "confirm", label: "Xác nhận" },
                  { value: "cancel", label: "Đã hủy" },
                ]}
              />
            </Form.Item>
          </div>
        </Header>
        <Content style={contentStyle}>
          <Form form={form} component={false}>
            <Table
              bordered
              expandable={{ expandedRowRender }}
              dataSource={data}
              columns={mergedColumns}
              rowClassName="order-row"
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
export default History;
