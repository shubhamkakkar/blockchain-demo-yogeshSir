"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../../user/helperUserFunctions/jwt");
const user_1 = require("../../../models/user/user");
const block_1 = require("../../../models/blocks/block");
const globalHelperFunctions_1 = require("../../globalHelperFunctions");
const Block_1 = require("../../../../Blockchain/Block");
function createNewBlock({ index, data: message, prevHash, token, privatekey, publickey }) {
    const encryptMessage = globalHelperFunctions_1.stringEncryption({ publickey, message, privatekey });
    const toAddBlock = new Block_1.default({
        index,
        data: encryptMessage,
        prevHash,
    });
    const { hash } = toAddBlock;
    const password = () => {
        const chars = Block_1.passwordGen({ privatekey, publickey, hash }).split("");
        const punctuation = '!@#$%^&*()_+~`|}{[]\:;?><,./-='.split("");
        let temp = "";
        while (temp.length < 10) {
            let index = Math.floor(Math.random() * 7) + Math.floor(Math.random() * 3);
            temp += chars[index] + punctuation[index];
        }
        return temp;
    };
    const newBlock = new block_1.default({ ...toAddBlock, creatorEmail: token, password: password() });
    return newBlock.save().then(res => res).catch(er => er);
}
function blockCreationMutation({ data, token, privateKey: givenPrivateKey }) {
    // @ts-ignore
    const { email: { email } } = jwt_1.JWTVerify(token);
    return user_1.default.findOne({ email })
        .then(user => {
        if (user) {
            // @ts-ignore
            const { privateKey: userOriginalPrivateKey, publicKey } = user;
            if (givenPrivateKey === userOriginalPrivateKey) {
                return block_1.default.find()
                    .then(chain => {
                    if (!chain.length) {
                        //  genesis block
                        const index = 0;
                        const prevHash = '0';
                        return createNewBlock({
                            index,
                            data,
                            prevHash,
                            token,
                            privatekey: givenPrivateKey,
                            publickey: publicKey
                        });
                    }
                    else {
                        // @ts-ignore
                        const { index: lastIndex, hash: prevHash } = chain.reverse()[0]._doc;
                        const index = lastIndex + 1;
                        return createNewBlock({
                            index,
                            data,
                            prevHash,
                            token,
                            privatekey: givenPrivateKey,
                            publickey: publicKey
                        });
                    }
                })
                    .catch(er => console.log("er", er));
            }
        }
        else {
            console.log("not found - user in block mutation");
        }
    })
        .catch(er => console.log("er at finding user by email", er));
}
exports.blockCreationMutation = blockCreationMutation;
//# sourceMappingURL=blockMutation.js.map