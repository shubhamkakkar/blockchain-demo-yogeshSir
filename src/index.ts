import * as express from 'express';
import * as mongoose from "mongoose"
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import {config} from "dotenv"
import {resolve} from "path"

import {ApolloServer} from 'apollo-server-express';
import schema from './server/schema';
import resolvers from './server/resolvers'

config({path: resolve(__dirname, "../.env")});
const MONGO_URI_DEV = process.env.MONGO_URI_DEV;
// @ts-ignore
mongoose.connect(MONGO_URI_DEV, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true})
    .then((res: any) => {
        const server = new ApolloServer({
            typeDefs: schema,
            resolvers
        });
        const app = express();
        app.use(cors(), bodyParser.json());
        server.applyMiddleware({app});
        app.listen({port: 4000}, () =>
            console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
        );
    })
    .catch((er: any) => console.log("failed to connect to mongoose", er));
