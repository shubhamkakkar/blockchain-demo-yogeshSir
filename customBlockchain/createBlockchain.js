const Block = require("../Block");

const createBlock = (blockInfo) => {
    const toAddBlock = new Block({...blockInfo, timestamp: Date.now()})
    const returnedHash = toAddBlock.mineBlock(2)
    return returnedHash === toAddBlock.hash ? toAddBlock : false
};

function createBlockchain(length, blockData) {
    const blockchain = [createBlock({index: 0, data: blockData[0].data, prevHash: 0})];
    let {index: lastIndex, hash: toBePrevHash} = blockchain[0];

    for (let i = 1; i < length; i++) {

        const blockToAdd = createBlock({
            index: lastIndex + 1,
            prevHash: toBePrevHash,
            data: blockData[i].data
        });

        if(blockToAdd){
            blockchain.push(blockToAdd);
            lastIndex = blockToAdd.hash;
        }else{
            console.log("Malicious block");
            return
        }
    }

    console.log(blockchain);
}

module.exports = createBlockchain;
