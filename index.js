const genres = require("../Express-Resful-Api/src/Routes/genres.js");
const express = require("express");
const mongoose = require("mongoose");
const users = require("./src/Routes/User");
const cookieParser = require("cookie-parser");

//Express app
const app = express();

//Connecting to mongodb
const dbURI =
  "mongodb+srv://Freenine:Tuu2ShHdLsypDl3X@nextproject.qqkbxd5.mongodb.net/Testdb67?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>
    app.listen(port, () => console.log(`Listening on port ${port}...`))
  )
  .catch((err) => console.log(err));

//Calling Genres routes
app.use(express.json());
app.use(cookieParser());
app.use("/genres", genres);
app.use("/", users);
//Port configuration
const port = process.env.port || 3000;
