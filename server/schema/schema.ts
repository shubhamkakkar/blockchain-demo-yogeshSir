import gql from 'graphql-tag';
import { makeExecutableSchema } from 'graphql-tools';
// import { resolvers } from '../resolvers/resolvers';
import { GraphQLSchema } from 'graphql';

const typeDefs = gql`
  directive @entity on OBJECT
  type Author @entity {
    id: Int!
    firstName: String! @deprecated
    lastName: String!
    posts(findTitle: String): [Post]
  }
  
  type Post @entity {
    id: Int!
    title: String!
    author: Author!
  }
  
  type Query {
    posts: [Post]
  }
  
  schema {
    query: Query
  }
`;

export const schema = makeExecutableSchema({
    allowUndefinedInResolve: true,
    typeDefs,
    // resolvers,
}) as GraphQLSchema;

export default schema;
