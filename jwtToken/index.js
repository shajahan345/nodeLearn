import express from 'express';
import 'dotenv/config';
import { connectMongoDb } from './connection.js';
import { errorHandler } from './middlewares/errorHandler.js';
import authRouter from './routes/auth.js'
const app = express();
const port = process.env.PORT;
connectMongoDb(process.env.CONNECTION_STRING).then((e) => {
    console.log("Mongo db connected");
    console.log(e.connection.host);
}).catch((er) => { console.log("Mongo db error" + er); })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);
app.use('/users', authRouter)



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
