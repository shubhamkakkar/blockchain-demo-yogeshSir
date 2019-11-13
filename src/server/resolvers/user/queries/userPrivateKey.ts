import UserSchema from "../../../models/user/user";
import {JWTVerify} from "../jwt";


export default function userPrivateKeyQuery(token: string) {
    // @ts-ignore
    const {email: {email}} = JWTVerify(token);
    return UserSchema.findOne({email})
        .then(user => {
            if (user) {
                // @ts-ignore
                const {privateKey} = user._doc;
                console.log({privateKey})

            } else {
                console.log("user not found - user private key")
            }

        })
        .catch(er => console.log("user er found - user private key"))
}
