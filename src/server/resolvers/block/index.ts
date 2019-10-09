import BlockSchema from '../../models/blocks/block'
import UserSchema from '../../models/user/user'
import BlockClass, {TBlockConstructor} from "../../../Blockchain/Block"
import {Block as TBlock, MutationCreateBlockArgs} from "../../../generated/graphql"
import {signature, Encodeuint8arr} from './sha256'
import {JWTVerify} from '../user/jwt'

interface TBlockConstructorCustom extends TBlockConstructor {
    token: string;
    privateKey: string
}

function createNewBlock({index, data: message, prevHash, token, privateKey}: TBlockConstructorCustom) {
    const signatureOfUserMessage =  signature({
        message,
        privateKey
    })

    console.log({signatureOfUserMessage})
        // .then((signature: any) => {
        //     const toAddBlock = new BlockClass({
        //         index,
        //         data: signature,
        //         prevHash,
        //     });
        //     const newBlock = new BlockSchema({...toAddBlock, creatorEmail: token});
        //     return newBlock.save().then(res => res).catch(er => er);
        // }).catch((er: any) => {
        //     console.log("error in signature", er)
        // });
}

export default {
    Query: {
        blocks: (parent: any, {token}: { token: string }): Promise<[TBlock]> => {
            // @ts-ignore
            const {email: {email}} = JWTVerify(token);
            return UserSchema.findOne({email})
                .then(user => {
                    if (user) {
                        return BlockSchema.find().then(res => res).catch(er => er)
                    } else {
                        console.log("user not found")
                    }
                })
                .catch(er => console.log("err responding blocks - blocks query", er));
        },
        block: (parent: any, {token, id: _id}: { token: string, id: string }): Promise<[TBlock]> => {
            // @ts-ignore
            const {email: {email}} = JWTVerify(token);
            return UserSchema.findOne({email})
                .then(user => {
                    if (user) {
                        return BlockSchema.findOne({_id}).then((block) => {
                            // todo: if key is same as creator key then decrypted data as encrypted data
                            // @ts-ignore
                            if (Object.entries(block).length) {
                                // @ts-ignore
                                const {data} = block
                            }


                        }).catch(er => er)
                    } else {
                        console.log("user not found")
                    }
                })
                .catch(er => console.log("err responding blocks - blocks query", er));
        }
    },
    Mutation: {
        createBlock: (parent: any, {data, token, privateKey: givenPrivateKey}: MutationCreateBlockArgs) => {
            // @ts-ignore
            const {email: {email}} = JWTVerify(token);
            return UserSchema.findOne({email})
                .then(user => {
                    if (user) {
                        // @ts-ignore
                        const {privateKey: userOriginalPrivateKey}: string = user;
                        if (givenPrivateKey === userOriginalPrivateKey) {
                            return BlockSchema.find()
                                .then(chain => {
                                    const timestamp = Date.now();
                                    const nounce = 1;
                                    if (chain.length === 0) {
                                        //  genesis block
                                        const index = 0;
                                        const prevHash = '0';
                                        return createNewBlock({
                                            index,
                                            data,
                                            prevHash,
                                            token,
                                            privateKey: givenPrivateKey
                                        })
                                    } else {
                                        // @ts-ignore
                                        const {index: lastIndex, hash: prevHash}: { index: number, hash: string } = chain.reverse()[0]._doc;
                                        const index = lastIndex + 1;
                                        return createNewBlock({
                                            index,
                                            data,
                                            prevHash,
                                            token,
                                            privateKey: givenPrivateKey
                                        })
                                    }
                                })
                                .catch(er => console.log("er", er))
                        }

                    } else {
                        console.log("not found - user in block mutation")
                    }
                })
                .catch(er => console.log("er at finding user by email", er))
        }
    }
}


