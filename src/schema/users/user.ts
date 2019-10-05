import {gql} from 'apollo-server-express';

export default gql`
    extend type Query {
        users: [User!]
    }
    type User {
        id: ID!
        email: String
        password: String
    }
`;


//         user(id: ID!): User
