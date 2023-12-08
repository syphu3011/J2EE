import {
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
import { Form, Table } from "antd";
import dayjs from "dayjs";
import TableType from "./Table/TableType";
import TableProduct from "./Table/TableProduct";
import TableCustomer from "./Table/TableCustomer";
import TableStaff from "./Table/TableStaff";
import TableDate from "./Table/TableDate";
import TableMonth from "./Table/TableMonth";
import { useNavigate } from "react-router-dom";
import { Item } from "react-use-cart";
import {
  authenticationAdmin,
  dateToYYYY_MM_DD,
} from "../../../../../../utils/util";
import { getOrders } from "../../../../../controllers/modules/admin/order";
import {
  statistics_revenue_days,
  statistics_revenue_month,
  top10product,
} from "../../../../../controllers/modules/admin/statistic";
const headerStyle: React.CSSProperties = {
  color: "#000000",
  minHeight: 60,
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

const options: SelectProps["options"] = [];
const options2: SelectProps["options"] = [];
options2.push({
  value: "Days",
  label: "Thứ",
});
options2.push({
  value: "Months",
  label: "Tháng",
});

options.push({
  value: "KH",
  label: `Khách hàng`,
});
options.push({
  value: "SP",
  label: "Sản phẩm",
});
options.push({
  value: "NV",
  label: "Nhân viên",
});
options.push({
  value: "TG",
  label: "Doanh thu",
});
options.push({
  value: "LSP",
  label: "Loại sản phẩm",
});

const StatNumber = () => {
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
  const [table, setTable] = useState(TableProduct);
  const [display, setDisplay] = useState("none");
  const [from, setFrom] = useState("2000-01-01");
  const [to, setTo] = useState(dateToYYYY_MM_DD(Date.now()));
  const [dataRevenue, setDataRevenue] = useState(null);
  const [stat, setStat] = useState(null);
  const [statRev, setStatRev] = useState(null);
  const GetDataRevenue = async (type, monthOrDay, _from = from, _to = to) => {
    const rsRevenue = monthOrDay == 1 ? await statistics_revenue_month(_from, _to, type) : await statistics_revenue_days(_from, _to, type);
      const dataRs =
        monthOrDay == 1 ? 
        (rsRevenue.data && rsRevenue.data.thongkedoanhthutheothang && rsRevenue.data.thongkedoanhthutheothang.data)
        :
        (rsRevenue.data && rsRevenue.data.thongkedoanhthutheongay && rsRevenue.data.thongkedoanhthutheongay.data)
      const tempData = [];
      for (const data of dataRs) {
        const row = {
          key: data.thoigian,
          id_date: data.thoigian,
          amount_order_date: 0,
          income_date: data.thu,
          expenses_date: data.chi,
          profits_date: data.loinhuan,
        };
        tempData.push(row);
      }
      return tempData
  }
  const GetDataProduct = async (type, _from = from, _to = to) => {
    const rsProduct = await top10product(_from, _to, type)
      const dataRs = rsProduct.data && rsProduct.data.thongkedoanhthutheothang && rsProduct.data.thongkedoanhthutheothang.data
      const tempData = [];
      for (const data of dataRs) {
        const row = {
          key: data.ma,
          rank_pro: data.hang,
          id_prod_stat: data.ma,
          name_pro_stat: data.ten,
          provider_pro_stat: "",
          amount_sell_pro: data.soluongban,
          income_pro: data.tienban,
          expenses_pro: data.tiennhap,
          profits_pro: data.loinhuan
        };
        tempData.push(row);
      }
      return tempData
  }
  const ChangeStatDate = async (value: string, option, _from = from, _to = to) => {
    setStatRev(value)
    if (value == "Days") {
      const data = await GetDataRevenue(1,2, _from, _to)
      setDataRevenue(data);
      setTable(TableDate({ data: data }));
    } else {
      const data = await GetDataRevenue(1,1, _from, _to)
      setDataRevenue(data);
      setTable(TableDate({ data: data }));
    }
  };
  const ChangeStat = async (value: string, option, _from = from, _to = to) => {
    setStat(value)
    console.log(`selected ${value}`);
    if (value == "SP") {
      setTable(TableProduct);
      setDisplay("none");
    } else if (value == "KH") {
      setTable(TableCustomer);
      setDisplay("none");
    } else if (value == "NV") {
      setTable(TableStaff);
      setDisplay("none");
    } else if (value == "TG") {
      ChangeStatDate(statRev ? statRev : 'Days', null, _from, _to)
      setDisplay("inline-block");
    } else {
      setTable(TableType);
      setDisplay("none");
    }
  };
  const dateFormat = "DD/MM/YYYY";
  const ChangeFrom = (value, string) => {
    const date = dateToYYYY_MM_DD(value)
    setFrom(date)
    ChangeStat(stat,null, date, to)
  }
  const ChangeTo = (value, string) => {
    const date = dateToYYYY_MM_DD(value)
    setTo(date)
    ChangeStat(stat, null, from, date)
  }
  useEffect(() => {
    async function fetchMetaData(rs?) {
      if (rs && rs.data.dangNhapAdminVoiToken.status != 200) {
        navigate("/LoginAdmin");
        return;
      }
      const rsFetchData = await statistics_revenue_month(
        "2000-01-01",
        "2024-01-01",
        1
      );

      var fetchData = rsFetchData.data.thongkedoanhthutheothang.data;
      //
      //
      fetchData.forEach((element, index) => {
        // exData.push({ key: element.ma, sanpham: element.sanpham });
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
          id: "",
          price: 0,
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
          <Row gutter={16}>
            <Col className="gutter-row" span={8}>
              <Form.Item
                label="Lọc theo:"
                labelAlign="left"
                labelCol={{ span: "2%" }}
              >
                <Select
                  allowClear
                  style={{ width: "60%" }}
                  placeholder="Chọn mục muốn thống kê"
                  onChange={ChangeStat}
                  options={options}
                  defaultValue="SP"
                />
                <Select
                  id="Select-date"
                  allowClear
                  style={{ width: "30%", display: `${display}` }}
                  onChange={ChangeStatDate}
                  options={options2}
                  defaultValue="Days"
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={2}></Col>
            <Col className="gutter-row" span={14}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Form.Item
                  label="Từ ngày"
                  labelAlign="left"
                  labelCol={{ span: "5%" }}
                >
                  <DatePicker
                    defaultValue={dayjs("01/01/2000", dateFormat)}
                    format={dateFormat}
                    style={{ marginRight: "2%" }}
                    onChange={ChangeFrom}
                  />
                </Form.Item>
                <Form.Item
                  label="Đến ngày"
                  labelAlign="left"
                  labelCol={{ span: "5%" }}
                >
                  <DatePicker defaultValue={dayjs()} format={dateFormat} 
                  onChange={ChangeTo}/>
                </Form.Item>
              </div>
            </Col>
          </Row>
        </Header>
        <Content style={contentStyle}>
          <Form form={form} component={false}>
            {table}
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
export default StatNumber;
