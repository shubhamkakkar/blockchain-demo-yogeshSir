"use strict";
exports.__esModule = true;
var jsonwebtoken_1 = require("jsonwebtoken");
// @ts-ignore
// import rsa from 'js-crypto-rsa';
var hybrid_crypto_js_1 = require("hybrid-crypto-js");
var rsa = new hybrid_crypto_js_1.RSA();
var secretKey = "blockhain-user-auth";
exports.jwtToken = function (email) { return jsonwebtoken_1.sign({ email: email }, secretKey); };
exports.JWTVerify = function (token) { return jsonwebtoken_1.verify(token, secretKey); };
exports.userProfileKeys = rsa.generateKeyPairAsync().then(function (_a) {
    var publicKey = _a.publicKey, privateKey = _a.privateKey;
    return ({
        publicKey: publicKey,
        privateKey: privateKey
    });
});
