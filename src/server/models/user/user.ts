import {Schema, model} from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    privateKey: {
        type: Object,
        required: true
    },
    publicKey: {
        type: Object,
        required: true
    },
}, {collection: "User"});

export default model('User', UserSchema);
