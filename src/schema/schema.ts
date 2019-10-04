import {gql} from 'apollo-server-express';
import {makeExecutableSchema} from 'graphql-tools';
import {GraphQLSchema} from 'graphql';
import {resolvers} from "../resolvers/resolvers";

const typeDefs = gql`
    type User {
        id: String!
        name: String!
        password: String!
    }

    type Query {
        allUsers: [User]
    }
    
    type Mutation {
        
    }

    schema {
        query: Query
    }

`;

export const schema = makeExecutableSchema({
    allowUndefinedInResolve: true,
    typeDefs,
    resolvers,
}) as GraphQLSchema;

export default schema;
