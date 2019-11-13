"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var apollo_server_express_1 = require("apollo-server-express");
exports["default"] = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    extend type Query {\n        blocks(token: String!): [Block!]\n        block(id: ID!, token: String!, password: String!): Block!\n    }\n\n    extend type Mutation {\n        createBlock(data: String!, token: String!, privateKey: String!):Block!\n    }\n\n    type Block {\n        _id: ID!\n        index: Int!\n        timestamp: String!\n        data: String!\n        prevHash: String!\n        hash: String!\n        password:String!\n    }\n"], ["\n    extend type Query {\n        blocks(token: String!): [Block!]\n        block(id: ID!, token: String!, password: String!): Block!\n    }\n\n    extend type Mutation {\n        createBlock(data: String!, token: String!, privateKey: String!):Block!\n    }\n\n    type Block {\n        _id: ID!\n        index: Int!\n        timestamp: String!\n        data: String!\n        prevHash: String!\n        hash: String!\n        password:String!\n    }\n"])));
var templateObject_1;
