const { Movie, validate } = require("../Models/movieModel");
const { Genre } = require("../Models/genreModel");
const mongoose = require("mongoose");

//GET Request
exports.genres_list = async (req, res) => {
  const movies = await Genre.find().sort("name");
  res.send(movies);
};
// exports.genres_get_id = async (req, res) => {
//   const movies = await Movie.find().sort("name");
//   res.send(movies);
// };

//POST request
exports.genres_post = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send(error.details[0].message);

  let movie = new Movie({
    title: req.body.name,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentaleRate: req.body.dailyRentaleRate,
  });

  movie = await movie.save();
  res.send(movie);
};
//PUT Request
exports.genres_put = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre");

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentaleRate: req.body.dailyRentaleRate,
    },
    { new: true }
  );
  if (!movie)
    return res.status(404).send("The movie with the given Id was not correct");
  res.send(movie);
};
// //DELETE Request
// exports.genres_delete = (req, res) => {};
