import { DatePicker, Layout, Skeleton, Space, TableColumnsType } from "antd";
import "../../../style/product.css";
const { Header, Content } = Layout;
import React, { useEffect, useState } from "react";
import { Form, Table } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { authenticationAdmin } from "../../../../../../utils/util";
import {
  getHistoryOrders,
  getOrders,
} from "../../../../../controllers/modules/admin/order";
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
  address: string;
  email: string;
  phone: string;
  dateinit: string;
  total_money: number;
  status: string;
}
const dateFormat = "DD/MM/YYYY";
// const originData: Item[] = [];
// for (let i = 0; i < 20; i++) {
//   originData.push({
//     key: i.toString(),
//     id_order: `${i}`,
//     id_cus: `kh ${i}`,
//     name_cus: `Nguyễn văn ${i}`,
//     address: "HCM",
//     dateinit: "23/10/2023",
//     total_money: 56300000,
//     status: "Chờ",
//   });
// }

const Order = () => {
  // define
  const originData: Item[] = [];
  const exData = [];
  const [metaData, setMetaData] = useState(originData);

  const [isReady, setIsReady] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState(originData);
  const [reload, setReload] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [expanderData, setExpanderData] = useState(exData);

  const [form] = Form.useForm();
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
      title: "Số điện thoại",
      dataIndex: "phone",
      width: "auto",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "auto",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      width: "auto",
    },
    {
      title: "Ngày lập",
      dataIndex: "dateinit",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total_money",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      key: "confirm",
      dataIndex: "confirm",
      width: "auto",
      render: () => <a>Xác nhận</a>,
    },
    {
      key: "cancel",
      dataIndex: "cancel",
      width: "auto",
      render: () => <a>Hủy</a>,
    },
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
  const expandedRowRender = (record) => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: "Tên sản phẩm", dataIndex: "name_pro_order" },
      { title: "Kích thước", dataIndex: "size_order" },
      { title: "Màu", dataIndex: "color_order" },
      { title: "Giá", dataIndex: "price_order" },
      { title: "Số lượng", dataIndex: "amount_order" },
    ];
    const expanderItem = expanderData.find((item) => item.key === record.key);
    // console.log(expanderItem);
    const data: ExpandedDataType[] = [];

    expanderItem.sanpham.forEach((element, index) => {
      data.push({
        key: element.ma,
        name_pro_order: element.sanpham.ten,
        size_order: element.kichco.ten,
        color_order: element.mau.ten,
        price_order: element.gia,
        amount_order: element.soluong,
      });
    });
    // const data = [];
    // for (let i = 0; i < 3; ++i) {
    //   data.push({
    //     key: i.toString(),
    //     name_pro_order: "Áo",
    //     size_order: "XL",
    //     color_order: "Đen",
    //     price_order: 230000,
    //     amount_order: 4,
    //   });
    // }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  useEffect(() => {
    async function fetchMetaData(rs?) {
      if (rs && rs.data.dangNhapAdminVoiToken.status != 200) {
        navigate("/LoginAdmin");
        return;
      }
      const rsFetchData = await getOrders();

      var fetchData = rsFetchData.data.hoadonchuaxuly.data;
      //
      //
      fetchData.forEach((element, index) => {
        exData.push({ key: element.ma, sanpham: element.sanpham });
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
        // console.log(element.tongtien);
        originData.push({
          key: element.ma,
          id_order: element.ma,
          id_cus: element.khachhang.ten,
          name_cus: element.khachhang.ten,
          address: "",
          dateinit: rsDateInit,
          total_money: 0,
          status: element.trangthaihoadon.ten,
          email: "",
          phone: "",
        });
      });
      console.log("originData " + originData.length);
      // setFromDate(dayjs().subtract(1, "day").format(dateFormat));
      // fromDate = dayjs().subtract(1, "day");
      // setToDate(dayjs().add(1, "day").format(dateFormat));
      // toDate = dayjs().add(1, "day");
      // status = "Tất cả";
      setData(originData);
      setMetaData(originData);
      // const newData = metaData.filter((item) =>
      //   isDateBetween(item.dateInit.toString(), fromDate, toDate)
      // );
      console.log("Nhut dau nha");
      // console.log(newData);
      // setData(newData);
      // const newData = metaData.filter((item) =>
      //   isDateBetween(item.dateInit.toString(), fromDate, toDate)
      // );

      // setData(newData);

      console.log("Data " + data[0].name_cus);
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
                defaultValue={dayjs("01/01/2000", dateFormat)}
                format={dateFormat}
                style={{ marginRight: 10 }}
              />
            </Form.Item>
            <Form.Item label="Đến ngày:">
              <DatePicker defaultValue={dayjs()} format={dateFormat} />
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
export default Order;
