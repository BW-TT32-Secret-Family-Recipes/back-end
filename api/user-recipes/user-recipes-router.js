const express = require("express");
const router = express.Router();
const Recipes = require("../recipes/recipes-model");

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const deletedRecipe = await Recipes.remove(id);
        res.status(200).json({ message: `Recipe with id ${id} has been deleted.` })
    }
    catch (error) {
        res.status(404).json({ errorMessage: `Unable to delete recipe with id ${id}.` })
    }
});

module.exports = router;
