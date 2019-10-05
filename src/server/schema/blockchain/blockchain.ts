import { gql } from 'apollo-server-express';

export default gql`
    
    extend type Query {
        blocks: [Block!]
    }

    extend type Mutation {
        createBlock(data: String!, token: String!):Block!
    }

    type Block {
        index: Int!
        timestamp: Int!
        data: String!
        prevHash: String!
        hash: String!
    }
`;
