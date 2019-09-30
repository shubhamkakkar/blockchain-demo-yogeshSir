const Block = require("../Block");

const createGenesisBlock = () => new Block({index: 0, timestamp: Date.now(), data: 'Genesis Block', prevHash: '0'});

const nextBlock = (lastBlock, data) =>
    new Block({index: lastBlock.index + 1, timestamp: Date.now(), data, prevHash: lastBlock.thisHash});


const createBlockchain = () => {
    const num = 10;
    const blockchain = [createGenesisBlock()];
    let previousBlock = blockchain[0];

    for (let i = 1; i < num; i += 1) {
        const blockToAdd = nextBlock(previousBlock, `This is block #${i}`);
        blockchain.push(blockToAdd);
        previousBlock = blockToAdd;
    }
    console.log(blockchain);
};

module.exports = createBlockchain;
