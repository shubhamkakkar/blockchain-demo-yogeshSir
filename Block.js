

const sha256 = require('js-sha256');

class Block {
    constructor({index, timestamp, data, prevHash}) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.nounce = 1;
        this.hash = this.calcHash();
    }

    calcHash() {
        return sha256(
            this.index + this.timestamp + this.data + this.prevHash + this.nounce
        )
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nounce++;
            this.hash = this.calcHash()
        }
        return this.hash
    }
}

module.exports = Block;
