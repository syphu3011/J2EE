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
const DaysData: ItemDate[] = [];

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

const columnsDay = [
  {
    title: "Thứ",
    dataIndex: "id_date",
    width: "auto",
  },
  {
    title: "Thu",
    dataIndex: "income_date",
    width: "auto",
    sorter: (a, b) => a.income_date - b.income_date,
  },
  {
    title: "Chi",
    dataIndex: "expenses_date",
    width: "auto",
    sorter: (a, b) => a.expenses_date - b.expenses_date,
  },
  {
    title: "Lợi nhuận",
    dataIndex: "profits_date",
    width: "auto",
    sorter: (a, b) => a.profits_date - b.profits_date,
  },
];

const TableDate = () => {
  return (
    <Table
      bordered
      dataSource={DaysData}
      columns={columnsDay}
      pagination={false}
      scroll={{ x: 800, y: 600 }}
      summary={(pageData) => {
        let total_profits = 0;
        let total_income_type = 0;
        let total_expenses_type = 0;
        pageData.forEach(
          ({ profits_date, amount_order_date, income_date, expenses_date }) => {
            total_profits += profits_date;
            total_income_type += income_date;
            total_expenses_type += expenses_date;
          }
        );
        return (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>Tổng</Table.Summary.Cell>
              <Table.Summary.Cell index={1}>
                {total_income_type}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2}>
                {total_expenses_type}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3}>{total_profits}</Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        );
      }}
    />
  );
};
export default TableDate;
