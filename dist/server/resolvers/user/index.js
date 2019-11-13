"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("./queries/users");
const signin_1 = require("./mutations/signin");
const login_1 = require("./mutations/login");
exports.default = {
    Query: {
        users: () => users_1.default(),
    },
    Mutation: {
        signin: (parent, args) => signin_1.default(args),
        login: (parent, args) => login_1.default(args)
    },
};
//# sourceMappingURL=index.js.map