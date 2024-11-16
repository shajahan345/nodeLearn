const express = require('express');
const userRouter = require('./routes/users');
const { connectMongoDb } = require('./connection');
const { logResponse } = require('./middlewares/index')
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logResponse('log.txt'))
app.use('/api/users', userRouter)


connectMongoDb('mongodb://127.0.0.1:27017/my-db').then((e) => { console.log("Mongo db connected"); }).catch((er) => { console.log("Mongo db error" + er); })

// server
app.listen(3000, () => {
    console.log('Server running ay port 3000');
});