import UserSchema from "../../../models/user/user";
import { GraphQLError } from "graphql";
import { User } from "../../../../generated/graphql";
import loginHandler from "./loginHandler";

export default function loginMutation({ email, password }: User) {
    return UserSchema.findOne({ email })
        .then((user: any) => {
            if (user !== null) {
                // @ts-ignore
                const { privateKey, publicKey, password: encryptedPassword, ...restUserInformation } = user._doc;
                return loginHandler({ privateKey, publicKey, email, encryptedPassword, enteredPassword: password, restUserInformation, errorMessage: "Password didnot match" })
            } else {
                return new GraphQLError("User not found")
            }
        })
        .catch(er => {
            return new GraphQLError("login failed", er)
        })
}
