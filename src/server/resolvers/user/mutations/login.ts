import UserSchema from "../../../models/user/user";
import {sha256} from "js-sha256";
import {jwtToken} from "../jwt";
import {GraphQLError} from "graphql";
import {User} from "../../../../generated/graphql";

export default function loginMutation({email, password}: User) {
    return UserSchema.findOne({email})
        .then(user => {
            if (user !== null) {
                const encryptedPassword = sha256(password);
                // @ts-ignore
                const {password: userPassword, ...restUserInformation} = res._doc;
                if (userPassword === encryptedPassword) {
                    return ({
                        token: jwtToken({email}),
                        ...restUserInformation
                    })
                } else {
                    return new GraphQLError("Passwords Didnot match")
                }
            } else {
                console.log("user not found")
            }
        })
        .catch(er => {
            console.log("error login in", er)
        })
}
