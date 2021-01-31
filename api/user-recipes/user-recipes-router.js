const express = require("express");
const router = express.Router();
const Recipes = require("../recipes/recipes-model");
const { validateRecipeId, validateUserId } = require("../middleware/index")

router.delete("/:id", validateUserId, validateRecipeId, async (req, res) => {
    const { id } = req.params
    try {
        const deletedRecipe = await Recipes.remove(id);
        res.status(200).json({ message: `Recipe with id ${id} has been deleted.` })
    }
    catch (error) {
        res.status(404).json({ errorMessage: `Unable to delete recipe with id ${id}.` })
    }
});

router.put("/:id", validateUserId, validateRecipeId, async (req, res) => {
    const editRecipe = req.body;
    const { id } = req.params;
    try {
        const newRecipe = await Recipes.update(editRecipe, id)
        return res.status(200).json(newRecipe)
    } catch (error) {
        res.status(500).json({ errorMessage: "Unable to edit recipe." })
    }

})

router.get("/:id", validateUserId, validateRecipeId, async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await Recipes.getById(id)
        res.status(200).json(recipe.rows[0]);
    } catch (error) {
        res.status(500).json({ errorMessage: "Unable to retrieve recipe." })
    }
})

module.exports = router;
