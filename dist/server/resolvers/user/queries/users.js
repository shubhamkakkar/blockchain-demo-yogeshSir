"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../../models/user/user");
const jwt_1 = require("../helperUserFunctions/jwt");
function usersQuery() {
    return user_1.default.find().then(allUsers => {
        if (allUsers.length) {
            let returnObj = [];
            //@ts-ignore
            allUsers.forEach(({ email, _id, publicKey, privateKey }) => returnObj = [...returnObj, {
                    publicKey,
                    privateKey,
                    email,
                    _id,
                    token: jwt_1.jwtToken({ email })
                }]);
            return returnObj;
        }
        return [];
    }).catch(er => er);
}
exports.default = usersQuery;
//# sourceMappingURL=users.js.map