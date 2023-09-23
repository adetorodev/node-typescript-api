import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from "cors";
import mongoose from 'mongoose'
import router from './router';
import dotenv from "dotenv";

dotenv.config();

// const MONGO_URL = 'mongodb+srv://adetorodev19:adetorodev@cluster0.hooi45u.mongodb.net/?retryWrites=true&w=majority'
const MONGO_URL = 'mongodb://127.0.0.1:27017/apitets'

const port = 7000;


const app = express();
// app.use(express.json);

app.use(cors({
    credentials: true
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json())


const server = http.createServer(app)

server.listen(port, () => {
    console.log(`Server running on localhost:${port}`)
})

// const server =  async () => {
//     try{
//         await mongoose.connect(MONGO_URL)
//         const db = mongoose.connection;
//         console.log("Connected to DB")

//         db.on('error', console.error.bind(console, 'DB connection error!'));

//         app.listen(port, () => console.log(`Server listening on port ${port}`))

//         db.once('open', function() {
//             console.log("Connected")
//           });
//     } catch(err: any){
//         console.log(err)
//     }
// }

// server()



mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
console.log('Db conneted')
mongoose.connection.on('error', (error: Error) => console.log(error))
mongoose.connection.once('open', function () {
    console.log("Connected")
});


app.use('/', router)
