import { verification } from "../../globalHelperFunctions";
import { jwtToken } from "../helperUserFunctions/jwt";
import { GraphQLError } from "graphql";
export type TLoginHandler = {
    privateKey: string,
    encryptedPassword: string,
    publicKey: string,
    enteredPassword: string,
    email: string,
    restUserInformation: any,
    errorMessage: string
}


export default function loginHandler({ privateKey, encryptedPassword, publicKey, enteredPassword, email, restUserInformation, errorMessage }: TLoginHandler) {
    return verification({
        privateKey,
        encrypted: encryptedPassword,
        publicKey
    }).then((passwordRes: string) => {
        console.log({ passwordRes })
        if (passwordRes === enteredPassword) {
            return {
                token: jwtToken({ email }),
                ...restUserInformation,
                privateKey, publicKey
            }
        } else {
            return new GraphQLError(errorMessage)
        }
    });
}