import {
  Button,
  Col,
  Layout,
  Row,
  Select,
  SelectProps,
  Skeleton,
  Space,
} from "antd";
import "../../../style/product.css";
import {
  getStaff,
  grantAccount,
  removeAccount,
} from "../../../../../controllers/modules/admin/staff";
const { Header, Content } = Layout;
import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { authenticationAdmin } from "../../../../../../utils/util";
import { getPrivileges } from "../../../../../controllers/modules/admin/privileges";
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
  UserStaff: string;
  permission: string;
  status: string;
}
interface AddItemAcc {
  id_staff: number;
  username: string;
  password: string;
  id_privileges: number;
}
const addAcc: AddItemAcc = {
  id_staff: 0,
  username: "",
  password: "",
  id_privileges: 0,
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
const options1: SelectProps["options"] = [];
const options2: SelectProps["options"] = [];
const AccStaff = () => {
  const AccStaffData: Item[] = [];
  const [reload, setReload] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [data, setData] = useState(AccStaffData);

  useEffect(() => {
    async function fetchMetaData(rs?) {
      options1.splice(0, options1.length);
      options2.splice(0, options2.length);
      if (rs && rs.data.dangNhapAdminVoiToken.status != 200) {
        navigate("/LoginAdmin");
        return;
      }
      const rsFetchData = await getStaff();
      const rsquyenData = await getPrivileges();
      for (const element of rsFetchData.data.nhanvien.data) {
        if (element.quyen == null) {
          AccStaffData.push({
            key: element.ma,
            id_staff: element.ma,
            name_staff: element.ten,
            UserStaff: element.tentaikhoan,
            permission: element.quyen,
            status: element.trangthai.ten,
          });
        } else {
          AccStaffData.push({
            key: element.ma,
            id_staff: element.ma,
            name_staff: element.ten,
            UserStaff: element.tentaikhoan,
            permission: element.quyen.ten,
            status: element.trangthai.ten,
          });
        }

        options1.push({
          value: element.ma,
          label: element.ten,
        });
      }
      for (const e of rsquyenData.data.quyen.data) {
        options2.push({
          value: e.ma,
          label: e.ten,
        });
      }

      setIsReady(true);
    }

    if (reload) {
      isFirstLoad ? authenticationAdmin(fetchMetaData) : fetchMetaData();
      setIsFirstLoad(false);
      setReload(false);
    }
  }, [reload]);

  const handleDelete = (UserStaff: string, key: React.Key) => {
    console.log(UserStaff);
    if (UserStaff == null) {
      alert("Nhân viên này chưa có tài khoản");
    } else {
      removeAccount(UserStaff.toString()).then((rs) => {
        alert(rs.data.xoataikhoan.message);
        if (rs.data.xoataikhoan.status === 200) {
          setReload(true);
        }
      });
    }
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
    },
    {
      title: "Tài khoản",
      dataIndex: "UserStaff",
    },
    {
      title: "Quyền",
      dataIndex: "permission",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      dataIndex: "dlt_staff_acc",
      width: "8%",
      render: (_, record: { UserStaff: string; key: React.Key }) =>
        data.length >= 1 ? (
          <Popconfirm
            title="Bạn thật sự muốn xóa?"
            onConfirm={() => handleDelete(record.UserStaff, record.key)}
          >
            <a>Xóa</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const handleChange1 = (value: string) => {
    addAcc.id_staff = parseInt(value);
  };
  const handleChange2 = (value: string) => {
    addAcc.id_privileges = parseInt(value);
  };

  const onclick = () => {
    console.log(addAcc);
    // addAcc.id_privileges = 2;
    grantAccount(
      addAcc.id_staff,
      addAcc.username,
      addAcc.password,
      addAcc.id_privileges
    ).then((rs) => {
      console.log(rs);
      alert(rs.data.captaikhoan.message);
      if (rs.data.captaikhoan.status === 201) {
        setReload(true);
      }
    });
  };
  return isReady ? (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <Header style={headerStyle}>
          <Row gutter={16}>
            <Col className="gutter-row" span={10}>
              <Form.Item
                label="Nhân viên:"
                labelAlign="left"
                labelCol={{ span: 5 }}
              >
                <Select
                  style={{ width: "60%" }}
                  allowClear
                  placeholder="Please select"
                  onChange={handleChange1}
                  options={options1}
                />
              </Form.Item>
              <Form.Item
                label="Quyền:"
                labelAlign="left"
                labelCol={{ span: 5 }}
              >
                <Select
                  style={{ width: "60%" }}
                  allowClear
                  placeholder="Please select"
                  onChange={handleChange2}
                  options={options2}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={10}>
              <div>
                <Form.Item
                  label="Tài khoản:"
                  labelAlign="left"
                  labelCol={{ span: 6 }}
                >
                  <Input
                    style={{ width: "60%" }}
                    onChange={(e) => (addAcc.username = e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label="Mật Khẩu:"
                  labelAlign="left"
                  labelCol={{ span: 6 }}
                >
                  <Input
                    style={{ width: "60%" }}
                    onChange={(e) => (addAcc.password = e.target.value)}
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
                  Cấp tài khoản
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
              bordered
              dataSource={data}
              columns={columns}
              rowClassName="table_acc_staff"
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
export default AccStaff;
