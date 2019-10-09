import BlockSchema from '../../models/blocks/block'
import UserSchema from '../../models/user/user'
import BlockClass from "../../../Blockchain/Block"
import { Block as TBlock } from "../../../generated/graphql"
import { blockHashGenerator } from './sha256'
import { JWTDecode, JWTVerify } from '../user/jwt'


// @ts-ignore
function createNewBlock({ index, data, prevHash, token }) {
    const toAddBlock = new BlockClass({
        // TODO:correct this
        // @ts-ignore 
        index,
        data,
        prevHash,
    })

    const newBlock = new BlockSchema({ ...toAddBlock, createrEmail: token })

    console.log({ newBlock })
    return newBlock.save()
        .then(res => res).catch(er => er)
}


export default {
    Query: {
        blocks: async () => await BlockSchema.find()
    },
    Mutation: {
        createBlock: (parent: any, { data, token }: { data: string, token: string }) => {
            // must give in token
            // @ts-ignore
            const { email } = JWTVerify(token).email
            return UserSchema.findOne({ email })
                .then(user => {
                    if (user) {
                        return BlockSchema.find()
                            .then(chain => {
                                const timestamp = Date.now();
                                const nounce = 1;
                                if (chain.length === 0) {
                                    //  genesis block
                                    const index = 0;
                                    const prevHash = '0';

                                    return createNewBlock({ index, data, prevHash, token })

                                } else {
                                    // @ts-ignore
                                    const { index: lastIndex, hash: prevHash }: { index: number, hash: string } = chain.reverse()[0]._doc
                                    const index = lastIndex + 1
                                    return createNewBlock({ index, data, prevHash, token })

                                }
                            })
                            .catch(er => console.log("er", er))
                    } else {
                        console.log("not authenticated")
                    }
                })
                .catch(er => console.log("er at finding user by email", er))


        }
    }
}