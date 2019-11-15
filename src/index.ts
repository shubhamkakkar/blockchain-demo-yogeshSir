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
const {MONGO_URI_DEV, PORT} = process.env;
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
        const port = PORT || 4000;
        app.listen({port}, () => {
                console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
            }
        );
    })
    .catch((er: any) => console.log("failed to connect to mongoose", er));
