import {Schema, model} from "mongoose";

const BlockSChema = new Schema({
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
}, {collection: "Block"});

export default model('Block', BlockSChema);
