"use strict";
exports.__esModule = true;
var blockMutation_1 = require("./mutations/blockMutation");
var block_1 = require("./queries/block");
var blocks_1 = require("./queries/blocks");
exports["default"] = {
    Query: {
        blocks: function (parent, args) { return blocks_1["default"](args); },
        block: function (parent, args) { return block_1["default"](args); }
    },
    Mutation: {
        createBlock: function (parent, args) { return blockMutation_1.blockCreationMutation(args); }
    }
};
