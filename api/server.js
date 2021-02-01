const express = require("express");
const server = express();
const recipesRouter = require("./recipes/recipes-router");
const usersRouter = require("./users/users-router");
const authRouter = require("../api/auth/auth-router");
const userRecipesRouter = require("./user-recipes/user-recipes-router");

server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/recipes", recipesRouter);
server.use("/api/users", usersRouter);
server.use("/api/users/:id/recipes", userRecipesRouter);

module.exports = server;
