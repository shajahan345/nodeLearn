import jwt from 'jsonwebtoken';
import 'dotenv/config'
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: "Unauthorized" })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            res.status(403).json({ message: "Invalid or expired Access Token" })
        }
        req.user = decoded;
        next();
    });
}
export { authenticateToken }