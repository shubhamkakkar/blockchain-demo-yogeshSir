"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const js_sha256_1 = require("js-sha256");
class BlockClass {
    constructor({ index, data, prevHash }) {
        this.index = index;
        this.data = data;
        this.prevHash = prevHash;
        this.timestamp = Date.now();
        this.nounce = 1;
        this.hash = this.calcHash();
        [];
    }
    calcHash() {
        return js_sha256_1.sha256(this.index + this.timestamp + this.data + this.prevHash + this.nounce);
    }
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nounce++;
            this.hash = this.calcHash();
        }
        return this.hash;
    }
}
function passwordGen({ hash, privatekey, publickey }) {
    return js_sha256_1.sha256(hash + privatekey + publickey);
}
exports.passwordGen = passwordGen;
exports.default = BlockClass;
//# sourceMappingURL=Block.js.map