"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blockMutation_1 = require("./mutations/blockMutation");
const block_1 = require("./queries/block");
const blocks_1 = require("./queries/blocks");
exports.default = {
    Query: {
        blocks: (parent, args) => blocks_1.default(args),
        block: (parent, args) => block_1.default(args)
    },
    Mutation: {
        createBlock: (parent, args) => blockMutation_1.blockCreationMutation(args)
    }
};
//# sourceMappingURL=index.js.map