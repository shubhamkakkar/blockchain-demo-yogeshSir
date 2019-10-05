import UserSchema from "../../models/user/user"
import { ReturnedUser, User } from "../../../generated/graphql";
import { sha256 } from 'js-sha256';
import { jwtToken } from "./jwt";
import { GraphQLError } from "graphql";

export default {
    Query: {
        users: async () => {
            const allUsers = await UserSchema.find().then(res => res).catch(er => er);
            if (allUsers.length) {
                let returnObj: ReturnedUser[] = [];
                allUsers.forEach(({ email, _id }: {
                    email: string, _id: string
                }) => returnObj = [...returnObj, { email, _id, token: jwtToken({ email }) }]);
                return returnObj;
            }
        },
    },
    Mutation: {
        signin: (parent: any, { email, password }: User) => {
            return UserSchema.findOne({ email })
                .then((res: any) => {
                    if (res === null) {
                        const encryptedPassword = sha256(password);
                        const user = new UserSchema({ email, password: encryptedPassword });
                        return user.save()
                            .then((_doc) => ({
                                token: jwtToken({ email }),
                                ..._doc
                            }))
                            .catch(res => res)
                    } else {
                        return ({
                            token: jwtToken({ email }),
                            _id: res._id,
                            email
                        })
                    }
                })
                .catch(er => console.log("error in finding", er))
        },
        login: (parent: any, { email, password }: User) => UserSchema.findOne({ email })
            .then(user => {
                if (user !== null) {
                    const encryptedPassword = sha256(password);
                    // @ts-ignore
                    const { password: userPassword } = user;
                    if (userPassword === encryptedPassword) {
                        return {
                            _id: user._id,
                            email,
                            token: jwtToken({ email }),
                        }
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
}
    ;
