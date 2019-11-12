import {JWTVerify} from "../../user/jwt";
import UserSchema from "../../../models/user/user";
import BlockSchema from "../../../models/blocks/block";
import {QueryBlocksArgs} from "../../../../generated/graphql";

export default function blocksQuery({token}: QueryBlocksArgs) {

    // @ts-ignore
    const {email: {email}} = JWTVerify(token);
    return UserSchema.findOne({email})
        .then(user => {
            if (user) {
                return BlockSchema.find().then(res => res).catch(er => er)
            } else {
                console.log("user not found")
            }
        })
        .catch(er => console.log("err responding blocks - blocks query", er));
}
