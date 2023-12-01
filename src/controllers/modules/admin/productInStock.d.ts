export declare function getProductInStock(): Promise<import("axios").AxiosResponse<any, any> | {
    status: number;
    message: string;
    data: any;
}>;
export declare function editProductInStock(id_prod: number, id_import: number, id_color: number, id_size: number, price: number): Promise<import("axios").AxiosResponse<any, any> | {
    status: number;
    message: string;
    data: any;
}>;
