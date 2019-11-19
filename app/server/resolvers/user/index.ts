import {User} from "../../../generated/graphql";
import usersQuery from "./queries/users";
import signinMutation from "./mutations/signin";
import loginMutation from "./mutations/login";

export default {
    Query: {
        users: () => usersQuery(),
    },
    Mutation: {
        signin: (parent: any, args: User) => signinMutation(args),
        login: (parent: any, args: User) => loginMutation(args)
    },
};
