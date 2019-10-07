import {sign, verify, decode} from "jsonwebtoken"
// @ts-ignore
import rsa from 'js-crypto-rsa';


const secretKey: string = "blockhain-user-auth";

export const jwtToken = (email: { email: any }): string => sign({email}, secretKey);
export const JWTVerify = (token: string): string | object => verify(token, secretKey);
export const JWTDecode = (token: string) => decode(token);

export const userProfileKeys = rsa.generateKey(2048).then(({publicKey, privateKey}: { publicKey: string; privateKey: string }) => ({
    publicKey,
    privateKey
}));

// TODO:  privateJWK is not string
// TODO: publicJWK is not string

export const generateSignature = ({message: msg, privateKey: privateJwk}: { message: Uint8Array, privateKey: string }) => rsa.sign(
    msg,
    privateJwk,
    'SHA-256',
).then((signature: any) => signature);

export const validatingSignature = ({message: msg, publicKey: publicJwk, signature: sign}: { message: Uint8Array, publicKey: string, signature: any }) => rsa.verify(
    msg,
    sign,
    publicJwk,
    'SHA-256',
);


export function stringToArrayBuffer(byteString: string): Uint8Array {
    let byteArray: Uint8Array = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        // @ts-ignore
        byteArray[i] = byteString.codePointAt(i);
    }
    return byteArray;
}

export function arrayBufferToString(buffer: Uint8Array): string {
    let byteArray = new Uint8Array(buffer);
    let byteString = '';
    for (let i = 0; i < byteArray.byteLength; i++) {
        byteString += String.fromCodePoint(byteArray[i]);
    }
    return byteString;
}


