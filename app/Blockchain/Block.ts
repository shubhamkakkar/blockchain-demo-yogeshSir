// @ts-ignore
import {sha256} from 'js-sha256';

export type TBlockConstructor = {
    index: number;
    data: any;
    prevHash: string;
}


export type TBlock = {
    index: number;
    timestamp?: number;
    data: any;
    prevHash: string;
    hash: string;
    nounce: number;
}


export type TpasswordGen = {
    hash: string;
    publickey: string;
    privatekey: string;
}

class BlockClass {
    index: number;
    timestamp: number;
    data: any;
    prevHash: string;
    hash: string;
    nounce: number;

    constructor({index, data, prevHash}: TBlockConstructor) {
        this.index = index;
        this.data = data;
        this.prevHash = prevHash;
        this.timestamp = Date.now();
        this.nounce = 1;
        this.hash = this.calcHash();
        []
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

export function passwordGen({hash, privatekey, publickey}: TpasswordGen): string {
    return sha256(hash + privatekey + publickey)
}

export default BlockClass;
