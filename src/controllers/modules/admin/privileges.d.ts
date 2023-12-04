export declare function getPrivileges(): Promise<import("axios").AxiosResponse<any, any> | {
    status: number;
    message: string;
    data: any;
}>;
export declare function getFeatures(): Promise<import("axios").AxiosResponse<any, any> | {
    status: number;
    message: string;
    data: any;
}>;
export declare function addPrivileges(name: String, features: {
    ma: number;
}[]): Promise<import("axios").AxiosResponse<any, any> | {
    status: number;
    message: string;
    data: any;
}>;
export declare function editPrivileges(id: number, name: String, features: {
    ma: number;
}[]): Promise<import("axios").AxiosResponse<any, any> | {
    status: number;
    message: string;
    data: any;
}>;
export declare function removePrivileges(id: number): Promise<import("axios").AxiosResponse<any, any> | {
    status: number;
    message: string;
    data: any;
}>;
