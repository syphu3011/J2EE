import { Modal } from "antd";
import React from "react";

export default class SuccessLogin extends React.Component {
  componentDidMount() {
    this.showSuccessModal();
  }
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
  }

  showSuccessModal = () => {
    Modal.success({
      content: 'Đăng nhập thành công!',
      onOk: this.handleOk,
    });
  }

  handleOk = () => {
    this.setState({ visible: false });
    // Xử lý khi người dùng nhấn nút OK trong modal
    // Ví dụ: chuyển hướng, làm sạch dữ liệu, vv.
  }

  render() {
    return (null); // Component này không hiển thị giao diện, chỉ dùng để hiển thị modal thông báo
  }
}