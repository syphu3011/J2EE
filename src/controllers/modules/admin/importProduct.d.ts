export declare function importProduct(id_provider: number, id_staff: number, arr_prod: {
    masanpham: number;
    mamau: number;
    makichco: number;
    soluong: number;
    gianhap: number;
    giaban: number;
}[], note: String): Promise<import("axios").AxiosResponse<any, any> | {
    status: number;
    message: string;
    data: any;
}>;
export declare function importProductHistory(): Promise<import("axios").AxiosResponse<any, any> | {
    status: number;
    message: string;
    data: any;
}>;
export declare function removeImportProduct(id: number): Promise<import("axios").AxiosResponse<any, any> | {
    status: number;
    message: string;
    data: any;
}>;
export declare function getProviderProductColorSize(): Promise<import("axios").AxiosResponse<any, any> | {
    status: number;
    message: string;
    data: any;
}>;
