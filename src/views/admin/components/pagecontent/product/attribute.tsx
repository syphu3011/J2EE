
import { Button, Col, Layout, Row, Select, SelectProps, Space} from 'antd';
import "../../../style/product.css"
const { Header, Content } = Layout;
import React, { useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
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
  id_att: string;
  name_att: string;
  type_att: string;
  describe: string;
}

const originData: Item[] = [];
const options: SelectProps['options'] = [];
const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};
for (let i = 0; i < 20; i++) {
  originData.push({
    key: i.toString(),
    id_att: `${i}`,
    name_att: `Đỏ ${i}`,
    type_att: 'Màu',
    describe: `Đây là quần áo`,
  });
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text' ;
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
const Attribute= () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: '',numberphone: '',birthday: '' , ...record });
    setEditingKey(record.key);
  };

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

  const columns = [
    {
      title: 'Mã',
      dataIndex: 'id_att',
      width: 'auto',
    },
    {
      title: 'Tên thuộc tính',
      dataIndex: 'name_att',
      width: 'auto',
      editable: true,
    },
    {
      title: 'Loại thuộc tính',
      dataIndex: 'type_att',
      width: 'auto',
    },
    {
      title: 'Mô tả',
      dataIndex: 'describe',
      editable: true,
    },
    {
      title: 'Sửa',
      dataIndex: 'editcus',
      width: '8%',
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
    {
        title: 'Xóa',
        key: 'operation',
        dataIndex: 'delete',
        width: '8%',
        render: () => <a>Xóa</a>,
    },
  ];
    options.push({
      value: `color` ,
      label: `Màu` 
    });
    options.push({
        value: `size` ,
        label: `Kích thước` 
    });
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'numberphone' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
        return(
            <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
                <Layout>
                    <Header style={headerStyle} > 
                    <Row gutter={16}>
                      <Col className="gutter-row" span={8}>
                      <Form.Item label="Tên:">
                        <Input />
                      </Form.Item>
                      <Form.Item label="Loại"
                        style={{ width: '100%', height: 30, minWidth: '100%'}}>
                        <Select
                          placeholder="Hãy chọn"
                          onChange={handleChange}
                          options={options}
                        />
                      </Form.Item> 
                      </Col>
                      <Col className="gutter-row" span={8}>
                        <div  >
                        <Form.Item label="Mô tả">
                          <TextArea rows={4} />
                        </Form.Item>
                        </div>
                      </Col>
                      <Col className="gutter-row" span={8} >
                        <div style={{ display: 'flex', flexDirection: 'column', 
                                      justifyContent: 'center', alignItems:'center'}}>
                          <Button type="primary" style={{ width: '30%', marginBottom: 30}}>
                            Thêm
                          </Button>
                          <Button type="primary"  style={{ width: '30%'}}>
                            Làm mới
                          </Button>
                        </div>
                      </Col>
                    </Row>
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
export default Attribute;