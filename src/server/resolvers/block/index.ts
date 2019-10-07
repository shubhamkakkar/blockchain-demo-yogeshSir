import BlockSchema from '../../models/blocks/block'
import UserSchema from '../../models/user/user'
import BlockClass, {TBlockConstructor} from "../../../Blockchain/Block"
import {Block as TBlock, PrivateKey} from "../../../generated/graphql"
import {generateSignature, Encodeuint8arr} from './sha256'
import {JWTVerify} from '../user/jwt'

interface TBlockConstructorCustom extends TBlockConstructor {
    token: string;
    privateKey: PrivateKey
}

function createNewBlock({index, data, prevHash, token, privateKey}: TBlockConstructorCustom) {
    const bufferArrayOfDataString = Encodeuint8arr(data);
    return generateSignature({
        message: bufferArrayOfDataString,
        privateKey
    })
        .then(signature => {
            const toAddBlock = new BlockClass({
                index,
                data: signature,
                prevHash,
            });
            const newBlock = new BlockSchema({...toAddBlock, creatorEmail: token});
            return newBlock.save().then(res => res).catch(er => er);
        }).catch(er => {
            console.log("error in signature", er)
        });
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
                            if(Object.entries(block).length){
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
        createBlock: (parent: any, {data, token}: { data: string, token: string }) => {
            // @ts-ignore
            const {email: {email}} = JWTVerify(token);
            return UserSchema.findOne({email})
                .then(user => {
                    if (user) {
                        // @ts-ignore
                        const {privateKey} = user;
                        return BlockSchema.find()
                            .then(chain => {
                                const timestamp = Date.now();
                                const nounce = 1;
                                if (chain.length === 0) {
                                    //  genesis block
                                    const index = 0;
                                    const prevHash = '0';
                                    return createNewBlock({index, data, prevHash, token, privateKey})
                                } else {
                                    // @ts-ignore
                                    const {index: lastIndex, hash: prevHash}: { index: number, hash: string } = chain.reverse()[0]._doc;
                                    const index = lastIndex + 1;
                                    return createNewBlock({index, data, prevHash, token, privateKey})
                                }
                            })
                            .catch(er => console.log("er", er))
                    } else {
                        console.log("not found - user in block mutation")
                    }
                })
                .catch(er => console.log("er at finding user by email", er))
        }
    }
}


