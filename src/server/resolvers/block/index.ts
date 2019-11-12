import {Block as TBlock, MutationCreateBlockArgs, QueryBlockArgs, QueryBlocksArgs} from "../../../generated/graphql"
import {blockCreationMutation} from "./mutations/blockMutation";
import blockQuery from "./queries/block";
import blocksQuery from "./queries/blocks";


export default {
    Query: {
        blocks: (parent: any, args: QueryBlocksArgs): Promise<[TBlock]> => blocksQuery(args),
        block: (parent: any, args: QueryBlockArgs): Promise<[TBlock]> => blockQuery(args)
    },
    Mutation: {
        createBlock: (parent: any, args: MutationCreateBlockArgs) => blockCreationMutation(args)
    }
}



