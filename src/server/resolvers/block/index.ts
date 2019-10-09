import BlockSchema from '../../models/blocks/block'
import UserSchema from '../../models/user/user'
import BlockClass, {TBlockConstructor} from "../../../Blockchain/Block"
import {Block as TBlock, MutationCreateBlockArgs} from "../../../generated/graphql"
import {signature, encrypted, decrypted, verified} from './sha256'
import {JWTVerify} from '../user/jwt'

interface TBlockConstructorCustom extends TBlockConstructor {
    token: string;
    privatekey: string;
    publickey: string;
}

function createNewBlock({index, data: message, prevHash, token, privatekey, publickey}: TBlockConstructorCustom) {
    const signatureOfUserMessage = signature({
        message,
        privatekey
    });

    const encryptMessage = encrypted({publickey, message, signature: signatureOfUserMessage});
    const toAddBlock = new BlockClass({
        index,
        data: encryptMessage,
        prevHash,
    });
    const newBlock = new BlockSchema({...toAddBlock, creatorEmail: token});
    return newBlock.save().then(res => res).catch(er => er);
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
        block: (parent: any, {token, id: _id, privateKey: privatekey}: { token: string, id: string, privateKey: string }): Promise<[TBlock]> => {
            // @ts-ignore
            const {email: {email}} = JWTVerify(token);
            return UserSchema.findOne({email})
                .then(user => {
                    if (user) {
                        return BlockSchema.findOne({_id}).then((block) => {
                            // @ts-ignore
                            if (Object.entries(block).length) {
                                // @ts-ignore
                                const {data} = block;
                                return decrypted({privatekey, encrypted: data})
                                    .then(({message, signature}) => {
                                        // @ts-ignore
                                        const {publicKey: publicKey} = user;
                                        const verificationRes: boolean = verified({publicKey, message, signature})
                                        if (verificationRes) {
                                            return {
                                                //@ts-ignore
                                                ...block._doc,
                                                data: message
                                            }
                                        } else {
                                            // else and error will both have the response of data where the user message will still be encrypted
                                            return {
                                                //@ts-ignore
                                                ...block._doc,
                                            }
                                        }
                                    })
                                    .catch(er => ({
                                        //@ts-ignore
                                        ...block._doc,
                                    }));
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
                        const {privateKey: userOriginalPrivateKey, publicKey}: { privateKey: string, publicKey: string } = user;
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
                                            privatekey: givenPrivateKey,
                                            publickey: publicKey
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
                                            privatekey: givenPrivateKey,
                                            publickey: publicKey
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


