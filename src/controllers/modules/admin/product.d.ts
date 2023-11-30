export declare function getAllProduct(): Promise<import("axios").AxiosResponse<any, any> | {
    status: number;
    message: string;
    data: any;
}>;
export declare function addProduct(name: string, description: string, cate: string[], unit: string, base64Image: string, nameImage: string): Promise<import("axios").AxiosResponse<any, any> | {
    status: number;
    message: string;
    data: any;
}>;
export declare function editProduct(id: number, name: string, description: string, cate: string[], unit: string, base64Image: string, nameImage: string): Promise<import("axios").AxiosResponse<any, any> | {
    status: number;
    message: string;
    data: any;
}>;
export declare function getAllCategory(): Promise<import("axios").AxiosResponse<any, any> | {
    status: number;
    message: string;
    data: any;
}>;
export declare function getAllUnit(): Promise<import("axios").AxiosResponse<any, any> | {
    status: number;
    message: string;
    data: any;
}>;
