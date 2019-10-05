import BlockSchema from '../../models/blocks/block'
import BlockClass from "../../../Blockchain/Block"
import { Block as TBlock } from "../../../generated/graphql"
import { blockHashGenerator } from './sha256'
export default {
    Query: {
        blocks: async () => await BlockSchema.find()
    },
    Mutation: {
        createBlock: (parent: any, { data, token }: { data: string, token: string }) => {
            // must give in token
            BlockSchema.find()
                .then(chain => {
                    const timestamp = Date.now();
                    const nounce = 1;
                    if (chain.length === 0) {
                        //  genesis block
                        const index = 0;
                        const prevHash = '0';

                        let block: TBlock = new BlockClass({
                            // @ts-ignore
                            index,
                            timestamp,
                            data,
                            prevHash,
                            hash: blockHashGenerator({ nounce, index, timestamp, data, prevHash })
                        })

                        console.log({ block })


                    } else {
                        // add more to chain
                    }
                })
                .catch(er => console.log("er", er))
        }
    }
}