export declare function utf8ToB64(str: any): string;
export declare function b64ToUtf8(str: any): string;
export declare function uint8arrayToB64(u8: any): string;
export declare function b64ToUint8array(b64: any): Uint8Array;
export declare function uint8arrayToString(buf: any): any;
export declare function stringToUint8array(str: any): Uint8Array;
export declare function generateKeyAndIV(): {
    key: Uint8Array;
    iv: Uint8Array;
};
