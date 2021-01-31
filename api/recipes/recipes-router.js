const express = require("express");
const router = express.Router();
const Recipes = require("./recipes-model");
const Users = require("../users/users-model");
const { validateUserId } = require("../middleware");

router.get("/", async (req, res) => {
    try {
        const recipes = await Recipes.getAll();
        res.status(200).json(recipes);
    }
    catch (error) {
        res.status(500).json({ message: "Unable to retrieve recipes" })
    }
});

router.get("/:id", async (req, res) => {

});

router.put("/:id", async (req, res) => {

});

router.delete("/:id", async (req, res) => {

});


module.exports = router;
