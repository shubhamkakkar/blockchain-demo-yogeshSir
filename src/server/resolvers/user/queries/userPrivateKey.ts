import UserSchema from "../../../models/user/user";
import {JWTVerify} from "../jwt";


export default function userPrivateKeyQuery(token:string) {

    // @ts-ignore
    const {email: {email}} = JWTVerify(token);
    return UserSchema.findOne({email})
        .then(user => {

        })
        .catch(er => console.log("user not found - user private key"))
}
