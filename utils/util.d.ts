import { RcFile } from "antd/es/upload";
export declare function utf8ToB64(str: any): string;
export declare function b64ToUtf8(str: any): string;
export declare function uint8arrayToB64(u8: any): string;
export declare function b64ToUint8array(b64: any): Uint8Array;
export declare function uint8arrayToString(buf: any): string;
export declare function stringToUint8array(str: any): Uint8Array;
export declare function generateKeyAndIV(): {
    key: Uint8Array;
    iv: Uint8Array;
};
export declare function convertB64ToImage(b64: any): string;
export declare const getBase64AndName: (img: RcFile, callback: (url: string, name: string) => void) => void;
export declare const authenticationAdmin: (callback?: any) => void;
export declare const authenticationCustomer: (callback?: any) => void;
export declare const dateToYYYY_MM_DD: (date: any) => string;
