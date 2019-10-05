import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        users: [ReturnedUser!]
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
        token: String!
    }
`;
