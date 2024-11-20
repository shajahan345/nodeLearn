import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import User from '../models/user.js'
const registerUser = async (req, res) => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res.status(400).json({ message: `userName and password are required`, data: [] })
        }
        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            return res.status(409).json({ message: `Username already exists`, data: [] })
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = new User({
            userName: userName,
            password: hashedPassword
        });
        await newUser.save();
        return res.status(201).json({ message: "success", data: newUser })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

};
const loginUser = async (req, res) => {
    try {
        const { userName, password } = req.body
        if (!userName || !password) {
            return res.status(404).json({ message: "userName and password are required", data: [] })
        }
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(404).json({ message: "user not found", data: [] })
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(404).json({ message: "Password mismatch", data: [] })
        };

        const accessToken = jwt.sign({ userName }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        user.token = { accessToken, refreshToken: null };
        await user.save()
        return res.status(201).json({
            message: "success", data: {
                userName: user.userName,
                token: {
                    accessToken: user.token.accessToken
                }
            }
        })

    } catch (err) {
        return res.status(500).json({ message: err.message });
    };
};

const forgotPassword = async (req, res) => {
    try {
        const { userName, newPassword } = req.body
        if (!userName || !newPassword) {
            return res.status(404).json({ message: "userName and password required required", data: [] })
        }
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(404).json({ message: "user not found", data: [] })
        };

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save()
        return res.status(201).json({ message: "success", data: user })

    } catch (err) {
        return res.status(500).json({ message: err.message });
    };
}

const deleteUser = async (req, res) => {
    try {
        const { userName } = req.params;

        // Check if userName is provided
        if (!userName) {
            return res.status(400).json({ message: "userName is required", data: [] });
        }

        // Find the user by userName
        const user = await User.findOne({ userName });

        // If the user does not exist
        if (!user) {
            return res.status(404).json({ message: "User not found", data: [] });
        }

        // Delete the user by userName
        const result = await User.deleteOne({ userName });

        // If the deletion did not succeed
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: `User with username ${userName} not found` });
        }

        // Respond with success
        return res.status(200).json({ message: `User with username ${userName} deleted successfully`, data: [] });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
};

export { registerUser, loginUser, forgotPassword, deleteUser };