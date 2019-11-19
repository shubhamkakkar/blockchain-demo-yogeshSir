import { gql } from 'apollo-server-express';

import userSchema from './users/user';
import blockSchema from './blockchain/blockchain'

const linkSchema = gql`
    type Query {
        _: Boolean
    }
    type Mutation {
        _: Boolean
    }
    type Subscription {
        _: Boolean
    }
`;

export default [linkSchema, userSchema, blockSchema];
