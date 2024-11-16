import express from 'express';
import urlRouter from './routes/url.js';
import connectMongoDb from './connection.js'

const app = express();
const port = 3000;

// Use middleware correctly (call the functions)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Correct the base path for the URL router
app.use('/url', urlRouter);

connectMongoDb('mongodb://127.0.0.1:27017/url').then((e) => { console.log("Mongo db connected"); }).catch((er) => { console.log("Mongo db error" + er); })
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
