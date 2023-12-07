import React from 'react';
import { FormInstance } from 'antd';
interface UserState {
    filelist: string;
    userProfiles: any[];
}
interface UserProp {
    userProfiles: UserProfile;
}
type UserProfile = {
    ten: string;
    ngaySinh: number;
};
export default class UpdateInformation extends React.Component<UserProp, UserState> {
    formRef: React.RefObject<FormInstance<any>>;
    constructor(props: any);
    componentDidUpdate(prevProps: UserProp): void;
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
