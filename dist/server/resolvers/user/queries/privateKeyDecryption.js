"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalHelperFunctions_1 = require("../../globalHelperFunctions");
const jwt_1 = require("../helperUserFunctions/jwt");
const graphql_1 = require("graphql");
// @ts-ignore
function privateKeyDecryption({ publicKey, privateKey }) {
    return globalHelperFunctions_1.verification({
        privateKey: privateKey,
        encrypted: privateKey,
        publicKey: publicKey
    }).then((passwordRes) => {
        if (passwordRes) {
            return ({
                token: jwt_1.jwtToken({ email }),
                ...restUserInformation,
                privateKey, publicKey
            });
        }
        else {
            return new graphql_1.GraphQLError("Passwords Didnot match");
        }
    });
}
exports.default = privateKeyDecryption;
//# sourceMappingURL=privateKeyDecryption.js.map