import UserSchema from "../../../models/user/user";
import { jwtToken } from "../helperUserFunctions/jwt";
import { GraphQLError } from "graphql";
import { User } from "../../../../generated/graphql";
import { stringEncryption, verification } from "../../globalHelperFunctions";

export default function loginMutation({ email, password }: User) {
    return UserSchema.findOne({ email })
        .then((user: any) => {
            if (user !== null) {
                // @ts-ignore
                const { privateKey, publicKey, password: ePassword, ...restUserInformation } = user._doc;

                console.log({ restUserInformation })

                // const encryptedPassword = stringEncryption({
                //     publickey: publicKey,
                //     privatekey: privateKey,
                //     message: password
                // });

                return verification({
                    privateKey,
                    encrypted: ePassword,
                    publicKey
                }).then((passwordRes: string) => {
                    console.log({ passwordRes })
                    if (passwordRes === password) {
                        console.log("pasword maathc")
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
