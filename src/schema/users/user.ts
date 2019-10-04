import {gql} from 'apollo-server-express';
import {makeExecutableSchema} from 'graphql-tools';
import {GraphQLSchema} from 'graphql';


const userType = gql`
    type User {
        id: String!
        name: String!
        password: String!
    }
`;

export default userType
