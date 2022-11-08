const auth = require("../middlewares/auth");
const express = require("express");
const route = express.Router();

//Require Controller
const genre_controller = require("../Controllers/genresController");

// GENRES ROUTES
route.get("/", genre_controller.genres_list);
//route.get("/:id", genre_controller.genres_get_id);
route.post("/", auth, genre_controller.genres_post);
route.put("/genres/:id", genre_controller.genres_put);
//route.delete("/genres/:id", genre_controller.genres_delete);
module.exports = route;
