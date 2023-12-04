export declare function buy(id_customer: number, address: string, phone_number: string, email: string, products: {
    masanpham: number;
    mamau: number;
    makichco: number;
    soluong: number;
}[]): Promise<import("axios").AxiosResponse<any, any> | {
    status: number;
    message: string;
    data: any;
}>;
export declare function cancelOrder(id: number): Promise<import("axios").AxiosResponse<any, any> | {
    status: number;
    message: string;
    data: any;
}>;
