import {User} from "../../../../generated/graphql";
import UserSchema from "../../../models/user/user";
import {stringEncryption, verification} from "../../globalHelperFunctions";
import {jwtToken} from "../helperUserFunctions/jwt";
import {GraphQLError} from "graphql";

// @ts-ignore
export default function privateKeyDecryption({publicKey, privateKey}) {
    
            
                return verification({
                    privateKey: privateKey,
                    encrypted: privateKey,
                    publicKey: publicKey
                }).then((passwordRes: boolean) => {
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
         }
