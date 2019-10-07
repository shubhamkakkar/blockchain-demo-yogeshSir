import UserSchema from "../../models/user/user"
import {ReturnedUser, User} from "../../../generated/graphql";
import {sha256} from 'js-sha256';
import {jwtToken, userProfileKeys} from "./jwt";
import {GraphQLError} from "graphql";

export default {
    Query: {
        users: async () => {
            const allUsers = await UserSchema.find().then(allUsers => allUsers).catch(er => er);
            if (allUsers.length) {
                let returnObj: ReturnedUser[] = [];
                allUsers.forEach(({email, _id, publicKey, privateKey}: ReturnedUser) => returnObj = [...returnObj, {
                    publicKey,
                    privateKey,
                    email,
                    _id,
                    token: jwtToken({email})
                }]);
                return returnObj;
            }
        },
    },
    Mutation: {
        signin: (parent: any, {email, password}: User) => {
            return UserSchema.findOne({email})
                .then(async (res: any) => {
                    if (res === null) {
                        const encryptedPassword = sha256(password);
                        const {publicKey, privateKey} = await userProfileKeys;
                        const user = new UserSchema({email, password: encryptedPassword, publicKey, privateKey});
                        return user.save()
                            .then((_doc) => ({
                                token: jwtToken({email}),
                                ..._doc
                            }))
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
        },
        login: (parent: any, {email, password}: User) => UserSchema.findOne({email})
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
    },
    ReturnedUser: {
        publicKey: ({email}: {
            email: string
        }, args: any) => UserSchema.findOne({email: email})
            .then(user => {
                if (user !== null) {
                    // @ts-ignore
                    return user.publicKey
                } else {
                    console.log("user not found - public key", {email})
                }
            })
            .catch(er => {
                console.log("error finding user", er)
            }),
        privateKey: ({email}: {
            email: string
        }, args: any) => UserSchema.findOne({email: email})
            .then(user => {
                if (user !== null) {
                    // @ts-ignore
                    return user.privateKey
                } else {
                    console.log("user not found - privateKey key", {email})
                }
            })
            .catch(er => {
                console.log("error finding user", er)
            })
    }
};
