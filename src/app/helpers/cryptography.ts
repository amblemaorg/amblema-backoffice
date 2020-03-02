import * as CryptoJS from 'crypto-js';

export class Cryptography {

    private static instance: Cryptography;

    tokenFromUI = '0123456789123456';

    encryptedData: any;
    decryptedData: any;

    request: string;
    responce: string;

    public static getInstance(): Cryptography {
        if ( !Cryptography.instance ) {
            Cryptography.instance = new Cryptography();
        }

        return Cryptography.instance;
    }

    constructor() {
        this.encryptUsingAES256();
    }

    encryptUsingAES256() {
        const key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
        const iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);

        const encrypted = CryptoJS.AES.encrypt(
            JSON.stringify(this.request), key, {
            keySize: 16,
            iv,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        this.encryptedData = encrypted.toString();
    }

    decryptUsingAES256() {
        const key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
        const iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);

        this.decryptedData = CryptoJS.AES.decrypt(
            this.encryptedData, key, {
            keySize: 16,
            iv,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        }).toString(CryptoJS.enc.Utf8);
    }
}
