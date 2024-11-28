
const User = require('../models/userModel')
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields", data: [] });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found", data: [] });
        }
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid credentials", data: [] });
        }
        return res.status(200).json({ message: "User logged in successfully", data: user });
    } catch (e) {
        res.status(500).json({ message: e.message, data: [] });
    }
}
const userRegister = async (req, res) => {
    try {
        const { name, email, password, } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({ message: "Please fill all the fields", data: [] });
        }
        const user = new User({ email, password, name });
        await user.save();
        return res.status(200).json({ message: "User registered successfully", data: user });
    } catch (error) {
        res.status(500).json({ message: error.message, data: [] });
    }
}
module.exports = { userLogin, userRegister }