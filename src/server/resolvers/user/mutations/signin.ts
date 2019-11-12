import UserSchema from "../../../models/user/user";
import {sha256} from "js-sha256";
import {jwtToken, userProfileKeys} from "../jwt";
import {User} from "../../../../generated/graphql";

export default function signinMutation({email, password}: User) {
    return UserSchema.findOne({email})
        .then(async (res: any) => {
            if (res === null) {
                const encryptedPassword = sha256(password);
                const {publicKey, privateKey} = await userProfileKeys;
                const encryptedPrivateKey = sha256(password=privateKey);
                const user = new UserSchema({
                    email,
                    password: encryptedPassword,
                    publicKey,
                    privateKey: encryptedPrivateKey
                });
                return user.save()
                    .then(res => {
                        // @ts-ignore
                        const {password, ...restUserInformation} = res._doc;
                        return {
                            token: jwtToken({email}),
                            ...restUserInformation
                        }
                    })
                    .catch(res => res)
            } else {
                const {password, ...restUserInformation} = res._doc;
                return ({
                    token: jwtToken({email}),
                    ...restUserInformation
                })
            }
        })
        .catch(er => console.log("error in finding", er))
}
