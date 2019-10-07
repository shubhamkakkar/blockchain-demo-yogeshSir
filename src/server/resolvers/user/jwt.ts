import {sign, verify, decode} from "jsonwebtoken"
// @ts-ignore
import rsa from 'js-crypto-rsa';


const secretKey: string = "blockhain-user-auth";

export const jwtToken = (email: { email: any }): string => sign({email}, secretKey);
export const JWTVerify = (token: string): string | object => verify(token, secretKey);

export const userProfileKeys = rsa.generateKey(2048).then(({publicKey, privateKey}: { publicKey: string; privateKey: string }) => ({
    publicKey,
    privateKey
}));



