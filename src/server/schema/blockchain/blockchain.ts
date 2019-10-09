import {gql} from 'apollo-server-express';


export default gql`
    extend type Query {
        blocks(token: String!): [Block!]
        block(id: ID!, token: String!, privateKey: String!): Block!
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
    }
`;
