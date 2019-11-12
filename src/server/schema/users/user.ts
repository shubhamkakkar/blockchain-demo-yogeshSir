import {gql} from 'apollo-server-express';

export default gql`
    extend type Query {
        users: [ReturnedUser!],
        privateKey(token:String): String!
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
