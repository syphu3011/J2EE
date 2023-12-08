import {
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  Layout,
  Row,
  Skeleton,
  Space,
} from "antd";
import "../../../style/product.css";
const { Header, Content } = Layout;
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import {
  addStaff,
  editStaff,
  getStaff,
  removeStaff,
} from "../../../../../controllers/modules/admin/staff";
import dayjs from "dayjs";
import { authenticationAdmin } from "../../../../../../utils/util";
const headerStyle: React.CSSProperties = {
  color: "#000000",
  minHeight: 120,
  paddingInline: 10,
  lineHeight: "180px",
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
  id_staff: string;
  name_staff: string;
  CCCD: number;
  numberphone_staff: number;
  birthday_staff: string;
  status: string;
}
interface AddItem {
  ten: string;
  ngaysinh: string;
  socccd: string;
  sodienthoai: string;
}
const addData: AddItem = {
  ten: "string",
  ngaysinh: "string",
  socccd: "string",
  sodienthoai: "string",
};

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

const Staff = () => {
  const StaffData: Item[] = [];
  const [reload, setReload] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [data, setData] = useState(StaffData);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({
      name_staff: "",
      numberphone_staff: "",
      birthday_staff: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };
  const dateFormat = "YYYY-MM-DD";

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
        console.log(
          parseInt(newData[index].id_staff),
          newData[index].name_staff.toString(),
          newData[index].birthday_staff.split(" ")[0].toString(),
          newData[index].numberphone_staff.toString(),
          newData[index].CCCD.toString(),
          1
        );
        editStaff(
          parseInt(newData[index].id_staff),
          newData[index].name_staff.toString(),
          newData[index].birthday_staff.split(" ")[0].toString(),
          newData[index].numberphone_staff.toString(),
          newData[index].CCCD.toString(),
          1
        ).then((rs) => {
          //TODO: Thêm thông báo ở đây
          console.log(rs);
          alert(rs.data.suaNhanVien.message);
          if (rs.data.suaNhanVien.status === 201) {
            setReload(true);
          }
        });
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
    removeStaff(parseInt(key.toString())).then((rs) => {
      console.log(rs);
      alert(rs.data.xoaNhanVien.message);
      if (rs.data.xoaNhanVien.status === 201) {
        setReload(true);
      }
    });
    const newData = data.filter((item) => item.key !== key);

    setData(newData);
  };
  const columns = [
    {
      title: "Mã",
      dataIndex: "id_staff",
      width: "10%",
    },
    {
      title: "Tên nhân viên",
      dataIndex: "name_staff",
      width: "15%",
      editable: true,
    },
    {
      title: "Số điện thoại",
      dataIndex: "numberphone_staff",
      width: "auto",
      editable: true,
    },
    {
      title: "CMND/CCCD",
      dataIndex: "CCCD",
      editable: true,
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthday_staff",
      editable: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      dataIndex: "editcus",
      width: "8%",
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
            <Popconfirm title="Bạn muốn hủy??" onConfirm={cancel}>
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
    {
      key: "operation",
      dataIndex: "dlt_staff_infor",
      width: "8%",
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
  useEffect(() => {
    async function fetchMetaData(rs?) {
      if (rs && rs.data.dangNhapAdminVoiToken.status != 200) {
        navigate("/LoginAdmin");
        return;
      }
      const rsFetchData = await getStaff();

      var fetchData = rsFetchData.data.nhanvien.data;
      fetchData.forEach((element, index) => {
        StaffData.push({
          key: element.ma,
          id_staff: element.ma,
          name_staff: element.ten,
          CCCD: element.socccd,
          numberphone_staff: element.sodienthoai,
          birthday_staff: dayjs(new Date(parseInt(element.ngaysinh)))
            .format("YYYY-MM-DD")
            .toString(),
          status: element.trangthai.ten,
        });
      });

      setIsReady(true);
    }
    // console.log(data)

    if (reload) {
      isFirstLoad ? authenticationAdmin(fetchMetaData) : fetchMetaData();
      setIsFirstLoad(false);
      setReload(false);
    }
  }, [reload]);
  const onclick = () => {
    console.log(addData);
    addStaff(
      addData.ten,
      addData.ngaysinh,
      addData.sodienthoai,
      addData.socccd
    ).then((rs) => {
      console.log(rs);
      alert(rs.data.themNhanVien.message);
      if (rs.data.themNhanVien.status === 200) {
        setReload(true);
      }
    });
  };
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(dateString);
    addData.ngaysinh = dateString;
  };
  return isReady ? (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <Header style={headerStyle}>
          <Row gutter={16}>
            <Col className="gutter-row" span={10}>
              <Form.Item
                label="Họ tên:"
                labelAlign="left"
                labelCol={{ span: 5 }}
              >
                <Input
                  style={{ width: "60%" }}
                  onChange={(e) => (addData.ten = e.target.value)}
                />
              </Form.Item>
              <Form.Item
                label="Ngày sinh"
                labelAlign="left"
                labelCol={{ span: 5 }}
              >
                <DatePicker
                  format={dateFormat}
                  style={{ width: "60%" }}
                  onChange={onChange}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={10}>
              <div>
                <Form.Item
                  label="Số điện thoại:"
                  labelAlign="left"
                  labelCol={{ span: 6 }}
                >
                  <Input
                    style={{ width: "60%" }}
                    onChange={(e) => (addData.sodienthoai = e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label="CMND/CCCD:"
                  labelAlign="left"
                  labelCol={{ span: 6 }}
                >
                  <Input
                    style={{ width: "60%" }}
                    onChange={(e) => (addData.socccd = e.target.value)}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={4}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Button
                  type="primary"
                  style={{ width: "70%", marginBottom: 30 }}
                  onClick={onclick}
                >
                  Thêm
                </Button>
                <Button type="primary" style={{ width: "70%" }}>
                  Làm mới
                </Button>
              </div>
            </Col>
          </Row>
        </Header>
        <Content style={contentStyle}>
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
              rowClassName="table-staff"
              pagination={{
                onChange: cancel,
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
export default Staff;
