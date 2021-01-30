const express = require("express");
const Users = require("./users-model");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const users = await Users.getAll();
        res.status(200).json(users)
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
});

router.post("/", async (req, res) => {

});


module.exports = router;
