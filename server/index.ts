// import * as express from "express"
// import dotenv from "dotenv"
// import * as cors from "cors"
// import mongoose from "mongoose"
//
// dotenv.config();
//
// const MONGO_URI_DEV = process.env.MONGO_URI_DEV;
// const app = express();
//
//
// mongoose.connect(MONGO_URI_DEV, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
//     .then(res => {
//         const PORT = process.env.PORT || 8080;
//         console.log("connected to mongoose instance");
//         app.use('/', cors(), () => {
//
//         });
//         app.listen(PORT, () => console.log(PORT));
//
//     })
//     .catch(er => console.log("failed to connect to mongoose instance", er));
//

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
// @ts-ignore
import { ApolloServer } from 'apollo-server-express';
import {schema} from './schema/schema';

const PORT = 8080;

const server = new ApolloServer({schema});
const app = express();
app.use(cors(), bodyParser.json());

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);


