import React from 'react';
import { FormInstance } from 'antd';
interface SignUpProps {
    onCloseSignUp: () => void;
}
interface SignUpState {
    active: boolean;
    showFormLogin: boolean;
    checked: boolean;
    showSuccessMessage: boolean;
    formValues: string[];
}
export default class SignUp extends React.Component<SignUpProps, SignUpState> {
    formRef: React.RefObject<FormInstance<any>>;
    constructor(props: SignUpProps);
    handleSignUpCloseClick: () => void;
    handleLoginForm: () => void;
    handleLoginClose: () => void;
    onCheckBoxChange: (e: any) => void;
    validation: (rule: any, value: any, callback: any) => any;
    handleSubmit: ({ fullName, birthdate, username, Email, password, confirmPass, numberPhone }: {
        fullName: any;
        birthdate: any;
        username: any;
        Email: any;
        password: any;
        confirmPass: any;
        numberPhone: any;
    }) => Promise<void>;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
