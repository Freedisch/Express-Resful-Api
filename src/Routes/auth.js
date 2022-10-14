const express = require("express");
const Router = express.Router();
const authController = require("../Controllers/authController");

//Setting up controllers
Router.post("/", authController.userLogin);

//Exportings Routes
module.exports = Router;
