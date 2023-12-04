import "../../../style/product.css";
import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  Tag,
  Skeleton,
} from "antd";
import { authenticationAdmin } from "../../../../../../utils/util";
import { getCustomer } from "../../../../../controllers/modules/admin/customer";
import { useNavigate } from "react-router-dom";
import {
  editProductInStock,
  getProductInStock,
} from "../../../../../controllers/modules/admin/productInStock";
const contentStyle: React.CSSProperties = {
  textAlign: "center",
  alignItems: "center",
  minHeight: 200,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#ffffff",
};

interface Item {
  key: string;
  id_pro: string;
  id_import: string;
  name_pro: string;
  type: string[];
  color: string;
  id_color: string;
  size: string;
  id_size: string;
  dateinit: string;
  partner: string;
  price_inp: number;
  price_out: number;
  amount: number;
}

// const originData: Item[] = [];
// for (let i = 0; i < 11; i++) {
//   originData.push({
//     key: i.toString(),
//     id_pro: `${i}`,
//     name_pro: `Áo quần ${i}`,
//     type: ["áo", "quần"],
//     color: "000000",
//     size: "S",
//     dateinit: "23/10/2023",
//     partner: "ABC",
//     price_inp: 90000000,
//     price_out: 100000000,
//     amount: 100,
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
const Inventory = () => {
  // Define
  const [isReady, setIsReady] = useState(false);
  const originData: Item[] = [];
  const [data, setData] = useState(originData);
  const navigate = useNavigate();

  const [reload, setReload] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [form] = Form.useForm();

  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: Item) => record.key === editingKey;

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
        // const newdata = newData()
        editProductInStock(
          parseInt(newData[index].id_pro),
          parseInt(newData[index].id_import),
          parseInt(newData[index].id_color),
          parseInt(newData[index].id_size),
          newData[index].price_out
        ).then((rs) => {
          //TODO: Thêm thông báo ở đây
          console.log(rs);
          alert(rs.data.suaHangTrongKho.message);
          if (rs.data.suaHangTrongKho.status === 201) {
            // clearField();
            //setIsEdit(false);
            setReload(true);
          }
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
  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: "price_out", ...record });
    setEditingKey(record.key);
  };

  const columns = [
    {
      title: "Mã Phiếu Nhập",
      dataIndex: "id_import",
      width: "auto",
    },
    {
      title: "Mã Sản Phẩm",
      dataIndex: "id_pro",
      width: "auto",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name_pro",
      width: "auto",
    },
    {
      title: "Loại",
      dataIndex: "type",
      render: (type_pro: string[]) => (
        <>
          {type_pro.map((tag) => (
            <Tag key={tag}>{tag.toUpperCase()}</Tag>
          ))}
        </>
      ),
    },
    {
      title: "Màu",
      dataIndex: "color",
      width: "auto",
      render: (color: string) => (
        <Tag color={color} key={color} style={{ border: "1px solid black" }}>
          {color.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Kích thước",
      dataIndex: "size",
      width: "auto",
    },
    {
      title: "Ngày nhập",
      dataIndex: "dateinit",
      width: "auto",
    },
    {
      title: "Nhà cung cấp",
      dataIndex: "partner",
      width: "auto",
    },
    {
      title: "Giá nhập",
      dataIndex: "price_inp",
      width: "auto",
    },
    {
      title: "Giá bán",
      dataIndex: "price_out",
      width: "auto",
      editable: true,
    },
    {
      title: "số lượng",
      dataIndex: "amount",
      width: "auto",
    },
    {
      title: "Sửa giá",
      dataIndex: "editprice",
      width: "auto",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Lưu
            </Typography.Link>
            <Popconfirm title="Bạn muốn hủy?" onConfirm={cancel}>
              <a>Hủy</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Sửa
          </Typography.Link>
        );
      },
    },
  ];

  useEffect(() => {
    async function fetchInventory(rs?) {
      if (rs && rs.data.dangNhapAdminVoiToken.status != 200) {
        navigate("/LoginAdmin");
        return;
      }
      const rsProductsInstock = await getProductInStock();

      var productsInstock = rsProductsInstock.data.hangtrongkho.data;
      //
      //
      console.log(productsInstock.length);
      productsInstock.forEach((element, index) => {
        console.log("chiu luon a");
        console.log(element.soluong);
        //  Convert Timestamp to Date
        const dateInit = new Date(parseInt(element.phieunhap.ngaynhap));
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
        const rsLoai: string[] = [];
        element.loai.forEach((e) => {
          rsLoai.push(e.ten);
        });
        originData.push({
          key: index,
          id_pro: element.masanpham,
          name_pro: element.tensanpham,
          type: rsLoai,
          color: element.mau.ten,
          size: element.kichthuoc.ten,
          dateinit: rsDateInit,
          partner: element.ncc.ten,
          price_inp: element.gianhap,
          price_out: element.giaban,
          amount: element.soluong,
          id_import: element.phieunhap.ma,
          id_color: element.mau.ma,
          id_size: element.kichthuoc.ma,
        });
      });
      // console.log("originData " + originData.length);
      setData(originData);
      // console.log("Data " + data.length);
      setIsReady(true);
    }
    // console.log(data)

    if (reload) {
      isFirstLoad ? authenticationAdmin(fetchInventory) : fetchInventory();
      setIsFirstLoad(false);
      setReload(false);
    }
  }, [reload]);

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "price_out" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  //##################################################
  return isReady ? (
    <Form form={form} component={false}>
      <Table
        key={Math.random()} // Thêm thuộc tính key với giá trị duy nhất
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
          pageSize: 10, // Số hàng hiển thị trên mỗi trang
          //showSizeChanger: true, // Hiển thị chọn số hàng trên mỗi trang
          //pageSizeOptions: ["10", "20", "30"], // Các tùy chọn số hàng trên mỗi trang
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`, // Hiển thị thông tin tổng số hàng
        }}
      />
    </Form>
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
export default Inventory;
