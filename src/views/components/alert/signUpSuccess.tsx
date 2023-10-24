import { Modal } from "antd";
import React from "react";
import Login from "../login/login";

interface SuccessLoginState {
  visible: boolean;
}

export default class SuccessLogin extends React.Component<{}, SuccessLoginState> {
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
      content: 'Tạo tài khoản thành công! Hãy đăng nhập để trải nghiệm',
      onOk: this.handleOk,
    });
  }

  handleOk = () => {
    this.setState({ visible: false });
  }

  render() {
    const { visible } = this.state;

    return (
      <>
        {visible ? (
          <Login
            onClose={() => {
              throw new Error("Function not implemented.");
            }}
            isLoggedIn={false}
            setIsLoggedIn={(isLoggedIn) => {
              throw new Error("Function not implemented.");
            }}
          />
        ) : null}
      </>
    );
  }
}