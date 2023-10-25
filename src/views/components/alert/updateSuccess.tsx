import { Modal } from "antd";
import React from "react";
import UpdateInformation from "../../pages/editInformation/updateInformation";

interface SuccessLoginState {
  visible: boolean;
  
}

export default class UpdateSuccess extends React.Component<{}, SuccessLoginState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  componentDidMount() {
    this.showSuccessModal();
  }

  showSuccessModal = () => {
    Modal.success({
      content: 'Cập nhật thông tin thành công!',
     // onOk: this.handleOk,
    });
  }

  handleOk = () => {
    this.setState({ visible: false });
  }

  render() {
    const { visible } = this.state;

    return null
  }
}
export  class UpdatePassSuccess extends React.Component<{}, SuccessLoginState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  componentDidMount() {
    this.showSuccessModal();
  }

  showSuccessModal = () => {
    Modal.success({
      content: 'Đổi mật khẩu thành công!',
    // onOk: this.handleOk,
    });
  }

  handleOk = () => {
  }

  render() {
    const { visible } = this.state;

    return null
  }
}