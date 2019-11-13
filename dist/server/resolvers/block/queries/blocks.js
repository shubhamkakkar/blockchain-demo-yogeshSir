"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../../user/helperUserFunctions/jwt");
const user_1 = require("../../../models/user/user");
const block_1 = require("../../../models/blocks/block");
function blocksQuery({ token }) {
    // @ts-ignore
    const { email: { email } } = jwt_1.JWTVerify(token);
    return user_1.default.findOne({ email })
        .then(user => {
        if (user) {
            return block_1.default.find().then(blocks => {
                if (blocks.length) {
                    return blocks.map(block => {
                        const { password, ...restInformation
                        // @ts-ignore
                         } = block._doc;
                        // @ts-ignore
                        const { email: creatorEmailObj } = jwt_1.JWTVerify(restInformation.creatorEmail);
                        return {
                            password: email === creatorEmailObj.email ? password : "encrypted Password, would be shown only to the owner",
                            ...restInformation
                        };
                    });
                }
                else {
                    console.log("no blocks found");
                    return [];
                }
            }).catch(er => er);
        }
        else {
            console.log("user not found");
        }
    })
        .catch(er => console.log("err responding blocks - blocks query", er));
}
exports.default = blocksQuery;
//# sourceMappingURL=blocks.js.map