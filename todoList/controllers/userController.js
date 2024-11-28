

const userLogin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields", data: [] });
        }

    } catch (e) {
        res.status(500).json({ message: e.message, data: [] });
    }
}
module.exports = { userLogin }