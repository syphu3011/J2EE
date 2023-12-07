import { DatePicker, Layout, Skeleton, Space, TableColumnsType } from "antd";
import "../../../style/product.css";
const { Header, Content } = Layout;
import React, { useEffect, useState } from "react";
import { Form, Table } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { authenticationAdmin } from "../../../../../../utils/util";
import { getOrders } from "../../../../../controllers/modules/admin/order";
import { importProductHistory } from "../../../../../controllers/modules/admin/importProduct";
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
  id_pro_imp: string;
  name_pro_imp: string;
  size_imp: string;
  color_imp: string;
  price_imp: number;
  amount_imp: number;
  image_imp: string;
}

interface Item {
  dateinit: any;
  key: string;
  id_import: string;
  imp_partner: string;
  name_staff_imp: string;
  date_imp: string;
  total_money: number;
}
const dateFormat = "DD/MM/YYYY";
// for (let i = 0; i < 20; i++) {
//   originData.push({
//     key: i.toString(),
//     id_import: `${i}`,
//     imp_partner: `NCC ${i}`,
//     name_staff_imp: `Nguyễn văn ${i}`,
//     date_imp: "23/10/2023",
//     total_money: 56300000,
//     dateinit: undefined,
//   });
// }
let fromDate = dayjs();
let toDate = dayjs();
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

  // compare date
  function isDateBetween(date1, date2, date3) {
    const startDate = new Date(date2);
    const endDate = new Date(date3);
    const targetDate = new Date(date1);
    startDate.setHours(0, 0, 0); // Thiết lập giờ, phút, giây thành 0
    endDate.setHours(23, 59, 59); // Thiết lập giờ, phút, giây thành 23:59:59

    // startDate.setDate(startDate.getDate() - 1); // Giảm startDate xuống 1 ngày
    // endDate.setDate(endDate.getDate() - 1); // Giảm endDate xuống 1 ngày

    // console.log(startDate);
    // console.log(endDate);
    // console.log(targetDate);
    // console.log(targetDate >= startDate && targetDate <= endDate);
    // console.log("##########################################");
    return targetDate >= startDate && targetDate <= endDate;
  }
  const columns = [
    {
      title: "Mã phiếu",
      dataIndex: "id_import",
      width: "8%",
    },
    {
      title: "Nhà cung cấp",
      dataIndex: "imp_partner",
      width: "auto",
    },
    {
      title: "Người nhập",
      dataIndex: "name_staff_imp",
      width: "auto",
    },
    {
      title: "Thời gian nhập",
      dataIndex: "date_imp",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total_money",
    },
  ];
  const expandedRowRender = () => {
    type TableColumnsType<id_pro_imp> = {
      title: string;
      dataIndex: keyof id_pro_imp;
      render?: (text: any, record: id_pro_imp) => React.ReactNode;
    }[];
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: "Mã sản phẩm", dataIndex: "id_pro_imp" },
      { title: "Tên sản phẩm", dataIndex: "name_pro_imp" },
      { title: "Kích thước", dataIndex: "size_imp" },
      { title: "Màu", dataIndex: "color_imp" },
      { title: "Giá nhập", dataIndex: "price_imp" },
      { title: "Số lượng", dataIndex: "amount_imp" },
      {
        title: "Hình ảnh",
        dataIndex: "image_imp",
        render: (text, record) => (
          <img
            src={record.image_imp}
            alt={record.id_pro_imp}
            style={{ maxWidth: 30, maxHeight: 30 }}
          />
        ),
      },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        id_pro_imp: i.toString(),
        name_pro_imp: "Áo",
        size_imp: "XL",
        color_imp: "Đen",
        price_imp: 230000,
        amount_imp: 40,
        image_imp:
          "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      });
    }
    return (
      <Table
        style={{ marginLeft: "8%" }}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    );
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

  useEffect(() => {
    async function fetchMetaData(rs?) {
      if (rs && rs.data.dangNhapAdminVoiToken.status != 200) {
        navigate("/LoginAdmin");
        return;
      }
      const rsFetchData = await importProductHistory();

      var fetchData = rsFetchData.data.phieunhap.data;
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
          id_import: element.ma,
          imp_partner: element.nhacungcap.ten,
          name_staff_imp: "",
          date_imp: "",
          total_money: 0,
          dateinit: undefined,
        });
      });
      // console.log("originData " + originData.length);
      // setFromDate(dayjs().subtract(1, "day").format(dateFormat));
      fromDate = dayjs().subtract(7, "day");
      // setToDate(dayjs().add(1, "day").format(dateFormat));
      toDate = dayjs();
      // status = "Tất cả";
      // setData(originData);
      setMetaData(originData);
      const newData = metaData.filter((item) =>
        isDateBetween(item.dateinit.toString(), fromDate, toDate)
      );
      console.log("Nhut dau nha");
      // console.log(newData);
      setData(newData);
      // const newData = metaData.filter((item) =>
      //   isDateBetween(item.dateInit.toString(), fromDate, toDate)
      // );

      // setData(newData);

      console.log("Data " + data[0]);
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
              rowClassName="His-import-row"
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
