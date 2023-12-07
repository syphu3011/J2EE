import {
  Col,
  DatePicker,
  Form,
  Layout,
  Row,
  Select,
  SelectProps,
  Space,
} from "antd";
//import "../../../style/product.css";
import { Bar, Line, Pie } from "react-chartjs-2";
import { CategoryScale, Chart, LinearScale, BarElement } from "chart.js";

Chart.register([CategoryScale, LinearScale, BarElement]);

const { Header, Content } = Layout;
import React, { useState } from "react";

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
  display: "flex",
  justifyContent: "center",
};
interface ItemMonth {
  key: string;
  id_month: string;
  amount_order_month: number;
  income_month: number;
  expenses_month: number;
  profits_month: number;
}
const UserData: ItemMonth[] = [
  {
    key: "1",
    id_month: "Tháng " + 1,
    amount_order_month: 2,
    income_month: 30000000,
    expenses_month: 400000,
    profits_month: 15000000 - 400000,
  },
  {
    key: "2",
    id_month: "Tháng 2",
    amount_order_month: 2,
    income_month: 30000000,
    expenses_month: 400000,
    profits_month: 60000000,
  },
  {
    key: "3",
    id_month: "Tháng 3",
    amount_order_month: 2,
    income_month: 30000000,
    expenses_month: 400000,
    profits_month: 55000000,
  },
  {
    key: "4",
    id_month: "Tháng 4",
    amount_order_month: 2,
    income_month: 30000000,
    expenses_month: 400000,
    profits_month: 77000000,
  },
  {
    key: "5",
    id_month: "Tháng 5",
    amount_order_month: 2,
    income_month: 30000000,
    expenses_month: 400000,
    profits_month: 97000000,
  },
];
const dateFormat = "DD/MM/YYYY";
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
  value: "DT",
  label: "Doanh thu",
});
options.push({
  value: "C",
  label: `Chi`,
});
options.push({
  value: "T",
  label: "Thu",
});
const StatChart = () => {
  const [chartData, setUserData] = useState({
    labels: UserData.map((data) => data.id_month),
    datasets: [
      {
        label: "Doanh thu",
        data: UserData.map((data) => data.profits_month),
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  });

  return (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <Header style={headerStyle}>
          <Form.Item
            label="Lọc theo:"
            labelAlign="left"
            labelCol={{ span: "10%" }}
          >
            <Select
              allowClear
              style={{ width: "20%" }}
              placeholder="Chọn mục muốn thống kê"
              // onChange={}
              options={options2}
              defaultValue="Months"
            />
            <Select
              id="Select-date"
              allowClear
              style={{ width: "20%" }}
              // onChange={}
              options={options}
              defaultValue="DT"
            />
          </Form.Item>
        </Header>
        <Content style={contentStyle}>
          <div style={{ minWidth: "50%", maxWidth: "80%" }}>
            <Bar data={chartData} />
          </div>
          {/* <div style={{ width: 700 }}>
            <Line data={chartData} />
          </div>
          <div style={{ width: 700 }}>
            <Pie data={chartData} />
          </div> */}
        </Content>
      </Layout>
    </Space>
  );
};
export default StatChart;
