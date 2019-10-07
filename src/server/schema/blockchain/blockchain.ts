import {gql} from 'apollo-server-express';


export default gql`
    extend type Query {
        # need to add publicKey as an argument here
        blocks(token: String!): [Block!]
        block(id: ID!, token: String!): Block!
    }

    extend type Mutation {
        createBlock(data: String!, token: String!):Block!
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
