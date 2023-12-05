import { Table } from "antd";
interface ItemMonth {
  key: string;
  id_month: string;
  amount_order_month: number;
  income_month: number;
  expenses_month: number;
  profits_month: number;
}
const MonthData: ItemMonth[] = [];
for (let i = 1; i < 13; i++) {
  MonthData.push({
    key: i.toString(),
    id_month: "Tháng " + `${i}`,
    amount_order_month: 1 + i,
    income_month: 30000000,
    expenses_month: 400000,
    profits_month: 30000000 - 400000,
  });
}
const columnsMonth = [
  {
    title: "Tháng",
    dataIndex: "id_month",
    width: "auto",
  },
  {
    title: "Thu",
    dataIndex: "income_month",
    width: "auto",
    editable: true,
    sorter: (a, b) => a.income_month - b.income_month,
  },
  {
    title: "Chi",
    dataIndex: "expenses_month",
    width: "auto",
    editable: true,
    sorter: (a, b) => a.expenses_month - b.expenses_month,
  },
  {
    title: "Lợi nhuận",
    dataIndex: "profits_month",
    width: "auto",
    sorter: (a, b) => a.profits_month - b.profits_month,
  },
];
const TableMonth = () => {
  return (
    <Table
      bordered
      dataSource={MonthData}
      columns={columnsMonth}
      pagination={false}
      scroll={{ x: 800, y: 600 }}
      summary={(pageData) => {
        let total_profits = 0;
        let total_income_type = 0;
        let total_expenses_type = 0;
        pageData.forEach(({ profits_month, income_month, expenses_month }) => {
          total_profits += profits_month;
          total_income_type += income_month;
          total_expenses_type += expenses_month;
        });
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
export default TableMonth;
