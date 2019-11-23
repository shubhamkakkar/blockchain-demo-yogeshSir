// @ts-ignore
import { Crypt } from "hybrid-crypto-js"

const crypt = new Crypt();

const signature = ({ privatekey: issuerPrivateKey, message }: { privatekey: string, message: string }) => crypt.signature(issuerPrivateKey, message);
const encrypted = ({ publickey: publicKey, message, signature }: { publickey: string, message: string, signature: string }) => crypt.encrypt(publicKey, message, signature);
export const decrypted = ({ privatekey: privateKey, encrypted }: { privatekey: string, encrypted: string }) => crypt.decrypt(privateKey, encrypted)
export const verified = ({
    publicKey: issuerPublicKey,
    signature,
    message,
}: {
    publicKey: string,
    signature: string,
    message: string,
}) => crypt.verify(
    issuerPublicKey,
    signature,
    message,
);


export function stringEncryption({ message, privatekey, publickey }: { message: string, privatekey: string, publickey: string }) {
    const signatureOfUserMessage = signature({
        message,
        privatekey
    });
    return encrypted({ publickey, message, signature: signatureOfUserMessage })
}


export async function verification({
    publicKey: issuerPublicKey,
    encrypted,
    privateKey
}: {
    publicKey: string,
    privateKey: string,
    encrypted: string
}) {
    const { message, signature } = crypt.decrypt(privateKey, encrypted);
    const verificationBool = verified({
        publicKey: issuerPublicKey,
        signature,
        message,
    });

    console.log("verification", verificationBool)

    if (verificationBool) {
        return message
    } else {
        return "false"
    }
}
