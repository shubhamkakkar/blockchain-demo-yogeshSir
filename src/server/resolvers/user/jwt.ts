import {sign, verify, decode} from "jsonwebtoken"
// @ts-ignore
// import rsa from 'js-crypto-rsa';
import {RSA} from "hybrid-crypto-js"

let rsa = new RSA();

const secretKey: string = "blockhain-user-auth";

export const jwtToken = (email: { email: any }): string => sign({email}, secretKey);
export const JWTVerify = (token: string) => verify(token, secretKey);

type keys = { publicKey: string; privateKey: string }

export const userProfileKeys: keys = rsa.generateKeyPairAsync().then(({publicKey, privateKey}: keys) => ({
    publicKey,
    privateKey
}));



