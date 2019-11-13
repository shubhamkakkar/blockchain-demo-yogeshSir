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
var jwt_1 = require("../../user/helperUserFunctions/jwt");
var user_1 = require("../../../models/user/user");
var block_1 = require("../../../models/blocks/block");
var globalHelperFunctions_1 = require("../../globalHelperFunctions");
// @ts-ignore
function blockQuery(_a) {
    var token = _a.token, _id = _a.id, password = _a.password;
    // @ts-ignore
    var email = jwt_1.JWTVerify(token).email.email;
    return user_1["default"].findOne({ email: email })
        .then(function (user) {
        if (user) {
            return block_1["default"].findOne({ _id: _id })
                .then(function (block) {
                if (block) {
                    var _a = block._doc, data_1 = _a.data, originalPassword_1 = _a.password, restBlockInformation_1 = __rest(_a, ["data", "password"])
                    // @ts-ignore
                    ;
                    // @ts-ignore
                    var email_1 = jwt_1.JWTVerify(token).email.email;
                    return user_1["default"].findOne({ email: email_1 })
                        .then(function (user) {
                        var _a = user._doc, publicKey = _a.publicKey, privateKey = _a.privateKey
                        // @ts-ignore
                        ;
                        return globalHelperFunctions_1.verification({ publicKey: publicKey, privateKey: privateKey, encrypted: data_1 }).then(function (dataRes) {
                            if (dataRes && password === originalPassword_1) {
                                return __assign({ data: dataRes, password: password }, restBlockInformation_1);
                            }
                            else {
                                return __assign(__assign({}, block._doc), { password: "encrypted password, only shown to the owner" });
                            }
                        });
                    });
                }
                else {
                    console.log("block not found");
                    return {};
                }
            })["catch"](function (er) { return er; });
        }
        else {
            console.log("user not found");
        }
    })["catch"](function (er) { return console.log("err responding blocks - blocks query", er); });
}
exports["default"] = blockQuery;
