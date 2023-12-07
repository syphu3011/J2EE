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
    ma: number;
    ten: string;
    ngaysinh: any;
    sodienthoai: any;
    tentaikhoan: any;
    diachi: string;
    ngaythamgia: any;
};
export default class UpdateInformation extends React.Component<UserProp, UserState> {
    formRef: React.RefObject<FormInstance<any>>;
    constructor(props: any);
    componentDidUpdate(prevProps: UserProp): void;
    handlePreview: (file: any) => void;
    handleFileUpload: (filelist: any) => void;
    validateEmail: (rule: any, value: any, callback: any) => void;
    validatePhoneNumber: (rule: any, value: any, callback: any) => void;
    handleSubmitUpdateInform: ({ fullname, birthdate, phoneNumber, address }: {
        fullname: any;
        birthdate: any;
        phoneNumber: any;
        address: any;
    }) => Promise<void>;
    handleSubmitPassword: ({ oldPass, newPass, comfirmNewPass }: {
        oldPass: any;
        newPass: any;
        comfirmNewPass: any;
    }) => Promise<void>;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
