"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../../user/helperUserFunctions/jwt");
const user_1 = require("../../../models/user/user");
const block_1 = require("../../../models/blocks/block");
const globalHelperFunctions_1 = require("../../globalHelperFunctions");
// @ts-ignore
function blockQuery({ token, id: _id, password }) {
    // @ts-ignore
    const { email: { email } } = jwt_1.JWTVerify(token);
    return user_1.default.findOne({ email })
        .then(user => {
        if (user) {
            return block_1.default.findOne({ _id })
                .then((block) => {
                if (block) {
                    const { data, password: originalPassword, ...restBlockInformation
                    // @ts-ignore
                     } = block._doc;
                    // @ts-ignore
                    const { email: { email } } = jwt_1.JWTVerify(token);
                    return user_1.default.findOne({ email })
                        .then(user => {
                        const { publicKey, privateKey
                        // @ts-ignore
                         } = user._doc;
                        return globalHelperFunctions_1.verification({ publicKey, privateKey, encrypted: data }).then(dataRes => {
                            if (dataRes && password === originalPassword) {
                                return {
                                    data: dataRes,
                                    password,
                                    ...restBlockInformation
                                };
                            }
                            else {
                                return {
                                    // @ts-ignore
                                    ...block._doc,
                                    password: "encrypted password, only shown to the owner"
                                };
                            }
                        });
                    });
                }
                else {
                    console.log("block not found");
                    return {};
                }
            }).catch(er => er);
        }
        else {
            console.log("user not found");
        }
    })
        .catch(er => console.log("err responding blocks - blocks query", er));
}
exports.default = blockQuery;
//# sourceMappingURL=block.js.map