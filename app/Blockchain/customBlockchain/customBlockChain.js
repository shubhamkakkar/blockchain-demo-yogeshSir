"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var inquirer = require("inquirer");
var createBlockchain_1 = require("./createBlockchain");
function customBlockChain() {
    var questions = [{
            type: 'input',
            name: 'lengthToCreate',
            message: "What should be the length of blockchain you want to create?"
        }];
    var blockchainData = [];
    inquirer.prompt(questions).then(function (answers) {
        var lengthToCreate = parseInt(answers['lengthToCreate']);
        if (lengthToCreate) {
            var blockchainDataQuestions = [];
            for (var i = 0; i < lengthToCreate; i++) {
                blockchainDataQuestions = __spreadArrays(blockchainDataQuestions, [
                    {
                        type: 'input',
                        name: "data_stored_" + i,
                        message: "Data to be stored in block " + (i + 1) + "?"
                    }
                ]);
            }
            inquirer.prompt(blockchainDataQuestions).then(function (qa) {
                Object.keys(qa).map(function (keyI) {
                    blockchainData = __spreadArrays(blockchainData, [
                        {
                            data: qa[keyI]
                        }
                    ]);
                });
                createBlockchain_1["default"](lengthToCreate, blockchainData);
            });
        }
        else {
            console.log("The blockchain must have a length of at least 1");
            return 0;
        }
    });
}
customBlockChain();
exports["default"] = customBlockChain;
