const express = require("express");
const router = express.Router();
const Recipes = require("../recipes/recipes-model");

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const deletedRecipe = await Recipes.remove(id);
        res.status(200).json({ message: `Recipe with id ${id} has been deleted.` })
        //*********NEEDS TO BE FIXED TO VERIFY THAT RECIPE WITH THAT ID EXISTS */
    }
    catch (error) {
        res.status(404).json({ errorMessage: `Unable to delete recipe with id ${id}.` })
    }
});

router.put("/:id", async (req, res) => {
    const editRecipe = req.body;
    const { id } = req.params;
    try {
        const newRecipe = await Recipes.update(editRecipe, id)
        return res.status(200).json(newRecipe)
    } catch (error) {
        res.status(500).json({ errorMessage: "Unable to edit recipe." })
    }

})

module.exports = router;
