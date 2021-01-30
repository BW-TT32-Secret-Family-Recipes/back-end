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

module.exports = {
    validateUserId
};
