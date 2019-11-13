"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var user_1 = require("../../../models/user/user");
var jwt_1 = require("../helperUserFunctions/jwt");
function usersQuery() {
    return user_1["default"].find().then(function (allUsers) {
        if (allUsers.length) {
            var returnObj_1 = [];
            //@ts-ignore
            allUsers.forEach(function (_a) {
                var email = _a.email, _id = _a._id, publicKey = _a.publicKey, privateKey = _a.privateKey;
                return returnObj_1 = __spreadArrays(returnObj_1, [{
                        publicKey: publicKey,
                        privateKey: privateKey,
                        email: email,
                        _id: _id,
                        token: jwt_1.jwtToken({ email: email })
                    }]);
            });
            return returnObj_1;
        }
        return [];
    })["catch"](function (er) { return er; });
}
exports["default"] = usersQuery;
