const sha256 = require('js-sha256');

class Block {
    constructor({index, timestamp, data, prevHash}) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.thisHash = sha256(
            this.index + this.timestamp + this.data + this.prevHash
        );
    }
}

module.exports = Block;
