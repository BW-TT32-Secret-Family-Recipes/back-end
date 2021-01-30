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
        console.log("hello there")
    }
    catch (error) {

    }
});


module.exports = router;
