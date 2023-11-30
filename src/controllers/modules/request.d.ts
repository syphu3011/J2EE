export declare function request(rq: any, variables?: {}): Promise<import("axios").AxiosResponse<any, any> | {
    status: number;
    message: string;
    data: any;
}>;
export declare function requestTo(path: any, data?: any): Promise<any>;
