const express = require('express');
require('dotenv').config();
const connectMongoDb = require('./connection.js')
const app = express();
const port = process.env.PORT

// middlewares
connectMongoDb(process.env.CONNECTION_STRING).then((e) => {
    console.log("Mongo db connected");
    console.log(e.connection.host);
}).catch((er) => { console.log("Mongo db error" + er); })

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
