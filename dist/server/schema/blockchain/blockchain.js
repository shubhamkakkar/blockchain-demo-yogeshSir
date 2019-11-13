"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = apollo_server_express_1.gql `
    extend type Query {
        blocks(token: String!): [Block!]
        block(id: ID!, token: String!, password: String!): Block!
    }

    extend type Mutation {
        createBlock(data: String!, token: String!, privateKey: String!):Block!
    }

    type Block {
        _id: ID!
        index: Int!
        timestamp: String!
        data: String!
        prevHash: String!
        hash: String!
        password:String!
    }
`;
//# sourceMappingURL=blockchain.js.map