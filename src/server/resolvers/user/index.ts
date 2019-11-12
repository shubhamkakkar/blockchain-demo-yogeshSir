import {User} from "../../../generated/graphql";
import usersQuery from "./queries/users";
import signinMutation from "./mutations/signin";
import loginMutation from "./mutations/login";
import userPrivateKeyQuery from "./queries/userPrivateKey";

export default {
    Query: {
        users: () => usersQuery(),
        privateKey: (parent: any, {token}: { token: string }) => userPrivateKeyQuery(token)
    },
    Mutation: {
        signin: (parent: any, args: User) => signinMutation(args),
        login: (parent: any, args: User) => loginMutation(args)
    },
};
