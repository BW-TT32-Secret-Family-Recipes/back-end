const Users = require("../users/users-model");
const Recipes = require("../recipes/recipes-model");

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
            res.status(400).json({ errorMessage: "Both username and password required." })
        }
    } catch (error) {
        res.status(500).json({ errorMessage: "Error with your registration, try again." })
    }
};

const validateRecipeId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const validRecipe = await Recipes.getById(id);
        if (validRecipe.rows.length) {
            next();
        } else {
            res.status(401).json({ errorMessage: `Recipe with id ${id} does not exist.` })
        }
    } catch (error) {
        res.status(500).json({ errorMessage: "Unable to get recipe" })
    }
}

module.exports = {
    validateUserId,
    validateReqBody,
    validateRecipeId
};
