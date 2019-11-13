"use strict";
exports.__esModule = true;
var users_1 = require("./queries/users");
var signin_1 = require("./mutations/signin");
var login_1 = require("./mutations/login");
exports["default"] = {
    Query: {
        users: function () { return users_1["default"](); }
    },
    Mutation: {
        signin: function (parent, args) { return signin_1["default"](args); },
        login: function (parent, args) { return login_1["default"](args); }
    }
};
