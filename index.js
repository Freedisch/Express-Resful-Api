const genres = require("../Express-Resful-Api/src/Routes/genres.js");
const express = require("express");

const app = express();

app.use("/genres", genres);

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
