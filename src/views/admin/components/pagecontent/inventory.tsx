
import { Button, Col, Layout, Row, Select, SelectProps, Space, Upload} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import "../../style/product.css"
import { Image } from 'antd';
const { Header, Content } = Layout;
import React, { useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography, Tag } from 'antd';
import TextArea from 'antd/es/input/TextArea';
const headerStyle: React.CSSProperties = {
    color: '#000000',
    minHeight: 120,
    paddingInline: 10,
    lineHeight: '180px',
    backgroundColor: '#ffffff',
  };
const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
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
const options: SelectProps['options'] = [];
const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};
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
        )
    },
    {
        title: 'Kích thước',
        dataIndex: 'size',
        width: 'auto'
    },
    {
        title: 'Ngày nhập',
        dataIndex: 'dateinit',
        width: 'auto'
    },
    {
        title: 'Nhà cung cấp',
        dataIndex: 'partner',
        width: 'auto'
    },
    {
        title: 'Giá nhập',
        dataIndex: 'price_inp',
        width: 'auto'
    },
    {
        title: 'Giá bán',
        dataIndex: 'price_out',
        width: 'auto'
    },
    {
        title: 'số lượng',
        dataIndex: 'amount',
        width: 'auto'
    },
    {
        title: 'Sửa giá',
        dataIndex: 'edit_price',
        width: 'auto'
    },
  ];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: `ao` + i,
      label: `ao` + i,
    });
  }
  const mergedColumns = columns.map((col) => {
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'price_inp' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
        return(
            <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
                <Layout>
                    <Header style={headerStyle} > 
                      <Form.Item label="Thuộc loại"
                        style={{ width: '30%', height: 30,}}>
                        <Select     
                          placeholder="Please select"
                          onChange={handleChange}
                          options={options}
                        />
                      </Form.Item> 
                    </Header>
                    <Content style={contentStyle} > 
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
                    </Content>
                </Layout>
            </Space>
        )
}
export default Inventory;