import React, { useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";

interface Item {
  key: string;
  id: string;
  name: string;
  account: string;
  password: string;
  dateinit: string;
  status: string;
}

const originData: Item[] = [];
for (let i = 0; i < 20; i++) {
  originData.push({
    key: i.toString(),
    id: `${i}`,
    name: `Khách hàng ${i}`,
    account: `khachhang${i}`,
    password: `123123`,
    dateinit: `18/10/2023`,
    status: `Hoạt động`,
  });
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text" | "Date";
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Hãy nhập ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const AccountCus = () => {
  const [form] = Form.useForm();
  const [data] = useState(originData);
  const columns = [
    {
      title: "Mã",
      dataIndex: "id",
      width: "10%",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      width: "20%",
    },
    {
      title: "Tài khoản",
      dataIndex: "account",
      width: "15%",
    },
    {
      title: "Mật khẩu",
      dataIndex: "password",
      width: "10%",
    },
    {
      title: "Ngày tham gia",
      dataIndex: "dateinit",
      width: "15%",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: "15%",
    },
    {
      key: "operation",
      dataIndex: "delete",
      width: "15%",
      render: () => <a>Khóa tài khoản</a>,
    },
  ];

  const mergedColumns = columns.map((col) => {
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "numberphone" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
      />
    </Form>
  );
};

export default AccountCus;
