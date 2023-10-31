export declare function encrypt(data: any, aeskey: any): Promise<string>;
export declare function encrypt_all(data: any, aeskey: any): Promise<any>;
export declare function decrypt(data: any, aeskey: any): Promise<any>;
export declare function decrypt_all(data: any, aeskey: any): Promise<any>;
export declare function encryptrsa(data: any): Promise<string | false>;
export declare function decryptrsa(data: any): Promise<string | false>;
