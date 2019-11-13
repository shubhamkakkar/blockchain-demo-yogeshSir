import UserSchema from "../../../models/user/user";
import {jwtToken, userProfileKeys} from "../helperUserFunctions/jwt";
import {User} from "../../../../generated/graphql";
import {stringEncryption} from "../../globalHelperFunctions";


export default function signinMutation({email, password}: User) {
    return UserSchema.findOne({email})
        .then(async (res: any) => {
            if (res === null) {
                // TODO:  remove bcryptjs
                const {publicKey, privateKey} = await userProfileKeys;

                const encryptedPassword = stringEncryption({
                    publickey: publicKey,
                    privatekey: privateKey,
                    message: password
                });


                const user = new UserSchema({
                    email,
                    password: encryptedPassword,
                    publicKey,
                    privateKey
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
