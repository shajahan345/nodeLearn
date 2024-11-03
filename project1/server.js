import express from 'express';
import path from 'path'
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index.ejs')
});
app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
app.get('/about', (req, res) => {
    res.render('about.ejs')
});
app.get('/contact', (req, res) => {
    res.render('contact.ejs')
});
app.post('/contact', (req, res) => {
    const name = req.body['name'];
    const email = req.body['email'];
    if (!email, !name) {
        res.send("Something went wrong")
    } else {
        res.send("Feedback sent successfully");
    }
});