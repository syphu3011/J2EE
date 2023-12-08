import { Table } from "antd";
import { useState } from "react";
import { formatCurrency } from "../../../../../../../utils/util";

interface ItemCus {
  key: string;
  rank_staff: number;
  id_staff_stat: string;
  name_staff_stat: string;
  amount_order_staff: string;
  profits_staff: string;
}
const CusData: ItemCus[] = [];
for (let i = 0; i < 7; i++) {
  CusData.push({
    key: i.toString(),
    rank_staff: i,
    id_staff_stat: `${i}`,
    name_staff_stat: `Vy ${i}`,
    amount_order_staff: 1 + i+"",
    profits_staff: 1500000+"",
  });
}
const columnsCus = [
  {
    title: "Hạng",
    dataIndex: "rank_staff",
    width: "auto",
  },
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
    // sorter: (a, b) => a.amount_order_staff - b.amount_order_staff,
  },
  {
    title: "Tổng tiền",
    dataIndex: "profits_staff",
    width: "auto",
    // sorter: (a, b) => a.profits_staff - b.profits_staff,
  },
];

const TableStaff = ({data}) => {
  return (
    <Table
      bordered
      dataSource={data}
      columns={columnsCus}
      pagination={false}
      scroll={{ x: 800, y: 600 }}
      summary={(pageData) => {
        let total_profits_staff = 0;
        let total_amount_order_staff = 0;
        pageData.forEach(({ profits_staff, amount_order_staff }) => {
          total_profits_staff += parseInt(profits_staff.replace(/[^\d]/g, ''));
          total_amount_order_staff += parseInt(amount_order_staff.replace(/[^\d]/g, ''));
        });
        return (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}></Table.Summary.Cell>
              <Table.Summary.Cell index={1}>Tổng</Table.Summary.Cell>
              <Table.Summary.Cell index={2}></Table.Summary.Cell>
              <Table.Summary.Cell index={3}>
                {total_amount_order_staff.toLocaleString('vi-VN')}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={4}>
                {formatCurrency(total_profits_staff+"")}
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        );
      }}
    />
  );
};
export default TableStaff;
