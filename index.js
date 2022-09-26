const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());

const genres = [
  { id: 0, type: "Action" },
  { id: 1, type: "Romance" },
  { id: 2, type: "Fantasme" },
  { id: 3, type: "Fiction" },
  { id: 4, type: "Horror" },
];

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) res.status(404).send("The genre has not been found");
  res.send(genre);
});

app.post("/api/genres", (req, res) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  const result = Join.validate(req.body, schema);
  if (result.error) {
    res.status(404).send(result.error.details[0].message);
    return;
  }
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

app.put("/api/genres/:id", (req, res) => {
  //Validating
  const genre = genres.find((c) => (c.id === c.id) === parseInt(req.params.id));
  if (!genre) res.status(404).send("The genre with the given Id doesn't exist");
  //If invalid return bad request 400

  const schema = {
    name: Joi.string().min(3).required(),
  };

  const result = Join.validate(req.body, schema);
  if (result.error) {
    res.status(404).send(result.error.details[0].message);
    return;
  }
  // Update the genre
  genre.name = req.body.name;
  //Return the updated genre
  res.send(genre);
});

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
