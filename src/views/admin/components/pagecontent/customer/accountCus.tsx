import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Skeleton, Table, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { getCustomer,  } from "../../../../../controllers/modules/admin/customer";
import { authenticationAdmin } from "../../../../../../utils/util";

interface Item {
  key: string;
  id: string;
  name: string;
  account: string;
  password: string;
  dateinit: string;
  status: string;
}

// const originData: Item[] = [];
// for (let i = 0; i < 20; i++) {
//   originData.push({
//     key: i.toString(),
//     id: `${i}`,
//     name: `Khách hàng ${i}`,
//     account: `khachhang${i}`,
//     password: `123123`,
//     dateinit: `18/10/2023`,
//     status: `Hoạt động`,
//   });
// }
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
  // const [form] = Form.useForm();
  // const [data] = useState(originData);
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
//##################################################
  const originData: Item[] = [];

  const navigate = useNavigate()

  const [reload, setReload] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isReady, setIsReady] = useState(false);

  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");

  
  useEffect(()=>{
    async function fetchAccountCustomer(rs?){
      // Kiểm tra đăng nhập
      if (rs && rs.data.dangNhapAdminVoiToken.status != 200) {
        navigate("/LoginAdmin");
        return;
      }
      // Lấy thông tin khách hàng
      const customers = await getCustomer()
      
      customers.data.khachhang.data.forEach(element => {

        const rsdayinit = new Date(parseInt(element.ngaythamgia))
        const strdayinit = `${rsdayinit.getFullYear()}-${(rsdayinit.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${rsdayinit.getDate()
            .toString()
            .padStart(2, '0')} ${rsdayinit.getHours()
              .toString()
              .padStart(2, '0')}:${rsdayinit.getMinutes()
                .toString()
                .padStart(2, '0')}:${rsdayinit.getSeconds()
                  .toString()
                  .padStart(2, '0')}`;
        
        originData.push({
          key: element.ma,
          id: element.ma,
          name: element.ten,
          account: element.tentaikhoan,
          password: "",
          dateinit: strdayinit,
          status: element.trangthai.ten
        }
        );
      });
      setData(originData)
      setIsReady(true);
    }
    if (reload) {
      isFirstLoad ? authenticationAdmin(fetchAccountCustomer) : fetchAccountCustomer();
      setIsFirstLoad(false);
      setReload(false);
    }
  }, [reload])
//##################################################

  return isReady?(
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
  ): (
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

export default AccountCus;
