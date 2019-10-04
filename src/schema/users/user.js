// import {gql} from 'apollo-server-express';
// import {makeExecutableSchema} from 'graphql-tools';
// import {GraphQLSchema} from 'graphql';
var importSchema = require('graphql-import').importSchema;
console.log(importSchema("./user.graphql"));
