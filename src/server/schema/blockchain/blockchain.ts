import {gql} from 'apollo-server-express';


export default gql`
    extend type Query {
        blocks(token: String): [Block!]
        # need to add publicKey as an argument here
    }

    extend type Mutation {
        createBlock(data: String!, token: String!):Block!
    }

    type Block {
        index: Int!
        timestamp: String!
        data: String!
        prevHash: String!
        hash: String!
    }
`;
