"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
// @ts-ignore
var hybrid_crypto_js_1 = require("hybrid-crypto-js");
var crypt = new hybrid_crypto_js_1.Crypt();
var signature = function (_a) {
    var issuerPrivateKey = _a.privatekey, message = _a.message;
    return crypt.signature(issuerPrivateKey, message);
};
var encrypted = function (_a) {
    var publicKey = _a.publickey, message = _a.message, signature = _a.signature;
    return crypt.encrypt(publicKey, message, signature);
};
exports.decrypted = function (_a) {
    var privateKey = _a.privatekey, encrypted = _a.encrypted;
    return crypt.decrypt(privateKey, encrypted);
};
exports.verified = function (_a) {
    var issuerPublicKey = _a.publicKey, signature = _a.signature, message = _a.message;
    return crypt.verify(issuerPublicKey, signature, message);
};
function stringEncryption(_a) {
    var message = _a.message, privatekey = _a.privatekey, publickey = _a.publickey;
    var signatureOfUserMessage = signature({
        message: message,
        privatekey: privatekey
    });
    return encrypted({ publickey: publickey, message: message, signature: signatureOfUserMessage });
}
exports.stringEncryption = stringEncryption;
function verification(_a) {
    var issuerPublicKey = _a.publicKey, encrypted = _a.encrypted, privateKey = _a.privateKey;
    return __awaiter(this, void 0, void 0, function () {
        var _b, message, signature, verificationBool;
        return __generator(this, function (_c) {
            _b = crypt.decrypt(privateKey, encrypted), message = _b.message, signature = _b.signature;
            verificationBool = exports.verified({
                publicKey: issuerPublicKey,
                signature: signature,
                message: message
            });
            if (verificationBool) {
                return [2 /*return*/, message];
            }
            else {
                return [2 /*return*/, false];
            }
            return [2 /*return*/];
        });
    });
}
exports.verification = verification;
