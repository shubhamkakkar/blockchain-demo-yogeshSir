// @ts-ignore
import {Crypt} from "hybrid-crypto-js"

const crypt = new Crypt();

const signature = ({privatekey: issuerPrivateKey, message}: { privatekey: string, message: string }) => crypt.signature(issuerPrivateKey, message);
const encrypted = ({publickey: publicKey, message, signature}: { publickey: string, message: string, signature: string }) => crypt.encrypt(publicKey, message, signature);
export const decrypted = async ({privatekey: privateKey, encrypted}: { privatekey: string, encrypted: any }) => await crypt.decrypt(privateKey, encrypted)
export const verified = ({
                             publicKey: issuerPublicKey,
                             signature,
                             message,
                         }: {
    publicKey: string,
    signature: any,
    message: any,
}): boolean => crypt.verify(
    issuerPublicKey,
    signature,
    message,
);


export function stringEncryption({message, privatekey, publickey}: { message: string, privatekey: string, publickey: string }) {
    const signatureOfUserMessage = signature({
        message,
        privatekey
    });
    return encrypted({publickey, message, signature: signatureOfUserMessage})
}
