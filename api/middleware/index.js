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

const validateRegistrationBody = async (req, res, next) => {
    const validRegistration = req.body;
    try {
        if (validRegistration.username && validRegistration.password) {
            next();
        } else if (!validRegistration.username || !validRegistration.password) {
            res.status(400).json({ message: "Both username and password required to register." })
        }
    } catch (error) {
        res.status(500).json({ message: "Error with your registration, try again." })
    }
};

module.exports = {
    validateUserId,
    validateRegistrationBody
};
