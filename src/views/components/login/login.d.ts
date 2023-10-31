import React from 'react';
import { FormInstance } from 'antd';
interface LoginProps {
    onClose: () => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}
interface LoginState {
    active: boolean;
    showForgotPasswordForm: boolean;
    showFormSignUp: boolean;
    showSuccessMessage: boolean;
    isLoggedIn: boolean;
}
export default class Login extends React.Component<LoginProps, LoginState> {
    formRef: React.RefObject<FormInstance<any>>;
    constructor(props: LoginProps);
    handleLoginCloseClick: () => void;
    handleForgotPasswordClick: () => void;
    hanldeComback: () => void;
    handleSignUpform: () => void;
    handleSignUpClose: () => void;
    handleSubmit: (values: any) => Promise<void>;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
