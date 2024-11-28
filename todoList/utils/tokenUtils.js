const jwt = require('jsonwebtoken');

// Access token generation
const generateAccessToken = (user) => {
    return jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }  // Short lived
    );
};

// Refresh token generation
const generateRefreshToken = (user) => {
    return jwt.sign(
        { userId: user.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }  // Longer lived
    );
};
module.exports = { generateAccessToken, generateRefreshToken };