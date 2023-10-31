import React from 'react';
import { FormInstance } from 'antd';
interface UserState {
    filelist: string;
    userProfiles: string[];
}
export default class UpdateInformation extends React.Component<{}, UserState> {
    formRef: React.RefObject<FormInstance<any>>;
    constructor(props: any);
    handlePreview: (file: any) => void;
    handleFileUpload: (filelist: any) => void;
    validateEmail: (rule: any, value: any, callback: any) => void;
    validatePhoneNumber: (rule: any, value: any, callback: any) => void;
    handleSubmitUpdateInform: ({ username, fullname, gender, birthdate, phoneNumber, Email, address, createDate }: {
        username: any;
        fullname: any;
        gender: any;
        birthdate: any;
        phoneNumber: any;
        Email: any;
        address: any;
        createDate: any;
    }) => void;
    handleSubmitPassword: (values: any) => void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
