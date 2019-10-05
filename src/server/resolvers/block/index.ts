import BlockSchema from '../../models/blocks/block'
import BlockClass from "../../../Blockchain/Block"
import { Block as TBlock } from "../../../generated/graphql"
import { blockHashGenerator } from './sha256'
import { JWTDecode, JWTVerify } from '../user/jwt'
export default {
    Query: {
        blocks: async () => await BlockSchema.find()
    },
    Mutation: {
        createBlock: (parent: any, { data, token }: { data: string, token: string }) => {
            // must give in token
            return BlockSchema.find()
                .then(chain => {
                    // @ts-ignore
                    const { email } = JWTVerify(token).email
                    console.log({ email })
                    const timestamp = Date.now();
                    const nounce = 1;
                    if (chain.length === 0) {
                        //  genesis block
                        const index = 0;
                        const prevHash = '0';

                        let newBlock = new BlockSchema({
                            index,
                            timestamp,
                            data,
                            prevHash,
                            hash: blockHashGenerator({ nounce, index, timestamp, data, prevHash })
                        })

                        return newBlock.save()
                            .then(res => res).catch(er => er)

                    } else {
                        // @ts-ignore
                        const { index: lastIndex, hash: prevHash }: { index: number, hash: string } = chain.reverse()[0]._doc
                        const index = lastIndex + 1
                        let newBlock = new BlockSchema({
                            index,
                            timestamp,
                            data,
                            prevHash,
                            hash: blockHashGenerator({ nounce, index, timestamp, data, prevHash })
                        })
                        return newBlock.save()
                            .then(res => res).catch(er => er)
                    }
                })
                .catch(er => console.log("er", er))
        }
    }
}