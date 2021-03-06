const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const Users = require("../users/users-model");
const { validateReqBody } = require("../middleware");
const { generateToken } = require("../../token");

router.post("/register", validateReqBody, async (req, res) => {
    const user = req.body;
    const hashed = bcrypt.hashSync(user.password, 12);
    try {
        if (user) {
            user.password = hashed;
            const newUser = await Users.insert(user);
            res.status(200).json(newUser);
        } else {
            res.status(404).json({ message: "Please provide valid credentials" });
        }
    }
    catch (error) {
        res.status(500).json({ errorMessage: "Unable to connect to server, try again." });
    }

});

router.post("/login", validateReqBody, (req, res) => {
    const { username, password } = req.body;
    Users.getBy(username)
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user)
                res.status(200).json({ message: `Welcome ${username}`, token });
            } else {
                console.log("there is no user,try again");
                res.status(404).json({ message: "Error logging in" })
            }
        })
        .catch(err => { res.status(500).json({ errorMessage: "Unable to login, try again." }) });
});

module.exports = router;
