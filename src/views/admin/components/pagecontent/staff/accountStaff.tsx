
import { Button, Col, DatePicker, Layout, Row, Select, SelectProps, Space, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import "../../../style/product.css"
const { Header, Content } = Layout;
import React, { useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
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
  id_staff: string;
  name_staff: string;
  UserStaff: string;
  PasswordStaff: string;
  permission: string;
  status: string;
}

const originData: Item[] = [];
const options: SelectProps['options'] = [];
for (let i = 0; i < 20; i++) {
  originData.push({
    key: i.toString(),
    id_staff: `${i}`,
    name_staff: `Nguyễn Văn ${i}`,
    UserStaff: `admin$${i}`,
    PasswordStaff: '123123',
    permission: " quyền?",
    status: 'Còn làm',

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
const AccStaff = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: '', numberphone: '', birthday: '', ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };
  const dateFormat = 'DD/MM/YYYY';

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
      dataIndex: 'id_staff',
      width: '10%',
    },
    {
      title: 'Tên nhân viên',
      dataIndex: 'name_staff',
      width: '15%',
      editable: true,
    },
    {
      title: 'Tài khoản',
      dataIndex: 'UserStaff',
      editable: true,
    },
    {
      title: 'Mật khẩu',
      dataIndex: 'PasswordStaff',
      editable: true,
    },
    {
      title: 'Quyền',
      dataIndex: 'permission',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
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
  for (let i = 10; i < 36; i++) {
    options.push({
      value: `ao` + i,
      label: `ao` + i,
    });
  }
  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };
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
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <Layout>
        <Header style={headerStyle} >
          <Row gutter={16}>
            <Col className="gutter-row" span={10}>
              <Form.Item label="Nhân viên:"
                labelAlign='left'
                labelCol={{ span: 5 }}
              >
                <Select
                  mode="multiple"
                  style={{ width: '60%' }}
                  allowClear
                  placeholder="Please select"
                  onChange={handleChange}
                  options={options}
                />
              </Form.Item>
              <Form.Item label="Quyền:"
                labelAlign='left'
                labelCol={{ span: 5 }}
              >
                <Select
                  mode="multiple"
                  style={{ width: '60%' }}
                  allowClear
                  placeholder="Please select"
                  onChange={handleChange}
                  options={options}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={10}>
              <div>
                <Form.Item label="Tài khoản:"
                  labelAlign='left'
                  labelCol={{ span: 6 }}
                >
                  <Input
                    style={{ width: '60%' }}
                  />
                </Form.Item>
                <Form.Item label="Mật Khẩu:"
                  labelAlign='left'
                  labelCol={{ span: 6 }}>
                  <Input
                    style={{ width: '60%' }}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={4}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Button type="primary" style={{ width: '70%', marginBottom: 30 }}>
                  Cấp tài khoản
                </Button>
                <Button type="primary" style={{ width: '70%' }}>
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
export default AccStaff;