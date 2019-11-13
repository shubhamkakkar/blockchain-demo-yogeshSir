"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BlockSChema = new mongoose_1.Schema({
    index: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    },
    data: {
        type: String,
        required: true
    },
    creatorEmail: {
        type: String,
        required: true
    },
    prevHash: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    nounce: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { collection: "Block" });
exports.default = mongoose_1.model('Block', BlockSChema);
//# sourceMappingURL=block.js.map