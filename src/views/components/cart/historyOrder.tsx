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
import { getinformation } from "../../../controllers/modules/customer/changeinformation";
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
interface ExpandedDataType {
     key: React.Key;
     name_pro_order: string;
     size_order: string;
     color_order: string;
     price_order: number;
     amount_order: number;
}
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
// const dateFormat = "DD/MM/YYYY";
const dateFormat = "YYYY-MM-DD";

// const originData: Item[] = [];
// for (let i = 0; i < 20; i++) {
//     originData.push({
//         key: i.toString(),
//         id_order: `${i}`,
//         id_cus: `kh ${i}`,
//         name_cus: `Nguyễn văn ${i}`,
//         dateInit: '23/10/2023',
//         staffconfirm: 'NV0001',
//         total_money: 56300000,
//         status: 'Chờ'
//     });
// }
// const metaOriginData: Item[] = [];
let fromDate = dayjs();
let toDate = dayjs();
let status = "";
const HistoryOrder = ({isLoggedIn=true}) => {
     // Define
     const originData: Item[] = [];
     const exData = [];
     const [metaData, setMetaData] = useState(originData);

     const [isReady, setIsReady] = useState(true);
     const [editingKey, setEditingKey] = useState("");
     const navigate = useNavigate();
     const [data, setData] = useState(originData);
     const [reload, setReload] = useState(true);
     const [isFirstLoad, setIsFirstLoad] = useState(true);
     const [expanderData, setExpanderData] = useState(exData);
     const [isdata, setOrder] = useState(null)
     

     useEffect(() => {
          async function fetchMetaData() {
            const rsKH = await getinformation();
            const taikhoan = rsKH.data.thongtinkhachhang.data;
            console.log(taikhoan)
            const maKh = taikhoan.ma;
              console.log(maKh);
              const rsFetchData = await getHistoryOrders();
              console.log(rsFetchData);
              if (rsFetchData.data.lichsudonhang.status === 200) {
                const fetchData = rsFetchData.data.lichsudonhang.data;
                const filteredData = fetchData.filter(
                  (element) => element.khachhang.ma === maKh
                );
                //console.log(fetchData.khachhang.ma);
              // console.log(filteredData)
                setData(filteredData);
                filteredData.forEach((element, index) => {
                  exData.push({ key: element.ma, sanpham: element.sanpham });
                  // Convert Timestamp to Date
                  const dateInit = new Date(parseInt(element.ngaylap));
                  // Format to date time
                  const rsDateInit = `${dateInit.getFullYear()}-${(
                    dateInit.getMonth() + 1
                  )
                    .toString()
                    .padStart(2, "0")}-${dateInit
                    .getDate()
                    .toString()
                    .padStart(2, "0")} ${dateInit
                    .getHours()
                    .toString()
                    .padStart(2, "0")}:${dateInit
                    .getMinutes()
                    .toString()
                    .padStart(2, "0")}:${dateInit
                    .getSeconds()
                    .toString()
                    .padStart(2, "0")}`;
        
                  originData.push({
                    key: element.ma,
                    id_order: element.ma,
                    id_cus: element.khachhang.ma,
                    name_cus: element.khachhang.ten,
                    dateInit: rsDateInit,
                    staffconfirm: element.nhanvien.ten,
                    total_money: element.tongtien,
                    status: element.trangthaihoadon
                      ? element.trangthaihoadon.ten
                      : "",
                    phone: element.sodienthoai,
                    email: element.email,
                    address: element.diachi,
                  });
                });
              }
        
              fromDate = dayjs().subtract(1, "day");
              toDate = dayjs().add(1, "day");
              status = "Tất cả";
        
              setMetaData(originData);
              setExpanderData(exData);
            
          }
        
          fetchMetaData();
        }, [isLoggedIn]);
     const [form] = Form.useForm();
     //   const [data] = useState(originData);
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
     // Expander
     const expandedRowRender = (record) => {
          const columns: TableColumnsType<ExpandedDataType> = [
               { title: "Tên sản phẩm", dataIndex: "name_pro_order" },
               { title: "Kích thước", dataIndex: "size_order" },
               { title: "Màu", dataIndex: "color_order" },
               { title: "Giá", dataIndex: "price_order" },
               { title: "Số lượng", dataIndex: "amount_order" },
          ];
          const expanderItem = expanderData.find((item) => item.key === record.key);
          // console.log(expanderItem);
          const data: ExpandedDataType[] = [];

          expanderItem.sanpham.forEach((element, index) => {
               data.push({
                    key: element.ma,
                    name_pro_order: element.sanpham.ten,
                    size_order: element.kichco.ten,
                    color_order: element.mau.ten,
                    price_order: element.gia,
                    amount_order: element.soluong,
               });
          });
          // for (let i = 0; i < expanderData.length; ++i) {
          //   data.push({
          //     key: i.toString(),
          //     name_pro_order: expanderData[i].ten,
          //     size_order: "XL",
          //     color_order: "Đen",
          //     price_order: 230000,
          //     amount_order: 4,
          //   });
          // }
          return <Table columns={columns} dataSource={data} pagination={false} />;
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
               <Skeleton.Input active={true} size={"large"} block={true} />
               <br />
               <Skeleton.Input active={true} size={"large"} block={true} />
               <br />
               <Skeleton.Input active={true} size={"large"} block={true} />
               <br />
               <Skeleton.Input active={true} size={"large"} block={true} />
               <br />
               <Skeleton.Input active={true} size={"large"} block={true} />
               <br />
               <Skeleton.Input active={true} size={"large"} block={true} />
               <br />
               <Skeleton.Input active={true} size={"large"} block={true} />
               <br />
               <Skeleton.Input active={true} size={"large"} block={true} />
               <br />
               <Skeleton.Input active={true} size={"large"} block={true} />
               <br />
               <Skeleton.Input active={true} size={"large"} block={true} />
               <br />
               <Skeleton.Input active={true} size={"large"} block={true} />
               <br />
               <Skeleton.Input active={true} size={"large"} block={true} />
               <br />
          </div>
     );
};
export default HistoryOrder;
