import UserSchema from "../../../models/user/user";
import {sha256} from "js-sha256";
import {jwtToken} from "../jwt";
import {GraphQLError} from "graphql";
import {User} from "../../../../generated/graphql";
import {compareBcrycpt} from "../bcryptHelperFns";
import {decrypted, stringEncryption, verification} from "../../helperFunction";

export default function loginMutation({email, password}: User) {
    return UserSchema.findOne({email})
        .then(user => {
            if (user !== null) {
                // @ts-ignore
                const {privateKey, publicKey, ...restUserInformation} = user._doc;

                const encryptedPassword = stringEncryption({
                    publickey: publicKey,
                    privatekey: privateKey,
                    message: password
                });
                return verification({
                    privateKey: privateKey,
                    encrypted: encryptedPassword,
                    publicKey: publicKey
                }).then(passwordRes => {
                    if (passwordRes) {
                        return ({
                            token: jwtToken({email}),
                            ...restUserInformation,
                            privateKey, publicKey
                        })
                    } else {
                        return new GraphQLError("Passwords Didnot match")
                    }
                });
            } else {
                console.log("user not found")
            }
        })
        .catch(er => {
            console.log("error login in", er)
        })
}
