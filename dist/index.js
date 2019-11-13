"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv_1 = require("dotenv");
const path_1 = require("path");
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = require("./server/schema");
const resolvers_1 = require("./server/resolvers");
dotenv_1.config({ path: path_1.resolve(__dirname, "../.env") });
const { MONGO_URI_DEV, PORT } = process.env;
// @ts-ignore
mongoose.connect(MONGO_URI_DEV, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
    .then((res) => {
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: schema_1.default,
        resolvers: resolvers_1.default
    });
    const app = express();
    app.use(cors(), bodyParser.json());
    server.applyMiddleware({ app });
    const port = PORT || 4000;
    app.listen({ port }, () => {
        console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
    });
})
    .catch((er) => console.log("failed to connect to mongoose", er));
//# sourceMappingURL=index.js.map