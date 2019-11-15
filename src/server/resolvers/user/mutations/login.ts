import UserSchema from "../../../models/user/user";
import { jwtToken } from "../helperUserFunctions/jwt";
import { GraphQLError } from "graphql";
import { User } from "../../../../generated/graphql";
import { stringEncryption, verification } from "../../globalHelperFunctions";

export default function loginMutation({ email, password }: User) {
    return UserSchema.findOne({ email })
        .then(user => {
            if (user !== null) {
                // @ts-ignore
                const { privateKey, publicKey, ...restUserInformation } = user._doc;

                const encryptedPassword = stringEncryption({
                    publickey: publicKey,
                    privatekey: privateKey,
                    message: password
                });
                return verification({
                    privateKey,
                    encrypted: encryptedPassword,
                    publicKey
                }).then((passwordRes: boolean) => {
                    console.log({ passwordRes })
                    if (passwordRes) {
                        return {
                            token: jwtToken({ email }),
                            ...restUserInformation,
                            privateKey, publicKey
                        }
                    } else {
                        return new GraphQLError("Passwords Didnot match")
                    }
                });
            } else {
                return new GraphQLError("User not found")
            }
        })
        .catch(er => {
            return new GraphQLError("login failed", er)
        })
}
