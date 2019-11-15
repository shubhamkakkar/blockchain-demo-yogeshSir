"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../../models/user/user");
const jwt_1 = require("../helperUserFunctions/jwt");
const graphql_1 = require("graphql");
const globalHelperFunctions_1 = require("../../globalHelperFunctions");
function loginMutation({ email, password }) {
    return user_1.default.findOne({ email })
        .then(user => {
        if (user !== null) {
            // @ts-ignore
            const { privateKey, publicKey, ...restUserInformation } = user._doc;
            const encryptedPassword = globalHelperFunctions_1.stringEncryption({
                publickey: publicKey,
                privatekey: privateKey,
                message: password
            });
            return globalHelperFunctions_1.verification({
                privateKey,
                encrypted: encryptedPassword,
                publicKey
            }).then((passwordRes) => {
                console.log({ passwordRes });
                if (passwordRes) {
                    return {
                        token: jwt_1.jwtToken({ email }),
                        ...restUserInformation,
                        privateKey, publicKey
                    };
                }
                else {
                    return new graphql_1.GraphQLError("Passwords Didnot match");
                }
            });
        }
        else {
            return new graphql_1.GraphQLError("User not found");
        }
    })
        .catch(er => {
        return new graphql_1.GraphQLError("login failed", er);
    });
}
exports.default = loginMutation;
//# sourceMappingURL=login.js.map