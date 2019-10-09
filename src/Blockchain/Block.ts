// @ts-ignore
import { sha256 } from 'js-sha256';

type TBlockConstructor = {
    index: string;
    data: any;
    prevHash: string;
}


export type TBlock = {
    index: string;
    timestamp?: number;
    data: any;
    prevHash: string;
    hash: string;
    nounce: number;
}


class BlockClass {
    index: string;
    timestamp: number;
    data: any;
    prevHash: string;
    hash: string;
    nounce: number;

    constructor({ index, data, prevHash }: TBlockConstructor) {
        this.index = index;
        this.timestamp = Date.now();
        this.data = data;
        this.prevHash = prevHash;
        this.nounce = 1;
        this.hash = this.calcHash();
    }

    calcHash(): string {
        return sha256(
            this.index + this.timestamp + this.data + this.prevHash + this.nounce
        )
    }

    mineBlock(difficulty: number): string {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nounce++;
            this.hash = this.calcHash()
        }
        return this.hash
    }
}

export default BlockClass;
