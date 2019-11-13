import {JWTVerify} from "../../user/helperUserFunctions/jwt";
import UserSchema from "../../../models/user/user";
import BlockSchema from "../../../models/blocks/block";
import {verification} from "../../globalHelperFunctions";
import {QueryBlockArgs} from "../../../../generated/graphql";

// @ts-ignore
export default function blockQuery({token, id: _id, password}: QueryBlockArgs) {
    // @ts-ignore
    const {email: {email}} = JWTVerify(token);
    return UserSchema.findOne({email})
        .then(user => {
            if (user) {
                return BlockSchema.findOne({_id})
                    .then((block) => {
                        if (block) {
                            const {
                                data,
                                password: originalPassword,
                                ...restBlockInformation
                                // @ts-ignore
                            } = block._doc;
                            // @ts-ignore
                            const {email: {email}} = JWTVerify(token);
                            return UserSchema.findOne({email})
                                .then(user => {
                                    const {
                                        publicKey, privateKey
                                        // @ts-ignore
                                    } = user._doc;
                                    return verification({publicKey, privateKey, encrypted: data}).then(dataRes => {
                                        if (dataRes && password === originalPassword) {
                                            return {
                                                data: dataRes,
                                                password,
                                                ...restBlockInformation
                                            }
                                        } else {
                                            return {
                                                // @ts-ignore
                                                ...block._doc,
                                                password: "encrypted password, only shown to the owner"
                                            }
                                        }
                                    })
                                })
                        } else {
                            console.log("block not found");
                            return {}
                        }
                    }).catch(er => er)
            } else {
                console.log("user not found")
            }
        })
        .catch(er => console.log("err responding blocks - blocks query", er));
}
