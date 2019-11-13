"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var apollo_server_express_1 = require("apollo-server-express");
var user_1 = require("./users/user");
var blockchain_1 = require("./blockchain/blockchain");
var linkSchema = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    type Query {\n        _: Boolean\n    }\n    type Mutation {\n        _: Boolean\n    }\n    type Subscription {\n        _: Boolean\n    }\n"], ["\n    type Query {\n        _: Boolean\n    }\n    type Mutation {\n        _: Boolean\n    }\n    type Subscription {\n        _: Boolean\n    }\n"])));
exports["default"] = [linkSchema, user_1["default"], blockchain_1["default"]];
var templateObject_1;
