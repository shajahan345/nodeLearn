const express = require('express');
require('dotenv').config();
const userRouter = require('./routes/userRoutes.js')
const connectMongoDb = require('./connection.js')
const app = express();
const port = process.env.PORT

connectMongoDb(process.env.CONNECTION_STRING).then((e) => {
    console.log("Mongo db connected");
    console.log(e.connection.host);
}).catch((er) => { console.log("Mongo db error" + er); })

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRouter)


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
