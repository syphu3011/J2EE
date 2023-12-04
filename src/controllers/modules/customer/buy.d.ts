export declare function buy(id_customer: number, address: string, products: {
    masanpham: number;
    mamau: number;
    makichco: number;
    soluong: number;
}[]): Promise<import("axios").AxiosResponse<any, any> | {
    status: number;
    message: string;
    data: any;
}>;
