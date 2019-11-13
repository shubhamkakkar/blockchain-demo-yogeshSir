"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../../models/user/user");
const jwt_1 = require("../helperUserFunctions/jwt");
const globalHelperFunctions_1 = require("../../globalHelperFunctions");
function signinMutation({ email, password }) {
    return user_1.default.findOne({ email })
        .then(async (res) => {
        if (res === null) {
            // TODO:  remove bcryptjs
            const { publicKey, privateKey } = await jwt_1.userProfileKeys;
            const encryptedPassword = globalHelperFunctions_1.stringEncryption({
                publickey: publicKey,
                privatekey: privateKey,
                message: password
            });
            const user = new user_1.default({
                email,
                password: encryptedPassword,
                publicKey,
                privateKey
            });
            return user.save()
                .then(res => {
                // @ts-ignore
                const { password, ...restUserInformation } = res._doc;
                return {
                    token: jwt_1.jwtToken({ email }),
                    ...restUserInformation
                };
            })
                .catch(res => res);
        }
        else {
            const { password, ...restUserInformation } = res._doc;
            return ({
                token: jwt_1.jwtToken({ email }),
                ...restUserInformation
            });
        }
    })
        .catch(er => console.log("error in finding", er));
}
exports.default = signinMutation;
//# sourceMappingURL=signin.js.map