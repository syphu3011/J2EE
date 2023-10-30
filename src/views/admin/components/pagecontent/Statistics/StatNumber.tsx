
import { Button, Col, Layout, Row, Select, SelectProps, Space} from 'antd';
import "../../../style/product.css"
const { Header, Content } = Layout;
import React, { useState } from 'react';
import { Form, Input, InputNumber, Table } from 'antd';
const headerStyle: React.CSSProperties = {
    color: '#000000',
    minHeight: 100,
    paddingInline: 10,
    lineHeight: '100px',
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
  id_pro_imp: string;
  name_imp: string;
  color_imp: string;
  size_imp: string;
  provider: string;
  amount_imp: number;
  price_imp: number;
  total_imp:number;
}

const originData: Item[] = [];
const options: SelectProps['options'] = [];
const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};
for (let i = 0; i < 11; i++) {
  originData.push({
    key: i.toString(),
    id_pro_imp: `${i}`,
    name_imp: `Áo quần ${i}`,
    color_imp: '000000',
    size_imp: 'L',
    provider: `Đây là quần áo`,
    amount_imp: 15,
    price_imp: 3200000,
    total_imp: 3200000 * 15,
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

const StatNumber= () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const columns = [
    {
      title: 'Mã',
      dataIndex: 'id_pro_imp',
      width: '5%',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name_imp',
      width: 'auto',
      editable: true,
    },
    {
      title: 'Màu',
      dataIndex: 'color_imp',
      width: 'auto',

    },
    {
      title: 'Kích thước',
      dataIndex: 'size_imp',
      width: 'auto',
    },
    {
      title: 'Nhà cung cấp',
      dataIndex: 'provider',
      width: 'auto',
      editable: true,
    },
    {
        title: 'Số lượng',
        dataIndex: 'amount_imp',
        width: 'auto',
        editable: true,
    },
    {
        title: 'Giá',
        dataIndex: 'price_imp',
        width: 'auto',
        editable: true,
    },
    {
        title: 'Tổng tiền',
        dataIndex: 'total_imp',
        width: 'auto',
    },
  ];
  
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
                      <Col className="gutter-row" span={7}>
                      </Col>
                      <Col className="gutter-row" span={7}>
                      </Col>
                      <Col className="gutter-row" span={7}>
                      </Col>
                    </Row>
                    </Header>
                    <Content style={contentStyle} > 
                      <Form form={form} component={false}>
                          <Table

                              bordered
                              dataSource={data}
                              columns={mergedColumns}
                              rowClassName="editable-Stat"
                              pagination={ false }
                              scroll={{ x: 800, y: 500 }}
                              summary={(pageData) => { 
                                let totalBorrow = 0;
                                pageData.forEach(({ total_imp }) => {
                                  totalBorrow +=total_imp;
                                });
                                return (
                                  <Table.Summary fixed>
                                    <Table.Summary.Row>
                                      <Table.Summary.Cell index={0}></Table.Summary.Cell>
                                      <Table.Summary.Cell index={1}>Tổng tiền</Table.Summary.Cell>
                                      <Table.Summary.Cell index={2}></Table.Summary.Cell>
                                      <Table.Summary.Cell index={3}></Table.Summary.Cell>
                                      <Table.Summary.Cell index={4}></Table.Summary.Cell>
                                      <Table.Summary.Cell index={5}></Table.Summary.Cell>
                                      <Table.Summary.Cell index={6}></Table.Summary.Cell>
                                      <Table.Summary.Cell index={7}>{totalBorrow}</Table.Summary.Cell>
                                    </Table.Summary.Row>
                                  </Table.Summary>
                              );
                            }}
                          />
                      </Form>
                    </Content>
                </Layout>
            </Space>
        )
}
export default StatNumber;