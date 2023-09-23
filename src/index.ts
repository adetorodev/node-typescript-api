import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieparser from 'cookie-parser';
import compression from 'compression';
import cors from "cors";
import mongoose from 'mongoose'
import router from './router';

const app = express();

app.use(cors({
    credentials: true
}));
app.use(compression());
app.use(cookieparser());
app.use(bodyParser.json())

app.use('/', router)

const server = http.createServer(app)

server.listen(4040, () => {
    console.log(`Server running on localhost:4040`)
})

const MONGO_URL = 'mongodb+srv://adetorodev19:Dev098123?@cluster0.hooi45u.mongodb.net/?retryWrites=true&w=majority'

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error))
