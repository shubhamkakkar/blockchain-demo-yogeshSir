const Block = require("./Block");

const createGenesisBlock = () => new Block(0, Date.now(), 'Genesis Block', '0');

const nextBlock = (lastBlock, data) =>
    new Block(lastBlock.index + 1, Date.now(), data, lastBlock.thisHash);


const createBlockchain = num => {
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
