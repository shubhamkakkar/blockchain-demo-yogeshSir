import {JWTVerify} from "../../user/helperUserFunctions/jwt";
import UserSchema from "../../../models/user/user";
import BlockSchema from "../../../models/blocks/block";
import {QueryBlocksArgs} from "../../../../generated/graphql";

export default function blocksQuery({token}: QueryBlocksArgs) {
    // TODO: if the  token of the user matches with the token of the creator show the real password
    // @ts-ignore
    const {email: {email}} = JWTVerify(token);
    return UserSchema.findOne({email})
        .then(user => {
            if (user) {
                return BlockSchema.find().then(blocks => {
                    if (blocks.length) {
                        return blocks.map(block => {
                            const {
                                // @ts-ignore
                                password, ...restInformation
                            } = block;
                            return {
                                password: "encrypted Password, would be shown only to the owner",
                                // @ts-ignore
                                ...restInformation._doc
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
