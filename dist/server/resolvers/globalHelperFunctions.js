"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const hybrid_crypto_js_1 = require("hybrid-crypto-js");
const crypt = new hybrid_crypto_js_1.Crypt();
const signature = ({ privatekey: issuerPrivateKey, message }) => crypt.signature(issuerPrivateKey, message);
const encrypted = ({ publickey: publicKey, message, signature }) => crypt.encrypt(publicKey, message, signature);
exports.decrypted = ({ privatekey: privateKey, encrypted }) => crypt.decrypt(privateKey, encrypted);
exports.verified = ({ publicKey: issuerPublicKey, signature, message, }) => crypt.verify(issuerPublicKey, signature, message);
function stringEncryption({ message, privatekey, publickey }) {
    const signatureOfUserMessage = signature({
        message,
        privatekey
    });
    return encrypted({ publickey, message, signature: signatureOfUserMessage });
}
exports.stringEncryption = stringEncryption;
async function verification({ publicKey: issuerPublicKey, encrypted, privateKey }) {
    const { message, signature } = crypt.decrypt(privateKey, encrypted);
    const verificationBool = exports.verified({
        publicKey: issuerPublicKey,
        signature,
        message,
    });
    if (verificationBool) {
        return message;
    }
    else {
        return false;
    }
}
exports.verification = verification;
//# sourceMappingURL=globalHelperFunctions.js.map