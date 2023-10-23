
import { Button, Col, Layout, Row, Select, SelectProps, Space} from 'antd';
import "../../../style/product.css"
const { Header, Content } = Layout;
import React, { useState } from 'react';
import { Form, Input, InputNumber, Table } from 'antd';
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
  id_order: string;
  id_cus: string;
  name_cus: string;
  dateinit: string;
  total_money: number;
  status: string;
}

const originData: Item[] = [];
const options: SelectProps['options'] = [];
const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};
for (let i = 0; i < 20; i++) {
  originData.push({
    key: i.toString(),
    id_order: `${i}`,
    id_cus: `kh ${i}`,
    name_cus: `Nguyễn văn ${i}`,
    dateinit: '23/10/2023',
    total_money: 56300000,
    status: 'Chờ'
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
const Order= () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const columns = [
    {
      title: 'Mã',
      dataIndex: 'id_order',
      width: 'auto',
    },
    {
      title: 'Mã khách hàng',
      dataIndex: 'id_cus',
      width: 'auto',
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'name_cus',
      width: 'auto',
    },
    {
      title: 'Ngày lập',
      dataIndex: 'dateinit',
    },
    {
        title: 'Tổng tiền',
        dataIndex: 'total_money',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
    },
    {
        title: 'Xác nhận',
        key: 'confirm',
        dataIndex: 'confirm',
        width: 'auto',
        render: () => <a>Xác nhận</a>,
    },
    {
        title: 'Hủy',
        key: 'cancel',
        dataIndex: 'cancel',
        width: 'auto',
        render: () => <a>Hủy</a>,
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
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'numberphone' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
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
                                />
                            </Form>
                    </Content>
                </Layout>
            </Space>
        )
}
export default Order;