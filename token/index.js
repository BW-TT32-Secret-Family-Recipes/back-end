const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/secrets");

const generateToken = (user) => {
    const payload = {
        username: user.username,
    }
    const options = {
        expiresIn: 60 * 60 * 1000
    }
    return jwt.sign(payload, jwtSecret, options)
};

module.exports = { generateToken };
