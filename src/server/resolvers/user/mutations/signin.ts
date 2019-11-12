import UserSchema from "../../../models/user/user";
import {jwtToken, userProfileKeys} from "../jwt";
import {User} from "../../../../generated/graphql";
import {encryptBcrycpt} from "../bcryptHelperFns";
import {encrypted, signature} from "../../block/customHelperFunctions";


async function encryptedPrivateKey(privatekey: string, message = "message", publickey = "publickey") {
    const signatureOfUserPrivateKey = signature({
        message,
        privatekey
    });

    return await encrypted({publickey, message, signature: signatureOfUserPrivateKey});
}


export default function signinMutation({email, password}: User) {
    return UserSchema.findOne({email})
        .then(async (res: any) => {
            if (res === null) {
                // TODO:  remove bcryptjs
                const encryptedPassword = encryptBcrycpt({password});
                const {publicKey, privateKey} = await userProfileKeys;

                const user = new UserSchema({
                    email,
                    password: encryptedPassword,
                    publicKey,
                    privateKey: encryptedPrivateKey(privateKey)
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
