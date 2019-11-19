import Block, { TBlock } from "../Block";

type TCreateBlock = {
    index: string;
    data: string;
    prevHash: string
}

const createBlock = (blockInfo: TCreateBlock): TBlock | false => {
    // @ts-ignore
    const toAddBlock = new Block(blockInfo)
    if (blockInfo.prevHash === "0") {
        // genesis block
        return toAddBlock
    } else {
        const returnedHash = toAddBlock.mineBlock(2);
        return returnedHash === toAddBlock.hash ? toAddBlock : false
    }
};

function createBlockchain(length: number, blockData: { data: string }[]) {
    const blockchain: any[] = [createBlock({ index: '0', data: blockData[0].data, prevHash: "0" })];
    let { index: lastIndex, hash: toBePrevHash }: { index: string, hash: string } = blockchain[0];

    for (let i = 1; i < length; i++) {

        const blockToAdd = createBlock({
            index: lastIndex + 1,
            prevHash: toBePrevHash,
            data: blockData[i].data
        });

        if (blockToAdd) {
            blockchain.push(blockToAdd);
            lastIndex = blockToAdd.hash;
        } else {
            console.log("Malicious block");
            return
        }
    }

    console.log(blockchain);
}

export default createBlockchain;
