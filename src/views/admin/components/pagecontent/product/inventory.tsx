
import { Button, Col, Layout, Select, SelectProps, Space, Upload} from 'antd';
import "../../../style/product.css"
const { Content } = Layout;
import React, { useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography, Tag } from 'antd';
const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    alignItems: 'center',
    minHeight: 200,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#ffffff',
  };

interface Item {
  key: string;
  id_pro: string;
  name_pro: string;
  type : string[];
  color: string;
  size:  string;
  dateinit: string;
  partner: string;
  price_inp: number;
  price_out: number;
  amount: number;
}

const originData: Item[] = [];
for (let i = 0; i < 11; i++) {
  originData.push({
    key: i.toString(),
    id_pro: `${i}`,
    name_pro: `Áo quần ${i}`,
    type: ['áo', 'quần'],
    color: '000000',
    size:  'S',
    dateinit: '23/10/2023',
    partner: 'ABC',
    price_inp: 90000000,
    price_out: 100000000,
    amount: 100,
  });
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text' | 'Date';
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
const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

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
const Inventory= () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: Item) => record.key === editingKey;


  const cancel = () => {
    setEditingKey('');
  };
  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;
  
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: 'price_out', ...record });
    setEditingKey(record.key);
  };
    

  const columns = [
    {
      title: 'Mã',
      dataIndex: 'id_pro',
      width: 'auto',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name_pro',
      width: 'auto'
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      render: (type_pro: string[]) => (
        <>
          {type_pro.map((tag) => (
            <Tag  key={tag}>
              {tag.toUpperCase()}
            </Tag>
          ))}
        </>
      )
    },
    {
        title: 'Màu',
        dataIndex: 'color',
        width: 'auto',
        render: (color: string) => (
            <Tag color={color} key={color}>
            {color.toUpperCase()}
            </Tag>
        ),
    },
    {
        title: 'Kích thước',
        dataIndex: 'size',
        width: 'auto',
    },
    {
        title: 'Ngày nhập',
        dataIndex: 'dateinit',
        width: 'auto',
    },
    {
        title: 'Nhà cung cấp',
        dataIndex: 'partner',
        width: 'auto',
    },
    {
        title: 'Giá nhập',
        dataIndex: 'price_inp',
        width: 'auto',
    },
    {
        title: 'Giá bán',
        dataIndex: 'price_out',
        width: 'auto',
        editable: true,
    },
    {
        title: 'số lượng',
        dataIndex: 'amount',
        width: 'auto',
    },
    {
      title: 'Sửa giá',
      dataIndex: 'editprice',
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Lưu
            </Typography.Link>
            <Popconfirm title="Bạn muốn hủy??" onConfirm={cancel}>
              <a>Hủy</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Sửa
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'price_out' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return(
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
            rowClassName="editable-row"
            pagination={{
            onChange: cancel,
            }}
        />
    </Form>
  );
};
export default Inventory;