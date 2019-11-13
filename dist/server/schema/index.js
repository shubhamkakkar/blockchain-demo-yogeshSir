"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const user_1 = require("./users/user");
const blockchain_1 = require("./blockchain/blockchain");
const linkSchema = apollo_server_express_1.gql `
    type Query {
        _: Boolean
    }
    type Mutation {
        _: Boolean
    }
    type Subscription {
        _: Boolean
    }
`;
exports.default = [linkSchema, user_1.default, blockchain_1.default];
//# sourceMappingURL=index.js.map