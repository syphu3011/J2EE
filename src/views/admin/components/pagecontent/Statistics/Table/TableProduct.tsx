import { Table } from "antd";
import { useState } from "react";

interface ItemPro {
  key: string;
  id_pro_stat: string;
  name_pro_stat: string;
  provider_pro_stat: string;
  amount_sell_pro: number;
  income_pro: number;
  expenses_pro: number;
  profits_pro: number;
}
const ProData: ItemPro[] = [];
for (let i = 0; i < 7; i++) {
  ProData.push({
    key: i.toString(),
    id_pro_stat: `${i}`,
    name_pro_stat: `Áo thun ${i}`,
    provider_pro_stat: "000000",
    amount_sell_pro: 12,
    income_pro: 15000000,
    expenses_pro: 3200000,
    profits_pro: 15000000 - 3200000,
  });
}
const columnsPro = [
  {
    title: "Mã sản phẩm",
    dataIndex: "id_pro_stat",
    width: "auto",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "name_pro_stat",
    width: "auto",
    editable: true,
  },
  {
    title: "Nhà cung cấp",
    dataIndex: "provider_pro_stat",
    width: "auto",
  },
  {
    title: "Số lượng bán",
    dataIndex: "amount_sell_pro",
    width: "auto",
  },
  {
    title: "Thu",
    dataIndex: "income_pro",
    width: "auto",
    editable: true,
  },
  {
    title: "Chi",
    dataIndex: "expenses_pro",
    width: "auto",
    editable: true,
  },
  {
    title: "Lợi nhuận",
    dataIndex: "profits_pro",
    width: "auto",
  },
];

const TableProduct = () => {
  return (
    <Table
      bordered
      dataSource={ProData}
      columns={columnsPro}
      pagination={false}
      scroll={{ x: 800, y: 600 }}
      summary={(pageData) => {
        let total_profits = 0;
        let total_amount_sell_pro = 0;
        let total_income_pro = 0;
        let total_expenses_pro = 0;
        pageData.forEach(
          ({ profits_pro, amount_sell_pro, income_pro, expenses_pro }) => {
            total_profits += profits_pro;
            total_amount_sell_pro += amount_sell_pro;
            total_income_pro += income_pro;
            total_expenses_pro += expenses_pro;
          }
        );
        return (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>Tổng</Table.Summary.Cell>
              <Table.Summary.Cell index={1}></Table.Summary.Cell>
              <Table.Summary.Cell index={2}></Table.Summary.Cell>
              <Table.Summary.Cell index={3}>
                {total_amount_sell_pro}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={4}>
                {total_income_pro}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={5}>
                {total_expenses_pro}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={6}>{total_profits}</Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        );
      }}
    />
  );
};
export default TableProduct;
