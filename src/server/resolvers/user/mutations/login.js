"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var user_1 = require("../../../models/user/user");
var jwt_1 = require("../helperUserFunctions/jwt");
var graphql_1 = require("graphql");
var globalHelperFunctions_1 = require("../../globalHelperFunctions");
function loginMutation(_a) {
    var email = _a.email, password = _a.password;
    return user_1["default"].findOne({ email: email })
        .then(function (user) {
        if (user !== null) {
            // @ts-ignore
            var _a = user._doc, privateKey_1 = _a.privateKey, publicKey_1 = _a.publicKey, restUserInformation_1 = __rest(_a, ["privateKey", "publicKey"]);
            var encryptedPassword = globalHelperFunctions_1.stringEncryption({
                publickey: publicKey_1,
                privatekey: privateKey_1,
                message: password
            });
            return globalHelperFunctions_1.verification({
                privateKey: privateKey_1,
                encrypted: encryptedPassword,
                publicKey: publicKey_1
            }).then(function (passwordRes) {
                if (passwordRes) {
                    return __assign(__assign({ token: jwt_1.jwtToken({ email: email }) }, restUserInformation_1), { privateKey: privateKey_1, publicKey: publicKey_1 });
                }
                else {
                    return new graphql_1.GraphQLError("Passwords Didnot match");
                }
            });
        }
        else {
            console.log("user not found");
        }
    })["catch"](function (er) {
        console.log("error login in", er);
    });
}
exports["default"] = loginMutation;
