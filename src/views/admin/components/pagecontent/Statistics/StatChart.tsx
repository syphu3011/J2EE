import { Col, DatePicker, Layout, Row, Select, SelectProps, Space } from "antd";
//import "../../../style/product.css";
import { Bar, Line, Pie } from "react-chartjs-2";
const { Header, Content } = Layout;
import React, { useState } from "react";
import dayjs from "dayjs";
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
const dateFormat = "DD/MM/YYYY";
const UserData = [
  {
    id: 1,
    year: 2016,
    userGain: 80000,
    userLost: 823,
  },
  {
    id: 2,
    year: 2017,
    userGain: 45677,
    userLost: 345,
  },
  {
    id: 3,
    year: 2018,
    userGain: 78888,
    userLost: 555,
  },
  {
    id: 4,
    year: 2019,
    userGain: 90000,
    userLost: 4555,
  },
  {
    id: 5,
    year: 2020,
    userGain: 4300,
    userLost: 234,
  },
];

const StatChart = () => {
  const [chartData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "black",
        borderWidth: 1
      },
    ],
  });
  return (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <Header style={headerStyle}>
        </Header>
        <Content style={contentStyle}>
      
              <Bar data={chartData} />
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
