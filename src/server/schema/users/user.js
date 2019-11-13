"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var apollo_server_express_1 = require("apollo-server-express");
exports["default"] = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    extend type Query {\n        users: [ReturnedUser!],\n    }\n    extend  type Mutation {\n        signin(email:String!, password: String! ): ReturnedUser\n        login(email:String!, password: String!):ReturnedUser\n    }\n    type User {\n        email: String!\n        password: String!\n    }\n    \n    type ReturnedUser {\n        _id: ID!\n        email: String!\n        publicKey: String!\n        privateKey: String!\n        token: String!\n    }\n\n\n"], ["\n    extend type Query {\n        users: [ReturnedUser!],\n    }\n    extend  type Mutation {\n        signin(email:String!, password: String! ): ReturnedUser\n        login(email:String!, password: String!):ReturnedUser\n    }\n    type User {\n        email: String!\n        password: String!\n    }\n    \n    type ReturnedUser {\n        _id: ID!\n        email: String!\n        publicKey: String!\n        privateKey: String!\n        token: String!\n    }\n\n\n"])));
var templateObject_1;
