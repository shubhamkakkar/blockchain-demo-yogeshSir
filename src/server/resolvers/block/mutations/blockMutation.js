"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var jwt_1 = require("../../user/helperUserFunctions/jwt");
var user_1 = require("../../../models/user/user");
var block_1 = require("../../../models/blocks/block");
var globalHelperFunctions_1 = require("../../globalHelperFunctions");
var Block_1 = require("../../../../Blockchain/Block");
function createNewBlock(_a) {
    var index = _a.index, message = _a.data, prevHash = _a.prevHash, token = _a.token, privatekey = _a.privatekey, publickey = _a.publickey;
    var encryptMessage = globalHelperFunctions_1.stringEncryption({ publickey: publickey, message: message, privatekey: privatekey });
    var toAddBlock = new Block_1["default"]({
        index: index,
        data: encryptMessage,
        prevHash: prevHash
    });
    var hash = toAddBlock.hash;
    var password = function () {
        var chars = Block_1.passwordGen({ privatekey: privatekey, publickey: publickey, hash: hash }).split("");
        var punctuation = '!@#$%^&*()_+~`|}{[]\:;?><,./-='.split("");
        var temp = "";
        while (temp.length < 10) {
            var index_1 = Math.floor(Math.random() * 7) + Math.floor(Math.random() * 3);
            temp += chars[index_1] + punctuation[index_1];
        }
        return temp;
    };
    var newBlock = new block_1["default"](__assign(__assign({}, toAddBlock), { creatorEmail: token, password: password() }));
    return newBlock.save().then(function (res) { return res; })["catch"](function (er) { return er; });
}
function blockCreationMutation(_a) {
    var data = _a.data, token = _a.token, givenPrivateKey = _a.privateKey;
    // @ts-ignore
    var email = jwt_1.JWTVerify(token).email.email;
    return user_1["default"].findOne({ email: email })
        .then(function (user) {
        if (user) {
            // @ts-ignore
            var userOriginalPrivateKey = user.privateKey, publicKey_1 = user.publicKey;
            if (givenPrivateKey === userOriginalPrivateKey) {
                return block_1["default"].find()
                    .then(function (chain) {
                    if (!chain.length) {
                        //  genesis block
                        var index = 0;
                        var prevHash = '0';
                        return createNewBlock({
                            index: index,
                            data: data,
                            prevHash: prevHash,
                            token: token,
                            privatekey: givenPrivateKey,
                            publickey: publicKey_1
                        });
                    }
                    else {
                        // @ts-ignore
                        var _a = chain.reverse()[0]._doc, lastIndex = _a.index, prevHash = _a.hash;
                        var index = lastIndex + 1;
                        return createNewBlock({
                            index: index,
                            data: data,
                            prevHash: prevHash,
                            token: token,
                            privatekey: givenPrivateKey,
                            publickey: publicKey_1
                        });
                    }
                })["catch"](function (er) { return console.log("er", er); });
            }
        }
        else {
            console.log("not found - user in block mutation");
        }
    })["catch"](function (er) { return console.log("er at finding user by email", er); });
}
exports.blockCreationMutation = blockCreationMutation;
