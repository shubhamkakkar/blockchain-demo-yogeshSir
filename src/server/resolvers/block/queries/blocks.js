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
function blocksQuery(_a) {
    var token = _a.token;
    // @ts-ignore
    var email = jwt_1.JWTVerify(token).email.email;
    return user_1["default"].findOne({ email: email })
        .then(function (user) {
        if (user) {
            return block_1["default"].find().then(function (blocks) {
                if (blocks.length) {
                    return blocks.map(function (block) {
                        var _a = block._doc, password = _a.password, restInformation = __rest(_a, ["password"])
                        // @ts-ignore
                        ;
                        // @ts-ignore
                        var creatorEmailObj = jwt_1.JWTVerify(restInformation.creatorEmail).email;
                        return __assign({ password: email === creatorEmailObj.email ? password : "encrypted Password, would be shown only to the owner" }, restInformation);
                    });
                }
                else {
                    console.log("no blocks found");
                    return [];
                }
            })["catch"](function (er) { return er; });
        }
        else {
            console.log("user not found");
        }
    })["catch"](function (er) { return console.log("err responding blocks - blocks query", er); });
}
exports["default"] = blocksQuery;
