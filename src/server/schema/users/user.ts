import {gql} from 'apollo-server-express';

export default gql`
    extend type Query {
        users: [ReturnedUser!],
        publicKey: PublicKey!
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
        publicKey: PublicKey!
        privateKey: PrivateKey!
        token: String!
    }

    type PublicKey  {
        kty: String!,
        n: String!,
        e:  String!
    }
    type PrivateKey  {
        kty: String!,
        n: String!,
        e:  String!
        d:  String!
        p:  String!
        q:  String!
        dp:  String!
        dq:  String!
        qi:  String!
    }
`;
