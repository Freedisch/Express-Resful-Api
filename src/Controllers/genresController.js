const genres = [
  { id: 0, type: "Romance" },
  { id: 0, type: "Fiction" },
  { id: 2, type: "Action" },
];

exports.genres_list = (req, res) => {
  res.send(genres);
};

exports.genres_get_id = (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) res.status(404).send("Genre not found");
  res.send(genre);
};

exports.genres_post = (req, res) => {
  const genre = {
    id: genres.length + 1,
    type: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
};

exports.genres_put = (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  genre.name = req.body.name;
  res.send(genre);
};

exports.genres_delete = (req, res) => {
  const genre = find((c) => c.id === parseInt(req.params.id));
  if (!genre) res.status(404).send("The genre with the given Id doesn't exist");

  //Delete
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  // Return the same object
  res.send(genre);
};
