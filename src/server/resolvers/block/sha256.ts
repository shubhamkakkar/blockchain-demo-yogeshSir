import {sha256} from 'js-sha256';
import {TextEncoder} from "util"
// @ts-ignore
import {RSA as rsarsa, Crypt} from "hybrid-crypto-js"

import {PrivateKey, PublicKey} from "../../../generated/graphql";

// @ts-ignore
export const blockHashGenerator = ({index, timestamp, data, prevHash, nounce}): string => sha256(
    index + timestamp + data + prevHash + nounce
);

export const Encodeuint8arr = (myString: string): Uint8Array => new TextEncoder().encode(myString);
export const Decodeuint8arr = (uint8array: Uint8Array) => new TextDecoder("utf-8").decode(uint8array);


// export const generateSignature = ({message: msg, privateKey: privateJwk}: { message: Uint8Array, privateKey: PrivateKey }): Promise<Uint8Array> => rsa.sign(
//     msg,
//     privateJwk,
//     'SHA-256',
// ).then((signature: any) => signature);
//
// export const validatingSignature = ({message: msg, publicKey: publicJwk, signature: sign}: { message: Uint8Array, publicKey: PublicKey, signature: any }): Promise<boolean> => rsa.verify(
//     msg,
//     sign,
//     publicJwk,
//     'SHA-256',
// );
//
// export const decryptSignatureToGetMessage = ({encrypted, privateJwk}: { encrypted: Uint8Array, privateJwk: string }): Promise<string | Uint8Array> => rsa.decrypt(
//     encrypted,
//     privateJwk,
//     'SHA-256'
// );


const crypt = new Crypt();

const signature = ({issuerPrivateKey, message}: { issuerPrivateKey, message }) => crypt.signature(issuerPrivateKey, message);
const encrypted = ({publicKey, message, signature}) => crypt.encrypt(publicKey, message, signature)
const decrypted = ({privateKey, encrypted}) => crypt.decrypt(privateKey, encrypted);
const verified = ({
                      issuerPublicKey,
                      signature,
                      message,
                  }: {
    issuerPublicKey: any,
    signature: any,
    message: any,
}): boolean => crypt.verify(
    issuerPublicKey,
    signature,
    message,
);
