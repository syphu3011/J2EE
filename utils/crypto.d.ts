export declare function encrypt(data: any, aeskey: any): Promise<string>;
export declare function encrypt_all(data: any, aeskey: any): Promise<any>;
export declare function decrypt(data: any, aeskey: any): Promise<string>;
export declare function decrypt_all(data: any, aeskey: any): Promise<any>;
export declare function encryptrsa(data: any, pkey?: any): Promise<string | false>;
export declare function decryptrsa(data: any, pkey?: any): Promise<string | false>;
export declare function generateKeyRSA(): Promise<{
    public: any;
    private: any;
}>;
