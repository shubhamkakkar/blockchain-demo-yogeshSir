import UserSchema from "../../../models/user/user";
import {ReturnedUser} from "../../../../generated/graphql";
import {jwtToken} from "../jwt";

export default function usersQuery() {
    const allUsers = UserSchema.find().then(allUsers => {
        if (allUsers.length) {
            let returnObj: ReturnedUser[] = [];
            //@ts-ignore
            allUsers.forEach(({email, _id, publicKey, privateKey}: ReturnedUser) => returnObj = [...returnObj, {
                publicKey,
                privateKey,
                email,
                _id,
                token: jwtToken({email})
            }]);
            return returnObj;
        }
        return []
    }).catch(er => er);


}
