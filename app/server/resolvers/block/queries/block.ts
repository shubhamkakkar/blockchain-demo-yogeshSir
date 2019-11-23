import { JWTVerify } from "../../user/helperUserFunctions/jwt";
import UserSchema from "../../../models/user/user";
import BlockSchema from "../../../models/blocks/block";
import { verification } from "../../globalHelperFunctions";
import { QueryBlockArgs } from "../../../../generated/graphql";

// @ts-ignore
export default function blockQuery({ token, id: _id, password }: QueryBlockArgs) {
    // @ts-ignore
    const { email: { email } } = JWTVerify(token);
    return UserSchema.findOne({ email })
        .then((user: any) => {
            if (user) {
                return BlockSchema.findOne({ _id })
                    .then((block) => {
                        if (block) {
                            const {
                                data,
                                password: originalPassword,
                                ...restBlockInformation
                                // @ts-ignore
                            } = block._doc;
                            // @ts-ignore
                            const { email: { email } } = JWTVerify(token);
                            return UserSchema.findOne({ email })
                                .then(user => {
                                    const {
                                        publicKey, privateKey
                                        // @ts-ignore
                                    } = user._doc;


                                    return verification({ publicKey, privateKey, encrypted: data })
                                        .then(dataRes => {
                                            console.log({ password, originalPassword })

                                            if (dataRes && password === originalPassword) {
                                                return {
                                                    data: dataRes,
                                                    password,
                                                    ...restBlockInformation
                                                }
                                            } else {
                                                // @ts-ignore
                                                console.log({ d: { ...block._doc } })
                                                return {
                                                    // @ts-ignore
                                                    ...block._doc,
                                                    password: "encrypted password, only shown to the owner"
                                                }
                                            }
                                        }).catch(er => {
                                            return {
                                                // @ts-ignore
                                                ...block._doc,
                                                password: "encrypted password, only shown to the owner"
                                            }
                                        })

                                    // process.then(res => console.log({ res })).catch(res => console.log({ res }))

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
