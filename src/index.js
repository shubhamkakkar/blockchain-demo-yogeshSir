"use strict";
exports.__esModule = true;
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");
var dotenv_1 = require("dotenv");
var path_1 = require("path");
var apollo_server_express_1 = require("apollo-server-express");
var schema_1 = require("./server/schema");
var resolvers_1 = require("./server/resolvers");
dotenv_1.config({ path: path_1.resolve(__dirname, "../.env") });
var _a = process.env, MONGO_URI_DEV = _a.MONGO_URI_DEV, PORT = _a.PORT;
// @ts-ignore
mongoose.connect(MONGO_URI_DEV, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(function (res) {
    var server = new apollo_server_express_1.ApolloServer({
        typeDefs: schema_1["default"],
        resolvers: resolvers_1["default"]
    });
    var app = express();
    app.use(cors(), bodyParser.json());
    server.applyMiddleware({ app: app });
    var port = PORT || 4000;
    app.listen({ port: port }, function () {
        console.log("\uD83D\uDE80 Server ready at http://localhost:" + port + server.graphqlPath);
    });
})["catch"](function (er) { return console.log("failed to connect to mongoose", er); });
