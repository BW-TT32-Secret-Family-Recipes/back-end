const express = require("express");
const server = express();
const recipesRouter = require("./recipes/recipes-router");
const usersRouter = require("./users/users-router");

server.use(express.json());
server.use("/api/recipes", recipesRouter);
server.use("/api/users", usersRouter)

module.exports = server;

