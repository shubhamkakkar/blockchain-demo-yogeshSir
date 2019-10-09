import {Block as TBlock} from "../../generated/graphql";
import Block from "../Block";

const createGenesisBlock = () => new Block({index: 0, data: 'Genesis Block', prevHash: '0'});

const nextBlock = (lastBlock: TBlock, data: string) => new Block({
    index: lastBlock.index + 1,
    data,
    prevHash: lastBlock.hash
});
const createBlockchain = () => {
    const num = 10;
    const blockchain = [createGenesisBlock()];
    let previousBlock = blockchain[0];
    for (let i = 1; i < num; i += 1) {
        // @ts-ignore
        const blockToAdd = nextBlock(previousBlock, `This is block #${i}`);
        blockchain.push(blockToAdd);
        previousBlock = blockToAdd;
    }
    console.log(blockchain);
};

createBlockchain();
