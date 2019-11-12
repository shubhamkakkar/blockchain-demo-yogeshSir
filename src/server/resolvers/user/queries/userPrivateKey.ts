import UserSchema from "../../../models/user/user";
import {JWTVerify} from "../jwt";
import {decrypted, verified} from "../../block/customHelperFunctions";


export default function userPrivateKeyQuery(token: string) {

    // @ts-ignore
    const {email: {email}} = JWTVerify(token);
    return UserSchema.findOne({email})
        .then(user => {
            if (user) {
                // @ts-ignore
                const {privateKey} = user._doc;
                return decrypted({privatekey: privateKey, encrypted: privateKey})
                    .then(({message}: { message: string }) => message)
                    .catch(er => console.log("failed in dcryption of privateKey in user"))
            } else {
                console.log("user not found - user private key")
            }

        })
        .catch(er => console.log("user er found - user private key"))
}
