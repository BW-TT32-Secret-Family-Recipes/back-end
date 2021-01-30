const express = require("express");
const Users = require("./users-model");
const router = express.Router();
const { validateUserId } = require("../middleware")

router.get("/", async (req, res) => {
    try {
        const users = await Users.getAll();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.getById(id);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.get("/:id/recipes", validateUserId, async (req, res) => {
    try {
        const { id } = req.params;
        const recipes = await Users.getUserRecipes(id);
        res.status(200).json(recipes);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
