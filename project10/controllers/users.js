const User = require('../models/user')

async function getAllUsers(req, res) {
    try {
        const allUsers = await User.find({});
        return res.status(201).json({ msg: "success", data: allUsers });
    } catch (err) {
        return res.status(401).json({
            msg: err.errmsg
        });
    }
}
async function getUserById(req, res) {
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
}
async function createUser(req, res) {
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
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser
}