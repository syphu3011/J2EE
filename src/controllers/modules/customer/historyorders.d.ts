export declare function getHistoryOrders(): Promise<import("axios").AxiosResponse<any, any> | {
    status: number;
    message: string;
    data: any;
}>;
