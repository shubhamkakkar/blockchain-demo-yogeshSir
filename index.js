import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"

dotenv.config();

const MONGO_URI_DEV = process.env.MONGO_URI_DEV;
const app = express();


mongoose.connect(MONGO_URI_DEV, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(res => {
        const PORT = process.env.PORT || 8080;
        console.log("connected to mongoose instance")
        app.use('/', cors(), () => {

        });
        app.listen(PORT, () => console.log(PORT));

    })
    .catch(er => console.log("failed to connect to mongoose instance", er));




