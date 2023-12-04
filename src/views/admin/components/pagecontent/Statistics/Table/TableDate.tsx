import { Table } from "antd";
import { useState } from "react";

interface ItemDate {
  key: string;
  id_date: string;
  amount_order_date: number;
  income_date: number;
  expenses_date: number;
  profits_date: number;
}
const MonthData: ItemDate[] = [];
const DaysData: ItemDate[] = [];
const YearData: ItemDate[] = [];
for (let i = 1; i < 13; i++) {
  MonthData.push({
    key: i.toString(),
    id_date: "Tháng " + `${i}`,
    amount_order_date: 1 + i,
    income_date: 30000000,
    expenses_date: 400000,
    profits_date: 30000000 - 400000,
  });
}
for (let i = 2; i < 8; i++) {
  DaysData.push({
    key: i.toString(),
    id_date: "Thứ " + `${i}`,
    amount_order_date: 1 + i,
    income_date: 30000000,
    expenses_date: 400000,
    profits_date: 30000000 - 400000,
  });
}
for (let i = 0; i < 13; i++) {
  YearData.push({
    key: i.toString(),
    id_date: "Năm " + `${i}`,
    amount_order_date: 1 + i,
    income_date: 30000000,
    expenses_date: 400000,
    profits_date: 30000000 - 400000,
  });
}
const columnsYear = [
  {
    title: "Năm",
    dataIndex: "id_date",
    width: "auto",
  },
  {
    title: "Số đơn hàng",
    dataIndex: "amount_order_date",
    width: "auto",
  },
  {
    title: "Thu",
    dataIndex: "income_date",
    width: "auto",
    editable: true,
  },
  {
    title: "Chi",
    dataIndex: "expenses_date",
    width: "auto",
    editable: true,
  },
  {
    title: "Lợi nhuận",
    dataIndex: "profits_date",
    width: "auto",
  },
];
const columnsMonth = [
  {
    title: "Tháng",
    dataIndex: "id_date",
    width: "auto",
  },
  {
    title: "Số đơn hàng",
    dataIndex: "amount_order_date",
    width: "auto",
  },
  {
    title: "Thu",
    dataIndex: "income_date",
    width: "auto",
    editable: true,
  },
  {
    title: "Chi",
    dataIndex: "expenses_date",
    width: "auto",
    editable: true,
  },
  {
    title: "Lợi nhuận",
    dataIndex: "profits_date",
    width: "auto",
  },
];
const columnsDay = [
  {
    title: "Thứ",
    dataIndex: "id_date",
    width: "auto",
  },
  {
    title: "Số đơn hàng",
    dataIndex: "amount_order_date",
    width: "auto",
  },
  {
    title: "Thu",
    dataIndex: "income_date",
    width: "auto",
    editable: true,
  },
  {
    title: "Chi",
    dataIndex: "expenses_date",
    width: "auto",
    editable: true,
  },
  {
    title: "Lợi nhuận",
    dataIndex: "profits_date",
    width: "auto",
  },
];

const TableDate = () => {
  //   const [datas, setDatas] = useState(MonthData);
  //   const [columns, setColumns] = useState(columnsMonth);
  return (
    <Table
      bordered
      dataSource={MonthData}
      columns={columnsMonth}
      pagination={false}
      scroll={{ x: 800, y: 600 }}
      summary={(pageData) => {
        let total_profits = 0;
        let total_amount_sell_type = 0;
        let total_income_type = 0;
        let total_expenses_type = 0;
        pageData.forEach(
          ({ profits_date, amount_order_date, income_date, expenses_date }) => {
            total_profits += profits_date;
            total_amount_sell_type += amount_order_date;
            total_income_type += income_date;
            total_expenses_type += expenses_date;
          }
        );
        return (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>Tổng</Table.Summary.Cell>
              <Table.Summary.Cell index={1}>
                {total_amount_sell_type}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2}>
                {total_income_type}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3}>
                {total_expenses_type}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={4}>{total_profits}</Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        );
      }}
    />
  );
};
export default TableDate;
