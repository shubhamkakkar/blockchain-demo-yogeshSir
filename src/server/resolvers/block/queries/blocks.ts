import {JWTVerify} from "../../user/helperUserFunctions/jwt";
import UserSchema from "../../../models/user/user";
import BlockSchema from "../../../models/blocks/block";
import {QueryBlocksArgs} from "../../../../generated/graphql";

export default function blocksQuery({token}: QueryBlocksArgs) {
    // @ts-ignore
    const {email: {email}} = JWTVerify(token);
    return UserSchema.findOne({email})
        .then(user => {
            if (user) {
                return BlockSchema.find().then(blocks => {
                    if (blocks.length) {
                        return blocks.map(block => {
                            const {
                                password,
                                ...restInformation
                                // @ts-ignore
                            } = block._doc;
                            // @ts-ignore
                            const {email: creatorEmailObj} = JWTVerify(restInformation.creatorEmail);

                            return {
                                password: email === creatorEmailObj.email ? password : "encrypted Password, would be shown only to the owner",
                                ...restInformation
                            }
                        })
                    } else {
                        console.log("no blocks found");
                        return []
                    }
                }).catch(er => er)
            } else {
                console.log("user not found")
            }
        })
        .catch(er => console.log("err responding blocks - blocks query", er));
}
