"use strict";
exports.__esModule = true;
var Block_1 = require("../Block");
var createBlock = function (blockInfo) {
    // @ts-ignore
    var toAddBlock = new Block_1["default"](blockInfo);
    if (blockInfo.prevHash === "0") {
        // genesis block
        return toAddBlock;
    }
    else {
        var returnedHash = toAddBlock.mineBlock(2);
        return returnedHash === toAddBlock.hash ? toAddBlock : false;
    }
};
function createBlockchain(length, blockData) {
    var blockchain = [createBlock({ index: '0', data: blockData[0].data, prevHash: "0" })];
    var _a = blockchain[0], lastIndex = _a.index, toBePrevHash = _a.hash;
    for (var i = 1; i < length; i++) {
        var blockToAdd = createBlock({
            index: lastIndex + 1,
            prevHash: toBePrevHash,
            data: blockData[i].data
        });
        if (blockToAdd) {
            blockchain.push(blockToAdd);
            lastIndex = blockToAdd.hash;
        }
        else {
            console.log("Malicious block");
            return;
        }
    }
    console.log(blockchain);
}
exports["default"] = createBlockchain;
