const express = require('express');
const mongoose = require('mongoose');
const users = require('./mockdata.json')
const app = express();
const API = '/api/'
app.get('/', (req, res) => { });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(3000, () => {
    console.log('Server running ay port 3000');
});
mongoose.connect('mongodb://127.0.0.1:27017/my-db').then((e) => { console.log("Mongo db connected"); }).catch((er) => { console.log("Mongo db error" + er); })

const userSchema = new mongoose.Schema({
    firsName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    jobTitle: {
        type: String,

    }
}, { timestamps: true });
const User = mongoose.model('user', userSchema);
app.get(API + 'user', async (req, res) => {

    try {
        const allUsers = await User.find({});
        return res.status(201).json({ msg: "success", data: allUsers });
    } catch (err) {
        return res.status(401).json({
            msg: err.errmsg
        });
    }
});

app.post(API + 'user', async (req, res) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.jobTitle) {
        return res.status(400).json({ msg: "All field are required" })
    }
    const { firstName, lastName, email, jobTitle } = req.body
    try {
        const result = await User.create({
            firsName: firstName,
            lastName: lastName,
            email: email,
            jobTitle: jobTitle
        });
        return res.status(201).json({ msg: "success", user: result });
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            msg: err.errmsg
        });
    }
});
app.get(API + 'users/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ msg: "id is required" });
    }
    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ msg: "User not found" }); // Explicit 404 for non-existent user
        }

        return res.status(200).json({ msg: "success", data: user }); // Use 200 for successful fetch
    } catch (err) {
        return res.status(400).json({ msg: "Invalid id format", error: err.message }); // 400 for invalid ObjectId
    }
});