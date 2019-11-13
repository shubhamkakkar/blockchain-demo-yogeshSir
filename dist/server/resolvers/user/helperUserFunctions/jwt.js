"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
// @ts-ignore
// import rsa from 'js-crypto-rsa';
const hybrid_crypto_js_1 = require("hybrid-crypto-js");
let rsa = new hybrid_crypto_js_1.RSA();
const secretKey = "blockhain-user-auth";
exports.jwtToken = (email) => jsonwebtoken_1.sign({ email }, secretKey);
exports.JWTVerify = (token) => jsonwebtoken_1.verify(token, secretKey);
exports.userProfileKeys = rsa.generateKeyPairAsync().then(({ publicKey, privateKey }) => ({
    publicKey,
    privateKey
}));
//# sourceMappingURL=jwt.js.map