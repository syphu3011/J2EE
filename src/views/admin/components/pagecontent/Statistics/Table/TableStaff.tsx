import { Table } from "antd";
import { useState } from "react";

interface ItemCus {
  key: string;
  id_staff_stat: string;
  name_staff_stat: string;
  amount_order_staff: number;
  profits_staff: number;
}
const CusData: ItemCus[] = [];
for (let i = 0; i < 7; i++) {
  CusData.push({
    key: i.toString(),
    id_staff_stat: `${i}`,
    name_staff_stat: `Vy ${i}`,
    amount_order_staff: 1 + i,
    profits_staff: 1500000,
  });
}
const columnsCus = [
  {
    title: "Mã nhân viên",
    dataIndex: "id_staff_stat",
    width: "auto",
  },
  {
    title: "Tên nhân viên",
    dataIndex: "name_staff_stat",
    width: "auto",
    editable: true,
  },
  {
    title: "Số đơn hàng",
    dataIndex: "amount_order_staff",
    width: "auto",
    sorter: (a, b) => a.amount_order_staff - b.amount_order_staff,
  },
  {
    title: "Tổng tiền",
    dataIndex: "profits_staff",
    width: "auto",
    sorter: (a, b) => a.profits_staff - b.profits_staff,
  },
];

const TableStaff = () => {
  return (
    <Table
      bordered
      dataSource={CusData}
      columns={columnsCus}
      pagination={false}
      scroll={{ x: 800, y: 600 }}
      summary={(pageData) => {
        let total_profits_staff = 0;
        let total_amount_order_staff = 0;
        pageData.forEach(({ profits_staff, amount_order_staff }) => {
          total_profits_staff += profits_staff;
          total_amount_order_staff += amount_order_staff;
        });
        return (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>Tổng</Table.Summary.Cell>
              <Table.Summary.Cell index={1}></Table.Summary.Cell>
              <Table.Summary.Cell index={2}>
                {total_amount_order_staff}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3}>
                {total_profits_staff}
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        );
      }}
    />
  );
};
export default TableStaff;
