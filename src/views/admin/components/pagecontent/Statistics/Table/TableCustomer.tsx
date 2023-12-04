import { Table } from "antd";
import { useState } from "react";

interface ItemCus {
  key: string;
  id_cus_stat: string;
  name_cus_stat: string;
  amount_order_cus: number;
  profits_cus: number;
}
const CusData: ItemCus[] = [];
for (let i = 0; i < 7; i++) {
  CusData.push({
    key: i.toString(),
    id_cus_stat: `${i}`,
    name_cus_stat: `Minh ${i}`,
    amount_order_cus: 1 + i,
    profits_cus: 1500000,
  });
}
const columnsCus = [
  {
    title: "Mã khách hàng",
    dataIndex: "id_cus_stat",
    width: "auto",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "name_cus_stat",
    width: "auto",
    editable: true,
  },
  {
    title: "Số đơn hàng",
    dataIndex: "amount_order_cus",
    width: "auto",
  },
  {
    title: "Tổng",
    dataIndex: "profits_cus",
    width: "auto",
  },
];

const TableProduct = () => {
  return (
    <Table
      bordered
      dataSource={CusData}
      columns={columnsCus}
      pagination={false}
      scroll={{ x: 800, y: 600 }}
      summary={(pageData) => {
        let total_profits_cus = 0;
        let total_amount_order_cus = 0;
        pageData.forEach(({ profits_cus, amount_order_cus }) => {
          total_profits_cus += profits_cus;
          total_amount_order_cus += amount_order_cus;
        });
        return (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>Tổng</Table.Summary.Cell>
              <Table.Summary.Cell index={1}></Table.Summary.Cell>
              <Table.Summary.Cell index={2}>
                {total_amount_order_cus}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3}>
                {total_profits_cus}
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        );
      }}
    />
  );
};
export default TableProduct;
