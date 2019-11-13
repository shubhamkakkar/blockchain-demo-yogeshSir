"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = apollo_server_express_1.gql `
    extend type Query {
        users: [ReturnedUser!],
    }
    extend  type Mutation {
        signin(email:String!, password: String! ): ReturnedUser
        login(email:String!, password: String!):ReturnedUser
    }
    type User {
        email: String!
        password: String!
    }
    
    type ReturnedUser {
        _id: ID!
        email: String!
        publicKey: String!
        privateKey: String!
        token: String!
    }


`;
//# sourceMappingURL=user.js.map