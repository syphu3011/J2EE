const getStringFromSwitch = (value: string): string => {
  let result: string;
  switch (value) {
    case "AccountCus":
      result = "Khách hàng/ Tài khoản khách hàng";
      break;
    case "Customers":
      result = "Khách hàng/ Thông tin khách hàng";
      break;
    case "Products":
      result = "Sản phẩm/ Sản Phẩm";
      break;
    case "TypePro":
      result = "Sản phẩm/ Loại sản phẩm";
      break;
    case "ProInStock":
      result = "Sản phẩm/ Sản phẩm trong kho";
      break;
    case "Attribute":
      result = "Sản phẩm/ Thuộc tính sản phẩm";
      break;
    case "Orders":
      result = "Đơn hàng/ Các đơn hàng";
      break;
    case "HistoryOr":
      result = "Đơn hàng/ Lịch sử đơn hàng";
      break;
    case "ImportNew":
      result = "Nhập hàng/ Nhập hàng mới";
      break;
    case "HistoryImp":
      result = "Nhập hàng/ Lịch sử nhập";
      break;
    case "InforStaff":
      result = "Nhân viên/ Thông tin nhân viên";
      break;
    case "AccountStaff":
      result = "Nhân viên/ Tài khoản nhân viên";
      break;
    case "Message":
      result = "Tin nhắn hỗ trợ";
      break;
    case "Status":
      result = "Quản lý quyền";
      break;
    case "InforPart":
      result = "Đối tác/ Thông tin đối tác";
      break;
    case "Provider":
      result = "Đối tác/ Sản phẩm cung cấp";
      break;
    case "Number":
      result = "Thống kê/ Số liệu";
      break;
    case "Chart":
      result = "Thống kê/ Biểu đồ";
      break;
    default:
      result = "Trang chủ";
  }
  return result;
};

export default getStringFromSwitch;
