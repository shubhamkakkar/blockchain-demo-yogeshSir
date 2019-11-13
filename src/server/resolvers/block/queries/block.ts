import {JWTVerify} from "../../user/helperUserFunctions/jwt";
import UserSchema from "../../../models/user/user";
import BlockSchema from "../../../models/blocks/block";
import {decrypted, verified} from "../../globalHelperFunctions";
import {QueryBlockArgs} from "../../../../generated/graphql";

// @ts-ignore
export default function blockQuery({token, id: _id, privateKey: privatekey}: QueryBlockArgs) {
    // @ts-ignore
    const {email: {email}} = JWTVerify(token);
    return UserSchema.findOne({email})
        .then(user => {
            if (user) {
                return BlockSchema.findOne({_id}).then((block) => {
                    // @ts-ignore
                    if (Object.entries(block).length) {
                        // @ts-ignore
                        const {data} = block;
                        return decrypted({privatekey, encrypted: data})
                        // @ts-ignore
                            .then(({message, signature}) => {
                                // @ts-ignore
                                const {publicKey: publicKey} = user;
                                const verificationRes: boolean = verified({publicKey, message, signature})
                                if (verificationRes) {
                                    return {
                                        //@ts-ignore
                                        ...block._doc,
                                        data: message
                                    }
                                } else {
                                    // else and error will both have the response of data where the user message will still be encrypted
                                    return {
                                        //@ts-ignore
                                        ...block._doc,
                                    }
                                }
                            })
                            .catch((er: any) => ({
                                //@ts-ignore
                                ...block._doc,
                            }));
                    }
                }).catch(er => er)
            } else {
                console.log("user not found")
            }
        })
        .catch(er => console.log("err responding blocks - blocks query", er));
}
