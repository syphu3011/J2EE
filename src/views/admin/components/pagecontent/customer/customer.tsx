import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { editCustomer, getCustomer,  } from "../../../../../controllers/modules/admin/customer";
import { useNavigate } from "react-router-dom";
import Item from "antd/es/list/Item";
import {
  authenticationAdmin,
  convertB64ToImage,
  getBase64AndName,
} from "../../../../../../utils/util";
import { Image, Skeleton } from "antd";



interface Item {
  key: string;
  id: string;
  name: string;
  numberphone: number;
  birthday: string;
  dateinit: string;
  status: string;
}


// for (let i = 0; i < 20; i++) {
//   originData.push({
    // key: i.toString(),
    // id: `${i}`,
    // name: `Khách hàng ${i}`,
    // numberphone: 394142181,
    // birthday: `18/02/2002`,
    // dateinit: `18/10/2023`,
    // status: `Hoạt động`,
//   });
// }
// const customers =  getCustomer()

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

const Customer = () => {

  const originData: Item[] = [];
    //Chuyển hướng
  const navigate = useNavigate()

  const [reload, setReload] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isReady, setIsReady] = useState(false);

  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: Item) => record.key === editingKey;
  
  // Action edit
  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", numberphone: "", birthday: "", ...record });
    setEditingKey(record.key);
    setIdEdit(parseInt(record.id))
    setNameEdit(record.name)
    setNumberphoneEdit(record.numberphone.toString())
    setBirthdayEdit(record.birthday)
    setIsEdit(true)
    
  };

  const cancel = () => {
    setEditingKey("");
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
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const handleDelete = (key: React.Key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  // Update customer
  // To save variable
  const [isEdit, setIsEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(0);
  const [nameEdit, setNameEdit] = useState("");
  const [birthdayEdit, setBirthdayEdit] = useState("")
  const [numberphoneEdit, setNumberphoneEdit] = useState("")


  const handleIdEditChange = (newId) => {
  setIdEdit(parseInt(newId));
};

const handleNameEditChange = (newName) => {
  setNameEdit(newName);
};

const handleNumberphoneEditChange = (newNumberphone) => {
  setNumberphoneEdit(newNumberphone.toString());
};

const handleBirthdayEditChange = (newBirthday) => {
  setBirthdayEdit(newBirthday);
};

  
  const columns = [
    {
      title: "Mã",
      dataIndex: "id",
      width: "auto",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      width: "auto",
      editable: true,
    },
    {
      title: "Số điện thoại",
      dataIndex: "numberphone",
      width: "auto",
      editable: true,
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      width: "auto",
      editable: true,
    },
    {
      title: "Ngày tham gia",
      dataIndex: "dateinit",
      width: "auto",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: "auto",
    },
    {
      dataIndex: "editcus",
      width: "auto",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => {
                
                // customerAction()
              }}
              style={{ marginRight: 8 }}
            >
              Lưu
            </Typography.Link>
            <Popconfirm title="Bạn muốn hủy??" onConfirm={cancel}>
              <a>Hủy</a>
            </Popconfirm>
          </span>
        ) 
        : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Sửa
          </Typography.Link>
        );
      },
    },
    {
      dataIndex: "delete_cus",
      width: "auto",
      render: (_, record: { key: React.Key }) =>
        data.length >= 1 ? (
          <Popconfirm
            title="Bạn thật sự muốn xóa?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Xóa</a>
          </Popconfirm>
        ) : null,
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
        inputType: col.dataIndex === "numberphone" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  //##################################################
const customerAction = () =>{
  console.log(idEdit,
    nameEdit,
    birthdayEdit,
    numberphoneEdit)
  editCustomer(
    idEdit,
    nameEdit,
    birthdayEdit.split(" ")[0],
    numberphoneEdit
  ).then((rs) => {
    //TODO: Thêm thông báo ở đây
    console.log(rs)
    alert(rs.data.suaKhachHang.message);
    if (rs.data.suaKhachHang.status === 201) {
      // clearField();
      setIsEdit(false);
      setReload(true);
    }
  })
}
  //##################################################
  useEffect(() => {
    async function fetchCustomers(rs?) {
      if (rs && rs.data.dangNhapAdminVoiToken.status != 200) {
        navigate("/LoginAdmin");
        return;
      }
      const rsCustomer = await getCustomer();
 
      var customers = rsCustomer.data.khachhang.data;
      //
      // 
      customers.forEach((element, index)=>{
        const rsbirthday = new Date(parseInt(element.ngaysinh))
        const rsdayinit = new Date(parseInt(element.ngaythamgia))
        originData.push({    
          key: element.ma,
          id: element.ma,
          name: element.ten,
          numberphone: element.sodienthoai,
          birthday: `${rsbirthday.getFullYear()}-${(rsbirthday.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${rsbirthday.getDate().toString().padStart(2, '0')} ${rsbirthday.getHours().toString().padStart(2, '0')}:${rsbirthday.getMinutes().toString().padStart(2, '0')}:${rsbirthday.getSeconds().toString().padStart(2, '0')}`,
          dateinit: `${rsdayinit.getFullYear()}-${(rsdayinit.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${rsdayinit.getDate().toString().padStart(2, '0')} ${rsdayinit.getHours().toString().padStart(2, '0')}:${rsdayinit.getMinutes().toString().padStart(2, '0')}:${rsdayinit.getSeconds().toString().padStart(2, '0')}`,
          
          status: element.trangthai.ten,})
      })
      setData(originData)
      setIsReady(true);
    }
    // console.log(data)
    
    if (reload) {
      isFirstLoad ? authenticationAdmin(fetchCustomers) : fetchCustomers();
      setIsFirstLoad(false);
      setReload(false);
    }
  }, [reload]);



  return isReady ? (
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

export default Customer;
