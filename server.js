const express = require('express');
const path = require('path');

const app = express();
const port = 3000;
const dirName = __dirname;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Set the directory where the views are located
app.set('views', path.join(dirName, 'view'));

app.listen(port, () => {
    console.log('Welcome to the server');
});

app.get('/', (req, res) => {
    const data = {
        title: "Welcome",
        fruits: ["apple", 'orange', 'banana'],
        seconds: new Date().getSeconds(),
        htmlContent: "<strong>This is some html Content</strong>"
    };
    res.render('index', data);
});

app.post('/submit', (req, res) => {
    console.log(req.body); // Log form data to the console
    const name = req.body["fName"] + req.body["lName"]
    res.send(`There are ${name.length} letters in your name`); // Send a response to prevent hanging
});
