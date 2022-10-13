const express = require("express");
const Router = express.Router();

const userController = require("../Controllers/userController");

Router.post("/register", userController.registerUser);
Router.post("/login", userController.loginUser);

module.exports = Router;
