const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const Users = require("../users/users-model");
// const {validUserBody} = require(path to middleware)
//const {generateToken} = require(token function path)

router.post("/register", async (req, res) => {
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
        res.status(500).json(error);
    }

});

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    Users.getBy(username)
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                console.log("hello  there", user);
                res.status(200).json(`Welcome ${username}`);
            } else {
                console.log("there is no user,try again");
                res.status(404).json({ message: "Error logging in" })
            }
        })
        .catch(err => console.log(err, "WRONG WRONG HELP"));
});

module.exports = router;
