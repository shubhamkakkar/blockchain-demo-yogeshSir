const Block = require("../Block");

const createBlock = (blockInfo) => new Block({...blockInfo, timestamp: Date.now()})

function createBlockchain(length, blockData) {
    const blockchain = [createBlock({index: 0, data: blockData[0].data, prevHash: 0})];
    let {index: lastIndex, thisHash: toBePrevHash} = blockchain[0];

    for (let i = 1; i < length; i++) {
        const blockToAdd = createBlock({
            index: lastIndex + 1,
            prevHash: toBePrevHash,
            data: blockData[i].data

        });
        blockchain.push(blockToAdd);
        lastIndex = blockToAdd.thisHash;
    }

    console.log(blockchain);
}

module.exports = createBlockchain;
