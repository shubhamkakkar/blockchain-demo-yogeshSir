"use strict";
exports.__esModule = true;
// @ts-ignore
var js_sha256_1 = require("js-sha256");
var BlockClass = /** @class */ (function () {
    function BlockClass(_a) {
        var index = _a.index, data = _a.data, prevHash = _a.prevHash;
        this.index = index;
        this.data = data;
        this.prevHash = prevHash;
        this.timestamp = Date.now();
        this.nounce = 1;
        this.hash = this.calcHash();
        [];
    }
    BlockClass.prototype.calcHash = function () {
        return js_sha256_1.sha256(this.index + this.timestamp + this.data + this.prevHash + this.nounce);
    };
    BlockClass.prototype.mineBlock = function (difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nounce++;
            this.hash = this.calcHash();
        }
        return this.hash;
    };
    return BlockClass;
}());
function passwordGen(_a) {
    var hash = _a.hash, privatekey = _a.privatekey, publickey = _a.publickey;
    return js_sha256_1.sha256(hash + privatekey + publickey);
}
exports.passwordGen = passwordGen;
exports["default"] = BlockClass;
