const express = require("express");
const Users = require("./users-model");
const Recipes = require('../recipes/recipes-model')
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
        res.status(200).json(recipes.rows);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/:id/recipes", validateUserId, async (req, res) => {
    try {
        const addedRecipe = req.body;
        const { id } = req.params;
        const newRecipe = await Users.createUserRecipe(addedRecipe, id)
        const RecipeResponseObject = await Recipes.getById(newRecipe.id)
        res.status(201).json(RecipeResponseObject.rows[0]);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.delete("/:id/recipes/:id", validateUserId, async (req, res) => {
    // try {
    //     const { id } = req.params
    //     const deleteRecipe = await Users.delete()
    // }
    // catch (error) {

    // }
});


module.exports = router;
