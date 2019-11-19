"use strict";
exports.__esModule = true;
var Block_1 = require("../Block");
var createGenesisBlock = function () { return new Block_1["default"]({ index: 0, data: 'Genesis Block', prevHash: '0' }); };
var nextBlock = function (lastBlock, data) { return new Block_1["default"]({
    index: lastBlock.index + 1,
    data: data,
    prevHash: lastBlock.hash
}); };
var createBlockchain = function () {
    var num = 10;
    var blockchain = [createGenesisBlock()];
    var previousBlock = blockchain[0];
    for (var i = 1; i < num; i += 1) {
        // @ts-ignore
        var blockToAdd = nextBlock(previousBlock, "This is block #" + i);
        blockchain.push(blockToAdd);
        previousBlock = blockToAdd;
    }
    console.log(blockchain);
};
createBlockchain();
