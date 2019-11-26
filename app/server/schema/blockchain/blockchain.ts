import { gql } from 'apollo-server-express';


export default gql`
    extend type Query {
        blocks(token: String!): [PublicLedger!]
        block(id: ID!, token: String!, password: String!): Block!
    }

    extend type Mutation {
        createBlock(data: String!, token: String!, privateKey: String!): TrueBlock!
    }

    type TrueBlock {
        _id: ID!
        index: Int!
        timestamp: String!
        prevHash: String!
        hash: String!
        data: String!
        password:String!
    }

    type Block {
        data: String!
    }

    type PublicLedger {
        _id: ID!
        index: Int!
        timestamp: String!
        prevHash: String!
        hash: String!
        password:String!
    }
`;
