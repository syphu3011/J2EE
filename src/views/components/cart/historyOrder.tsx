import {
     Button,
     DatePicker,
     Layout,
     Select,
     Skeleton,
     Space,
     TableColumnsType,
} from "antd";
const { Header, Content } = Layout;
import React, { useEffect, useState } from "react";
import { Form, Table } from "antd";
import dayjs from "dayjs";

import { useNavigate } from "react-router-dom";
import Item from "antd/es/list/Item";
import { getHistoryOrders } from "../../../controllers/modules/customer/historyorders";
const headerStyle: React.CSSProperties = {
     color: "#000000",
     minHeight: 60,
     paddingInline: 10,
     lineHeight: "60px",
     backgroundColor: "#ffffff",
};
const contentStyle: React.CSSProperties = {
     textAlign: "center",
     minHeight: 120,
     lineHeight: "120px",
     color: "#fff",
     backgroundColor: "#ffffff",
};
interface Item {
     key: string;
     id_order: string;
     id_cus: string;
     name_cus: string;
     phone: string
     email: string
     address: string
     dateInit: string;
     staffconfirm: string;
     total_money: number;
     status: string;
}
const HistoryOrder = () => {
     // Define
    // const originData: Item[] = [];
     const exData = [];;

     const [isReady, setIsReady] = useState(true);
     const [data, setData] = useState(null);
     //

     async function fetchMetaData() {
          const rsFetchData = await getHistoryOrders();
          if (rsFetchData.data.lichsudonhang.status === 200) {
            const fetchData = rsFetchData.data.lichsudonhang.data;
             //  Convert Timestamp to Date
            return fetchData.map((order) => ({
               key:order.ma,
              id_order: order.ma,
              id_cus:order.khachhang.ma,
              name_cus:order.khachhang.ten,
              phone:order.sodienthoai,
              email:order.email,
              address:order.diachi,
              dateInit: dayjs(parseInt(order.ngaylap)).format('YYYY-MM-DD HH:mm:ss'),
              staffconfirm:order.nhanvien?.ma ?? "Chưa nhân viên xác nhận",
              total_money:order.tongtien,
              status:order.trangthaihoadon.ten,
              products: order.sanpham.map((element)=>({
                    name_pro_order: element.sanpham.ten,
                    size_order: element.kichco.ten,
                    color_order: element.mau.ten,
                    price_order: element.gia,
                    amount_order: element.soluong,
              }))

            }));
          }
          return []; // Return an empty array if fetching data fails or no data is available
        }
        
        useEffect(() => {
          async function fetchData() {
            const fetchedData = await fetchMetaData();
            setData(fetchedData);
          }
        
          fetchData();
        }, []);
        
     const [form] = Form.useForm();
      //const [data] = useState(originData);
     const columns = [
          {
               title: "Mã",
               dataIndex: "id_order",
               width: "auto",
          },
          {
               title: "Mã khách hàng",
               dataIndex: "id_cus",
               width: "auto",
          },
          {
               title: "Tên khách hàng",
               dataIndex: "name_cus",
               width: "auto",
          },
          {
               title: "Số điện thoại",
               dataIndex: "phone",
               width: "auto",
          },
          {
               title: "Email",
               dataIndex: "email",
               width: "auto",
          },
          {
               title: "Địa chỉ",
               dataIndex: "address",
               width: "auto",
          },
          {
               title: "Ngày xác nhận",
               dataIndex: "dateInit",
          },
          {
               title: "Người xác nhận",
               dataIndex: "staffconfirm",
          },
          {
               title: "Tổng tiền",
               dataIndex: "total_money",
          },
          {
               title: "Trạng thái",
               dataIndex: "status",
          },
     ];
     const rowExpandable = (record) => {
          // Trả về true nếu bản ghi có sản phẩm
          return record.id_order === record.key;
        };
     const expandedRowRender = (record) => {
          const columns = [
            { title: 'Tên sản phẩm', dataIndex: 'name_pro_order', key: 'name_pro_order' },
            { title: 'Kích cỡ', dataIndex: 'size_order', key: 'size_order' },
            { title: 'Màu sắc', dataIndex: 'color_order', key: 'color_order' },
            { title: 'Giá', dataIndex: 'price_order', key: 'price_order' },
            { title: 'Số lượng', dataIndex: 'amount_order', key: 'amount_order' },
          ];
          rowExpandable(record)
          return (
            <Table
              columns={columns}
              dataSource={record.products}
              pagination={false}
            />
          );
        };

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


     return isReady ? (
          <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]} className="history-container-order">

               <Layout>
                    <Header style={headerStyle}>
                         <h1 style={{ textAlign: 'center' }}>LỊCH SỬ ĐƠN HÀNG</h1>

                    </Header>
                    <Content style={contentStyle}>
                         <Form form={form} component={false}>
                              <Table
                                   bordered
                                   expandable={{ expandedRowRender }}
                                   dataSource={data}
                                   columns={mergedColumns}
                                   rowClassName="order-row"
                                   pagination={{
                                        //onChange: cancel,
                                        pageSize: 10, // Số hàng hiển thị trên mỗi trang
                                        showTotal: (total, range) =>
                                             `${range[0]}-${range[1]} of ${total} items`, // Hiển thị thông tin tổng số hàng
                                   }}
                              />
                         </Form>
                    </Content>
               </Layout>
          </Space>
     ) : (
          <div
               style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    paddingTop: "20px",
                    paddingBottom: "20px",
               }}
          >
               
          </div>
     );
};
export default HistoryOrder;
