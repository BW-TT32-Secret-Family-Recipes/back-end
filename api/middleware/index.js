const Users = require("../users/users-model")

const validateUserId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const validUser = await Users.getById(id);
        if (validUser) {
            next();
        } else {
            res.status(404).json(`User with id ${id} does not exist.`);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }

};

const validateReqBody = async (req, res, next) => {
    const validRequest = req.body;
    try {
        if (validRequest.username && validRequest.password) {
            next();
        } else if (!validRequest.username || !validRequest.password) {
            res.status(400).json({ message: "Both username and password required to register." })
        }
    } catch (error) {
        res.status(500).json({ message: "Error with your registration, try again." })
    }
};

module.exports = {
    validateUserId,
    validateReqBody
};
