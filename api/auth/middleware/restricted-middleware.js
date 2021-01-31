const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../../config/secrets");

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: " Valid token needed for access." })
            } else {
                req.decodedJwt = decoded;
                next();
            }
        });
    } else {
        res.status(500).json({ message: "Unable to verify token." })

    }
}
